import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface OverlayMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Overlay } from '../../../src/components/Overlay';
import { Button } from '../../../src/components/Button';
import { Loading } from '../../../src/components/Loading';

const propsData = [
  { name: 'open', type: 'boolean', desc: '是否显示遮罩（必填）' },
  { name: 'onClose', type: '() => void', desc: '点击遮罩背景回调' },
  { name: 'zIndex', type: 'number', desc: '自定义 z-index，默认 999' },
  { name: 'lockScroll', type: 'boolean', desc: '锁定 body 滚动，默认 true' },
  { name: 'duration', type: 'number', desc: '过渡动画时长(ms)，默认 200' },
  { name: 'mount', type: 'Node', desc: 'Portal 挂载目标' },
  { name: 'children', type: 'JSX.Element', desc: '遮罩层内容' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px' },
};

export const OverlayMobile: Component<OverlayMobileProps> = (props) => {
  const [show1, setShow1] = createSignal(false);
  const [show2, setShow2] = createSignal(false);

  return (
    <MobilePreview title="Overlay 遮罩层" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础遮罩 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础遮罩</div>
        <div style={CARD.desc}>半透明遮罩层，点击关闭</div>
        <div style={CARD.body}>
          <Button size="sm" text="显示遮罩" onClick={() => setShow1(true)} />
          <Overlay open={show1()} onClose={() => setShow1(false)} />
        </div>
      </div>

      {/* 带内容 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>遮罩 + 内容</div>
        <div style={CARD.desc}>children 在遮罩上展示内容（如 Loading）</div>
        <div style={CARD.body}>
          <Button size="sm" text="加载遮罩" onClick={() => setShow2(true)} />
          <Overlay open={show2()} onClose={() => setShow2(false)}>
            <div style={{ display: 'flex' as const, 'align-items': 'center' as const, 'justify-content': 'center', height: '100%' }}>
              <div style={{ background: '#fff', padding: '24px 32px', 'border-radius': '12px', 'text-align': 'center' }}>
                <Loading text="加载中..." />
              </div>
            </div>
          </Overlay>
        </div>
      </div>

      {/* 用途说明 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>典型用途</div>
        <div style={CARD.desc}>
          Overlay 是 Dialog、ActionSheet、Popup 等组件的基础组件。
          通常不直接使用，而是作为底层遮罩为上层组件提供背景遮罩能力。
          直接使用时适用于自定义弹出内容的场景。
        </div>
      </div>
    </MobilePreview>
  );
};
