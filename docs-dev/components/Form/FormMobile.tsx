import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Form, FormItem } from '../../../src/components/Form';
import { Input } from '../../../src/components/Input';
import { Textarea } from '../../../src/components/Textarea';
import { Switch } from '../../../src/components/Switch';
import { Radio, RadioGroup } from '../../../src/components/Radio';
import { Checkbox, CheckboxGroup } from '../../../src/components/Checkbox';
import { Rate } from '../../../src/components/Rate';
import { Stepper } from '../../../src/components/Stepper';
import { Slider } from '../../../src/components/Slider';
import { Select } from '../../../src/components/Select';
import { DatePicker } from '../../../src/components/DatePicker';
import { CityPicker } from '../../../src/components/CityPicker';
import { TimePicker } from '../../../src/components/TimePicker';
import { Upload } from '../../../src/components/Upload';
import type { UploadFile } from '../../../src/components/Upload';
import { Button } from '../../../src/components/Button';
import { Toast } from '../../../src/components/Toast';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useFormTableData } from './tableData';
import type { PickerOption } from '../../../src/components/Picker';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const cityTree: PickerOption[] = [
  { text: 'Guangdong', value: 'gd', children: [
    { text: 'Guangzhou', value: 'gz', children: [{ text: 'Tianhe', value: 'gz-th' }, { text: 'Yuexiu', value: 'gz-yx' }] },
    { text: 'Shenzhen', value: 'sz', children: [{ text: 'Nanshan', value: 'sz-ns' }, { text: 'Futian', value: 'sz-ft' }] },
  ]},
  { text: 'Zhejiang', value: 'zj', children: [
    { text: 'Hangzhou', value: 'hz', children: [{ text: 'Xihu', value: 'hz-xh' }] },
  ]},
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

export const FormMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useFormTableData();
  const [formVal, setFormVal] = createSignal({});
  const [controlledVal, setControlledVal] = createSignal({ username: '', phone: '' });
  const [ctrlRight, setCtrlRight] = createSignal(true);
  let formRef: any;
  let refFormRef: any;

  return (
    <MobilePreview title="Form">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '0 0 12px' }}>
        {/* ── Uncontrolled ── */}
        <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('form.demo.uncontrolled')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('form.demoDesc.uncontrolled')}</div>
            <Form defaultValue={{ username: 'hello', phone: '' }} onSubmit={(v) => console.log(v)}>
              <FormItem name="username" label="User"><Input placeholder="Enter username" /></FormItem>
              <FormItem name="phone" label="Phone"><Input type="tel" placeholder="Enter phone" /></FormItem>
              <div style={{ padding: '8px 1rem' }}><Button type="primary" block nativeType="submit" size="sm" text="Submit" /></div>
            </Form>
          </div>
        </div>

        {/* ── Controlled ── */}
        <div style={{ padding: '0 12px 12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('form.demo.controlled')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('form.demoDesc.controlled')}</div>
            <Form value={controlledVal()} onChange={setControlledVal} onSubmit={(v) => console.log(v)}>
              <FormItem name="username" label="User"><Input placeholder="Enter username" /></FormItem>
              <FormItem name="phone" label="Phone"><Input type="tel" placeholder="Enter phone" /></FormItem>
              <div style={{ padding: '8px 1rem' }}><Button type="primary" block nativeType="submit" size="sm" text="Submit" /></div>
            </Form>
            <div style={{ padding: '0 16px 12px', 'font-size': '0.75rem', color: '#9ca3af' }}>
              Live: {JSON.stringify(controlledVal())}
            </div>
          </div>
        </div>

        {/* ── Ref API ── */}
        <div style={{ padding: '0 12px 12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('form.demo.ref')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('form.demoDesc.ref')}</div>
            <Form ref={(r: any) => { refFormRef = r; }} onSubmit={(v) => { Toast.success('Submit: ' + JSON.stringify(v)); }}>
              <FormItem name="name" label="Name" required rules={[{ validator: (v: unknown) => (v as string)?.length >= 2, message: 'At least 2 characters' }]}>
                <Input placeholder="Enter name (min 2 chars)" />
              </FormItem>
              <div style={{ padding: '8px 1rem', display: 'flex', gap: '8px', 'flex-wrap': 'wrap' }}>
                <Button type="primary" nativeType="submit" size="sm" text="Submit" />
                <Button size="sm" text="Reset" onClick={() => refFormRef?.resetFormValue()} />
                <Button size="sm" text="Fill" onClick={() => refFormRef?.setFormValue({ name: 'Hello World' })} />
                <Button size="sm" text="Validate" onClick={async () => {
                  const ok = await refFormRef?.validateAll();
                  if (ok) Toast.success('All fields valid!');
                }} />
              </div>
            </Form>
          </div>
        </div>

        {/* ── Validation ── */}
        <div style={{ padding: '0 12px 12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('form.demo.validation')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('form.demoDesc.validation')}</div>
            <Form
              validateOnBlur
              onSubmit={(v) => console.log(v)}
            >
              <FormItem name="username" label="User" required rules={[{ validator: (v: unknown) => (v as string)?.length >= 2, message: 'At least 2 characters' }]}>
                <Input placeholder="At least 2 chars" />
              </FormItem>
              <FormItem name="email" label="Email" required rules={[{ validator: (v: unknown) => /^[^\s@]+@[^\s@]+$/.test(v as string), message: 'Invalid email format' }]}>
                <Input type="email" placeholder="name@example.com" />
              </FormItem>
              <FormItem name="age" label="Age" required rules={[{ validator: (v: unknown) => Number(v) >= 18, message: (v: unknown) => v ? 'Must be 18+' : 'Required' }]}>
                <Input type="number" placeholder="18+" />
              </FormItem>
              <FormItem name="nickname" label="Nickname" required rules={[{
                validator: async (v: unknown) => {
                  await new Promise(r => setTimeout(r, 800));
                  const taken = ['admin', 'root', 'system'];
                  return !!v && !taken.includes((v as string).toLowerCase());
                },
                message: (v: unknown) => v ? `"${v}" is already taken` : 'Required',
              }]}>
                <Input placeholder="Try admin / root / system" />
              </FormItem>
              <div style={{ padding: '8px 1rem' }}><Button type="primary" block nativeType="submit" size="sm" text="Submit" /></div>
            </Form>
          </div>
        </div>

        {/* ── Full Demo ── */}
        <Form
          ref={(r: any) => { formRef = r; }}
          onSubmit={(v) => { setFormVal(v); Toast.success('Submit: ' + JSON.stringify(v)); }}
          labelWidth="5em"
          colon
          controlAlign={ctrlRight() ? 'right' : 'left'}
          scrollToError
        >
          {/* Control align toggle */}
          <div style={{
            display: 'flex', 'align-items': 'center', 'min-height': '40px',
            padding: '8px 1rem', background: 'var(--sc-color-cell-bg, #fff)',
            'border-bottom': '1px solid var(--sc-color-border, #ebedf0)',
          }}>
            <span style={{ width: '5em', 'flex-shrink': 0, 'font-size': '0.9rem', 'font-weight': 500, color: 'var(--sc-color-text, #323233)', 'margin-right': '12px' }}>Ctrl Right:</span>
            <div style={{ flex: 1, 'min-width': 0, display: 'flex', 'justify-content': 'flex-end' }}>
              <Switch checked={ctrlRight()} onChange={(v) => setCtrlRight(v)} />
            </div>
          </div>

          <FormItem name="username" label="Username" required rules={[{ validator: (v: unknown) => (v as string)?.length >= 2, message: 'At least 2 characters' }]}>
            <Input placeholder="Enter username" clearable />
          </FormItem>
          <FormItem name="bio" label="Bio">
            <Textarea placeholder="Say something..." />
          </FormItem>
          <FormItem name="gender" label="Gender" labelAlign="top" required rules={[{ validator: (v: unknown) => !!v, message: 'Please select' }]}>
            <RadioGroup direction="horizontal">
              <Radio value="m" label="Male" />
              <Radio value="f" label="Female" />
            </RadioGroup>
          </FormItem>
          <FormItem name="hobbies" label="Hobbies" labelAlign="top">
            <CheckboxGroup direction="horizontal">
              <Checkbox value="code" label="Code" />
              <Checkbox value="music" label="Music" />
              <Checkbox value="read" label="Read" />
            </CheckboxGroup>
          </FormItem>
          <FormItem name="notify" label="Notify">
            <Switch />
          </FormItem>
          <FormItem name="rating" label="Rating">
            <Rate />
          </FormItem>
          <FormItem name="count" label="Count">
            <Stepper />
          </FormItem>
          <FormItem name="range" label="Range">
            <div style={{ padding: '8px 4px', flex: '1', 'min-width': '0' }}>
              <Slider />
            </div>
          </FormItem>
          <FormItem name="city" label="City">
            <Select
              options={[
                { text: 'Beijing', value: 'beijing' },
                { text: 'Shanghai', value: 'shanghai' },
                { text: 'Guangzhou', value: 'guangzhou' },
              ]}
            />
          </FormItem>
          <FormItem name="birthday" label="Birthday">
            <DatePicker placeholder="Select date" />
          </FormItem>
          <FormItem name="region" label="Region">
            <CityPicker columns={cityTree} placeholder="Select region" />
          </FormItem>
          <FormItem name="time" label="Time">
            <TimePicker placeholder="Select time" />
          </FormItem>
          <FormItem name="photos" label="Photos">
            <Upload api={mockUploadApi} maxCount={6} />
          </FormItem>

          <div style={{ padding: '12px 1rem', display: 'flex', gap: '12px' }}>
            <Button type="primary" block nativeType="submit" text="Submit" />
            <Button text="Reset" onClick={() => formRef?.resetFormValue()} />
          </div>
        </Form>
        <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
          Submit value: {JSON.stringify(formVal())}
        </div>
      </div>
    </MobilePreview>
  );
};
