import { createSignal, Show, useContext } from 'solid-js';
import { Calendar } from '../../../../src/components/Calendar';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import { useT, loadLocale } from '../../../doc-i18n';
loadLocale('calendar');
import css from './CalendarDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'type', type: "'single' | 'multiple' | 'range'", default: "'single'", required: false, desc: 'componentProps.calendar.type' },
  { name: 'value', type: 'Date | Date[] | [Date, Date]', default: '—', required: false, desc: 'componentProps.calendar.value' },
  { name: 'onChange', type: '(value) => void', default: '—', required: false, desc: 'componentProps.calendar.onChange' },
  { name: 'popup', type: 'boolean', default: 'true', required: false, desc: 'componentProps.calendar.popup' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: 'componentProps.calendar.show' },
  { name: 'title', type: 'string | JSX.Element', default: "'Select Date'", required: false, desc: 'componentProps.calendar.title' },
  { name: 'closeable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.calendar.closeable' },
  { name: 'minDate', type: 'Date', default: '—', required: false, desc: 'componentProps.calendar.minDate' },
  { name: 'maxDate', type: 'Date', default: '—', required: false, desc: 'componentProps.calendar.maxDate' },
  { name: 'firstDayOfWeek', type: 'number', default: '0', required: false, desc: 'componentProps.calendar.firstDayOfWeek' },
  { name: 'weekdays', type: 'string[]', default: "['Sun','Mon',...]", required: false, desc: 'componentProps.calendar.weekdays' },
  { name: 'titleFormatter', type: '(y, m) => string', default: '—', required: false, desc: 'componentProps.calendar.titleFormatter' },
  { name: 'activeColor', type: 'string', default: "'#1677ff'", required: false, desc: 'componentProps.calendar.activeColor' },
  { name: 'dayRender', type: '(day: DayInfo) => JSX.Element', default: '—', required: false, desc: 'componentProps.calendar.dayRender' },
  { name: 'maxCount', type: 'number', default: '—', required: false, desc: 'componentProps.calendar.maxCount' },
  { name: 'maxRange', type: 'number', default: '—', required: false, desc: 'componentProps.calendar.maxRange' },
  { name: 'showConfirm', type: 'boolean', default: 'false', required: false, desc: 'componentProps.calendar.showConfirm' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: 'componentProps.calendar.readonly' },
  { name: 'lunar', type: 'boolean', default: 'false', required: false, desc: 'componentProps.calendar.lunar' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'componentProps.calendar.teleport' },
];

const cssVarRows: PropRow[] = [
  { name: '--sc-calendar-bg', type: 'color', default: '#fff', required: false, desc: 'cssVars.Calendar.__sc_calendar_bg' },
  { name: '--sc-calendar-text', type: 'color', default: '#1f2937', required: false, desc: 'cssVars.Calendar.__sc_calendar_text' },
  { name: '--sc-calendar-title-height', type: 'dimension', default: '44px', required: false, desc: 'cssVars.Calendar.__sc_calendar_title_height' },
  { name: '--sc-calendar-weekday-height', type: 'dimension', default: '30px', required: false, desc: 'cssVars.Calendar.__sc_calendar_weekday_height' },
  { name: '--sc-calendar-day-size', type: 'dimension', default: '64px', required: false, desc: 'cssVars.Calendar.__sc_calendar_day_size' },
  { name: '--sc-calendar-month-gap', type: 'dimension', default: '20px', required: false, desc: 'cssVars.Calendar.__sc_calendar_month_gap' },
  { name: '--sc-calendar-active-bg', type: 'color', default: 'var(--sc-color-primary, #1677ff)', required: false, desc: 'cssVars.Calendar.__sc_calendar_active_bg' },
  { name: '--sc-calendar-active-color', type: 'color', default: '#fff', required: false, desc: 'cssVars.Calendar.__sc_calendar_active_color' },
  { name: '--sc-calendar-today-border', type: 'color', default: 'var(--sc-color-primary, #1677ff)', required: false, desc: 'cssVars.Calendar.__sc_calendar_today_border' },
  { name: '--sc-calendar-other-month', type: 'color', default: '#d1d5db', required: false, desc: 'cssVars.Calendar.__sc_calendar_other_month' },
  { name: '--sc-calendar-disabled-opacity', type: 'number', default: '0.3', required: false, desc: 'cssVars.Calendar.__sc_calendar_disabled_opacity' },
  { name: '--sc-calendar-mark-color', type: 'color', default: '#f5f5f7', required: false, desc: 'cssVars.Calendar.__sc_calendar_mark_color' },
  { name: '--sc-calendar-header-shadow', type: 'shadow', default: '0 5px 20px rgba(0,0,0,0.05)', required: false, desc: 'cssVars.Calendar.__sc_calendar_header_shadow' },
  { name: '--sc-calendar-confirm-height', type: 'dimension', default: '50px', required: false, desc: 'cssVars.Calendar.__sc_calendar_confirm_height' },
  { name: '--sc-calendar-confirm-color', type: 'color', default: 'var(--sc-color-primary, #1677ff)', required: false, desc: 'cssVars.Calendar.__sc_calendar_confirm_color' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'cssvars', title: 'CSS Variables' },
  { id: 'demo', title: 'Examples' },
];

