import { createSignal, Show, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface LoadingMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Loading } from '../../../src/components/Loading';
import { Button } from '../../../src/components/Button';
import { useT } from '../../doc-i18n';

const propsData = [
  { name: 'type', type: "'spinner' | 'circular' | 'dots'", desc: '内置动画类型，默认 spinner' },
  { name: 'text', type: 'string', desc: '加载文字' },
  { name: 'size', type: 'string | number', desc: '尺寸，默认约 24px' },
  { name: 'color', type: 'string', desc: '动画颜色' },
  { name: 'textColor', type: 'string', desc: '文字颜色' },
  { name: 'vertical', type: 'boolean', desc: '纵向排列（文字在下方）' },
  { name: 'overlay', type: 'boolean', desc: '全屏遮罩加载' },
  { name: 'icon', type: 'JSX.Element', desc: '自定义加载图标' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '16px', 'align-items': 'center' as const },
};

export const LoadingMobile: Component<LoadingMobileProps> = (props) => {
  const t = useT();
  const [showOverlay, setShowOverlay] = createSignal(false);

  return (
    <MobilePreview title="Loading 加载" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 三种类型 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>三种内置动画</div>
        <div style={CARD.desc}>spinner（旋转环）/ circular（弧线）/ dots（三点）</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Loading type="spinner" size={32} />
            <span style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>spinner</span>
          </div>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Loading type="circular" size={32} />
            <span style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>circular</span>
          </div>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Loading type="dots" size={32} />
            <span style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>dots</span>
          </div>
        </div>
      </div>

      {/* 文字 & 排列 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>文字 & 排列</div>
        <div style={CARD.desc}>水平（默认）/ 垂直 vertical</div>
        <div style={CARD.body}>
          <Loading text="加载中..." />
          <Loading text="加载中..." type="circular" vertical />
          <Loading text="请稍候" type="dots" color="#1677ff" />
        </div>
      </div>

      {/* 颜色 & 大小 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>颜色 & 大小</div>
        <div style={CARD.desc}>color / size 自定义外观</div>
        <div style={CARD.body}>
          <Loading type="spinner" size={20} color="#1677ff" />
          <Loading type="spinner" size={28} color="#22c55e" />
          <Loading type="spinner" size={36} color="#f59e0b" />
          <Loading type="spinner" size={44} color="#ef4444" />
        </div>
      </div>

      {/* 遮罩模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>遮罩模式 overlay</div>
        <div style={CARD.desc}>全屏半透明遮罩 + 居中加载</div>
        <div style={CARD.body}>
          <Button size="sm" text="显示遮罩加载" onClick={() => { setShowOverlay(true); setTimeout(() => setShowOverlay(false), 2000); }} />
          <Show when={showOverlay()}>
            <Loading overlay text="加载中..." />
          </Show>
        </div>
      </div>
    </MobilePreview>
  );
};
