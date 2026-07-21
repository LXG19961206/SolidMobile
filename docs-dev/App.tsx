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
    const loc = typeof localStorage !== 'undefined' ? (localStorage.getItem('sc-docs-locale') || 'zh-CN') : 'zh-CN';
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
              <SearchBar onNavigate={navigateTo} />

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
                </div>
              </Show>
              <Suspense fallback={<div class="content-skeleton" />}>
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
