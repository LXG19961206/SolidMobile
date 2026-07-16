const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DOCS = path.join(ROOT, 'docs-dev');
const I18N = path.join(DOCS, 'i18n');
const PAGES = path.join(DOCS, 'pages');

// ── Collect all i18n keys from dict files ──
const allKeys = { 'zh-CN': new Set(), 'en-US': new Set() };

function collectKeys(obj, prefix = '') {
  if (!obj || typeof obj !== 'object') return;
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      collectKeys(v, full);
    } else {
      allKeys['zh-CN'].add(full);
      allKeys['en-US'].add(full);
    }
  }
}

// Parse all i18n files
function parseTS(file) {
  const raw = fs.readFileSync(file, 'utf8');
  // Extract the default export object
  const m = raw.match(/export default (\{[\s\S]*\});?\s*$/);
  if (!m) return {};
  try { return new Function('return ' + m[1])(); }
  catch(e) { return {}; }
}

for (const dir of fs.readdirSync(I18N)) {
  const dp = path.join(I18N, dir);
  if (!fs.statSync(dp).isDirectory()) continue;
  for (const loc of ['zh-CN', 'en-US']) {
    const f = path.join(dp, loc + '.ts');
    if (!fs.existsSync(f)) continue;
    collectKeys(parseTS(f));
  }
}

// ── Scan doc pages for t('...') calls ──
const missing = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(PAGES, filePath);
  // Match t('key') and t("key")
  const re = /t\(['"]([^'"]+)['"]\)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const key = m[1];
    if (!key.includes('.')) continue; // skip simple keys
    // Check if key exists in either locale
    const hasZH = allKeys['zh-CN'].has(key);
    const hasEN = allKeys['en-US'].has(key);
    if (!hasZH || !hasEN) {
      missing.push({ file: rel, key, zh: hasZH ? '✓' : '✗', en: hasEN ? '✓' : '✗' });
    }
  }
}

function scanDir(dir) {
  for (const f of fs.readdirSync(dir, { recursive: true })) {
    if (!f.endsWith('.tsx')) continue;
    scanFile(path.join(dir, f));
  }
}

scanDir(PAGES);

// ── Report ──
if (missing.length === 0) {
  console.log('✅ All i18n keys found!');
} else {
  const grouped = {};
  for (const { file, key, zh, en } of missing) {
    const prefix = key.split('.')[0];
    if (!grouped[prefix]) grouped[prefix] = [];
    grouped[prefix].push({ file, key, zh, en });
  }

  console.log(`❌ ${missing.length} missing keys:\n`);
  for (const [prefix, items] of Object.entries(grouped).sort()) {
    console.log(`\n## ${prefix} (${items.length} keys)`);
    // Deduplicate by key
    const seen = new Set();
    for (const { key, zh, en } of items) {
      if (seen.has(key)) continue;
      seen.add(key);
      const status = zh === '✗' && en === '✗' ? 'BOTH MISSING' : zh === '✗' ? 'zh-CN missing' : 'en-US missing';
      console.log(`  ${key} [${status}]`);
    }
  }
}
