import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CheckboxMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Checkbox, CheckboxGroup } from '../../../src/components/Checkbox';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { useT } from '../../doc-i18n';
import { Toast, ToastRenderer } from '../../../src/components/Toast';

const propsData = [
  { name: 'Checkbox.value', type: 'unknown', desc: '标识符，选中时对应 CheckboxGroup 的 value' },
  { name: 'Checkbox.label', type: 'string | JSX.Element', desc: '标签文字' },
  { name: 'Checkbox.checked', type: 'boolean', desc: '独立使用时是否选中（受控）' },
  { name: 'Checkbox.defaultChecked', type: 'boolean', desc: '默认选中（非受控）' },
  { name: 'Checkbox.indeterminate', type: 'boolean', desc: '半选状态' },
  { name: 'Checkbox.disabled', type: 'boolean', desc: '禁用' },
  { name: 'Checkbox.shape', type: "'square' | 'round'", desc: '形状，默认 square' },
  { name: 'Checkbox.checkedColor', type: 'string', desc: '选中态颜色' },
  { name: 'Checkbox.labelPosition', type: "'left' | 'right'", desc: '标签位置，默认 right' },
  { name: 'Checkbox.checkedIcon / uncheckedIcon', type: 'JSX.Element', desc: '自定义图标' },
  { name: 'CheckboxGroup.value', type: 'unknown[]', desc: '当前选中值列表（受控）' },
  { name: 'CheckboxGroup.onChange', type: '(values) => void', desc: '值变化回调' },
  { name: 'CheckboxGroup.max / min', type: 'number', desc: '最大/最小可选数' },
  { name: 'CheckboxGroup.direction', type: "'vertical' | 'horizontal'", desc: '排列方向' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

/* ── Icons ── */
const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" stroke="none">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const CheckboxMobile: Component<CheckboxMobileProps> = (props) => {
  const t = useT();
  const [basicVal, setBasicVal] = createSignal<unknown[]>([]);
  const [indetCheck, setIndetCheck] = createSignal(false);
  const [standaloneChecked, setStandaloneChecked] = createSignal(true);
  const [formVal, setFormVal] = createSignal({});

  /* ── 全选/半选 ── */
  const all = ['a', 'b', 'c'];
  const [checkedList, setCheckedList] = createSignal<unknown[]>(['a']);
  const allChecked = () => checkedList().length === all.length;
  const someChecked = () => checkedList().length > 0 && !allChecked();

  return (
    <MobilePreview title="Checkbox 复选框" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* 基础 & 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础用法 & 禁用</div>
        <div style={CARD.desc}>CheckboxGroup + Checkbox 多选 / disabled 禁用</div>
        <div style={CARD.body}>
          <CheckboxGroup value={basicVal()} onChange={setBasicVal}>
            <Checkbox value="a" label="选项 A" />
            <Checkbox value="b" label="选项 B" />
            <Checkbox value="c" label="选项 C" />
            <Checkbox value="d" label="禁用" disabled />
          </CheckboxGroup>
          <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>已选: {JSON.stringify(basicVal())}</div>
        </div>
      </div>

      {/* 形状 & 颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>形状 & 颜色 & 水平排列</div>
        <div style={CARD.desc}>square/round / checkedColor / direction="horizontal"</div>
        <div style={CARD.body}>
          <CheckboxGroup direction="horizontal" gap={16} defaultValue={['a']}>
            <Checkbox value="a" label="方形" />
            <Checkbox value="b" label="圆形" shape="round" />
          </CheckboxGroup>
          <div style={{ height: '12px' }} />
          <CheckboxGroup checkedColor="#22c55e" defaultValue={['green']} direction="horizontal" gap={16}>
            <Checkbox value="green" label="绿色" />
            <Checkbox value="blue" label="蓝色" />
          </CheckboxGroup>
        </div>
      </div>

      {/* 全选/半选 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>全选 / 半选</div>
        <div style={CARD.desc}>indeterminate 半选态，实现全选交互</div>
        <div style={CARD.body}>
          <Checkbox value="all" label="全选" indeterminate={someChecked()} checked={allChecked()} onChange={(c) => setCheckedList(c ? [...all] : [])} />
          <div style={{ height: '8px' }} />
          <CheckboxGroup value={checkedList()} onChange={setCheckedList}>
            <Checkbox value="a" label="选项 A" />
            <Checkbox value="b" label="选项 B" />
            <Checkbox value="c" label="选项 C" />
          </CheckboxGroup>
        </div>
      </div>

      {/* 最多可选 & 自定义图标 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>最大可选数 & 自定义图标</div>
        <div style={CARD.desc}>max={2} 限制 / checkedIcon 自定义 SVG</div>
        <div style={CARD.body}>
          <CheckboxGroup max={2} defaultValue={['a']}>
            <Checkbox value="a" label="选项 A" />
            <Checkbox value="b" label="选项 B" />
            <Checkbox value="c" label="选项 C" />
          </CheckboxGroup>
          <div style={{ height: '12px' }} />
          <CheckboxGroup checkedColor="#e74c3c" defaultValue={['star']}>
            <Checkbox value="star" label="标星" checkedIcon={<StarIcon />} uncheckedIcon={<StarIcon />} />
            <Checkbox value="heart" label="红心" checkedIcon={<HeartIcon />} uncheckedIcon={<HeartIcon />} />
          </CheckboxGroup>
        </div>
      </div>

      {/* 独立使用 & 表单 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>独立使用 & 表单</div>
        <div style={CARD.desc}>脱离 CheckboxGroup / FormItem 集成</div>
        <div style={CARD.body}>
          <Checkbox value="standalone" label="受控独立模式" checked={standaloneChecked()} onChange={setStandaloneChecked} />
          <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin': '8px 0 12px' }}>选中: {String(standaloneChecked())}</div>
          <Form onSubmit={(v) => { setFormVal(v); Toast.success(JSON.stringify(v)); }}>
            <FormItem name="hobbies" label="爱好">
              <CheckboxGroup direction="horizontal">
                <Checkbox value="coding" label="写代码" />
                <Checkbox value="reading" label="阅读" />
                <Checkbox value="gaming" label="游戏" />
              </CheckboxGroup>
            </FormItem>
            <Button type="primary" size="sm" nativeType="submit" text="提交" style={{ 'margin-top': '8px' }} />
          </Form>
          <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '4px' }}>提交值: {JSON.stringify(formVal())}</div>
        </div>
      </div>
    </MobilePreview>
  );
};
