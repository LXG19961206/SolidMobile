import { createSignal, createMemo, onMount, For, Show, Suspense, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
// 启动时注册 common 通用词条（nav 等），后续各 doc 页懒加载自己的词条
import './doc-i18n';
import { setGlobalLocale, useLocale, useT } from '../src/i18n';
import { SearchBar } from './doc-utils/SearchBar';
import { ProviderConfig } from '../src/config';
import { deriveColorSet } from '../src/utils/color';
import { docThemeColor, persistThemeColor } from './doc-utils/doc-theme';
import { GROUPS, GUIDE_GROUPS } from './nav';
import { showI18nNotice, parseHash, buildHash, getDark, applyDark } from './utils';
import type { Section } from './utils';
import { useDisableZoom } from '../src/hooks';
import { DrawerContext } from './doc-utils/mobile/DrawerContext';
import drawerStyles from './doc-utils/mobile/MobilePreview.module.css';
import { ThemeColorPicker } from './doc-utils/ThemeColorPicker';
import { PAGES, PAGES_MOBILE, GUIDE_PAGES, allComponentItems } from './doc-registry';
import './App.css';

import { MobilePreviewApp } from './MobilePreviewApp';

/* ── App ── */

export function App() {
  useDisableZoom();
  const initial = parseHash();

  // Detect ?mobile=<key> for iframe mobile preview
  const mobileParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('mobile') : null;
  if (mobileParam) {
    return <MobilePreviewApp mobileParam={mobileParam} />;
  }

  const t = useT();

  const [section, setSection] = createSignal<Section>(initial.section);
  const [activeKey, setActiveKey] = createSignal(initial.pageKey || 'button');
  const [menuOpen, setMenuOpen] = createSignal(false);
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
    const loc = typeof localStorage !== 'undefined' ? (localStorage.getItem('sc-docs-locale') || 'en-US') : 'en-US';
    const dark = typeof localStorage !== 'undefined' && localStorage.getItem('sc-docs-dark-mode') === '1' ? '&dark=1' : '';
    const key = window.location.hash.replace('#/', '').replace(/^components\//, '').split('?')[0];
    el.src = './?mobile=' + key + '&locale=' + loc + dark + '&t=' + Date.now();
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

  const compFilteredGroups = createMemo(() => GROUPS);

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
    // Determine section: guide or components
    const isGuide = GUIDE_GROUPS.some(g => g.items.some(i => i.key === key));
    const sec: Section = isGuide ? 'guide' : 'components';
    setSection(sec);
    window.location.hash = buildHash(sec, key);
  };

  // ── Mobile: persistent drawer across page switches ──
  const [mobileDrawerOpen, setMobileDrawerOpen] = createSignal(false);
  const openMobileDrawer = () => setMobileDrawerOpen(true);
  const closeMobileDrawer = () => setMobileDrawerOpen(false);

  const mobileGroups = createMemo(() => [
    { title: '', items: [{ name: t('nav.mobileHome') || 'Home 首页', key: 'mobileHome' }] },
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
  const mobilePageComp = () => PAGES_MOBILE[mobileActiveKey()] || PAGES_MOBILE['home'];

  return (
    <ProviderConfig config={dynamicConfig()}>
      <Show when={!mobileView()} fallback={
        <DrawerContext.Provider value={openMobileDrawer}>
          <Dynamic component={mobilePageComp()}
            components={allComponentItems} onNavigate={navigateTo} />

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
                          <span>{t('nav.' + item.key) || item.name}{item.badge && <span class="drawer-item-badge">{item.badge}</span>}</span>
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
              <span class="top-nav-logo" aria-label="solid-mobile">
                <svg viewBox="0 0 32 32" fill="none" style="background:transparent">
                  <defs>
                    <linearGradient id="lo-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="var(--sc-color-primary, #1677ff)" />
                      <stop offset="100%" stop-color="color-mix(in srgb, var(--sc-color-primary, #1677ff) 70%, #6366f1)" />
                    </linearGradient>
                  </defs>
                  {/* 3 stacked component cards */}
                  <rect x="1" y="1" width="17" height="17" rx="4" fill="var(--sc-color-primary, #1677ff)" opacity="0.40" />
                  <rect x="7" y="7" width="18" height="18" rx="5" fill="var(--sc-color-primary, #1677ff)" opacity="0.65" />
                  <rect x="12" y="12" width="19" height="19" rx="5" fill="url(#lo-grad)" />
                  {/* accent: small spark at top-right */}
                  <circle cx="27" cy="8" r="2" fill="var(--sc-color-primary, #1677ff)" opacity="0.8" />
                </svg>
              </span>
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
              <SearchBar onNavigate={navigateTo} />

              <div style="display:inline-flex;border:1px solid var(--sc-color-border,#e5e7eb);border-radius:6px;overflow:hidden;height:30px;align-items:center">
                <span onClick={() => { if (useLocale() !== 'en-US') { showI18nNotice(); setGlobalLocale("en-US"); setTimeout(refreshIframe, 50); } }}
                  style={{
                    padding: '0 10px', cursor: 'pointer', 'font-size': '13px', 'font-weight': useLocale() === 'en-US' ? 600 : 400, height: '100%', display: 'inline-flex', 'align-items': 'center',
                    background: useLocale() === 'en-US' ? 'var(--sc-color-primary,#1677ff)' : 'transparent',
                    color: useLocale() === 'en-US' ? '#fff' : 'var(--sc-color-text-secondary,#6b7280)',
                    transition: 'all 0.15s'
                  }}>EN</span>
                <span style="width:1px;height:16px;background:var(--sc-color-border,#e5e7eb);flex-shrink:0" />
                <span onClick={() => { if (useLocale() !== 'zh-CN') { showI18nNotice(); setGlobalLocale("zh-CN"); setTimeout(refreshIframe, 50); } }}
                  style={{
                    padding: '0 10px', cursor: 'pointer', 'font-size': '13px', 'font-weight': useLocale() === 'zh-CN' ? 600 : 400, height: '100%', display: 'inline-flex', 'align-items': 'center',
                    background: useLocale() === 'zh-CN' ? 'var(--sc-color-primary,#1677ff)' : 'transparent',
                    color: useLocale() === 'zh-CN' ? '#fff' : 'var(--sc-color-text-secondary,#6b7280)',
                    transition: 'all 0.15s'
                  }}>CN</span>
              </div>
              <ThemeColorPicker color={docThemeColor()} onChange={(c) => { persistThemeColor(c); refreshIframe(); }} />
              <a class="tb-btn" href="https://github.com/LXG19961206/SolidMobile" target="_blank" rel="noopener noreferrer" title="GitHub" style="text-decoration:none;color:inherit">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
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
                                  {item.badge && <span class="nav-item-badge">{item.badge}</span>}
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
                </div>
              </Show>
              <Suspense fallback={
                <div class="content" classList={{ 'content-full': !showSidebar() }}>
                  <div class="doc-loading">
                    {/* 标题 */}
                    <div class="doc-loading-bar" style="width:40%" />
                    {/* 副标题/描述 */}
                    <div class="doc-loading-bar" style="width:65%; height:1.1rem" />
                    {/* Props 表格区域 */}
                    <div class="doc-loading-block" style="height:10rem" />
                    {/* Demo 标题 */}
                    <div class="doc-loading-text" style="width:30%" />
                    {/* 代码块 */}
                    <div class="doc-loading-block" />
                    <div class="doc-loading-text" style="width:28%" />
                    <div class="doc-loading-block" />
                    {/* 底部描述文本 */}
                    <div class="doc-loading-text" />
                    <div class="doc-loading-text" />
                    <div class="doc-loading-text" style="width:75%" />
                  </div>
                </div>
              }>
                <div class="content" classList={{ 'content-full': !showSidebar() }}>
                  {(() => {
                    // 显式依赖 locale / key，确保切换时重新进入 Suspense
                    void useLocale();
                    const key = activeKey();
                    if (section() === 'guide') {
                      const P = GUIDE_PAGES[key];
                      return P ? <P /> : <div style="padding:2rem">{t('nav.pageNotFound') || '未找到页面'}: {key}</div>;
                    }
                    const C = PAGES[key];
                    return C ? <C /> : <div style="padding:2rem">{t('nav.componentNotFound') || '未找到组件'}: {key}</div>;
                  })()}
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </Show>
    </ProviderConfig>
  );
}
