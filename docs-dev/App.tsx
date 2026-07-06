import { createSignal, createMemo, onMount, For, Show, type Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
// Merge doc-only i18n keys into the library's dictionaries.
// MUST run before any component uses useT().  Doing this inline in
// the entry module prevents Rollup from tree-shaking the merge.
import { messages as libMessages } from '../src/i18n/dictionaries';
import { docMessages } from './doc-dictionaries';
import type { LocaleMessages } from '../src/i18n/types';

function deepMerge(target: any, source: any): any {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

for (const locale of Object.keys(docMessages) as Array<keyof LocaleMessages>) {
  if (!libMessages[locale]) (libMessages as any)[locale] = {};
  deepMerge((libMessages as any)[locale], (docMessages as any)[locale]);
}

import { useT, setGlobalLocale, useLocale } from '../src/i18n';
import { ProviderConfig } from '../src/config';
import { deriveColorSet } from '../src/utils/color';
import { docThemeColor, persistThemeColor } from '../src/doc-utils/doc-theme';
import { Button, Tag } from '../src/components';
import { DialogAPI } from '../src/components/Dialog/DialogManager';

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
import { TabBarDocPage } from './pages/components/TabBar/TabBarDocPage';
import { CellDocPage } from './pages/components/Cell/CellDocPage';
import { CascaderDocPage } from './pages/components/Cascader/CascaderDocPage';
import { CalendarDocPage } from './pages/components/Calendar/CalendarDocPage';
import { PickerDocPage } from './pages/components/Picker/PickerDocPage';
import { ToastDocPage } from './pages/components/Toast/ToastDocPage';
import { ToastRenderer } from '../src/components/Toast';
import { DialogRenderer } from '../src/components/Dialog/DialogManager';
import { DialogDocPage } from './pages/components/Dialog/DialogDocPage';
import { NotifyDocPage } from './pages/components/notify/NotifyDocPage';
import { OverlayDocPage } from './pages/components/Overlay/OverlayDocPage';
import { ActionSheetDocPage } from './pages/components/ActionSheet/ActionSheetDocPage';
import { LoadingDocPage } from './pages/components/Loading/LoadingDocPage';
import { SwitchDocPage } from './pages/components/Switch/SwitchDocPage';
import { SwipeCellDocPage } from './pages/components/SwipeCell/SwipeCellDocPage';
import { SwiperDocPage } from './pages/components/Swiper/SwiperDocPage';
import { FormDocPage } from './pages/components/Form/FormDocPage';
import { InputDocPage } from './pages/components/Input/InputDocPage';
import { TextareaDocPage } from './pages/components/Textarea/TextareaDocPage';
import { RadioDocPage } from './pages/components/Radio/RadioDocPage';
import { CheckboxDocPage } from './pages/components/Checkbox/CheckboxDocPage';
import { DatePickerDocPage } from './pages/components/DatePicker/DatePickerDocPage';
import { CityPickerDocPage } from './pages/components/CityPicker/CityPickerDocPage';
import { TimePickerDocPage } from './pages/components/TimePicker/TimePickerDocPage';
import { RateDocPage } from './pages/components/Rate/RateDocPage';
import { StepperDocPage } from './pages/components/Stepper/StepperDocPage';
import { SafeAreaDocPage } from './pages/components/SafeArea/SafeAreaDocPage';
import { SliderDocPage } from './pages/components/Slider/SliderDocPage';
import { UploadDocPage } from './pages/components/Upload/UploadDocPage';
import { PullRefreshDocPage } from './pages/components/PullRefresh/PullRefreshDocPage';
import { SelectDocPage } from './pages/components/Select/SelectDocPage';
import { PickerMobile } from './pages/mobile/PickerMobile';
import { ButtonMobile } from './pages/mobile/ButtonMobile';
import { IconMobile } from './pages/mobile/IconMobile';
import { CenterMobile } from './pages/mobile/CenterMobile';
import { DividerMobile } from './pages/mobile/DividerMobile';
import { LayoutMobile } from './pages/mobile/LayoutMobile';
import { SafeAreaMobile } from './pages/mobile/SafeAreaMobile';
import { AvatarMobile } from './pages/mobile/AvatarMobile';
import { BadgeMobile } from './pages/mobile/BadgeMobile';
import { TagMobile } from './pages/mobile/TagMobile';
import { ImageMobile } from './pages/mobile/ImageMobile';
import { EmptyMobile } from './pages/mobile/EmptyMobile';
import { LazyloadMobile } from './pages/mobile/LazyloadMobile';
import { ListMobile } from './pages/mobile/ListMobile';
import { SwipeCellMobile } from './pages/mobile/SwipeCellMobile';
import { SwiperMobile } from './pages/mobile/SwiperMobile';
import { TabsMobile } from './pages/mobile/TabsMobile';
import { TabBarMobile } from './pages/mobile/TabBarMobile';
import { NavBarMobile } from './pages/mobile/NavBarMobile';
import { CellMobile } from './pages/mobile/CellMobile';
import { CalendarMobile } from './pages/mobile/CalendarMobile';
import { CascaderMobile } from './pages/mobile/CascaderMobile';
import { DatePickerMobile } from './pages/mobile/DatePickerMobile';
import { CityPickerMobile } from './pages/mobile/CityPickerMobile';
import { TimePickerMobile } from './pages/mobile/TimePickerMobile';
import { ToastMobile } from './pages/mobile/ToastMobile';
import { NotifyMobile } from './pages/mobile/NotifyMobile';
import { DialogMobile } from './pages/mobile/DialogMobile';
import { OverlayMobile } from './pages/mobile/OverlayMobile';
import { ActionSheetMobile } from './pages/mobile/ActionSheetMobile';
import { LoadingMobile } from './pages/mobile/LoadingMobile';
import { FormMobile } from './pages/mobile/FormMobile';
import { InputMobile } from './pages/mobile/InputMobile';
import { TextareaMobile } from './pages/mobile/TextareaMobile';
import { RadioMobile } from './pages/mobile/RadioMobile';
import { CheckboxMobile } from './pages/mobile/CheckboxMobile';
import { SwitchMobile } from './pages/mobile/SwitchMobile';
import { RateMobile } from './pages/mobile/RateMobile';
import { StepperMobile } from './pages/mobile/StepperMobile';
import { SliderMobile } from './pages/mobile/SliderMobile';
import { SelectMobile } from './pages/mobile/SelectMobile';
import { UploadMobile } from './pages/mobile/UploadMobile';
import { PullRefreshMobile } from './pages/mobile/PullRefreshMobile';
import { DesignTokensMobile } from './pages/mobile/DesignTokensMobile';
import { EventBusMobile } from './pages/mobile/EventBusMobile';
import { SolidjsMobile } from './pages/mobile/SolidjsMobile';
import { AboutMobile } from './pages/mobile/AboutMobile';
import { AllTokens } from '../src/design-tokens/DesignTokenShowcase';
import { useDisableZoom } from '../src/hooks';
import { CodeBlock } from '../src/doc-utils';
import { DrawerContext } from '../src/doc-utils/mobile/DrawerContext';
import drawerStyles from '../src/doc-utils/mobile/MobilePreview.module.css';

import './App.css';

/* ── i18n first-switch notice (in-memory, once per session) ── */
let i18nNoticeShown = false;
function showI18nNotice() {
  if (i18nNoticeShown) return;
  i18nNoticeShown = true;
  setTimeout(() => {
    DialogAPI.confirm({
      title: '🌐 关于国际化 / About i18n',
      message: '组件功能描述、属性说明等主要内容已做了基本的国际化，组件库自身也具备完善的多语言支持能力。\n\n受限于个人维护精力，文档 demo 中的示例数据（姓名、选项、提示文案等）仅提供一套简单英文，没有做中英双语对照。不过用的都是基础词汇，不影响理解。\n\n——\n\nMain content — component descriptions, prop docs, etc. — has been internationalized, and the library itself has full i18n support.\n\nDue to limited solo-maintainer bandwidth, demo placeholder data (names, options, labels, etc.) is shown in simple English only. Nothing fancy — just basic vocabulary.',
      confirmText: '知道了 / Got it',
      showCancelButton: false,
    });
  }, 100);
}

/* ── Mobile Home Page ── */

const MobileHome: Component<{
  components?: { name: string; key: string }[];
  onNavigate?: (key: string) => void;
  onOpenDrawer?: () => void;
}> = (props) => (
  <div style={{ padding: '28px 20px', background: 'var(--sc-doc-card-bg, #fff)', 'min-height': '100vh', display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const }}>
    <div style={{
      display: 'flex' as const, 'align-items': 'center' as const, gap: '12px',
      'margin-bottom': '20px',
    }}>
      <span style={{ 'font-size': '1.5rem', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace', 'font-weight': 200, opacity: 0.35 }}>{'{'}</span>
      <div style={{ position: 'relative' as const }}>
        <div style={{
          width: '72px', height: '72px', 'border-radius': '50%',
          background: 'conic-gradient(from 0deg, var(--sc-color-primary, #1677ff), #22c55e, #f59e0b, #ef4444, #8b5cf6, var(--sc-color-primary, #1677ff))',
          animation: 'sc-logo-pulse 3s ease-in-out infinite',
          position: 'absolute' as const, top: '-6px', left: '-6px',
        }} />
        <img src="./logo.jpg" alt="solid-mobile" style={{
          width: '60px', height: '60px', 'border-radius': '50%',
          position: 'relative' as const, 'z-index': 1,
          'box-shadow': '0 2px 8px rgba(0,0,0,0.06)',
        }} />
      </div>
      <span style={{ 'font-size': '1.5rem', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace', 'font-weight': 200, opacity: 0.35 }}>{'}'}</span>
    </div>
    <div style={{ 'font-size': '1.2rem', 'font-weight': 700, color: 'var(--sc-doc-card-title, #1f2937)', 'margin-bottom': '4px' }}>solid-mobile</div>
    <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-align': 'center', 'line-height': 1.6, 'margin-bottom': '16px' }}>
      A SolidJS mobile UI component library.<br />Simple, performant, customizable.
    </div>

    {/* Notice */}
    <div style={{
      background: 'var(--sc-doc-card-placeholder, #f3f4f6)', 'border-radius': '10px',
      padding: '14px 16px', width: '100%', 'box-sizing': 'border-box' as const, 'margin-bottom': '20px',
    }}>
      <div style={{ 'font-size': '0.78rem', color: 'var(--sc-doc-card-title, #1f2937)', 'line-height': 1.6, 'text-align': 'center' as const }}>
        移动端文档为精简版本，完整 API 及交互示例请在 PC 设备上查看。
      </div>
      <div style={{ 'font-size': '0.68rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'line-height': 1.6, 'text-align': 'center' as const, 'margin-top': '6px' }}>
        Mobile docs are simplified. For full API reference &amp; interactive examples, please visit on a desktop device.
      </div>
    </div>
    {/* Links */}
    <div style={{ display: 'flex' as const, gap: '10px', width: '100%' }}>
      <div
        style={{ flex: 1, background: 'var(--sc-color-primary, #1677ff)', color: '#fff', 'border-radius': '10px', padding: '16px', cursor: 'pointer', 'text-align': 'center' as const }}
        onClick={() => props.onNavigate?.('design-tokens')}
      >
        <div style={{ 'font-size': '1rem', 'font-weight': 600, 'margin-bottom': '4px' }}>Quick Start</div>
        <div style={{ 'font-size': '0.7rem', opacity: 0.8 }}>视觉规范 & 配置</div>
      </div>
      <div
        style={{ flex: 1, background: 'var(--sc-doc-card-placeholder, #f3f4f6)', 'border-radius': '10px', padding: '16px', cursor: 'pointer', 'text-align': 'center' as const }}
        onClick={() => props.onNavigate?.('button')}
      >
        <div style={{ 'font-size': '1rem', 'font-weight': 600, color: 'var(--sc-doc-card-title, #1f2937)', 'margin-bottom': '4px' }}>Components</div>
        <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Button 起步</div>
      </div>
    </div>
  </div>
);
/* ── Mobile Pages Map (module scope, stable reference) ── */

const PAGES_MOBILE: Record<string, Component<{ components?: { name: string; key: string }[]; onNavigate?: (key: string) => void; onOpenDrawer?: () => void }>> = {
  home: MobileHome,
  eventbus: EventBusMobile,
  solidjs: SolidjsMobile,
  about: AboutMobile,
  'design-tokens': DesignTokensMobile,
  button: ButtonMobile,
  icon: IconMobile,
  center: CenterMobile,
  divider: DividerMobile,
  layout: LayoutMobile,
  safearea: SafeAreaMobile,
  avatar: AvatarMobile,
  badge: BadgeMobile,
  tag: TagMobile,
  image: ImageMobile,
  empty: EmptyMobile,
  lazyload: LazyloadMobile,
  list: ListMobile,
  swipecell: SwipeCellMobile,
  swiper: SwiperMobile,
  tabs: TabsMobile,
  tabbar: TabBarMobile,
  navbar: NavBarMobile,
  cell: CellMobile,
  picker: PickerMobile,
  calendar: CalendarMobile,
  cascader: CascaderMobile,
  datepicker: DatePickerMobile,
  citypicker: CityPickerMobile,
  timepicker: TimePickerMobile,
  toast: ToastMobile,
  notify: NotifyMobile,
  dialog: DialogMobile,
  overlay: OverlayMobile,
  actionsheet: ActionSheetMobile,
  loading: LoadingMobile,
  form: FormMobile,
  input: InputMobile,
  textarea: TextareaMobile,
  radio: RadioMobile,
  checkbox: CheckboxMobile,
  switch: SwitchMobile,
  rate: RateMobile,
  stepper: StepperMobile,
  slider: SliderMobile,
  select: SelectMobile,
  upload: UploadMobile,
  pullrefresh: PullRefreshMobile,
};

/* ── Top Nav Tabs ── */

// Moved inside component for t() access

/* ── Sidebar Menus ── */

interface MenuGroup {
  title: string;
  items: { name: string; key: string }[];
}

const GROUPS: MenuGroup[] = [
  { title: '视觉规范', items: [{ name: '概览', key: 'design-tokens' }] },
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

const PAGES: Record<string, Component> = {
  'design-tokens': () => <div class="guide-card" style="padding: 1.5rem 2rem; max-width: 960px"><AllTokens /></div>,
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
  tabbar: TabBarDocPage,
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
  swiper: SwiperDocPage,
  form: FormDocPage,
  input: InputDocPage,
  textarea: TextareaDocPage,
  radio: RadioDocPage,
  checkbox: CheckboxDocPage,
  datepicker: DatePickerDocPage,
  citypicker: CityPickerDocPage,
  timepicker: TimePickerDocPage,
  rate: RateDocPage,
  stepper: StepperDocPage,
  safearea: SafeAreaDocPage,
  slider: SliderDocPage,
  select: SelectDocPage,
  upload: UploadDocPage,
  pullrefresh: PullRefreshDocPage,
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

const AboutPage: Component = () => {
  const isEn = () => useLocale() === 'en-US';
  const completed = ['Button', 'Icon', 'Center', 'Divider', 'Layout', 'SafeArea',
    'Avatar', 'Badge', 'Tag', 'Image', 'Empty', 'Lazyload', 'List', 'SwipeCell', 'Swiper', 'PullRefresh',
    'Tabs', 'TabBar', 'NavBar', 'Cell',
    'Picker', 'Calendar', 'Cascader', 'DatePicker', 'TimePicker', 'CityPicker',
    'Toast', 'Notify', 'Dialog', 'Overlay', 'ActionSheet', 'Loading',
    'Form', 'Input', 'Textarea', 'Radio', 'Checkbox', 'Switch', 'Rate', 'Stepper', 'Slider', 'Select', 'Upload'];
  const upcoming = ['Grid', 'Table', 'SKU', 'RichText', 'LiveRoom'];

  return (
    <div class="guide-card">
      <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 1rem' }}>
        {isEn() ? 'About the Project' : '关于项目'}
      </h1>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Origins' : '缘起'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "This project began in 2023, when Solid.js was still in its early days and its ecosystem was sparse — a situation that, candidly, hasn't changed as much as one would hope. Solid the framework is exceptional: it delivers the DX of React with none of the historical baggage, and its performance was — and remains — best-in-class."
        ) : (
          "本项目始于 2023 年。那时的 Solid.js 尚在早期，生态几近空白——坦诚地讲，时至今日也远谈不上繁荣。Solid 框架本身极为出色：它提供了 React 般的开发体验，却无需背负其历史包袱；性能方面，当时已是第一梯队，至今依然。"
        )}
      </p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
        {isEn() ? (
          <>The author makes no claim to being a UI designer — the color palette, spacing, and overall visual language draw significant inspiration from{" "}
            <a href="https://vant-ui.github.io/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>Vant</a>
            {" "}— one of the most mature mobile component libraries in the Vue ecosystem. We gratefully acknowledge their pioneering work. At the time, no comparable library existed for Solid.js, and cross-framework migration carried prohibitive cost; the natural conclusion was to build one.</>
        ) : (
          <>作者本人并不擅长 UI 设计——配色、间距和整体视觉风格大量参考了{" "}
            <a href="https://vant-ui.github.io/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>Vant</a>
            {" "}——Vue 生态中最成熟的移动端组件库之一，在此深表敬意与感谢。彼时 Solid.js 尚无同类轮子，跨框架迁移的成本与风险亦非个人开发者所能承受，于是决定自己动手。</>
        )}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'The First Version' : '第一版'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "The initial iteration, built over several months, included Picker, DatePicker, Cascader, ActionSheet, Dialog, and a handful of form components — the ceiling of what could be achieved with the technical understanding and tooling available at the time. Life intervened, the frontend world moved on, and the project entered a long hibernation."
        ) : (
          "初版断断续续实现了 Picker、DatePicker、Cascader、ActionSheet、Dialog 及若干表单组件，已是在当时技术认知与工具条件下的极限。随后因种种原因，项目进入了漫长的搁置期。"
        )}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Renaissance' : '重构'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "The rapid advancement of AI tooling in recent years provided both the catalyst and the means to resurrect this long-deferred undertaking. The first version served as a blueprint; years of accumulated engineering experience supplied the architectural judgment. The entire library has been rebuilt from the ground up with a unified design token system, first-class TypeScript support, and a commitment to configurability — every visual property that reasonably should be a variable, is."
        ) : (
          "近两年 AI 技术的快速演进为这个搁置已久的项目提供了重启的契机与工具。以初版为蓝本，结合多年来积累的工程化理解，对整套组件库进行了从底层的重构。统一的 Design Token 体系、完整的 TypeScript 类型支持、以可配置性为核心的设计原则——所有应当可被定制的视觉属性，均通过 CSS 变量暴露。"
        )}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Current Status' : '当前进度'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          <>The library currently ships <strong>{completed.length} components</strong> across all major categories — basic, display, navigation, form, feedback, and selector. Features include Tree Shaking, dark mode, ConfigProvider-based global theming with automatic color derivation, a complete documentation site with mobile simulator previews, and i18n support (zh-CN / en-US).</>
        ) : (
          <>当前已交付 <strong>{completed.length} 个组件</strong>，覆盖基础、展示、导航、表单、反馈、选择器六大类别。支持 Tree Shaking、暗色模式、基于 ConfigProvider 的全局主题配置与自动色彩派生、完整的文档站与移动端模拟器预览、以及中英文国际化。</>
        )}
      </p>

      {/* Component table — grouped by category */}
      <div style={{ 'margin-top': '1rem', display: 'grid', 'grid-template-columns': 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {([
          { title: isEn() ? 'Basic' : '基础', items: ['Button', 'Icon', 'Center', 'Divider', 'Layout', 'SafeArea'] },
          { title: isEn() ? 'Display' : '展示', items: ['Avatar', 'Badge', 'Tag', 'Image', 'Empty', 'Lazyload', 'List', 'SwipeCell', 'Swiper', 'PullRefresh'] },
          { title: isEn() ? 'Navigation' : '导航', items: ['Tabs', 'TabBar', 'NavBar', 'Cell'] },
          { title: isEn() ? 'Form' : '表单', items: ['Form', 'Input', 'Textarea', 'Radio', 'Checkbox', 'Switch', 'Rate', 'Stepper', 'Slider', 'Select', 'Upload'] },
          { title: isEn() ? 'Feedback' : '反馈', items: ['Toast', 'Notify', 'Dialog', 'Overlay', 'ActionSheet', 'Loading'] },
          { title: isEn() ? 'Selector' : '选择器', items: ['Picker', 'Calendar', 'Cascader', 'DatePicker', 'TimePicker', 'CityPicker'] },
        ]).map(cat => (
          <div key={cat.title} style={{
            background: 'var(--sc-doc-card-placeholder, #f9fafb)',
            'border-radius': '8px', padding: '12px 14px',
          }}>
            <div style={{ 'font-size': '0.7rem', 'font-weight': 600, color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-transform': 'uppercase', 'letter-spacing': '0.05em', 'margin-bottom': '8px' }}>
              {cat.title} <span style={{ 'font-weight': 400, opacity: 0.6 }}>({cat.items.length})</span>
            </div>
            <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '4px' }}>
              {cat.items.map(name => (
                <span style={{
                  'font-size': '0.78rem', 'font-family': 'monospace',
                  color: 'var(--sc-doc-card-title, #374151)',
                  background: 'var(--sc-doc-card-bg, #fff)',
                  padding: '2px 8px', 'border-radius': '4px',
                  border: '1px solid var(--sc-doc-card-border, #e5e7eb)',
                }}>{name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Roadmap' : '后续规划'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "Near-term priorities include completing the remaining specialized components, expanding i18n coverage, and preparing the initial npm release. Medium-term goals involve business-scenario components and a richer documentation experience."
        ) : (
          "短期重心：完善国际化覆盖、准备初版 npm 发布。中长期方向：业务场景组件、更丰富的文档交互体验。"
        )}
      </p>
      <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '6px', 'margin-top': '0.75rem' }}>
        {upcoming.map(name => (
          <span style={{
            padding: '4px 10px', 'font-size': '0.8rem',
            background: '#fef3c7', 'border-radius': '4px',
            'font-family': 'monospace', color: '#92400e',
          }}>{name}</span>
        ))}
      </div>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Acknowledgments' : '致谢'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          <>This is a solo project, built across evenings and weekends. It is also — in the spirit of full disclosure — a collaboration between one human and one AI: the author and Claude together contributed the vast majority of the code, docs, and design decisions in this repository. {" "}
            <a href="https://github.com/LXG19961206/SolidMobile" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>GitHub</a>{" "}is always open. Stars, issues, and pull requests are genuinely appreciated.</>
        ) : (
          <>这是一个个人项目，利用业余时间完成。坦诚地讲，这也是一个人与一个 AI 的合作项目——作者与 Claude 共同贡献了本仓库中绝大多数的代码、文档与设计决策。{" "}
            <a href="https://github.com/LXG19961206/SolidMobile" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>GitHub</a>{" "}始终开放。每一个 star、每一条 issue、每一个 PR，都发自内心地感谢。</>
        )}
      </p>
    </div>
  );
};

/* ── Solid.js Intro Page ── */

const SolidjsPage: Component = () => {
  const isEn = () => useLocale() === 'en-US';

  return (
    <div class="guide-card">
      <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 1rem' }}>
        {isEn() ? 'About Solid.js' : '关于 Solid.js'}
      </h1>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'What Is It' : '它是什么'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          <>
            <a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)', 'font-weight': 600 }}>Solid.js</a>
            {" "}is a declarative, fine-grained reactive JavaScript UI framework. Its programming model is nearly identical to React — JSX, components, Hooks, Context, Suspense… every familiar concept is there, and it feels even more "React" than React itself.
          </>
        ) : (
          <>
            <a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)', 'font-weight': 600 }}>Solid.js</a>
            {" "}是一个声明式、细粒度响应式的 JavaScript UI 框架。它的编程模型和 React 几乎一模一样——JSX、组件、Hooks、Context、Suspense……你能想到的 React 里有的概念，它都有，而且写得比 React 还「React」。
          </>
        )}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Performance' : '性能'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "Solid has no virtual DOM. Component functions run exactly once; after that, a compiler-generated fine-grained reactivity system updates DOM nodes directly. This means extremely low runtime overhead — Solid consistently ranks in the top tier of every major frontend framework benchmark, and in some scenarios it's the fastest."
        ) : (
          "Solid 没有虚拟 DOM。组件函数只执行一次，之后由编译器生成的细粒度响应式系统直接更新 DOM 节点。这意味着它的运行时开销极低——在所有主流前端框架的性能基准测试中，Solid 始终处于第一梯队，在某些场景下甚至是最快的那个。"
        )}
      </p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
        {isEn() ? (
          <>This "no virtual DOM + fine-grained reactivity" design has, in a sense, inspired Vue 3.6's{" "}
            <a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>Vapor Mode</a>
            {" "}— a compilation strategy that eliminates the need for a virtual DOM. Solid was ahead of the entire industry on this front.</>
        ) : (
          <>这个「无虚拟 DOM + 细粒度响应式」的设计，在某种意义上启发了 Vue 3.6 的{" "}
            <a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>Vapor Mode</a>
            {" "}——一种不需要虚拟 DOM 的编译策略。可以说，Solid 在这个方向上领先了整个行业。</>
        )}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'A Missed Opportunity' : '惋惜'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? "But Solid arrived too late." : "但 Solid 诞生得太晚了。"}
      </p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
        {isEn() ? (
          "It was officially released in 2021, by which time the frontend landscape had already been reshaped many times over. React's ecosystem is an immovable mountain. Vue is deeply entrenched in developer communities worldwide. Svelte captured the \"compile-time framework\" narrative, while Qwik carved out the \"resumability\" niche. Solid, despite being technically superior in many ways, found itself squeezed between giants."
        ) : (
          "它 2021 年才正式发布，那时前端世界早已完成了一轮又一轮的框架洗牌。React 的生态像一座无人能撼动的大山，Vue 在中小团队和国内社区根深蒂固，Svelte 抢走了「编译时框架」的叙事，而 Qwik 又在「可恢复性」方向上建立了护城河。"
        )}
      </p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
        {isEn() ? (
          "From a technical standpoint, Solid delivers almost everything you could want from a \"React replacement\" — better performance, simpler state management, cleaner side-effect handling (no dependency arrays, no stale closures). But it ran into an iron law:"
        ) : (
          "从技术角度看，Solid 几乎做到了你能对「React 的完美替代品」期待的一切——更好的性能、更简单的状态管理、更干净的副作用处理（没有依赖数组，没有 stale closure）。但它撞上了一个铁律："
        )}
      </p>
      <blockquote style="margin:1rem 0;padding:0.75rem 1rem;border-left:3px solid var(--sc-color-primary, #1677ff);background:color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent);border-radius:0 6px 6px 0;color:var(--sc-color-text-secondary,#6b7280);font-size:0.9rem;line-height:1.7">
        <strong>{isEn() ? "Framework competition is no longer just about technology — it's about ecosystem and first-mover advantage." : "前端框架的竞争早已不只是技术的竞争，而是生态和先发优势的竞争。"}</strong>
      </blockquote>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "This is why, despite its excellence, Solid's ecosystem has never truly flourished. The lack of third-party component libraries, starter templates, and enterprise-grade solutions makes most teams hesitate — nobody wants to be the one who has to fill every gap alone."
        ) : (
          "这也是为什么尽管它足够优秀，社区生态却始终没有真正起来的原因——第三方组件库、脚手架模板、企业级解决方案的匮乏，让大多数团队在评估时会因为「万一遇到问题没人填坑」而犹豫。"
        )}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Why We Chose It' : '我们为什么选它'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "We chose Solid to build this component library not because it's trendy — quite the opposite. Its reactivity model and compilation strategy happen to be the best foundation for building a component system. Fine-grained updates mean components don't need a massive runtime diff to locate changes. Single-execution component functions let state management return to simple JavaScript variables and functions, without yet another framework API to learn."
        ) : (
          "选择 Solid 来写这套组件库，不是因为追随什么潮流——恰恰相反，是因为它的响应式模型和编译策略恰好是构建组件系统的最佳土壤。细粒度的更新意味着组件不需要依赖庞大的运行时 diff 来定位变化；一次执行的组件函数让状态管理回归到最简单的 JavaScript 变量和函数，而不是一套需要额外学习的框架 API。"
        )}
      </p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
        {isEn() ? (
          <>We believe this component library itself is a step toward filling Solid's ecosystem gap. If this article sparked even a little interest, check out the{" "}
            <a href="https://www.solidjs.com/tutorial" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>official tutorial</a>
            {" "}— ten minutes, and you'll discover a world that's cleaner and lighter than React.</>
        ) : (
          <>我们相信这套组件库本身，就是帮它补齐生态短板的一步。如果你读完这篇文章，对 Solid 产生了哪怕一点点兴趣，都可以去它的{" "}
            <a href="https://www.solidjs.com/tutorial" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>官方教程</a>
            {" "}看看——十分钟，你会发现一个比 React 更干净、更轻量的世界。</>
        )}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Further Reading' : '延伸阅读'}
      </h2>
      <ul style={{ color: '#6b7280', 'line-height': 1.8, 'padding-left': '1.2rem' }}>
        <li><a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>Solid.js {isEn() ? 'Website' : '官网'}</a> — {isEn() ? 'Docs, tutorials, playground' : '文档、教程、Playground'}</li>
        <li><a href="https://www.solidjs.com/docs/latest/api" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>Solid API {isEn() ? 'Reference' : '参考'}</a> — {isEn() ? 'Compare with React API, 10 min to get started' : '和 React 的 API 对照着看，10 分钟上手'}</li>
        <li><a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>Vue Vapor Mode</a> — {isEn() ? 'A no-VDOM compilation strategy inspired by Solid' : '受 Solid 启发的无虚拟 DOM 编译策略'}</li>
        <li><a href="https://krausest.github.io/js-framework-benchmark/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>JS Framework Benchmark</a> — {isEn() ? 'Solid consistently tops the charts' : '主流框架性能基准，Solid 常年榜首'}</li>
      </ul>
    </div>
  );
};

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

