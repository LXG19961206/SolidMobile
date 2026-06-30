import {
  createSignal, createMemo, createEffect, on, onMount,
  Show, For, mergeProps, splitProps, type Component,
} from 'solid-js';
import { cn } from '../../utils';
import { Popup } from '../Popup';
import { useLocale, useT } from '../../i18n';
import { solarToLunar } from '../../utils/lunar';
import type { CalendarProps, DayInfo } from './types';
import styles from './Calendar.module.css';

/* ── Date helpers ── */
function daysInMonth(y: number, m: number) { return new Date(y, m, 0).getDate(); }
function makeDate(y: number, m: number, d: number) { return new Date(y, m - 1, d); }
function sameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

const MS_DAY = 86400000;

interface MonthInfo {
  year: number; month: number; totalDays: number; firstDow: number;
  rows: number; date: Date;
}

function buildMonths(min: Date, max: Date, firstDayOfWeek: number): MonthInfo[] {
  const result: MonthInfo[] = [];
  const endY = max.getFullYear(), endM = max.getMonth() + 1;
  let y = min.getFullYear(), m = min.getMonth() + 1;
  while (y < endY || (y === endY && m <= endM)) {
    const total = daysInMonth(y, m);
    const dow = new Date(y, m - 1, 1).getDay();
    const offset = (dow - firstDayOfWeek + 7) % 7;
    const rows = Math.ceil((total + offset) / 7);
    result.push({ year: y, month: m, totalDays: total, firstDow: dow, rows, date: makeDate(y, m, 1) });
    if (m === 12) { y++; m = 1; } else { m++; }
  }
  return result;
}

function buildDays(month: MonthInfo, today: Date, min: Date, max: Date, firstDayOfWeek: number, lunar?: boolean): DayInfo[] {
  const { year, month: mm, totalDays } = month;
  const offset = (month.firstDow - firstDayOfWeek + 7) % 7;
  const result: DayInfo[] = [];
  const minTime = new Date(min.getFullYear(), min.getMonth(), min.getDate()).getTime();
  const maxTime = new Date(max.getFullYear(), max.getMonth(), max.getDate()).getTime();

  function makeInfo(y: number, m: number, d: number, isCurrent: boolean): DayInfo {
    const date = makeDate(y, m, d);
    const time = date.getTime();
    const info: DayInfo = {
      year: y, month: m, day: d, date,
      isCurrentMonth: isCurrent,
      isToday: sameDay(date, today),
      isDisabled: time < minTime || time > maxTime,
    };
    if (lunar && isCurrent) {
      const ld = solarToLunar(date);
      info.lunarText = ld.solarTerm || (ld.day === 1 ? ld.monthName : ld.dayName);
    }
    return info;
  }

  // Prev month fill
  if (offset > 0) {
    const prevM = mm === 1 ? 12 : mm - 1;
    const prevY = mm === 1 ? year - 1 : year;
    const prevTotal = daysInMonth(prevY, prevM);
    for (let i = offset - 1; i >= 0; i--) {
      const d = prevTotal - i;
      result.push(makeInfo(prevY, prevM, d, false));
    }
  }

  // Current month
  for (let d = 1; d <= totalDays; d++) {
    result.push(makeInfo(year, mm, d, true));
  }

  // Fill to complete rows
  while (result.length < month.rows * 7) {
    const idx = result.length;
    const fillM = mm === 12 ? 1 : mm + 1;
    const fillY = mm === 12 ? year + 1 : year;
    const d = idx - offset - totalDays + 1;
    result.push(makeInfo(fillY, fillM, d, false));
  }

  return result;
}

const WEEKS = ['日', '一', '二', '三', '四', '五', '六'];

const defaultProps: Partial<CalendarProps> = {
  type: 'single',
  firstDayOfWeek: 0,
  popup: true,
};

