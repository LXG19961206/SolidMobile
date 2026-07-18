import { createSignal, createMemo, onMount, For, Show, type Component, type JSX, lazy } from 'solid-js';
import { Dynamic } from 'solid-js/web';
// 启动时注册 common 通用词条（nav 等），后续各 doc 页懒加载自己的词条
import './doc-i18n';
import { ButtonMobile as ButtonMobileDirect } from './components/Button/ButtonMobile';
import { IconMobile as IconMobileDirect } from './components/Icon/IconMobile';
import { CenterMobile as CenterMobileDirect } from './components/Center/CenterMobile';
import { DividerMobile as DividerMobileDirect } from './components/Divider/DividerMobile';
import { LayoutMobile as LayoutMobileDirect } from './components/Layout/LayoutMobile';
import { SafeAreaMobile as SafeAreaMobileDirect } from './components/SafeArea/SafeAreaMobile';
import { AvatarMobile as AvatarMobileDirect } from './components/Avatar/AvatarMobile';
import { BadgeMobile as BadgeMobileDirect } from './components/Badge/BadgeMobile';
import { TagMobile as TagMobileDirect } from './components/Tag/TagMobile';
import { ImageMobile as ImageMobileDirect } from './components/Image/ImageMobile';
import { EmptyMobile as EmptyMobileDirect } from './components/Empty/EmptyMobile';
import { LazyloadMobile as LazyloadMobileDirect } from './components/Lazyload/LazyloadMobile';
import { ListMobile as ListMobileDirect } from './components/List/ListMobile';
import { SwipeCellMobile as SwipeCellMobileDirect } from './components/SwipeCell/SwipeCellMobile';
import { SwiperMobile as SwiperMobileDirect } from './components/Swiper/SwiperMobile';
import { EllipsisMobile as EllipsisMobileDirect } from './components/Ellipsis/EllipsisMobile';
import { TooltipMobile as TooltipMobileDirect } from './components/Tooltip/TooltipMobile';
import { FloatingBallMobile as FloatingBallMobileDirect } from './components/FloatingBall/FloatingBallMobile';
import { BackTopMobile as BackTopMobileDirect } from './components/BackTop/BackTopMobile';
import { PullRefreshMobile as PullRefreshMobileDirect } from './components/PullRefresh/PullRefreshMobile';
import { TabsMobile as TabsMobileDirect } from './components/Tabs/TabsMobile';
import { TabBarMobile as TabBarMobileDirect } from './components/TabBar/TabBarMobile';
import { NavBarMobile as NavBarMobileDirect } from './components/NavBar/NavBarMobile';
import { CellMobile as CellMobileDirect } from './components/Cell/CellMobile';
import { ToastMobile as ToastMobileDirect } from './components/Toast/ToastMobile';
import { NotifyMobile as NotifyMobileDirect } from './components/Notify/NotifyMobile';
import { DialogMobile as DialogMobileDirect } from './components/Dialog/DialogMobile';
import { SafeArea } from '../src/components/SafeArea';
import { setGlobalLocale, useLocale, useT } from '../src/i18n';
import { ProviderConfig } from '../src/config';
import { deriveColorSet } from '../src/utils/color';
import { docThemeColor, persistThemeColor } from './doc-utils/doc-theme';
import { I18nMobile } from './pages/mobile/I18nMobile';

// Guide Pages
import { GuidePage } from './pages/guide/GuidePage';
import { ConfigDocPage } from './pages/guide/ConfigDocPage';
import { I18nDocPage } from './pages/guide/I18nDocPage';
import { AboutPage } from './pages/guide/AboutPage';
import { SolidjsPage } from './pages/guide/SolidjsPage';
import { EventBusDocPage } from './pages/guide/EventBusDocPage';
import { MobileHome } from './pages/mobile/MobileHome';
import { GROUPS, GUIDE_GROUPS } from './nav';
import { showI18nNotice, parseHash, buildHash, getDark, applyDark } from './utils';
import type { Section } from './utils';

import { AllTokens } from '../src/design-tokens/DesignTokenShowcase';
import { useDisableZoom } from '../src/hooks';

import { DrawerContext } from './doc-utils/mobile/DrawerContext';
import drawerStyles from './doc-utils/mobile/MobilePreview.module.css';

import './App.css';

