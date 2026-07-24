import { createSignal } from 'solid-js';
import { DialogComponent as Dialog } from '../../../src/components/Dialog';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { TabBar, TabBarItem } from '../../../src/components/TabBar';
import { TabBarDesign } from './TabBarDesign';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTabBarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

/* ── Animated SVG icon components (CSS keyframes) ── */
const animKeyframes = `
@keyframes tb-pop { 0%{transform:scale(1)} 40%{transform:scale(1.28)} 70%{transform:scale(.92)} 100%{transform:scale(1)} }
@keyframes tb-fill { from{fill-opacity:.2} to{fill-opacity:1} }
`;
if (typeof document !== 'undefined') {
  const s = document.createElement('style'); s.textContent = animKeyframes; document.head.appendChild(s);
}

const pop = { display: 'inline-block', animation: 'tb-pop .4s ease', transformOrigin: 'center' } as const;
const fill = { animation: 'tb-fill .3s ease' } as const;

const AnimatedHomeIcon = (p: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={p.active ? pop : undefined}>
    <path d="M3 12L12 3l9 9" />
    <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" fill={p.active ? 'currentColor' : 'none'} fill-opacity={p.active ? 1 : 0} style={p.active ? fill : undefined} />
  </svg>
);
const AnimatedStarIcon = (p: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" style={p.active ? pop : undefined}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={p.active ? 'currentColor' : 'none'} fill-opacity={p.active ? 1 : 0} style={p.active ? fill : undefined} />
  </svg>
);
const AnimatedUserIcon = (p: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={p.active ? pop : undefined}>
    <circle cx="12" cy="8" r="4" fill={p.active ? 'currentColor' : 'none'} fill-opacity={p.active ? 1 : 0} style={p.active ? fill : undefined} />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);

/* ── Path-draw animated icons ──
   Non-active: outlined icon fully visible (stroke-dashoffset=0, fill=none).
   Active: stroke draws in from start to end via @keyframes, then fill fades. */

/* Measure path lengths once at runtime for accurate dasharray values */
function measurePath(d: string): number {
  if (typeof document === 'undefined') return 100;
  const ns = 'http://www.w3.org/2000/svg';
  const p = document.createElementNS(ns, 'path') as SVGPathElement;
  p.setAttribute('d', d);
  return Math.ceil(p.getTotalLength());
}

const PATH_HOME_ROOF    = 'M3 12L12 3l9 9';
const PATH_HOME_BODY    = 'M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10';
const PATH_STAR         = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
const PATH_USER_BODY    = 'M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8';

const LEN_HOME_ROOF  = measurePath(PATH_HOME_ROOF);
const LEN_HOME_BODY  = measurePath(PATH_HOME_BODY);
const LEN_STAR       = measurePath(PATH_STAR);
const LEN_USER_BODY  = measurePath(PATH_USER_BODY);
const LEN_USER_HEAD  = Math.ceil(2 * Math.PI * 4); // circle r=4

// Inject one-shot draw keyframes keyed by path length
const drawKeyframes = `
@keyframes tb-draw-a { from{stroke-dashoffset:${LEN_HOME_ROOF}} to{stroke-dashoffset:0} }
@keyframes tb-draw-b { from{stroke-dashoffset:${LEN_HOME_BODY}} to{stroke-dashoffset:0} }
@keyframes tb-draw-c { from{stroke-dashoffset:${LEN_STAR}}      to{stroke-dashoffset:0} }
@keyframes tb-draw-d { from{stroke-dashoffset:${LEN_USER_HEAD}} to{stroke-dashoffset:0} }
@keyframes tb-draw-e { from{stroke-dashoffset:${LEN_USER_BODY}} to{stroke-dashoffset:0} }
@keyframes tb-fill-in { from{fill-opacity:0} to{fill-opacity:1} }
`;
if (typeof document !== 'undefined') {
  const s = document.createElement('style'); s.textContent = drawKeyframes; document.head.appendChild(s);
}

// Build style for a path segment
// inactive → outline fully visible, no fill
// active   → stroke draws in (0.5s), fill fades in after 0.35s delay
function seg(len: number, drawKey: string, active: boolean): Record<string, any> {
  if (!active) {
    return {
      'stroke-dasharray': len,
      'stroke-dashoffset': 0,
      fill: 'none',
      'fill-opacity': 0,
    };
  }
  return {
    'stroke-dasharray': len,
    animation: `${drawKey} .5s ease forwards, tb-fill-in .3s ease .35s forwards`,
    fill: 'currentColor',
  };
}

const PathHomeIcon = (p: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d={PATH_HOME_ROOF} style={seg(LEN_HOME_ROOF, 'tb-draw-a', p.active)} />
    <path d={PATH_HOME_BODY} style={seg(LEN_HOME_BODY, 'tb-draw-b', p.active)} />
  </svg>
);

const PathStarIcon = (p: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
    <path d={PATH_STAR} style={seg(LEN_STAR, 'tb-draw-c', p.active)} />
  </svg>
);

const PathUserIcon = (p: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="8" r="4" style={seg(LEN_USER_HEAD, 'tb-draw-d', p.active)} />
    <path d={PATH_USER_BODY} style={seg(LEN_USER_BODY, 'tb-draw-e', p.active)} />
  </svg>
);

