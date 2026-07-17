const fs = require('fs');
let s = fs.readFileSync('docs-dev/App.tsx', 'utf8');
const lines = s.split('\n');
let start = -1, depth = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const refreshIframe = () =>')) start = i;
  if (start >= 0) {
    if (lines[i].includes('{')) depth += (lines[i].match(/\{/g)||[]).length;
    if (lines[i].includes('}')) depth -= (lines[i].match(/\}/g)||[]).length;
    if (depth === 0) {
      lines.splice(start, i - start + 1,
        `  const refreshIframe = () => {
    const el = document.querySelector('iframe[title="Mobile Preview"]') as HTMLIFrameElement;
    if (!el) return;
    const loc = typeof localStorage !== 'undefined' ? (localStorage.getItem('sc-docs-locale') || 'zh-CN') : 'zh-CN';
    const key = window.location.hash.replace('#/', '').replace(/^components\\//, '').split('?')[0];
    el.src = '/?mobile=' + key + '&locale=' + loc + '&t=' + Date.now();
  };`);
      fs.writeFileSync('docs-dev/App.tsx', lines.join('\n'));
      console.log('Done');
      process.exit(0);
    }
  }
}
console.log('Not found');