// Component DocPages
const ButtonDocPage = lazy(() => import('./components/Button/ButtonDocPage').then(m => ({ default: m.ButtonDocPage })));
const IconDocPage = lazy(() => import('./components/Icon/IconDocPage').then(m => ({ default: m.IconDocPage })));
const CenterDocPage = lazy(() => import('./components/Center/CenterDocPage').then(m => ({ default: m.CenterDocPage })));
const DividerDocPage = lazy(() => import('./components/Divider/DividerDocPage').then(m => ({ default: m.DividerDocPage })));
const LayoutDocPage = lazy(() => import('./components/Layout/LayoutDocPage').then(m => ({ default: m.LayoutDocPage })));
const AvatarDocPage = lazy(() => import('./components/Avatar/AvatarDocPage').then(m => ({ default: m.AvatarDocPage })));
const BadgeDocPage = lazy(() => import('./components/Badge/BadgeDocPage').then(m => ({ default: m.BadgeDocPage })));
const TagDocPage = lazy(() => import('./components/Tag/TagDocPage').then(m => ({ default: m.TagDocPage })));
const ImageDocPage = lazy(() => import('./components/Image/ImageDocPage').then(m => ({ default: m.ImageDocPage })));
const EmptyDocPage = lazy(() => import('./components/Empty/EmptyDocPage').then(m => ({ default: m.EmptyDocPage })));
const LazyloadDocPage = lazy(() => import('./components/Lazyload/LazyloadDocPage').then(m => ({ default: m.LazyloadDocPage })));
const ListDocPage = lazy(() => import('./components/List/ListDocPage').then(m => ({ default: m.ListDocPage })));
const NavBarDocPage = lazy(() => import('./components/NavBar/NavBarDocPage').then(m => ({ default: m.NavBarDocPage })));
const TabsDocPage = lazy(() => import('./components/Tabs/TabsDocPage').then(m => ({ default: m.TabsDocPage })));
const TabBarDocPage = lazy(() => import('./components/TabBar/TabBarDocPage').then(m => ({ default: m.TabBarDocPage })));
const CellDocPage = lazy(() => import('./components/Cell/CellDocPage').then(m => ({ default: m.CellDocPage })));
const CascaderDocPage = lazy(() => import('./pages/components/Cascader/CascaderDocPage').then(m => ({ default: m.CascaderDocPage })));
const CalendarDocPage = lazy(() => import('./pages/components/Calendar/CalendarDocPage').then(m => ({ default: m.CalendarDocPage })));
const PickerDocPage = lazy(() => import('./pages/components/Picker/PickerDocPage').then(m => ({ default: m.PickerDocPage })));
const ToastDocPage = lazy(() => import('./components/Toast/ToastDocPage').then(m => ({ default: m.ToastDocPage })));
const DialogDocPage = lazy(() => import('./components/Dialog/DialogDocPage').then(m => ({ default: m.DialogDocPage })));
const NotifyDocPage = lazy(() => import('./components/Notify/NotifyDocPage').then(m => ({ default: m.NotifyDocPage })));
const OverlayDocPage = lazy(() => import('./pages/components/Overlay/OverlayDocPage').then(m => ({ default: m.OverlayDocPage })));
const ActionSheetDocPage = lazy(() => import('./pages/components/ActionSheet/ActionSheetDocPage').then(m => ({ default: m.ActionSheetDocPage })));
const LoadingDocPage = lazy(() => import('./pages/components/Loading/LoadingDocPage').then(m => ({ default: m.LoadingDocPage })));
const SwitchDocPage = lazy(() => import('./pages/components/Switch/SwitchDocPage').then(m => ({ default: m.SwitchDocPage })));
const SwipeCellDocPage = lazy(() => import('./components/SwipeCell/SwipeCellDocPage').then(m => ({ default: m.SwipeCellDocPage })));
const SwiperDocPage = lazy(() => import('./components/Swiper/SwiperDocPage').then(m => ({ default: m.SwiperDocPage })));
const FormDocPage = lazy(() => import('./pages/components/Form/FormDocPage').then(m => ({ default: m.FormDocPage })));
const InputDocPage = lazy(() => import('./pages/components/Input/InputDocPage').then(m => ({ default: m.InputDocPage })));
const TextareaDocPage = lazy(() => import('./pages/components/Textarea/TextareaDocPage').then(m => ({ default: m.TextareaDocPage })));
const RadioDocPage = lazy(() => import('./pages/components/Radio/RadioDocPage').then(m => ({ default: m.RadioDocPage })));
const CheckboxDocPage = lazy(() => import('./pages/components/Checkbox/CheckboxDocPage').then(m => ({ default: m.CheckboxDocPage })));
const DatePickerDocPage = lazy(() => import('./pages/components/DatePicker/DatePickerDocPage').then(m => ({ default: m.DatePickerDocPage })));
const CityPickerDocPage = lazy(() => import('./pages/components/CityPicker/CityPickerDocPage').then(m => ({ default: m.CityPickerDocPage })));
const TimePickerDocPage = lazy(() => import('./pages/components/TimePicker/TimePickerDocPage').then(m => ({ default: m.TimePickerDocPage })));
const RateDocPage = lazy(() => import('./pages/components/Rate/RateDocPage').then(m => ({ default: m.RateDocPage })));
const StepperDocPage = lazy(() => import('./pages/components/Stepper/StepperDocPage').then(m => ({ default: m.StepperDocPage })));
const SafeAreaDocPage = lazy(() => import('./components/SafeArea/SafeAreaDocPage').then(m => ({ default: m.SafeAreaDocPage })));
const SliderDocPage = lazy(() => import('./pages/components/Slider/SliderDocPage').then(m => ({ default: m.SliderDocPage })));
const UploadDocPage = lazy(() => import('./pages/components/Upload/UploadDocPage').then(m => ({ default: m.UploadDocPage })));
const PullRefreshDocPage = lazy(() => import('./components/PullRefresh/PullRefreshDocPage').then(m => ({ default: m.PullRefreshDocPage })));
const EllipsisDocPage = lazy(() => import('./components/Ellipsis/EllipsisDocPage').then(m => ({ default: m.EllipsisDocPage })));
const TooltipDocPage = lazy(() => import('./components/Tooltip/TooltipDocPage').then(m => ({ default: m.TooltipDocPage })));
const FloatingBallDocPage = lazy(() => import('./components/FloatingBall/FloatingBallDocPage').then(m => ({ default: m.FloatingBallDocPage })));
const BackTopDocPage = lazy(() => import('./components/BackTop/BackTopDocPage').then(m => ({ default: m.BackTopDocPage })));
const SelectDocPage = lazy(() => import('./pages/components/Select/SelectDocPage').then(m => ({ default: m.SelectDocPage })));
const PickerMobile = lazy(() => import('./pages/mobile/PickerMobile').then(m => ({ default: m.PickerMobile })));

