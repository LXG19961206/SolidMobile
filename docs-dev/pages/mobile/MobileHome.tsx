import { type Component } from 'solid-js';

/* ── Mobile Home Page ── */

const export const MobileHome: Component<{
  components?: { name: string; key: string }[];
  onNavigate?: (key: string) => void;
  onOpenDrawer?: () => void;
}> = (props) => (
  <div style={{ padding: '28px 20px', background: 'var(--sc-doc-card-bg, #fff)', 'min-height': '100vh', display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const }}>
    <div style={{
      display: 'flex' as const, 'align-items': 'center' as const, gap: '12px',
      'margin-bottom': '20px',
    }}>
      <span style={{ 'font-size': '1.5rem', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace', 'font-weight': 200, opacity: 0.35 }}>{'{'}</span>
      <div style={{ position: 'relative' as const }}>
        <div style={{
          width: '72px', height: '72px', 'border-radius': '50%',
          background: 'conic-gradient(from 0deg, var(--sc-color-primary, #1677ff), #22c55e, #f59e0b, #ef4444, #8b5cf6, var(--sc-color-primary, #1677ff))',
          animation: 'sc-logo-pulse 3s ease-in-out infinite',
          position: 'absolute' as const, top: '-6px', left: '-6px',
        }} />
        <img src="./logo.jpg" alt="solid-mobile" style={{
          width: '60px', height: '60px', 'border-radius': '50%',
          position: 'relative' as const, 'z-index': 1,
          'box-shadow': '0 2px 8px rgba(0,0,0,0.06)',
        }} />
      </div>
      <span style={{ 'font-size': '1.5rem', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace', 'font-weight': 200, opacity: 0.35 }}>{'}'}</span>
    </div>
    <div style={{ 'font-size': '1.2rem', 'font-weight': 700, color: 'var(--sc-doc-card-title, #1f2937)', 'margin-bottom': '4px' }}>solid-mobile</div>
    <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-align': 'center', 'line-height': 1.6, 'margin-bottom': '16px' }}>
      A SolidJS mobile UI component library.<br />Simple, performant, customizable.
    </div>

    {/* Notice */}
    <div style={{
      background: 'var(--sc-doc-card-placeholder, #f3f4f6)', 'border-radius': '10px',
      padding: '14px 16px', width: '100%', 'box-sizing': 'border-box' as const, 'margin-bottom': '20px',
    }}>
      <div style={{ 'font-size': '0.78rem', color: 'var(--sc-doc-card-title, #1f2937)', 'line-height': 1.6, 'text-align': 'center' as const }}>
        移动端文档为精简版本，完整 API 及交互示例请在 PC 设备上查看。
      </div>
      <div style={{ 'font-size': '0.68rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'line-height': 1.6, 'text-align': 'center' as const, 'margin-top': '6px' }}>
        Mobile docs are simplified. For full API reference &amp; interactive examples, please visit on a desktop device.
      </div>
    </div>
    {/* Links */}
    <div style={{ display: 'flex' as const, gap: '10px', width: '100%' }}>
      <div
        style={{ flex: 1, background: 'var(--sc-color-primary, #1677ff)', color: '#fff', 'border-radius': '10px', padding: '16px', cursor: 'pointer', 'text-align': 'center' as const }}
        onClick={() => props.onNavigate?.('design-tokens')}
      >
        <div style={{ 'font-size': '1rem', 'font-weight': 600, 'margin-bottom': '4px' }}>Quick Start</div>
        <div style={{ 'font-size': '0.7rem', opacity: 0.8 }}>视觉规范 & 配置</div>
      </div>
      <div
        style={{ flex: 1, background: 'var(--sc-doc-card-placeholder, #f3f4f6)', 'border-radius': '10px', padding: '16px', cursor: 'pointer', 'text-align': 'center' as const }}
        onClick={() => props.onNavigate?.('button')}
      >
        <div style={{ 'font-size': '1rem', 'font-weight': 600, color: 'var(--sc-doc-card-title, #1f2937)', 'margin-bottom': '4px' }}>Components</div>
        <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Button 起步</div>
      </div>
    </div>
  </div>
);