import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTimePickerTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const TimePickerDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useTimePickerTableData();

  const demos: DemoCode[] = [
    {
      title: t('timepicker.demo.basic'),
      code: 'const [show, setShow] = createSignal(false);\nconst [val, setVal] = createSignal(\'\');\n\n<CellGroup card>\n  <Cell title="Select Time" value={val() || \'Please select\'}\n    clickable onClick={() => setShow(true)} />\n</CellGroup>\n\n<TimePicker show={show()} onUpdateShow={setShow}\n  onChange={(v) => setVal(v)}\n  onConfirm={(v) => { setVal(v); setShow(false); }}\n  onCancel={() => setShow(false)} />',
      desc: t('timepicker.demoDesc.basic'),
    },
    {
      title: t('timepicker.demo.preset'),
      code: 'const [show, setShow] = createSignal(false);\nconst [val, setVal] = createSignal(\'14:30:00\');\n\n<CellGroup card>\n  <Cell title="Preset Value" value={val()}\n    clickable onClick={() => setShow(true)} />\n</CellGroup>\n\n<TimePicker show={show()} onUpdateShow={setShow}\n  value={val()} onChange={(v) => setVal(v)}\n  onConfirm={(v) => { setVal(v); setShow(false); }}\n  onCancel={() => setShow(false)} />',
      desc: t('timepicker.demoDesc.preset'),
    },
    {
      title: t('timepicker.demo.showUnit'),
      code: 'const [show, setShow] = createSignal(false);\nconst [val, setVal] = createSignal(\'\');\n\n<CellGroup card>\n  <Cell title="Show Units" value={val() || \'Please select\'} description="08时 30分 15秒"\n    clickable onClick={() => setShow(true)} />\n</CellGroup>\n\n<TimePicker show={show()} onUpdateShow={setShow}\n  showUnit\n  value={val()} onChange={(v) => setVal(v)}\n  onConfirm={(v) => { setVal(v); setShow(false); }}\n  onCancel={() => setShow(false)} />',
      desc: t('timepicker.demoDesc.showUnit'),
    },
    {
      title: t('timepicker.demo.form'),
      code: 'const [formVal, setFormVal] = createSignal({});\n\n<Form onSubmit={(v) => { setFormVal(v); }} labelWidth="5em">\n  <FormItem name="startTime" label="Start Time" required>\n    <TimePicker placeholder="Select start time" />\n  </FormItem>\n  <FormItem name="endTime" label="End Time">\n    <TimePicker placeholder="Select end time" />\n  </FormItem>\n  <div style={{ padding: \'8px 0\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>',
      desc: t('timepicker.demoDesc.form'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>TimePicker</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('timepicker.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
