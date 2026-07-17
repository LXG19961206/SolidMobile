const fs = require('fs');
const s = fs.readFileSync('docs-dev/App.tsx', 'utf8');
const lines = s.split('\n');
let start = -1, depth = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const refreshIframe = () =>')) start = i;
  if (start >= 0 && lines[i].includes('{')) depth += (lines[i].match(/\{/g)||[]).length;
  if (start >= 0 && lines[i].includes('}')) depth -= (lines[i].match(/\}/g)||[]).length;
  if (start >= 0 && depth === 0) {
    const newBlock = `  const refreshIframe = () => {
    const el = document.querySelector('iframe[title="Mobile Preview"]') as HTMLIFrameElement;
    if (!el) return;
    const loc = typeof localStorage !== 'undefined' ? (localStorage.getItem('sc-docs-locale') || 'zh-CN') : 'zh-CN';
    const key = window.location.hash.replace('#/', '').replace(/^components\\//, '').split('?')[0];
    el.src = '/?mobile=' + key + '&locale=' + loc;
  };`;
    lines.splice(start, i - start + 1, newBlock);
    fs.writeFileSync('docs-dev/App.tsx', lines.join('\n'));
    console.log('Done');
    process.exit(0);
  }
}
console.log('Not found');
