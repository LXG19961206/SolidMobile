import { createSignal, useContext, type Component } from 'solid-js';
import { Form, FormItem } from '../../../../src/components/Form';
import { Input } from '../../../../src/components/Input';
import { Textarea } from '../../../../src/components/Textarea';
import { Button } from '../../../../src/components/Button';
import { Switch } from '../../../../src/components/Switch';
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
import { useT } from '../../../doc-i18n';
import { Toast } from '../../../../src/components/Toast';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PickerOption } from '../../../../src/components/Picker';
import type { PropRow } from '../../../../src/doc-utils';

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
  { name: 'ref', type: '(api: FormRef) => void', default: '—', required: false, desc: 'componentProps.form.ref' },
];

const itemProps: PropRow[] = [
  { name: 'name', type: 'string', default: '—', required: true, desc: 'componentProps.form.name' },
  { name: 'label', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.form.label' },
  { name: 'required', type: 'boolean', default: 'false', required: false, desc: 'componentProps.form.required' },
  { name: 'rules', type: 'FormRule[]', default: '—', required: false, desc: 'componentProps.form.rules' },
  { name: 'help', type: 'string', default: '—', required: false, desc: 'componentProps.form.help' },
  { name: 'labelAlign', type: "'top' | 'left' | 'right'", default: "继承 Form", required: false, desc: 'componentProps.formItem.labelAlign' },
  { name: 'labelWidth', type: 'string', default: "继承 Form", required: false, desc: "标签固定宽度。" },
  { name: 'contentFlex', type: 'boolean', default: 'false', required: false, desc: 'componentProps.form.contentFlex' },
];

/* ── 示例省市区数据 ── */

const cityTree: PickerOption[] = [
  {
    text: '广东省', value: 'gd',
    children: [
      { text: '广州市', value: 'gz', children: [
        { text: '天河区', value: 'gz-th' },
        { text: '越秀区', value: 'gz-yx' },
      ]},
      { text: '深圳市', value: 'sz', children: [
        { text: '南山区', value: 'sz-ns' },
        { text: '福田区', value: 'sz-ft' },
      ]},
    ],
  },
  {
    text: '浙江省', value: 'zj',
    children: [
      { text: '杭州市', value: 'hz', children: [
        { text: '西湖区', value: 'hz-xh' },
        { text: '上城区', value: 'hz-sc' },
      ]},
    ],
  },
];

/* ─── 综合实例 ─── */

const FullDemoCode = `<Form onSubmit={(v) => Toast.success(JSON.stringify(v))}>
  <FormItem name="username" label="用户名" required rules={[{ validator: v => v?.length >= 2, message: '至少 2 个字符' }]}>
    <Input placeholder="请输入用户名" clearable />
  </FormItem>
  <FormItem name="intro" label="简介" contentFlex>
    <Textarea placeholder="说点什么..." />
  </FormItem>
  <FormItem name="gender" label="性别" required rules={[{ validator: v => !!v, message: '请选择性别' }]}>
    <RadioGroup direction="horizontal">
      <Radio value="male" label="男" />
      <Radio value="female" label="女" />
    </RadioGroup>
  </FormItem>
  <FormItem name="hobbies" label="爱好" contentFlex>
    <CheckboxGroup direction="horizontal">
      <Checkbox value="coding" label="写代码" />
      <Checkbox value="reading" label="阅读" />
      <Checkbox value="gaming" label="游戏" />
    </CheckboxGroup>
  </FormItem>
  <FormItem name="score" label="评分">
    <Rate />
  </FormItem>
  <FormItem name="count" label="数量">
    <Stepper />
  </FormItem>
  <FormItem name="range" label="范围" contentFlex>
    <div style={{ padding: '8px 4px', flex: '1', 'min-width': '0' }}>
      <Slider />
    </div>
  </FormItem>
  <FormItem name="agree" label="同意协议">
    <Switch />
  </FormItem>
  <FormItem name="city" label="所在城市" contentFlex>
    <Select
      options={[
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' },
      ]}
      teleport={phone?.()?.parentElement?.parentElement || undefined}
    />
  </FormItem>
  <FormItem name="birthday" label="生日" contentFlex>
    <DatePicker placeholder="选择出生日期" teleport={phone?.()?.parentElement?.parentElement || undefined} />
  </FormItem>
  <FormItem name="region" label="地区" contentFlex>
    <CityPicker columns={cityTree} placeholder="选择省市区" teleport={phone?.()?.parentElement?.parentElement || undefined} />
  </FormItem>
  <FormItem name="photos" label="照片" contentFlex>
    <Upload api={mockUploadApi} maxCount={6} />
  </FormItem>
  <FormItem name="time" label="时间" contentFlex>
    <TimePicker placeholder="选择时间" teleport={phone?.()?.parentElement?.parentElement || undefined} />
  </FormItem>
  <div style={{ padding: '12px 1rem', display: 'flex', gap: '12px' }}>
    <Button type="primary" block nativeType="submit" text="提交" />
    <Button text="重置" onClick={() => formRef?.resetFormValue()} />
  </div>
</Form>`;

const FullFormDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [formVal, setFormVal] = createSignal({});
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
        onSubmit={(v) => { setFormVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}
        labelWidth="5em"
        colon
        scrollToError
      >
        {/* ── Input ── */}
        <FormItem name="username" label="用户名" required rules={[{
          validator: (v: unknown) => (v as string)?.length >= 2,
          message: '至少 2 个字符',
        }]}>
          <Input placeholder="请输入用户名" clearable />
        </FormItem>

        {/* ── Textarea ── */}
        <FormItem name="intro" label="简介" contentFlex>
          <Textarea placeholder="说点什么..." />
        </FormItem>

        {/* ── Radio ── */}
        <FormItem name="gender" label="性别" required rules={[{
          validator: (v: unknown) => !!v,
          message: '请选择性别',
        }]}>
          <RadioGroup direction="horizontal">
            <Radio value="male" label="男" />
            <Radio value="female" label="女" />
          </RadioGroup>
        </FormItem>

        {/* ── Checkbox ── */}
        <FormItem name="hobbies" label="爱好" contentFlex>
          <CheckboxGroup direction="horizontal">
            <Checkbox value="coding" label="写代码" />
            <Checkbox value="reading" label="阅读" />
            <Checkbox value="gaming" label="游戏" />
          </CheckboxGroup>
        </FormItem>

        {/* ── Switch ── */}
        <FormItem name="agree" label="同意协议">
          <Switch />
        </FormItem>

        {/* ── Rate ── */}
        <FormItem name="score" label="评分">
          <Rate />
        </FormItem>

        {/* ── Stepper ── */}
        <FormItem name="count" label="数量">
          <Stepper />
        </FormItem>

        {/* ── Slider ── */}
        <FormItem name="range" label="范围" contentFlex>
          <div style={{ padding: '8px 4px', flex: '1', 'min-width': '0' }}>
            <Slider />
          </div>
        </FormItem>

        {/* ── Select ── */}
        <FormItem name="city" label="所在城市" contentFlex>
          <Select
            options={[
              { text: '北京', value: 'beijing' },
              { text: '上海', value: 'shanghai' },
              { text: '广州', value: 'guangzhou' },
            ]}
            teleport={phone?.()?.parentElement?.parentElement || undefined}
          />
        </FormItem>

        {/* ── DatePicker ── */}
        <FormItem name="birthday" label="生日" contentFlex>
          <DatePicker placeholder="选择出生日期" teleport={phone?.()?.parentElement?.parentElement || undefined} />
        </FormItem>

        {/* ── CityPicker ── */}
        <FormItem name="region" label="地区" contentFlex>
          <CityPicker columns={cityTree} placeholder="选择省市区" teleport={phone?.()?.parentElement?.parentElement || undefined} />
        </FormItem>

        {/* ── Upload ── */}
        <FormItem name="photos" label="照片" contentFlex>
          <Upload api={mockUploadApi} maxCount={6} />
        </FormItem>

        {/* ── TimePicker ── */}
        <FormItem name="time" label="时间" contentFlex>
          <TimePicker placeholder="选择时间" teleport={phone?.()?.parentElement?.parentElement || undefined} />
        </FormItem>

        {/* ── Submit ── */}
        <div style={{ padding: '12px 1rem', display: 'flex', gap: '12px' }}>
          <Button type="primary" block nativeType="submit" text="提交" />
          <Button text="重置" onClick={() => formRef?.resetFormValue?.()} />
        </div>
      </Form>
      <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
        提交值: {JSON.stringify(formVal())}
      </div>
    </>
  );
};

