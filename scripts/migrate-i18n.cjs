const fs = require('fs');
const path = require('path');

let ROOT = __dirname;
while (!fs.existsSync(path.join(ROOT, 'package.json'))) { ROOT = path.dirname(ROOT); }
const SRC = path.join(ROOT, 'docs-dev');
const I18N = path.join(SRC, 'i18n');

// ── 读取并解析 dict 文件 ──
function parseDictFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const result = {};
  for (const loc of ['zh-CN', 'en-US']) {
    const re = new RegExp(`'${loc}':\\s*(\\{[\\s\\S]*?\\n\\s{0,4}\\}),?\\s*(?:'en-US'|\\};)`, 'm');
    const m = raw.match(re);
    if (m) {
      try { result[loc] = new Function('return ' + m[1])(); }
      catch(e) { console.error(`Failed: ${path.basename(file)} ${loc}:`, e.message); result[loc] = {}; }
    } else { result[loc] = {}; }
  }
  return result;
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    const sv = source[key], tv = target[key];
    if (sv && typeof sv === 'object' && !Array.isArray(sv) && tv && typeof tv === 'object' && !Array.isArray(tv)) {
      deepMerge(tv, sv);
    } else { target[key] = sv; }
  }
}

const main = parseDictFile(path.join(SRC, 'doc-dictionaries.ts'));
const extra = parseDictFile(path.join(SRC, 'doc-dictionaries-extra.ts'));

const merged = {};
for (const loc of ['zh-CN', 'en-US']) {
  merged[loc] = {};
  deepMerge(merged[loc], main[loc] || {});
  deepMerge(merged[loc], extra[loc] || {});
}

// ── Component key mapping ──
const CAPS = {
  ActionSheet:'actionsheet', Avatar:'avatar', Badge:'badge', Button:'button',
  Calendar:'calendar', Cascader:'cascader', Cell:'cell', Center:'center',
  Checkbox:'checkbox', CityPicker:'citypicker', DatePicker:'datepicker',
  Dialog:'dialog', Divider:'divider', Ellipsis:'ellipsis', Empty:'empty',
  FloatingBall:'floatingball', BackTop:'backtop',
  Form:'form', Icon:'icon', Image:'image', Input:'input',
  Layout:'layout', Lazyload:'lazyload', List:'list', Loading:'loading',
  NavBar:'navbar', Notify:'notify', Overlay:'overlay', Picker:'picker',
  PullRefresh:'pullrefresh', Radio:'radio', Rate:'rate', SafeArea:'safearea',
  Select:'select', Slider:'slider', Stepper:'stepper',
  SwipeCell:'swipecell', Swiper:'swiper', Switch:'switch',
  TabBar:'tabbar', Tabs:'tabs', Tag:'tag', Textarea:'textarea',
  TimePicker:'timepicker', Toast:'toast', Tooltip:'tooltip', Upload:'upload',
};
const COMPS = Object.values(CAPS);

function guessComponent(section, key) {
  if (section === 'componentProps') return key;
  if (section === 'componentIntro') {
    for (const [cap, comp] of Object.entries(CAPS)) {
      if (key === cap + 'Intro') return comp;
    }
    return null;
  }
  if (section === 'cssVars') return key.toLowerCase();
  // demo, demoDesc, section, nav — prefix match
  const s = key.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const ck of COMPS) {
    const p = ck.replace(/-/g, '');
    if (s === p || s.startsWith(p)) return ck;
  }
  return null;
}

// ── Split into buckets ──
const buckets = {};
const commonBucket = { 'zh-CN': {}, 'en-US': {} };

for (const loc of ['zh-CN', 'en-US']) {
  const dict = merged[loc] || {};
  for (const [section, value] of Object.entries(dict)) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      commonBucket[loc][section] = value;
      continue;
    }
    for (const [key, val] of Object.entries(value)) {
      const comp = guessComponent(section, key);
      if (comp) {
        if (!buckets[comp]) buckets[comp] = { 'zh-CN': {}, 'en-US': {} };
        if (!buckets[comp][loc][section]) buckets[comp][loc][section] = {};
        buckets[comp][loc][section][key] = val;
      } else {
        if (!commonBucket[loc][section]) commonBucket[loc][section] = {};
        commonBucket[loc][section][key] = val;
      }
    }
  }
}

// ── Write files ──
fs.rmSync(I18N, { recursive: true, force: true });

function writeFile(filePath, obj) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const needQuote = (k) => /[^a-zA-Z0-9_$]/.test(k) || /^\d/.test(k);
  const qk = (k) => needQuote(k) ? `'${k}'` : k;

  const lines = ['export default {'];
  function walk(o, indent) {
    const keys = Object.keys(o);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const v = o[k];
      const comma = i < keys.length - 1 ? ',' : '';
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        lines.push(indent + '  ' + qk(k) + ': {');
        walk(v, indent + '    ');
        lines.push(indent + '  }' + comma);
      } else if (typeof v === 'string') {
        lines.push(indent + '  ' + qk(k) + ": '" + v.replace(/'/g, "\\'") + "'" + comma);
      } else {
        lines.push(indent + '  ' + qk(k) + ': ' + JSON.stringify(v) + comma);
      }
    }
  }
  walk(obj, '  ');
  lines.push('};\n');
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

// Common
const outCommon = path.join(I18N, 'common');
for (const loc of ['zh-CN', 'en-US']) {
  writeFile(path.join(outCommon, loc + '.ts'), commonBucket[loc]);
}
console.log('common/');

// Per component
for (const [comp, bucket] of Object.entries(buckets)) {
  const compDir = path.join(I18N, comp);
  for (const loc of ['zh-CN', 'en-US']) {
    if (Object.keys(bucket[loc] || {}).length === 0) continue;
    writeFile(path.join(compDir, loc + '.ts'), bucket[loc]);
  }
  console.log(comp + '/');
}

console.log(Object.keys(buckets).length + ' components + common migrated');