const ButtonMobile = lazy(() => import('./components/Button/ButtonMobile').then(m => ({ default: m.ButtonMobile })));
const IconMobile = lazy(() => import('./components/Icon/IconMobile').then(m => ({ default: m.IconMobile })));
const CenterMobile = lazy(() => import('./components/Center/CenterMobile').then(m => ({ default: m.CenterMobile })));
const DividerMobile = lazy(() => import('./components/Divider/DividerMobile').then(m => ({ default: m.DividerMobile })));
const LayoutMobile = lazy(() => import('./components/Layout/LayoutMobile').then(m => ({ default: m.LayoutMobile })));
const SafeAreaMobile = lazy(() => import('./components/SafeArea/SafeAreaMobile').then(m => ({ default: m.SafeAreaMobile })));
const AvatarMobile = lazy(() => import('./components/Avatar/AvatarMobile').then(m => ({ default: m.AvatarMobile })));
const BadgeMobile = lazy(() => import('./components/Badge/BadgeMobile').then(m => ({ default: m.BadgeMobile })));
const TagMobile = lazy(() => import('./components/Tag/TagMobile').then(m => ({ default: m.TagMobile })));
const ImageMobile = lazy(() => import('./components/Image/ImageMobile').then(m => ({ default: m.ImageMobile })));
const EmptyMobile = lazy(() => import('./components/Empty/EmptyMobile').then(m => ({ default: m.EmptyMobile })));
const LazyloadMobile = lazy(() => import('./components/Lazyload/LazyloadMobile').then(m => ({ default: m.LazyloadMobile })));
const ListMobile = lazy(() => import('./components/List/ListMobile').then(m => ({ default: m.ListMobile })));
const SwipeCellMobile = lazy(() => import('./components/SwipeCell/SwipeCellMobile').then(m => ({ default: m.SwipeCellMobile })));
const SwiperMobile = lazy(() => import('./components/Swiper/SwiperMobile').then(m => ({ default: m.SwiperMobile })));
const TabsMobile = lazy(() => import('./components/Tabs/TabsMobile').then(m => ({ default: m.TabsMobile })));
const TabBarMobile = lazy(() => import('./components/TabBar/TabBarMobile').then(m => ({ default: m.TabBarMobile })));
const NavBarMobile = lazy(() => import('./components/NavBar/NavBarMobile').then(m => ({ default: m.NavBarMobile })));
const CellMobile = lazy(() => import('./components/Cell/CellMobile').then(m => ({ default: m.CellMobile })));
const CalendarMobile = lazy(() => import('./pages/mobile/CalendarMobile').then(m => ({ default: m.CalendarMobile })));
const CascaderMobile = lazy(() => import('./pages/mobile/CascaderMobile').then(m => ({ default: m.CascaderMobile })));
const DatePickerMobile = lazy(() => import('./pages/mobile/DatePickerMobile').then(m => ({ default: m.DatePickerMobile })));
const CityPickerMobile = lazy(() => import('./pages/mobile/CityPickerMobile').then(m => ({ default: m.CityPickerMobile })));
const TimePickerMobile = lazy(() => import('./pages/mobile/TimePickerMobile').then(m => ({ default: m.TimePickerMobile })));
const ToastMobile = lazy(() => import('./components/Toast/ToastMobile').then(m => ({ default: m.ToastMobile })));
const NotifyMobile = lazy(() => import('./components/Notify/NotifyMobile').then(m => ({ default: m.NotifyMobile })));
const DialogMobile = lazy(() => import('./components/Dialog/DialogMobile').then(m => ({ default: m.DialogMobile })));
const OverlayMobile = lazy(() => import('./pages/mobile/OverlayMobile').then(m => ({ default: m.OverlayMobile })));
const ActionSheetMobile = lazy(() => import('./pages/mobile/ActionSheetMobile').then(m => ({ default: m.ActionSheetMobile })));
const LoadingMobile = lazy(() => import('./pages/mobile/LoadingMobile').then(m => ({ default: m.LoadingMobile })));
const FormMobile = lazy(() => import('./pages/mobile/FormMobile').then(m => ({ default: m.FormMobile })));
const InputMobile = lazy(() => import('./pages/mobile/InputMobile').then(m => ({ default: m.InputMobile })));
const TextareaMobile = lazy(() => import('./pages/mobile/TextareaMobile').then(m => ({ default: m.TextareaMobile })));
const RadioMobile = lazy(() => import('./pages/mobile/RadioMobile').then(m => ({ default: m.RadioMobile })));
const CheckboxMobile = lazy(() => import('./pages/mobile/CheckboxMobile').then(m => ({ default: m.CheckboxMobile })));
const SwitchMobile = lazy(() => import('./pages/mobile/SwitchMobile').then(m => ({ default: m.SwitchMobile })));
const RateMobile = lazy(() => import('./pages/mobile/RateMobile').then(m => ({ default: m.RateMobile })));
const StepperMobile = lazy(() => import('./pages/mobile/StepperMobile').then(m => ({ default: m.StepperMobile })));
const SliderMobile = lazy(() => import('./pages/mobile/SliderMobile').then(m => ({ default: m.SliderMobile })));
const SelectMobile = lazy(() => import('./pages/mobile/SelectMobile').then(m => ({ default: m.SelectMobile })));
const UploadMobile = lazy(() => import('./pages/mobile/UploadMobile').then(m => ({ default: m.UploadMobile })));
const PullRefreshMobile = lazy(() => import('./components/PullRefresh/PullRefreshMobile').then(m => ({ default: m.PullRefreshMobile })));
const EllipsisMobile = lazy(() => import('./components/Ellipsis/EllipsisMobile').then(m => ({ default: m.EllipsisMobile })));
const TooltipMobile = lazy(() => import('./components/Tooltip/TooltipMobile').then(m => ({ default: m.TooltipMobile })));
const FloatingBallMobile = lazy(() => import('./components/FloatingBall/FloatingBallMobile').then(m => ({ default: m.FloatingBallMobile })));
const BackTopMobile = lazy(() => import('./components/BackTop/BackTopMobile').then(m => ({ default: m.BackTopMobile })));
const DesignTokensMobile = lazy(() => import('./pages/mobile/DesignTokensMobile').then(m => ({ default: m.DesignTokensMobile })));
const EventBusMobile = lazy(() => import('./pages/mobile/EventBusMobile').then(m => ({ default: m.EventBusMobile })));
const ConfigMobile = lazy(() => import('./pages/mobile/ConfigMobile').then(m => ({ default: m.ConfigMobile })));
const SolidjsMobile = lazy(() => import('./pages/mobile/SolidjsMobile').then(m => ({ default: m.SolidjsMobile })));
const AboutMobile = lazy(() => import('./pages/mobile/AboutMobile').then(m => ({ default: m.AboutMobile })));


