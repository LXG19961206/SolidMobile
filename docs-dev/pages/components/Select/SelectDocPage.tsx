import { createSignal, useContext, type Component } from 'solid-js';
import { Select } from '../../../../src/components/Select';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import { useT } from '../../../doc-i18n';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Icon } from '../../../../src/components/Icon';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../doc-utils';

const selectProps: PropRow[] = [
  { name: 'options', type: '{ text, value, render? }[]', default: '—', required: true, desc: 'componentProps.select.options' },
  { name: 'value', type: 'string | number', default: '—', required: false, desc: 'componentProps.select.value' },
  { name: 'onChange', type: '(value) => void', default: '—', required: false, desc: 'componentProps.select.onChange' },
  { name: 'onConfirm', type: '(value) => void', default: '—', required: false, desc: 'componentProps.select.onConfirm' },
  { name: 'placeholder', type: 'string', default: '—', required: false, desc: 'componentProps.select.placeholder' },
  { name: 'title', type: 'string', default: '—', required: false, desc: 'componentProps.select.title' },
  { name: 'cancelText', type: 'string', default: '—', required: false, desc: 'componentProps.select.cancelText' },
  { name: 'confirmText', type: 'string', default: '—', required: false, desc: 'componentProps.select.confirmText' },
  { name: 'visibleItemCount', type: 'number', default: '7', required: false, desc: 'componentProps.select.visibleItemCount' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'componentProps.select.teleport' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: 'componentProps.select.show' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', default: '—', required: false, desc: 'componentProps.select.onUpdateShow' },
];

const codeBasic = `<Select
  options={[
    { text: '选项 A', value: 'a' },
    { text: '选项 B', value: 'b' },
    { text: '选项 C', value: 'c' },
  ]}

/>`;

const codeCustomText = `<Select
  options={[
    { text: '选项 A', value: 'a' },
    { text: '选项 B', value: 'b' },
    { text: '选项 C', value: 'c' },
  ]}
  title="请选择一项"
  cancelText="算了"
  confirmText="就这个"
  placeholder="点击选择"
/>`;

const codeControlled = `const [show, setShow] = createSignal(false);
const [val, setVal] = createSignal('');

<>
  <Button text="打开选择器" onClick={() => setShow(true)} />
  <span>已选: {val() || '-'}</span>
  <Select
    options={[
      { text: '选项 A', value: 'a' },
      { text: '选项 B', value: 'b' },
      { text: '选项 C', value: 'c' },
    ]}
    show={show()}
    onUpdateShow={setShow}
    value={val()}
    onConfirm={(v) => { setVal(v as string); setShow(false); }}
    onCancel={() => setShow(false)}
  />
</>`;

const codeManyOptions = `<Select
  options={[
    { text: '北京', value: 'beijing' },
    { text: '上海', value: 'shanghai' },
    { text: '广州', value: 'guangzhou' },
    { text: '深圳', value: 'shenzhen' },
    { text: '杭州', value: 'hangzhou' },
    { text: '成都', value: 'chengdu' },
    { text: '武汉', value: 'wuhan' },
    { text: '南京', value: 'nanjing' },
    { text: '西安', value: 'xian' },
    { text: '重庆', value: 'chongqing' },
  ]}
  placeholder="选择城市"
/>`;

const codeForm = `<Form onSubmit={(v) => { ... }} controlAlign="right">
  <FormItem name="city" label="城市" labelWidth="4em">
    <Select
      options={[
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' },
      ]}

    />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="提交" />
</Form>`;

/* ── Basic Demo ── */

const BasicDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal('');
  return (
    <Select
      options={[
        { text: '选项 A', value: 'a' },
        { text: '选项 B', value: 'b' },
        { text: '选项 C', value: 'c' },
      ]}
      value={val()}
      onChange={setVal}
      placeholder="点击选择"
      teleport={phone?.()}
    />
  );
};

/* ── Form Demo ── */

const FormDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [formVal, setFormVal] = createSignal({});
  return (
    <>
      <Form onSubmit={(v) => { setFormVal(v); Toast.success('提交: ' + JSON.stringify(v)); }} controlAlign="right">
        <FormItem name="city" label="城市" labelWidth="4em" contentFlex>
          <Select
            options={[
              { text: '北京', value: 'beijing' },
              { text: '上海', value: 'shanghai' },
              { text: '广州', value: 'guangzhou' },
            ]}
            teleport={phone?.()}
          />
        </FormItem>
        <div style={{ padding: '12px 1rem' }}>
          <Button type="primary" block nativeType="submit" text="提交" />
        </div>
      </Form>
      <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
        提交值: {JSON.stringify(formVal())}
      </div>
    </>
  );
};

/* ── Custom Text Demo ── */

const CustomTextDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  return (
    <Select
      options={[
        { text: '选项 A', value: 'a' },
        { text: '选项 B', value: 'b' },
        { text: '选项 C', value: 'c' },
      ]}
      title="请选择一项"
      cancelText="算了"
      confirmText="就这个"
      placeholder="点击选择"
      teleport={phone?.()}
    />
  );
};

