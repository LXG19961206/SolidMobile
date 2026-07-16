const fs = require('fs');
const path = require('path');

const appTsx = path.join(__dirname, '..', 'docs-dev', 'App.tsx');
let lines = fs.readFileSync(appTsx, 'utf8').split('\n');

// 1. Add lazy to Solid import
lines = lines.map(l => l.replace(
  "type Component } from 'solid-js';",
  "type Component, lazy } from 'solid-js';"
));

// 2. Convert DocPage & Mobile static imports to lazy()
const newLines = [];
for (const line of lines) {
  const m = line.match(/^import \{ ([^}]+) \} from '(\.[^']+)';$/);
  if (m) {
    const names = m[1].split(',').map(s => s.trim());
    const importPath = m[2];
    const lazyNames = [];
    const staticNames = [];
    for (const name of names) {
      // Only lazy-load DocPage and Mobile components
      // Skip Sidebar, NavBar, hooks, etc.
      if (name.endsWith('DocPage') || name.endsWith('Mobile') && !name.startsWith('Sidebar')) {
        lazyNames.push(name);
      } else {
        staticNames.push(name);
      }
    }
    if (lazyNames.length > 0) {
      for (const n of lazyNames) {
        newLines.push(`const ${n} = lazy(() => import('${importPath}'));`);
      }
    }
    if (staticNames.length > 0) {
      newLines.push(`import { ${staticNames.join(', ')} } from '${importPath}';`);
    }
  } else {
    newLines.push(line);
  }
}

// 3. Restore the original mobile preview import (should stay static)
const final = newLines.join('\n');

fs.writeFileSync(appTsx, final, 'utf8');
console.log('Done!');
