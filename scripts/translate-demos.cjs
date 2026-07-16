const fs = require('fs');
const path = require('path');

const I18N = path.join(__dirname, '..', 'docs-dev', 'i18n');

// Common English → Chinese demo title patterns
const translate = (en) => {
  const map = {
    'Action Custom Content': '自定义内容', 'Action Description': '描述',
    'Action Desc': '描述', 'Action Disabled': '禁用选项', 'Action No Close': '不自动关闭',
    'Action Options': '选项列表', 'Action Title Cancel': '标题和取消',
    'Action Two Line': '双行', 'Active Control': '受控', 'Active OnChange': '受控',
    'Avatar Icon': '图标', 'Avatar Image': '图片', 'Avatar Size': '尺寸',
    'Avatar Square': '方形', 'Avatar Text': '文字',
    'Badge Dot': '红点模式', 'Badge Standalone': '独立使用',
    'Basic': '基础用法', 'Basic Usage': '基础用法', 'Basic Title': '基础标题',
    'Block': '块级', 'Bottom': '底部', 'Bottom Popup': '底部弹出',
    'Calendar Custom': '自定义', 'Calendar Holiday': '节假日', 'Calendar Inline': '嵌入模式',
    'Calendar Lunar': '农历', 'Calendar Range': '范围选择', 'Calendar Single': '单选',
    'Callbacks': '回调', 'Card Mode': '卡片模式', 'Cascade': '级联',
    'Cascader Async': '异步加载', 'Cascader Disabled': '禁用选项',
    'Cascader Region': '地区选择', 'Cell Basic': '基础', 'Cell Clickable': '可点击',
    'Cell Icon Required': '图标和必填', 'Center Default': '默认居中',
    'Center FlexX': '水平居中', 'Center FlexY': '垂直居中', 'Center Inline': '行内模式',
    'Center Position': '绝对定位', 'Center Text': '文字居中', 'Center Vertical': '垂直对齐',
    'City Deep6': '6级联动', 'Clearable': '可清除', 'Closable': '可关闭',
    'Color': '颜色', 'Color Text': '颜色和文字', 'Component Usage': '组件用法',
    'Confirm': '确认', 'Controlled': '受控', 'Controlled Desc': '受控模式',
    'Custom Color': '自定义颜色', 'Custom Icon': '自定义图标',
    'Custom Position': '自定义位置', 'Custom Render': '自定义渲染',
    'Custom Size': '自定义尺寸', 'Custom Style': '自定义样式',
    'Custom Thumb': '自定义滑块', 'Custom Trigger': '自定义触发',
    'Danger Confirm': '危险确认', 'Dashed': '虚线', 'Date Time': '日期时间',
    'Decimal': '小数位数', 'Deep Cascade': '深层级联', 'Design': '设计',
    'Dialog Alert': '提示', 'Dialog Confirm': '确认', 'Dialog Custom Text': '自定义文案',
    'Dialog Dismiss': '手动关闭', 'Dialog JSX': 'JSX内容', 'Dialog Multiline': '多行',
    'Dialog No Title': '无标题', 'Dialog Renderer': '渲染器',
    'Disabled': '禁用', 'Disabled Date': '禁用日期', 'Divider Default': '默认',
    'Divider Text': '带文字', 'Dual Slider': '双滑块',
    'Empty Children': '自定义内容', 'Empty Default': '默认', 'Empty JSX': 'JSX',
    'Empty Preset': '预设', 'File Upload': '文件上传', 'Fixed Bottom': '固定底部',
    'Flat': '平铺', 'Form': '表单', 'Form Actions': '操作按钮', 'Form Basic': '基础表单',
    'Full Example': '完整示例', 'Ghost': '幽灵', 'Half': '半选',
    'Horizontal': '水平', 'Horizontal Basic': '基础水平', 'Horizontal Desc': '水平方向',
    'Href Link': '链接', 'Icon': '图标', 'Icon Clickable': '可点击',
    'Icon Dynamic': '动态', 'Icon Line Fill': '线性/填充',
    'Icon Only': '仅图标', 'Icon Text': '图标文字', 'Icon Tree Shake': '按需引入',
    'Icon With Button': '配合按钮', 'Image Carousel': '轮播',
    'Image Children Button': '自定义按钮', 'Image Fit': '填充方式',
    'Image Fixed Size': '固定尺寸', 'Image Gallery': '画廊',
    'Image Logo': 'Logo', 'Image Preview': '预览', 'Image Radius': '圆角',
    'Image Upload': '图片上传', 'Indicator': '指示器',
    'Input Affix': '前后缀', 'Input Countdown': '倒计时', 'Input Form': '表单',
    'Input Search': '搜索', 'Input Show Count': '字数统计',
    'Input States': '状态', 'Input Types': '类型',
    'JSX Title': 'JSX标题', 'Label Left': '标签左置',
    'Layout Basic': '基础', 'Layout Gap Align': '间距和对齐',
    'Limited Range': '限制范围', 'Limits': '限制', 'Line Mode': '线性模式',
    'List Example': '示例', 'List Lazy': '懒加载', 'Loading': '加载中',
    'Loading Icon Prop': '图标', 'Loading Overlay': '遮罩', 'Loading Pure': '纯动画',
    'Loading Size Color': '尺寸和颜色', 'Loading Types': '类型',
    'Loading Vertical': '纵向', 'Min Max Check': '最小/最大',
    'Mobile Actions': '移动端操作', 'Nav Back Arrow': '返回',
    'Nav Custom Sides': '自定义两侧', 'Nav Fixed Top': '固定顶部',
    'Nav Right Action': '右侧操作', 'No Auto Dismiss': '不自动关闭',
    'Outline': '线框', 'Overlay ActionSheet': '动作面板', 'Overlay Close': '点击关闭',
    'No Scroll Lock': '不锁滚动', 'Overlay Mode': '遮罩模式',
    'Overlay Prop': '遮罩属性', 'Placeholder': '占位', 'Position': '位置',
    'Pull Custom Text': '自定义文案', 'Pull With List': '配合列表',
    'Pure Animation': '纯动画', 'Radio Custom Icon': '自定义图标',
    'Range': '范围', 'Rate Count': '数量', 'Readonly': '只读',
    'Refresh': '刷新', 'Round': '圆形', 'Safe Bottom': '底部安全区',
    'Safe Layout': '布局', 'Safe Top': '顶部安全区',
    'Semantic Type': '语义类型', 'Shape': '形状', 'Size': '尺寸',
    'Standalone': '独立使用', 'Step': '步长', 'Submit': '提交',
    'Swipe Both': '双向', 'Swipe Cell Wrap': '包裹Cell',
    'Swipe Left': '左滑', 'Swipe Right': '右滑', 'Swipe Two Way': '双向',
    'Switch Input': '开关+输入框', 'Tabbar Basic': '基础', 'Tag Cloud': '标签云',
    'Tag Dict': '键值对', 'Tag Filter': '筛选', 'Tag Outline Round': '线框和圆角',
    'Tag Types': '类型', 'Text': '文字', 'Textarea AutoSize': '自适应高度',
    'Textarea Form': '表单', 'Textarea States': '状态',
    'Time Select': '时间选择', 'Toast Danger': '危险', 'Toast Error': '错误',
    'Toast Info': '信息', 'Toast Loading': '加载', 'Toast Primary': '主要',
    'Toast Shorthand': '快捷方式', 'Toast Success': '成功', 'Toast Warning': '警告',
    'Triple Slider': '三滑块', 'Uncontrolled': '非受控',
    'Variant': '变体', 'Vertical Divider': '垂直分割线',
    'Vertical Scroll': '纵向滚动', 'Virtual': '虚拟列表',
    'With Avatar': '配头像', 'With Button': '配按钮', 'With Cell': '配Cell',
    'With Other': '其他控件', 'With Tab': '配Tab',
    'Year Month': '年月', 'Notify Types': '通知类型',
    'Overlay Basic': '基础遮罩', 'Show Overlay': '显示遮罩',
    'Overlay With Content': '遮罩+内容', 'Select Basic': '基础',
    'Embedded Select': '嵌入式', 'Slider Basic': '基础',
    'Stepper Basic': '基础', 'Switch Basic': '基础',
    'Upload Design Decouple': '设计解耦', 'Notify Custom': '自定义',
    'Long Duration': '持续显示', 'Rate Basic': '基础评分',
    'Half Select': '半选', 'Readonly Disabled': '只读和禁用',
    'Custom Icon Count': '自定义图标和数量',
    'With Form': '配合表单', 'Preset Value': '预设值',
    'Position And Color': '位置和颜色',
    'Image Block': '块级和比例', 'Image Fallback': '加载失败',
    'Loading Overlay Mode': '遮罩模式', 'Overlay Dialog': '弹窗',
    'Upload Limits': '限制', 'Upload Controlled': '受控',
    'Upload Callbacks': '回调', 'Upload Custom Button': '自定义按钮',
    'Upload Custom Render': '自定义渲染',
  };
  return map[en] || en;
};

