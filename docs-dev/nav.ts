
export interface MenuGroup {
  title: string;
  items: { name: string; key: string }[];
}

export const GROUPS: MenuGroup[] = [
  {
    title: '基础组件',
    items: [
      { name: 'Button', key: 'button' },
      { name: 'Icon', key: 'icon' },
      { name: 'Center', key: 'center' },
      { name: 'Divider', key: 'divider' },
      { name: 'Layout', key: 'layout' },
      { name: 'SafeArea', key: 'safearea' },
    ],
  },
  {
    title: '展示组件',
    items: [
      { name: 'Avatar', key: 'avatar' },
      { name: 'Badge', key: 'badge' },
      { name: 'Tag', key: 'tag' },
      { name: 'Image', key: 'image' },
      { name: 'Empty', key: 'empty' },
      { name: 'Lazyload', key: 'lazyload' },
      { name: 'List', key: 'list' },
      { name: 'SwipeCell', key: 'swipecell' },
      { name: 'Swiper', key: 'swiper' },
      { name: 'PullRefresh', key: 'pullrefresh' },
    ],
  },
  {
    title: '导航组件',
    items: [
      { name: 'Tabs', key: 'tabs' },
      { name: 'TabBar', key: 'tabbar' },
      { name: 'NavBar', key: 'navbar' },
      { name: 'Cell', key: 'cell' },
    ],
  },
  {
    title: '选择器',
    items: [
      { name: 'Picker', key: 'picker' },
      { name: 'Calendar', key: 'calendar' },
      { name: 'Cascader', key: 'cascader' },
      { name: 'DatePicker', key: 'datepicker' },
      { name: 'CityPicker', key: 'citypicker' },
      { name: 'TimePicker', key: 'timepicker' },
    ],
  },
  {
    title: '反馈组件',
    items: [
      { name: 'Toast', key: 'toast' },
      { name: 'Notify', key: 'notify' },
      { name: 'Dialog', key: 'dialog' },
      { name: 'Overlay', key: 'overlay' },
      { name: 'ActionSheet', key: 'actionsheet' },
      { name: 'Loading', key: 'loading' },
    ],
  },
  {
    title: '表单组件',
    items: [
      { name: 'Form', key: 'form' },
      { name: 'Input', key: 'input' },
      { name: 'Textarea', key: 'textarea' },
      { name: 'Radio', key: 'radio' },
      { name: 'Checkbox', key: 'checkbox' },
      { name: 'Switch', key: 'switch' },
      { name: 'Rate', key: 'rate' },
      { name: 'Stepper', key: 'stepper' },
      { name: 'Slider', key: 'slider' },
      { name: 'Select', key: 'select' },
      { name: 'Upload', key: 'upload' },
    ],
  },
];

export const GUIDE_GROUPS: MenuGroup[] = [
  {
    title: '指南',
    items: [
      { name: '快速开始', key: 'guide' },
      { name: '全局配置', key: 'config' },
      { name: '视觉规范', key: 'design-tokens' },
      { name: '国际化 / i18n', key: 'i18n' },
      { name: 'EventBus 事件总线', key: 'eventbus' },
      { name: '关于 Solid.js', key: 'solidjs' },
      { name: '关于项目', key: 'about' },
    ],
  },
];

export const CN: Record<string, string> = {
  home: '首页', i18n: '国际化', config: '全局配置', eventbus: '事件总线', solidjs: '框架介绍', 'design-tokens': '视觉规范',
  button: '按钮', icon: '图标', center: '居中', divider: '分割线', layout: '布局', safearea: '安全区',
  avatar: '头像', badge: '徽标', tag: '标签', image: '图片', empty: '空状态', lazyload: '懒加载',
  list: '列表', swipecell: '滑动单元格', swiper: '轮播', pullrefresh: '下拉刷新',
  tabs: '标签页', tabbar: '标签栏', navbar: '导航栏', cell: '单元格',
  picker: '选择器', calendar: '日历', cascader: '级联选择', datepicker: '日期选择',
  citypicker: '城市选择', timepicker: '时间选择',
  toast: '轻提示', notify: '通知', dialog: '对话框', overlay: '遮罩层', actionsheet: '动作面板', loading: '加载',
  form: '表单', input: '输入框', textarea: '文本域', radio: '单选框', checkbox: '复选框',
  switch: '开关', rate: '评分', stepper: '步进器', slider: '滑块', select: '选择器', upload: '上传',
};
