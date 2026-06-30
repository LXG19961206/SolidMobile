import { createSignal, useContext, type Component } from 'solid-js';
import { Select } from '../../../../src/components/Select';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import { useT } from '../../../../src/i18n';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../../src/doc-utils';

const selectProps: PropRow[] = [
  { name: 'options', type: '{ text, value }[]', default: '—', required: true, desc: 'component.select.props.options' },
  { name: 'value', type: 'string | number', default: '—', required: false, desc: 'component.select.props.value' },
  { name: 'onChange', type: '(value) => void', default: '—', required: false, desc: 'component.select.props.onChange' },
  { name: 'onConfirm', type: '(value) => void', default: '—', required: false, desc: 'component.select.props.onConfirm' },
  { name: 'placeholder', type: 'string', default: '—', required: false, desc: 'component.select.props.placeholder' },
  { name: 'title', type: 'string', default: '—', required: false, desc: 'component.select.props.title' },
  { name: 'cancelText', type: 'string', default: '—', required: false, desc: 'component.select.props.cancelText' },
  { name: 'confirmText', type: 'string', default: '—', required: false, desc: 'component.select.props.confirmText' },
  { name: 'visibleItemCount', type: 'number', default: '7', required: false, desc: 'component.select.props.visibleItemCount' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'component.select.props.teleport' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: 'component.select.props.show' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', default: '—', required: false, desc: 'component.select.props.onUpdateShow' },
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
        选项选择器，基于 Picker 组件封装。点击触发区域弹出滚轮选择。
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Select Props</h2>
      <PropsTable rows={selectProps} />

      <DemoBlock title={t('demo.basic')} desc="不传 show 时，Select 自行管理面板开关，点击即可选择。" code={codeBasic}>
        <BasicDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.form')} desc="放在 FormItem 中自动集成表单的值管理。" code={codeForm}>
        <FormDemo />
      </DemoBlock>
    </div>
  </DocLayout>
);
};
