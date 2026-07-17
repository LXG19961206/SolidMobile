const fs = require('fs');
let s = fs.readFileSync('docs-dev/components/Button/ButtonMobile.tsx', 'utf8');

s = s.replace(
  `<span style="display:block;padding:4px 12px;font-size:11px;color:red;background:#fee">Locale: {loc} (zh-CN=按钮类型, en-US=Types)</span>`,
  `<span style="display:block;padding:4px 12px;font-size:11px;color:red;background:#fee">useLocale={loc} | localStorage={typeof window!="undefined"?localStorage.getItem("sc-docs-locale"):"?"} | url={typeof window!="undefined"?window.location.search:""}</span>`
);

fs.writeFileSync('docs-dev/components/Button/ButtonMobile.tsx', s);
console.log('Done');
