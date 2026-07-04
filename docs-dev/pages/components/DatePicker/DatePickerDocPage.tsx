import { createSignal, useContext, type Component } from 'solid-js';
import { DatePicker } from '../../../../src/components/DatePicker';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import { useT } from '../../doc-i18n';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../../src/doc-utils';

const datePickerProps: PropRow[] = [
  { name: 'value', type: 'string', default: '—', required: false, desc: '当前值，格式 YYYY-MM-DD 或 YYYY-MM-DD HH:mm:ss（datetime 模式）。' },
  { name: 'onChange', type: '(value: string) => void', default: '—', required: false, desc: '值变化回调。' },
  { name: 'onConfirm', type: '(value: string) => void', default: '—', required: false, desc: '确认按钮回调。' },
  { name: 'onCancel', type: '() => void', default: '—', required: false, desc: '取消按钮回调。' },
  { name: 'startDate', type: 'string', default: "'2014-01-01'", required: false, desc: '可选范围起点。' },
  { name: 'endDate', type: 'string', default: "'2034-12-31'", required: false, desc: '可选范围终点。' },
  { name: 'type', type: "'date' | 'year-month' | 'datetime'", default: "'date'", required: false, desc: '选择类型。datetime 增加时/分/秒三列。' },
  { name: 'placeholder', type: 'string', default: "'请选择日期'", required: false, desc: '占位文字。' },
  { name: 'title', type: 'string', default: "'选择日期'", required: false, desc: '面板标题。' },
  { name: 'cancelText', type: 'string', default: '—', required: false, desc: '取消按钮文字。' },
  { name: 'confirmText', type: 'string', default: '—', required: false, desc: '确认按钮文字。' },
  { name: 'disabledDate', type: '(year, month, day) => boolean', default: '—', required: false, desc: '禁用特定日期。返回 true 则该日不可选。' },
  { name: 'visibleItemCount', type: 'number', default: '7', required: false, desc: '可见行数。' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'Picker 的 Portal 挂载目标，默认 document.body。' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: '受控模式：是否显示面板。不传时 DatePicker 自动管理。' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', default: '—', required: false, desc: '受控模式：面板开关回调。' },
];

const codeBasic = `const phone = useContext(PhoneTargetContext);

<DatePicker  />`;

const codeRange = `<DatePicker
  startDate="2024-06-01"
  endDate="2024-09-30"

/>`;

const codeYearMonth = `<DatePicker type="year-month"  />`;

const codeDisabled = `<DatePicker
  disabledDate={(y, m, d) =>
    // 禁用周末
    [0, 6].includes(new Date(y, m - 1, d).getDay())
  }

/>`;

const codeDateTime = `<DatePicker type="datetime" placeholder="选择日期时间" />`;

const codeForm = `<Form onSubmit={(v) => { ... }}>
  <FormItem name="birthday" label="生日">
    <DatePicker placeholder="请选择出生日期"  />
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
      disabledDate={(y, m, d) => [0, 6].includes(new Date(y, m - 1, d).getDay())}
    />
  );
};

/* ── DateTime Demo ── */

const DateTimeDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal('');
  return (
    <DatePicker
      value={val()}
      onChange={setVal}
      type="datetime"
      placeholder="选择日期时间"
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

export const DatePickerDocPage: Component = () => {
  const t = useT();
  return (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>DatePicker 日期选择</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        {t('demo.basicDesc')}
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={datePickerProps} />

      <DemoBlock title={t('demo.basic')} desc={t('demo.basicDesc')} code={codeBasic}>
        <BasicDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.range')} desc={t('demo.rangeDesc')} code={codeRange}>
        <RangeDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.yearMonth')} desc={t('demo.yearMonthDesc')} code={codeYearMonth}>
        <YearMonthDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.disabled')} desc={t('demo.disabledDesc')} code={codeDisabled}>
        <DisabledDateDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.datetime')} desc={t('demo.datetimeDesc')} code={codeDateTime}>
        <DateTimeDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
        <FormDemo />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
