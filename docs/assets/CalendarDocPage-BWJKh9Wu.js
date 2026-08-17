import{m,s as h,c as n,r as g,v as f,w as y,i as o,P as w,F as u,D,a as b,t as C}from"./index-YBn7yUdg.js";var v=C('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Calendar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":y,"en-US":f});const x=()=>{const e=m(),{propsTables:s,dayInfoTables:l,cssVarsTables:r}=h(),d=[{title:e("calendar.demo.single"),code:`const [show, setShow] = createSignal(false);
const [date, setDate] = createSignal<Date>();

<Calendar
  show={show()}
  onUpdateShow={setShow}
  value={date()}
  onChange={(v) => { setDate(v as Date); setShow(false); }}
  closeable
/>`,desc:e("calendar.demoDesc.single")},{title:e("calendar.demo.range"),code:`const [show, setShow] = createSignal(false);
const [range, setRange] = createSignal<[Date, Date]>();

<Calendar
  type="range"
  showConfirm
  show={show()}
  onUpdateShow={setShow}
  value={range()}
  onChange={(v) => setRange(v as [Date, Date])}
  closeable
/>`,desc:e("calendar.demoDesc.range")},{title:e("calendar.demo.customRender"),code:`const events = {
  '2026-7-3': { emoji: '🎂', label: 'B-day', bg: '#fef3c7', color: '#d97706' },
  '2026-7-18': { emoji: '✈️', label: 'Trip', bg: '#d1fae5', color: '#059669' },
};

const fancyDayRender = (d: DayInfo) => {
  const ev = events[\`\${d.year}-\${d.month}-\${d.day}\`];
  if (!ev) return <>{d.day}</>;
  return (
    <span style={{
      display: 'flex', 'flex-direction': 'column',
      background: ev.bg, 'border-radius': '50%',
      width: '44px', height: '44px',
      'align-items': 'center',
      'justify-content': 'center',
    }}>
      <span style={{ 'font-size': '1.15rem' }}>{ev.emoji}</span>
      <span style={{ 'font-size': '0.55rem', color: ev.color, 'font-weight': 700 }}>{ev.label}</span>
    </span>
  );
};

<Calendar
  type="range" showConfirm
  activeColor="#ec4899"
  dayRender={fancyDayRender}
  show={show()}
  onUpdateShow={setShow}
  closeable
/>`,desc:e("calendar.demoDesc.customRender")},{title:e("calendar.demo.holiday"),code:`const special: Record<string, {label:string,color:string}> = {
  '2026-7-1': { label: 'Holiday', color: '#ef4444' },
};

<Calendar
  show={show()}
  onUpdateShow={setShow}
  dayRender={(d) => {
    const s = special[\`\${d.year}-\${d.month}-\${d.day}\`];
    return (
      <span style="display:flex;flex-direction:column;align-items:center;line-height:1.2">
        <span>{d.day}</span>
        {s && <span style={\`font-size:0.65rem;color:\${s.color};font-weight:600\`}>{s.label}</span>}
      </span>
    );
  }}
  title="Select Date"
  closeable
/>`,desc:e("calendar.demoDesc.holiday")},{title:e("calendar.demo.inline"),code:"<Calendar popup={false} />",desc:e("calendar.demoDesc.inline")},{title:e("calendar.demo.lunar"),code:"<Calendar popup={false} lunar />",desc:e("calendar.demoDesc.lunar")},{title:e("calendar.demo.multiple"),code:`<Calendar
  type="multiple"
  popup={false}
  maxCount={3}
  onChange={(v) => console.log(v)}
/>`,desc:e("calendar.demoDesc.multiple")}];return n(b,{get children(){var a=v(),c=a.firstChild,t=c.nextSibling,i=t.nextSibling;return o(t,()=>e("calendar.intro")),o(a,n(w,{get propsTables(){return[...s,...l]},cssVarsTables:r}),i),o(a,n(u,{each:d,children:p=>n(D,{demo:p})}),null),a}})};export{x as CalendarDocPage};