const PAGES_MOBILE: Record<string, Component<{ components?: { name: string; key: string }[]; onNavigate?: (key: string) => void; onOpenDrawer?: () => void }>> = {
  home: MobileHome,
  eventbus: EventBusMobile,
  solidjs: SolidjsMobile,
  about: AboutMobile,
  i18n: I18nMobile,
  config: ConfigMobile,
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
  ellipsis: EllipsisMobile,
  tooltip: TooltipMobile,
  floatingball: FloatingBallMobile, backtop: BackTopMobile,
};

const PAGES: Record<string, Component> = {
  'design-tokens': () => <div class="guide-card" style="padding: 1.5rem 2rem; max-width: 960px"><AllTokens /></div>,
  button: ButtonDocPage, icon: IconDocPage, center: CenterDocPage, divider: DividerDocPage, layout: LayoutDocPage,
  avatar: AvatarDocPage, badge: BadgeDocPage, tag: TagDocPage, image: ImageDocPage, empty: EmptyDocPage,
  lazyload: LazyloadDocPage, list: ListDocPage, navbar: NavBarDocPage, tabs: TabsDocPage, tabbar: TabBarDocPage,
  cell: CellDocPage, picker: PickerDocPage, cascader: CascaderDocPage, calendar: CalendarDocPage,
  toast: ToastDocPage, dialog: DialogDocPage, notify: NotifyDocPage, overlay: OverlayDocPage,
  actionsheet: ActionSheetDocPage, loading: LoadingDocPage, switch: SwitchDocPage, swipecell: SwipeCellDocPage,
  swiper: SwiperDocPage, form: FormDocPage, input: InputDocPage, textarea: TextareaDocPage, radio: RadioDocPage,
  checkbox: CheckboxDocPage, datepicker: DatePickerDocPage, citypicker: CityPickerDocPage, timepicker: TimePickerDocPage,
  rate: RateDocPage, stepper: StepperDocPage, safearea: SafeAreaDocPage, slider: SliderDocPage, select: SelectDocPage,
  upload: UploadDocPage, pullrefresh: PullRefreshDocPage, ellipsis: EllipsisDocPage, tooltip: TooltipDocPage, floatingball: FloatingBallDocPage, backtop: BackTopDocPage,
};

