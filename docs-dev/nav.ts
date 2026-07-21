export interface MenuGroup {
  title: string;
  /** i18n key for the group title — resolve via t(`nav.${titleKey}`) */
  titleKey: string;
  items: { name: string; key: string }[];
}

export const GROUPS: MenuGroup[] = [
  {
    title: 'Basic 基础',
    titleKey: 'groupBasic',
    items: [
      { name: 'Button 按钮', key: 'button' }, { name: 'Icon 图标', key: 'icon' }, { name: 'Center 居中', key: 'center' },
      { name: 'Divider 分割线', key: 'divider' }, { name: 'Layout 布局', key: 'layout' }, { name: 'SafeArea 安全区', key: 'safearea' },
      { name: 'Card 卡片', key: 'card' }, { name: 'ScrollBar 滚动条', key: 'scrollbar' },
    ],
  },
  {
    title: 'Display 展示',
    titleKey: 'groupDisplay',
    items: [
      { name: 'Avatar 头像', key: 'avatar' }, { name: 'Badge 徽标', key: 'badge' }, { name: 'Tag 标签', key: 'tag' },
      { name: 'Image 图片', key: 'image' }, { name: 'Empty 空状态', key: 'empty' }, { name: 'Lazyload 懒加载', key: 'lazyload' },
      { name: 'List 列表', key: 'list' }, { name: 'SwipeCell 滑动单元格', key: 'swipecell' },
      { name: 'Swiper 轮播', key: 'swiper' }, { name: 'Ellipsis 文字省略', key: 'ellipsis' },
      { name: 'Tooltip 气泡提示', key: 'tooltip' },
      { name: 'FloatingBall 悬浮球', key: 'floatingball' },
      { name: 'BackTop 回到顶部', key: 'backtop' },
      { name: 'Marquee 跑马灯', key: 'marquee' },
      { name: 'PullRefresh 下拉刷新', key: 'pullrefresh' },
    ],
  },
  {
    title: 'Nav 导航',
    titleKey: 'groupNav',
    items: [
      { name: 'Tabs 标签页', key: 'tabs' }, { name: 'TabBar 标签栏', key: 'tabbar' },
      { name: 'NavBar 导航栏', key: 'navbar' }, { name: 'Cell 单元格', key: 'cell' },
    ],
  },
  {
    title: 'Picker 选择器',
    titleKey: 'groupPicker',
    items: [
      { name: 'Picker 滚轮选择', key: 'picker' }, { name: 'Calendar 日历', key: 'calendar' },
      { name: 'Cascader 级联选择', key: 'cascader' }, { name: 'DatePicker 日期选择', key: 'datepicker' },
      { name: 'CityPicker 城市选择', key: 'citypicker' }, { name: 'TimePicker 时间选择', key: 'timepicker' },
    ],
  },
  {
    title: 'Feedback 反馈',
    titleKey: 'groupFeedback',
    items: [
      { name: 'Toast 轻提示', key: 'toast' }, { name: 'Notify 通知', key: 'notify' }, { name: 'Dialog 弹窗', key: 'dialog' },
      { name: 'Overlay 遮罩层', key: 'overlay' }, { name: 'ActionSheet 动作面板', key: 'actionsheet' }, { name: 'Loading 加载', key: 'loading' },
    ],
  },
  {
    title: 'Form 表单',
    titleKey: 'groupForm',
    items: [
      { name: 'Form 表单', key: 'form' }, { name: 'Input 输入框', key: 'input' }, { name: 'Textarea 多行', key: 'textarea' },
      { name: 'Radio 单选框', key: 'radio' }, { name: 'Checkbox 复选框', key: 'checkbox' }, { name: 'Switch 开关', key: 'switch' },
      { name: 'Rate 评分', key: 'rate' }, { name: 'Stepper 步进器', key: 'stepper' }, { name: 'Slider 滑块', key: 'slider' },
      { name: 'Select 选择器', key: 'select' }, { name: 'Upload 上传', key: 'upload' },
    ],
  },
];

export const GUIDE_GROUPS: MenuGroup[] = [
  {
    title: 'Guide 指南',
    titleKey: 'groupGuide',
    items: [
      { name: 'Quick Start 快速开始', key: 'guide' },
      { name: 'ConfigProvider 全局配置', key: 'config' },
      { name: 'Design Tokens 视觉规范', key: 'design-tokens' },
      { name: 'i18n 国际化', key: 'i18n' },
      { name: 'EventBus 事件总线', key: 'eventbus' },
    ],
  },
  {
    title: 'About 关于',
    titleKey: 'groupAbout',
    items: [
      { name: 'About Solid.js 关于框架', key: 'solidjs' },
      { name: 'About 关于项目', key: 'about' },
    ],
  },
];
