import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CenterMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Center } from '../../../src/components/Center';

const propsData = [
  { name: 'flexX', type: 'boolean', desc: 'Flexbox 水平居中' },
  { name: 'flexY', type: 'boolean', desc: 'Flexbox 垂直居中' },
  { name: 'text', type: 'boolean', desc: 'text-align: center' },
  { name: 'vertical', type: 'boolean', desc: 'vertical-align: middle' },
  { name: 'position', type: 'boolean', desc: 'absolute + transform 居中' },
  { name: 'inline', type: 'boolean', desc: '行内模式（inline-flex）' },
  { name: 'as', type: 'string', desc: '渲染的 HTML 标签，默认 div' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const demoBox: Record<string, string> = {
  background: '#f3f4f6',
  'border-radius': '8px',
  border: '1px dashed #d1d5db',
  display: 'flex' as const,
  gap: '8px',
};

export const CenterMobile: Component<CenterMobileProps> = (props) => {
  return (
    <MobilePreview title="Center 居中" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* flexX */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>flexX 水平居中</div>
        <div style={CARD.desc}>justify-content: center，内容水平居中</div>
        <div style={CARD.body}>
          <div style={{ ...demoBox, width: '100%', height: '60px' }}>
            <Center flexX>
              <span style={{ background: '#1677ff', color: '#fff', padding: '8px 16px', 'border-radius': '6px' }}>居中内容</span>
            </Center>
          </div>
        </div>
      </div>

      {/* flexY */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>flexY 垂直居中</div>
        <div style={CARD.desc}>align-items: center，需父级有明确高度</div>
        <div style={CARD.body}>
          <div style={{ ...demoBox, width: '100%', height: '80px' }}>
            <Center flexY style={{ width: '100%', height: '100%' }}>
              <span style={{ background: '#22c55e', color: '#fff', padding: '8px 16px', 'border-radius': '6px' }}>垂直居中</span>
            </Center>
          </div>
        </div>
      </div>

      {/* flexX + flexY */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>flexX + flexY 完全居中</div>
        <div style={CARD.desc}>同时水平+垂直居中，最常用组合</div>
        <div style={CARD.body}>
          <div style={{ ...demoBox, width: '100%', height: '120px' }}>
            <Center flexX flexY style={{ width: '100%', height: '100%' }}>
              <div style={{ 'text-align': 'center' }}>
                <div style={{ 'font-size': '1.5rem', 'font-weight': 700, color: '#1677ff' }}>Hello</div>
                <div style={{ 'font-size': '0.8rem', color: '#6b7280' }}>完全居中示例</div>
              </div>
            </Center>
          </div>
        </div>
      </div>

      {/* text 居中 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>text 文字居中</div>
        <div style={CARD.desc}>text-align: center，适合文字/行内内容</div>
        <div style={CARD.body}>
          <div style={{ ...demoBox, width: '100%', padding: '16px' }}>
            <Center text style={{ width: '100%' }}>
              <div>
                <p style={{ margin: 0, color: '#374151' }}>这段文字</p>
                <p style={{ margin: '4px 0 0', color: '#6b7280', 'font-size': '0.85rem' }}>在容器中居中显示</p>
              </div>
            </Center>
          </div>
        </div>
      </div>

      {/* position 居中 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>position 绝对居中</div>
        <div style={CARD.desc}>absolute + transform，适合覆盖/弹窗场景</div>
        <div style={CARD.body}>
          <div style={{ ...demoBox, width: '100%', height: '100px', position: 'relative' as const }}>
            <Center position>
              <span style={{ background: '#f59e0b', color: '#fff', padding: '8px 16px', 'border-radius': '6px', 'white-space': 'nowrap' }}>绝对居中</span>
            </Center>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
