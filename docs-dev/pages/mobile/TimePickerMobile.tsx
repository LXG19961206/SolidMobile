import { createSignal, type Component } from 'solid-js';

import zhCN from '../../i18n/timepicker/zh-CN';
import enUS from '../../i18n/timepicker/en-US';
import { registerLocale } from '../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { TimePicker } from '../../../src/components/TimePicker';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { Cell, CellGroup } from '../../../src/components/Cell';

export interface TimePickerMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const propsData = [
  { name: 'value', type: 'string', desc: 'componentProps.timepicker.value' },
  { name: 'onChange', type: '(value: string) => void', desc: 'componentProps.timepicker.onChange' },
  { name: 'onConfirm', type: '(value: string) => void', desc: 'componentProps.timepicker.onConfirm' },
  { name: 'onCancel', type: '() => void', desc: 'componentProps.timepicker.onCancel' },
  { name: 'show', type: 'boolean', desc: 'componentProps.timepicker.show' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', desc: 'componentProps.timepicker.onUpdateShow' },
  { name: 'placeholder', type: 'string', desc: 'componentProps.timepicker.placeholder' },
  { name: 'title', type: 'string', desc: 'componentProps.timepicker.title' },
  { name: 'visibleItemCount', type: 'number', desc: 'componentProps.timepicker.visibleItemCount' },
  { name: 'optionHeight', type: 'number', desc: 'componentProps.timepicker.optionHeight' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const TimePickerMobile: Component<TimePickerMobileProps> = (props) => {
  const t = useT();
  /* Basic */
  const [basicShow, setBasicShow] = createSignal(false);
  const [basicVal, setBasicVal] = createSignal('');

  /* Controlled */
  const [ctrlShow, setCtrlShow] = createSignal(false);
  const [ctrlVal, setCtrlVal] = createSignal('09:15:30');

  /* Form */
  const [formVal, setFormVal] = createSignal({});

  return (
    <MobilePreview title="TimePicker" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Basic usage */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.basic')}</div>
        <div style={CARD.desc}>{t('demo.basicDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="Select Time" value={basicVal() || 'Please select'} clickable onClick={() => setBasicShow(true)} />
          </CellGroup>
          <TimePicker show={basicShow()} onUpdateShow={setBasicShow} onChange={(v) => setBasicVal(v)} onConfirm={(v) => { setBasicVal(v); setBasicShow(false); }} onCancel={() => setBasicShow(false)} />
        </div>
      </div>

      {/* Controlled value */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.controlled')}</div>
        <div style={CARD.desc}>{t('demo.controlledDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="Preset Value" value={ctrlVal()} clickable onClick={() => setCtrlShow(true)} />
          </CellGroup>
          <TimePicker show={ctrlShow()} onUpdateShow={setCtrlShow} value={ctrlVal()} onChange={(v) => setCtrlVal(v)} onConfirm={(v) => { setCtrlVal(v); setCtrlShow(false); }} onCancel={() => setCtrlShow(false)} />
        </div>
      </div>

      {/* With Form */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.withForm')}</div>
        <div style={CARD.desc}>{t('demo.withFormDesc')}</div>
        <div style={CARD.body}>
          <Form onSubmit={(v) => { setFormVal(v); }} labelWidth="5em">
            <FormItem name="startTime" label="Start Time" required>
              <TimePicker placeholder="Select start time" />
            </FormItem>
            <FormItem name="endTime" label="End Time">
              <TimePicker placeholder="Select end time" />
            </FormItem>
            <div style={{ padding: '8px 0', display: 'flex' as const, gap: '8px' }}>
              <Button type="primary" block nativeType="submit" size="sm" text="Submit" />
            </div>
          </Form>
          <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>
            Submitted value: {JSON.stringify(formVal())}
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
