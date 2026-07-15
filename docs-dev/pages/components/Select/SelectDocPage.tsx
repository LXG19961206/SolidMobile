import { createSignal, useContext, type Component, type JSX } from 'solid-js';
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
    { text: 'Option A', value: 'a' },
    { text: 'Option B', value: 'b' },
    { text: 'Option C', value: 'c' },
  ]}

/>`;

const codeCustomText = `<Select
  options={[
    { text: 'Option A', value: 'a' },
    { text: 'Option B', value: 'b' },
    { text: 'Option C', value: 'c' },
  ]}
  title="Select an option"
  cancelText="Cancel"
  confirmText="OK"
  placeholder="Tap to select"
/>`;

const codeControlled = `const [show, setShow] = createSignal(false);
const [val, setVal] = createSignal('');

<>
  <Button text="Open Selector" onClick={() => setShow(true)} />
  <span>Selected: {val() || '-'}</span>
  <Select
    options={[
      { text: 'Option A', value: 'a' },
      { text: 'Option B', value: 'b' },
      { text: 'Option C', value: 'c' },
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
    { text: 'Beijing', value: 'beijing' },
    { text: 'Shanghai', value: 'shanghai' },
    { text: 'Guangzhou', value: 'guangzhou' },
    { text: 'Shenzhen', value: 'shenzhen' },
    { text: 'Hangzhou', value: 'hangzhou' },
    { text: 'Chengdu', value: 'chengdu' },
    { text: 'Wuhan', value: 'wuhan' },
    { text: 'Nanjing', value: 'nanjing' },
    { text: "Xi'an", value: 'xian' },
    { text: 'Chongqing', value: 'chongqing' },
  ]}
  placeholder="Select city"
/>`;

const codeForm = `<Form onSubmit={(v) => { ... }} controlAlign="right">
  <FormItem name="city" label="City" labelWidth="4em">
    <Select
      options={[
        { text: 'Beijing', value: 'beijing' },
        { text: 'Shanghai', value: 'shanghai' },
        { text: 'Guangzhou', value: 'guangzhou' },
      ]}

    />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="Submit" />
</Form>`;

/* ── Basic Demo ── */

const BasicDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal('');
  return (
    <Select
      options={[
        { text: 'Option A', value: 'a' },
        { text: 'Option B', value: 'b' },
        { text: 'Option C', value: 'c' },
      ]}
      value={val()}
      onChange={setVal}
      placeholder="Tap to select"
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
      <Form onSubmit={(v) => { setFormVal(v); Toast.success('Submit: ' + JSON.stringify(v)); }} controlAlign="right">
        <FormItem name="city" label="City" labelWidth="4em" contentFlex>
          <Select
            options={[
              { text: 'Beijing', value: 'beijing' },
              { text: 'Shanghai', value: 'shanghai' },
              { text: 'Guangzhou', value: 'guangzhou' },
            ]}
            teleport={phone?.()}
          />
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

/* ── Custom Text Demo ── */

const CustomTextDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  return (
    <Select
      options={[
        { text: 'Option A', value: 'a' },
        { text: 'Option B', value: 'b' },
        { text: 'Option C', value: 'c' },
      ]}
      title="Select an option"
      cancelText="Cancel"
      confirmText="OK"
      placeholder="Tap to select"
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
      <Button text="Open Selector" onClick={() => setShow(true)} />
      <span style={{ 'font-size': '0.85rem', color: '#6b7280' }}>
        Selected: {val() || '-'}
      </span>
      <Select
        options={[
          { text: 'Option A', value: 'a' },
          { text: 'Option B', value: 'b' },
          { text: 'Option C', value: 'c' },
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
    { text: 'Beijing', value: 'beijing' },
    { text: 'Shanghai', value: 'shanghai' },
    { text: 'Guangzhou', value: 'guangzhou' },
    { text: 'Shenzhen', value: 'shenzhen' },
    { text: 'Hangzhou', value: 'hangzhou' },
    { text: 'Chengdu', value: 'chengdu' },
    { text: 'Wuhan', value: 'wuhan' },
    { text: 'Nanjing', value: 'nanjing' },
    { text: "Xi'an", value: 'xian' },
    { text: 'Chongqing', value: 'chongqing' },
  ];
  return (
    <Select
      options={cityOptions}
      placeholder="Select city"
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
  placeholder="Select status color"
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
      placeholder="Select status color"
      teleport={phone?.()}
    />
  );
};

export const SelectDocPage: Component = () => {
  const t = useT();
  return (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Select</h1>
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
