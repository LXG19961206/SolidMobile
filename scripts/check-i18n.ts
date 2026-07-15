/**
 * 检查文档页中 t() 和 desc 引用的 i18n key 是否在字典中存在。
 * usage: npx tsx scripts/check-i18n.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs-dev', 'pages');
const DICT_FILES = [
  path.join(ROOT, 'docs-dev', 'doc-dictionaries.ts'),
  path.join(ROOT, 'docs-dev', 'doc-dictionaries-extra.ts'),
];

// ── 从 dict 文件中提取顶层 key 结构 ──
// 因为这些文件太庞大，不用 eval，改为按缩进解析 key 路径
const dictKeys = new Set<string>();

function collectKeys(file: string) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const stack: string[] = [];
  for (const line of lines) {
    // 匹配 "key:" 或 "key: {" 或 "key: '...'" 模式
    const m = line.match(/^(\s*)([a-zA-Z_][\w-]*)\s*:\s*(?:['"][^'"]*['"]|\{|\d+|true|false|null)/);
    if (!m) continue;
    const indent = m[1].length;
    const key = m[2];
    // 根据缩进维护 key path
    while (stack.length > 0 && indent <= stack[stack.length - 1][1]) {
      stack.pop();
    }
    const parentPath = stack.length > 0 ? stack[stack.length - 1][0] : '';
    const fullKey = parentPath ? `${parentPath}.${key}` : key;
    stack.push([fullKey, indent, key] as [string, number, string]);
    dictKeys.add(fullKey);
  }
}

for (const f of DICT_FILES) {
  if (fs.existsSync(f)) collectKeys(f);
}

// ── 扫描文档页中的引用 ──
const i18nPrefixes = ['demo.', 'demoDesc.', 'componentProps.', 'componentIntro.', 'section.', 'cssVars.', 'nav.'];

function isDocI18nKey(key: string) {
  return i18nPrefixes.some(p => key.startsWith(p));
}

const missing: string[] = [];

function scanDir(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (entry.name.endsWith('.tsx')) {
      const content = fs.readFileSync(full, 'utf8');
      const relPath = path.relative(ROOT, full);

      // t('...')
      for (const m of content.matchAll(/\bt\(['"]([^'"]+)['"]\)/g)) {
        const key = m[1];
        if (isDocI18nKey(key) && !dictKeys.has(key)) {
          missing.push(`${relPath} → t('${key}')`);
        }
      }

      // desc: 'componentProps.xxx'
      for (const m of content.matchAll(/\bdesc:\s*['"]([^'"]+)['"]/g)) {
        const key = m[1];
        if (isDocI18nKey(key) && !dictKeys.has(key)) {
          missing.push(`${relPath} → desc: '${key}'`);
        }
      }
    }
  }
}

scanDir(DOCS_DIR);

// ── Report ──
const unique = [...new Set(missing)].sort();
if (unique.length === 0) {
  console.log('✅ All doc i18n keys found in dictionaries.');
} else {
  console.log(`❌ ${unique.length} missing i18n key(s):\n`);
  for (const m of unique) console.log(`   ${m}`);
  process.exit(1);
}