function processComponent(dirName) {
  const zhF = path.join(I18N, dirName, 'zh-CN.ts');
  const enF = path.join(I18N, dirName, 'en-US.ts');
  if (!fs.existsSync(zhF) || !fs.existsSync(enF)) return;

  let zh = fs.readFileSync(zhF, 'utf8');
  let en = fs.readFileSync(enF, 'utf8');

  // Extract demo sections
  const zd = zh.match(/demo: \{([^}]*?)\n    \}/s);
  const ed = en.match(/demo: \{([^}]*?)\n    \}/s);
  if (!zd || !ed) return;

  // If demo sections are identical, zh-CN needs translation
  if (zd[1] === ed[1]) {
    // Replace each English value with Chinese translation
    let translated = zd[1];
    for (const [en, cn] of Object.entries(translate)) {
      const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      translated = translated.replace(new RegExp(`'${escaped}'`, 'g'), `'${cn}'`);
    }
    zh = zh.replace(zd[1], translated);
    fs.writeFileSync(zhF, zh, 'utf8');
    console.log(`  ${dirName}: translated ${zd[1].match(/'([^']+)'/g)?.length || 0} keys`);
  }
}

const dirs = fs.readdirSync(I18N);
for (const d of dirs) {
  const dp = path.join(I18N, d);
  if (!fs.statSync(dp).isDirectory() || d === 'common') continue;
  processComponent(d);
}

console.log('\nDone!');
