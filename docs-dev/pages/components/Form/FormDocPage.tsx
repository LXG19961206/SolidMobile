import { createSignal, useContext, type Component } from 'solid-js';

import zhCN from '../../../i18n/form/zh-CN';
import enUS from '../../../i18n/form/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { Form, FormItem } from '../../../../src/components/Form';
import { Input } from '../../../../src/components/Input';
import { Textarea } from '../../../../src/components/Textarea';
import { Button } from '../../../../src/components/Button';
import { Switch as Toggle } from '../../../../src/components/Switch';
import { Radio, RadioGroup } from '../../../../src/components/Radio';
import { Checkbox, CheckboxGroup } from '../../../../src/components/Checkbox';
import { Rate } from '../../../../src/components/Rate';
import { Stepper } from '../../../../src/components/Stepper';
import { Slider } from '../../../../src/components/Slider';
import { Picker } from '../../../../src/components/Picker';
import { DatePicker } from '../../../../src/components/DatePicker';
import { CityPicker } from '../../../../src/components/CityPicker';
import { Select } from '../../../../src/components/Select';
import { Upload } from '../../../../src/components/Upload';
import type { UploadFile } from '../../../../src/components/Upload';
import { TimePicker } from '../../../../src/components/TimePicker';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { Toast } from '../../../../src/components/Toast';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PickerOption } from '../../../../src/components/Picker';
import type { PropRow } from '../../../doc-utils';

