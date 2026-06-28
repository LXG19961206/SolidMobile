import { createSignal, useContext, type Component } from 'solid-js';
import { DatePicker } from '../../../../src/components/DatePicker';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../../src/doc-utils';

const datePickerProps: PropRow[] = [
  { name: 'value', type: 'string', default: '—', required: false, desc: '当前值，格式 YYYY-MM-DD。' },
  { name: 'onChange', type: '(value: string) => void', default: '—', required: false, desc: '值变化回调。' },
  { name: 'onConfirm', type: '(value: string) => void', default: '—', required: false, desc: '确认按钮回调。' },
  { name: 'onCancel', type: '() => void', default: '—', required: false, desc: '取消按钮回调。' },
  { name: 'startDate', type: 'string', default: "'2014-01-01'", required: false, desc: '可选范围起点。' },
  { name: 'endDate', type: 'string', default: "'2034-12-31'", required: false, desc: '可选范围终点。' },
  { name: 'type', type: "'date' | 'year-month'", default: "'date'", required: false, desc: '选择类型。' },
  { name: 'placeholder', type: 'string', default: "'请选择日期'", required: false, desc: '占位文字。' },
  { name: 'title', type: 'string', default: "'选择日期'", required: false, desc: '面板标题。' },
  { name: 'cancelText', type: 'string', default: '—', required: false, desc: '取消按钮文字。' },
  { name: 'confirmText', type: 'string', default: '—', required: false, desc: '确认按钮文字。' },
  { name: 'disabledDate', type: '(year, month, day) => boolean', default: '—', required: false, desc: '禁用特定日期。返回 true 则该日不可选。' },
  { name: 'visibleItemCount', type: 'number', default: '7', required: false, desc: '可见行数。' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'Portal 挂载目标。文档环境需传入模拟器容器。' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: '受控模式：是否显示面板。不传时 DatePicker 自动管理。' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', default: '—', required: false, desc: '受控模式：面板开关回调。' },
];

const codeBasic = `const phone = useContext(PhoneTargetContext);

<DatePicker teleport={phone?.()} />`;

const codeRange = `<DatePicker
  startDate="2024-06-01"
  endDate="2024-09-30"
  teleport={phone?.()}
/>`;

const codeYearMonth = `<DatePicker type="year-month" teleport={phone?.()} />`;

const codeDisabled = `<DatePicker
  disabledDate={(y, m, d) =>
    // 禁用周末
    [0, 6].includes(new Date(y, m - 1, d).getDay())
  }
  teleport={phone?.()}
/>`;

const codeForm = `<Form onSubmit={(v) => { ... }}>
  <FormItem name="birthday" label="生日">
    <DatePicker placeholder="请选择出生日期" teleport={phone?.()} />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="提交" />
</Form>`;

/* ── Basic Demo ── */

const BasicDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal('');
  return (
    <DatePicker value={val()} onChange={setVal} placeholder="点击选择日期" teleport={phone?.()} />
  );
};

/* ── Range Demo ── */

const RangeDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal('');
  return (
    <DatePicker
      value={val()}
      onChange={setVal}
      startDate="2024-06-01"
      endDate="2024-09-30"
      placeholder="仅 2024-06-01 ~ 2024-09-30"
      teleport={phone?.()}
    />
  );
};

/* ── Year-Month Demo ── */

const YearMonthDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal('');
  return (
    <DatePicker
      value={val()}
      onChange={setVal}
      type="year-month"
      placeholder="选择年月"
      teleport={phone?.()}
    />
  );
};

/* ── Disabled Date Demo ── */

const DisabledDateDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal('');
  return (
    <DatePicker
      value={val()}
      onChange={setVal}
      placeholder="周末不可选"
      teleport={phone?.()}
      disabledDate={(y, m, d) => [0, 6].includes(new Date(y, m - 1, d).getDay())}
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
        <FormItem name="birthday" label="生日">
          <DatePicker placeholder="请选择出生日期" teleport={phone?.()} />
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

export const DatePickerDocPage: Component = () => (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>DatePicker 日期选择</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        日期选择器，基于 Picker 组件封装。点击触发区域弹出滚轮选择。
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>DatePicker Props</h2>
      <PropsTable rows={datePickerProps} />

      <DemoBlock title="基础用法" desc="不传 show 时，DatePicker 自行管理面板开关，点击即可选择。" code={codeBasic}>
        <BasicDemo />
      </DemoBlock>

      <DemoBlock title="限定范围" desc="通过 startDate / endDate 限制可选范围。" code={codeRange}>
        <RangeDemo />
      </DemoBlock>

      <DemoBlock title="仅选择年月" desc="type='year-month' 只显示年和月两列。" code={codeYearMonth}>
        <YearMonthDemo />
      </DemoBlock>

      <DemoBlock title="禁用日期" desc="通过 disabledDate 函数禁用特定日期。以下禁用了所有周末（周六/周日）。" code={codeDisabled}>
        <DisabledDateDemo />
      </DemoBlock>

      <DemoBlock title="表单中使用" desc="放在 FormItem 中自动集成表单的值管理。" code={codeForm}>
        <FormDemo />
      </DemoBlock>
    </div>
  </DocLayout>
);