const GUIDE_PAGES: Record<string, Component> = {
  guide: GuidePage, solidjs: SolidjsPage, about: AboutPage, config: ConfigDocPage, i18n: I18nDocPage,
  'design-tokens': () => <div class="guide-card"><AllTokens /></div>,
  eventbus: EventBusDocPage,
};


import { ThemeColorPicker } from './doc-utils/ThemeColorPicker';

/* ── App ── */

export function App() {
  useDisableZoom();
  const initial = parseHash();

  // Detect ?mobile=<key> for iframe mobile preview
  // Detect ?mobile=<key> for iframe mobile preview
  const mobileParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('mobile') : null;
  const localeParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('locale') : null;
  if (mobileParam) {
    void useLocale();
    if (localeParam && localeParam !== useLocale()) setGlobalLocale(localeParam);
    applyDark(getDark());
    // 读取 localStorage 中的主题色
    const themeColor = (() => { try { return localStorage.getItem('sc-docs-theme-color') || '#1677ff'; } catch { return '#1677ff'; } })();
    const colors = deriveColorSet(themeColor);
    const mobileDirect: Record<string, any> = { button: ButtonMobileDirect, icon: IconMobileDirect, center: CenterMobileDirect, divider: DividerMobileDirect, layout: LayoutMobileDirect, safearea: SafeAreaMobileDirect, avatar: AvatarMobileDirect, badge: BadgeMobileDirect, tag: TagMobileDirect, image: ImageMobileDirect, empty: EmptyMobileDirect, lazyload: LazyloadMobileDirect, list: ListMobileDirect, swipecell: SwipeCellMobileDirect, swiper: SwiperMobileDirect, ellipsis: EllipsisMobileDirect, tooltip: TooltipMobileDirect, floatingball: FloatingBallMobileDirect, backtop: BackTopMobileDirect, pullrefresh: PullRefreshMobileDirect, tabs: TabsMobileDirect, tabbar: TabBarMobileDirect, navbar: NavBarMobileDirect, cell: CellMobileDirect, toast: ToastMobileDirect, notify: NotifyMobileDirect, dialog: DialogMobileDirect };
    const Demo = mobileDirect[mobileParam] || PAGES_MOBILE[mobileParam];
    const notch = 36; // PhoneSimulator notch + safe area height
    // 同时写到 body 上，让 Portal 渲染的 Notify/Toast 也能继承
    try { document.body.style.setProperty('--sc-safe-area-top', `${notch}px`); document.body.style.setProperty('--sc-safe-area-bottom', '0px'); } catch {}
    return (
      <ProviderConfig config={{ locale: useLocale(), colors: { light: { primary: themeColor }, dark: { primary: colors.hover } } }}>
        <div style={{ '--sc-safe-area-top': `${notch}px`, '--sc-safe-area-bottom': '0px' } as JSX.CSSProperties}>
          <SafeArea position="top" />
          {/**/}<span style="display:none">{useLocale()}</span>{Demo ? <Demo /> : <div style="padding:16px">Demo not found: {mobileParam}</div>}
          <SafeArea position="bottom" />
        </div>
      </ProviderConfig>
    );
  }

  const t = useT();
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
      locale: useLocale(),
      colors: {
        light: { primary: c },
        dark: { primary: darkPrimary },
      },
    };
  });
  const isMobileViewport = () => typeof window !== 'undefined' && window.innerWidth <= 1024;
  const [mobileView, setMobileView] = createSignal(isMobileViewport());
  const topTabs = createMemo(() => [
    { key: 'guide' as Section, label: t('nav.tabGuide') || 'Guide 指南' },
    { key: 'components' as Section, label: t('nav.tabComponents') || 'Components 组件' },
  ]);

  onMount(() => {
    applyDark(dark());
  });

  /** 刷新右侧手机模拟器 iframe */
  const refreshIframe = () => {
    const el = document.querySelector('iframe[title="Mobile Preview"]') as HTMLIFrameElement;
    if (!el) return;
    const loc = typeof localStorage !== 'undefined' ? (localStorage.getItem('sc-docs-locale') || 'zh-CN') : 'zh-CN';
    const dark = typeof localStorage !== 'undefined' && localStorage.getItem('sc-docs-dark-mode') === '1' ? '&dark=1' : '';
    const key = window.location.hash.replace('#/', '').replace(/^components\//, '').split('?')[0];
    el.src = '/?mobile=' + key + '&locale=' + loc + dark + '&t=' + Date.now();
  };

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

  const guideGroups = createMemo(() => GUIDE_GROUPS);

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

  const mobileGroups = createMemo(() => [
    { title: '', items: [{ name: t('nav.mobileHome') || 'Home 首页', key: 'home' }] },
    {
      title: t('nav.drawerGuideGroup') || 'Guide 指南', items: [
        { name: t('nav.config') || 'ConfigProvider 全局配置', key: 'config' },
        { name: t('nav.design-tokens') || 'Design Tokens 视觉规范', key: 'design-tokens' },
        { name: t('nav.i18n') || 'i18n 国际化', key: 'i18n' },
        { name: t('nav.eventbus') || 'EventBus 事件总线', key: 'eventbus' },
      ]
    },
    {
      title: t('nav.drawerAboutGroup') || 'About 关于', items: [
        { name: t('nav.solidjs') || 'About Solid.js 关于框架', key: 'solidjs' },
        { name: t('nav.about') || 'About 关于项目', key: 'about' },
      ]
    },
    ...GROUPS.map(g => ({
      ...g,
      title: t('nav.' + g.titleKey) || g.title,
      items: g.items.map(i => ({ ...i, name: t('nav.' + i.key) || i.name })),
    })),
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
              <span class={drawerStyles.drawerTitle}>{t('nav.drawerTitle') || '组件 / Components'}</span>
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
                          <span>{t('nav.' + item.key) || item.name}</span>
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

              <div style="display:inline-flex;border:1px solid var(--sc-color-border,#e5e7eb);border-radius:6px;overflow:hidden;height:30px;align-items:center">
                <span onClick={() => { if (useLocale() !== 'zh-CN') { showI18nNotice(); setGlobalLocale("zh-CN"); setTimeout(refreshIframe, 50); } }}
                  style={{
                    padding: '0 10px', cursor: 'pointer', 'font-size': '13px', 'font-weight': useLocale() === 'zh-CN' ? 600 : 400, height: '100%', display: 'inline-flex', 'align-items': 'center',
                    background: useLocale() === 'zh-CN' ? 'var(--sc-color-primary,#1677ff)' : 'transparent',
                    color: useLocale() === 'zh-CN' ? '#fff' : 'var(--sc-color-text-secondary,#6b7280)',
                    transition: 'all 0.15s'
                  }}>CN</span>
                <span style="width:1px;height:16px;background:var(--sc-color-border,#e5e7eb);flex-shrink:0" />
                <span onClick={() => { if (useLocale() !== 'en-US') { showI18nNotice(); setGlobalLocale("en-US"); setTimeout(refreshIframe, 50); } }}
                  style={{
                    padding: '0 10px', cursor: 'pointer', 'font-size': '13px', 'font-weight': useLocale() === 'en-US' ? 600 : 400, height: '100%', display: 'inline-flex', 'align-items': 'center',
                    background: useLocale() === 'en-US' ? 'var(--sc-color-primary,#1677ff)' : 'transparent',
                    color: useLocale() === 'en-US' ? '#fff' : 'var(--sc-color-text-secondary,#6b7280)',
                    transition: 'all 0.15s'
                  }}>EN</span>
              </div>
              <ThemeColorPicker color={docThemeColor()} onChange={(c) => { persistThemeColor(c); refreshIframe(); }} />
              <button class="tb-btn" onClick={() => { toggleDark(); refreshIframe(); }}>
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
                    {section() === 'guide' ? (t('nav.tabGuide') || 'Guide 指南') : (t('nav.tabComponents') || 'Components 组件')}
                  </span>
                </div>
                <Show when={section() === 'components'}>
                  <input
                    class="sidebar-search"
                    type="text"
                    placeholder={t('nav.searchComponents') || '搜索组件...'}
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
                            <div class="nav-group-title">{t('nav.' + group.titleKey) || group.title}</div>
                            <For each={group.items}>
                              {(item) => (
                                <button
                                  class={`nav-item ${activeKey() === item.key ? 'active' : ''}`}
                                  onClick={() => navigateTo(item.key)}
                                >
                                  {t('nav.' + item.key) || item.name}
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
                          <div class="nav-group-title">{t('nav.' + group.titleKey) || group.title}</div>
                          <For each={group.items}>
                            {(item) => (
                              <button
                                class={`nav-item ${activeKey() === item.key ? 'active' : ''}`}
                                onClick={() => navigateTo(item.key)}
                              >
                                {t('nav.' + item.key) || item.name}
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
                    {(() => {
                      const key = activeKey();
                      return t('nav.' + key) || (section() === 'guide'
                        ? guideGroups().flatMap(g => g.items).find(i => i.key === key)?.name
                        : compFilteredGroups().flatMap(g => g.items).find(i => i.key === key)?.name) || '';
                    })()}
                  </span>
                </div>
              </Show>
              <div class="content" classList={{ 'content-full': !showSidebar() }}>
                {section() === 'guide' ? (
                  <>
                    {(() => {
                      const P = GUIDE_PAGES[activeKey()];
                      return P ? <P /> : <div style="padding:2rem">{t('nav.pageNotFound') || '未找到页面'}: {activeKey()}</div>;
                    })()}
                  </>
                ) : (
                  <>
                    {(() => {
                      // 显式依赖 locale，确保语言切换时子组件重新渲染
                      void useLocale();
                      const C = PAGES[activeKey()];
                      return C ? <C /> : <div style="padding:2rem">{t('nav.componentNotFound') || '未找到组件'}: {activeKey()}</div>;
                    })()}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Show>
    </ProviderConfig>
  );
}