const fmt = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

const PopupSingle = () => {
  const t = useT();
  const pt = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [date, setDate] = createSignal<Date | null>(null);
  return (
    <>
      <Cell title={t('demo.calendarSingle')} value={date() ? fmt(date()!) : 'Please Select'} clickable onClick={() => setShow(true)} />
      <Calendar show={show()} onUpdateShow={setShow} value={date() || undefined} onChange={(v) => { setDate(v as Date); setShow(false); }} closeable teleport={pt?.()} />
    </>
  );
};

const PopupRange = () => {
  const t = useT();
  const pt = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [range, setRange] = createSignal<[Date, Date] | null>(null);
  return (
    <>
      <Cell title={t('demo.calendarRange')} value={range() ? `${fmt(range()![0])} ~ ${fmt(range()![1])}` : 'Please Select'} clickable onClick={() => setShow(true)} />
      <Calendar type="range" showConfirm show={show()} onUpdateShow={setShow} value={range() || undefined} onChange={(v) => { setRange(v as [Date, Date]); }} closeable teleport={pt?.()} />
    </>
  );
};

const PopupColor = () => {
  const t = useT();
  const pt = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [range, setRange] = createSignal<[Date, Date] | null>(null);
  return (
    <>
      <Cell title={t('demo.customColor')} value={range() ? `${fmt(range()![0])} ~ ${fmt(range()![1])}` : 'Please Select'} clickable onClick={() => setShow(true)} />
      <Calendar type="range" showConfirm show={show()} onUpdateShow={setShow} value={range() || undefined} onChange={(v) => setRange(v as [Date, Date])} closeable activeColor="#22c55e" dayRender={(d) => d.isToday ? <span style="font-weight:800">今</span> : <>{d.day}</>} teleport={pt?.()} />
    </>
  );
};

// Simulated holiday/special dates
const specialDates: Record<string, { label: string; color: string }> = {};
const now = new Date();
const y = now.getFullYear(), m = now.getMonth() + 1;
// Mark all weekends as "休"
for (let d = 1; d <= 31; d++) {
  const date = new Date(y, m - 1, d);
  if (date.getMonth() + 1 !== m) continue;
  const dow = date.getDay();
  if (dow === 0 || dow === 6) specialDates[`${y}-${m}-${d}`] = { label: 'Off', color: '#f59e0b' };
}
// Mark some as holidays
specialDates[`${y}-${m}-1`] = { label: 'Holiday', color: '#ef4444' };
specialDates[`${y}-${m}-15`] = { label: 'Holiday', color: '#ef4444' };