const ConfigDocPage: Component = () => {
  return (
    <div class="guide-card">
      <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 0.5rem' }}>ConfigProvider</h1>
      <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>
        全局配置提供者。放在应用根节点，深层合并默认配置，注入 CSS 变量，
        并通过 Solid Context 向子组件提供主题、排版、圆角、语言等全局设置。
        不使用时组件按 defaultConfig 运行，无需额外配置。
      </p>

      <h2 style={SECTION_H2}>快速开始：换个主色</h2>
      <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
        最简单也最常用的场景——换一个品牌色。<strong>你只需要传 <code>primary</code></strong>，
        hover、active、disabled、pale、focus 甚至 secondary 都会通过 <code>deriveColorSet()</code> 自动从主色计算
        （HSL 色彩空间，hover 提亮 10、active 压暗 10）。
        当然你也可以逐项覆盖任意状态色。
      </p>
      <CodeBlock lang="tsx" code={`import { ProviderConfig } from 'solid-mobile';

// 只传 primary，其余状态色自动推导
function App() {
  return (
    <ProviderConfig config={{ colors: { light: { primary: '#6366f1' } } }}>
      <div>你的应用内容</div>
    </ProviderConfig>
  );
}

// 自动推导结果（HSL 色彩空间）：
//   primaryHover   → 基色提亮 10%
//   primaryActive  → 基色压暗 10%
//   primaryPale    → 高亮度 + 低饱和浅底
//   secondary      → 以 primaryHover 为基色再派生全套
//   focus          → 基色 + 40% alpha`} />

      <h2 style={SECTION_H2}>全量配置示例</h2>
      <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
        以下展示所有可配置项。所有字段均有默认值，<strong>只需传入需要覆盖的部分</strong>，
        未传字段自动使用 defaultConfig（含上述自动推导逻辑）。
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
};

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
      { name: '视觉规范', key: 'design-tokens' },
      { name: 'EventBus 事件总线', key: 'eventbus' },
    ],
  },
  {
    title: '关于',
    items: [
      { name: '关于 Solid.js', key: 'solidjs' },
      { name: '关于项目', key: 'about' },
    ],
  },
];

