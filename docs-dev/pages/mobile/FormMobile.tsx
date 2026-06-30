import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface FormMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Form, FormItem, useFormContext } from '../../../src/components/Form';
import { Input } from '../../../src/components/Input';
import { Button } from '../../../src/components/Button';
import { Cell } from '../../../src/components/Cell';
import { Radio, RadioGroup } from '../../../src/components/Radio';
import { Rate } from '../../../src/components/Rate';
import { Stepper } from '../../../src/components/Stepper';
import { Switch } from '../../../src/components/Switch';

const propsData = [
  { name: 'Form.value', type: 'FormValue', desc: '受控表单值' },
  { name: 'Form.onChange', type: '(value) => void', desc: '值变化回调' },
  { name: 'Form.defaultValue', type: 'FormValue', desc: '默认值（非受控）' },
  { name: 'Form.onSubmit', type: '(value) => void', desc: '提交回调' },
  { name: 'Form.validateOnChange', type: 'boolean', desc: '字段变化时校验' },
  { name: 'Form.validateOnBlur', type: 'boolean', desc: '字段失焦时校验' },
  { name: 'Form.labelAlign', type: "'top' | 'left' | 'right'", desc: '标签对齐' },
  { name: 'Form.labelWidth', type: 'string', desc: '标签宽度，如 6em' },
  { name: 'Form.ref', type: '(api) => void', desc: '暴露 setFormValue/resetFormValue/submit/validateAll' },
  { name: 'FormItem.name', type: 'string', desc: '字段名（必填）' },
  { name: 'FormItem.label', type: 'string', desc: '标签文本' },
  { name: 'FormItem.required', type: 'boolean', desc: '必填标记' },
  { name: 'FormItem.rules', type: 'FormRule[]', desc: '校验规则' },
  { name: 'FormItem.help', type: 'string', desc: '帮助文本' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

// Form value display component
const FormValues: Component = () => {
  const ctx = useFormContext<Record<string, unknown>>();
  return (
    <div style={{ 'font-size': '0.75rem', color: '#6b7280', 'margin-top': '12px', padding: '8px', background: '#f9fafb', 'border-radius': '6px' }}>
      <pre style={{ margin: 0 }}>{JSON.stringify(ctx?.formValue?.() || {}, null, 2)}</pre>
    </div>
  );
};

export const FormMobile: Component<FormMobileProps> = (props) => {
  const [formRef, setFormRef] = createSignal<any>(null);

  return (
    <MobilePreview title="Form 表单" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础表单 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础表单</div>
        <div style={CARD.desc}>Form + FormItem + 各种表单控件</div>
        <div style={CARD.body}>
          <Form ref={f => setFormRef(f)} onSubmit={(v) => { console.log(v); }}>
            <FormItem label="姓名" name="name">
              <Input placeholder="请输入姓名" />
            </FormItem>
            <FormItem label="手机号" name="phone">
              <Input placeholder="请输入手机号" />
            </FormItem>
            <FormItem label="性别" name="gender">
              <RadioGroup defaultValue="male" direction="horizontal">
                <Radio value="male" label="男" />
                <Radio value="female" label="女" />
              </RadioGroup>
            </FormItem>
            <FormItem label="评分" name="rate">
              <Rate />
            </FormItem>
            <FormItem label="数量" name="count">
              <Stepper />
            </FormItem>
            <FormValues />
          </Form>
        </div>
      </div>

      {/* 校验规则 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>校验规则</div>
        <div style={CARD.desc}>required + rules 校验，失焦/提交时触发</div>
        <div style={CARD.body}>
          <Form validateOnBlur>
            <FormItem
              label="用户名"
              name="username"
              required
              rules={[
                { validator: (v: any) => (v || '').length >= 3, message: '至少 3 个字符' },
              ]}
            >
              <Input placeholder="至少 3 个字符" />
            </FormItem>
            <FormItem
              label="邮箱"
              name="email"
              rules={[
                { validator: (v: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || ''), message: '请输入正确邮箱格式' },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </FormItem>
          </Form>
        </div>
      </div>

      {/* 操作按钮 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>表单操作</div>
        <div style={CARD.desc}>重置 / 提交表单数据</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, gap: '8px' }}>
            <Button variant="outline" block text="重置" onClick={() => formRef()?.resetFormValue()} />
            <Button type="primary" block text="提交" onClick={() => formRef()?.submit()} />
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
