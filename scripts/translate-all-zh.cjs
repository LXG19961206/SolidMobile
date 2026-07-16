const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', 'docs-dev', 'i18n');

// Comprehensive English → Chinese translation map for common UI terms
const map = {
  // Actions
  'Custom':'自定义','Custom content.':'自定义内容。',
  'Description':'描述','Description.':'描述。',
  'Disabled':'禁用','Disabled items.':'禁用选项。',
  'No Close':'不自动关闭','No auto dismiss.':'不自动关闭。',
  'Options':'选项列表','Options list.':'选项列表。',
  'Title':'标题','Title & cancel.':'标题和取消。',
  'Two Line':'双行','Two-line.':'双行。',
  'Confirm':'确认','Cancel':'取消',
  'Danger':'危险','Danger confirm.':'危险确认。',

  // States
  'Active':'受控','Active control.':'受控模式。','Active.':'受控。',
  'Controlled':'受控','External state.':'外部状态管理。',
  'Uncontrolled':'非受控','Self-managed state.':'自行管理状态。',
  'Disabled state.':'禁用状态。','Readonly':'只读','Readonly.':'只读。',
  'Value cannot be modified.':'值不可修改。','Readonly & Disabled':'只读和禁用',
  'Loading':'加载中','Loading...':'加载中...',

  // Basic
  'Basic Usage':'基础用法','Basic usage with default settings.':'默认设置的基础用法。',
  'Basic':'基础','Basic Title':'基础标题',
  'Block':'块级','Block level.':'块级。','Size':'尺寸','Size.':'尺寸。',
  'Shape':'形状','Shape.':'形状。','Color':'颜色','Color.':'颜色。',
  'Color & text.':'颜色和文字。','Variant':'变体','Variant.':'变体。',
  'Style':'样式','Custom style.':'自定义样式。','Text':'文字','Text style.':'文字样式。',
  'Round':'圆形','Round shape.':'圆形。','Outline':'线框','Outline.':'线框。',
  'Ghost':'幽灵','Ghost style.':'幽灵风格。','Dashed':'虚线','Dashed style.':'虚线样式。',
  'Link':'链接','Link mode.':'链接模式。','Icon':'图标','Icon.':'图标。',
  'Icon Only':'仅图标','Icon + Text':'图标和文字',
  'Types':'类型','Semantic types.':'语义类型。',

  // Layout
  'Default':'默认','Default center.':'默认居中。','Standalone':'独立使用','Standalone.':'独立使用。',
  'Position':'位置','Position.':'位置。','Top':'顶部','Bottom':'底部','Left':'左侧','Right':'右侧',
  'Both':'双向','Both sides.':'双向。','Fixed':'固定','Fixed bottom.':'固定底部。',
  'Fixed top.':'固定顶部。',
  'Back':'返回','Back arrow.':'返回箭头。',
  'Custom sides.':'自定义两侧。',
  'Right action.':'右侧操作。',
  'Horizontal':'水平','Horizontal layout direction.':'水平布局方向。',
  'Vertical':'纵向','Vertical scroll.':'纵向滚动。',
  'Flat':'平铺','Flat columns.':'平铺列。',
  'Layout':'布局','Safe area layout.':'安全区布局。',
  'Grid':'栅格','Grid layout.':'栅格布局。',
  'Offset':'偏移','Offset.':'偏移。',
  'Gap':'间距','Gap & align.':'间距和对齐。',

  // Forms
  'Submit':'提交','Form submission.':'表单提交。',
  'Form':'表单','Form usage.':'表单用法。','Form actions.':'表单操作。',
  'Form basic.':'基础表单。','Full Example':'完整示例','Full example.':'完整示例。',
  'Placeholder':'占位','Placeholder.':'占位。',
  'Clearable':'可清除','Clear button on right.':'右侧清除按钮。',
  'Closable':'可关闭','Closable.':'可关闭。',
  'Step':'步长','Step size.':'步长。','Decimal':'小数','Decimal places.':'小数位数。',
  'Min/Max':'最小/最大','Min/max.':'最小/最大。',
  'Range':'范围','Range.':'范围。','Min/max range.':'最小/最大范围。','Limited range.':'限制范围。',
  'Limits':'限制','Limits & validation.':'限制和校验。',
  'Half':'半选','Half-star selection.':'半星选择。',
  'Half Select':'半选','Half select.':'半选。',

  // Display
  'Avatar':'配头像','With avatar.':'配合头像。',
  'Button':'配按钮','With button.':'配合按钮。',
  'Tab':'配Tab','With tab.':'配合Tab。',
  'With Cell':'配Cell','Status markers on the right side of list items.':'列表项右侧状态标记。',
  'Other Controls':'其他控件','With other controls.':'配合其他控件。',
  'With List':'配合列表','With List.':'配合列表。',
  'Image':'图片','Image.':'图片。','Image logo.':'Logo 图片。',
  'Image fit.':'图片填充。','Image preview.':'图片预览。','Image radius.':'图片圆角。',
  'Image upload.':'图片上传。',
  'Square':'方形','Square avatar.':'方形头像。',
  'Preset':'预设','Preset types.':'预设类型。',
  'Custom Image':'自定义图片','Custom JSX.':'自定义 JSX。',
  'No data':'无数据','Please add content first':'请先添加内容',
  'Badge':'徽标','Badge & dot.':'徽标和红点。',
  'Dot':'红点','Tag':'标签',

  // Feedback
  'Success':'成功','Error':'错误','Warning':'警告','Info':'信息',
  'Primary':'主要','Danger':'危险',
  'Toast':'轻提示','Dialog':'弹窗','Notify':'通知',
  'Overlay':'遮罩','Loading...':'加载中...',
  'Refresh':'刷新','Pull to refresh.':'下拉刷新。',

  // Navigation
  'Tabs':'标签页','Card Mode':'卡片模式','Card style tab mode.':'卡片式标签栏。',
  'Line':'线性','Line indicator tab mode.':'线性指示器标签模式。',
  'Mobile':'移动端操作','Mobile actions.':'移动端操作。',

  // Picker
  'Picker':'选择器','Calendar':'日历','Cascader':'级联选择',
  'Date Picker':'日期选择','Time Picker':'时间选择',
  'Single':'单选','Single select.':'单选。','Range select.':'范围选择。',
  'Date & Time':'日期时间','Date & time with hour/minute/second.':'日期时间含时分秒。',
  'Year-Month':'年月','Year-month only mode.':'仅年月模式。',
  'Time':'时间选择','Time select.':'时间选择。',
  'Cascade':'级联','Cascade.':'级联。','Deep Cascade':'深层级联','Deep cascade.':'深层级联。',
  '6-Level':'6级联动','6-level deep.':'6级深度。',

  // More
  'All Components':'所有组件','All components.':'所有组件。',
  'Component':'组件用法','Component usage.':'组件用法。',
  'JSX Title':'JSX标题','JSX title.':'JSX标题。',
  'Callbacks':'回调','Callbacks.':'回调。',
  'Design':'设计','Design.':'设计。',
  'Examples':'示例','Examples.':'示例。',
  'Example':'示例','Example.':'示例。',
  'Virtual':'虚拟列表','Virtual scroll.':'虚拟滚动。',
  'Slider':'滑块',
  'Switch':'开关','Switch basic.':'基础开关。',
  'Rate':'评分',
  'Stepper':'步进器','Stepper basic.':'基础步进器。',
  'Upload':'上传','File Upload':'文件上传','File upload.':'文件上传。',
  'Textarea':'多行输入',
  'Input':'输入框',
  'Checkbox':'复选框',
  'Radio':'单选框',
  'Select':'选择器',
  'Pull Refresh':'下拉刷新',
  'Swiper':'轮播',
  'Swipe Cell':'滑动单元格',
  'List':'列表',
  'NavBar':'导航栏',
  'TabBar':'标签栏',
  'Center':'居中',
  'Divider':'分割线',
  'Empty':'空状态',
  'Safe Area':'安全区',
  'ActionSheet':'动作面板',
  'Lazy Load':'懒加载',

  // Descriptions
  'Popup mode with title auto-following the month.':'弹出模式，标题自动跟随月份。',
  'Range mode with confirm.':'范围选择模式，带确认按钮。',
  'activeColor for selection, dayRender for custom cells.':'activeColor 设置选中色，dayRender 自定义格子。',
  'Use dayRender to mark weekends and holidays.':'通过 dayRender 标记周末和节假日。',
  'Use popup={false} to embed inline.':'popup={false} 平铺嵌入。',
  'Enable lunar calendar with lunar={true}.':'lunar={true} 启用农历显示。',
  'Popup mode with single date selection.':'弹出模式，单选日期。',
  'Custom color & render.':'自定义颜色和渲染。',
  'Holidays.':'节假日。',
  'Inline.':'嵌入模式。',
  'Lunar.':'农历。',
  'Range.':'范围。',
  'Single.':'单选。',
};

// Process all zh-CN files
let total = 0;
function walk(dir) {
  for (const f of fs.readdirSync(dir, { recursive: true })) {
    if (!f.endsWith('zh-CN.ts')) continue;
    const fp = path.join(dir, f);
    let s = fs.readFileSync(fp, 'utf8');
    let changed = false;
    // Replace values: match ': 'English Value'' pattern
    for (const [en, cn] of Object.entries(map)) {
      const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`: '${escaped}'`, 'g');
      const before = s;
      s = s.replace(re, `: '${cn}'`);
      if (s !== before) { changed = true; total++; }
    }
    if (changed) fs.writeFileSync(fp, s, 'utf8');
  }
}
walk(I18N);
console.log(`Translated ${total} zh-CN strings`);
