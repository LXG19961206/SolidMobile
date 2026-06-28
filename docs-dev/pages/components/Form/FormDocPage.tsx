import { createSignal, type Component } from 'solid-js';
import { Form, FormItem } from '../../../../src/components/Form';
import { Input } from '../../../../src/components/Input';
import { Button } from '../../../../src/components/Button';
import { Switch } from '../../../../src/components/Switch';
import { Picker } from '../../../../src/components/Picker';
import { Toast } from '../../../../src/components/Toast';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';

const formProps: PropRow[] = [
  { name: 'value', type: 'T', default: '—', required: false, desc: '受控值。' },
  { name: 'onChange', type: '(value: T) => void', default: '—', required: false, desc: '值变化回调。' },
  { name: 'defaultValue', type: 'T', default: '{}', required: false, desc: '非受控默认值。' },
  { name: 'onSubmit', type: '(value: T) => void', default: '—', required: false, desc: '提交回调。' },
  { name: 'validateOnChange', type: 'boolean', default: 'false', required: false, desc: '字段变化时校验。' },
  { name: 'validateOnBlur', type: 'boolean', default: 'false', required: false, desc: '字段失焦时校验。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '全局禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: '全局只读。' },
  { name: 'labelAlign', type: "'top' | 'left' | 'right'", default: '—', required: false, desc: '标签对齐。' },
  { name: 'labelWidth', type: 'string', default: '—', required: false, desc: '标签宽度，如 "6em"。' },
  { name: 'colon', type: 'boolean', default: 'false', required: false, desc: '标签后加冒号。' },
];

const itemProps: PropRow[] = [
  { name: 'name', type: 'string', default: '—', required: true, desc: '字段名，对应 formValue 的 key。' },
  { name: 'label', type: 'string | JSX.Element', default: '—', required: false, desc: '标签文本。' },
  { name: 'required', type: 'boolean', default: 'false', required: false, desc: '必填标记。' },
  { name: 'rules', type: 'FormRule[]', default: '—', required: false, desc: '校验规则。' },
  { name: 'help', type: 'string', default: '—', required: false, desc: '帮助文本（无错误时展示）。' },
  { name: 'labelAlign', type: "'top' | 'left' | 'right'", default: "继承 Form", required: false, desc: '标签对齐方式。top 时标签在上方。' },
  { name: 'labelWidth', type: 'string', default: "继承 Form", required: false, desc: "标签固定宽度，如 '6em'。内容区自动填充剩余。" },
  { name: 'contentFlex', type: 'boolean', default: 'false', required: false, desc: '内容区 flex: 1 撑满，适合 Textarea 等宽控件。' },
];

/* ── Demos ── */

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

export const FormDocPage: Component = () => (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Form 表单</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        表单容器，通过 Context 管理所有字段的值和校验。配合 FormItem 和各类控件（Input/Switch/Picker 等）使用。
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Form Props</h2>
      <PropsTable rows={formProps} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>FormItem Props</h2>
      <PropsTable rows={itemProps} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>基础用法</h2>
      <DemoBlock title="表单提交 & 校验" desc="带字段校验的表单。用户名少于 2 个字符时提示错误。" code={CodeBasic}>
        <BasicDemo />
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>配合其他控件</h2>
      <DemoBlock title="Switch + Input" desc="FormItem 可包裹任意有 value/onChange 的控件。" code={CodeWithOther}>
        <WithOtherDemo />
      </DemoBlock>
    </div>
  </DocLayout>
);