const GUIDE_PAGES: Record<string, Component> = {
  guide: GuidePage,
  solidjs: SolidjsPage,
  about: AboutPage,
  config: ConfigDocPage,
  'design-tokens': () => <div class="guide-card"><AllTokens /></div>,
  eventbus: () => (
    <div class="guide-card">
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '0 0 0.5rem' }}>EventBus 事件总线</h1>
      <p style={{ color: 'var(--sc-color-text-secondary, #6b7280)', margin: '0 0 1.5rem', 'line-height': 1.6 }}>
        全局事件总线。所有组件触发内置事件时，除执行原有回调外，还会将结构化事件推送至全局总线。
        适用于埋点遥测、审计日志、AOP 拦截、开发调试等场景。
      </p>
      <blockquote style="margin:0 0 1.5rem;padding:0.75rem 1rem;border-left:3px solid var(--sc-color-primary, #1677ff);background:color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent);border-radius:0 6px 6px 0;color:var(--sc-color-text-secondary,#6b7280);font-size:0.9rem;line-height:1.7">
        <strong>本库的 EventBus 定位为拦截与切面，而非通用消息通道。</strong><br />
        它专为<strong>埋点遥测、审计日志、AOP 拦截</strong>等横切关注点设计，提供一个统一的观测入口。
        我们不建议用它来做组件间通信、状态同步或事件驱动的业务流转——这些场景请走 props、回调等显式契约。
        EventBus 在这里的角色是旁路观察者：静默记录发生的一切，不参与、不改变业务逻辑的执行路径。
      </blockquote>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>快速开始</h2>
      <p style={{ color: 'var(--sc-color-text-secondary, #6b7280)', margin: '0 0 0.75rem', 'line-height': 1.6 }}>
        在应用入口调用一次 <code>setEventBusHandler</code>，无需 Provider、无额外依赖。未注册时 <code>emitEvent</code> 仅做一次 null 检查，零运行时开销。
      </p>

      <CodeBlock lang="tsx" code={`import { setEventBusHandler } from 'solid-mobile';

setEventBusHandler((event) => {
  // event.component  — 组件名，如 'Picker'、'DatePicker'
  // event.type      — 事件类型，如 'change'、'confirm'、'click'
  // event.payload   — 事件特异数据（选中值、输入值、文件列表等）
  // event.props     — 组件收到的最新 props 快照（可用于遥测上下文）
  // event.timestamp — 毫秒时间戳

  console.log(event.component, event.type, event.payload);
  // 发送到埋点平台 / 审计系统 / 调试面板
});`} />

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>事件结构</h2>
      <div class="guide-table-wrap">
        <table>
          <thead>
            <tr><th style="min-width:100px">字段</th><th>类型</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight:500;font-family:monospace;font-size:0.85rem">component</td>
              <td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary, #1677ff)">EventBusComponent</td>
              <td style="font-size:0.85rem;color:var(--sc-color-text-secondary,#6b7280)">触发事件的组件名，如 <code>'Picker'</code>、<code>'Upload'</code></td>
            </tr>
            <tr>
              <td style="font-weight:500;font-family:monospace;font-size:0.85rem">type</td>
              <td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary, #1677ff)">EventBusEventType</td>
              <td style="font-size:0.85rem;color:var(--sc-color-text-secondary,#6b7280)">事件类别：<code>change</code> <code>click</code> <code>confirm</code> <code>cancel</code> <code>clear</code> <code>delete</code> <code>submit</code> <code>success</code> <code>error</code> <code>refresh</code> <code>select</code> <code>show</code></td>
            </tr>
            <tr>
              <td style="font-weight:500;font-family:monospace;font-size:0.85rem">payload</td>
              <td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary, #1677ff)">unknown</td>
              <td style="font-size:0.85rem;color:var(--sc-color-text-secondary,#6b7280)">事件特异数据。不同组件/事件类型的 payload 不同，需根据 <code>component + type</code> 组合窄化类型。详见下方事件一览表。</td>
            </tr>
            <tr style="background:color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent)">
              <td style="font-weight:600;font-family:monospace;font-size:0.85rem;color:var(--sc-color-primary, #1677ff)">props</td>
              <td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary, #1677ff)">unknown</td>
              <td style="font-size:0.85rem;color:var(--sc-color-text,#323233)"><strong>组件触发事件时的 props 快照。</strong>这是最容易被忽略但价值最高的字段——你可以从 props 中拿到组件的所有配置信息（placeholder、maxCount、columns、disabled 等），无需额外从组件实例读取。用于遥测时分析「用户是在什么配置下触发了这个事件」。</td>
            </tr>
            <tr>
              <td style="font-weight:500;font-family:monospace;font-size:0.85rem">timestamp</td>
              <td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary, #1677ff)">number</td>
              <td style="font-size:0.85rem;color:var(--sc-color-text-secondary,#6b7280)">事件发生时间的毫秒时间戳（<code>Date.now()</code>）</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>适用场景</h2>
      <ul style={{ color: 'var(--sc-color-text-secondary, #6b7280)', 'line-height': 1.8, 'padding-left': '1.2rem' }}>
        <li><strong>埋点 / 遥测</strong> — 利用 <code>event.props</code> 获取组件配置上下文，统计用户行为与组件使用模式</li>
        <li><strong>审计日志</strong> — 记录关键操作（提交、确认、删除），合规追溯</li>
        <li><strong>AOP 拦截</strong> — 全局前置/后置处理组件事件，无需侵入业务代码</li>
        <li><strong>开发调试</strong> — 注册一个 handler 即可实时查看所有组件交互，无需给每个组件加 log</li>
      </ul>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>可用事件一览</h2>
      <p style={{ color: 'var(--sc-color-text-secondary, #6b7280)', margin: '0 0 0.75rem', 'line-height': 1.6, 'font-size': '0.85rem' }}>
        下表中的 <strong>payload</strong> 是 <code>event.payload</code> 的类型。每一条事件同时携带 <strong>props</strong>（组件 props 快照，类型为对应组件的 Props 接口）和 <strong>timestamp</strong>。
      </p>
      <div class="guide-table-wrap">
        <table>
          <thead>
            <tr><th>组件</th><th>事件类型</th><th>payload 类型</th></tr>
          </thead>
          <tbody>
            {[
              ['ActionSheet', 'select', '{ item, index }'],
              ['Button', 'click', 'MouseEvent'],
              ['Calendar', 'change', 'Date | Date[] | [Date,Date]'],
              ['Cascader', 'change', '(string | number)[]'],
              ['Checkbox / CheckboxGroup', 'change', 'boolean / unknown[]'],
              ['CityPicker', 'change / confirm', '(string | number)[]'],
              ['DatePicker', 'change / confirm', 'string'],
              ['Dialog', 'show', 'DialogOptions'],
              ['Form', 'submit', 'FormValue'],
              ['Input', 'change / clear', 'string'],
              ['NavBar', 'click', '{ side: "left" | "right", action?: "back" }'],
              ['Notify', 'show', 'NotifyOptions'],
              ['Picker', 'change / confirm / cancel', '{ items, vals }'],
              ['PullRefresh', 'refresh', 'undefined'],
              ['Radio / RadioGroup', 'change', 'boolean / unknown'],
              ['Rate', 'change', 'number'],
              ['Select', 'change / confirm', 'string | number'],
              ['Slider', 'change', 'number | number[]'],
              ['Stepper', 'change', 'number'],
              ['Swiper', 'change', 'number (current index)'],
              ['Switch', 'change', 'boolean'],
              ['TabBar', 'change', 'string | number (tab name)'],
              ['Tabs', 'change', 'string | number'],
              ['Textarea', 'change', 'string'],
              ['TimePicker', 'change / confirm', 'string (HH:mm:ss)'],
              ['Toast', 'show', 'ToastOptions'],
              ['Upload', 'change / delete / success / error', 'UploadFile[] | { file, url/message }'],
            ].map(([comp, evt, payload]) => (
              <tr>
                <td style={{ 'font-weight': 500 }}>{comp}</td>
                <td style={{ 'font-family': 'monospace', 'font-size': '0.8rem', color: '#1677ff' }}>{evt}</td>
                <td style={{ 'font-family': 'monospace', 'font-size': '0.75rem', color: 'var(--sc-color-text-secondary, #6b7280)' }}>{payload}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>注意事项</h2>
      <ul style={{ color: 'var(--sc-color-text-secondary, #6b7280)', 'line-height': 1.8, 'padding-left': '1.2rem' }}>
        <li>未注册 handler 时 <code>emitEvent</code> 为零开销（仅一次 null 检查）</li>
        <li>handler 内避免执行耗时操作，建议异步处理</li>
        <li><code>event.payload</code> 为事件特异数据（选中值、输入值等），需根据 component/type 自行窄化</li>
        <li><code>event.props</code> 为组件触发事件时的 props 快照，可用于遥测获取组件的当前配置（如 placeholder、maxCount 等）</li>
      </ul>
    </div>
  ),
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

import { ThemeColorPicker } from '../src/doc-utils/ThemeColorPicker';

/* ── App ── */

export function App() {
  useDisableZoom();
  const initial = parseHash();
  const [section, setSection] = createSignal<Section>(initial.section);
  const [activeKey, setActiveKey] = createSignal(initial.pageKey || 'button');
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [search, setSearch] = createSignal('');
  const [dark, setDark] = createSignal(getDark());
  const dynamicConfig = createMemo(() => {
    const c = docThemeColor();
    // Dark mode primary: use the hover (lightened) variant so it stays
    // visible on dark backgrounds, then ProviderConfig auto-derives the
    // remaining state colors from it.
    const darkPrimary = deriveColorSet(c).hover;
    return {
      colors: {
        light: { primary: c },
        dark: { primary: darkPrimary },
      },
    };
  });
  const isMobileViewport = () => typeof window !== 'undefined' && window.innerWidth <= 1024;
  const [mobileView, setMobileView] = createSignal(isMobileViewport());
  const t = useT();

  const topTabs = createMemo(() => [
    { key: 'guide' as Section, label: t('nav.guides') },
    { key: 'components' as Section, label: t('nav.components') },
  ]);

  onMount(() => {
    applyDark(dark());
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

  /** Localize group titles & item names via nav dictionary */
  const localizeGroups = (groups: MenuGroup[]) =>
    groups.map(g => ({
      ...g,
      title: t(`nav.${g.title}`) || g.title,
      items: g.items.map(i => ({ ...i, name: t(`nav.${i.key}`) || i.name })),
    }));

  const compFilteredGroups = createMemo(() => {
    const q = search().toLowerCase().replace(/\s+/g, '');
    const groups = localizeGroups(GROUPS);
    if (!q) return groups;
    return groups.map(g => ({
      ...g,
      items: g.items.filter(i =>
        i.name.toLowerCase().replace(/\s+/g, '').includes(q) ||
        g.title.toLowerCase().replace(/\s+/g, '').includes(q),
      ),
    })).filter(g => g.items.length > 0);
  });

  const guideGroups = createMemo(() => localizeGroups(GUIDE_GROUPS));

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

  // ── 组件列表 → 可用于 mobile 端组件切换 ──
  const allComponents = () => {
    const items: { name: string; key: string }[] = [];
    compFilteredGroups().forEach((g) => g.items.forEach((i) => items.push(i)));
    return items;
  };

  // ── Mobile: persistent drawer across page switches ──
  const [mobileDrawerOpen, setMobileDrawerOpen] = createSignal(false);
  const openMobileDrawer = () => setMobileDrawerOpen(true);
  const closeMobileDrawer = () => setMobileDrawerOpen(false);
  // Bilingual labels for the mobile drawer — no i18n needed.
  const CN: Record<string, string> = {
    home: '首页', eventbus: '事件总线', solidjs: '框架介绍',
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

  const mobileGroups = createMemo(() => [
    { title: '', items: [{ name: 'Home 首页', key: 'home' }] },
    {
      title: '关于 / About', items: [
        { name: 'Solid.js 框架介绍', key: 'solidjs' },
        { name: '关于项目', key: 'about' },
      ]
    },
    ...GROUPS.map(g => ({
      ...g,
      title: `${g.title}`,
      items: g.items.map(i => ({
        ...i,
        name: CN[i.key] ? `${i.name} ${CN[i.key]}` : i.name,
      })),
    })),
    {
      title: '指南 / Guides', items: [
        { name: 'EventBus 事件总线', key: 'eventbus' },
      ]
    },
  ]);

  // ── Mobile page memos ──
  const mobileActiveKey = createMemo(() => activeKey());
  const mobilePageComp = () => PAGES_MOBILE[mobileActiveKey()] || MobileHome;

  return (
    <ProviderConfig config={dynamicConfig()}>
      <Show when={!mobileView()} fallback={
        <DrawerContext.Provider value={openMobileDrawer}>
          <Dynamic component={mobilePageComp()}
            components={allComponents()} onNavigate={navigateTo} />
          <DialogRenderer />

          {/* Persistent drawer — never unmounted, scroll position preserved */}
          <Show when={mobileDrawerOpen()}>
            <div
              class={drawerStyles.overlay}
              classList={{ [drawerStyles.overlayVisible!]: true }}
              onClick={closeMobileDrawer}
            />
          </Show>
          <div
            class={drawerStyles.drawer}
            classList={{ [drawerStyles.drawerOpen!]: mobileDrawerOpen() }}
          >
            <div class={drawerStyles.drawerHeader}>
              <span class={drawerStyles.drawerTitle}>组件 / Components</span>
              <button class={drawerStyles.drawerCloseBtn} onClick={closeMobileDrawer}>✕</button>
            </div>
            <div class={drawerStyles.drawerBody}>
              <For each={mobileGroups()}>
                {(group) => (
                  <>
                    <Show when={group.title}>
                      <div class={drawerStyles.drawerGroup}>{group.title}</div>
                    </Show>
                    <For each={group.items}>
                      {(item) => (
                        <div
                          class={drawerStyles.drawerItem}
                          classList={{ [drawerStyles.drawerItemActive!]: activeKey() === item.key }}
                          onClick={() => { closeMobileDrawer(); navigateTo(item.key); }}
                        >
                          <span>{item.name}</span>
                          <span class={drawerStyles.drawerItemArrow}>›</span>
                        </div>
                      )}
                    </For>
                  </>
                )}
              </For>
            </div>
          </div>
        </DrawerContext.Provider>
      }>
        <div class="app-shell">
          {/* ══ Top Nav Tabs ══ */}
          <header class="top-nav">
            <div class="top-nav-brand">
              <img src="./logo.jpg" alt="solid-mobile" style="width:28px;height:28px;border-radius:6px;display:block" />
              <span class="top-nav-title">solid-mobile</span>
            </div>
            <nav class="top-nav-tabs">
              <For each={topTabs()}>
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
              <ThemeColorPicker color={docThemeColor()} onChange={(c) => persistThemeColor(c)} />
              <button class="tb-btn" onClick={() => { showI18nNotice(); setGlobalLocale(useLocale() === 'zh-CN' ? 'en-US' : 'zh-CN'); }}>
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
                    {section() === 'guide' ? t('nav.guides') : t('nav.components')}
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
                    <For each={guideGroups()}>
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
                      ? guideGroups().flatMap(g => g.items).find(i => i.key === activeKey())?.name || ''
                      : compFilteredGroups().flatMap(g => g.items).find(i => i.key === activeKey())?.name || ''
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
          <DialogRenderer />
        </div>
      </Show>
    </ProviderConfig>
  );
}
