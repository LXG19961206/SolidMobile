const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', 'docs-dev', 'i18n');

const map = {
  // Single words
  'Upload':'上传','Preview':'预览','Gallery':'画廊','Download':'下载',
  'Save':'保存','Edit':'编辑','Delete':'删除','Add':'新增','Remove':'移除',
  'Search':'搜索','Filter':'筛选','Sort':'排序','Lock':'锁定','Unlock':'解锁',
  'Play':'播放','Pause':'暂停','Stop':'停止','Send':'发送','Share':'分享',
  'Copy':'复制','Paste':'粘贴','Cut':'剪切','Undo':'撤销','Redo':'重做',
  'Reset':'重置','Clear':'清空','Refresh':'刷新','Reload':'重新加载',
  'Open':'打开','Close':'关闭','Show':'显示','Hide':'隐藏','Minimize':'最小化',
  'Maximize':'最大化','Expand':'展开','Collapse':'收起','Menu':'菜单',
  'Home':'首页','Back':'返回','Forward':'前进','Next':'下一个','Previous':'上一个',
  'First':'第一个','Last':'最后一个','More':'更多','Less':'更少','All':'全部',
  'None':'无','Empty':'空','Full':'满','New':'新建','Old':'旧','Small':'小',
  'Medium':'中','Large':'大','Extra Large':'特大',
  'Light':'浅色','Dark':'深色','Auto':'自动','Manual':'手动',
  'On':'开','Off':'关','Yes':'是','No':'否','OK':'确定',
  'Name':'名称','Value':'值','Label':'标签','Title':'标题','Content':'内容',
  'Text':'文本','Number':'数字','Date':'日期','Time':'时间','Email':'邮箱',
  'Phone':'电话','Address':'地址','City':'城市','Country':'国家','Region':'地区',
  'Image':'图片','Video':'视频','Audio':'音频','File':'文件','Folder':'文件夹',
  'User':'用户','Account':'账户','Password':'密码','Token':'令牌',
  'Setting':'设置','Config':'配置','Option':'选项','Property':'属性','Event':'事件',
  'State':'状态','Mode':'模式','Type':'类型','Theme':'主题','Style':'样式',
  'Width':'宽度','Height':'高度','Depth':'深度','Margin':'外边距','Padding':'内边距',
  'Border':'边框','Shadow':'阴影','Radius':'圆角','Opacity':'透明度',
  'Primary':'主要','Secondary':'次要','Success':'成功','Warning':'警告','Danger':'危险','Error':'错误','Info':'信息',
  'Active':'激活','Inactive':'未激活','Hover':'悬停','Focus':'聚焦','Selected':'选中',
  'Visible':'可见','Hidden':'隐藏','Enabled':'启用','Disabled':'禁用',
  'Loading':'加载中','Loaded':'已加载','Pending':'等待中','Processing':'处理中',
  'Online':'在线','Offline':'离线','Connected':'已连接','Disconnected':'已断开',
  'Top':'顶部','Bottom':'底部','Left':'左侧','Right':'右侧','Center':'居中',
  'Horizontal':'水平','Vertical':'垂直','Inline':'行内','Block':'块级',
  'Fixed':'固定','Absolute':'绝对','Relative':'相对','Sticky':'粘性',
  'Row':'行','Column':'列','Grid':'网格','Flex':'弹性','Table':'表格',
  'Header':'页眉','Footer':'页脚','Sidebar':'侧栏','Main':'主体','Body':'内容区',

  // UI component terms
  'ActionSheet':'动作面板','Avatar':'头像','Badge':'徽标','Button':'按钮',
  'Calendar':'日历','Cascader':'级联选择','Cell':'单元格','Center':'居中',
  'Checkbox':'复选框','CityPicker':'城市选择','DatePicker':'日期选择',
  'Dialog':'弹窗','Divider':'分割线','Ellipsis':'文字省略','Empty':'空状态',
  'FloatingBall':'悬浮球','BackTop':'回到顶部','Form':'表单','Icon':'图标',
  'Input':'输入框','Layout':'布局','Lazyload':'懒加载','List':'列表',
  'Loading':'加载','NavBar':'导航栏','Notify':'通知栏','Overlay':'遮罩层',
  'Picker':'选择器','Popup':'弹出层','PullRefresh':'下拉刷新',
  'Radio':'单选框','Rate':'评分','SafeArea':'安全区域','Select':'选择器',
  'Slider':'滑块','Stepper':'步进器','SwipeCell':'滑动单元格','Swiper':'轮播',
  'Switch':'开关','TabBar':'标签栏','Tabs':'标签页','Tag':'标签',
  'Textarea':'多行输入','TimePicker':'时间选择','Toast':'轻提示','Tooltip':'气泡提示',
  'Upload':'文件上传','Notify':'通知',

  // Common compound terms
  'Basic Usage':'基础用法','Custom Content':'自定义内容','Custom Style':'自定义样式',
  'Custom Size':'自定义尺寸','Custom Color':'自定义颜色','Custom Icon':'自定义图标',
  'Custom Text':'自定义文案','Custom Render':'自定义渲染','Custom Trigger':'自定义触发',
  'Custom Position':'自定义位置','Custom Button':'自定义按钮','Custom Image':'自定义图片',
  'Dark Mode':'暗色模式','Light Mode':'浅色模式','System Theme':'跟随系统',
  'Line Mode':'线性模式','Card Mode':'卡片模式','Popup Mode':'弹出模式',
  'Inline Mode':'嵌入模式','Overlay Mode':'遮罩模式','Vertical Layout':'纵向布局',
  'Horizontal Layout':'水平布局','Grid Layout':'网格布局','Flex Layout':'弹性布局',
  'Controlled Mode':'受控模式','Uncontrolled Mode':'非受控模式',
  'Manual Dismiss':'手动关闭','Auto Dismiss':'自动关闭',
  'Basic Form':'基础表单','Form Actions':'表单操作','Form Validation':'表单校验',
  'Disabled State':'禁用状态','Loading State':'加载状态','Error State':'错误状态',
  'Empty State':'空状态','Readonly State':'只读状态','Active State':'激活状态',
  'Selected State':'选中状态','Hover State':'悬停状态','Focus State':'聚焦状态',
  'Image Fit':'图片填充','Image Preview':'图片预览','Image Upload':'图片上传',
  'File Upload':'文件上传','File Download':'文件下载',
  'Click to close':'点击关闭','Click to open':'点击打开','Click to select':'点击选择',
  'Pull to refresh':'下拉刷新','Swipe to delete':'滑动删除',
  'Scroll to load':'滚动加载','Tap to confirm':'点击确认',
  'Press to start':'按下开始','Release to stop':'松开停止',
  'Drop here':'拖放到此','Drag to move':'拖动移动',

  // Longer descriptions — partial matches
  'Popup mode with single date selection.':'弹出模式，单选日期。',
  'Selection mode: single / range / multiple.':'选择模式：单选 / 范围 / 多选。',
  'Whether to show the panel. Auto-managed when not set.':'是否显示面板。不设置时自动管理。',
  'Panel visibility callback.':'面板开关回调。',
  'Data source. Supports tree cascade and flat multi-column modes.':'数据源。支持树形级联和平铺多列两种模式。',
  'Current selected values (one per column).':'当前选中值（每列一个）。',
  'Value change callback.':'值变化回调。',
  'Confirm button callback.':'确认按钮回调。',
  'Cancel button callback.':'取消按钮回调。',
  'Panel title.':'面板标题。',
  'Cancel button text.':'取消按钮文字。',
  'Confirm button text.':'确认按钮文字。',
  'Visible item count (must be odd), default 7.':'可见行数（必须为奇数），默认 7。',
  'Item height, defaults to CSS variable.':'每行高度，默认跟随 CSS 变量。',
  'Portal mount target.':'Portal 挂载目标。',
  'z-index.':'层级。',
  'Placeholder option text.':'占位选项文本。',
  'Touch swipe sensitivity ratio.':'触摸滑动灵敏度倍率。',
  'Inertia animation duration.':'惯性动画时长。',
  'Options list.':'选项列表。',
  'Current selected value.':'当前选中值。',
  'Confirm callback.':'确认回调。',
  'Placeholder text when no value selected.':'未选中时的占位文字。',
  'Visible item count.':'可见行数。',
  'Whether to show the panel.':'是否显示面板。',
};

// Process all zh-CN files
let total = 0;
for (const f of fs.readdirSync(I18N, { recursive: true })) {
  if (!f.endsWith('zh-CN.ts')) continue;
  const fp = path.join(I18N, f);
  let s = fs.readFileSync(fp, 'utf8');
  let changed = false;

  for (const [en, cn] of Object.entries(map)) {
    if (!s.includes(`: '${en}'`)) continue;
    // Only replace where the EXACT value is the English string
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`: '${escaped}'`, 'g');
    const before = s;
    s = s.replace(re, `: '${cn}'`);
    if (s !== before) { changed = true; total++; }
  }
  if (changed) fs.writeFileSync(fp, s, 'utf8');
}

console.log(`Translated ${total} zh-CN strings`);
