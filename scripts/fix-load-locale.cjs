const fs = require('fs');
const path = require('path');
const DOCS = path.join(__dirname, '..', 'docs-dev');

// Map of known component keys from i18n directory
const I18N = path.join(DOCS, 'i18n');
const knownKeys = new Set();
for (const d of fs.readdirSync(I18N)) {
  if (fs.statSync(path.join(I18N, d)).isDirectory() && d !== 'common') {
    knownKeys.add(d);
  }
}

function processFile(filePath, depth) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract the loadLocale('xxx') key
  const m = content.match(/loadLocale\('([^']+)'\)/);
  if (!m) return false;
  const key = m[1];
  if (!knownKeys.has(key)) return false;

  // Remove old loadLocale import + call
  content = content.replace(/import \{ useT, loadLocale \} from '[^']+doc-i18n';\nloadLocale\('[^']+'\);\n/, '');
  content = content.replace(/import \{ loadLocale \} from '[^']+doc-i18n';\nloadLocale\('[^']+'\);\n/, '');

  // Replace useT import with clean version
  const importPath = depth + 'doc-i18n';
  content = content.replace(`import { useT } from '${importPath}';`, '');
  content = content.replace(`import { useT, registerLocale } from '${importPath}';`, '');
  content = content.replace(`import { useT, loadLocale } from '${importPath}';`, '');

  // Add static imports at the very top (after the first import line)
  const staticBlock = `import zhCN from '${depth}i18n/${key}/zh-CN';\nimport enUS from '${depth}i18n/${key}/en-US';\nimport { registerLocale } from '${depth}doc-i18n';\nregisterLocale({ 'zh-CN': zhCN, 'en-US': enUS });\nimport { useT } from '${depth}doc-i18n';`;

  // Find the first useT import or Solid import and insert after it
  if (content.includes("from 'solid-js'")) {
    content = content.replace(/import .* from 'solid-js';\n/, "$&\n" + staticBlock + "\n");
  } else if (content.includes("from 'solid-js/web'")) {
    content = content.replace(/import .* from 'solid-js\/web';\n/, "$&\n" + staticBlock + "\n");
  } else {
    content = staticBlock + "\n" + content;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

let count = 0;
function walk(dir, depth) {
  for (const f of fs.readdirSync(dir, { recursive: true })) {
    if (!f.endsWith('.tsx')) continue;
    const fp = path.join(dir, f);
    if (processFile(fp, depth)) count++;
  }
}

walk(path.join(DOCS, 'pages', 'components'), '../../../');
walk(path.join(DOCS, 'pages', 'mobile'), '../../');

console.log(`Fixed ${count} files`);
