const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', 'docs-dev', 'i18n');

// ── Add missing section/demo keys ──
const addSection = (comp, key, zhCN, enUS) => {
  for (const loc of ['zh-CN','en-US']) {
    const f = path.join(I18N, comp, loc + '.ts');
    if (!fs.existsSync(f)) continue;
    let s = fs.readFileSync(f, 'utf8');
    if (s.includes(key + ':')) continue;
    s = s.replace('    section: {', `    section: {\n        ${key}: '${loc === 'zh-CN' ? zhCN : enUS}',`);
    fs.writeFileSync(f, s);
  }
};

const addDemo = (comp, key, zhCN, enUS) => {
  for (const loc of ['zh-CN','en-US']) {
    const f = path.join(I18N, comp, loc + '.ts');
    if (!fs.existsSync(f)) continue;
    let s = fs.readFileSync(f, 'utf8');
    if (s.includes(key + ':')) continue;
    s = s.replace(`    demo: {`, `    demo: {\n        ${key}: '${loc === 'zh-CN' ? zhCN : enUS}',`);
    fs.writeFileSync(f, s);
  }
};

// Section keys
addSection('safearea', 'withNavBar', '配合导航栏', 'With NavBar');
addSection('tag', 'semantic', '语义类型', 'Semantic Types');
addSection('input', 'verifyCode', '验证码', 'Verify Code');

// Demo keys
addDemo('empty', 'customImage', '自定义图片', 'Custom Image');
addDemo('empty', 'imageCustomJSX', 'JSX图片', 'JSX Image');
addDemo('list', 'examples', '示例', 'Examples');
addDemo('input', 'affix', '前后缀', 'Affix');
addDemo('input', 'searchInput', '搜索输入框', 'Search Input');
addDemo('tabbar', 'tabbarAnimated', '动画图标', 'Animated Icon');

console.log('Added missing i18n keys');

// ── Fix Chinese text in demo content ──
const fixFile = (filePath, replacements) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [old, neu] of replacements) {
    content = content.replaceAll(old, neu);
  }
  fs.writeFileSync(filePath, content);
};

// SafeArea demos
fixFile('docs-dev/pages/components/SafeArea/SafeAreaDocPage.tsx', [
  ['SafeArea is a pure style spacer component. Its height reads from CSS variable <code>--sc-safe-area-top</code> or <code>--sc-safe-area-bottom</code>，', 'SafeArea is a pure style spacer component. Its height reads from CSS variables <code>--sc-safe-area-top</code> and <code>--sc-safe-area-bottom</code>, '],
]);

// NavBar - "保存" -> "Save"
fixFile('docs-dev/pages/components/NavBar/NavBarDocPage.tsx', [
  ['text="保存"', 'text="Save"'],
]);

// TabBar - fix mixed Chinese/English
fixFile('docs-dev/pages/components/TabBar/TabBarDocPage.tsx', [
  ['Library does not bundle routing support to avoid coupling with specific routers. On tab switch, use <code>onChange</code> to get the current <code>name</code>, then call your router.由跳转。 Return <code>false</code> in <code>beforeChange</code> to block tab switches, useful for表单未保存时阻止离开等场景。',
   'Library does not bundle routing support to avoid coupling with specific routers. On tab switch, use <code>onChange</code> to get the current <code>name</code>, then navigate programmatically. Return <code>false</code> in <code>beforeChange</code> to block tab switches (e.g. prevent leaving unsaved forms).'],
]);

// Calendar
fixFile('docs-dev/pages/components/Calendar/CalendarDocPage.tsx', [
  ['Via <code>:root</code> or component <code>ProviderConfig</code> to override default color variables.',
   'Override default color variables via <code>:root</code> or component <code>ProviderConfig</code>.'],
]);

console.log('Fixed Chinese in demo content');
