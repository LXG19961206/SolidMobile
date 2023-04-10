import { Accessor, JSXElement, Setter } from "solid-js"

export const CalendarTypeDict = {
  single: 'single',
  multiple: 'multiple',
  range: 'range'
} as const

export interface BaseCalendarProps {
  type: keyof typeof CalendarTypeDict,
  title: string | JSXElement,
  color: string,
  minDate: Date,
  maxDate: Date,
  defaultDate: Date,
  rowHeight: number | string,
  formatter: (dateStr: string) => string,
  lazyRender: boolean,
  maxCount: number,
  showMark: boolean,
  poppable: boolean,
  showTitle: boolean,
  showSubTitle: boolean,
  readonly: boolean,
  confirmText: string | JSXElement,
  confirmDisabledText: string | JSXElement,
  onChange: (selected: string []) => unknown
}

export interface PopCalendarProps extends BaseCalendarProps {
  poppable: true,
  bindShow: [Accessor<boolean>, Setter<boolean>],
  round: boolean,
  closeOnClickOverlay: boolean,
  portal: Node
}

export interface RangeCalendarProps extends BaseCalendarProps {
  type: typeof CalendarTypeDict.range,
  maxRange: number | string,
  rangePrompt: string | JSXElement,
  allSameDay: boolean
}

export interface MulCalendarProps extends BaseCalendarProps {
  type: typeof CalendarTypeDict.multiple,
  maxRange: number | string,
  rangePrompt: string | JSXElement,
}