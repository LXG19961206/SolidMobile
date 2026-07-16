const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const I18N = path.join(ROOT, 'docs-dev', 'i18n');

// ── Parse old dicts ──
function parseDict(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const result = {};
  for (const loc of ['zh-CN', 'en-US']) {
    const re = new RegExp(`'${loc}':\\s*(\\{[\\s\\S]*?\\n\\s{0,4}\\}),?\\s*(?:'en-US'|\\};)`, 'm');
    const m = raw.match(re);
    try { result[loc] = m ? new Function('return ' + m[1])() : {}; }
    catch(e) { result[loc] = {}; }
  }
  return result;
}

const main = parseDict(path.join(ROOT, 'docs-dev', 'doc-dictionaries.ts'));
const extra = parseDict(path.join(ROOT, 'docs-dev', 'doc-dictionaries-extra.ts'));

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    const sv = source[key], tv = target[key];
    if (sv && typeof sv === 'object' && !Array.isArray(sv) && tv && typeof tv === 'object' && !Array.isArray(tv))
      deepMerge(tv, sv);
    else target[key] = sv;
  }
}

const merged = {};
for (const loc of ['zh-CN', 'en-US']) {
  merged[loc] = {};
  deepMerge(merged[loc], main[loc] || {});
  deepMerge(merged[loc], extra[loc] || {});
}

// ── Component detection ──
const COMPS = [
  'actionsheet','avatar','badge','button','calendar','cascader','cell','center',
  'checkbox','citypicker','datepicker','dialog','divider','ellipsis','empty',
  'floatingball','backtop','form','icon','image','input','layout','lazyload',
  'list','loading','navbar','notify','overlay','picker','pullrefresh','radio',
  'rate','safearea','select','slider','stepper','swipecell','swiper','switch',
  'tabbar','tabs','tag','textarea','timepicker','toast','tooltip','upload',
];

// Also handle compound/special keys
const COMP_CAPS = {
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

function guessComp(section, key) {
  // componentProps: key IS the component name
  if (section === 'componentProps') {
    if (COMPS.includes(key)) return key;
    // Try lowercase
    const lc = key.toLowerCase();
    if (COMPS.includes(lc)) return lc;
    return null;
  }
  // componentIntro: key is ComponentIntro
  if (section === 'componentIntro') {
    for (const [cap, comp] of Object.entries(COMP_CAPS))
      if (key === cap + 'Intro') return comp;
    return null;
  }
  // cssVars: key is Component name
  if (section === 'cssVars') {
    const lc = key.toLowerCase();
    if (COMPS.includes(lc)) return lc;
    return null;
  }
  // demo, demoDesc, section: key starts with component prefix (after removing hyphens)
  if (section === 'demo' || section === 'demoDesc' || section === 'section') {
    const s = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Try longest match first
    const sorted = [...COMPS].sort((a,b) => b.length - a.length);
    for (const ck of sorted) {
      const p = ck.replace(/-/g, '');
      if (s.startsWith(p)) return ck;
    }
    return null;
  }
  // nav: each component may have a nav entry, but we keep nav in common
  return null;
}

// ── Split entries ──
const compBuckets = {}; // comp -> { 'zh-CN': {}, 'en-US': {} }
const commonBucket = { 'zh-CN': {}, 'en-US': {} };

for (const loc of ['zh-CN', 'en-US']) {
  const dict = merged[loc] || {};
  for (const [section, value] of Object.entries(dict)) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      commonBucket[loc][section] = value;
      continue;
    }
    for (const [key, val] of Object.entries(value)) {
      const comp = guessComp(section, key);
      if (comp) {
        if (!compBuckets[comp]) compBuckets[comp] = { 'zh-CN': {}, 'en-US': {} };
        if (!compBuckets[comp][loc][section]) compBuckets[comp][loc][section] = {};
        compBuckets[comp][loc][section][key] = val;
      } else {
        // Common: nav, common, config, guide, designTokens, group titles, etc.
        if (!commonBucket[loc][section]) commonBucket[loc][section] = {};
        commonBucket[loc][section][key] = val;
      }
    }
  }
}

// ── Write files ──
function writeTS(filePath, obj) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const lines = ['export default {'];
  function walk(o, indent) {
    const keys = Object.keys(o);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i], v = o[k];
      const comma = i < keys.length - 1 ? ',' : '';
      const qk = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k}'`;
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        lines.push(`${indent}  ${qk}: {`);
        walk(v, indent + '    ');
        lines.push(`${indent}  }${comma}`);
      } else if (typeof v === 'string') {
        lines.push(`${indent}  ${qk}: '${v.replace(/'/g, "\\'")}'${comma}`);
      } else {
        lines.push(`${indent}  ${qk}: ${JSON.stringify(v)}${comma}`);
      }
    }
  }
  walk(obj, '  ');
  lines.push('};\n');
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

fs.rmSync(I18N, { recursive: true, force: true });

// Write common
for (const loc of ['zh-CN', 'en-US']) {
  writeTS(path.join(I18N, 'common', `${loc}.ts`), commonBucket[loc]);
}
console.log('common/');

// Write per-component
for (const [comp, bucket] of Object.entries(compBuckets)) {
  const compDir = path.join(I18N, comp);
  for (const loc of ['zh-CN', 'en-US']) {
    if (Object.keys(bucket[loc] || {}).length === 0) continue;
    writeTS(path.join(compDir, `${loc}.ts`), bucket[loc]);
  }
  console.log(comp + '/');
}

console.log(`\nDone: ${Object.keys(compBuckets).length} components + common`);
