import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
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
  const config = useConfig();

  return (
    <div style={CARD.wrapper}>
      <div style={CARD.title}>当前生效配置</div>
      <div style={CARD.desc}>
        以下是从 <code>useConfig()</code> 读取的当前主题状态（受文档站顶部取色器影响）：
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
          全局配置提供者。放在应用根节点，深层合并默认配置，注入 CSS 变量（<code>--sc-*</code>），
          并通过 Solid Context 向子组件提供主题、排版、圆角、语言等全局设置。
          不使用时组件按 <code>defaultConfig</code> 运行，无需额外配置。
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>快速开始：换个主色</div>
        <div style={CARD.desc}>
          最简单也最常用的场景——换一个品牌色。你只需要传 <code>primary</code>，
          hover、active、disabled、pale、focus 甚至 secondary 都会通过 <code>deriveColorSet()</code> 自动从主色计算。
          当然你也可以逐项覆盖任意状态色。
        </div>
        <pre style={PRE}>{codeQuickStart}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>顶层配置字段</div>
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
        <div style={CARD.title}>useConfig Hook</div>
        <div style={CARD.desc}>
          任意子组件内获取当前配置（JS 端读取主题值、做条件逻辑）。
        </div>
        <pre style={PRE}>{codeUseConfig}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>CSS 变量输出</div>
        <div style={CARD.desc}>
          ProviderConfig 挂载时调用 <code>generateCSSVars()</code>，注入 <code>{'<style id="solid-component-theme">'}</code> 到 <code>{'<head>'}</code>。
          darkMode='class' 时生成 :root + .dark 两段；darkMode='media' 时生成 :root + @media 查询。
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
