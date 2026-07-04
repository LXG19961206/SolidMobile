#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dictPath = path.resolve(__dirname, '../src/i18n/dictionaries.ts');
const docPath = path.resolve(__dirname, '../docs-dev/doc-dictionaries.ts');
const backupPath = dictPath + '.backup';

let dict = fs.readFileSync(dictPath, 'utf8');
if (dict.includes('/* doc-keys-merged */')) {
  console.log('[doc-i18n] already merged, skipping');
  process.exit(0);
}
fs.writeFileSync(backupPath, dict);

// Extract docMessages object literal by brace-counting
let doc = fs.readFileSync(docPath, 'utf8');
const startMatch = doc.match(/export\s+const\s+docMessages[^{]*\{/);
if (!startMatch) { console.error('[doc-i18n] Cannot find docMessages'); process.exit(1); }

let depth = 0;
let startIdx = startMatch.index + startMatch[0].length - 1;
let endIdx = -1;
for (let i = startIdx; i < doc.length; i++) {
  if (doc[i] === '{') depth++;
  else if (doc[i] === '}') { depth--; if (depth === 0) { endIdx = i; break; } }
}
if (endIdx === -1) { console.error('[doc-i18n] Cannot close docMessages'); process.exit(1); }
const docObj = doc.slice(startIdx, endIdx + 1);

// Append a self-executing merge after the messages declaration.
// Find the closing of `export const messages` — it's the last `};` or `}\n`
// in the file (the messages object spans the entire file content).
const mergeCode = `
/* doc-keys-merged */
(function __mergeDocI18n(src) {
  var doc = ${docObj};
  for (var locale in doc) {
    if (!src[locale]) src[locale] = {};
    (function deepMerge(t, s) {
      for (var k in s) {
        if (s[k] && typeof s[k] === 'object' && !Array.isArray(s[k])) {
          if (!t[k]) t[k] = {};
          deepMerge(t[k], s[k]);
        } else {
          t[k] = s[k];
        }
      }
    })(src[locale], doc[locale]);
  }
})(messages);
`;

// Insert the merge code right before the last closing brace of messages
// The messages object spans from `export const messages = {` to the last `}`
const objStartMatch = dict.match(/export const messages[^=]*=\s*\{/);
if (!objStartMatch) { console.error('[doc-i18n] Cannot find messages'); process.exit(1); }

// Find the matching closing brace from the start
depth = 0;
let objStart = objStartMatch.index + objStartMatch[0].length - 1;
let objEnd = -1;
for (let i = objStart; i < dict.length; i++) {
  if (dict[i] === '{') depth++;
  else if (dict[i] === '}') { depth--; if (depth === 0) { objEnd = i; break; } }
}
if (objEnd === -1) { console.error('[doc-i18n] Cannot close messages'); process.exit(1); }

// Insert merge code AFTER the messages declaration.
// The closing is at objEnd. Check if there's a trailing semicolon.
let afterObj = objEnd;
if (dict[objEnd + 1] === ';') afterObj = objEnd + 1;
dict = dict.slice(0, afterObj + 1) + '\n' + mergeCode + '\n' + dict.slice(afterObj + 1);

fs.writeFileSync(dictPath, dict);
console.log('[doc-i18n] merged doc keys into dictionaries.ts');
