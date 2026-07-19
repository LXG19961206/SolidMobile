import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useDatePickerTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const DatePickerDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useDatePickerTableData();

  const demos: DemoCode[] = [
    {
      title: t('datepicker.demo.basic'),
      code: `const [open, setOpen] = createSignal('');\nconst [basicVal, setBasicVal] = createSignal('');\n\n<CellGroup card>\n  <Cell title={t('datepicker.demo.basic')} value={basicVal() || 'Select'} clickable onClick={() => setOpen('basic')} />\n</CellGroup>\n\n<DatePicker show={open() === 'basic'} onUpdateShow={(v) => { if (!v) setOpen(''); }}\n  value={basicVal()} onChange={setBasicVal}\n  onConfirm={(v) => { setBasicVal(v); setOpen(''); }}\n  title="Select Date"\n/>`,
      desc: t('datepicker.demoDesc.basic'),
    },
    {
      title: t('datepicker.demo.yearMonth'),
      code: `const [open, setOpen] = createSignal('');\nconst [yearMonthVal, setYearMonthVal] = createSignal('');\n\n<CellGroup card>\n  <Cell title={t('datepicker.demo.yearMonth')} value={yearMonthVal() || 'Select'} clickable onClick={() => setOpen('yearMonth')} />\n</CellGroup>\n\n<DatePicker show={open() === 'yearMonth'} onUpdateShow={(v) => { if (!v) setOpen(''); }}\n  type="year-month" value={yearMonthVal()} onChange={setYearMonthVal}\n  onConfirm={(v) => { setYearMonthVal(v); setOpen(''); }}\n  title="Select Year-Month"\n/>`,
      desc: t('datepicker.demoDesc.yearMonth'),
    },
    {
      title: t('datepicker.demo.disabledDate'),
      code: `const [open, setOpen] = createSignal('');\nconst [disabledVal, setDisabledVal] = createSignal('');\n\n<CellGroup card>\n  <Cell title={t('datepicker.demo.disabledDate')} value={disabledVal() || 'Select'} description="Weekends disabled" clickable onClick={() => setOpen('disabled')} />\n</CellGroup>\n\n<DatePicker show={open() === 'disabled'} onUpdateShow={(v) => { if (!v) setOpen(''); }}\n  value={disabledVal()} onChange={setDisabledVal}\n  disabledDate={(y, m, d) => {\n    const date = new Date(y, m - 1, d);\n    return date.getDay() === 0 || date.getDay() === 6;\n  }}\n  onConfirm={(v) => { setDisabledVal(v); setOpen(''); }}\n  title="Select Date"\n/>`,
      desc: t('datepicker.demoDesc.disabledDate'),
    },
    {
      title: t('datepicker.demo.dateRange'),
      code: `const [open, setOpen] = createSignal('');\nconst [rangeVal, setRangeVal] = createSignal('');\n\n<CellGroup card>\n  <Cell title={t('datepicker.demo.dateRange')} value={rangeVal() || 'Select'} description="2025-01-01 ~ 2025-12-31" clickable onClick={() => setOpen('range')} />\n</CellGroup>\n\n<DatePicker show={open() === 'range'} onUpdateShow={(v) => { if (!v) setOpen(''); }}\n  value={rangeVal()} onChange={setRangeVal}\n  startDate="2025-01-01" endDate="2025-12-31"\n  onConfirm={(v) => { setRangeVal(v); setOpen(''); }}\n  title="Select Date"\n/>`,
      desc: t('datepicker.demoDesc.dateRange'),
    },
    {
      title: t('datepicker.demo.dateTime'),
      code: `const [open, setOpen] = createSignal('');\nconst [dateTimeVal, setDateTimeVal] = createSignal('');\n\n<CellGroup card>\n  <Cell title={t('datepicker.demo.dateTime')} value={dateTimeVal() || 'Select'} description="YYYY-MM-DD HH:mm:ss" clickable onClick={() => setOpen('datetime')} />\n</CellGroup>\n\n<DatePicker show={open() === 'datetime'} onUpdateShow={(v) => { if (!v) setOpen(''); }}\n  type="datetime" value={dateTimeVal()} onChange={setDateTimeVal}\n  onConfirm={(v) => { setDateTimeVal(v); setOpen(''); }}\n  title="Select Date & Time"\n/>`,
      desc: t('datepicker.demoDesc.dateTime'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>DatePicker</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('datepicker.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
