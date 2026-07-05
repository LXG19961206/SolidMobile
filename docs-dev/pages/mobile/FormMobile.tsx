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
  { name: 'Form.ref', type: '(api) => void', desc: 'componentProps.form.Form.ref' },
  { name: 'FormItem.name', type: 'string', desc: 'componentProps.form.FormItem.name' },
  { name: 'FormItem.label', type: 'string', desc: 'componentProps.form.FormItem.label' },
  { name: 'FormItem.required', type: 'boolean', desc: 'componentProps.form.FormItem.required' },
  { name: 'FormItem.rules', type: 'FormRule[]', desc: 'componentProps.form.FormItem.rules' },
  { name: 'FormItem.help', type: 'string', desc: 'componentProps.form.FormItem.help' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const cityOpts = [{ text: '北京', value: 'beijing' }, { text: '上海', value: 'shanghai' }, { text: '广州', value: 'guangzhou' }];

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
  let fullFormRef: any;

  const cityOptsI18n = [
    { text: t('demo.beijing'), value: 'beijing' },
    { text: t('demo.shanghai'), value: 'shanghai' },
    { text: t('demo.guangzhou'), value: 'guangzhou' },
  ];

  return (
    <MobilePreview title={t('nav.form')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* 基础用法 & 校验 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.formBasic')}</div>
        <div style={CARD.desc}>{t('demo.formBasicMobileDesc')}</div>
        <div style={CARD.body}>
          <Form
            validateOnBlur
            onSubmit={(v) => { setBasicVal(v); Toast.success(t('demo.submitLabel') + ': ' + JSON.stringify(v)); }}
          >
            <FormItem name="username" label={t('demo.username')} required rules={[{
              validator: (v: any) => (v as string)?.length >= 2,
              message: t('demo.minChars2'),
            }]}>
              <Input placeholder={t('demo.usernamePlaceholder')} clearable />
            </FormItem>
            <FormItem name="phone" label={t('demo.phone')}>
              <Input type="tel" placeholder={t('demo.phonePlaceholder')} maxlength={11} />
            </FormItem>
            <div style={{ padding: '8px 0', display: 'flex' as const, gap: '8px' }}>
              <Button type="primary" block nativeType="submit" size="sm" text={t('demo.submitBtn')} />
              <Button variant="outline" block nativeType="reset" size="sm" text={t('demo.reset')} />
            </div>
          </Form>
          <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>
            {t('demo.submitValueLabel')}: {JSON.stringify(basicVal())}
          </div>
        </div>
      </div>

      {/* 配合 Switch */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.withOther')}</div>
        <div style={CARD.desc}>{t('demo.withOtherDesc')}</div>
        <div style={CARD.body}>
          <Form>
            <FormItem name="agree" label={t('demo.agreeTerms')}>
              <Switch />
            </FormItem>
            <FormItem name="note" label={t('demo.note')}>
              <Input placeholder={t('demo.optional')} clearable />
            </FormItem>
          </Form>
        </div>
      </div>

      {/* 标签居左，控件居右 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.labelLeft')}</div>
        <div style={CARD.desc}>{t('demo.labelLeftMobileDesc')}</div>
        <div style={CARD.body}>
          <Form labelAlign="left" labelWidth="5em" colon>
            <FormItem name="name" label={t('demo.name')}>
              <Input placeholder={t('demo.pleaseInput')} align="right" />
            </FormItem>
            <FormItem name="phone" label={t('demo.phone')}>
              <Input type="tel" placeholder={t('demo.pleaseInput')} align="right" />
            </FormItem>
            <FormItem name="gender" label={t('demo.gender')}>
              <RadioGroup direction="horizontal">
                <Radio value="male" label={t('demo.male')} />
                <Radio value="female" label={t('demo.female')} />
              </RadioGroup>
            </FormItem>
            <FormItem name="notify" label={t('demo.notification')}>
              <Switch />
            </FormItem>
          </Form>
        </div>
      </div>

      {/* 综合实例 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.fullExample')}</div>
        <div style={CARD.desc}>{t('demo.fullExampleDesc')}</div>
        <div style={CARD.body}>
          <Form
            ref={(r: any) => { fullFormRef = r; }}
            onSubmit={(v) => { setFullVal(v); Toast.success(t('demo.submitLabel') + ': ' + JSON.stringify(v)); }}
            labelWidth="5em"
            colon
            scrollToError
          >
            <FormItem name="username" label={t('demo.username')} required rules={[{
              validator: (v: any) => (v as string)?.length >= 2,
              message: t('demo.minChars2'),
            }]}>
              <Input placeholder={t('demo.usernamePlaceholder')} clearable />
            </FormItem>
            <FormItem name="intro" label={t('demo.intro')} contentFlex>
              <Textarea placeholder={t('demo.saySomething')} />
            </FormItem>
            <FormItem name="gender" label={t('demo.gender')} required rules={[{
              validator: (v: any) => !!v,
              message: t('demo.genderRequired'),
            }]}>
              <RadioGroup direction="horizontal">
                <Radio value="male" label={t('demo.male')} />
                <Radio value="female" label={t('demo.female')} />
              </RadioGroup>
            </FormItem>
            <FormItem name="hobbies" label={t('demo.hobbies')} contentFlex>
              <CheckboxGroup direction="horizontal">
                <Checkbox value="coding" label={t('demo.coding')} />
                <Checkbox value="reading" label={t('demo.reading')} />
                <Checkbox value="gaming" label={t('demo.gaming')} />
              </CheckboxGroup>
            </FormItem>
            <FormItem name="score" label={t('demo.score')}>
              <Rate />
            </FormItem>
            <FormItem name="count" label={t('demo.count')}>
              <Stepper />
            </FormItem>
            <FormItem name="agree" label={t('demo.agreeTerms')}>
              <Switch />
            </FormItem>
            <FormItem name="range" label={t('demo.formRange')} contentFlex>
              <div style={{ padding: '8px 4px', flex: '1', 'min-width': '0' }}>
                <Slider />
              </div>
            </FormItem>
            <FormItem name="city" label={t('demo.city')} contentFlex>
              <Select options={cityOptsI18n} placeholder={t('demo.cityPlaceholder')} />
            </FormItem>
            <FormItem name="birthday" label={t('demo.birthday')} contentFlex>
              <DatePicker placeholder={t('demo.birthdayPlaceholder')} />
            </FormItem>
            <FormItem name="photos" label={t('demo.photos')} contentFlex>
              <Upload api={mockUploadApi} maxCount={6} />
            </FormItem>
            <FormItem name="time" label={t('demo.timeLabel')} contentFlex>
              <TimePicker placeholder={t('demo.timePlaceholder')} />
            </FormItem>
            <div style={{ padding: '8px 0', display: 'flex' as const, gap: '8px' }}>
              <Button type="primary" block nativeType="submit" size="sm" text={t('demo.submitBtn')} />
              <Button size="sm" text={t('demo.reset')} onClick={() => fullFormRef?.resetFormValue?.()} />
            </div>
          </Form>
          <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>
            {t('demo.submitValueLabel')}: {JSON.stringify(fullVal())}
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
