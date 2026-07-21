import type { JSX } from 'solid-js';
import { useLocale, setGlobalLocale } from '../src/i18n';
import { ProviderConfig } from '../src/config';
import { deriveColorSet } from '../src/utils/color';
import { SafeArea } from '../src/components/SafeArea';
import { getDark, applyDark } from './utils';

// ── Eager glob: all component Mobile pages (instant render, no Suspense) ──
const mobileModules = import.meta.glob('./components/*/*Mobile.tsx', { eager: true }) as Record<
  string,
  Record<string, any>
>;

function deriveKey(path: string): string {
  return path.split('/')[2]!.toLowerCase();
}

function buildMobileMap(): Record<string, any> {
  const map: Record<string, any> = {};
  for (const [path, mod] of Object.entries(mobileModules)) {
    const key = deriveKey(path);
    const exportKey = Object.keys(mod).find(k => k.endsWith('Mobile'))!;
    map[key] = mod[exportKey];
  }
  return map;
}

// ── Special pages (not under components/) — eager for iframe performance ──
import { MobileHome } from './pages/mobile/MobileHome';
import { I18nMobile } from './pages/mobile/I18nMobile';
import { DesignTokensMobile } from './pages/mobile/DesignTokensMobile';
import { EventBusMobile } from './pages/mobile/EventBusMobile';
import { ConfigMobile } from './pages/mobile/ConfigMobile';
import { SolidjsMobile } from './pages/mobile/SolidjsMobile';
import { AboutMobile } from './pages/mobile/AboutMobile';

const mobileMap = buildMobileMap();
mobileMap['home'] = MobileHome;
mobileMap['eventbus'] = EventBusMobile;
mobileMap['solidjs'] = SolidjsMobile;
mobileMap['about'] = AboutMobile;
mobileMap['i18n'] = I18nMobile;
mobileMap['config'] = ConfigMobile;
mobileMap['design-tokens'] = DesignTokensMobile;

/* ── MobilePreviewApp ──
   Rendered inside the desktop phone simulator iframe (?mobile=<key>).
   Uses eager glob so components render instantly without Suspense. */
export function MobilePreviewApp(props: { mobileParam: string }) {
  const localeParam =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('locale')
      : null;

  void useLocale();
  if (localeParam && localeParam !== useLocale()) setGlobalLocale(localeParam);
  applyDark(getDark());

  const themeColor = (() => {
    try {
      return localStorage.getItem('sc-docs-theme-color') || '#1677ff';
    } catch {
      return '#1677ff';
    }
  })();

  const colors = deriveColorSet(themeColor);
  const Demo = mobileMap[props.mobileParam];

  const notch = 36; // PhoneSimulator notch + safe area height
  try {
    document.body.style.setProperty('--sc-safe-area-top', `${notch}px`);
    document.body.style.setProperty('--sc-safe-area-bottom', '0px');
  } catch {
    /* noop */
  }

  return (
    <ProviderConfig
      config={{
        locale: useLocale(),
        colors: { light: { primary: themeColor }, dark: { primary: colors.hover } },
      }}
    >
      <div
        style={
          {
            '--sc-safe-area-top': `${notch}px`,
            '--sc-safe-area-bottom': '0px',
          } as JSX.CSSProperties
        }
      >
        <SafeArea position="top" />
        <span style="display:none">{useLocale()}</span>
        {Demo ? (
          <Demo />
        ) : (
          <div style="padding:16px">Demo not found: {props.mobileParam}</div>
        )}
        <SafeArea position="bottom" />
      </div>
    </ProviderConfig>
  );
}
