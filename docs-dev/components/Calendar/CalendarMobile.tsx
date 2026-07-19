import { createSignal, For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Calendar } from '../../../src/components/Calendar';
import type { DayInfo } from '../../../src/components/Calendar';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCalendarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

/* ── Helpers ── */
const fmt = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

/* ── Holiday data (current & previous month) ── */
const now = new Date();
const y = now.getFullYear();
const m = now.getMonth();
const specialDates: Record<string, { label: string; color: string }> = {};
// Mark weekends and special dates for current & previous month
for (let monthOffset = 0; monthOffset <= 1; monthOffset++) {
  const targetM = m - monthOffset;
  const targetY = targetM < 0 ? y - 1 : y;
  const realM = targetM < 0 ? targetM + 12 : targetM;
  const daysInM = new Date(targetY, realM + 1, 0).getDate();
  for (let d = 1; d <= daysInM; d++) {
    const date = new Date(targetY, realM, d);
    const dow = date.getDay();
    if (dow === 0 || dow === 6) specialDates[`${targetY}-${realM + 1}-${d}`] = { label: 'Off', color: '#f59e0b' };
  }
}
// Specific holidays (both months)
specialDates[`${y}-${m + 1}-1`] = { label: 'Holiday', color: '#ef4444' };
specialDates[`${y}-${m + 1}-15`] = { label: 'Holiday', color: '#ef4444' };
(() => {
  const prev = new Date(y, m - 1, 1);
  const py = prev.getFullYear(), pm = prev.getMonth() + 1;
  specialDates[`${py}-${pm}-1`] = { label: 'Holiday', color: '#ef4444' };
  specialDates[`${py}-${pm}-15`] = { label: 'Holiday', color: '#ef4444' };
})();

/* ── Fancy event data for custom render demo ── */
const events: Record<string, { emoji: string; label: string; bg: string; color: string }> = {};
const emojiPool = [
  { emoji: '🎂', label: 'B-day', bg: '#fef3c7', color: '#d97706' },
  { emoji: '🎉', label: 'Party', bg: '#ede9fe', color: '#7c3aed' },
  { emoji: '🏀', label: 'Game', bg: '#dbeafe', color: '#2563eb' },
  { emoji: '✈️', label: 'Trip', bg: '#d1fae5', color: '#059669' },
  { emoji: '💡', label: 'Idea', bg: '#fef9c3', color: '#ca8a04' },
  { emoji: '🎵', label: 'Music', bg: '#fce7f3', color: '#db2777' },
];
// Scatter events across current & previous month so demo is visible from the start
for (let monthOffset = 0; monthOffset <= 1; monthOffset++) {
  const targetM = m - monthOffset; // m=current, m-1=previous
  const targetY = targetM < 0 ? y - 1 : y;
  const realM = targetM < 0 ? targetM + 12 : targetM;
  const daysInM = new Date(targetY, realM + 1, 0).getDate();
  for (let d = 1; d <= daysInM; d++) {
    if (Math.random() > 0.25) continue;
    const e = emojiPool[Math.floor(Math.random() * emojiPool.length)];
    events[`${targetY}-${realM + 1}-${d}`] = e;
  }
}
// Guarantee anchor events on current month
events[`${y}-${m + 1}-3`] = { emoji: '🎂', label: 'B-day', bg: '#fef3c7', color: '#d97706' };
events[`${y}-${m + 1}-10`] = { emoji: '🎉', label: 'Party', bg: '#ede9fe', color: '#7c3aed' };
events[`${y}-${m + 1}-18`] = { emoji: '✈️', label: 'Trip', bg: '#d1fae5', color: '#059669' };
events[`${y}-${m + 1}-25`] = { emoji: '🏀', label: 'Game', bg: '#dbeafe', color: '#2563eb' };
// Guarantee anchor events on previous month
(() => {
  const prev = new Date(y, m - 1, 1);
  const py = prev.getFullYear(), pm = prev.getMonth() + 1;
  events[`${py}-${pm}-3`] = { emoji: '💡', label: 'Idea', bg: '#fef9c3', color: '#ca8a04' };
  events[`${py}-${pm}-12`] = { emoji: '🎵', label: 'Music', bg: '#fce7f3', color: '#db2777' };
  events[`${py}-${pm}-20`] = { emoji: '🎉', label: 'Party', bg: '#ede9fe', color: '#7c3aed' };
})();

/* ── Fancy dayRender for custom render demo ── */
const fancyDayRender = (d: DayInfo) => {
  const key = `${d.year}-${d.month}-${d.day}`;
  const ev = events[key];
  if (!ev) return <>{d.day}</>;
  return (
    <span style={{
      display: 'flex', 'flex-direction': 'column', 'align-items': 'center',
      background: ev.bg, 'border-radius': '50%', width: '44px', height: '44px',
      'justify-content': 'center', 'line-height': 1,
    }}>
      <span style={{ 'font-size': '1.15rem' }}>{ev.emoji}</span>
      <span style={{ 'font-size': '0.55rem', 'font-weight': 700, color: ev.color }}>{ev.label}</span>
    </span>
  );
};

