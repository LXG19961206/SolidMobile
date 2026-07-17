const fs = require('fs');
let s = fs.readFileSync('docs-dev/App.tsx', 'utf8');

s = s.replace(
  /const refreshIframe = \(\) => \{[\s\S]*?\};/,
  `const refreshIframe = () => {
    const el = document.querySelector('iframe[title="Mobile Preview"]') as HTMLIFrameElement;
    if (!el) return;
    const key = window.location.hash.replace('#/', '').replace(/^components\\//, '').split('?')[0];
    el.src = '/?mobile=' + key + '&locale=' + useLocale();
  };`
);

fs.writeFileSync('docs-dev/App.tsx', s);
console.log('Done');
