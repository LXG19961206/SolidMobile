const fs = require('fs');
const path = require('path');

const DOCS = path.join(__dirname, '..', 'docs-dev');
const I18N = path.join(DOCS, 'i18n');
const PAGES = path.join(DOCS, 'pages');
const MOBILE = path.join(PAGES, 'mobile');
const COMPONENTS = path.join(PAGES, 'components');

const dirToKey = {
  actionsheet: 'actionsheet', avatar: 'avatar', badge: 'badge', button: 'button',
  BackTop: 'backtop', calendar: 'calendar', cascader: 'cascader', cell: 'cell',
  center: 'center', checkbox: 'checkbox', citypicker: 'citypicker',
  datepicker: 'datepicker', dialog: 'dialog', divider: 'divider',
  Ellipsis: 'ellipsis', empty: 'empty', FloatingBall: 'floatingball',
  form: 'form', icon: 'icon', image: 'image', input: 'input',
  layout: 'layout', lazyload: 'lazyload', list: 'list', loading: 'loading',
  navbar: 'navbar', notify: 'notify', overlay: 'overlay', picker: 'picker',
  pullrefresh: 'pullrefresh', radio: 'radio', rate: 'rate', safearea: 'safearea',
  select: 'select', slider: 'slider', stepper: 'stepper',
  swipecell: 'swipecell', swiper: 'swiper', switch: 'switch',
  tabbar: 'tabbar', tabs: 'tabs', tag: 'tag', textarea: 'textarea',
  timepicker: 'timepicker', toast: 'toast', Tooltip: 'tooltip', upload: 'upload',
};

function getKey(dirName) {
  if (dirToKey[dirName]) return dirToKey[dirName];
  const l = dirName.toLowerCase();
  for (const [k, v] of Object.entries(dirToKey)) {
    if (k.toLowerCase() === l) return v;
  }
  return null;
}

function hasI18n(key) {
  return fs.existsSync(path.join(I18N, key));
}

function injectPage(filePath, key, depth) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove any old static i18n imports (zhCN/enUS + registerLocale calls)
  content = content.replace(/\nimport zhCN from '[^']*i18n\/[^']*zh-CN';\n/g, '\n');
  content = content.replace(/\nimport enUS from '[^']*i18n\/[^']*en-US';\n/g, '\n');
  content = content.replace(/\nregisterLocale\(\{[^}]+\}\);\n/g, '\n');
  content = content.replace(/, registerLocale/g, '');
  content = content.replace(/registerLocale, /g, '');

  // Replace useT import to add loadLocale
  const useTLine = `import { useT } from '${depth}doc-i18n';`;
  const useTLoadLine = `import { useT, loadLocale } from '${depth}doc-i18n';`;

  if (content.includes(useTLine) && !content.includes('loadLocale')) {
    content = content.replace(useTLine, useTLoadLine);
  } else if (content.includes("import { useT } from") && !content.includes('loadLocale')) {
    // Handle minor variations
    const match = content.match(/import \{ useT \} from '[^']*doc-i18n';/);
    if (match) {
      content = content.replace(match[0], match[0].replace('useT', 'useT, loadLocale'));
    }
  } else {
    console.log(`  SKIP: ${path.relative(DOCS, filePath)}`);
    return;
  }

  // Add loadLocale call right after the useT import line
  const loadCall = `\nloadLocale('${key}');`;
  const importLine = `import { useT, loadLocale } from '${depth}doc-i18n';`;
  if (!content.includes(importLine + loadCall)) {
    content = content.replace(importLine, importLine + loadCall);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ${path.relative(DOCS, filePath)}`);
}

// Process desktop pages
for (const dir of fs.readdirSync(COMPONENTS)) {
  const compDir = path.join(COMPONENTS, dir);
  if (!fs.statSync(compDir).isDirectory()) continue;
  const key = getKey(dir);
  if (!key || !hasI18n(key)) continue;
  for (const f of fs.readdirSync(compDir).filter(f => f.endsWith('DocPage.tsx'))) {
    injectPage(path.join(compDir, f), key, '../../../');
  }
}

// Process mobile pages
for (const f of fs.readdirSync(MOBILE).filter(f => f.endsWith('Mobile.tsx'))) {
  const name = f.replace('Mobile.tsx', '');
  const key = getKey(name);
  if (!key || !hasI18n(key)) continue;
  injectPage(path.join(MOBILE, f), key, '../../');
}

console.log('\nDone!');