/* ── Page order for prev/next navigation ── */
const PAGE_KEYS = ['tabs', 'tabbar', 'navbar', 'cell', 'picker', 'calendar', 'cascader', 'datepicker', 'citypicker', 'timepicker'];

function getCurrentKey(): string | null {
  try {
    const raw = window.location.hash.replace('#', '') || '';
    if (raw.startsWith('/')) {
      const parts = raw.split('/').filter(Boolean);
      return parts[1] || null;
    }
    return raw || null;
  } catch { return null; }
}

function navigateTo(key: string) {
  const hash = window.location.hash.replace('#', '').split('?')[0];
  window.location.hash = hash.replace(/[^/]+$/, key);
}

export const TabBarMobile = () => {
  const t = useT();
  const { propsTables } = useTabBarTableData();
  const [val, setVal] = createSignal('home');
  const [dialogOpen, setDialogOpen] = createSignal(false);
  const [navDir, setNavDir] = createSignal<'prev' | 'next' | null>(null);

  const handleNav = (dir: 'prev' | 'next') => {
    setNavDir(dir);
    setDialogOpen(true);
  };

  const confirmNav = () => {
    const currentKey = getCurrentKey();
    if (!currentKey) return;
    const idx = PAGE_KEYS.indexOf(currentKey);
    if (idx < 0) return;
    const target = navDir() === 'prev' ? PAGE_KEYS[idx - 1] : PAGE_KEYS[idx + 1];
    if (target) navigateTo(target);
    setDialogOpen(false);
  };

  return (
    <MobilePreview title="TabBar" hideNav>
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Basic */}
        <Card title={t('tabbar.demo.basic')}>
          <TabBar value={val()} onChange={setVal} fixed={false}>
            <TabBarItem name="home" icon="home" label="Home" />
            <TabBarItem name="cart" icon="shopping-cart" label="Cart" />
            <TabBarItem name="user" icon="user" label="Profile" />
          </TabBar>
        </Card>

        {/* Badge & Dot */}
        <Card title={t('tabbar.demo.badge')}>
          <TabBar defaultValue={0} fixed={false}>
            <TabBarItem name={0} icon="home" label="Home" badge={5} />
            <TabBarItem name={1} icon="chat" label="Messages" dot />
            <TabBarItem name={2} icon="settings" label="Settings" badge={99} />
          </TabBar>
        </Card>

        {/* Custom Color */}
        <Card title={t('tabbar.demo.color')}>
          <TabBar defaultValue="a" fixed={false} activeColor="#22c55e">
            <TabBarItem name="a" icon="home" label="Home" />
            <TabBarItem name="b" icon="star" label="Favorites" />
            <TabBarItem name="c" icon="user" label="Profile" />
          </TabBar>
        </Card>

        {/* Animated Icons (CSS keyframes) */}
        <Card title={t('tabbar.demo.animated')}>
          <TabBar defaultValue="a" fixed={false}>
            <TabBarItem name="a" label="Home" icon={AnimatedHomeIcon} />
            <TabBarItem name="b" label="Favorites" icon={AnimatedStarIcon} />
            <TabBarItem name="c" label="Profile" icon={AnimatedUserIcon} />
          </TabBar>
          <div style={{ 'font-size': '0.65rem', color: 'var(--sc-color-text-secondary, #9ca3af)', padding: '8px 12px 12px', 'line-height': 1.5 }}>
            {t('tabbar.demoDesc.animated')}
          </div>
        </Card>

        {/* Animated Icons (Path Draw) */}
        <Card title={t('tabbar.demo.pathDraw')}>
          <TabBar defaultValue="a" fixed={false}>
            <TabBarItem name="a" label="Home" icon={PathHomeIcon} />
            <TabBarItem name="b" label="Favorites" icon={PathStarIcon} />
            <TabBarItem name="c" label="Profile" icon={PathUserIcon} />
          </TabBar>
          <div style={{ 'font-size': '0.65rem', color: 'var(--sc-color-text-secondary, #9ca3af)', padding: '8px 12px 12px', 'line-height': 1.5 }}>
            {t('tabbar.demoDesc.pathDraw')}
          </div>
        </Card>

        {/* Design */}
        <TabBarDesign />

        {/* Fixed Bottom — replaces prev/next navigation */}
        <div>
          <TabBar defaultValue="b" placeholder safeArea onChange={(name) => {
            if (name === 'a') handleNav('prev');
            else if (name === 'c') handleNav('next');
          }}>
            <TabBarItem name="a" icon="arrow-left" label="Prev" />
            <TabBarItem name="b" icon="home" label="This" />
            <TabBarItem name="c" icon="arrow-right" label="Next" />
          </TabBar>
        </div>

        <Dialog
          show={dialogOpen()}
          title="Navigate"
          message="Go to the adjacent document?"
          showCancelButton
          confirmText="Go"
          cancelText="Cancel"
          onConfirm={confirmNav}
          onCancel={() => setDialogOpen(false)}
          onClose={() => setDialogOpen(false)}
        />
      </div>
    </MobilePreview>
  );
};
