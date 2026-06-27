import { createSignal, createMemo, onMount, For, Show, type Component } from 'solid-js';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism.css';
import { useT, setGlobalLocale, useLocale } from '../src/i18n';
import { defaultConfig } from '../src/config/defaults';
import { generateCSSVars } from '../src/config/css-vars';

// Component DocPages
import { ButtonDocPage } from './pages/components/Button/ButtonDocPage';
import { IconDocPage } from './pages/components/Icon/IconDocPage';
import { CenterDocPage } from './pages/components/Center/CenterDocPage';
import { DividerDocPage } from './pages/components/Divider/DividerDocPage';
import { LayoutDocPage } from './pages/components/Layout/LayoutDocPage';
import { AvatarDocPage } from './pages/components/Avatar/AvatarDocPage';
import { BadgeDocPage } from './pages/components/Badge/BadgeDocPage';
import { TagDocPage } from './pages/components/Tag/TagDocPage';
import { ImageDocPage } from './pages/components/Image/ImageDocPage';
import { EmptyDocPage } from './pages/components/Empty/EmptyDocPage';
import { LazyloadDocPage } from './pages/components/Lazyload/LazyloadDocPage';
import { ListDocPage } from './pages/components/List/ListDocPage';
import { NavBarDocPage } from './pages/components/NavBar/NavBarDocPage';
import { TabsDocPage } from './pages/components/Tabs/TabsDocPage';
import { CellDocPage } from './pages/components/Cell/CellDocPage';
import { CascaderDocPage } from './pages/components/Cascader/CascaderDocPage';
import { CalendarDocPage } from './pages/components/Calendar/CalendarDocPage';
import { PickerDocPage } from './pages/components/Picker/PickerDocPage';
import { ToastDocPage } from './pages/components/Toast/ToastDocPage';
import { ToastRenderer } from '../src/components/Toast';
import { DialogDocPage } from './pages/components/Dialog/DialogDocPage';
import { NotifyDocPage } from './pages/components/notify/NotifyDocPage';
import { OverlayDocPage } from './pages/components/Overlay/OverlayDocPage';
import { ActionSheetDocPage } from './pages/components/ActionSheet/ActionSheetDocPage';
import { LoadingDocPage } from './pages/components/Loading/LoadingDocPage';
import { SwitchDocPage } from './pages/components/Switch/SwitchDocPage';
import { SwipeCellDocPage } from './pages/components/SwipeCell/SwipeCellDocPage';
import { AllTokens } from '../src/design-tokens/DesignTokenShowcase';

import './App.css';

/* ── Top Nav Tabs ── */

const TOP_TABS = [
  { key: 'guide', label: '开发指南' },
  { key: 'components', label: '组件文档' },
];

/* ── Sidebar Menus ── */

interface MenuGroup {
  title: string;
  items: { name: string; key: string }[];
}

const GROUPS: MenuGroup[] = [
  {
    title: '视觉规范',
    items: [{ name: '概览', key: 'design-tokens' }],
  },
  {
    title: '基础组件',
    items: [
      { name: 'Button 按钮', key: 'button' },
      { name: 'Icon 图标', key: 'icon' },
      { name: 'Center 居中', key: 'center' },
      { name: 'Divider 分割线', key: 'divider' },
      { name: 'Layout 布局', key: 'layout' },
    ],
  },
  {
    title: '展示组件',
    items: [
      { name: 'Avatar 头像', key: 'avatar' },
      { name: 'Badge 徽标', key: 'badge' },
      { name: 'Tag 标签', key: 'tag' },
      { name: 'Image 图片', key: 'image' },
      { name: 'Empty 空状态', key: 'empty' },
      { name: 'Lazyload 懒加载', key: 'lazyload' },
      { name: 'List 列表', key: 'list' },
      { name: 'SwipeCell 滑动单元格', key: 'swipecell' },
    ],
  },
  {
    title: '导航组件',
    items: [
      { name: 'Tabs 标签页', key: 'tabs' },
      { name: 'NavBar 导航栏', key: 'navbar' },
      { name: 'Cell 单元格', key: 'cell' },
    ],
  },
  {
    title: '选择器',
    items: [
      { name: 'Picker 滚轮选择', key: 'picker' },
      { name: 'Calendar 日历', key: 'calendar' },
      { name: 'Cascader 级联选择', key: 'cascader' },
    ],
  },
  {
    title: '反馈组件',
    items: [
      { name: 'Toast 轻提示', key: 'toast' },
      { name: 'Notify 通知栏', key: 'notify' },
      { name: 'Dialog 弹窗', key: 'dialog' },
      { name: 'Overlay 遮罩层', key: 'overlay' },
      { name: 'ActionSheet 动作面板', key: 'actionsheet' },
      { name: 'Loading 加载', key: 'loading' },
    ],
  },
  {
    title: '表单组件',
    items: [{ name: 'Switch 开关', key: 'switch' }],
  },
];

