import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface RadioMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Radio, RadioGroup } from '../../../src/components/Radio';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { Toast, ToastRenderer } from '../../../src/components/Toast';
import { useT } from '../../doc-i18n';

const propsData = [
  { name: 'Radio.value', type: 'unknown', desc: 'componentProps.radio.Radio.value' },
  { name: 'Radio.label', type: 'string | JSX.Element', desc: 'componentProps.radio.Radio.label' },
  { name: 'Radio.checked', type: 'boolean', desc: 'componentProps.radio.Radio.checked' },
  { name: 'Radio.onChange', type: '(checked) => void', desc: 'componentProps.radio.Radio.onChange' },
  { name: 'Radio.disabled', type: 'boolean', desc: 'componentProps.radio.Radio.disabled' },
  { name: 'Radio.shape', type: "'round' | 'square' | 'dot'", desc: 'componentProps.radio.Radio.shape' },
  { name: 'Radio.checkedColor', type: 'string', desc: 'componentProps.radio.Radio.checkedColor' },
  { name: 'Radio.labelPosition', type: "'left' | 'right'", desc: 'componentProps.radio.Radio.labelPosition' },
  { name: 'Radio.iconSize', type: 'number | string', desc: 'componentProps.radio.Radio.iconSize' },
  { name: 'Radio.checkedIcon / uncheckedIcon', type: 'JSX.Element', desc: 'componentProps.radio.Radio.checkedIcon / uncheckedIcon' },
  { name: 'RadioGroup.value', type: 'unknown', desc: 'componentProps.radio.RadioGroup.value' },
  { name: 'RadioGroup.defaultValue', type: 'unknown', desc: 'componentProps.radio.RadioGroup.defaultValue' },
  { name: 'RadioGroup.onChange', type: '(value) => void', desc: 'componentProps.radio.RadioGroup.onChange' },
  { name: 'RadioGroup.direction', type: "'vertical' | 'horizontal'", desc: 'componentProps.radio.RadioGroup.direction' },
  { name: 'RadioGroup.disabled', type: 'boolean', desc: 'componentProps.radio.RadioGroup.disabled' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

/* ── Icons ── */
const LikeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" /><circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" /><path d="M8 15c0 0 1.5 2.5 4 2.5s4-2.5 4-2.5" />
  </svg>
);
const MehIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" /><circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" /><line x1="8" y1="15" x2="16" y2="15" />
  </svg>
);
const BadIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" /><circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" /><path d="M8 16.5c0 0 1.5-2.5 4-2.5s4 2.5 4 2.5" />
  </svg>
);

export const RadioMobile: Component<RadioMobileProps> = (props) => {
  const t = useT();
  const [basicVal, setBasicVal] = createSignal('a');
  const [disabledVal, setDisabledVal] = createSignal('a');
  const [shapeVal, setShapeVal] = createSignal('a');
  const [hVal, setHVal] = createSignal('a');
  const [iconVal, setIconVal] = createSignal('like');
  const [standaloneChecked, setStandaloneChecked] = createSignal(false);
  const [formVal, setFormVal] = createSignal({});

  return (
    <MobilePreview title="Radio" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.basic')}</div>
        <div style={CARD.desc}>{t('demo.basicDesc')}</div>
        <div style={CARD.body}>
          <RadioGroup value={basicVal()} onChange={setBasicVal}>
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
            <Radio value="c" label="Option C" />
          </RadioGroup>
          <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>Current value: {basicVal()}</div>
        </div>
      </div>

      {/* 禁用 & 形状 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.radioDisabledShape')}</div>
        <div style={CARD.desc}>{t('demo.radioDisabledShapeDesc')}</div>
        <div style={CARD.body}>
          <div style={{ 'margin-bottom': '12px' }}>
            <RadioGroup value={disabledVal()} onChange={setDisabledVal}>
              <Radio value="a" label="Normal" />
              <Radio value="b" label="Disabled" disabled />
              <Radio value="c" label="Normal" />
            </RadioGroup>
          </div>
          <RadioGroup value={shapeVal()} onChange={setShapeVal}>
            <Radio value="a" label="Round (default)" />
            <Radio value="b" label="Square" shape="square" />
            <Radio value="c" label="Dot" shape="dot" />
          </RadioGroup>
        </div>
      </div>

      {/* 水平排列 & 颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.radioHorizontalColor')}</div>
        <div style={CARD.desc}>{t('demo.radioHorizontalColorDesc')}</div>
        <div style={CARD.body}>
          <RadioGroup direction="horizontal" value={hVal()} onChange={setHVal}>
            <Radio value="a" label="Male" />
            <Radio value="b" label="Female" />
          </RadioGroup>
          <div style={{ height: '12px' }} />
          <RadioGroup value="x" checkedColor="#22c55e">
            <Radio value="x" label="Green Radio" />
            <Radio value="y" label="Green Radio" />
          </RadioGroup>
        </div>
      </div>

      {/* 自定义图标 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customIcon')}</div>
        <div style={CARD.desc}>{t('demo.customIconDesc')}</div>
        <div style={CARD.body}>
          <RadioGroup value={iconVal()} onChange={setIconVal} iconSize="28px" checkedColor="var(--sc-color-primary, #1677ff)">
            <Radio value="like" label="Good" checkedIcon={<LikeIcon />} uncheckedIcon={<LikeIcon />} />
            <Radio value="normal" label="Normal" checkedIcon={<MehIcon />} uncheckedIcon={<MehIcon />} />
            <Radio value="bad" label="Poor" checkedIcon={<BadIcon />} uncheckedIcon={<BadIcon />} />
          </RadioGroup>
          <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>
            {iconVal() === 'like' ? 'Good' : iconVal() === 'normal' ? 'Normal' : 'Poor'}
          </div>
        </div>
      </div>

      {/* 独立使用 & 表单 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.radioStandaloneForm')}</div>
        <div style={CARD.desc}>{t('demo.radioStandaloneFormDesc')}</div>
        <div style={CARD.body}>
          <Radio value="x" label="Standalone Mode" checked={standaloneChecked()} onChange={setStandaloneChecked} />
          <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin': '8px 0 12px' }}>Selected: {String(standaloneChecked())}</div>
          <Form onSubmit={(v) => { setFormVal(v); Toast.success(JSON.stringify(v)); }}>
            <FormItem name="gender" label="Gender" rules={[{ validator: (v: any) => !!v, message: 'Please select a gender' }]}>
              <RadioGroup direction="horizontal">
                <Radio value="male" label="Male" />
                <Radio value="female" label="Female" />
              </RadioGroup>
            </FormItem>
            <Button type="primary" size="sm" nativeType="submit" text="Submit" style={{ 'margin-top': '8px' }} />
          </Form>
          <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '4px' }}>Submit value: {JSON.stringify(formVal())}</div>
        </div>
      </div>
    </MobilePreview>
  );
};
