import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CheckboxMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Checkbox, CheckboxGroup } from '../../../src/components/Checkbox';

const propsData = [
  { name: 'Checkbox.value', type: 'unknown', desc: '标识符（必填）' },
  { name: 'Checkbox.checked', type: 'boolean', desc: '独立使用时是否选中' },
  { name: 'Checkbox.label', type: 'string | JSX.Element', desc: '标签文字' },
  { name: 'Checkbox.indeterminate', type: 'boolean', desc: '半选状态' },
  { name: 'Checkbox.disabled', type: 'boolean', desc: '禁用' },
  { name: 'Checkbox.shape', type: "'round' | 'square'", desc: '形状，默认 square' },
  { name: 'Checkbox.checkedColor', type: 'string', desc: '选中态颜色' },
  { name: 'Checkbox.labelPosition', type: "'left' | 'right'", desc: '标签位置，默认 right' },
  { name: 'Checkbox.iconSize', type: 'string | number', desc: '图标大小，默认 20px' },
  { name: 'CheckboxGroup.value', type: 'unknown[]', desc: '当前选中值列表' },
  { name: 'CheckboxGroup.onChange', type: '(value: unknown[]) => void', desc: '值变化回调' },
  { name: 'CheckboxGroup.max', type: 'number', desc: '最大可选数' },
  { name: 'CheckboxGroup.direction', type: "'vertical' | 'horizontal'", desc: '排列方向' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const CheckboxMobile: Component<CheckboxMobileProps> = (props) => {
  const [val1, setVal1] = createSignal<unknown[]>([]);
  const [val2, setVal2] = createSignal<unknown[]>(['a', 'c']);
  const [indep, setIndep] = createSignal(false);

  return (
    <MobilePreview title="Checkbox 复选框" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础复选</div>
        <div style={CARD.desc}>CheckboxGroup + Checkbox 多选</div>
        <div style={CARD.body}>
          <CheckboxGroup value={val1()} onChange={setVal1}>
            <Checkbox value="a" label="选项 A" />
            <Checkbox value="b" label="选项 B" />
            <Checkbox value="c" label="选项 C" />
            <Checkbox value="d" label="选项 D" />
          </CheckboxGroup>
          <div style={{ 'font-size': '0.75rem', color: '#9ca3af', 'margin-top': '8px' }}>已选: {JSON.stringify(val1())}</div>
        </div>
      </div>

      {/* 限制 & 水平 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>最大选中 & 水平排列</div>
        <div style={CARD.desc}>max=2 限制最多选 2 项 / direction="horizontal"</div>
        <div style={CARD.body}>
          <CheckboxGroup defaultValue={['a']} max={2} direction="horizontal" gap={12}>
            <Checkbox value="a" label="A" />
            <Checkbox value="b" label="B" />
            <Checkbox value="c" label="C" />
            <Checkbox value="d" label="D" />
          </CheckboxGroup>
        </div>
      </div>

      {/* 形状 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>形状 & 颜色</div>
        <div style={CARD.desc}>square（方形）/ round（圆形）</div>
        <div style={CARD.body}>
          <div style={{ 'margin-bottom': '8px' }}>
            <CheckboxGroup value={val2()} onChange={setVal2} direction="horizontal" gap={12}>
              <Checkbox value="a" label="方形" />
              <Checkbox value="c" label="默认" />
            </CheckboxGroup>
          </div>
          <CheckboxGroup defaultValue={['x']} direction="horizontal" gap={12} shape="round" checkedColor="#22c55e">
            <Checkbox value="x" label="圆形" />
            <Checkbox value="y" label="绿色" />
          </CheckboxGroup>
        </div>
      </div>

      {/* 独立使用 & 半选 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>独立使用 & 半选</div>
        <div style={CARD.desc}>独立 Checkbox + indeterminate 半选态</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
            <Checkbox value="agree" checked={indep()} onChange={setIndep} label="我已阅读并同意" />
          </div>
          <div style={{ height: '8px' }} />
          <Checkbox value="all" indeterminate label="全选（半选状态）" onChange={() => {}} />
        </div>
      </div>
    </MobilePreview>
  );
};
