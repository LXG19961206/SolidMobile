const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

// Simple check: for each t('xxx.yyy') call in doc pages,
// extract the last segment (the key name) and check if it exists
// in any i18n file as a key:value pair.
const result = execSync(
  `grep -roh "t('[^')]*" docs-dev/pages/ | sed "s/t('//" | sort -u`,
  { cwd: ROOT, encoding: 'utf8' }
);

const lines = result.trim().split('\n');
const missing = [];

for (const fullKey of lines) {
  if (!fullKey.includes('.')) continue; // skip simple keys
  const last = fullKey.split('.').pop();
  // Check if this key name exists in any i18n file
  try {
    execSync(`grep -rq "^\\s*${last}:\\|'${last}':" docs-dev/i18n/`, { cwd: ROOT });
  } catch {
    missing.push(fullKey);
  }
}

if (missing.length === 0) {
  console.log('✅ All i18n keys found in dictionary files.');
} else {
  console.log(`❌ ${missing.length} missing keys:`);
  missing.forEach(k => console.log(`  ${k}`));
  process.exit(1);
}
