const fs = require('fs');
const path = require('path');

const DOCS = path.join(__dirname, '..', 'docs-dev');
const I18N = path.join(DOCS, 'i18n');
const PAGES = path.join(DOCS, 'pages');
const MOBILE = path.join(PAGES, 'mobile');
const COMPONENTS = path.join(PAGES, 'components');

// Map component dir names to i18n keys
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

function injectFile(filePath, key) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('registerLocale')) return; // already done

  // Determine import depth
  const depth = filePath.includes('/mobile/') ? '../../' : '../../../';
  const importPath = `${depth}i18n/${key}/`;

  // Insert after the useT import
  const importLine = `import { useT${content.includes('registerLocale') ? '' : ', registerLocale'} } from '${depth}doc-i18n';`;

  if (content.includes('import { useT } from')) {
    content = content.replace(
      `import { useT } from '${depth}doc-i18n';`,
      `import { useT, registerLocale } from '${depth}doc-i18n';\nimport zhCN from '${importPath}zh-CN';\nimport enUS from '${importPath}en-US';\nregisterLocale({ 'zh-CN': zhCN, 'en-US': enUS });`
    );
  } else if (content.includes('import { useT, registerLocale }')) {
    // Already has registerLocale but with different keys
    return;
  } else {
    console.log(`  SKIP (no useT import): ${path.relative(DOCS, filePath)}`);
    return;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ${path.relative(DOCS, filePath)}`);
}

// Process desktop pages
const compDirs = fs.readdirSync(COMPONENTS);
for (const dir of compDirs) {
  const compDir = path.join(COMPONENTS, dir);
  if (!fs.statSync(compDir).isDirectory()) continue;
  const key = getKey(dir);
  if (!key || !hasI18n(key)) continue;

  // Find the doc page file
  const files = fs.readdirSync(compDir).filter(f => f.endsWith('DocPage.tsx'));
  for (const f of files) {
    injectFile(path.join(compDir, f), key);
  }
}

// Process mobile pages
const mobileFiles = fs.readdirSync(MOBILE).filter(f => f.endsWith('Mobile.tsx'));
for (const f of mobileFiles) {
  const name = f.replace('Mobile.tsx', '');
  const key = getKey(name);
  if (!key || !hasI18n(key)) continue;
  injectFile(path.join(MOBILE, f), key);
}

console.log('\nDone!');
