import { type Component } from 'solid-js';

/* ── Mobile Home Page ── */

export const MobileHome: Component<{
  components?: { name: string; key: string }[];
  onNavigate?: (key: string) => void;
  onOpenDrawer?: () => void;
}> = (props) => (
  <div style={{ padding: '32px 20px 28px', 'min-height': '100vh', display: 'flex', 'flex-direction': 'column', 'align-items': 'center', background: 'var(--sc-doc-card-bg, #fff)' }}>
    {/* Logo */}
    <div style={{ 'margin-bottom': '20px' }}>
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
        <defs>
          <linearGradient id="mh-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="var(--sc-color-primary, #1677ff)" />
            <stop offset="100%" stop-color="color-mix(in srgb, var(--sc-color-primary, #1677ff) 70%, #6366f1)" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="34" height="34" rx="8" fill="var(--sc-color-primary, #1677ff)" opacity="0.35" />
        <rect x="14" y="14" width="36" height="36" rx="9" fill="var(--sc-color-primary, #1677ff)" opacity="0.60" />
        <rect x="26" y="26" width="36" height="36" rx="9" fill="url(#mh-grad)" />
        <circle cx="52" cy="18" r="3.5" fill="var(--sc-color-primary, #1677ff)" opacity="0.8" />
      </svg>
    </div>

    {/* Title */}
    <div style={{ 'font-size': '1.25rem', 'font-weight': 700, color: 'var(--sc-doc-card-title, #1f2937)', 'margin-bottom': '6px' }}>
      solid-mobile
    </div>
    <div style={{ 'font-size': '0.78rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-align': 'center', 'line-height': 1.6, 'margin-bottom': '24px', 'max-width': '280px' }}>
      A SolidJS mobile UI component library — simple, performant, customizable.
    </div>

    {/* Notice */}
    <div style={{
      background: 'var(--sc-doc-card-placeholder, #f3f4f6)', 'border-radius': '12px',
      padding: '14px 18px', width: '100%', 'box-sizing': 'border-box', 'margin-bottom': '24px',
    }}>
      <div style={{ 'font-size': '0.76rem', color: 'var(--sc-doc-card-title, #1f2937)', 'line-height': 1.65, 'text-align': 'center' }}>
        移动端文档为精简版，完整 API 及交互示例请在 PC 端查看。
      </div>
      <div style={{ 'font-size': '0.66rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'line-height': 1.6, 'text-align': 'center', 'margin-top': '6px' }}>
        Mobile docs are simplified. For full reference &amp; interactive demos, visit on desktop.
      </div>
    </div>

    {/* Action cards */}
    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
      <div
        style={{ flex: 1, background: 'var(--sc-color-primary, #1677ff)', color: '#fff', 'border-radius': '12px', padding: '18px 14px', cursor: 'pointer', 'text-align': 'center', transition: 'opacity .15s' }}
        onClick={() => props.onNavigate?.('design-tokens')}
      >
        <div style={{ 'font-size': '0.95rem', 'font-weight': 600, 'margin-bottom': '4px' }}>Quick Start</div>
        <div style={{ 'font-size': '0.68rem', opacity: 0.8 }}>视觉规范 &amp; 配置</div>
      </div>
      <div
        style={{ flex: 1, background: 'var(--sc-doc-card-placeholder, #f3f4f6)', 'border-radius': '12px', padding: '18px 14px', cursor: 'pointer', 'text-align': 'center' }}
        onClick={() => props.onNavigate?.('button')}
      >
        <div style={{ 'font-size': '0.95rem', 'font-weight': 600, color: 'var(--sc-doc-card-title, #1f2937)', 'margin-bottom': '4px' }}>Components</div>
        <div style={{ 'font-size': '0.68rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>从 Button 起步</div>
      </div>
    </div>
  </div>
);