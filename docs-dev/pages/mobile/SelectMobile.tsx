import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface SelectMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Select } from '../../../src/components/Select';

const propsData = [
  { name: 'options', type: '{ text: string; value: string | number }[]', desc: '选项列表' },
  { name: 'value', type: 'string | number', desc: '当前选中值' },
  { name: 'onChange', type: '(value) => void', desc: '值变化回调' },
  { name: 'onConfirm', type: '(value) => void', desc: '确认回调' },
  { name: 'title', type: 'string', desc: '面板标题' },
  { name: 'placeholder', type: 'string', desc: '占位文字' },
  { name: 'cancelText', type: 'string', desc: '取消按钮文字' },
  { name: 'confirmText', type: 'string', desc: '确认按钮文字' },
  { name: 'show', type: 'boolean', desc: '是否显示面板（受控）' },
  { name: 'onUpdateShow', type: '(show) => void', desc: '面板开关回调' },
  { name: 'visibleItemCount', type: 'number', desc: '可见行数，默认 7' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-direction': 'column' as const, gap: '12px' },
};

const genderOpts = [
  { text: '男', value: 'male' },
  { text: '女', value: 'female' },
  { text: '其他', value: 'other' },
];

const sizeOpts = [
  { text: 'S 小号', value: 's' },
  { text: 'M 中号', value: 'm' },
  { text: 'L 大号', value: 'l' },
  { text: 'XL 加大', value: 'xl' },
];

export const SelectMobile: Component<SelectMobileProps> = (props) => {
  const [show1, setShow1] = createSignal(false);
  const [show2, setShow2] = createSignal(false);
  const [gender, setGender] = createSignal('');
  const [size, setSize] = createSignal('');

  return (
    <MobilePreview title="Select 选择器" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础选择</div>
        <div style={CARD.desc}>点击触发，Picker 滚轮选择</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: gender() ? '#1f2937' : '#9ca3af' }}
            onClick={() => setShow1(true)}
          >
            {genderOpts.find(o => o.value === gender())?.text || '请选择性别'}
          </div>
          <Select
            options={genderOpts}
            show={show1()}
            onUpdateShow={setShow1}
            title="选择性别"
            value={gender()}
            onConfirm={(v) => { setGender(v as string); setShow1(false); }}
            onCancel={() => setShow1(false)}
          />
        </div>
      </div>

      {/* 嵌入式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>嵌入式选择</div>
        <div style={CARD.desc}>不通过 Sheet，直接渲染 Select</div>
        <div style={CARD.body}>
          <Select
            options={sizeOpts}
            value={size()}
            onChange={(v) => setSize(v as string)}
            placeholder="请选择尺寸"
          />
          <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)' }}>选中: {size() || '无'}</span>
        </div>
      </div>
    </MobilePreview>
  );
};
