const fs = require('fs');
const path = require('path');
const hasCN = s => /[一-鿿]/.test(s);

const PAGES = path.join(__dirname, '..', 'docs-dev', 'pages');

// Map of common Chinese text -> English replacement in code/demo content
const replacements = [
  // Button
  ['打开链接', 'Open Link'],
  ['更新日志', 'Release Notes'],
  ['删除确认', 'Confirm Delete'],
  ['弹出提示', 'Show Alert'],
  ['纯消息', 'Plain Message'],
  ['异步提交', 'Async Submit'],
  ['组件弹窗', 'Component Dialog'],
  ['选择操作', 'Choose Action'],
  ['知道了', 'Got it'],
  ['关闭', 'Close'],
  ['提示', 'Notice'],
  ['全选', 'Select All'],
  ['中文', 'Chinese'],
  ['日本語', 'Japanese'],
  ['加载中', 'Loading...'],
  ['加载完成', 'Load Complete'],
  ['自定义文案', 'Custom Text'],
  ['不可编辑', 'Not editable'],
  ['格式不正确', 'Invalid format'],
  ['请输入邮箱', 'Enter email'],
  ['邮箱', 'Email'],
  ['生日', 'Birthday'],
  ['固定导航', 'Fixed Nav'],
  ['编辑资料', 'Edit Profile'],
  ['组件方式调用', 'Component Usage'],
  ['短', 'Short'],
  ['再用力一点', 'Pull harder'],
  ['行内', 'Inline'],
  ['前面文字', 'Before text'],
  ['大文字', 'Big text'],
  ['对齐我', 'Align me'],
  ['绝对居中', 'Absolute Center'],
  ['这段文字会居中', 'This text will be centered'],
  ['通过 <code>:root</code> 或组件 <code>', 'Via <code>:root</code> or component <code>'],
  ['构建特殊日期映射', 'Build special date map'],
  ['禁用选项', 'Disabled Option'],
  ['如果需要更多层级', 'For deeper nesting, CityPicker defaults to 3 levels.'],
  ['的 tree 模式支持任意深度级联', 'uses tree mode for arbitrary depth.'],
  ['默认只做三级', 'defaults to 3 levels.'],
  // Form
  ['数字', 'Number'],
  ['年龄', 'Age'],
  ['手机号', 'Phone'],
  ['密码', 'Password'],
  ['性别', 'Gender'],
  ['男', 'Male'],
  ['女', 'Female'],
  ['备注', 'Note'],
  // PullRefresh
  ['刷新于', 'Refreshed at '],
  ['自定义文案', 'Custom Text'],
  ['Push to Refresh', 'Pull to Refresh'],
  // Icon
  ['线性 Line', 'Line Style'],
  ['填充 Fill', 'Fill Style'],
  // Loading
  ['演示遮罩加载', 'Demo: overlay loading'],
  ['后自动关闭', 'Then auto-close.'],
  ['通过 JSX 组件方式调用的弹窗。适合需要将 Dialog 嵌入模板、受控显示的场景。', 'Dialog rendered as a JSX component. Useful for embedding into templates with controlled visibility.'],
  ['通过', 'Via '],
  ['或组件', ' or component '],
  ['如果', 'If '],
  ['更多层级', ' more levels'],
  ['默认', 'Default '],
  ['支持', 'Supports '],
  ['任意', 'Arbitrary '],
  ['深度', 'Depth '],
  ['级联', 'cascade'],
  ['无限', 'Infinite '],
  ['层级数', 'Level count'],
  ['三级', '3 levels'],
];

let fixed = 0;
const files = [];

function processDir(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const fp = path.join(dir, entry);
    if (fs.statSync(fp).isDirectory()) { processDir(fp); continue; }
    if (!entry.endsWith('.tsx')) continue;
    let content = fs.readFileSync(fp, 'utf8');
    let changed = false;
    for (const [cn, en] of replacements) {
      if (content.includes(cn)) {
        content = content.replace(new RegExp(cn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), en);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(fp, content, 'utf8');
      fixed++;
      files.push(path.relative(PAGES, fp));
    }
  }
}

processDir(PAGES);
console.log(`Fixed ${fixed} files`);
files.forEach(f => console.log('  ' + f));
