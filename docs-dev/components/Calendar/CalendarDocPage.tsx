import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCalendarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const CalendarDocPage = () => {
  const t = useT();
  const { propsTables, dayInfoTables, cssVarsTables } = useCalendarTableData();

  const demos: DemoCode[] = [
    {
      title: t('calendar.demo.single'),
      code: `const [show, setShow] = createSignal(false);\nconst [date, setDate] = createSignal<Date>();\n\n<Calendar\n  show={show()}\n  onUpdateShow={setShow}\n  value={date()}\n  onChange={(v) => { setDate(v as Date); setShow(false); }}\n  closeable\n/>`,
      desc: t('calendar.demoDesc.single'),
    },
    {
      title: t('calendar.demo.range'),
      code: `const [show, setShow] = createSignal(false);\nconst [range, setRange] = createSignal<[Date, Date]>();\n\n<Calendar\n  type="range"\n  showConfirm\n  show={show()}\n  onUpdateShow={setShow}\n  value={range()}\n  onChange={(v) => setRange(v as [Date, Date])}\n  closeable\n/>`,
      desc: t('calendar.demoDesc.range'),
    },
    {
      title: t('calendar.demo.customRender'),
      code: `const events = {\n  '2026-7-3': { emoji: '🎂', label: 'B-day', bg: '#fef3c7', color: '#d97706' },\n  '2026-7-18': { emoji: '✈️', label: 'Trip', bg: '#d1fae5', color: '#059669' },\n};\n\nconst fancyDayRender = (d: DayInfo) => {\n  const ev = events[\`$\{d.year}-$\{d.month}-$\{d.day}\`];\n  if (!ev) return <>{d.day}</>;\n  return (\n    <span style={{\n      display: 'flex', 'flex-direction': 'column',\n      background: ev.bg, 'border-radius': '50%',\n      width: '44px', height: '44px',\n      'align-items': 'center',\n      'justify-content': 'center',\n    }}>\n      <span style={{ 'font-size': '1.15rem' }}>{ev.emoji}</span>\n      <span style={{ 'font-size': '0.55rem', color: ev.color, 'font-weight': 700 }}>{ev.label}</span>\n    </span>\n  );\n};\n\n<Calendar\n  type="range" showConfirm\n  activeColor="#ec4899"\n  dayRender={fancyDayRender}\n  show={show()}\n  onUpdateShow={setShow}\n  closeable\n/>`,
      desc: t('calendar.demoDesc.customRender'),
    },
    {
      title: t('calendar.demo.holiday'),
      code: `const special: Record<string, {label:string,color:string}> = {\n  '2026-7-1': { label: 'Holiday', color: '#ef4444' },\n};\n\n<Calendar\n  show={show()}\n  onUpdateShow={setShow}\n  dayRender={(d) => {\n    const s = special[\`$\{d.year}-$\{d.month}-$\{d.day}\`];\n    return (\n      <span style="display:flex;flex-direction:column;align-items:center;line-height:1.2">\n        <span>{d.day}</span>\n        {s && <span style={\`font-size:0.65rem;color:$\{s.color};font-weight:600\`}>{s.label}</span>}\n      </span>\n    );\n  }}\n  title="Select Date"\n  closeable\n/>`,
      desc: t('calendar.demoDesc.holiday'),
    },
    {
      title: t('calendar.demo.inline'),
      code: `<Calendar popup={false} />`,
      desc: t('calendar.demoDesc.inline'),
    },
    {
      title: t('calendar.demo.lunar'),
      code: `<Calendar popup={false} lunar />`,
      desc: t('calendar.demoDesc.lunar'),
    },
    {
      title: t('calendar.demo.multiple'),
      code: `<Calendar\n  type="multiple"\n  popup={false}\n  maxCount={3}\n  onChange={(v) => console.log(v)}\n/>`,
      desc: t('calendar.demoDesc.multiple'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Calendar</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('calendar.intro')}</p>
        <PropsAttrs propsTables={[...propsTables, ...dayInfoTables]} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