const formProps: PropRow[] = [
  { name: 'value', type: 'T', default: '—', required: false, desc: 'componentProps.form.value' },
  { name: 'onChange', type: '(value: T) => void', default: '—', required: false, desc: 'componentProps.form.onChange' },
  { name: 'defaultValue', type: 'T', default: '{}', required: false, desc: 'componentProps.form.defaultValue' },
  { name: 'onSubmit', type: '(value: T) => void', default: '—', required: false, desc: 'componentProps.form.onSubmit' },
  { name: 'validateOnChange', type: 'boolean', default: 'false', required: false, desc: 'componentProps.form.validateOnChange' },
  { name: 'validateOnBlur', type: 'boolean', default: 'false', required: false, desc: 'componentProps.form.validateOnBlur' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.form.disabled' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: 'componentProps.form.readonly' },
  { name: 'labelAlign', type: "'top' | 'left' | 'right'", default: '—', required: false, desc: 'componentProps.form.labelAlign' },
  { name: 'labelWidth', type: 'string', default: '—', required: false, desc: 'componentProps.form.labelWidth' },
  { name: 'colon', type: 'boolean', default: 'false', required: false, desc: 'componentProps.form.colon' },
  { name: 'controlAlign', type: "'left' | 'right'", default: "'left'", required: false, desc: 'componentProps.form.controlAlign' },
  { name: 'ref', type: '(api: FormRef) => void', default: '—', required: false, desc: 'componentProps.form.ref' },
];

const itemProps: PropRow[] = [
  { name: 'name', type: 'string', default: '—', required: true, desc: 'componentProps.form.name' },
  { name: 'label', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.form.label' },
  { name: 'required', type: 'boolean', default: 'false', required: false, desc: 'componentProps.form.required' },
  { name: 'rules', type: 'FormRule[]', default: '—', required: false, desc: 'componentProps.form.rules' },
  { name: 'help', type: 'string', default: '—', required: false, desc: 'componentProps.form.help' },
  { name: 'labelAlign', type: "'top' | 'left' | 'right'", default: "Inherits from Form", required: false, desc: 'componentProps.formItem.labelAlign' },
  { name: 'labelWidth', type: 'string', default: "Inherits from Form", required: false, desc: "Label fixed width." },
  { name: 'controlAlign', type: "'left' | 'right'", default: "Inherits from Form", required: false, desc: 'componentProps.form.controlAlign' },
];

/* ── 示例省市区数据 ── */

const cityTree: PickerOption[] = [
  {
    text: 'Guangdong', value: 'gd',
    children: [
      {
        text: 'Guangzhou', value: 'gz', children: [
          { text: 'Tianhe', value: 'gz-th' },
          { text: 'Yuexiu', value: 'gz-yx' },
        ]
      },
      {
        text: 'Shenzhen', value: 'sz', children: [
          { text: 'Nanshan', value: 'sz-ns' },
          { text: 'Futian', value: 'sz-ft' },
        ]
      },
    ],
  },
  {
    text: 'Zhejiang', value: 'zj',
    children: [
      {
        text: 'Hangzhou', value: 'hz', children: [
          { text: 'Xihu', value: 'hz-xh' },
          { text: 'Shangcheng', value: 'hz-sc' },
        ]
      },
    ],
  },
];

/* ─── 综合实例 ─── */

const FullDemoCode = `<Form onSubmit={(v) => Toast.success(JSON.stringify(v))}
  labelWidth="5em" colon controlAlign={ctrlRight() ? 'right' : 'left'}>
  <div style="display:flex;align-items:center;min-height:40px;padding:8px 1rem">
    <span style="width:5em;flex-shrink:0;font-size:0.9rem;font-weight:500">Ctrl Right:</span>
    <div style="flex:1;min-width:0;display:flex;justify-content:flex-end">
      <Toggle checked={ctrlRight()} onChange={(v) => setCtrlRight(v)} />
    </div>
  </div>

  <FormItem name="username" label="Username" required rules={[{ validator: v => v?.length >= 2, message: 'At least 2 characters' }]}>
    <Input placeholder="Enter username" clearable align={ctrlRight() ? 'right' : 'left'} />
  </FormItem>
  <FormItem name="intro" label="Bio">
    <Textarea placeholder="Say something..." />
  </FormItem>
  <FormItem name="lang" label="Language" labelAlign="top" required rules={[{ validator: v => !!v, message: 'Please select language' }]}>
    <RadioGroup direction="horizontal">
      <Radio value="zh" label="Chinese" />
      <Radio value="en" label="English" />
      <Radio value="ja" label="Japanese" />
    </RadioGroup>
  </FormItem>
  <FormItem name="hobbies" label="Hobbies" labelAlign="top">
    <CheckboxGroup direction="horizontal">
      <Checkbox value="code" label="Code" />
      <Checkbox value="read" label="Read" />
    </CheckboxGroup>
  </FormItem>
  <FormItem name="score" label="Rating">
    <Rate />
  </FormItem>
  <FormItem name="count" label="Quantity">
    <Stepper />
  </FormItem>
  <FormItem name="range" label="Range">
    <div style={{ padding: '8px 4px', flex: '1', 'min-width': '0' }}>
      <Slider />
    </div>
  </FormItem>
  <FormItem name="agree" label="Agree">
    <Toggle />
  </FormItem>
  <FormItem name="city" label="City">
    <Select
      options={[
        { text: 'Beijing', value: 'beijing' },
        { text: 'Shanghai', value: 'shanghai' },
        { text: 'Guangzhou', value: 'guangzhou' },
      ]}
      teleport={phone?.()?.parentElement?.parentElement || undefined}
    />
  </FormItem>
  <FormItem name="birthday" label="Birthday">
    <DatePicker placeholder="Select birth date" teleport={phone?.()?.parentElement?.parentElement || undefined} />
  </FormItem>
  <FormItem name="region" label="Region">
    <CityPicker columns={cityTree} placeholder="Select region" teleport={phone?.()?.parentElement?.parentElement || undefined} />
  </FormItem>
  <FormItem name="photos" label="Photos">
    <Upload api={mockUploadApi} maxCount={6} />
  </FormItem>
  <FormItem name="time" label="Time">
    <TimePicker placeholder="Select time" teleport={phone?.()?.parentElement?.parentElement || undefined} />
  </FormItem>
  <div style={{ padding: '12px 1rem', display: 'flex', gap: '12px' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
    <Button text="Reset" onClick={() => formRef?.resetFormValue()} />
  </div>
</Form>`;

const FullFormDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [formVal, setFormVal] = createSignal({});
  const [ctrlRight, setCtrlRight] = createSignal(true);
  let formRef: any;

  /** Mock upload API — simulates progress then returns a blob URL */
  function mockUploadApi(file: File, onProgress?: (pct: number) => void): Promise<string> {
    return new Promise((resolve) => {
      let pct = 0;
      const timer = setInterval(() => {
        pct += Math.random() * 30;
        if (pct >= 100) { pct = 100; clearInterval(timer); resolve(URL.createObjectURL(file)); }
        onProgress?.(Math.min(pct, 100));
      }, 200);
    });
  }

  return (
    <>
      <Form
        ref={(r: any) => { formRef = r; }}
        onSubmit={(v) => { setFormVal(v); Toast.success('Submit: ' + JSON.stringify(v)); }}
        labelWidth="5em"
        colon
        controlAlign={ctrlRight() ? 'right' : 'left'}
        scrollToError
      >
        {/* ── Control align toggle ── */}
        <div style={{ display: 'flex', 'align-items': 'center', 'min-height': 'var(--sc-form-control-height)', padding: '8px 1rem', background: 'var(--sc-color-cell-bg, #fff)', 'border-bottom': '1px solid var(--sc-color-border, #ebedf0)' }}>
          <span style={{ width: '5em', 'flex-shrink': 0, 'font-size': '0.9rem', 'font-weight': 500, color: 'var(--sc-color-text, #323233)', 'margin-right': '12px' }}>Ctrl Right:</span>
          <div style={{ flex: 1, 'min-width': 0, display: 'flex', 'justify-content': 'flex-end' }}>
            <Toggle checked={ctrlRight()} onChange={(v) => setCtrlRight(v)} />
          </div>
        </div>

        {/* ── Input ── */}
        <FormItem name="username" label="Username" required rules={[{
          validator: (v: unknown) => (v as string)?.length >= 2,
          message: 'At least 2 characters',
        }]}>
          <Input placeholder="Enter username" clearable align={ctrlRight() ? 'right' : 'left'} />
        </FormItem>

        {/* ── Textarea ── */}
        <FormItem name="intro" label="Bio">
          <Textarea placeholder="Say something..." />
        </FormItem>

        {/* ── Radio ── */}
        <FormItem name="lang" label="Language" labelAlign="top" required rules={[{
          validator: (v: unknown) => !!v,
          message: 'Please select language',
        }]}>
          <RadioGroup direction="horizontal">
            <Radio value="zh" label="Chinese" />
            <Radio value="en" label="English" />
            <Radio value="ja" label="Japanese" />
            <Radio value="ko" label="한국어" />
          </RadioGroup>
        </FormItem>

        {/* ── Checkbox ── */}
        <FormItem name="hobbies" label="Hobbies" labelAlign="top">
          <CheckboxGroup direction="horizontal">
            <Checkbox value="code" label="Code" />
            <Checkbox value="read" label="Read" />
            <Checkbox value="game" label="Game" />
            <Checkbox value="music" label="Music" />
          </CheckboxGroup>
        </FormItem>

        {/* ── Switch ── */}
        <FormItem name="agree" label="Agree">
          <Toggle />
        </FormItem>

        {/* ── Rate ── */}
        <FormItem name="score" label="Rating">
          <Rate />
        </FormItem>

        {/* ── Stepper ── */}
        <FormItem name="count" label="Quantity">
          <Stepper />
        </FormItem>

        {/* ── Slider ── */}
        <FormItem name="range" label="Range">
          <div style={{ padding: '8px 4px', flex: '1', 'min-width': '0' }}>
            <Slider />
          </div>
        </FormItem>

        {/* ── Select ── */}
        <FormItem name="city" label="City">
          <Select
            options={[
              { text: 'Beijing', value: 'beijing' },
              { text: 'Shanghai', value: 'shanghai' },
              { text: 'Guangzhou', value: 'guangzhou' },
            ]}
            teleport={phone?.()?.parentElement?.parentElement || undefined}
          />
        </FormItem>

        {/* ── DatePicker ── */}
        <FormItem name="birthday" label="Birthday">
          <DatePicker placeholder="Select birth date" teleport={phone?.()?.parentElement?.parentElement || undefined} />
        </FormItem>

        {/* ── CityPicker ── */}
        <FormItem name="region" label="Region">
          <CityPicker columns={cityTree} placeholder="Select region" teleport={phone?.()?.parentElement?.parentElement || undefined} />
        </FormItem>

        {/* ── Upload ── */}
        <FormItem name="photos" label="Photos">
          <Upload api={mockUploadApi} maxCount={6} />
        </FormItem>

        {/* ── TimePicker ── */}
        <FormItem name="time" label="Time">
          <TimePicker placeholder="Select time" teleport={phone?.()?.parentElement?.parentElement || undefined} />
        </FormItem>

        {/* ── Submit ── */}
        <div style={{ padding: '12px 1rem', display: 'flex', gap: '12px' }}>
          <Button type="primary" block nativeType="submit" text="Submit" />
          <Button text="Reset" onClick={() => formRef?.resetFormValue?.()} />
        </div>
      </Form>
      <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
        Submit value: {JSON.stringify(formVal())}
      </div>
    </>
  );
};

/* ─── Basic Demo ─── */

const BasicDemo: Component = () => {
  const [val, setVal] = createSignal({});
  return (
    <>
      <Form onSubmit={(v) => { setVal(v); Toast.success('Submit: ' + JSON.stringify(v)); }} controlAlign="right">
        <FormItem name="username" label="Username" rules={[{
          validator: (v: any) => (v as string)?.length >= 2,
          message: 'At least 2 characters',
        }]}>
          <Input placeholder="Enter username" />
        </FormItem>
        <FormItem name="phone" label="Phone">
          <Input type="tel" placeholder="Enter phone number" maxlength={11} />
        </FormItem>
        <div style={{ padding: '12px 1rem' }}>
          <Button type="primary" block nativeType="submit" text="Submit" />
        </div>
      </Form>
      <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
        Submit value: {JSON.stringify(val())}
      </div>
    </>
  );
};

const CodeBasic = `<Form onSubmit={(v) => Toast.success(JSON.stringify(v))}>
  <FormItem name="username" label="Username" rules={[{
    validator: v => v?.length >= 2,
    message: 'At least 2 characters',
  }]}>
    <Input placeholder="Enter username" />
  </FormItem>
  <FormItem name="phone" label="Phone">
    <Input type="tel" placeholder="Enter phone number" maxlength={11} />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="Submit" />
</Form>`;

/* ── Main ── */

export const FormDocPage: Component = () => {
  const t = useT();
  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Form</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t('componentIntro.FormIntro')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Form Props</h2>
        <PropsTable rows={formProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>FormItem Props</h2>
        <PropsTable rows={itemProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.formLayout')}</h2>
        <div class="guide-card" style="line-height: 1.8; font-size: 0.9rem; border-left: 3px solid var(--sc-color-primary, #1677ff); background: linear-gradient(135deg, color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent), transparent); border-radius: 0 8px 8px 0;">
          <p style="margin: 0 0 0.75rem; color: var(--sc-color-text, #323233); font-weight: 500;">{t('demo.formLayoutDesc')}</p>
          <ul style="margin: 0; padding-left: 1.2rem; color: var(--sc-color-text-secondary, #6b7280);">
            <li>{t('demo.formLayoutItem1')}</li>
            <li>{t('demo.formLayoutItem2')}</li>
            <li>{t('demo.formLayoutItem3')}</li>
            <li>{t('demo.formLayoutItem4')}</li>
            <li>{t('demo.formLayoutItem5')}</li>
          </ul>
        </div>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.basic')}</h2>
        <DemoBlock title={t('demo.submit')} desc={t('demo.submitDesc')} code={CodeBasic}>
          <BasicDemo />
        </DemoBlock>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.fullExample')}</h2>
        <DemoBlock title={t('demo.allComponents')} desc={t('demo.allComponentsDesc')} code={FullDemoCode}>
          <FullFormDemo />
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
