import { createSignal, useContext, type Component } from 'solid-js';


import { useT } from '../../../doc-i18n';
import { TimePicker } from '../../../../src/components/TimePicker';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';

const propsData: PropRow[] = [
  { name: 'value', type: 'string', default: '—', required: false, desc: 'componentProps.timepicker.value' },
  { name: 'onChange', type: '(value: string) => void', default: '—', required: false, desc: 'componentProps.timepicker.onChange' },
  { name: 'onConfirm', type: '(value: string) => void', default: '—', required: false, desc: 'componentProps.timepicker.onConfirm' },
  { name: 'onCancel', type: '() => void', default: '—', required: false, desc: 'componentProps.timepicker.onCancel' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: 'componentProps.timepicker.show' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', default: '—', required: false, desc: 'componentProps.timepicker.onUpdateShow' },
  { name: 'placeholder', type: 'string', default: "'Please select a time'", required: false, desc: 'componentProps.timepicker.placeholder' },
  { name: 'title', type: 'string', default: "'Please Select'", required: false, desc: 'componentProps.timepicker.title' },
  { name: 'visibleItemCount', type: 'number', default: '7', required: false, desc: 'componentProps.timepicker.visibleItemCount' },
  { name: 'optionHeight', type: 'number', default: '50', required: false, desc: 'componentProps.timepicker.optionHeight' },
  { name: 'cancelText', type: 'string', default: 'Follows locale', required: false, desc: 'componentProps.timepicker.cancelText' },
  { name: 'confirmText', type: 'string', default: 'Follows locale', required: false, desc: 'componentProps.timepicker.confirmText' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'componentProps.timepicker.teleport' },
];

/* ── Basic demo ── */

const BasicDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal('');
  return (
    <>
      <CellGroup>
        <Cell
          title="Select Time"
          value={val() || 'Please Select'}
          clickable
          onClick={() => {
            // TimePicker manages its own show state (auto mode)
          }}
        />
      </CellGroup>
      <TimePicker onChange={(v) => setVal(v)} onConfirm={(v) => setVal(v)} teleport={phone?.()} />
    </>
  );
};

const codeBasic = `<TimePicker onChange={(v) => setVal(v)} />`;

/* ── Controlled value demo ── */

const ControlledDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal('14:30:00');
  return (
    <>
      <CellGroup>
        <Cell
          title="Preset Value"
          value={val() || 'Please Select'}
          clickable
        />
      </CellGroup>
      <TimePicker value={val()} onChange={(v) => setVal(v)} onConfirm={(v) => setVal(v)} teleport={phone?.()} />
    </>
  );
};

const codeControlled = `<TimePicker value="14:30:00" />`;

/* ── Form demo ── */

const FormDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [formVal, setFormVal] = createSignal({});
  return (
    <>
      <Form onSubmit={(v) => { setFormVal(v); }} labelWidth="4em">
        <FormItem name="startTime" label="Start Time" required>
          <TimePicker placeholder="Select start time" teleport={phone?.()} />
        </FormItem>
        <FormItem name="endTime" label="End Time">
          <TimePicker placeholder="Select end time" teleport={phone?.()} />
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

const codeForm = `<Form onSubmit={(v) => console.log(v)}>
  <FormItem name="startTime" label="Start Time">
    <TimePicker />
  </FormItem>
  <FormItem name="endTime" label="End Time">
    <TimePicker />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="Submit" />
</Form>`;

export const TimePickerDocPage: Component = () => {
  const t = useT();
  return (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>TimePicker</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        {t('componentIntro.TimePickerIntro')}
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <DemoBlock title={t('demo.basic')} desc={t('demo.basicDesc')} code={codeBasic}>
        <BasicDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.controlled')} desc={t('demo.controlledDesc')} code={codeControlled}>
        <ControlledDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
        <FormDemo />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
