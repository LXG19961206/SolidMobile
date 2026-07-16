const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const I18N = path.join(ROOT, 'docs-dev', 'i18n');

// Simple parse: read old dicts line by line, extract key: 'value'
function parseDict(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const result = { 'zh-CN': {}, 'en-US': {} };
  let currentLocale = null;
  const stack = []; // path stack
  const lines = raw.split('\n');
  for (const line of lines) {
    // Detect locale section
    if (line.match(/^  'zh-CN':/) || line.match(/^  'en-US':/)) {
      currentLocale = line.includes('zh-CN') ? 'zh-CN' : 'en-US';
      stack.length = 0;
      continue;
    }
    if (!currentLocale) continue;
    // Match key: 'value' or key: {
    const m = line.match(/^(\s*)([a-zA-Z_][\w-]*|'[^']*'):\s*(?:'([^']*)'|(\{)|(\[)|(\d+|true|false|null))/);
    if (!m) continue;
    const indent = m[1].length;
    const key = m[2].replace(/'/g, '');
    const strVal = m[3];
    const isObj = m[4];

    // Pop stack to match indent
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) stack.pop();

    // Build path
    const parentPath = stack.length > 0 ? stack[stack.length - 1].path : '';
    const fullPath = parentPath ? parentPath + '.' + key : key;

    if (strVal !== undefined) {
      setNested(result[currentLocale], fullPath, strVal);
    }
    if (isObj) {
      stack.push({ path: fullPath, indent });
    }
  }
  return result;
}

function setNested(obj, path, value) {
  const parts = path.split('.');
  let o = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!o[parts[i]]) o[parts[i]] = {};
    o = o[parts[i]];
  }
  o[parts[parts.length - 1]] = value;
}

function getNested(obj, path) {
  const parts = path.split('.');
  let o = obj;
  for (const p of parts) {
    if (!o || typeof o !== 'object') return undefined;
    o = o[p];
  }
  return o;
}

// Parse both dicts
const main = parseDict(path.join(ROOT, 'docs-dev', 'doc-dictionaries.ts'));
const extra = parseDict(path.join(ROOT, 'docs-dev', 'doc-dictionaries-extra.ts'));

// Merge extra into main
for (const loc of ['zh-CN', 'en-US']) {
  for (const [key, val] of Object.entries(extra[loc])) {
    if (typeof val === 'string') setNested(main[loc], key, val);
  }
}

// Get component list
const COMPS = fs.readdirSync(path.join(ROOT, 'src', 'components'))
  .filter(d => fs.statSync(path.join(ROOT, 'src', 'components', d)).isDirectory());

// All keys from merged dict
const allKeys = new Set();
for (const loc of ['zh-CN', 'en-US']) {
  for (const [key] of Object.entries(main[loc])) {
    allKeys.add(key);
  }
}

// Classify: for each key, find which component it belongs to
function findComp(key) {
  const s = key.toLowerCase().replace(/[^a-z]/g, '');
  for (const c of COMPS) {
    const p = c.replace(/-/g, '');
    if (s.startsWith(p)) return c;
  }
  return null;
}

// Build per-component dicts
const compDicts = {}; // comp -> { 'zh-CN': {}, 'en-US': {} }
const commonDict = { 'zh-CN': {}, 'en-US': {} };

for (const loc of ['zh-CN', 'en-US']) {
  for (const [key, val] of Object.entries(main[loc])) {
    const comp = findComp(key);
    if (comp) {
      if (!compDicts[comp]) compDicts[comp] = { 'zh-CN': {}, 'en-US': {} };
      setNested(compDicts[comp][loc], key, val);
    } else {
      setNested(commonDict[loc], key, val);
    }
  }
}

// Rebuild nested objects from flat paths
function rebuildNested(flat) {
  const result = {};
  for (const [key, val] of Object.entries(flat)) {
    setNested(result, key, val);
  }
  return result;
}

// Write files with proper formatting
function writeTS(fp, obj) {
  const dir = path.dirname(fp);
  fs.mkdirSync(dir, { recursive: true });

  const lines = ['export default {'];

  function walk(o, indent) {
    const keys = Object.keys(o);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const v = o[k];
      const comma = i < keys.length - 1 ? ',' : '';
      const qk = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k.replace(/'/g, "\\'")}'`;

      if (v && typeof v === 'object' && !Array.isArray(v)) {
        lines.push(`${indent}  ${qk}: {`);
        walk(v, indent + '    ');
        lines.push(`${indent}  }${comma}`);
      } else if (typeof v === 'string') {
        lines.push(`${indent}  ${qk}: '${v.replace(/'/g, "\\'")}'${comma}`);
      } else if (v === null) {
        lines.push(`${indent}  ${qk}: null${comma}`);
      } else {
        lines.push(`${indent}  ${qk}: ${JSON.stringify(v)}${comma}`);
      }
    }
  }

  walk(o, '  ');
  lines.push('};\n');
  fs.writeFileSync(fp, lines.join('\n'), 'utf8');
}

// Write everything fresh
fs.rmSync(I18N, { recursive: true, force: true });

// Common
for (const loc of ['zh-CN', 'en-US']) {
  writeTS(path.join(I18N, 'common', loc + '.ts'), rebuildNested(commonDict[loc]));
}

// Per component
for (const [comp, bucket] of Object.entries(compDicts)) {
  for (const loc of ['zh-CN', 'en-US']) {
    if (Object.keys(bucket[loc]).length === 0) continue;
    writeTS(path.join(I18N, comp, loc + '.ts'), rebuildNested(bucket[loc]));
  }
  console.log(comp);
}

console.log(`\nDone: ${Object.keys(compDicts).length} components + common`);