/* ── Holiday dayRender ── */
const holidayDayRender = (d: DayInfo) => {
  const key = `${d.year}-${d.month}-${d.day}`;
  const spec = specialDates[key];
  return (
    <span style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', 'line-height': 1.2 }}>
      <span>{d.day}</span>
      {spec && <span style={{ 'font-size': '0.6rem', color: spec.color, 'font-weight': 600 }}>{spec.label}</span>}
    </span>
  );
};

export const CalendarMobile = () => {
  const t = useT();
  const { propsTables, dayInfoTables, cssVarsTables } = useCalendarTableData();

  // Popup signals
  const [open, setOpen] = createSignal('');
  const [singleVal, setSingleVal] = createSignal<Date | undefined>();
  const [rangeVal, setRangeVal] = createSignal<[Date, Date] | undefined>();
  const [customVal, setCustomVal] = createSignal<[Date, Date] | undefined>();
  const [holidayVal, setHolidayVal] = createSignal<Date | undefined>();
  const [multipleVal, setMultipleVal] = createSignal<Date[]>([]);

  const singleLabel = () => singleVal() ? fmt(singleVal()!) : 'Select';
  const rangeLabel = () => rangeVal() ? `${fmt(rangeVal()![0])} ~ ${fmt(rangeVal()![1])}` : 'Select';
  const customLabel = () => customVal() ? `${fmt(customVal()![0])} ~ ${fmt(customVal()![1])}` : 'Select';
  const holidayLabel = () => holidayVal() ? fmt(holidayVal()!) : 'Select';

  return (
    <MobilePreview title="Calendar">
      <MobilePropsSheet propsTables={[...propsTables, ...dayInfoTables]} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px 0 0' }}>
        {/* Popup triggers */}
        <CellGroup card>
          <Cell title={t('calendar.demo.single')} value={singleLabel()} clickable onClick={() => setOpen('single')} />
          <Cell title={t('calendar.demo.range')} value={rangeLabel()} clickable onClick={() => setOpen('range')} />
          <Cell title={t('calendar.demo.customRender')} value={customLabel()} description="Color + emoji + event badges" clickable onClick={() => setOpen('custom')} />
          <Cell title={t('calendar.demo.holiday')} value={holidayLabel()} description="Weekends & holidays" clickable onClick={() => setOpen('holiday')} />
        </CellGroup>

        {/* Inline demos */}
        <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('calendar.demo.inline')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('calendar.demoDesc.inline')}</div>
            <Calendar popup={false} type="single" value={new Date()} />
          </div>

          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('calendar.demo.lunar')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('calendar.demoDesc.lunar')}</div>
            <Calendar popup={false} lunar />
          </div>

          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('calendar.demo.multiple')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('calendar.demoDesc.multiple')}</div>
            <Calendar
              popup={false}
              type="multiple"
              maxCount={3}
              value={multipleVal()}
              onChange={(v) => setMultipleVal(v as Date[])}
            />
            <div style={{ padding: '0 16px 12px', 'font-size': '0.8rem', color: '#6b7280' }}>
              {multipleVal().length ? multipleVal().map(fmt).join(', ') : 'Tap to select (max 3)'}
            </div>
          </div>
        </div>

        {/* ── Popup Calendars ── */}
        <Calendar
          show={open() === 'single'}
          onUpdateShow={(v) => { if (!v) setOpen(''); }}
          value={singleVal()}
          onChange={(v) => { setSingleVal(v as Date); setOpen(''); }}
          title="Select Date"
          closeable
        />
        <Calendar
          type="range"
          showConfirm
          show={open() === 'range'}
          onUpdateShow={(v) => { if (!v) setOpen(''); }}
          value={rangeVal()}
          onChange={(v) => setRangeVal(v as [Date, Date])}
          closeable
        />
        <Calendar
          type="range"
          showConfirm
          show={open() === 'custom'}
          onUpdateShow={(v) => { if (!v) setOpen(''); }}
          value={customVal()}
          onChange={(v) => setCustomVal(v as [Date, Date])}
          activeColor="#ec4899"
          dayRender={fancyDayRender}
          title="Fancy Events"
          closeable
        />
        <Calendar
          show={open() === 'holiday'}
          onUpdateShow={(v) => { if (!v) setOpen(''); }}
          value={holidayVal()}
          onChange={(v) => { setHolidayVal(v as Date); setOpen(''); }}
          dayRender={holidayDayRender}
          title="Select Date"
          closeable
        />
      </div>
    </MobilePreview>
  );
};
