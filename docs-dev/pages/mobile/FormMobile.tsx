import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface FormMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Form, FormItem } from '../../../src/components/Form';
import { Input } from '../../../src/components/Input';
import { Textarea } from '../../../src/components/Textarea';
import { Button } from '../../../src/components/Button';
import { Switch } from '../../../src/components/Switch';
import { Radio, RadioGroup } from '../../../src/components/Radio';
import { Checkbox, CheckboxGroup } from '../../../src/components/Checkbox';
import { Rate } from '../../../src/components/Rate';
import { Stepper } from '../../../src/components/Stepper';
import { Slider } from '../../../src/components/Slider';
import { Select } from '../../../src/components/Select';
import { DatePicker } from '../../../src/components/DatePicker';
import { Upload } from '../../../src/components/Upload';
import { TimePicker } from '../../../src/components/TimePicker';
import { Toast, ToastRenderer } from '../../../src/components/Toast';

const propsData = [
  { name: 'Form.value', type: 'FormValue', desc: 'componentProps.form.Form.value' },
  { name: 'Form.onChange', type: '(value) => void', desc: 'componentProps.form.Form.onChange' },
  { name: 'Form.defaultValue', type: 'FormValue', desc: 'componentProps.form.Form.defaultValue' },
  { name: 'Form.onSubmit', type: '(value) => void', desc: 'componentProps.form.Form.onSubmit' },
  { name: 'Form.validateOnChange', type: 'boolean', desc: 'componentProps.form.Form.validateOnChange' },
  { name: 'Form.validateOnBlur', type: 'boolean', desc: 'componentProps.form.Form.validateOnBlur' },
  { name: 'Form.disabled', type: 'boolean', desc: 'componentProps.form.Form.disabled' },
  { name: 'Form.labelAlign', type: "'top' | 'left' | 'right'", desc: 'componentProps.form.Form.labelAlign' },
  { name: 'Form.labelWidth', type: 'string', desc: 'componentProps.form.Form.labelWidth' },
  { name: 'Form.controlAlign', type: "'left' | 'right'", desc: 'componentProps.form.Form.controlAlign' },
  { name: 'Form.ref', type: '(api) => void', desc: 'componentProps.form.Form.ref' },
  { name: 'FormItem.name', type: 'string', desc: 'componentProps.form.FormItem.name' },
  { name: 'FormItem.label', type: 'string', desc: 'componentProps.form.FormItem.label' },
  { name: 'FormItem.required', type: 'boolean', desc: 'componentProps.form.FormItem.required' },
  { name: 'FormItem.rules', type: 'FormRule[]', desc: 'componentProps.form.FormItem.rules' },
  { name: 'FormItem.help', type: 'string', desc: 'componentProps.form.FormItem.help' },
  { name: 'FormItem.controlAlign', type: "'left' | 'right'", desc: 'componentProps.form.FormItem.controlAlign' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const cityOpts = [
  { text: 'Beijing', value: 'beijing' },
  { text: 'Shanghai', value: 'shanghai' },
  { text: 'Guangzhou', value: 'guangzhou' },
];

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

export const FormMobile: Component<FormMobileProps> = (props) => {
  const t = useT();
  const [basicVal, setBasicVal] = createSignal({});
  const [fullVal, setFullVal] = createSignal({});
  const [controlRight, setControlRight] = createSignal(true);
  let fullFormRef: any;

  return (
    <MobilePreview title={t('nav.form')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* Layout strategy */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.formLayout')}</div>
        <div style={{ ...CARD.body, 'line-height': 1.8, 'font-size': '0.85rem' }}>
          <p style={{ margin: '0 0 0.5rem', color: 'var(--sc-color-text, #323233)', 'font-weight': 500 }}>{t('demo.formLayoutDesc')}</p>
          <ul style={{ margin: 0, 'padding-left': '0.75rem', 'list-style': 'none', 'border-left': '3px solid var(--sc-color-primary, #1677ff)', color: 'var(--sc-color-text-secondary, #6b7280)' }}>
            <li style={{ 'margin-bottom': '0.5rem', 'padding-bottom': '0.5rem', 'border-bottom': '1px solid var(--sc-color-border, #ebedf0)' }}>{t('demo.formLayoutItem1')}</li>
            <li style={{ 'margin-bottom': '0.5rem', 'padding-bottom': '0.5rem', 'border-bottom': '1px solid var(--sc-color-border, #ebedf0)' }}>{t('demo.formLayoutItem2')}</li>
            <li style={{ 'margin-bottom': '0.5rem', 'padding-bottom': '0.5rem', 'border-bottom': '1px solid var(--sc-color-border, #ebedf0)' }}>{t('demo.formLayoutItem3')}</li>
            <li style={{ 'margin-bottom': '0.5rem', 'padding-bottom': '0.5rem', 'border-bottom': '1px solid var(--sc-color-border, #ebedf0)' }}>{t('demo.formLayoutItem4')}</li>
            <li>{t('demo.formLayoutItem5')}</li>
          </ul>
        </div>
      </div>

      {/* Basic form with validation */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.formBasic')}</div>
        <div style={CARD.desc}>{t('demo.formBasicMobileDesc')}</div>
        <div style={CARD.body}>
          <Form
            validateOnBlur
            onSubmit={(v) => { setBasicVal(v); Toast.success('Submitted: ' + JSON.stringify(v)); }}
          >
            <FormItem name="username" label="Username" required rules={[{
              validator: (v: any) => (v as string)?.length >= 2,
              message: 'At least 2 characters',
            }]}>
              <Input placeholder="Enter username" clearable />
            </FormItem>
            <FormItem name="phone" label="Phone">
              <Input type="tel" placeholder="Enter phone" maxlength={11} />
            </FormItem>
            <div style={{ padding: '8px 0', display: 'flex' as const, gap: '8px' }}>
              <Button type="primary" block nativeType="submit" size="sm" text="Submit" />
              <Button variant="outline" block nativeType="reset" size="sm" text="Reset" />
            </div>
          </Form>
          <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>
            Submit value: {JSON.stringify(basicVal())}
          </div>
        </div>
      </div>

      {/* With Switch */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.withOther')}</div>
        <div style={CARD.desc}>{t('demo.withOtherDesc')}</div>
        <div style={CARD.body}>
          <Form>
            <FormItem name="agree" label="Agree">
              <Switch />
            </FormItem>
            <FormItem name="note" label="Note">
              <Input placeholder="Optional" clearable />
            </FormItem>
          </Form>
        </div>
      </div>

      {/* labelAlign + labelWidth + controlAlign */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.labelLeft')}</div>
        <div style={CARD.desc}>{t('demo.labelLeftMobileDesc')}</div>
        <div style={CARD.body}>
          <Form labelAlign="left" labelWidth="6em" colon controlAlign="right">
            <FormItem name="name" label="Name">
              <Input placeholder="Enter name" align="right" />
            </FormItem>
            <FormItem name="phone" label="Phone">
              <Input type="tel" placeholder="Enter phone" align="right" />
            </FormItem>
            <FormItem name="lang" label="Language">
              <RadioGroup direction="horizontal">
                <Radio value="zh" label="中文" />
                <Radio value="en" label="English" />
                <Radio value="ja" label="日本語" />
                <Radio value="ko" label="한국어" />
              </RadioGroup>
            </FormItem>
            <FormItem name="notify" label="Notify">
              <Switch />
            </FormItem>
          </Form>
        </div>
      </div>

      {/* Full example */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.fullExample')}</div>
        <div style={CARD.desc}>{t('demo.fullExampleDesc')}</div>
        <div style={CARD.body}>
          <Form
            ref={(r: any) => { fullFormRef = r; }}
            onSubmit={(v) => { setFullVal(v); Toast.success('Submitted: ' + JSON.stringify(v)); }}
            labelWidth="6em"
            colon
            controlAlign={controlRight() ? 'right' : 'left'}
            scrollToError
          >
            <FormItem name="_ctrlRight" label="Ctrl Right">
              <Switch checked={controlRight()} onChange={(v) => setControlRight(v)} />
            </FormItem>
            <FormItem name="username" label="Username" required rules={[{
              validator: (v: any) => (v as string)?.length >= 2,
              message: 'At least 2 characters',
            }]}>
              <Input placeholder="Enter username" clearable align={controlRight() ? 'right' : 'left'} />
            </FormItem>
            <FormItem name="intro" label="Intro">
              <Textarea placeholder="Say something..." />
            </FormItem>
            <FormItem name="lang" label="Languages" labelAlign="top" required rules={[{
              validator: (v: any) => !!v,
              message: 'Please select language',
            }]}>
              <RadioGroup direction="horizontal">
                <Radio value="zh" label="中文" />
                <Radio value="en" label="English" />
                <Radio value="ja" label="日本語" />
                <Radio value="ko" label="한국어" />
              </RadioGroup>
            </FormItem>
            <FormItem name="hobbies" label="Hobbies" labelAlign="top">
              <CheckboxGroup direction="horizontal">
                <Checkbox value="code" label="Code" />
                <Checkbox value="read" label="Read" />
                <Checkbox value="game" label="Game" />
                <Checkbox value="music" label="Music" />
              </CheckboxGroup>
            </FormItem>
            <FormItem name="score" label="Score">
              <Rate />
            </FormItem>
            <FormItem name="count" label="Count">
              <Stepper />
            </FormItem>
            <FormItem name="agree" label="Agree">
              <Switch />
            </FormItem>
            <FormItem name="range" label="Range">
              <div style={{ padding: '8px 4px', flex: '1', 'min-width': '0' }}>
                <Slider />
              </div>
            </FormItem>
            <FormItem name="city" label="City">
              <Select options={cityOpts} placeholder="Select city" />
            </FormItem>
            <FormItem name="birthday" label="Birthday">
              <DatePicker placeholder="Select date" />
            </FormItem>
            <FormItem name="photos" label="Photos">
              <Upload api={mockUploadApi} maxCount={6} />
            </FormItem>
            <FormItem name="time" label="Time">
              <TimePicker placeholder="Select time" />
            </FormItem>
            <div style={{ padding: '8px 0', display: 'flex' as const, gap: '8px' }}>
              <Button type="primary" block nativeType="submit" size="sm" text="Submit" />
              <Button size="sm" text="Reset" onClick={() => fullFormRef?.resetFormValue?.()} />
            </div>
          </Form>
          <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>
            Submit value: {JSON.stringify(fullVal())}
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