/* ─── Basic Demo ─── */

const BasicDemo: Component = () => {
  const [val, setVal] = createSignal({});
  return (
    <>
      <Form onSubmit={(v) => { setVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}>
        <FormItem name="username" label="用户名" rules={[{
          validator: (v: any) => (v as string)?.length >= 2,
          message: '至少 2 个字符',
        }]}>
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem name="phone" label="手机号">
          <Input type="tel" placeholder="请输入手机号" maxlength={11} />
        </FormItem>
        <div style={{ padding: '12px 1rem' }}>
          <Button type="primary" block nativeType="submit" text="提交" />
        </div>
      </Form>
      <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
        提交值: {JSON.stringify(val())}
      </div>
    </>
  );
};

const CodeBasic = `<Form onSubmit={(v) => Toast.success(JSON.stringify(v))}>
  <FormItem name="username" label="用户名" rules={[{
    validator: v => v?.length >= 2,
    message: '至少 2 个字符',
  }]}>
    <Input placeholder="请输入用户名" />
  </FormItem>
  <FormItem name="phone" label="手机号">
    <Input type="tel" placeholder="请输入手机号" maxlength={11} />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="提交" />
</Form>`;

const WithOtherDemo: Component = () => (
  <Form>
    <FormItem name="agree" label="同意协议">
      <Switch />
    </FormItem>
    <FormItem name="note" label="备注">
      <Input placeholder="选填" clearable />
    </FormItem>
  </Form>
);

const CodeWithOther = `<Form>
  <FormItem name="agree" label="同意协议">
    <Switch />
  </FormItem>
  <FormItem name="note" label="备注">
    <Input placeholder="选填" clearable />
  </FormItem>
</Form>`;

/* ── Main ── */

export const FormDocPage: Component = () => {
  const t = useT();
  return (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Form 表单</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        {t('componentIntro.FormIntro')}
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Form Props</h2>
      <PropsTable rows={formProps} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>FormItem Props</h2>
      <PropsTable rows={itemProps} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.basic')}</h2>
      <DemoBlock title={t('demo.submit')} desc={t('demo.submitDesc')} code={CodeBasic}>
        <BasicDemo />
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.withOther')}</h2>
      <DemoBlock title={t('demo.switchInput')} desc={t('demo.switchInputDesc')} code={CodeWithOther}>
        <WithOtherDemo />
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.fullExample')}</h2>
      <DemoBlock title={t('demo.allComponents')} desc={t('demo.allComponentsDesc')} code={FullDemoCode}>
        <FullFormDemo />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
