import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { useConfig } from '../../../src/config';
import { useT } from '../../doc-i18n';

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
  note: { 'font-size': '0.78rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 16px', 'line-height': 1.7 },
};

const PRE = {
  margin: '0 16px 12px', padding: '10px 14px', 'border-radius': '6px',
  background: 'var(--sc-doc-code-bg, #f5f5f5)', color: 'var(--sc-doc-code-text, #374151)',
  'font-size': '0.7rem', 'line-height': '1.45', overflow: 'auto' as const,
  'white-space': 'pre-wrap' as const, 'font-family': 'ui-monospace, monospace',
  border: '1px solid var(--sc-doc-card-border, #e5e7eb)',
};

const TABLE_HEAD = { display: 'flex', 'font-size': '0.65rem', color: 'var(--sc-doc-card-muted, #9ca3af)', padding: '4px 0', 'border-bottom': '1px solid var(--sc-doc-card-border, #e5e7eb)', 'font-weight': 600 };
const TABLE_ROW = { display: 'flex', 'font-size': '0.72rem', padding: '4px 0', 'border-bottom': '1px solid var(--sc-color-border, #ebedf0)', 'align-items': 'center' };

const SEMANTIC_COLORS = ['primary', 'secondary', 'danger', 'success', 'warning'] as const;

const configFields = [
  ['prefix', "CSS 变量前缀，默认 'sc'"],
  ['darkMode', "class' | 'media'，默认 'class'"],
  ['locale', '语言，默认 zh-CN，内置中英文字典'],
  ['colors', 'light / dark 双色板，含语义色五级变体'],
  ['typography', '字体族、字号、字重、行高'],
  ['borderRadius', '圆角尺寸 sm / md / lg / full'],
];

const codeQuickStart = `import { ProviderConfig } from 'solid-mobile';

const themeConfig = {
  colors: {
    light: { primary: '#6366f1' },
  },
};

function App() {
  return (
    <ProviderConfig config={themeConfig}>
      <App />
    </ProviderConfig>
  );
}`;

const codeUseConfig = `import { useConfig } from 'solid-mobile';

function MyComp() {
  const cfg = useConfig();
  cfg.colors.light.primary; // '#1677ff'
  cfg.locale;               // 'zh-CN'
}`;

const codeCssVars = `:root {
  --sc-color-primary: #1677ff;
  --sc-color-primary-hover: #4096ff;
  --sc-font-size-md: 1rem;
  --sc-border-radius-lg: 12px;
  ...
}

.dark {
  --sc-color-primary: #5195ff;
  ...
}`;

const SWATCH = {
  width: '28px', height: '28px', 'border-radius': '6px',
  border: '1px solid var(--sc-color-border, rgba(0,0,0,0.08))',
};

const ConfigOverview: Component = () => {
  const t = useT();
  const config = useConfig();

  return (
    <div style={CARD.wrapper}>
      <div style={CARD.title}>{t('guideSection.currentConfig')}</div>
      <div style={CARD.desc}>
        {t('guideSection.currentConfigDesc')}
      </div>
      <div style={CARD.body}>
        <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'margin-bottom': '8px' }}>
          prefix: <code style="color:#1f2937">{config.prefix}</code> · darkMode: <code style="color:#1f2937">{config.darkMode}</code> · locale: <code style="color:#1f2937">{config.locale}</code>
        </div>
        <div style={{ display: 'flex', gap: '6px', 'flex-wrap': 'wrap' }}>
          {SEMANTIC_COLORS.map(k => (
            <div style={{ ...SWATCH, background: (config.colors.light as any)[k] }} title={k} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ConfigMobile: Component<{ components?: ComponentEntry[]; onNavigate?: (key: string) => void }> = (props) => {
  const t = useT();

  return (
    <MobilePreview title={t('nav.config') || 'ConfigProvider'} components={props.components} onNavigate={props.onNavigate}>
      <div style={CARD.wrapper}>
        <div style={CARD.title}>ConfigProvider</div>
        <div style={CARD.note}>
          {t('configDesc')}
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('guideSection.quickStartTitle')}</div>
        <div style={CARD.desc}>
          {t('guideSection.quickStartDesc')}
        </div>
        <pre style={PRE}>{codeQuickStart}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('guideSection.topFields')}</div>
        <div style={CARD.body}>
          <div style={TABLE_HEAD}>
            <span style="flex:1">字段</span><span style="flex:2">说明</span>
          </div>
          {configFields.map(([name, desc]) => (
            <div style={TABLE_ROW}>
              <span style="flex:1;font-weight:500;font-family:monospace;font-size:0.75rem">{name}</span>
              <span style="flex:2;color:#6b7280;font-size:0.7rem">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <ConfigOverview />

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('guideSection.useConfig')}</div>
        <div style={CARD.desc}>
          {t('guideSection.useConfigDesc')}
        </div>
        <pre style={PRE}>{codeUseConfig}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('guideSection.cssVars')}</div>
        <div style={CARD.desc}>
          {t('guideSection.cssVarsDesc')}
        </div>
        <pre style={PRE}>{codeCssVars}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.note}>
          以上为移动端常用配置速览。所有可配置字段（含完整色彩 Token 表、排版/圆角详细规格、CSS 变量生成规则等）
          请查看 <strong>PC 端文档</strong>。
        </div>
      </div>
    </MobilePreview>
  );
};