const PAGES: Record<string, Component> = {
  'design-tokens': () => <div style="padding: 1.5rem 2rem; max-width: 960px"><AllTokens /></div>,
  button: ButtonDocPage,
  icon: IconDocPage,
  center: CenterDocPage,
  divider: DividerDocPage,
  layout: LayoutDocPage,
  avatar: AvatarDocPage,
  badge: BadgeDocPage,
  tag: TagDocPage,
  image: ImageDocPage,
  empty: EmptyDocPage,
  lazyload: LazyloadDocPage,
  list: ListDocPage,
  navbar: NavBarDocPage,
  tabs: TabsDocPage,
  cell: CellDocPage,
  picker: PickerDocPage,
  cascader: CascaderDocPage,
  calendar: CalendarDocPage,
  toast: ToastDocPage,
  dialog: DialogDocPage,
  notify: NotifyDocPage,
  overlay: OverlayDocPage,
  actionsheet: ActionSheetDocPage,
  loading: LoadingDocPage,
  switch: SwitchDocPage,
  swipecell: SwipeCellDocPage,
};

/* ── Code Block ── */

const CodeBlock = (props: { code: string; lang?: string }) => {
  const html = () => {
    const lang = Prism.languages[props.lang || 'tsx'] || Prism.languages.tsx;
    return Prism.highlight(props.code, lang, props.lang || 'tsx');
  };
  return (
    <div class="doc-code-block">
      <pre class={`language-${props.lang || 'tsx'}`}>
        <code class={`language-${props.lang || 'tsx'}`} innerHTML={html()} />
      </pre>
    </div>
  );
};

/* ── Getting Started Page ── */

const GuidePage: Component = () => (
  <div class="guide-card">
    <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 1rem' }}>快速开始</h1>
    <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>
      solid-mobile 是一个基于 SolidJS 的移动端组件库，提供丰富、易用的 UI 组件。
    </p>

    <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>安装</h2>
    <CodeBlock lang="bash" code="npm install solid-mobile" />

    <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>引入样式</h2>
    <CodeBlock lang="tsx" code={`// 在入口文件引入全局样式
import 'solid-mobile/styles.css';`} />

    <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>基础用法</h2>
    <CodeBlock lang="tsx" code={`import { Button, Toast, ToastRenderer } from 'solid-mobile';

function App() {
  return (
    <>
      <Button type="primary" text="Hello" onClick={() => Toast.success('你好')} />
      <ToastRenderer />
    </>
  );
}`} />

    <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>ConfigProvider 全局配置</h2>
    <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
      使用 ConfigProvider 在应用根节点配置主题色、暗色模式、国际化等全局设置。
    </p>
    <CodeBlock lang="tsx" code={`import { ProviderConfig } from 'solid-mobile';

function App() {
  return (
    <ProviderConfig config={{ colors: { light: { primary: '#6366f1' } }, locale: 'zh-CN' }}>
      {/* 你的应用 */}
    </ProviderConfig>
  );
}`} />
  </div>
);

/* ── About Page ── */

