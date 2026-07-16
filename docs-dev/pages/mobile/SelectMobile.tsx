import { createSignal, type Component, type JSX } from 'solid-js';


import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface SelectMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Select } from '../../../src/components/Select';

const propsData = [
  { name: 'options', type: '{ text: string; value: string | number; render?: JSX.Element }[]', desc: 'componentProps.select.options' },
  { name: 'value', type: 'string | number', desc: 'componentProps.select.value' },
  { name: 'onChange', type: '(value) => void', desc: 'componentProps.select.onChange' },
  { name: 'onConfirm', type: '(value) => void', desc: 'componentProps.select.onConfirm' },
  { name: 'title', type: 'string', desc: 'componentProps.select.title' },
  { name: 'placeholder', type: 'string', desc: 'componentProps.select.placeholder' },
  { name: 'cancelText', type: 'string', desc: 'componentProps.select.cancelText' },
  { name: 'confirmText', type: 'string', desc: 'componentProps.select.confirmText' },
  { name: 'show', type: 'boolean', desc: 'componentProps.select.show' },
  { name: 'onUpdateShow', type: '(show) => void', desc: 'componentProps.select.onUpdateShow' },
  { name: 'visibleItemCount', type: 'number', desc: 'componentProps.select.visibleItemCount' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-direction': 'column' as const, gap: '12px' },
};

const genderOpts = [
  { text: 'Male', value: 'male' },
  { text: 'Female', value: 'female' },
  { text: 'Other', value: 'other' },
];

const sizeOpts = [
  { text: 'S - Small', value: 's' },
  { text: 'M - Medium', value: 'm' },
  { text: 'L - Large', value: 'l' },
  { text: 'XL - Extra Large', value: 'xl' },
];

export const SelectMobile: Component<SelectMobileProps> = (props) => {
  const t = useT();
  const [show1, setShow1] = createSignal(false);
  const [show2, setShow2] = createSignal(false);
  const [gender, setGender] = createSignal('');
  const [size, setSize] = createSignal('');
  const [color, setColor] = createSignal('');
  const [status, setStatus] = createSignal('');

  return (
    <MobilePreview title="Select 选择器" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.selectBasic')}</div>
        <div style={CARD.desc}>{t('demo.selectBasicDesc')}</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: gender() ? '#1f2937' : '#9ca3af' }}
            onClick={() => setShow1(true)}
          >
            {genderOpts.find(o => o.value === gender())?.text || 'Select gender'}
          </div>
          <Select
            options={genderOpts}
            show={show1()}
            onUpdateShow={setShow1}
            title="Select Gender"
            value={gender()}
            onConfirm={(v) => { setGender(v as string); setShow1(false); }}
            onCancel={() => setShow1(false)}
          />
        </div>
      </div>

      {/* 嵌入式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.embeddedSelect')}</div>
        <div style={CARD.desc}>{t('demo.embeddedSelectDesc')}</div>
        <div style={CARD.body}>
          <Select
            options={sizeOpts}
            value={size()}
            onChange={(v) => setSize(v as string)}
            placeholder="Select size"
          />
          <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)' }}>Selected: {size() || 'None'}</span>
        </div>
      </div>

      {/* 自定义文字 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.selectCustomText')}</div>
        <div style={CARD.desc}>{t('demoDesc.select_custom_text')}</div>
        <div style={CARD.body}>
          <Select
            options={[
              { text: 'Red', value: 'red' },
              { text: 'Blue', value: 'blue' },
              { text: 'Green', value: 'green' },
            ]}
            value={color()}
            onChange={(v) => setColor(v as string)}
            title="Pick a Color"
            cancelText="Nope"
            confirmText="Yes!"
            placeholder="Choose color"
          />
          <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)' }}>Selected: {color() || 'None'}</span>
        </div>
      </div>

      {/* 自定义渲染 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.selectCustomRender')}</div>
        <div style={CARD.desc}>{t('demoDesc.select_custom_render')}</div>
        <div style={CARD.body}>
          <Select
            options={[
              {
                text: 'To Do', value: 'todo',
                render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px', color: 'inherit' }}><span style={{ width: '10px', height: '10px', 'border-radius': '2px', background: '#8c8c8c', 'flex-shrink': 0 }} />⬜ To Do</span> as JSX.Element,
              },
              {
                text: 'In Progress', value: 'in_progress',
                render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px', color: 'inherit' }}><span style={{ width: '10px', height: '10px', 'border-radius': '2px', background: '#1677ff', 'flex-shrink': 0 }} />🔄 In Progress</span> as JSX.Element,
              },
              {
                text: 'Done', value: 'done',
                render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px', color: 'inherit' }}><span style={{ width: '10px', height: '10px', 'border-radius': '2px', background: '#52c41a', 'flex-shrink': 0 }} />✅ Done</span> as JSX.Element,
              },
              {
                text: 'Blocked', value: 'blocked',
                render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px', color: 'inherit' }}><span style={{ width: '10px', height: '10px', 'border-radius': '2px', background: '#ff4d4f', 'flex-shrink': 0 }} />🚫 Blocked</span> as JSX.Element,
              },
            ]}
            value={status()}
            onChange={(v) => setStatus(v as string)}
            title="Task Status"
            placeholder="Select task status"
          />
          <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)' }}>Selected: {status() || 'None'}</span>
        </div>
      </div>
    </MobilePreview>
  );
};
