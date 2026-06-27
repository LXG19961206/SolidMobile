/**
 * Generates icon data for the Icon component.
 *
 * Produces:
 *   1. src/components/Icon/icon-registry.tsx  — full map as raw SVG innerHTML strings
 *   2. src/components/Icon/icons/*.tsx         — individual tree-shakable components (JSX)
 *   3. src/components/Icon/icons/index.ts      — barrel export
 *
 * Prerequisites:
 *   git clone --depth 1 https://github.com/Remix-Design/RemixIcon.git /tmp/remix-icon
 *
 * Usage: node scripts/generate-icons.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REMIX_DIR = '/tmp/remix-icon/icons';
const OUTPUT_MAP = join(__dirname, '..', 'src', 'components', 'Icon', 'icon-registry.tsx');
const OUTPUT_DIR = join(__dirname, '..', 'src', 'components', 'Icon', 'icons');

// ── Curated icon list ──
const ICONS = [
  ['arrow-left'], ['arrow-right'], ['arrow-up'], ['arrow-down'],
  ['arrow-up-down'], ['arrow-left-right'], ['arrow-go-back'], ['arrow-go-forward'],
  ['arrow-drop-down'], ['arrow-drop-up'], ['corner-up-left'], ['corner-down-right'],
  ['home'], ['home-2'], ['menu'], ['more'], ['more-2'],
  ['add'], ['close'], ['subtract'], ['edit'], ['delete-bin'], ['search'],
  ['share'], ['download'], ['upload'], ['refresh'],
  ['external-link'], ['zoom-in'], ['zoom-out'], ['fullscreen'], ['fullscreen-exit'],
  ['link', 'link'], ['link-unlink', 'link-unlink'],
  ['bold', 'bold'], ['italic', 'italic'],
  ['underline', 'underline'], ['strikethrough', 'strikethrough'],
  ['check'], ['close-circle'], ['error-warning'], ['information'],
  ['question'], ['indeterminate-circle'],
  ['checkbox-circle'], ['checkbox-blank-circle'], ['radio-button'],
  ['star'], ['heart'],
  ['user'], ['user-3'], ['group'], ['team'],
  ['account-circle'], ['account-box'], ['user-add'], ['user-follow'],
  ['chat', 'chat-1'], ['message'], ['mail', 'mail-open'], ['phone'], ['at'],
  ['notification'], ['notification-off'], ['send', 'send-plane'],
  ['file'], ['folder'], ['folder-open'], ['file-text'], ['file-copy'],
  ['file-download'], ['file-upload'], ['folder-add'], ['clipboard'], ['todo'],
  ['draft'], ['article'],
  ['list-check', 'list-check'], ['list-ordered', 'list-ordered'],
  ['attachment'], ['code'],
  ['calendar'], ['calendar-2'], ['time'], ['history'], ['dashboard'],
  ['bar-chart'], ['line-chart'], ['pie-chart'],
  ['money', 'money-dollar-circle'], ['shopping-cart'], ['shopping-bag'],
  ['bank-card'], ['wallet'], ['coupon'], ['safe'], ['bookmark'],
  ['price-tag'], ['percent'], ['exchange'], ['filter'],
  ['sort', 'sort-asc'],
  ['play'], ['pause'], ['stop'], ['volume-up'], ['volume-mute'],
  ['camera'], ['image'], ['video'], ['music'], ['headphone'],
  ['computer'], ['tablet'], ['printer'], ['keyboard'], ['server'],
  ['earth'], ['map-pin'], ['compass'], ['sun'], ['moon'], ['cloud'],
  ['settings'], ['settings-3'], ['lock'],
  ['unlock', 'lock-unlock'], ['shield'], ['palette'],
];

const CATEGORY = {
  'home': 'Buildings', 'home-2': 'Buildings',
  'computer': 'Device', 'tablet': 'Device',
  'keyboard': 'Device', 'server': 'Device', 'phone': 'Device',
  'camera': 'Media', 'image': 'Media', 'video': 'Media', 'music': 'Media',
  'headphone': 'Media', 'play': 'Media', 'pause': 'Media', 'stop': 'Media',
  'volume-up': 'Media', 'volume-mute': 'Media', 'fullscreen': 'Media',
  'fullscreen-exit': 'Media', 'notification': 'Media', 'notification-off': 'Media',
  'code': 'Development',
  'earth': 'Map', 'map-pin': 'Map', 'compass': 'Map',
  'sun': 'Weather', 'moon': 'Weather',
  'money': 'Finance', 'money-dollar-circle': 'Finance',
  'shopping-cart': 'Finance', 'shopping-bag': 'Finance',
  'bank-card': 'Finance', 'wallet': 'Finance', 'coupon': 'Finance',
  'safe': 'Finance', 'percent': 'Finance', 'exchange': 'Finance',
  'price-tag': 'Finance',
  'chat': 'Communication', 'chat-1': 'Communication',
  'message': 'Communication',
  'mail': 'Business', 'mail-open': 'Business',
  'at': 'Business', 'send': 'Business', 'send-plane': 'Business',
  'printer': 'Business', 'cloud': 'Business',
  'calendar': 'Business', 'calendar-2': 'Business',
  'bar-chart': 'Business', 'line-chart': 'Business', 'pie-chart': 'Business',
  'bookmark': 'Business',
  'palette': 'Design', 'edit': 'Design',
  'bold': 'Editor', 'italic': 'Editor', 'underline': 'Editor',
  'strikethrough': 'Editor', 'link': 'Editor', 'link-unlink': 'Editor',
  'list-check': 'Editor', 'list-ordered': 'Editor', 'sort-asc': 'Editor',
  'file': 'Document', 'folder': 'Document', 'folder-open': 'Document',
  'file-text': 'Document', 'file-copy': 'Document', 'file-download': 'Document',
  'file-upload': 'Document', 'folder-add': 'Document', 'clipboard': 'Document',
  'todo': 'Document', 'draft': 'Document', 'article': 'Document',
  'user': 'User & Faces', 'user-3': 'User & Faces', 'group': 'User & Faces',
  'team': 'User & Faces', 'account-circle': 'User & Faces',
  'account-box': 'User & Faces', 'user-add': 'User & Faces',
  'user-follow': 'User & Faces',
};

const SINGLE_VARIANT = new Set([
  'bold', 'italic', 'underline', 'strikethrough', 'link', 'link-unlink',
  'list-check', 'list-ordered', 'sort-asc',
]);

const CATEGORIES = [
  'System', 'Arrows', 'Business', 'User & Faces', 'Document',
  'Editor', 'Media', 'Device', 'Communication', 'Map', 'Weather',
  'Finance', 'Design', 'Development', 'Buildings',
  'Logos', 'Food', 'Health & Medical', 'Others',
];

function findFile(baseName) {
  const cat = CATEGORY[baseName];
  if (cat) {
    if (SINGLE_VARIANT.has(baseName)) {
      const p = join(REMIX_DIR, cat, `${baseName}.svg`);
      if (existsSync(p)) return p;
    }
    const lineP = join(REMIX_DIR, cat, `${baseName}-line.svg`);
    const fillP = join(REMIX_DIR, cat, `${baseName}-fill.svg`);
    if (existsSync(lineP)) return { line: lineP, fill: existsSync(fillP) ? fillP : null };
    return null;
  }
  for (const c of CATEGORIES) {
    const lineP = join(REMIX_DIR, c, `${baseName}-line.svg`);
    if (existsSync(lineP)) {
      const fillP = join(REMIX_DIR, c, `${baseName}-fill.svg`);
      return { line: lineP, fill: existsSync(fillP) ? fillP : null };
    }
    if (SINGLE_VARIANT.has(baseName)) {
      const p = join(REMIX_DIR, c, `${baseName}.svg`);
      if (existsSync(p)) return p;
    }
  }
  return null;
}

function extractInner(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const m = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  return m ? m[1].trim() : null;
}

// Convert SVG attribute names to JSX: fill-rule → fillRule
function toJsx(inner) {
  return inner
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule')
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
    .replace(/stroke-dasharray/g, 'strokeDasharray')
    .replace(/stop-color/g, 'stopColor')
    .replace(/stop-opacity/g, 'stopOpacity')
    .replace(/font-family/g, 'fontFamily')
    .replace(/font-size/g, 'fontSize')
    .replace(/text-anchor/g, 'textAnchor');
}

function toPascalCase(kebab) {
  return kebab.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
}

// ── Main ──

const entries = [];
const fileExports = [];
let lineCount = 0, fillCount = 0;
const missing = [];
const singleVariantIcons = [];

for (const [apiName, remixName] of ICONS) {
  const lookupName = remixName ?? apiName;
  const found = findFile(lookupName);

  if (!found) { missing.push(apiName); continue; }

  let lineInner = null, fillInner = null;

  if (SINGLE_VARIANT.has(lookupName)) {
    const filePath = typeof found === 'string' ? found : found;
    lineInner = extractInner(filePath);
    if (lineInner) { lineCount++; singleVariantIcons.push(apiName); }
  } else {
    if (found.line) { lineInner = extractInner(found.line); if (lineInner) lineCount++; }
    if (found.fill) { fillInner = extractInner(found.fill); if (fillInner) fillCount++; }
    else if (lineInner) { fillInner = lineInner; fillCount++; }
  }

  // Map entry: raw SVG innerHTML strings
  const escLine = (lineInner || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const escFill = (fillInner || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  entries.push(`  '${apiName}': {\n    line: '${escLine}',\n    fill: '${escFill}',\n  }`);

  // Individual component file (uses JSX)
  if (lineInner) {
    const componentName = toPascalCase(apiName);
    const hasFill = fillInner && fillInner !== lineInner;
    const lineJSX = toJsx(lineInner);
    let code;
    if (hasFill) {
      const fillJSX = toJsx(fillInner);
      code = `export function ${componentName}(props: { size?: string | number; color?: string; class?: string; variant?: 'line' | 'fill'; }) {
  const s = () => typeof props.size === 'number' ? \`\${props.size}px\` : props.size ?? '1em';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={s()} height={s()}
      fill="currentColor" color={props.color} class={props.class} aria-hidden="true"
      innerHTML={props.variant === 'fill' ? '${fillJSX.replace(/'/g, "\\'")}' : '${lineJSX.replace(/'/g, "\\'")}'} />
  );
}`;
    } else {
      code = `export function ${componentName}(props: { size?: string | number; color?: string; class?: string; }) {
  const s = () => typeof props.size === 'number' ? \`\${props.size}px\` : props.size ?? '1em';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={s()} height={s()}
      fill="currentColor" color={props.color} class={props.class} aria-hidden="true"
      innerHTML={'${lineJSX.replace(/'/g, "\\'")}'} />
  );
}`;
    }
    writeFileSync(join(OUTPUT_DIR, `${componentName}.tsx`), code, 'utf-8');
    fileExports.push(componentName);
  }
}

// Barrel index
const barrelIndex = `// Auto-generated — ${fileExports.length} tree-shakable icon components.
// Source: Remix Icon (Apache 2.0)
${fileExports.map(n => `export { ${n} } from './${n}';`).join('\n')}
`;
writeFileSync(join(OUTPUT_DIR, 'index.ts'), barrelIndex, 'utf-8');

// Full map
const mapOutput = `/**
 * Remix Icon SVG innerHTML data — auto-generated.
 * Contains ${lineCount} line + ${fillCount} fill variants across ${entries.length} icons.
 * Rendered via \`<g innerHTML={...} />\` to avoid SVG namespace issues in Solid.
 * Source: Remix Icon (Apache 2.0)
 */

export const icons: Record<string, { line: string; fill: string }> = {
${entries.join(',\n')}
};
`;
writeFileSync(OUTPUT_MAP, mapOutput, 'utf-8');

console.log(`✅ icon-registry.tsx: ${entries.length} icons (${lineCount} line, ${fillCount} fill)`);
console.log(`✅ icons/: ${fileExports.length} individual components`);
if (singleVariantIcons.length) console.log(`   📝 Single: ${singleVariantIcons.join(', ')}`);
if (missing.length) console.log(`   ⚠️  Missing (${missing.length}): ${missing.join(', ')}`);
