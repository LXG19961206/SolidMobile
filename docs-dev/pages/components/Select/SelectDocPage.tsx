import { createSignal, useContext, type Component } from 'solid-js';
import { Select } from '../../../../src/components/Select';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import { useT } from '../../../doc-i18n';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../doc-utils';

const selectProps: PropRow[] = [
  { name: 'options', type: '{ text, value }[]', default: '—', required: true, desc: 'componentProps.select.options' },
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

const codeForm = `<Form onSubmit={(v) => { ... }}>
  <FormItem name="city" label="城市">
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
      <Form onSubmit={(v) => { setFormVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}>
        <FormItem name="city" label="城市" contentFlex>
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

      <DemoBlock title={t('demo.form')} desc={t('demoDesc.select_form')} code={codeForm}>
        <FormDemo />
      </DemoBlock>
    </div>
  </DocLayout>
);
};
