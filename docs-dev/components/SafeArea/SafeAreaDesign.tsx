import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';
import { useT } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';

const preStyle = {
  background: 'var(--sc-color-background-secondary, #f5f5f5)',
  'border-radius': '6px',
  padding: '12px',
  'font-size': '0.8rem',
  'line-height': 1.6,
  overflow: 'auto' as const,
};

const cssVarsChainStyle = {
  background: 'var(--sc-color-background-secondary, #f5f5f5)',
  'border-radius': '8px',
  padding: '12px 16px',
  'font-family': 'monospace',
  'font-size': '0.85rem',
  'line-height': 2,
  margin: '0 0 16px',
} as const;

const titleStyle = '.safearea-design-card .sc-card-title { font-size: 1rem; }';

export function SafeAreaDesign() {
  const t = useT();

  return (
    <Card title={t('safearea.design.cardTitle')} class="safearea-design-card">
      <style>{titleStyle}</style>
      <style>{'html.dark .safearea-design-card .sc-card-title { font-size:1rem; }'}</style>
    <div style={{ 'font-size': '0.9rem', 'line-height': 1.8, color: 'var(--sc-color-text, #374151)' }}>
      <p>{t('safearea.design.para1')}</p>

      <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '20px 0 8px' }}>
        {t('safearea.design.whyTitle')}
      </h3>
      <ul style={{ padding: '0 0 0 20px', margin: '0 0 16px' }}>
        <li style={{ 'margin-bottom': '8px' }}>
          <strong>{t('safearea.design.notch')}</strong>
          {t('safearea.design.notchDesc')}
        </li>
        <li style={{ 'margin-bottom': '8px' }}>
          <strong>{t('safearea.design.statusBar')}</strong>
          {t('safearea.design.statusBarDesc')}
        </li>
        <li style={{ 'margin-bottom': '8px' }}>
          <strong>{t('safearea.design.homeIndicator')}</strong>
          {t('safearea.design.homeIndicatorDesc')}
        </li>
      </ul>

      <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '20px 0 8px' }}>
        {t('safearea.design.cssChainTitle')}
      </h3>
      <p style={{ margin: '0 0 8px' }}>
        {t('safearea.design.cssChainDesc')}
      </p>
      <div style={cssVarsChainStyle}>
        <div>
          <span style={{ color: 'var(--sc-color-primary, #1677ff)' }}>--sc-safe-area-top</span>
          <span style={{ color: 'var(--sc-color-text-secondary, #6b7280)' }}>  ← ① {t('safearea.design.chainUser')}</span>
        </div>
        <div style={{ 'padding-left': '20px', color: 'var(--sc-color-text-secondary, #6b7280)' }}>↳ <span style={{ color: 'var(--sc-color-primary, #1677ff)' }}>env(safe-area-inset-top)</span>  ← ② {t('safearea.design.chainDevice')}</div>
        <div style={{ 'padding-left': '40px', color: 'var(--sc-color-text-secondary, #9ca3af)' }}>↳ 0px  ← ③ {t('safearea.design.chainFallback')}</div>
      </div>

      <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '20px 0 8px' }}>
        {t('safearea.design.modesTitle')}
      </h3>

      <h4 style={{ 'font-size': '0.88rem', 'font-weight': 600, margin: '12px 0 4px' }}>
        ① {t('safearea.design.spacerTitle')}
      </h4>
      <p style={{ margin: '0 0 8px' }}>
        {t('safearea.design.spacerDesc')}
      </p>
      <pre style={preStyle}><code innerHTML={Prism.highlight('<SafeArea position="top" />\n<NavBar title="Home" />\n<div style={{ flex: 1 }}>Content</div>\n<TabBar />\n<SafeArea position="bottom" />', Prism.languages.jsx, 'jsx')} /></pre>

      <h4 style={{ 'font-size': '0.88rem', 'font-weight': 600, margin: '16px 0 4px' }}>
        ② {t('safearea.design.containerTitle')}
      </h4>
      <p style={{ margin: '0 0 8px' }}>
        {t('safearea.design.containerDesc')}
      </p>
      <pre style={preStyle}><code innerHTML={Prism.highlight('<SafeArea position="top">\n  <NavBar title="Home" />\n</SafeArea>\n<div style={{ flex: 1 }}>Content</div>\n<SafeArea position="bottom">\n  <TabBar />\n</SafeArea>', Prism.languages.jsx, 'jsx')} /></pre>

      <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '20px 0 8px' }}>
        {t('safearea.design.customTitle')}
      </h3>
      <p style={{ margin: '0 0 8px' }}>
        {t('safearea.design.customDesc')}
      </p>
      <pre style={preStyle}><code innerHTML={Prism.highlight(':root {\n  --sc-safe-area-top: 44px;\n  --sc-safe-area-bottom: 34px;\n}', Prism.languages.css, 'css')} /></pre>
      <p style={{ margin: '12px 0 0', 'font-size': '0.8rem', color: 'var(--sc-color-text-secondary, #6b7280)' }}>
        {t('safearea.design.priority')}
      </p>
    </div>
    </Card>
  );
}
