#!/usr/bin/env node
/**
 * Batch migration script: wraps all .module.css imports with scopedStyle()
 * so consumers can override styles via stable class names like .sc-button-root.
 *
 * Run: node scripts/migrate-scoped-style.mjs
 * Dry-run: DRY_RUN=1 node scripts/migrate-scoped-style.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DRY_RUN = !!process.env.DRY_RUN;

// ── PascalCase → kebab-case ──────────────────────────────────────────
function pascalToKebab(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// ── Namespace from file path ─────────────────────────────────────────
function getNamespace(filePath, srcDir) {
  const relPath = path.relative(srcDir, filePath);
  const parts = relPath.split(path.sep);

  if (parts[0] === 'components') {
    return 'sc-' + pascalToKebab(parts[1]);
  }

  const baseName = path.basename(filePath, path.extname(filePath));
  if (parts[0] === 'doc-utils') {
    return 'sc-doc-' + pascalToKebab(baseName);
  }
  if (parts[0] === 'design-tokens') {
    return 'sc-dt-' + pascalToKebab(baseName);
  }

  return 'sc-' + pascalToKebab(baseName);
}

// ── Compute relative import path to src/utils ─────────────────────────
function getUtilsRelPath(filePath, srcDir) {
  const fileDir = path.dirname(filePath);
  const utilsDir = path.join(srcDir, 'utils');
  let rel = path.relative(fileDir, utilsDir);
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

// ── Transform a single file ──────────────────────────────────────────
function transformFile(filePath, srcDir) {
  let content = fs.readFileSync(filePath, 'utf-8');

  const namespace = getNamespace(filePath, srcDir);
  const utilsRelPath = getUtilsRelPath(filePath, srcDir);

  // 1. Find and rename the CSS module import: styles → rawStyles
  const cssImportRegex = /^import\s+styles\s+from\s+(["'])\.\/[^"']+\.module\.css\1;?$/m;
  const cssMatch = content.match(cssImportRegex);

  if (!cssMatch) {
    console.log(`  SKIP — no matching "import styles from './*.module.css'" line`);
    return false;
  }

  const oldCssLine = cssMatch[0];
  const newCssLine = oldCssLine.replace(/^import\s+styles\s+from/, 'import rawStyles from');
  content = content.replace(oldCssLine, newCssLine);

  // 2. Handle utils import — add scopedStyle, then append the const line.
  // These two go together to keep the right order:
  //   import rawStyles from '...'
  //   import { scopedStyle } from '...'   ← only if no existing utils import
  //   const styles = scopedStyle(rawStyles, 'ns');
  const scopedLine = `const styles = scopedStyle(rawStyles, '${namespace}');`;

  // Skip if already present (idempotent)
  if (content.includes('scopedStyle(rawStyles')) {
    console.log(`  SKIP — scopedStyle call already present`);
    return false;
  }

  // Match any single-line `import { ... } from '...utils'`
  const utilsImportRegex = /^import\s*\{([^}]+)\}\s*from\s*(["'])([^"']*utils)\2;?$/m;
  const utilsMatch = content.match(utilsImportRegex);

  if (utilsMatch) {
    // Existing utils import found — add scopedStyle to the destructured list
    const rawImports = utilsMatch[1];
    const names = rawImports.split(',').map(s => s.trim()).filter(Boolean);

    if (!names.includes('scopedStyle')) {
      names.push('scopedStyle');
      const newImportLine = `import { ${names.join(', ')} } from '${utilsMatch[3]}';`;
      content = content.replace(utilsMatch[0], newImportLine);
    }

    // Insert const line right after the rawStyles import
    const rawCssRegex = /^import rawStyles from .*$/m;
    content = content.replace(rawCssRegex, (match) => match + '\n' + scopedLine);
  } else {
    // No existing utils import — add both import + const line after rawStyles
    const newImportLine = `import { scopedStyle } from '${utilsRelPath}';`;
    const rawCssRegex = /^import rawStyles from .*$/m;
    content = content.replace(
      rawCssRegex,
      (match) => match + '\n' + newImportLine + '\n' + scopedLine,
    );
  }

  // 4. Write back
  if (DRY_RUN) {
    console.log(`  DRY-RUN — would modify: ${filePath}`);
    console.log(`    namespace: ${namespace}, utils: ${utilsRelPath}`);
  } else {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
  return true;
}

// ── Main ─────────────────────────────────────────────────────────────
const srcDir = path.join(PROJECT_ROOT, 'src');

// Collect all .tsx/.ts files in src that import .module.css
// (use the exact file list from our manual grep)
const files = [
  // === components ===
  'src/components/Radio/Radio.tsx',
  'src/components/Checkbox/Checkbox.tsx',
  'src/components/TabBar/TabBar.tsx',
  'src/components/Lazyload/Lazyload.tsx',
  'src/components/List/List.tsx',
  'src/components/Icon/Icon.tsx',
  'src/components/Badge/Badge.tsx',
  'src/components/Slider/Slider.tsx',
  'src/components/Loading/Loading.tsx',
  'src/components/Input/Input.tsx',
  'src/components/Center/Center.tsx',
  'src/components/SwipeCell/SwipeCell.tsx',
  'src/components/NavBar/NavBar.tsx',
  'src/components/Upload/Upload.tsx',
  'src/components/Stepper/Stepper.tsx',
  'src/components/Empty/Empty.tsx',
  'src/components/Tag/Tag.tsx',
  'src/components/PullRefresh/PullRefresh.tsx',
  'src/components/Picker/Picker.tsx',
  'src/components/Tabs/Tabs.tsx',
  'src/components/Avatar/Avatar.tsx',
  'src/components/Layout/Layout.tsx',
  'src/components/Button/Button.tsx',
  'src/components/Calendar/Calendar.tsx',
  'src/components/Textarea/Textarea.tsx',
  'src/components/ActionSheet/ActionSheet.tsx',
  'src/components/Switch/Switch.tsx',
  'src/components/Swiper/Swiper.tsx',
  'src/components/notify/NotifyItem.tsx',
  'src/components/Cascader/Cascader.tsx',
  'src/components/Divider/Divider.tsx',
  'src/components/Popup/Popup.tsx',
  'src/components/Image/Image.tsx',
  'src/components/Toast/ToastItem.tsx',
  'src/components/Overlay/Overlay.tsx',
  'src/components/Dialog/Dialog.tsx',
  'src/components/Cell/CellGroup.tsx',
  'src/components/Cell/Cell.tsx',
  'src/components/Rate/Rate.tsx',
  // === doc-utils ===
  'src/doc-utils/DocTOC.tsx',
  'src/doc-utils/PhoneSimulator.tsx',
  'src/doc-utils/DemoBlock.tsx',
  'src/doc-utils/PropsTable.tsx',
  'src/doc-utils/DocLayout.tsx',
  'src/doc-utils/mobile/MobilePreview.tsx',
  // === design-tokens ===
  'src/design-tokens/DesignTokenShowcase.tsx',
].map(f => path.join(PROJECT_ROOT, f));

console.log(`\n${DRY_RUN ? '🔍 DRY RUN' : '🔧 MIGRATING'} — ${files.length} files\n`);

let changed = 0;
let skipped = 0;

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    console.log(`MISS: ${path.relative(PROJECT_ROOT, filePath)}`);
    skipped++;
    continue;
  }
  const rel = path.relative(PROJECT_ROOT, filePath);
  process.stdout.write(`${rel} ... `);
  const ok = transformFile(filePath, srcDir);
  if (ok) { changed++; console.log('✓'); }
  else { skipped++; console.log('(unchanged)'); }
}

console.log(`\n${DRY_RUN ? 'Would change' : 'Changed'}: ${changed}  Skipped: ${skipped}\n`);
