import { type Component } from 'solid-js';
import { SafeArea } from '../../../../src/components/SafeArea';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';
import { useT, registerLocale } from '../../../doc-i18n';
import zhCN from '../../../i18n/safearea/zh-CN';
import enUS from '../../../i18n/safearea/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const safeAreaProps: PropRow[] = [
  { name: 'position', type: "'top' | 'bottom'", default: "'bottom'", required: false, desc: 'componentProps.safearea.position' },
];

const codeTop = `<SafeArea position="top" />
<!-- Top content, avoid notch/status bar -->`;

const codeBottom = `<!-- Bottom content, avoid Home Indicator -->
<SafeArea position="bottom" />`;

const codeCSS = `/* CSS 变量优先级 */
--sc-safe-area-top: 44px;         /* 1. 自定义覆盖（最高） */
env(safe-area-inset-top);         /* 2. 设备原生安全区域 */
/* 3. 兜底 0px */`;

const codeLayout = `<div style={{ display: 'flex', 'flex-direction': 'column', height: '100vh' }}>
  <SafeArea position="top" />
  <NavBar title="Home" />
  <div style={{ flex: 1 }}>Page content</div>
  <Tabbar />
  <SafeArea position="bottom" />
</div>`;

export const SafeAreaDocPage: Component = () => {
  const t = useT();
  return (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>SafeArea</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        {t('componentIntro.SafeAreaIntro')}
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={safeAreaProps} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('section.implementation')}</h2>
      <p style={{ 'line-height': 1.8, color: '#374151' }}>
        SafeArea is a pure style spacer component. Its height reads from CSS variable <code>--sc-safe-area-top</code> 或 <code>--sc-safe-area-bottom</code>，
        , falling back to <code>env(safe-area-inset-top)</code> / <code>env(safe-area-inset-bottom)</code>, and finally to <code>0px</code>。
      </p>

      <DemoBlock title={t('demo.cssVarLevel')} code={codeCSS} hideTitle>
        <div style={{ padding: '12px', 'font-size': '0.85rem', color: '#6b7280', 'text-align': 'center' }}>
          See CSS variable hierarchy in code on left
        </div>
      </DemoBlock>

      <p style={{ 'line-height': 1.8, color: '#374151', 'margin-top': '1rem' }}>
        Set on app root or any parent element: <code>--sc-safe-area-top</code> to override SafeArea height.
        The PhoneSimulator already presets <code>--sc-safe-area-top: 32px</code> to simulate a notch.
      </p>

      <DemoBlock title={t('demo.safeTop')} desc={t('demoDesc.safearea_top')} code={codeTop}>
        <div style={{
          background: '#f0f5ff',
          border: '1px dashed #1677ff',
          'border-radius': '8px',
        }}>
          <SafeArea position="top" />
          <div style={{ padding: '12px', color: 'var(--sc-color-primary, #1677ff)', 'font-size': '0.9rem', 'text-align': 'center' }}>
            Top content (SafeArea spacing applied)
          </div>
        </div>
      </DemoBlock>

      <DemoBlock title={t('demo.safeBottom')} desc={t('demoDesc.safearea_bottom')} code={codeBottom}>
        <div style={{
          background: '#f0fdf4',
          border: '1px dashed #22c55e',
          'border-radius': '8px',
        }}>
          <div style={{ padding: '12px', color: '#22c55e', 'font-size': '0.9rem', 'text-align': 'center' }}>
            底部内容
          </div>
          <SafeArea position="bottom" />
        </div>
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('section.withNavBar')}</h2>
      <p style={{ 'line-height': 1.8, color: '#374151' }}>
        SafeArea 最常见的用法是配合 <code>NavBar</code> 和 <code>Tabbar</code> 使用。
      </p>

      <DemoBlock title={t('demo.safeLayout')} code={codeLayout} hideTitle>
        <div style={{ padding: '12px', 'font-size': '0.85rem', color: '#6b7280', 'text-align': 'center' }}>
          NavBar + SafeArea + Tabbar 布局
        </div>
      </DemoBlock>

      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', 'border-radius': '8px', padding: '12px', 'margin-top': '16px' }}>
        <strong style={{ color: '#c2410c' }}>⚠️ Note</strong>
        <ul style={{ margin: '8px 0 0', 'padding-left': '20px', 'line-height': 1.8 }}>
          <li><code>env(safe-area-inset-*)</code> 仅在 iOS Safari 和部分 Android WebView 中生效。桌面浏览器返回 <code>0px</code>。</li>
          <li>如需在所有环境下生效，请通过 <code>--sc-safe-area-top</code> CSS 变量手动设置。</li>
          <li>The PhoneSimulator already presets <code>--sc-safe-area-top: 32px</code> to simulate a notch.</li>
        </ul>
      </div>
    </div>
  </DocLayout>
  );
};
