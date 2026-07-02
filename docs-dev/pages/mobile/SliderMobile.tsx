import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface SliderMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Slider } from '../../../src/components/Slider';

const propsData = [
  { name: 'value', type: 'number | number[]', desc: '当前值' },
  { name: 'onChange', type: '(value: number | number[]) => void', desc: '值变化回调' },
  { name: 'min', type: 'number', desc: '最小值，默认 0' },
  { name: 'max', type: 'number', desc: '最大值，默认 100' },
  { name: 'step', type: 'number', desc: '步长，默认 1' },
  { name: 'count', type: 'number', desc: '滑块数量，默认 1' },
  { name: 'barHeight', type: 'number | string', desc: '进度条高度' },
  { name: 'buttonSize', type: 'number | string', desc: '滑块按钮大小' },
  { name: 'activeColor', type: 'string', desc: '激活态颜色' },
  { name: 'inactiveColor', type: 'string', desc: '非激活态颜色' },
  { name: 'reverse', type: 'boolean', desc: '反转方向' },
  { name: 'disabled', type: 'boolean', desc: '禁用' },
  { name: 'readonly', type: 'boolean', desc: '只读' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-direction': 'column' as const, gap: '16px' },
};

export const SliderMobile: Component<SliderMobileProps> = (props) => {
  const [val1, setVal1] = createSignal(50);
  const [val2, setVal2] = createSignal(30);
  const [rangeVal, setRangeVal] = createSignal([20, 60]);

  return (
    <MobilePreview title="Slider 滑块" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础滑块</div>
        <div style={CARD.desc}>拖动调整数值，当前值实时显示</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
            <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'min-width': '24px' }}>0</span>
            <div style={{ flex: 1 }}>
              <Slider value={val1()} onChange={setVal1} />
            </div>
            <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'min-width': '24px' }}>100</span>
          </div>
          <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'text-align': 'center' }}>当前值: {val1()}</span>
        </div>
      </div>

      {/* 双滑块 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>双滑块 range</div>
        <div style={CARD.desc}>count=2 为范围选择器</div>
        <div style={CARD.body}>
          <div style={{ padding: '0 12px' }}>
            <Slider value={rangeVal()} onChange={(v) => setRangeVal(v as number[])} count={2} />
          </div>
          <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'text-align': 'center' }}>
            范围: {rangeVal()[0]} - {rangeVal()[1]}
          </span>
        </div>
      </div>

      {/* 步长 & 颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>步长 & 自定义颜色</div>
        <div style={CARD.desc}>step 限制精度 / activeColor 自定义颜色</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
            <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>步长5</span>
            <div style={{ flex: 1 }}>
              <Slider value={val2()} onChange={setVal2} step={5} />
            </div>
            <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-text, #374151)', 'min-width': '28px' }}>{val2()}</span>
          </div>
          <div style={{ padding: '0 12px' }}>
            <Slider value={70} activeColor="#22c55e" />
          </div>
          <div style={{ padding: '0 12px' }}>
            <Slider value={40} activeColor="#ef4444" barHeight={6} />
          </div>
        </div>
      </div>

      {/* 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用 & 只读</div>
        <div style={CARD.body}>
          <div style={{ padding: '0 12px' }}>
            <Slider value={60} disabled />
          </div>
          <div style={{ padding: '0 12px' }}>
            <Slider value={30} readonly />
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
