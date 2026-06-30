import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface RadioMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Radio, RadioGroup } from '../../../src/components/Radio';

const propsData = [
  { name: 'Radio.value', type: 'unknown', desc: '标识符（必填）' },
  { name: 'Radio.checked', type: 'boolean', desc: '独立使用时是否选中' },
  { name: 'Radio.label', type: 'string | JSX.Element', desc: '标签文字' },
  { name: 'Radio.disabled', type: 'boolean', desc: '禁用' },
  { name: 'Radio.shape', type: "'round' | 'square' | 'dot'", desc: '形状，默认 round' },
  { name: 'Radio.checkedColor', type: 'string', desc: '选中态颜色' },
  { name: 'Radio.labelPosition', type: "'left' | 'right'", desc: '标签位置，默认 right' },
  { name: 'Radio.iconSize', type: 'string | number', desc: '图标大小，默认 20px' },
  { name: 'RadioGroup.value', type: 'unknown', desc: '当前选中值' },
  { name: 'RadioGroup.defaultValue', type: 'unknown', desc: '默认值（非受控）' },
  { name: 'RadioGroup.onChange', type: '(value) => void', desc: '值变化回调' },
  { name: 'RadioGroup.direction', type: "'vertical' | 'horizontal'", desc: '排列方向，默认 vertical' },
  { name: 'RadioGroup.gap', type: 'string | number', desc: '选项间距' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const RadioMobile: Component<RadioMobileProps> = (props) => {
  const [val1, setVal1] = createSignal('a');
  const [val2, setVal2] = createSignal('apple');

  return (
    <MobilePreview title="Radio 单选框" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础单选</div>
        <div style={CARD.desc}>RadioGroup + Radio 组合使用</div>
        <div style={CARD.body}>
          <RadioGroup value={val1()} onChange={setVal1}>
            <Radio value="a" label="选项 A" />
            <Radio value="b" label="选项 B" />
            <Radio value="c" label="选项 C" />
          </RadioGroup>
          <div style={{ 'font-size': '0.75rem', color: '#9ca3af', 'margin-top': '8px' }}>当前选中: {val1()}</div>
        </div>
      </div>

      {/* 水平排列 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>水平排列</div>
        <div style={CARD.desc}>direction="horizontal" 横向排列</div>
        <div style={CARD.body}>
          <RadioGroup value={val2()} onChange={setVal2} direction="horizontal" gap={16}>
            <Radio value="apple" label="苹果" />
            <Radio value="banana" label="香蕉" />
            <Radio value="orange" label="橙子" />
          </RadioGroup>
        </div>
      </div>

      {/* 形状 & 颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>形状 & 颜色</div>
        <div style={CARD.desc}>round（圆形）/ square（方形）/ dot（点状）</div>
        <div style={CARD.body}>
          <div style={{ 'margin-bottom': '12px' }}>
            <div style={{ 'font-size': '0.75rem', color: '#9ca3af', 'margin-bottom': '4px' }}>shape="round" (默认)</div>
            <RadioGroup defaultValue="1" direction="horizontal" gap={12}>
              <Radio value="1" label="圆形" />
              <Radio value="2" label="单选" />
            </RadioGroup>
          </div>
          <div style={{ 'margin-bottom': '12px' }}>
            <div style={{ 'font-size': '0.75rem', color: '#9ca3af', 'margin-bottom': '4px' }}>shape="square"</div>
            <RadioGroup defaultValue="1" direction="horizontal" gap={12} shape="square" checkedColor="#22c55e">
              <Radio value="1" label="方形" />
              <Radio value="2" label="单选" />
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用状态</div>
        <div style={CARD.desc}>单独禁用或整体禁用</div>
        <div style={CARD.body}>
          <RadioGroup defaultValue="1" disabled>
            <Radio value="1" label="整体禁用" />
            <Radio value="2" label="不可选" />
          </RadioGroup>
          <div style={{ height: '12px' }} />
          <RadioGroup defaultValue="1">
            <Radio value="1" label="正常" />
            <Radio value="2" label="禁用项" disabled />
            <Radio value="3" label="正常" />
          </RadioGroup>
        </div>
      </div>
    </MobilePreview>
  );
};
