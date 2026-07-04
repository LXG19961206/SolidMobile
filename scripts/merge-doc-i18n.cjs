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

// Extract docMessages
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

// Find the messages object's opening { and closing }
const msgMatch = dict.match(/export const messages[^=]*=\s*\{/);
if (!msgMatch) { console.error('[doc-i18n] Cannot find messages'); process.exit(1); }
depth = 0;
let msgOpen = msgMatch.index + msgMatch[0].length - 1;
let msgClose = -1;
for (let i = msgOpen; i < dict.length; i++) {
  if (dict[i] === '{') depth++;
  else if (dict[i] === '}') { depth--; if (depth === 0) { msgClose = i; break; } }
}
if (msgClose === -1) { console.error('[doc-i18n] Cannot close messages'); process.exit(1); }

// Check for trailing semicolon
let semicolon = '';
if (dict[msgClose + 1] === ';') semicolon = ';';

// Build the wrapper: (function(base) { merge; return base; })({ ... })
const before = dict.slice(0, msgMatch.index + msgMatch[0].length - 1); // up to the {
const inner = dict.slice(msgOpen + 1, msgClose); // inside the object (no braces)
const after = dict.slice(msgClose + 1 + semicolon.length); // after };

const merged = before +
  '/* doc-keys-merged */ (function __mergeDocI18n(base) {\n' +
  '  var doc = ' + docObj + ';\n' +
  '  for (var locale in doc) {\n' +
  '    if (!base[locale]) base[locale] = {};\n' +
  '    (function deepMerge(t, s) {\n' +
  '      for (var k in s) {\n' +
  '        if (s[k] && typeof s[k] === \'object\' && !Array.isArray(s[k])) {\n' +
  '          if (!t[k]) t[k] = {};\n' +
  '          deepMerge(t[k], s[k]);\n' +
  '        } else { t[k] = s[k]; }\n' +
  '      }\n' +
  '    })(base[locale], doc[locale]);\n' +
  '  }\n' +
  '  return base;\n' +
  '})({\n' +
  inner + '\n' +
  '})' + semicolon + '\n' + after;

fs.writeFileSync(dictPath, merged);
console.log('[doc-i18n] wrapped messages in merge IIFE');
