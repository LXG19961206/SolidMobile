const fs = require('fs');
let s = fs.readFileSync('docs-dev/components/Button/ButtonMobile.tsx', 'utf8');

// Remove import { useLocale }
s = s.replace(", useLocale", "");

// Remove const loc line
s = s.replace("const loc = useLocale();\n  ", "");

// Remove the debug span line
s = s.replace(`      <span style="display:block;padding:4px 12px;font-size:11px;color:red;background:#fee">useLocale={loc} | localStorage={typeof window!="undefined"?localStorage.getItem("sc-docs-locale"):"?"} | url={typeof window!="undefined"?window.location.search:""}</span>\n`, "");

fs.writeFileSync('docs-dev/components/Button/ButtonMobile.tsx', s);
console.log('Done');
