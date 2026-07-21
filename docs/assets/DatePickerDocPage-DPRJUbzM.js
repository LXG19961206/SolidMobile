import{u as p,S as m,c as a,i as l,P as D,F as g,t as h,r as k,T as C,U as v}from"./index-BpewzGtL.js";import{D as b}from"./ComponentDocLayout-Bkjb1zAw.js";import{D as V}from"./DocLayout-CaxxNUR0.js";var S=h('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">DatePicker</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');k({"zh-CN":v,"en-US":C});const f=()=>{const e=p(),{propsTables:i,cssVarsTables:o}=m(),s=[{title:e("datepicker.demo.basic"),code:`const [open, setOpen] = createSignal('');
const [basicVal, setBasicVal] = createSignal('');

<CellGroup card>
  <Cell title={t('datepicker.demo.basic')} value={basicVal() || 'Select'} clickable onClick={() => setOpen('basic')} />
</CellGroup>

<DatePicker show={open() === 'basic'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
  value={basicVal()} onChange={setBasicVal}
  onConfirm={(v) => { setBasicVal(v); setOpen(''); }}
  title="Select Date"
/>`,desc:e("datepicker.demoDesc.basic")},{title:e("datepicker.demo.yearMonth"),code:`const [open, setOpen] = createSignal('');
const [yearMonthVal, setYearMonthVal] = createSignal('');

<CellGroup card>
  <Cell title={t('datepicker.demo.yearMonth')} value={yearMonthVal() || 'Select'} clickable onClick={() => setOpen('yearMonth')} />
</CellGroup>

<DatePicker show={open() === 'yearMonth'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
  type="year-month" value={yearMonthVal()} onChange={setYearMonthVal}
  onConfirm={(v) => { setYearMonthVal(v); setOpen(''); }}
  title="Select Year-Month"
/>`,desc:e("datepicker.demoDesc.yearMonth")},{title:e("datepicker.demo.disabledDate"),code:`const [open, setOpen] = createSignal('');
const [disabledVal, setDisabledVal] = createSignal('');

<CellGroup card>
  <Cell title={t('datepicker.demo.disabledDate')} value={disabledVal() || 'Select'} description="Weekends disabled" clickable onClick={() => setOpen('disabled')} />
</CellGroup>

<DatePicker show={open() === 'disabled'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
  value={disabledVal()} onChange={setDisabledVal}
  disabledDate={(y, m, d) => {
    const date = new Date(y, m - 1, d);
    return date.getDay() === 0 || date.getDay() === 6;
  }}
  onConfirm={(v) => { setDisabledVal(v); setOpen(''); }}
  title="Select Date"
/>`,desc:e("datepicker.demoDesc.disabledDate")},{title:e("datepicker.demo.dateRange"),code:`const [open, setOpen] = createSignal('');
const [rangeVal, setRangeVal] = createSignal('');

<CellGroup card>
  <Cell title={t('datepicker.demo.dateRange')} value={rangeVal() || 'Select'} description="2025-01-01 ~ 2025-12-31" clickable onClick={() => setOpen('range')} />
</CellGroup>

<DatePicker show={open() === 'range'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
  value={rangeVal()} onChange={setRangeVal}
  startDate="2025-01-01" endDate="2025-12-31"
  onConfirm={(v) => { setRangeVal(v); setOpen(''); }}
  title="Select Date"
/>`,desc:e("datepicker.demoDesc.dateRange")},{title:e("datepicker.demo.dateTime"),code:`const [open, setOpen] = createSignal('');
const [dateTimeVal, setDateTimeVal] = createSignal('');

<CellGroup card>
  <Cell title={t('datepicker.demo.dateTime')} value={dateTimeVal() || 'Select'} description="YYYY-MM-DD HH:mm:ss" clickable onClick={() => setOpen('datetime')} />
</CellGroup>

<DatePicker show={open() === 'datetime'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
  type="datetime" value={dateTimeVal()} onChange={setDateTimeVal}
  onConfirm={(v) => { setDateTimeVal(v); setOpen(''); }}
  title="Select Date & Time"
/>`,desc:e("datepicker.demoDesc.dateTime")}];return a(V,{get children(){var t=S(),c=t.firstChild,n=c.nextSibling,r=n.nextSibling;return l(n,()=>e("datepicker.intro")),l(t,a(D,{propsTables:i,cssVarsTables:o}),r),l(t,a(g,{each:s,children:d=>a(b,{demo:d})}),null),t}})};export{f as DatePickerDocPage};
