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

// 把主题配置提到组件外面，只传 primary，其余状态色自动推导
const theme = {
  colors: { light: { primary: '#6366f1' } },
};

function App() {
  return (
    <ProviderConfig config={theme}>
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

      <h2 style={SECTION_H2}>{t('config.fullTitle')}</h2>
      <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>{t('config.fullDesc')}</p>
      <CodeBlock lang="jsx" code={`import { ProviderConfig } from 'solid-mobile';

// 把配置提到组件外面，清晰且高亮正确
const appConfig = {
  // ══════════════════════════════════════
  // 全局设置
  // ══════════════════════════════════════
  prefix: 'sc',              // CSS 变量前缀 → 生成 --sc-color-primary 等
  darkMode: 'class',         // 暗色模式策略: 'class' = .dark 类名, 'media' = 系统偏好
  locale: 'zh-CN',           // 内置文本语言: Arbitrary  locale 字符串，内置字典仅含 'zh-CN' | 'en-US'

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
              <th>属性</th>
              <th>类型</th>
              <th>Default 值</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ 'font-weight': 600 }}>config</td>
              <td style={{ color: '#6b7280', 'font-size': '0.8rem' }}>PartialSolidComponentConfig</td>
              <td style={{ color: '#9ca3af', 'font-size': '0.8rem' }}>—</td>
              <td>部分配置覆盖，Depth 合并到 defaultConfig。只传需要改的字段。</td>
            </tr>
            <tr>
              <td style={{ 'font-weight': 600 }}>localeMessages</td>
              <td style={{ color: '#6b7280', 'font-size': '0.8rem' }}>{`Record<string, TranslationDict>`}</td>
              <td style={{ color: '#9ca3af', 'font-size': '0.8rem' }}>—</td>
              <td>自定义语言字典，Depth 合并到内置字典。传Arbitrary  locale 字符串作为 key，值与内置字典同结构。用户词条优先。</td>
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
              <th style={{ padding: '8px 12px' }}>字段</th>
              <th style={{ padding: '8px 12px' }}>类型</th>
              <th style={{ padding: '8px 12px' }}>Default 值</th>
              <th style={{ padding: '8px 12px' }}>说明</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['prefix', 'string', "'sc'", 'CSS 变量前缀。如 primary 生成 --sc-color-primary'],
              ['darkMode', "'class' | 'media'", "'class'", "暗色模式策略。class → 给 html 加 .dark；media → @media (prefers-color-scheme: dark)"],
              ['locale', 'string', "'zh-CN'", '内置文本语言。Supports Arbitrary  locale 字符串，内置字典仅含 zh-CN / en-US'],
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

      <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '1.5rem 0 0.5rem' }}>{t('config.colorTitle')}</h3>
      <p style={{ color: '#6b7280', 'font-size': '0.85rem', margin: '0 0 0.75rem' }}>{t('config.colorDesc')}</p>
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
