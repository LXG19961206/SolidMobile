import { createSignal, createMemo, onMount, For, Show, useContext, type Component } from 'solid-js';
import { Dynamic, Portal } from 'solid-js/web';
// Merge doc-only i18n keys into the library's dictionaries.
// MUST run before any component uses useT().  Doing this inline in
// the entry module prevents Rollup from tree-shaking the merge.
import { messages as libMessages } from '../src/i18n/dictionaries';
import { docMessages } from './doc-dictionaries';
import { extraDocMessages } from './doc-dictionaries-extra';
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

for (const messages of [docMessages, extraDocMessages]) {
  for (const locale of Object.keys(messages) as Array<keyof LocaleMessages>) {
    if (!libMessages[locale]) (libMessages as any)[locale] = {};
    deepMerge((libMessages as any)[locale], (messages as any)[locale]);
  }
}

import { useT, setGlobalLocale, useLocale } from '../src/i18n';
import { ProviderConfig } from '../src/config';
import { deriveColorSet } from '../src/utils/color';
import { docThemeColor, persistThemeColor } from './doc-utils/doc-theme';
import { Button, Tag, Picker, Cell, CellGroup } from '../src/components';
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
import { I18nMobile } from './pages/mobile/I18nMobile';
import { ConfigMobile } from './pages/mobile/ConfigMobile';
import { SolidjsMobile } from './pages/mobile/SolidjsMobile';
import { AboutMobile } from './pages/mobile/AboutMobile';

// Guide Pages
import { GuidePage } from './pages/guide/GuidePage';
import { ConfigDocPage } from './pages/guide/ConfigDocPage';
import { I18nDocPage } from './pages/guide/I18nDocPage';
import { AboutPage } from './pages/guide/AboutPage';
import { SolidjsPage } from './pages/guide/SolidjsPage';
import { EventBusDocPage } from './pages/guide/EventBusDocPage';
import { MobileHome } from './pages/mobile/MobileHome';
import { MenuGroup, GROUPS, GUIDE_GROUPS, CN } from './nav';
import { showI18nNotice, parseHash, buildHash, getDark, applyDark } from './utils';
import type { Section } from './utils';

import { AllTokens } from '../src/design-tokens/DesignTokenShowcase';
import { useDisableZoom } from '../src/hooks';
import { CodeBlock, DocLayout, PhoneTargetContext } from './doc-utils';
import { DrawerContext } from './doc-utils/mobile/DrawerContext';
import drawerStyles from './doc-utils/mobile/MobilePreview.module.css';

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

: Record<string, Component<{ components?: { name: string; key: string }[]; onNavigate?: (key: string) => void; onOpenDrawer?: () => void }>> = {
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
};

/* ── Top Nav Tabs ── */

// Moved inside component for t() access

import { ThemeColorPicker } from './doc-utils/ThemeColorPicker';

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

  const mobileGroups = createMemo(() => [
    { title: '', items: [{ name: 'Home 首页', key: 'home' }] },
    {
      title: '指南 / Guides', items: [
        { name: '全局配置', key: 'config' },
        { name: '视觉规范', key: 'design-tokens' },
        { name: '国际化 / i18n', key: 'i18n' },
        { name: 'EventBus 事件总线', key: 'eventbus' },
      ]
    },
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
