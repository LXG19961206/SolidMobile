import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { TimePicker } from '../../../src/components/TimePicker';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTimePickerTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const TimePickerMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useTimePickerTableData();

  const [basicShow, setBasicShow] = createSignal(false);
  const [basicVal, setBasicVal] = createSignal('');

  const [ctrlShow, setCtrlShow] = createSignal(false);
  const [ctrlVal, setCtrlVal] = createSignal('14:30:00');

  const [unitShow, setUnitShow] = createSignal(false);
  const [unitVal, setUnitVal] = createSignal('');

  const [formVal, setFormVal] = createSignal({});

  return (
    <MobilePreview title="TimePicker">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px 0 0' }}>
        <CellGroup card>
          <Cell title={t('timepicker.demo.basic')} value={basicVal() || 'Please select'} clickable onClick={() => setBasicShow(true)} />
          <Cell title={t('timepicker.demo.preset')} value={ctrlVal()} clickable onClick={() => setCtrlShow(true)} />
          <Cell title={t('timepicker.demo.showUnit')} value={unitVal() || 'Please select'} description="08时 30分 15秒" clickable onClick={() => setUnitShow(true)} />
        </CellGroup>

        <TimePicker show={basicShow()} onUpdateShow={setBasicShow}
          onChange={(v) => setBasicVal(v)}
          onConfirm={(v) => { setBasicVal(v); setBasicShow(false); }}
          onCancel={() => setBasicShow(false)}
        />
        <TimePicker show={ctrlShow()} onUpdateShow={setCtrlShow}
          value={ctrlVal()} onChange={(v) => setCtrlVal(v)}
          onConfirm={(v) => { setCtrlVal(v); setCtrlShow(false); }}
          onCancel={() => setCtrlShow(false)}
        />
        <TimePicker show={unitShow()} onUpdateShow={setUnitShow}
          showUnit
          value={unitVal()} onChange={(v) => setUnitVal(v)}
          onConfirm={(v) => { setUnitVal(v); setUnitShow(false); }}
          onCancel={() => setUnitShow(false)}
        />

        <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('timepicker.demo.form')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('timepicker.demoDesc.form')}</div>
            <div style={{ padding: '0 16px 16px' }}>
              <Form onSubmit={(v) => { setFormVal(v); }} labelWidth="5em">
                <FormItem name="startTime" label="Start Time" required>
                  <TimePicker placeholder="Select start time" />
                </FormItem>
                <FormItem name="endTime" label="End Time">
                  <TimePicker placeholder="Select end time" />
                </FormItem>
                <div style={{ padding: '8px 0', display: 'flex', gap: '8px' }}>
                  <Button type="primary" block nativeType="submit" size="sm" text="Submit" />
                </div>
              </Form>
              <div style={{ 'font-size': '0.7rem', color: '#9ca3af', 'margin-top': '8px' }}>
                Submitted: {JSON.stringify(formVal())}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
