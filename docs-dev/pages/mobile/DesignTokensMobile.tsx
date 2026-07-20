import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { useT, registerLocale } from '../../doc-i18n';
import zhCN from '../guide/DesignTokens/zh-CN';
import enUS from '../guide/DesignTokens/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useConfig } from '../../../src/config';

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const swatchRow: Record<string, string> = {
  display: 'flex', 'align-items': 'center', gap: '10px', padding: '8px 0',
  'border-bottom': '1px solid #f3f4f6',
};

const swatch: Record<string, string> = {
  width: '32px', height: '32px', 'border-radius': '6px', 'flex-shrink': '0',
  border: '1px solid rgba(0,0,0,0.08)',
};

const semanticGroups = [
  {
    title: '主色 Primary',
    keys: ['primary', 'primaryHover', 'primaryActive', 'primaryDisabled', 'primaryPale'] as const,
  },
  {
    title: '次色 Secondary',
    keys: ['secondary', 'secondaryHover', 'secondaryActive', 'secondaryDisabled', 'secondaryPale'] as const,
  },
  {
    title: '危险 Danger',
    keys: ['danger', 'dangerHover', 'dangerActive', 'dangerDisabled', 'dangerPale'] as const,
  },
  {
    title: '成功 Success',
    keys: ['success', 'successHover', 'successDisabled', 'successPale'] as const,
  },
  {
    title: '警告 Warning',
    keys: ['warning', 'warningHover', 'warningDisabled', 'warningPale'] as const,
  },
];

const surfaceKeys = [
  'background', 'backgroundSecondary',
  'text', 'textSecondary', 'textTertiary', 'textInverse',
  'border', 'borderHover',
  'info', 'focus',
] as const;

export const DesignTokensMobile: Component<{ components?: ComponentEntry[]; onNavigate?: (key: string) => void }> = (props) => {
  const t = useT();
  const config = useConfig();
  const light = () => config.colors.light;
  const dark = () => config.colors.dark;

  const renderColorRow = (label: string, lightColor: string, darkColor: string) => (
    <div style={swatchRow}>
      <div style={{ ...swatch, 'background-color': lightColor }} />
      <div style={{ ...swatch, 'background-color': darkColor }} />
      <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-text, #374151)', flex: 1 }}>{label}</span>
      <code style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{lightColor}</code>
    </div>
  );

  return (
    <MobilePreview title={t('dtokens.title')} components={props.components} onNavigate={props.onNavigate}>
      <div style={{ padding: "12px" }}>
        <div style={{ padding: '0 0 12px', 'font-size': '0.85rem', color: '#6b7280' }}>{t('dtokens.intro')}</div>
{/* 语义色 */}
      {semanticGroups.map((group) => (
        <div style={CARD.wrapper}>
          <div style={CARD.title}>{group.title}</div>
          <div style={CARD.desc}>
            <span style={{ display: 'inline-block', width: '32px', 'text-align': 'center', 'font-size': '0.65rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>L</span>
            <span style={{ display: 'inline-block', width: '32px', 'text-align': 'center', 'font-size': '0.65rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-left': '10px' }}>D</span>
            <span style={{ 'margin-left': '8px' }}>名称 / 值</span>
          </div>
          <div style={CARD.body}>
            {group.keys.map((k) =>
              renderColorRow(
                k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
                light()[k] || '',
                dark()[k] || '',
              )
            )}
          </div>
        </div>
      ))}

      {/* 表面色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>表面 & 文字色 Surface & Text</div>
        <div style={CARD.body}>
          {surfaceKeys.map((k) =>
            renderColorRow(
              k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
              (light() as any)[k] || '',
              (dark() as any)[k] || '',
            )
          )}
        </div>
      </div>

      {/* 排版 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>排版 Typography</div>
        <div style={CARD.body}>
          <div style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)', 'margin-bottom': '8px' }}>
            <strong>字号 Font Size</strong>
          </div>
          {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((s) => (
            <div style={{ display: 'flex', 'align-items': 'center', gap: '12px', padding: '6px 0', 'border-bottom': '1px solid #f3f4f6' }}>
              <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'min-width': '24px' }}>{s}</span>
              <span style={{ 'font-size': config.typography.fontSize[s], color: 'var(--sc-doc-card-text, #374151)' }}>
                {config.typography.fontSize[s]}
              </span>
            </div>
          ))}
          <div style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)', 'margin': '16px 0 8px' }}>
            <strong>字重 Font Weight</strong>
          </div>
          {(['normal', 'medium', 'semibold', 'bold'] as const).map((w) => (
            <div style={{ display: 'flex', 'align-items': 'center', gap: '12px', padding: '6px 0', 'border-bottom': '1px solid #f3f4f6' }}>
              <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'min-width': '36px' }}>{w}</span>
              <span style={{ 'font-weight': config.typography.fontWeight[w], 'font-size': '0.95rem', color: 'var(--sc-doc-card-text, #374151)' }}>
                {config.typography.fontWeight[w]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 圆角 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>圆角 Border Radius</div>
        <div style={CARD.body}>
          {(['sm', 'md', 'lg', 'full'] as const).map((r) => (
            <div style={{ display: 'flex', 'align-items': 'center', gap: '12px', padding: '8px 0' }}>
              <div style={{
                width: '40px', height: '40px', background: 'var(--sc-color-primary, #1677ff)',
                'border-radius': config.borderRadius[r],
              }} />
              <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-text, #374151)' }}>{r}</span>
              <code style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{config.borderRadius[r]}</code>
            </div>
          ))}
        </div>
      </div>

      {/* 行高 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>行高 Line Height</div>
        <div style={CARD.body}>
          {(['tight', 'normal', 'relaxed'] as const).map((lh) => (
            <div style={{ display: 'flex', 'align-items': 'center', gap: '12px', padding: '6px 0', 'border-bottom': '1px solid #f3f4f6' }}>
              <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'min-width': '40px' }}>{lh}</span>
              <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>{config.typography.lineHeight[lh]}</span>
              <div style={{
                flex: 1, background: 'var(--sc-doc-card-placeholder, #f3f4f6)', padding: '4px 8px', 'border-radius': '4px',
                'line-height': config.typography.lineHeight[lh], 'font-size': '0.7rem', color: 'var(--sc-doc-card-desc, #6b7280)',
              }}>
                这是一段示例文本用于展示不同行高下的阅读体验效果对比
              </div>
            </div>
          ))}
        </div>
      </div>
  </div>
    </MobilePreview>
  );
};
