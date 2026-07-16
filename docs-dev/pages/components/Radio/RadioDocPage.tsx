import { createSignal, type Component } from 'solid-js';
import { Radio, RadioGroup } from '../../../../src/components/Radio';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Input } from '../../../../src/components/Input';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../doc-utils';
import { useT, registerLocale } from '../../../doc-i18n';
import zhCN from '../../../i18n/radio/zh-CN';
import enUS from '../../../i18n/radio/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const radioProps: PropRow[] = [
  { name: 'value', type: 'unknown', default: '—', required: true, desc: 'componentProps.radio.value' },
  { name: 'label', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.radio.label' },
  { name: 'checked', type: 'boolean', default: '—', required: false, desc: 'componentProps.radio.checked' },
  { name: 'onChange', type: '(checked: boolean) => void', default: '—', required: false, desc: 'componentProps.radio.onChange' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.radio.disabled' },
  { name: 'labelDisabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.radio.labelDisabled' },
  { name: 'labelPosition', type: "'left' | 'right'", default: "'right'", required: false, desc: 'componentProps.radio.labelPosition' },
  { name: 'iconSize', type: 'number | string', default: "'20px'", required: false, desc: 'componentProps.radio.iconSize' },
  { name: 'checkedColor', type: 'string', default: "'#1989fa'", required: false, desc: 'componentProps.radio.checkedColor' },
  { name: 'shape', type: "'round' | 'square' | 'dot'", default: "'round'", required: false, desc: 'componentProps.radio.shape' },
  { name: 'checkedIcon', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.radio.checkedIcon' },
  { name: 'uncheckedIcon', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.radio.uncheckedIcon' },
];

const groupProps: PropRow[] = [
  { name: 'value', type: 'unknown', default: '—', required: false, desc: 'componentProps.radioGroup.value' },
  { name: 'defaultValue', type: 'unknown', default: '—', required: false, desc: 'componentProps.radioGroup.defaultValue' },
  { name: 'onChange', type: '(value) => void', default: '—', required: false, desc: 'componentProps.radioGroup.onChange' },
  { name: 'direction', type: "'vertical' | 'horizontal'", default: "'vertical'", required: false, desc: 'componentProps.radioGroup.direction' },
  { name: 'gap', type: 'string | number', default: "'12px'(horizontal) / '0'(vertical)", required: false, desc: 'componentProps.radioGroup.gap' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.radioGroup.disabled' },
  { name: 'iconSize', type: 'number | string', default: "'20px'", required: false, desc: 'componentProps.radioGroup.iconSize' },
  { name: 'checkedColor', type: 'string', default: "'#1989fa'", required: false, desc: 'componentProps.radioGroup.checkedColor' },
  { name: 'shape', type: "'round' | 'square' | 'dot'", default: "'round'", required: false, desc: 'componentProps.radioGroup.shape' },
];

const radioCssVars: PropRow[] = [
  { name: '--sc-radio-text-color', type: 'color', default: '--sc-color-text', required: false, desc: 'cssVars.Radio.__sc_radio_text_color' },
  { name: '--sc-radio-disabled-text-color', type: 'color', default: '--sc-color-text-tertiary', required: false, desc: 'cssVars.Radio.__sc_radio_disabled_text_color' },
  { name: '--sc-radio-icon-size', type: 'length', default: '20px', required: false, desc: 'cssVars.Radio.__sc_radio_icon_size' },
  { name: '--sc-radio-border-color', type: 'color', default: '#c8c9cc', required: false, desc: 'cssVars.Radio.__sc_radio_border_color' },
  { name: '--sc-radio-checked-border-color', type: 'color', default: '#1989fa', required: false, desc: 'cssVars.Radio.__sc_radio_checked_border_color' },
  { name: '--sc-radio-checked-bg', type: 'color', default: '#1989fa', required: false, desc: 'cssVars.Radio.__sc_radio_checked_bg' },
  { name: '--sc-radio-disabled-opacity', type: 'number', default: '0.5', required: false, desc: 'cssVars.Radio.__sc_radio_disabled_opacity' },
  { name: '--sc-radio-gap', type: 'length', default: '8px', required: false, desc: 'cssVars.Radio.__sc_radio_gap' },
  { name: '--sc-radio-font-size', type: 'length', default: '0.9375rem', required: false, desc: 'cssVars.Radio.__sc_radio_font_size' },
];

const codeBasic = `<RadioGroup value={basicVal()} onChange={setBasicVal}>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
  <Radio value="c" label="Option C" />
</RadioGroup>`;

const codeDisabled = `<RadioGroup value={disabledVal()} onChange={setDisabledVal}>
  <Radio value="a" label="Normal" />
  <Radio value="b" label="Disabled" disabled />
  <Radio value="c" label="Also Normal" />
</RadioGroup>`;

const codeShape = `<RadioGroup value={shapeVal()} onChange={setShapeVal}>
  <Radio value="a" label="Round (default)" />
  <Radio value="b" label="Square" shape="square" />
  <Radio value="c" label="Dot" shape="dot" />
</RadioGroup>`;

const codeColor = `<RadioGroup value={colorVal()} onChange={setColorVal} checkedColor="#22c55e">
  <Radio value="a" label="Green" />
  <Radio value="b" label="Green" />
  <Radio value="c" label="Green" />
</RadioGroup>`;

const codeHorizontal = `<RadioGroup direction="horizontal" value={hVal()} onChange={setHVal}>
  <Radio value="a" label="Light" />
  <Radio value="b" label="Dark" />
</RadioGroup>`;

const codeCustomIcon = `<RadioGroup value={iconVal()} onChange={setIconVal}>
  <Radio value="like" label="Good"
    checkedIcon={<LikeIcon />}
    uncheckedIcon={<LikeIcon />} />
  <Radio value="normal" label="Average"
    checkedIcon={<MehIcon />}
    uncheckedIcon={<MehIcon />} />
  <Radio value="bad" label="Poor"
    checkedIcon={<BadIcon />}
    uncheckedIcon={<BadIcon />} />
</RadioGroup>`;

/* ── Custom icons ── */

const LikeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <path d="M8 15c0 0 1.5 2.5 4 2.5s4-2.5 4-2.5" />
  </svg>
);

const MehIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <line x1="8" y1="15" x2="16" y2="15" />
  </svg>
);

const BadIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <path d="M8 16.5c0 0 1.5-2.5 4-2.5s4 2.5 4 2.5" />
  </svg>
);

const codeForm = `<Form onSubmit={(v) => Toast.success(JSON.stringify(v))}>
  <FormItem name="lang" label="Language" contentFlex rules={[{
    validator: (v) => !!v,
    message: 'Please select language',
  }]}>
    <RadioGroup direction="horizontal">
      <Radio value="zh" label="Chinese" />
      <Radio value="en" label="English" />
      <Radio value="ja" label="Japanese" />
    </RadioGroup>
  </FormItem>
  <FormItem name="level" label="Membership" contentFlex>
    <RadioGroup direction="horizontal">
      <Radio value="bronze" label="Bronze" />
      <Radio value="silver" label="Silver" />
      <Radio value="gold" label="Gold" />
    </RadioGroup>
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`;

/* ── Form Demo ── */

const FormDemo: Component = () => {
  const [formVal, setFormVal] = createSignal({});
  return (
    <>
      <Form onSubmit={(v) => { setFormVal(v); Toast.success('Submit: ' + JSON.stringify(v)); }}>
        <FormItem
          name="lang"
          label="Language"
          contentFlex
          rules={[{
            validator: (v: unknown) => !!v,
            message: 'Please select language',
          }]}
        >
          <RadioGroup direction="horizontal">
            <Radio value="zh" label="Chinese" />
            <Radio value="en" label="English" />
            <Radio value="ja" label="Japanese" />
          </RadioGroup>
        </FormItem>
        <FormItem name="level" label="Membership" contentFlex>
          <RadioGroup direction="horizontal">
            <Radio value="bronze" label="Bronze" />
            <Radio value="silver" label="Silver" />
            <Radio value="gold" label="Gold" />
          </RadioGroup>
        </FormItem>
        <div style={{ padding: '12px 1rem' }}>
          <Button type="primary" block nativeType="submit" text="Submit" />
        </div>
      </Form>
      <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
        Submit value: {JSON.stringify(formVal())}
      </div>
    </>
  );
};

export const RadioDocPage: Component = () => {
  const t = useT();
  const [basicVal, setBasicVal] = createSignal('a');
  const [disabledVal, setDisabledVal] = createSignal('a');
  const [shapeVal, setShapeVal] = createSignal('a');
  const [colorVal, setColorVal] = createSignal('a');
  const [hVal, setHVal] = createSignal('a');
  const [iconVal, setIconVal] = createSignal('like');
  const [standaloneChecked, setStandaloneChecked] = createSignal(false);

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Radio</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t('componentIntro.RadioIntro')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Radio Props</h2>
        <PropsTable rows={radioProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>RadioGroup Props</h2>
        <PropsTable rows={groupProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.cssVars')}</h2>
        <PropsTable rows={radioCssVars} />

        <DemoBlock title={t('demo.basic')} code={codeBasic}>
          <RadioGroup value={basicVal()} onChange={setBasicVal}>
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
            <Radio value="c" label="Option C" />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            Current: {basicVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.disabled')} desc={t('demo.disabledDesc')} code={codeDisabled}>
          <RadioGroup value={disabledVal()} onChange={setDisabledVal}>
            <Radio value="a" label="Normal" />
            <Radio value="b" label="Disabled" disabled />
            <Radio value="c" label="Also Normal" />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            Current: {disabledVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.shape')} desc={t('demo.shapeDesc')} code={codeShape}>
          <RadioGroup value={shapeVal()} onChange={setShapeVal}>
            <Radio value="a" label="Round (default)" />
            <Radio value="b" label="Square" shape="square" />
            <Radio value="c" label="Dot" shape="dot" />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            Current: {shapeVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.customColor')} desc={t('demo.customColorDesc')} code={codeColor}>
          <RadioGroup value={colorVal()} onChange={setColorVal} checkedColor="#22c55e">
            <Radio value="a" label="Green" />
            <Radio value="b" label="Green" />
            <Radio value="c" label="Green" />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            Current: {colorVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.horizontal')} desc={t('demo.horizontalDesc')} code={codeHorizontal}>
          <RadioGroup direction="horizontal" value={hVal()} onChange={setHVal}>
            <Radio value="a" label="Light" />
            <Radio value="b" label="Dark" />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            Current: {hVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.customIcon')} desc={t('demo.customIconDesc')} code={codeCustomIcon}>
          <RadioGroup value={iconVal()} onChange={setIconVal} iconSize="28px" checkedColor="var(--sc-color-primary, #1677ff)">
            <Radio
              value="like"
              label="Good"
              checkedIcon={<LikeIcon />}
              uncheckedIcon={<LikeIcon />}
            />
            <Radio
              value="normal"
              label="Average"
              checkedIcon={<MehIcon />}
              uncheckedIcon={<MehIcon />}
            />
            <Radio
              value="bad"
              label="Poor"
              checkedIcon={<BadIcon />}
              uncheckedIcon={<BadIcon />}
            />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            Current: {iconVal() === 'like' ? 'Good' : iconVal() === 'normal' ? 'Average' : 'Poor'}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.standalone')} desc={t('demoDesc.radio_standalone')} code={`const [checked, setChecked] = createSignal(false);
<Radio
  value="x"
  label="Tap to toggle"
  checked={checked()}
  onChange={setChecked}
/>`}>
          <Radio
            value="standalone"
            label="Tap me to toggle (standalone)"
            checked={standaloneChecked()}
            onChange={setStandaloneChecked}
          />
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            Selected: {String(standaloneChecked())}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
          <FormDemo />
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