const AboutPage: Component = () => (
  <div class="guide-card">
    <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 1rem' }}>关于项目</h1>

    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>缘起</h2>
    <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
      这个项目最早开始于三年前。当时 SolidJS 的生态还很孱弱——可能现在也是，
      有段日子没怎么关注前端技术圈了。
      Solid 这个框架本身是极其优秀的，用起来兼具 React 和 Vue 的爽感，
      又因为是新框架，没有 React 那种历史包袱的妥协，
      性能处于所有前端框架的第一梯队，在当时甚至没有之一。
    </p>
    <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
      当时想着，如果能写一套移动端组件库，一方面算是给社区尽一份力，
      另一方面也可以作为简历上的加分项，为跳槽攒点资本。
    </p>
    <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
      组件的 API 设计和 UI 风格大量参考了{" "}
      <a href="https://vant-ui.github.io/" target="_blank" rel="noopener" style={{ color: '#1677ff' }}>
        Vant
      </a>，在此致敬和感谢。Vant 是 Vue 生态里非常成熟的移动端组件库，
      但跨框架迁移在当时自己的认知里成本较大，加上 SolidJS 这边也确实没有类似的轮子，
      所以决定自己动手写一个。
    </p>

    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>第一版</h2>
    <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
      三年前断断续续实现了一部分，Picker、DatePicker、Cascader、ActionSheet、Dialog，
      以及部分表单和常用业务组件，也算是榨干了在当时技术认知下的全部能力了。
    </p>
    <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
      因为能力有限，多年来也一直没脱离底层码农的范畴，跳槽无望，项目也就这么搁置了。
      说到底也只是个个人开发者，只有一个人，能力和精力都有限，做不到面面俱到。
      身边没有技术大牛，工作圈子里几乎全是只会增删改查的 CRUD 开发者，
      自己虽然对技术有点追求，但终究是“有点东西，但不够多”，始终无力脱离这个圈子。
    </p>

    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>现在</h2>
    <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
      这两年 AI 技术发展得很快，我又把这个搁置已久的执念捡了起来。
      以第一版的代码为蓝图，加上这几年对工程化的一些理解，
      配合大模型一起对整套组件库进行了重构。
      希望在保证质量的前提下，尽可能让更多元素可以被配置和定制。
    </p>
    <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
      当前已完成了基础组件、展示组件、导航组件、选择器和反馈组件等二十余个组件，
      支持 Tree Shaking、暗色模式、ConfigProvider 全局配置，
      并提供了完整的文档和手机模拟器预览。
    </p>

    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>已有组件</h2>
    <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '6px' }}>
      {[
        'Button', 'Icon', 'Center', 'Divider', 'Layout',
        'Avatar', 'Badge', 'Tag', 'Image', 'Empty', 'Lazyload', 'List', 'SwipeCell',
        'Tabs', 'NavBar', 'Cell', 'CellGroup',
        'Picker', 'Calendar', 'Cascader',
        'Toast', 'Notify', 'Dialog', 'Overlay', 'ActionSheet', 'Loading',
        'Switch',
      ].map(name => (
        <span style={{
          padding: '4px 10px', 'font-size': '0.8rem',
          background: '#f3f4f6', 'border-radius': '4px',
          'font-family': 'monospace', color: '#374151',
        }}>{name}</span>
      ))}
    </div>

    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>待实现</h2>

    <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '1.25rem 0 0.5rem' }}>表单组件</h3>
    <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '6px', 'margin-bottom': '1rem' }}>
      {['Input', 'Textarea', 'Form', 'Radio', 'Checkbox', 'DatePicker', 'TimePicker', 'CityPicker', 'Upload'].map(name => (
        <span style={{
          padding: '4px 10px', 'font-size': '0.8rem',
          background: '#fef3c7', 'border-radius': '4px',
          'font-family': 'monospace', color: '#92400e',
        }}>{name}</span>
      ))}
    </div>

    <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '1.25rem 0 0.5rem' }}>导航 & 布局</h3>
    <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '6px', 'margin-bottom': '1rem' }}>
      {['Tabbar', 'Grid'].map(name => (
        <span style={{
          padding: '4px 10px', 'font-size': '0.8rem',
          background: '#fef3c7', 'border-radius': '4px',
          'font-family': 'monospace', color: '#92400e',
        }}>{name}</span>
      ))}
    </div>

    <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '1.25rem 0 0.5rem' }}>业务 & 特殊场景</h3>
    <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '6px', 'margin-bottom': '1rem' }}>
      {['SKU 选择器', 'LiveRoom 直播', 'RichText 富文本', 'Table (移动端)'].map(name => (
        <span style={{
          padding: '4px 10px', 'font-size': '0.8rem',
          background: '#fef3c7', 'border-radius': '4px',
          'font-family': 'monospace', color: '#92400e',
        }}>{name}</span>
      ))}
    </div>

    <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '1.25rem 0 0.5rem' }}>工具 & Hooks</h3>
    <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '6px' }}>
      {['useControllableState', 'cn()', 'createRef', 'hexToRgb / hexToHsl', 'lighten / darken', 'deriveColorSet', 'contrastText'].map(name => (
        <span style={{
          padding: '4px 10px', 'font-size': '0.8rem',
          background: '#dbeafe', 'border-radius': '4px',
          'font-family': 'monospace', color: '#1e40af',
        }}>{name}</span>
      ))}
    </div>

    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>未来</h2>
    <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
      接下来的重心是补齐表单体系——Input、Textarea、Radio、Checkbox、DatePicker、
      TimePicker、Upload 等核心表单组件，以及 Form 表单容器的校验与联动。
      此外还有 Tabbar、Grid 等导航和布局组件，以及 SKU 选择器、LiveRoom 等业务场景组件。
    </p>
    <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
      国际化目前只覆盖了少数组件，后续会逐步补全。
      npm 上也尚未发布，计划在完成大部分主要组件并且测试无误后再正式上线。
    </p>
    <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
      目前还很早期，很多地方不完善，但至少比三年前的那个版本像样了一些。
      如果你碰巧用到了，欢迎提 issue 或者 PR。
    </p>
  </div>
);

