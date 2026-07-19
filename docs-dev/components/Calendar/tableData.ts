import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useCalendarTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'type', type: "'single' | 'multiple' | 'range'", def: "'single'", desc: 'calendar.props.type' },
      { name: 'value', type: 'Date | Date[] | [Date, Date]', def: '—', desc: 'calendar.props.value' },
      { name: 'onChange', type: '(value: Date | Date[] | [Date, Date]) => void', def: '—', desc: 'calendar.props.onChange' },
      { name: 'minDate', type: 'Date', def: '—', desc: 'calendar.props.minDate' },
      { name: 'maxDate', type: 'Date', def: '—', desc: 'calendar.props.maxDate' },
      { name: 'defaultDate', type: 'Date', def: '—', desc: 'calendar.props.defaultDate' },
      { name: 'firstDayOfWeek', type: 'number', def: '0', desc: 'calendar.props.firstDayOfWeek' },
      { name: 'weekdays', type: 'string[]', def: "['Sun','Mon',...] / ['日','一',...]", desc: 'calendar.props.weekdays' },
      { name: 'titleFormatter', type: '(year: number, month: number) => string', def: '—', desc: 'calendar.props.titleFormatter' },
      { name: 'activeColor', type: 'string', def: "'#1677ff'", desc: 'calendar.props.activeColor' },
      { name: 'dayRender', type: '(day: DayInfo) => JSX.Element', def: '—', desc: 'calendar.props.dayRender' },
      { name: 'maxCount', type: 'number', def: '—', desc: 'calendar.props.maxCount' },
      { name: 'maxRange', type: 'number', def: '—', desc: 'calendar.props.maxRange' },
      { name: 'formatter', type: '(date: Date) => string', def: '—', desc: 'calendar.props.formatter' },
      { name: 'showConfirm', type: 'boolean', def: 'false', desc: 'calendar.props.showConfirm' },
      { name: 'confirmText', type: 'string | JSX.Element', def: '—', desc: 'calendar.props.confirmText' },
      { name: 'confirmDisabledText', type: 'string | JSX.Element', def: '—', desc: 'calendar.props.confirmDisabledText' },
      { name: 'readonly', type: 'boolean', def: 'false', desc: 'calendar.props.readonly' },
      { name: 'lunar', type: 'boolean', def: 'false', desc: 'calendar.props.lunar' },
      { name: 'popup', type: 'boolean', def: 'true', desc: 'calendar.props.popup' },
      { name: 'show', type: 'boolean', def: '—', desc: 'calendar.props.show' },
      { name: 'onUpdateShow', type: '(show: boolean) => void', def: '—', desc: 'calendar.props.onUpdateShow' },
      { name: 'title', type: 'string | JSX.Element', def: '—', desc: 'calendar.props.title' },
      { name: 'onClose', type: '() => void', def: '—', desc: 'calendar.props.onClose' },
      { name: 'closeable', type: 'boolean', def: 'false', desc: 'calendar.props.closeable' },
      { name: 'round', type: 'boolean', def: '—', desc: 'calendar.props.round' },
      { name: 'teleport', type: 'string | Element', def: 'document.body', desc: 'calendar.props.teleport' },
      { name: 'zIndex', type: 'number | string', def: '—', desc: 'calendar.props.zIndex' },
      { name: 'class', type: 'string', def: '—', desc: 'calendar.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'calendar.props.style' },
    ],
  }];

  const dayInfoTables: TableSection[] = [{
    title: 'DayInfo',
    rows: [
      { name: 'year', type: 'number', def: '—', desc: 'calendar.optionProps.year' },
      { name: 'month', type: 'number', def: '—', desc: 'calendar.optionProps.month' },
      { name: 'day', type: 'number', def: '—', desc: 'calendar.optionProps.day' },
      { name: 'date', type: 'Date', def: '—', desc: 'calendar.optionProps.date' },
      { name: 'isCurrentMonth', type: 'boolean', def: '—', desc: 'calendar.optionProps.isCurrentMonth' },
      { name: 'isToday', type: 'boolean', def: '—', desc: 'calendar.optionProps.isToday' },
      { name: 'isDisabled', type: 'boolean', def: '—', desc: 'calendar.optionProps.isDisabled' },
      { name: 'lunarText', type: 'string', def: '—', desc: 'calendar.optionProps.lunarText' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Calendar',
    rows: [
      { name: '--sc-calendar-bg', type: 'color', def: '#fff', desc: 'calendar.cssVars.--sc-calendar-bg' },
      { name: '--sc-calendar-text', type: 'color', def: '#1f2937', desc: 'calendar.cssVars.--sc-calendar-text' },
      { name: '--sc-calendar-weekday-color', type: 'color', def: '#9ca3af', desc: 'calendar.cssVars.--sc-calendar-weekday-color' },
      { name: '--sc-calendar-title-height', type: 'length', def: '44px', desc: 'calendar.cssVars.--sc-calendar-title-height' },
      { name: '--sc-calendar-weekday-height', type: 'length', def: '30px', desc: 'calendar.cssVars.--sc-calendar-weekday-height' },
      { name: '--sc-calendar-day-size', type: 'length', def: '64px', desc: 'calendar.cssVars.--sc-calendar-day-size' },
      { name: '--sc-calendar-month-gap', type: 'length', def: '20px', desc: 'calendar.cssVars.--sc-calendar-month-gap' },
      { name: '--sc-calendar-active-bg', type: 'color', def: 'var(--sc-color-primary, #1677ff)', desc: 'calendar.cssVars.--sc-calendar-active-bg' },
      { name: '--sc-calendar-active-color', type: 'color', def: '#fff', desc: 'calendar.cssVars.--sc-calendar-active-color' },
      { name: '--sc-calendar-today-border', type: 'color', def: 'var(--sc-color-primary, #1677ff)', desc: 'calendar.cssVars.--sc-calendar-today-border' },
      { name: '--sc-calendar-other-month', type: 'color', def: '#d1d5db', desc: 'calendar.cssVars.--sc-calendar-other-month' },
      { name: '--sc-calendar-disabled-opacity', type: 'number', def: '0.3', desc: 'calendar.cssVars.--sc-calendar-disabled-opacity' },
      { name: '--sc-calendar-mark-color', type: 'color', def: '#f5f5f7', desc: 'calendar.cssVars.--sc-calendar-mark-color' },
      { name: '--sc-calendar-header-shadow', type: 'shadow', def: '0 5px 20px rgba(0,0,0,0.05)', desc: 'calendar.cssVars.--sc-calendar-header-shadow' },
      { name: '--sc-calendar-confirm-height', type: 'length', def: '50px', desc: 'calendar.cssVars.--sc-calendar-confirm-height' },
      { name: '--sc-calendar-confirm-color', type: 'color', def: 'var(--sc-color-primary, #1677ff)', desc: 'calendar.cssVars.--sc-calendar-confirm-color' },
    ],
  }];

  return { propsTables, dayInfoTables, cssVarsTables };
}
