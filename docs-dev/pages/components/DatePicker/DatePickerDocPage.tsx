import { createSignal, useContext, type Component } from 'solid-js';

import zhCN from '../../../i18n/datepicker/zh-CN';
import enUS from '../../../i18n/datepicker/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { DatePicker } from '../../../../src/components/DatePicker';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../doc-utils';

const datePickerProps: PropRow[] = [
  { name: 'value', type: 'string', default: '—', required: false, desc: 'componentProps.datepicker.value' },
  { name: 'onChange', type: '(value: string) => void', default: '—', required: false, desc: 'componentProps.datepicker.onChange' },
  { name: 'onConfirm', type: '(value: string) => void', default: '—', required: false, desc: 'componentProps.datepicker.onConfirm' },
  { name: 'onCancel', type: '() => void', default: '—', required: false, desc: 'componentProps.datepicker.onCancel' },
  { name: 'startDate', type: 'string', default: "'2014-01-01'", required: false, desc: 'componentProps.datepicker.startDate' },
  { name: 'endDate', type: 'string', default: "'2034-12-31'", required: false, desc: 'componentProps.datepicker.endDate' },
  { name: 'type', type: "'date' | 'year-month' | 'datetime'", default: "'date'", required: false, desc: 'componentProps.datepicker.type' },
  { name: 'placeholder', type: 'string', default: "'Select Date'", required: false, desc: 'componentProps.datepicker.placeholder' },
  { name: 'title', type: 'string', default: "'Select Date'", required: false, desc: 'componentProps.datepicker.title' },
  { name: 'cancelText', type: 'string', default: '—', required: false, desc: 'componentProps.datepicker.cancelText' },
  { name: 'confirmText', type: 'string', default: '—', required: false, desc: 'componentProps.datepicker.confirmText' },
  { name: 'disabledDate', type: '(year, month, day) => boolean', default: '—', required: false, desc: 'componentProps.datepicker.disabledDate' },
  { name: 'visibleItemCount', type: 'number', default: '7', required: false, desc: 'componentProps.datepicker.visibleItemCount' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'componentProps.datepicker.teleport' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: 'componentProps.datepicker.show' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', default: '—', required: false, desc: 'componentProps.datepicker.onUpdateShow' },
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

const codeDateTime = `<DatePicker type="datetime" placeholder="Select date & time" />`;

const codeForm = `<Form onSubmit={(v) => { ... }}>
  <FormItem name="birthday" label="Birthday">
    <DatePicker placeholder="Select birth date"  />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="Submit" />
</Form>`;

/* ── Basic Demo ── */

const BasicDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal('');
  return (
    <DatePicker value={val()} onChange={setVal} placeholder="Tap to select date" teleport={phone?.()} />
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
      placeholder="From 2024-06-01 to 2024-09-30"
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
      placeholder="Select year-month"
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
      placeholder="Weekends disabled"
      disabledDate={(y, m, d) => [0, 6].includes(new Date(y, m - 1, d).getDay())}
      teleport={phone?.()}
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
      placeholder="Select date & time"
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
      <Form onSubmit={(v) => { setFormVal(v); Toast.success('Submit: ' + JSON.stringify(v)); }}>
        <FormItem name="birthday" label="Birthday">
          <DatePicker placeholder="Select birth date" teleport={phone?.()} />
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

export const DatePickerDocPage: Component = () => {
  const t = useT();
  return (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>DatePicker</h1>
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

      <DemoBlock title={t('demo.dateTime')} desc={t('demo.dateTimeDesc')} code={codeDateTime}>
        <DateTimeDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
        <FormDemo />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
