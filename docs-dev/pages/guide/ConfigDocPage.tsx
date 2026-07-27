import { type Component } from 'solid-js';
import { CodeBlock } from '../../doc-utils';
import { useT, registerLocale } from '../../doc-i18n';
import zhCN from './Config/zh-CN';
import enUS from './Config/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

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
  const t = useT();
  return (
    <div class="guide-card">
      <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 0.5rem' }}>ConfigProvider</h1>
      <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>{t('config.intro')}</p>

      <h2 style={SECTION_H2}>{t('config.quickTitle')}</h2>
      <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>{t('config.quickDesc')}</p>
      <CodeBlock lang="jsx" code={`import { ProviderConfig } from 'solid-mobile';

// Pass only primary — all derivative state colors are auto-computed
const theme = {
  colors: { light: { primary: '#6366f1' } },
};

function App() {
  return (
    <ProviderConfig config={theme}>
      <div>your app content</div>
    </ProviderConfig>
  );
}

// Auto-derived (HSL color space):
//   primaryHover   → lighten by 10%
//   primaryActive  → darken by 10%
//   primaryPale    → high lightness + low saturation
//   secondary      → derived from primaryHover
//   focus          → primary + 40% alpha`} />

      <h2 style={SECTION_H2}>{t('config.fullTitle')}</h2>
      <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>{t('config.fullDesc')}</p>
      <CodeBlock lang="jsx" code={`import { ProviderConfig } from 'solid-mobile';

const appConfig = {
  // ══ General ══
  prefix: 'sc',              // CSS var prefix → --sc-color-primary etc.
  darkMode: 'class',         // 'class' = .dark class, 'media' = system
  locale: 'en-US',           // built-in: 'en-US' | 'zh-CN'

  // ══ Colors — light/dark palettes ══
  // Each semantic color has 5 levels: base / hover / active / disabled / pale
  colors: {
    light: {
      // Primary — buttons, selections, brand
      primary: '#1677ff',
      primaryHover: '#4096ff',
      primaryActive: '#0958d9',
      primaryDisabled: 'rgba(22,119,255,0.35)',
      primaryPale: 'rgba(22,119,255,0.08)',

      // Secondary — auxiliary elements
      secondary: '#6ba3ff',
      secondaryHover: '#8ab8ff',
      secondaryActive: '#4d8ae0',
      secondaryDisabled: 'rgba(107,163,255,0.35)',
      secondaryPale: 'rgba(107,163,255,0.08)',

      // Surfaces — page / card backgrounds
      background: '#eff2f5',
      backgroundSecondary: '#f7f8fa',

      // Text — 4-level hierarchy
      text: '#323233',
      textSecondary: '#969799',
      textTertiary: '#afaba9',
      textInverse: '#ffffff',

      // Borders
      border: '#dcdee0',
      borderHover: '#c5c7ca',

      // Semantic — danger / success / warning / info
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

      // Info / focus ring
      info: '#969799',
      focus: 'rgba(22,119,255,0.25)',
    },

    // Dark mode — same structure as light
    dark: {
      primary: '#5195ff',
      primaryHover: '#7ab0ff',
      primaryActive: '#3678e0',
      primaryDisabled: 'rgba(81,149,255,0.35)',
      primaryPale: 'rgba(81,149,255,0.12)',
      // ... remaining fields same as above, omitted
    },
  },

  // ══ Typography — font / size / weight / line-height ══
  typography: {
    'font-family': {
      base: 'system-ui, -apple-system, sans-serif',  // body
      mono: 'ui-monospace, SFMono-Regular, monospace', // code
    },
    'font-size': {
      xs: '0.75rem',    // 12px — captions
      sm: '0.875rem',   // 14px — secondary
      md: '1rem',       // 16px — body
      lg: '1.125rem',   // 18px — subtitle
      xl: '1.25rem',    // 20px — heading
      xxl: '1.5rem',    // 24px — hero
    },
    'font-weight': {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    'line-height': {
      tight: 1.25,     // headings
      normal: 1.5,     // body
      relaxed: 1.75,   // long text
    },
  },

  // ══ Border Radius — 4 tiers ══
  'border-radius': {
    sm: '4px',         // tags, badges
    md: '8px',         // buttons, inputs
    lg: '12px',        // cards, modals
    full: '9999px',    // pills, avatars
  },
};

function App() {
  return (
    <ProviderConfig config={appConfig}>
      <App />
    </ProviderConfig>
  );
}`} />

      <h2 style={SECTION_H2}>{t('config.propsTitle')}</h2>
      <div class="guide-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ 'font-weight': 600 }}>config</td>
              <td style={{ color: '#6b7280', 'font-size': '0.8rem' }}>PartialSolidComponentConfig</td>
              <td style={{ color: '#9ca3af', 'font-size': '0.8rem' }}>—</td>
              <td>Partial config override, deep-merged into defaultConfig. Only pass fields you want to change.</td>
            </tr>
            <tr>
              <td style={{ 'font-weight': 600 }}>localeMessages</td>
              <td style={{ color: '#6b7280', 'font-size': '0.8rem' }}>{`Record<string, TranslationDict>`}</td>
              <td style={{ color: '#9ca3af', 'font-size': '0.8rem' }}>—</td>
              <td>Partial locale dictionary, deep-merged into built-in. Keys are locale strings, values follow built-in structure. User entries take priority.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style={SECTION_H2}>{t('config.structTitle')}</h2>

      <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '1.5rem 0 0.5rem' }}>{t('config.topTitle')}</h3>
      <div class="guide-table-wrap">
        <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.85rem' }}>
          <thead>
            <tr style={{ 'border-bottom': '2px solid #e5e7eb', 'text-align': 'left' }}>
              <th style={{ padding: '8px 12px' }}>Field</th>
              <th style={{ padding: '8px 12px' }}>Type</th>
              <th style={{ padding: '8px 12px' }}>Default</th>
              <th style={{ padding: '8px 12px' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['prefix', 'string', "'sc'", 'CSS variable prefix. primary → --sc-color-primary'],
              ['darkMode', "'class' | 'media'", "'class'", "Dark mode strategy. class → toggle .dark on html; media → @media (prefers-color-scheme: dark)"],
              ['locale', 'string', "'en-US'", 'Built-in locale. Supports arbitrary locale strings; built-in dict covers en-US / zh-CN'],
              ['colors', 'ThemeColors', 'see below', 'Full color system with light / dark palettes'],
              ['typography', 'TypographyConfig', 'see below', 'Font family, size, weight, line-height'],
              ['borderRadius', 'BorderRadiusConfig', 'see below', 'Border radius sizes (sm/md/lg/full)'],
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

      <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '1.5rem 0 0.5rem' }}>{t('config.colorTitle')}</h3>
      <p style={{ color: '#6b7280', 'font-size': '0.85rem', margin: '0 0 0.75rem' }}>{t('config.colorDesc')}</p>
      <div class="guide-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Light</th>
              <th>Dark</th>
              <th>CSS Variable</th>
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

      <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '1.5rem 0 0.5rem' }}>{t('config.typoTitle')}</h3>
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

      <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '1.5rem 0 0.5rem' }}>{t('config.radiusTitle')}</h3>
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

      <h2 style={SECTION_H2}>{t('config.cssTitle')}</h2>
      <p style={{ color: '#6b7280', 'margin': '0 0 0.75rem' }}>{t('config.cssDesc')}</p>
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

      <h2 style={SECTION_H2}>{t('config.hookTitle')}</h2>
      <p style={{ color: '#6b7280', 'margin': '0 0 0.75rem' }}>{t('config.hookDesc')}</p>
      <CodeBlock lang="jsx" code={`import { useConfig } from 'solid-mobile';

function MyComp() {
  const cfg = useConfig();
  console.log(cfg.colors.light.primary); // '#1677ff'
  console.log(cfg.locale);               // 'zh-CN'
}`} />
    </div>
  );
};

export { ConfigDocPage };
