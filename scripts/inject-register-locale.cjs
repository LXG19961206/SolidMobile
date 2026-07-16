const fs = require('fs');
const path = require('path');

const DOCS = path.join(__dirname, '..', 'docs-dev');
const I18N = path.join(DOCS, 'i18n');
const PAGES = path.join(DOCS, 'pages');
const MOBILE = path.join(PAGES, 'mobile');
const COMPONENTS = path.join(PAGES, 'components');

// Map dir -> key
const keyMap = {};
const dirs = fs.readdirSync(I18N);
for (const d of dirs) {
  const dp = path.join(I18N, d);
  if (!fs.statSync(dp).isDirectory() || d === 'common') continue;
  keyMap[d.toLowerCase()] = d;
}
// Also manual mappings for capitalized dirs
const extra = {
  actionsheet: 'actionsheet', avatar: 'avatar', badge: 'badge', button: 'button',
  backtop: 'backtop', calendar: 'calendar', cascader: 'cascader', cell: 'cell',
  center: 'center', checkbox: 'checkbox', citypicker: 'citypicker',
  datepicker: 'datepicker', dialog: 'dialog', divider: 'divider',
  ellipsis: 'ellipsis', empty: 'empty', floatingball: 'floatingball',
  form: 'form', icon: 'icon', image: 'image', input: 'input',
  layout: 'layout', lazyload: 'lazyload', list: 'list', loading: 'loading',
  navbar: 'navbar', notify: 'notify', overlay: 'overlay', picker: 'picker',
  pullrefresh: 'pullrefresh', radio: 'radio', rate: 'rate', safearea: 'safearea',
  select: 'select', slider: 'slider', stepper: 'stepper',
  swipecell: 'swipecell', swiper: 'swiper', switch: 'switch',
  tabbar: 'tabbar', tabs: 'tabs', tag: 'tag', textarea: 'textarea',
  timepicker: 'timepicker', toast: 'toast', tooltip: 'tooltip', upload: 'upload',
};
Object.assign(keyMap, extra);

function getKey(dirName) {
  if (keyMap[dirName]) return keyMap[dirName];
  const l = dirName.toLowerCase();
  if (keyMap[l]) return keyMap[l];
  return null;
}

function injectFile(filePath, key, depth) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('registerLocale') && content.includes("import zhCN from '")) return; // already static

  const importPath = depth + 'i18n/' + key + '/';

  // Remove old loadLocale / registerLocale patterns
  content = content.replace(/import \{ useT, loadLocale \} from '[^']+doc-i18n';\nloadLocale\('[^']+'\);\n/g, '');
  content = content.replace(/import zhCN from '[^']+i18n\/[^']+zh-CN';\n/g, '');
  content = content.replace(/import enUS from '[^']+i18n\/[^']+en-US';\n/g, '');
  content = content.replace(/registerLocale\(\{[^}]+\}\);\n/g, '');

  // Add static imports
  const staticBlock = `import zhCN from '${importPath}zh-CN';\nimport enUS from '${importPath}en-US';\nimport { registerLocale } from '${depth}doc-i18n';\nregisterLocale({ 'zh-CN': zhCN, 'en-US': enUS });\n`;

  // Make sure useT import doesn't include loadLocale/registerLocale
  content = content.replace(/import \{ useT, loadLocale \} from '[^']+doc-i18n';/, "import { useT } from '" + depth + "doc-i18n';");
  content = content.replace(/import \{ useT, registerLocale \} from '[^']+doc-i18n';/, "import { useT } from '" + depth + "doc-i18n';");

  if (!content.includes("import { useT } from '" + depth + "doc-i18n'")) return;

  // Insert the static imports before the useT import
  content = content.replace(
    "import { useT } from '" + depth + "doc-i18n';",
    staticBlock + "import { useT } from '" + depth + "doc-i18n';"
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('  ' + path.relative(DOCS, filePath));
}

// Process desktop pages
for (const dir of fs.readdirSync(COMPONENTS)) {
  const compDir = path.join(COMPONENTS, dir);
  if (!fs.statSync(compDir).isDirectory()) continue;
  const key = getKey(dir);
  if (!key) continue;
  for (const f of fs.readdirSync(compDir).filter(f => f.endsWith('DocPage.tsx'))) {
    injectFile(path.join(compDir, f), key, '../../../');
  }
}

// Process mobile pages
for (const f of fs.readdirSync(MOBILE).filter(f => f.endsWith('Mobile.tsx'))) {
  const name = f.replace('Mobile.tsx', '');
  const key = getKey(name);
  if (!key) continue;
  injectFile(path.join(MOBILE, f), key, '../../');
}

console.log('\nDone!');