/* ── ConfigProvider Doc Page ── */

const SECTION_H2 = { 'font-size': '1.15rem', 'font-weight': 600, margin: '2.5rem 0 0.75rem' };
const CODE = {
  background: '#1e293b', color: '#e2e8f0', padding: '1rem 1.25rem',
  'border-radius': '8px', 'font-size': '0.85rem', overflow: 'auto',
  'white-space': 'pre-wrap', 'font-family': 'ui-monospace, monospace',
};

const colorRows = [
  ['primary', '#1677ff', '#5195ff'],
  ['primaryHover', '#4096ff', '#7ab0ff'],
  ['primaryActive', '#0958d9', '#3678e0'],
  ['primaryDisabled', 'rgba(22,119,255,0.35)', 'rgba(81,149,255,0.35)'],
  ['primaryPale', 'rgba(22,119,255,0.08)', 'rgba(81,149,255,0.12)'],
  ['secondary', '#6ba3ff', '#6396e8'],
  ['danger', '#fc000a', '#ff5c61'],
  ['success', '#00d35b', '#33e07a'],
  ['warning', '#ff9162', '#ffb08a'],
  ['info', '#969799', '#8b8e93'],
  ['background', '#eff2f5', '#1a1d21'],
  ['backgroundSecondary', '#f7f8fa', '#24282d'],
  ['text', '#323233', '#f0f1f3'],
  ['textSecondary', '#969799', '#9a9ca0'],
  ['textTertiary', '#afaba9', '#6b6d70'],
  ['textInverse', '#ffffff', '#1a1d21'],
  ['border', '#dcdee0', '#3a3d42'],
  ['borderHover', '#c5c7ca', '#54575c'],
  ['focus', 'rgba(22,119,255,0.25)', 'rgba(81,149,255,0.5)'],
];

const typoRows = [
  ['fontSize.xs', '0.75rem (12px)'],
  ['fontSize.sm', '0.875rem (14px)'],
  ['fontSize.md', '1rem (16px)'],
  ['fontSize.lg', '1.125rem (18px)'],
  ['fontSize.xl', '1.25rem (20px)'],
  ['fontSize.xxl', '1.5rem (24px)'],
  ['fontWeight.normal', '400'],
  ['fontWeight.medium', '500'],
  ['fontWeight.semibold', '600'],
  ['fontWeight.bold', '700'],
  ['lineHeight.tight', '1.25'],
  ['lineHeight.normal', '1.5'],
  ['lineHeight.relaxed', '1.75'],
  ['fontFamily.base', 'system-ui, ...'],
  ['fontFamily.mono', 'ui-monospace, ...'],
];

const radiusRows = [
  ['sm', '4px'],
  ['md', '8px'],
  ['lg', '12px'],
  ['full', '9999px'],
];