const PopupHoliday = () => {
  const t = useT();
  const pt = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [date, setDate] = createSignal<Date | null>(null);
  return (
    <>
      <Cell title={t('demo.calendarHoliday')} value={date() ? fmt(date()!) : 'Please Select'} clickable onClick={() => setShow(true)} />
      <Show when={date()}><span class={css.result}>{fmt(date()!)}</span></Show>
      <Calendar
        show={show()} onUpdateShow={setShow}
        value={date() || undefined}
        onChange={(v) => { setDate(v as Date); setShow(false); }}
        title="Select Date" closeable
        dayRender={(d) => {
          const key = `${d.year}-${d.month}-${d.day}`;
          const spec = specialDates[key];
          return (
            <span style="display:flex;flex-direction:column;align-items:center;line-height:1.2">
              <span>{d.day}</span>
              {spec && <span style={`font-size:0.65rem;color:${spec.color};font-weight:600`}>{spec.label}</span>}
            </span>
          );
        }}
        teleport={pt?.()}
      />
    </>
  );
};

export const CalendarDocPage = () => {
  const t = useT();
  return (
    <DocLayout>
    <div class={css.page}>
      <h1 class={css.h1}>Calendar</h1>
      <p class={css.intro}>
        {t('componentIntro.CalendarIntro')}
      </p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="cssvars" class={css.h2}>{t('common.cssVars')}</h2>
      <p class={css.intro} style="margin-bottom:1rem">Via <code>:root</code> or component <code>style</code> 覆盖以下变量。</p>
      <PropsTable rows={cssVarRows} />

      <h2 id="demo" class={css.h2}>{t('demo.examples')}</h2>

      <DemoBlock title={t('demo.calendarSingle')} desc={t('demoDesc.calendar_single')} code={`const [show, setShow] = createSignal(false);\n\n<Calendar\n  show={show()}\n  onUpdateShow={setShow}\n  value={date()}\n  onChange={(v) => { setDate(v); setShow(false); }}\n  closeable\n/>`}>
        <PopupSingle />
      </DemoBlock>

      <DemoBlock title={t('demo.calendarRange')} desc={t('demoDesc.calendar_range')} code={`<Calendar\n  type="range"\n  showConfirm\n  show={show()}\n  onUpdateShow={setShow}\n  closeable\n/>`}>
        <PopupRange />
      </DemoBlock>

      <DemoBlock title={t('demo.calendarCustom')} desc={t('demoDesc.calendar_custom')} code={`<Calendar\n  type="range"\n  showConfirm\n  activeColor="#22c55e"\n  dayRender={(d) => d.isToday ? <strong>今</strong> : d.day}\n  show={show()}\n  onUpdateShow={setShow}\n/>`}>
        <PopupColor />
      </DemoBlock>

      <DemoBlock
        title={t('demo.calendarHoliday')}
        desc={t('demoDesc.calendar_holidays')}
        code={`// Build special date map\nconst special = { '2026-6-1': { label: 'Holiday', color: '#ef4444' } };\n\n<Calendar\n  dayRender={(d) => {\n    const spec = special[\`$\{d.year}-$\{d.month}-$\{d.day}\`];\n    return (\n      <span>\n        <span>{d.day}</span>\n        {spec && <small style={{color:spec.color}}>{spec.label}</small>}\n      </span>\n    );\n  }}\n  show={show()}\n  onUpdateShow={setShow}\n  title="Select Date"\n/>`}
      >
        <PopupHoliday />
      </DemoBlock>

      <DemoBlock title={t('demo.calendarInline')} desc={t('demoDesc.calendar_inline')} code={'<Calendar popup={false} />'}>
        <Calendar popup={false} />
      </DemoBlock>

      <DemoBlock title={t('demo.calendarLunar')} desc={t('demoDesc.calendar_lunar')} code={'<Calendar popup={false} lunar />'}>
        <Calendar popup={false} lunar />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