/* ── Controlled Show Demo ── */

const ControlledShowDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal('');
  return (
    <div style={{ display: 'flex', 'align-items': 'center', gap: '12px' }}>
      <Button text="打开选择器" onClick={() => setShow(true)} />
      <span style={{ 'font-size': '0.85rem', color: '#6b7280' }}>
        已选: {val() || '-'}
      </span>
      <Select
        options={[
          { text: '选项 A', value: 'a' },
          { text: '选项 B', value: 'b' },
          { text: '选项 C', value: 'c' },
        ]}
        show={show()}
        onUpdateShow={setShow}
        value={val()}
        onConfirm={(v) => { setVal(v as string); setShow(false); }}
        onCancel={() => setShow(false)}
        teleport={phone?.()}
      />
    </div>
  );
};

/* ── Many Options Demo ── */

const ManyOptionsDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const cityOptions = [
    { text: '北京', value: 'beijing' },
    { text: '上海', value: 'shanghai' },
    { text: '广州', value: 'guangzhou' },
    { text: '深圳', value: 'shenzhen' },
    { text: '杭州', value: 'hangzhou' },
    { text: '成都', value: 'chengdu' },
    { text: '武汉', value: 'wuhan' },
    { text: '南京', value: 'nanjing' },
    { text: '西安', value: 'xian' },
    { text: '重庆', value: 'chongqing' },
  ];
  return (
    <Select
      options={cityOptions}
      placeholder="选择城市"
      teleport={phone?.()}
    />
  );
};

const codeCustomRender = `<Select
  options={[
    { text: 'Primary', value: 'primary',
      render: <span style={{ display:'flex','align-items':'center', gap:'8px' }}>
        <span style={{ width:10,height:10,'border-radius':'50%',background:'#1677ff' }} />
        Primary Blue
      </span>
    },
    { text: 'Success', value: 'success',
      render: <span style={{ display:'flex','align-items':'center', gap:'8px' }}>
        <span style={{ width:10,height:10,'border-radius':'50%',background:'#52c41a' }} />
        Success Green
      </span>
    },
    { text: 'Danger', value: 'danger',
      render: <span style={{ display:'flex','align-items':'center', gap:'8px' }}>
        <span style={{ width:10,height:10,'border-radius':'50%',background:'#ff4d4f' }} />
        Danger Red
      </span>
    },
    { text: 'Warning', value: 'warning',
      render: <span style={{ display:'flex','align-items':'center', gap:'8px' }}>
        <span style={{ width:10,height:10,'border-radius':'50%',background:'#faad14' }} />
        Warning Orange
      </span>
    },
  ]}
  placeholder="选择状态颜色"
/>`;

/* ── Custom Render Demo ── */

const CustomRenderDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const statusOpts = [
    {
      text: 'Primary', value: 'primary',
      render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px', color: 'inherit' }}><span style={{ width: '10px', height: '10px', 'border-radius': '50%', background: '#1677ff', 'flex-shrink': 0 }} />Primary Blue</span> as JSX.Element,
    },
    {
      text: 'Success', value: 'success',
      render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px', color: 'inherit' }}><span style={{ width: '10px', height: '10px', 'border-radius': '50%', background: '#52c41a', 'flex-shrink': 0 }} />Success Green</span> as JSX.Element,
    },
    {
      text: 'Danger', value: 'danger',
      render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px', color: 'inherit' }}><span style={{ width: '10px', height: '10px', 'border-radius': '50%', background: '#ff4d4f', 'flex-shrink': 0 }} />Danger Red</span> as JSX.Element,
    },
    {
      text: 'Warning', value: 'warning',
      render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px', color: 'inherit' }}><span style={{ width: '10px', height: '10px', 'border-radius': '50%', background: '#faad14', 'flex-shrink': 0 }} />Warning Orange</span> as JSX.Element,
    },
  ];
  return (
    <Select
      options={statusOpts}
      placeholder="选择状态颜色"
      teleport={phone?.()}
    />
  );
};

export const SelectDocPage: Component = () => {
  const t = useT();
  return (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Select 选择器</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        {t('componentIntro.SelectIntro')}
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Select Props</h2>
      <PropsTable rows={selectProps} />

      <DemoBlock title={t('demo.basic')} desc={t('demoDesc.select_basic')} code={codeBasic}>
        <BasicDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.selectCustomText')} desc={t('demoDesc.select_custom_text')} code={codeCustomText}>
        <CustomTextDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.selectControlled')} desc={t('demoDesc.select_controlled')} code={codeControlled}>
        <ControlledShowDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.selectManyOptions')} desc={t('demoDesc.select_many_options')} code={codeManyOptions}>
        <ManyOptionsDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.selectCustomRender')} desc={t('demoDesc.select_custom_render')} code={codeCustomRender}>
        <CustomRenderDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.form')} desc={t('demoDesc.select_form')} code={codeForm}>
        <FormDemo />
      </DemoBlock>
    </div>
  </DocLayout>
);
};