const ConfigDocPage: Component = () => (
  <div class="guide-card">
    <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 0.5rem' }}>ConfigProvider</h1>
    <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>
      全局配置提供者。放在应用根节点，深层合并默认配置，注入 CSS 变量到 &lt;head&gt;，
      并通过 Solid Context 向子组件提供主题、排版、圆角、语言等全局设置。
      不使用时组件按 defaultConfig 运行，无需额外配置。
    </p>

    <h2 style={SECTION_H2}>全量配置示例</h2>
    <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
      以下展示所有可配置项。所有字段均有默认值，<strong>只需传入需要覆盖的部分</strong>，
      未传字段自动使用 defaultConfig。
    </p>
    <CodeBlock lang="tsx" code={`import { ProviderConfig } from 'solid-mobile';

<ProviderConfig
  config={{
    // ══════════════════════════════════════
    // 全局设置
    // ══════════════════════════════════════
    prefix: 'sc',              // CSS 变量前缀 → 生成 --sc-color-primary 等
    darkMode: 'class',         // 暗色模式策略: 'class' = .dark 类名, 'media' = 系统偏好
    locale: 'zh-CN',           // 内置文本语言: 'zh-CN' | 'en-US'

    // ══════════════════════════════════════
    // 色彩系统 — light / dark 双色板
    // 每个语义色含 5 级: base / hover / active / disabled / pale
    // ══════════════════════════════════════
    colors: {
      light: {
        // 主色 — 按钮、选中态、品牌色
        primary: '#1677ff',
        primaryHover: '#4096ff',
        primaryActive: '#0958d9',
        primaryDisabled: 'rgba(22,119,255,0.35)',
        primaryPale: 'rgba(22,119,255,0.08)',

        // 次级色 — 辅助按钮、次要元素
        secondary: '#6ba3ff',
        secondaryHover: '#8ab8ff',
        secondaryActive: '#4d8ae0',
        secondaryDisabled: 'rgba(107,163,255,0.35)',
        secondaryPale: 'rgba(107,163,255,0.08)',

        // 表面 — 页面 / 卡片背景
        background: '#eff2f5',
        backgroundSecondary: '#f7f8fa',

        // 文字 — 四级层级
        text: '#323233',
        textSecondary: '#969799',
        textTertiary: '#afaba9',
        textInverse: '#ffffff',

        // 边框
        border: '#dcdee0',
        borderHover: '#c5c7ca',

        // 语义色 — 危险 / 成功 / 警告 / 信息
        danger: '#fc000a',
        dangerHover: '#ff3b43',
        dangerActive: '#d90008',
        dangerDisabled: 'rgba(252,0,10,0.35)',
        dangerPale: 'rgba(252,0,10,0.08)',

        success: '#00d35b',
        successHover: '#33e07a',
        successDisabled: 'rgba(0,211,91,0.35)',
        successPale: 'rgba(0,211,91,0.08)',

        warning: '#ff9162',
        warningHover: '#ffb08a',
        warningDisabled: 'rgba(255,145,98,0.35)',
        warningPale: 'rgba(255,145,98,0.08)',

        // 信息色 / 聚焦环
        info: '#969799',
        focus: 'rgba(22,119,255,0.25)',
      },

      // 暗色模式 — 字段结构与 light 完全一致
      dark: {
        primary: '#5195ff',
        primaryHover: '#7ab0ff',
        primaryActive: '#3678e0',
        primaryDisabled: 'rgba(81,149,255,0.35)',
        primaryPale: 'rgba(81,149,255,0.12)',
        // ... 其余字段同上结构，此处省略
      },
    },

    // ══════════════════════════════════════
    // 排版 — 字体 / 字号 / 字重 / 行高
    // ══════════════════════════════════════
    typography: {
      'font-family': {
        base: 'system-ui, -apple-system, sans-serif',  // 正文
        mono: 'ui-monospace, SFMono-Regular, monospace', // 代码
      },
      'font-size': {
        xs: '0.75rem',    // 12px — 辅助文字
        sm: '0.875rem',   // 14px — 次要文字
        md: '1rem',       // 16px — 正文
        lg: '1.125rem',   // 18px — 小标题
        xl: '1.25rem',    // 20px — 大标题
        xxl: '1.5rem',    // 24px — 超大标题
      },
      'font-weight': {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      'line-height': {
        tight: 1.25,     // 标题
        normal: 1.5,     // 正文
        relaxed: 1.75,   // 长文本
      },
    },

    // ══════════════════════════════════════
    // 圆角 — 四级尺寸
    // ══════════════════════════════════════
    'border-radius': {
      sm: '4px',         // 小元素: Tag、Badge
      md: '8px',         // 按钮、输入框
      lg: '12px',        // 卡片、弹窗
      full: '9999px',    // 胶囊形状、头像
    },
  }}
>
  <App />
</ProviderConfig>`} />

    <h2 style={SECTION_H2}>ProviderConfig Props</h2>
    <div class="guide-table-wrap">
      <table>
        <thead>
          <tr>
            <th>属性</th>
            <th>类型</th>
            <th>默认值</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ 'font-weight': 600 }}>config</td>
            <td style={{ color: '#6b7280', 'font-size': '0.8rem' }}>PartialSolidComponentConfig</td>
            <td style={{ color: '#9ca3af', 'font-size': '0.8rem' }}>—</td>
            <td>部分配置覆盖，深度合并到 defaultConfig。只传需要改的字段。</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 style={SECTION_H2}>配置结构 SolidComponentConfig</h2>

    <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '1.5rem 0 0.5rem' }}>顶层字段</h3>
    <div class="guide-table-wrap">
      <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.85rem' }}>
        <thead>
          <tr style={{ 'border-bottom': '2px solid #e5e7eb', 'text-align': 'left' }}>
            <th style={{ padding: '8px 12px' }}>字段</th>
            <th style={{ padding: '8px 12px' }}>类型</th>
            <th style={{ padding: '8px 12px' }}>默认值</th>
            <th style={{ padding: '8px 12px' }}>说明</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['prefix', 'string', "'sc'", 'CSS 变量前缀。如 primary 生成 --sc-color-primary'],
            ['darkMode', "'class' | 'media'", "'class'", "暗色模式策略。class → 给 html 加 .dark；media → @media (prefers-color-scheme: dark)"],
            ['locale', "'zh-CN' | 'en-US'", "'zh-CN'", '内置文本语言'],
            ['colors', 'ThemeColors', '见下方', '完整色彩系统，含 light / dark 两套色板'],
            ['typography', 'TypographyConfig', '见下方', '字体族、字号、字重、行高'],
            ['borderRadius', 'BorderRadiusConfig', '见下方', '圆角尺寸 (sm/md/lg/full)'],
          ].map(([name, type, def, desc]) => (
            <tr>
              <td style={{ 'font-weight': 600 }}>{name}</td>
              <td style={{ color: '#6b7280', 'font-size': '0.8rem' }}>{type}</td>
              <td style={{ color: '#9ca3af', 'font-size': '0.8rem' }}>{def}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '1.5rem 0 0.5rem' }}>ColorTokens — 色彩系统</h3>
    <p style={{ color: '#6b7280', 'font-size': '0.85rem', margin: '0 0 0.75rem' }}>
      每个语义色包含 5 级变体：base / hover / active / disabled / pale。
      colors.light 为浅色主题，colors.dark 为暗色主题。
    </p>
    <div class="guide-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Light</th>
            <th>Dark</th>
            <th>CSS 变量</th>
          </tr>
        </thead>
        <tbody>
          {colorRows.map(([name, light, dark]) => (
            <tr>
              <td style={{ 'font-weight': 600 }}>{name}</td>
              <td style={{ 'font-family': 'monospace', 'font-size': '0.8rem' }}>
                <span style={{ display: 'inline-block', width: '14px', height: '14px', 'border-radius': '3px', background: light, 'vertical-align': 'middle', 'margin-right': '6px', border: '1px solid rgba(0,0,0,0.1)' }} />
                {light}
              </td>
              <td style={{ 'font-family': 'monospace', 'font-size': '0.8rem' }}>
                <span style={{ display: 'inline-block', width: '14px', height: '14px', 'border-radius': '3px', background: dark, 'vertical-align': 'middle', 'margin-right': '6px', border: '1px solid rgba(0,0,0,0.1)' }} />
                {dark}
              </td>
              <td style={{ 'font-family': 'monospace', 'font-size': '0.75rem', color: '#6b7280' }}>
                --sc-color-{name.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '1.5rem 0 0.5rem' }}>TypographyConfig — 排版</h3>
    <div class="guide-table-wrap">
      <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.85rem' }}>
        <thead>
          <tr style={{ 'border-bottom': '2px solid #e5e7eb', 'text-align': 'left' }}>
            <th style={{ padding: '8px 12px' }}>字段</th>
            <th style={{ padding: '8px 12px' }}>值</th>
          </tr>
        </thead>
        <tbody>
          {typoRows.map(([name, val]) => (
            <tr>
              <td style={{ 'font-weight': 600, 'font-family': 'monospace', 'font-size': '0.8rem' }}>{name}</td>
              <td style={{ 'font-family': 'monospace', 'font-size': '0.8rem' }}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '1.5rem 0 0.5rem' }}>BorderRadiusConfig — 圆角</h3>
    <div class="guide-table-wrap">
      <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.85rem' }}>
        <thead>
          <tr style={{ 'border-bottom': '2px solid #e5e7eb', 'text-align': 'left' }}>
            <th style={{ padding: '8px 12px' }}>字段</th>
            <th style={{ padding: '8px 12px' }}>值</th>
            <th style={{ padding: '8px 12px' }}>CSS 变量</th>
          </tr>
        </thead>
        <tbody>
          {radiusRows.map(([name, val]) => (
            <tr>
              <td style={{ 'font-weight': 600 }}>{name}</td>
              <td style={{ 'font-family': 'monospace', 'font-size': '0.8rem' }}>{val}</td>
              <td style={{ 'font-family': 'monospace', 'font-size': '0.75rem', color: '#6b7280' }}>--sc-border-radius-{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 style={SECTION_H2}>CSS 变量输出</h2>
    <p style={{ color: '#6b7280', 'margin': '0 0 0.75rem' }}>
      ProviderConfig 挂载时调用 generateCSSVars()，注入 &lt;style id="solid-component-theme"&gt; 到 &lt;head&gt;。
      darkMode='class' 时生成 :root + .dark 两段；darkMode='media' 时生成 :root + @media 查询。
    </p>
    <CodeBlock lang="css" code={`:root {
  color-scheme: light dark;
  --sc-color-primary: #1677ff;
  --sc-color-primary-hover: #4096ff;
  --sc-color-primary-active: #0958d9;
  /* ... 全部颜色、排版、圆角 token ... */
  --sc-font-size-md: 1rem;
  --sc-border-radius-lg: 12px;
}

.dark {
  --sc-color-primary: #5195ff;
  --sc-color-primary-hover: #7ab0ff;
  /* ... 暗色覆盖 ... */
}`} />

    <h2 style={SECTION_H2}>useConfig Hook</h2>
    <p style={{ color: '#6b7280', 'margin': '0 0 0.75rem' }}>
      任意子组件内获取当前配置（JS 端读取主题值、做条件逻辑）。
    </p>
    <CodeBlock lang="tsx" code={`import { useConfig } from 'solid-mobile';

function MyComp() {
  const cfg = useConfig();
  console.log(cfg.colors.light.primary); // '#1677ff'
  console.log(cfg.locale);               // 'zh-CN'
}`} />
  </div>
);

/* ── Dev Guide Sidebar ── */

const GUIDE_GROUPS: MenuGroup[] = [
  {
    title: '开始',
    items: [
      { name: '快速开始', key: 'guide' },
    ],
  },
  {
    title: '定制',
    items: [
      { name: '全局配置', key: 'config' },
      { name: '视觉规范', key: 'tokens' },
    ],
  },
  {
    title: '关于项目',
    items: [
      { name: '关于项目', key: 'about' },
    ],
  },
];

const GUIDE_PAGES: Record<string, Component> = {
  guide: GuidePage,
  about: AboutPage,
  config: ConfigDocPage,
  tokens: () => <div class="guide-card"><AllTokens /></div>,
};

/* ── URL Parsing ── */

type Section = 'guide' | 'components';

function parseHash(): { section: Section; pageKey: string } {
  const raw = window.location.hash.replace('#', '') || '';
  // #/components/button → section=components, key=button
  // #/guide/config → section=guide, key=config
  // #button (legacy) → section=components, key=button
  if (raw.startsWith('/')) {
    const parts = raw.split('/').filter(Boolean);
    const section = (parts[0] || 'guide') as Section;
    const pageKey = parts[1] || (section === 'guide' ? 'guide' : 'button');
    return { section, pageKey };
  }
  return { section: 'components', pageKey: raw || 'button' };
}

function buildHash(section: Section, key?: string): string {
  if (section === 'components') return `#/components/${key || 'button'}`;
  if (section === 'guide' && key) return `#/guide/${key}`;
  return `#/${section}`;
}

/* ── Dark Mode ── */

const DARK_KEY = 'sc-docs-dark-mode';
function getDark(): boolean {
  try { return localStorage.getItem(DARK_KEY) === '1'; } catch { return false; }
}
function applyDark(on: boolean) {
  document.documentElement.classList.toggle('dark', on);
  localStorage.setItem(DARK_KEY, on ? '1' : '0');
}

/* ── App ── */

export function App() {
  const initial = parseHash();
  const [section, setSection] = createSignal<Section>(initial.section);
  const [activeKey, setActiveKey] = createSignal(initial.pageKey || 'button');
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [search, setSearch] = createSignal('');
  const [dark, setDark] = createSignal(getDark());
  const t = useT();

  onMount(() => {
    applyDark(dark());
    if (!document.getElementById('sc-docs-css-vars')) {
      const style = document.createElement('style');
      style.id = 'sc-docs-css-vars';
      style.textContent = generateCSSVars(defaultConfig) + `html.dark body { background: var(--sc-color-background); color: var(--sc-color-text); }`;
      document.head.appendChild(style);
    }
  });

  const toggleDark = () => {
    setDark(prev => { const next = !prev; applyDark(next); return next; });
  };

  window.addEventListener('hashchange', () => {
    const { section: s, pageKey: k } = parseHash();
    setSection(s);
    if (k) setActiveKey(k);
    setMenuOpen(false);
  });

  const compFilteredGroups = createMemo(() => {
    const q = search().toLowerCase().replace(/\s+/g, '');
    if (!q) return GROUPS;
    return GROUPS.map(g => ({
      ...g,
      items: g.items.filter(i =>
        i.name.toLowerCase().replace(/\s+/g, '').includes(q) ||
        g.title.toLowerCase().replace(/\s+/g, '').includes(q),
      ),
    })).filter(g => g.items.length > 0);
  });

  const showSidebar = () => section() === 'components' || section() === 'guide';

  const switchSection = (s: Section) => {
    setSection(s);
    setMenuOpen(false);
    const defaultKey = s === 'guide' ? 'guide' : 'button';
    setActiveKey(defaultKey);
    const h = buildHash(s, defaultKey);
    window.location.hash = h;
  };

  const navigateTo = (key: string) => {
    setActiveKey(key);
    window.location.hash = buildHash(section(), key);
  };

  return (
    <div class="app-shell">
      {/* ══ Top Nav Tabs ══ */}
      <header class="top-nav">
        <div class="top-nav-brand">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#sc-logo-grad2)" />
            <rect x="6" y="10" width="9" height="12" rx="2.5" fill="#fff" opacity="0.95" />
            <rect x="17" y="6" width="9" height="16" rx="2.5" fill="#fff" opacity="0.7" />
            <defs>
              <linearGradient id="sc-logo-grad2" x1="0" y1="0" x2="32" y2="32">
                <stop stop-color="#1677ff" />
                <stop offset="1" stop-color="#5195ff" />
              </linearGradient>
            </defs>
          </svg>
          <span class="top-nav-title">solid-mobile</span>
        </div>
        <nav class="top-nav-tabs">
          <For each={TOP_TABS}>
            {(tab) => (
              <button
                class={`top-nav-tab ${section() === tab.key ? 'active' : ''}`}
                onClick={() => switchSection(tab.key as Section)}
              >
                {tab.label}
              </button>
            )}
          </For>
        </nav>
        <div class="top-nav-actions">
          <button class="tb-btn" onClick={() => setGlobalLocale(useLocale() === 'zh-CN' ? 'en-US' : 'zh-CN')}>
            {useLocale() === 'zh-CN' ? 'EN' : '中'}
          </button>
          <button class="tb-btn" onClick={toggleDark}>
            {dark() ? '☀' : '☾'}
          </button>
        </div>
      </header>

      <div class="app-body">
        {/* ══ Sidebar ══ */}
        <Show when={showSidebar()}>
          <aside class={`sidebar ${menuOpen() ? 'open' : ''}`}>
            <div class="sidebar-brand">
              <span class="sidebar-brand-text">
                {section() === 'guide' ? '开发指南' : '组件导航'}
              </span>
            </div>
            <Show when={section() === 'components'}>
              <input
                class="sidebar-search"
                type="text"
                placeholder="搜索组件..."
                value={search()}
                onInput={(e) => setSearch(e.currentTarget.value)}
              />
            </Show>
            <nav class="sidebar-nav">
              <Show
                when={section() === 'guide'}
                fallback={
                  <For each={compFilteredGroups()}>
                    {(group) => (
                      <div class="nav-group">
                        <div class="nav-group-title">{group.title}</div>
                        <For each={group.items}>
                          {(item) => (
                            <button
                              class={`nav-item ${activeKey() === item.key ? 'active' : ''}`}
                              onClick={() => navigateTo(item.key)}
                            >
                              {item.name}
                            </button>
                          )}
                        </For>
                      </div>
                    )}
                  </For>
                }
              >
                <For each={GUIDE_GROUPS}>
                  {(group) => (
                    <div class="nav-group">
                      <div class="nav-group-title">{group.title}</div>
                      <For each={group.items}>
                        {(item) => (
                          <button
                            class={`nav-item ${activeKey() === item.key ? 'active' : ''}`}
                            onClick={() => navigateTo(item.key)}
                          >
                            {item.name}
                          </button>
                        )}
                      </For>
                    </div>
                  )}
                </For>
              </Show>
            </nav>
          </aside>
          {/* Mobile overlay */}
          <div class={`sidebar-overlay ${menuOpen() ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
        </Show>

        {/* ══ Main Content ══ */}
        <div class="main-area">
          {/* Topbar */}
          <Show when={showSidebar()}>
            <div class="topbar">
              <button class="menu-btn" onClick={() => setMenuOpen(!menuOpen())}>☰</button>
              <span class="topbar-title">
                {section() === 'guide'
                  ? GUIDE_GROUPS.flatMap(g => g.items).find(i => i.key === activeKey())?.name || ''
                  : GROUPS.flatMap(g => g.items).find(i => i.key === activeKey())?.name || ''
                }
              </span>
            </div>
          </Show>
          <div class="content" classList={{ 'content-full': !showSidebar() }}>
            {section() === 'guide' ? (
              <>
                {(() => {
                  const P = GUIDE_PAGES[activeKey()];
                  return P ? <P /> : <div style="padding:2rem">未找到页面: {activeKey()}</div>;
                })()}
              </>
            ) : (
              <>
                {(() => {
                  const C = PAGES[activeKey()];
                  return C ? <C /> : <div style="padding:2rem">未找到组件: {activeKey()}</div>;
                })()}
              </>
            )}
          </div>
        </div>
      </div>
      <ToastRenderer />
    </div>
  );
}
