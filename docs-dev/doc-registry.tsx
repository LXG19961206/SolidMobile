import { lazy, type Component } from 'solid-js';
import { GROUPS } from './nav';

// ── Auto-discover all component DocPages via glob ──
// Key: derived from directory name (e.g. Button → button, ScrollBar → scrollbar)
const docModules = import.meta.glob('./components/*/*DocPage.tsx');

function deriveKey(path: string): string {
  // path: "./components/Button/ButtonDocPage.tsx" → "button"
  return path.split('/')[2]!.toLowerCase();
}

export const PAGES: Record<string, Component> = {};

for (const [path, loader] of Object.entries(docModules)) {
  const key = deriveKey(path);
  PAGES[key] = lazy(() =>
    loader().then((m: any) => {
      const exportKey = Object.keys(m).find((k: string) => k.endsWith('DocPage'))!;
      return { default: m[exportKey] };
    }),
  );
}

// ── Design Tokens (special — renders <AllTokens />, not a component DocPage) ──
import { AllTokens } from '../src/design-tokens/DesignTokenShowcase';
PAGES['design-tokens'] = () => (
  <div class="guide-card" style="padding: 1.5rem 2rem; max-width: 960px">
    <AllTokens />
  </div>
);

// ── Auto-discover all component Mobile pages via glob ──
const mobileModules = import.meta.glob('./components/*/*Mobile.tsx');

export const PAGES_MOBILE: Record<string, Component<any>> = {};

for (const [path, loader] of Object.entries(mobileModules)) {
  const key = deriveKey(path);
  PAGES_MOBILE[key] = lazy(() =>
    loader().then((m: any) => {
      const exportKey = Object.keys(m).find((k: string) => k.endsWith('Mobile'))!;
      return { default: m[exportKey] };
    }),
  );
}

// ── Special mobile pages (not under components/) ──
import { MobileHome } from './pages/mobile/MobileHome';
import { I18nMobile } from './pages/mobile/I18nMobile';

const DesignTokensMobile = lazy(() =>
  import('./pages/mobile/DesignTokensMobile').then(m => ({ default: m.DesignTokensMobile })),
);
const EventBusMobile = lazy(() =>
  import('./pages/mobile/EventBusMobile').then(m => ({ default: m.EventBusMobile })),
);
const ConfigMobile = lazy(() =>
  import('./pages/mobile/ConfigMobile').then(m => ({ default: m.ConfigMobile })),
);
const SolidjsMobile = lazy(() =>
  import('./pages/mobile/SolidjsMobile').then(m => ({ default: m.SolidjsMobile })),
);
const AboutMobile = lazy(() =>
  import('./pages/mobile/AboutMobile').then(m => ({ default: m.AboutMobile })),
);

PAGES_MOBILE['home'] = MobileHome;
PAGES_MOBILE['eventbus'] = EventBusMobile;
PAGES_MOBILE['solidjs'] = SolidjsMobile;
PAGES_MOBILE['about'] = AboutMobile;
PAGES_MOBILE['i18n'] = I18nMobile;
PAGES_MOBILE['config'] = ConfigMobile;
PAGES_MOBILE['design-tokens'] = DesignTokensMobile;

// ── Guide pages (manual — only 7, irregular naming under pages/guide/) ──
import { GuidePage } from './pages/guide/GuidePage';
import { ConfigDocPage } from './pages/guide/ConfigDocPage';
import { I18nDocPage } from './pages/guide/I18nDocPage';
import { AboutPage } from './pages/guide/AboutPage';
import { SolidjsPage } from './pages/guide/SolidjsPage';
import { EventBusDocPage } from './pages/guide/EventBusDocPage';

export const GUIDE_PAGES: Record<string, Component> = {
  guide: GuidePage,
  solidjs: SolidjsPage,
  about: AboutPage,
  config: ConfigDocPage,
  i18n: I18nDocPage,
  'design-tokens': () => <div class="guide-card"><AllTokens /></div>,
  eventbus: EventBusDocPage,
};

// ── Flat component list (for mobile nav) ──
export const allComponentItems: { name: string; key: string }[] =
  GROUPS.flatMap(g => g.items);
