import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DatePicker } from '../../../src/components/DatePicker';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useDatePickerTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const DatePickerMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useDatePickerTableData();

  const [open, setOpen] = createSignal('');
  const [basicVal, setBasicVal] = createSignal('');
  const [yearMonthVal, setYearMonthVal] = createSignal('');
  const [disabledVal, setDisabledVal] = createSignal('');
  const [rangeVal, setRangeVal] = createSignal('');
  const [dateTimeVal, setDateTimeVal] = createSignal('');

  return (
    <MobilePreview title="DatePicker">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px 0 0' }}>
        <CellGroup card>
          <Cell title={t('datepicker.demo.basic')} value={basicVal() || 'Select'} clickable onClick={() => setOpen('basic')} />
          <Cell title={t('datepicker.demo.yearMonth')} value={yearMonthVal() || 'Select'} clickable onClick={() => setOpen('yearMonth')} />
          <Cell title={t('datepicker.demo.disabledDate')} value={disabledVal() || 'Select'} description="Weekends disabled" clickable onClick={() => setOpen('disabled')} />
          <Cell title={t('datepicker.demo.dateRange')} value={rangeVal() || 'Select'} description="2025-01-01 ~ 2025-12-31" clickable onClick={() => setOpen('range')} />
          <Cell title={t('datepicker.demo.dateTime')} value={dateTimeVal() || 'Select'} description="YYYY-MM-DD HH:mm:ss" clickable onClick={() => setOpen('datetime')} />
        </CellGroup>

        <DatePicker show={open() === 'basic'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          value={basicVal()} onChange={setBasicVal}
          onConfirm={(v) => { setBasicVal(v); setOpen(''); }}
          title="Select Date"
        />
        <DatePicker show={open() === 'yearMonth'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          type="year-month" value={yearMonthVal()} onChange={setYearMonthVal}
          onConfirm={(v) => { setYearMonthVal(v); setOpen(''); }}
          title="Select Year-Month"
        />
        <DatePicker show={open() === 'disabled'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          value={disabledVal()} onChange={setDisabledVal}
          disabledDate={(y, m, d) => {
            const date = new Date(y, m - 1, d);
            return date.getDay() === 0 || date.getDay() === 6;
          }}
          onConfirm={(v) => { setDisabledVal(v); setOpen(''); }}
          title="Select Date"
        />
        <DatePicker show={open() === 'range'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          value={rangeVal()} onChange={setRangeVal}
          startDate="2025-01-01" endDate="2025-12-31"
          onConfirm={(v) => { setRangeVal(v); setOpen(''); }}
          title="Select Date"
        />
        <DatePicker show={open() === 'datetime'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          type="datetime" value={dateTimeVal()} onChange={setDateTimeVal}
          onConfirm={(v) => { setDateTimeVal(v); setOpen(''); }}
          title="Select Date & Time"
        />
      </div>
    </MobilePreview>
  );
};