export const Calendar: Component<CalendarProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'type', 'value', 'onChange', 'minDate', 'maxDate', 'defaultDate',
    'firstDayOfWeek', 'weekdays', 'titleFormatter', 'activeColor', 'dayRender',
    'maxCount', 'maxRange',
    'showConfirm', 'confirmText', 'confirmDisabledText', 'readonly', 'lunar',
    'popup', 'show', 'onUpdateShow', 'title', 'onClose', 'closeable',
    'round', 'teleport', 'zIndex', 'class', 'style',
  ]);

  const t = useT();
  const today = new Date();
  const min = () => local.minDate || new Date(+today - 30 * MS_DAY);
  const max = () => local.maxDate || new Date(+today + 30 * MS_DAY);

  // Auto-select i18n defaults based on locale (props always override).
  // useLocale() is called inside getters so Solid tracks signal changes.
  const weekdays = () => local.weekdays || (useLocale() === 'en-US'
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : WEEKS);
  const titleText = () => {
    const m = activeMonth();
    if (!m) return '';
    if (local.titleFormatter) return local.titleFormatter(m.year, m.month);
    return useLocale() === 'en-US' ? `${m.month}/${m.year}` : `${m.year}年 ${m.month}月`;
  };

  // Generate all months
  const months = createMemo(() => buildMonths(min(), max(), local.firstDayOfWeek!));

  // Selection state
  const [selected, setSelected] = createSignal<Date[]>([]);
  const [rangeStart, setRangeStart] = createSignal<Date | null>(null);
  const [rangeEnd, setRangeEnd] = createSignal<Date | null>(null);

  // Active month (tracked by scroll)
  const [activeIdx, setActiveIdx] = createSignal(0);
  let contentRef!: HTMLDivElement;
  let monthRefs: HTMLDivElement[] = [];

  function onScroll() {
    if (!contentRef) return;
    const st = contentRef.scrollTop;
    let idx = 0;
    let acc = 0;
    for (let i = 0; i < monthRefs.length; i++) {
      const h = monthRefs[i]?.offsetHeight || 0;
      if (st < acc + h / 2) { idx = i; break; }
      acc += h;
      idx = i;
    }
    setActiveIdx(idx);
  }

  // Selection logic — only match current-month days
  function isSelected(d: DayInfo) { return d.isCurrentMonth && selected().some(s => sameDay(s, d.date)); }
  function isInRange(d: DayInfo) {
    if (local.type !== 'range' || !d.isCurrentMonth) return false;
    const s = rangeStart(), e = rangeEnd();
    if (!s) return false;
    if (!e) return sameDay(s, d.date);
    return d.date >= s && d.date <= e;
  }
  function rangeEdge(d: DayInfo): 'start' | 'end' | null {
    if (local.type !== 'range' || !d.isCurrentMonth) return null;
    if (rangeStart() && sameDay(rangeStart()!, d.date)) return 'start';
    if (rangeEnd() && sameDay(rangeEnd()!, d.date)) return 'end';
    return null;
  }

  function handleClick(d: DayInfo) {
    if (d.isDisabled || local.readonly || !d.isCurrentMonth) return;
    if (local.type === 'single') {
      setSelected([d.date]);
      local.onChange?.(d.date);
      if (local.popup) local.onUpdateShow?.(false);
    } else if (local.type === 'multiple') {
      const idx = selected().findIndex(s => sameDay(s, d.date));
      if (idx >= 0) {
        const next = selected().filter((_, i) => i !== idx);
        setSelected(next);
        local.onChange?.(next);
      } else {
        if (local.maxCount && selected().length >= local.maxCount) return;
        const next = [...selected(), d.date];
        setSelected(next);
        local.onChange?.(next);
      }
    } else if (local.type === 'range') {
      if (!rangeStart() || (rangeStart() && rangeEnd())) {
        setRangeStart(d.date);
        setRangeEnd(null);
      } else {
        const s = rangeStart()!;
        if (d.date < s) { setRangeStart(d.date); setRangeEnd(s); local.onChange?.([d.date, s]); }
        else {
          if (local.maxRange && Math.ceil((+d.date - +s) / MS_DAY) > local.maxRange) return;
          setRangeEnd(d.date);
          local.onChange?.([s, d.date]);
        }
      }
    }
  }

  function closeAfterChange() {
    if (local.popup) local.onUpdateShow?.(false);
  }

  const activeMonth = () => months()[activeIdx()];

  // Init value
  createEffect(on(() => local.value, (v) => {
    if (!v) return;
    if (local.type === 'single' && v instanceof Date) setSelected([v]);
    else if (local.type === 'multiple' && Array.isArray(v)) setSelected(v as Date[]);
    else if (local.type === 'range' && Array.isArray(v) && v.length === 2) {
      const [s, e] = v as [Date, Date];
      setRangeStart(s); setRangeEnd(e);
    }
  }));

  const calendarEl = (
    <div
      class={cn(styles.wrapper, local.class)}
      style={{
        ...(local.activeColor ? {
          '--sc-calendar-active-bg': local.activeColor,
          '--sc-calendar-confirm-color': local.activeColor,
        } : {}),
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
    >
      {/* Sticky header — hidden in popup mode (popup has its own sheet header) */}
      <Show when={!local.popup}>
        <div class={styles.header}>
          <div class={styles.headerTitle}>{titleText()}</div>
        </div>
      </Show>
      <div class={cn(styles.header, local.popup && styles.popupHeader)}>
        <div class={styles.weekdays}>
          <For each={weekdays()}>{(w) => <span class={styles.weekday}>{w}</span>}</For>
        </div>
      </div>

      {/* Scrollable months */}
      <div ref={contentRef!} class={styles.content} onScroll={onScroll}>
        <For each={months()}>
          {(month, mi) => {
            const days = createMemo(() => buildDays(month, today, min(), max(), local.firstDayOfWeek!, local.lunar));
            return (
              <div
                ref={(el) => { monthRefs[mi()] = el; }}
                class={styles.monthBlock}
              >
                <div class={styles.monthMark}>{month.month}</div>
                <div class={styles.monthGrid}>
                  <For each={days()}>
                    {(d) => {
                      const edge = rangeEdge(d);
                      const startOrEnd = edge === 'start' || edge === 'end';
                      const inner = local.dayRender && d.isCurrentMonth
                        ? local.dayRender(d)
                        : startOrEnd ? (
                          <>
                            <span class={styles.dayNum}>{d.day}</span>
                            <span class={styles.dayLabel}>{edge === 'start' ? '开始' : '结束'}</span>
                          </>
                        ) : (
                          <>
                            <span class={styles.dayNum}>{d.day}</span>
                            {d.lunarText && <span class={styles.lunarText}>{d.lunarText}</span>}
                          </>
                        );

                      return (
                        <span
                          class={cn(
                            styles.day,
                            !d.isCurrentMonth && styles.otherMonth,
                            d.isDisabled && styles.disabled,
                            d.isToday && styles.today,
                            isSelected(d) && styles.active,
                            isInRange(d) && styles.inRange,
                            edge === 'start' && styles.rangeStart,
                            edge === 'end' && styles.rangeEnd,
                          )}
                          onClick={() => handleClick(d)}
                        >
                          {inner}
                        </span>
                      );
                    }}
                  </For>
                </div>
              </div>
            );
          }}
        </For>
      </div>

      {/* Confirm */}
      <Show when={local.showConfirm && local.type === 'range'}>
        <div class={styles.confirm}>
          <button
            class={styles.confirmBtn}
            disabled={!rangeStart() || !rangeEnd()}
            onClick={() => { if (rangeStart() && rangeEnd()) { local.onChange?.([rangeStart()!, rangeEnd()!]); if (local.popup) local.onUpdateShow?.(false); } }}
          >
            {rangeStart() && rangeEnd() ? local.confirmText || t('component.calendar.confirmText') : local.confirmDisabledText || t('component.calendar.confirmDisabledText')}
          </button>
        </div>
      </Show>
    </div>
  );

  return (
    <Show when={!local.popup} fallback={
      <Popup
        show={local.show ?? false}
        onUpdateShow={local.onUpdateShow}
        title={local.title || titleText()}
        closeable={local.closeable}
        round={local.round}
        teleport={local.teleport}
        zIndex={local.zIndex}
        onClose={local.onClose}
      >
        {calendarEl}
      </Popup>
    }>
      {calendarEl}
    </Show>
  );
};
