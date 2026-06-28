import { createSignal, type Component } from 'solid-js';
import { Stepper } from '../../../../src/components/Stepper';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout } from '../../../../src/doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../../src/doc-utils';

const stepperProps: PropRow[] = [
  { name: 'value', type: 'number', default: '—', required: false, desc: '当前值（受控）。' },
  { name: 'onChange', type: '(value) => void', default: '—', required: false, desc: '值变化回调。' },
  { name: 'defaultValue', type: 'number', default: '0', required: false, desc: '默认值（非受控）。' },
  { name: 'size', type: 'number | string', default: '—', required: false, desc: '快捷设置整体尺寸（覆盖 buttonSize/inputWidth 默认值）。' },
  { name: 'min', type: 'number', default: '0', required: false, desc: '最小值。' },
  { name: 'max', type: 'number', default: 'Infinity', required: false, desc: '最大值。' },
  { name: 'step', type: 'number', default: '1', required: false, desc: '步长。' },
  { name: 'decimalLength', type: 'number', default: '0', required: false, desc: '小数位数。' },
  { name: 'integer', type: 'boolean', default: 'false', required: false, desc: '整数模式。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '禁用。' },
  { name: 'inputDisabled', type: 'boolean', default: 'false', required: false, desc: '禁用输入框。' },
  { name: 'buttonSize', type: 'number | string', default: '28px', required: false, desc: '按钮大小。' },
  { name: 'inputWidth', type: 'number | string', default: '50px', required: false, desc: '输入框宽度。' },
  { name: 'minusIcon', type: 'any', default: "'−'", required: false, desc: '自定义减号图标。' },
  { name: 'plusIcon', type: 'any', default: "'+'", required: false, desc: '自定义加号图标。' },
  { name: 'allowEmpty', type: 'boolean', default: 'false', required: false, desc: '允许空值。' },
];

const codeBasic = `const [val, setVal] = createSignal(1);
<Stepper value={val()} onChange={setVal} />`;

const codeRange = `<Stepper defaultValue={5} min={0} max={10} />`;

const codeStep = `<Stepper defaultValue={0} step={2} />`;

const codeDecimal = `<Stepper defaultValue={0} step={0.1} decimalLength={1} />`;

const codeSize = `<Stepper defaultValue={5} size={30} />`;

const codeCustomIcon = `<Stepper defaultValue={0} minusIcon={<span style={{ 'font-size':'20px' }}>➖</span>} plusIcon={<span style={{ 'font-size':'20px' }}>➕</span>} />`;

const codeDisabled = `<Stepper value={3} disabled />`;

const codeForm = `<FormItem name="count" label="数量">
  <Stepper />
</FormItem>`;

export const StepperDocPage: Component = () => {
  const [basicVal, setBasicVal] = createSignal(1);
  const [formVal, setFormVal] = createSignal({});

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Stepper 步进器</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          步进器，用于增加或减少数量。
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Stepper Props</h2>
        <PropsTable rows={stepperProps} />

        <GroupCodePhone />

        <DemoBlock title="基础用法" code={codeBasic} groupCode="Stepper">
          <Cell title="数量" value={<Stepper value={basicVal()} onChange={setBasicVal} />} />
        </DemoBlock>

        <DemoBlock title="范围限制" code={codeRange} groupCode="Stepper">
          <Cell title="范围 0~10" value={<Stepper defaultValue={5} min={0} max={10} />} />
        </DemoBlock>

        <DemoBlock title="步长" code={codeStep} groupCode="Stepper">
          <Cell title="步长 2" value={<Stepper defaultValue={0} step={2} />} />
        </DemoBlock>

        <DemoBlock title="小数" code={codeDecimal} groupCode="Stepper">
          <Cell title="保留1位小数" value={<Stepper defaultValue={0} step={0.1} decimalLength={1} />} />
        </DemoBlock>

        <DemoBlock title="自定义尺寸" code={codeSize} groupCode="Stepper">
          <Cell title="size=30" value={<Stepper defaultValue={5} size={30} />} />
        </DemoBlock>

        <DemoBlock title="自定义图标" code={codeCustomIcon} groupCode="Stepper">
          <Cell title="加减按钮" value={<Stepper defaultValue={0} minusIcon={<span style={{ 'font-size': '20px', 'line-height': '1' }}>➖</span>} plusIcon={<span style={{ 'font-size': '20px', 'line-height': '1' }}>➕</span>} />} />
        </DemoBlock>

        <DemoBlock title="禁用状态" code={codeDisabled} groupCode="Stepper">
          <Cell title="禁用" value={<Stepper value={3} disabled />} />
        </DemoBlock>

        <DemoBlock title="表单中使用" desc="Stepper 放在 FormItem 中自动集成表单的值管理。" code={codeForm}>
          <Form onSubmit={(v) => { setFormVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}>
            <FormItem name="count" label="数量">
              <Stepper />
            </FormItem>
            <div style={{ padding: '12px 1rem' }}>
              <Button type="primary" block nativeType="submit" text="提交" />
            </div>
          </Form>
          <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
            提交值: {JSON.stringify(formVal())}
          </div>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
