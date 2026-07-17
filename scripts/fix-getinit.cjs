const fs = require('fs');
let s = fs.readFileSync('src/i18n/context.tsx', 'utf8');

s = s.replace(
  `function getInitial(): string {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (stored) return stored;
  }
  return 'zh-CN';
}`,
  `function getInitial(): string {
  // URL 参数优先（iframe 场景）
  if (typeof window !== 'undefined') {
    const urlParam = new URLSearchParams(window.location.search).get('locale');
    if (urlParam) return urlParam;
  }
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (stored) return stored;
  }
  return 'zh-CN';
}`
);

fs.writeFileSync('src/i18n/context.tsx', s);
console.log('Done');
