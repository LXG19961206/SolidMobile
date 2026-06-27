import type { JSX } from 'solid-js';

export type CalendarType = 'single' | 'multiple' | 'range';

export interface CalendarProps {
  /** 选择模式，默认 'single' */
  type?: CalendarType;
  /** 当前值：single → Date，multiple → Date[]，range → [Date, Date] */
  value?: Date | Date[] | [Date, Date];
  /** 值变化回调 */
  onChange?: (value: Date | Date[] | [Date, Date]) => void;
  /** 最小可选日期 */
  minDate?: Date;
  /** 最大可选日期 */
  maxDate?: Date;
  /** 默认展示的月份，默认当天 */
  defaultDate?: Date;
  /** 一周起始日，0=周日 1=周一，默认 0 */
  firstDayOfWeek?: number;
  /** 自定义星期标题，默认 ['日','一','二','三','四','五','六'] */
  weekdays?: string[];
  /** 自定义月份标题格式，({ year, month }) => string，默认 `2024年 1月` */
  titleFormatter?: (year: number, month: number) => string;
  /** 选中态颜色，默认 #1677ff */
  activeColor?: string;
  /** 自定义日期格子渲染，(day: DayInfo) => JSX.Element */
  dayRender?: (day: DayInfo) => JSX.Element;
  /** multiple 模式下最多可选天数 */
  maxCount?: number;
  /** range 模式下最大范围（天） */
  maxRange?: number;
  /** 自定义日期格式器 */
  formatter?: (date: Date) => string;
  /** 是否显示确认按钮 */
  showConfirm?: boolean;
  /** 确认按钮文字 */
  confirmText?: string | JSX.Element;
  /** 确认按钮禁用时文字 */
  confirmDisabledText?: string | JSX.Element;
  /** 是否只读 */
  readonly?: boolean;
  /** 显示农历日期，默认 false */
  lunar?: boolean;

  // ── Popup mode ──
  /** 是否以弹出层方式展示（Overlay + 底部半屏），默认 true */
  popup?: boolean;
  /** 弹出层是否显示（受控） */
  show?: boolean;
  /** 弹出层关闭回调 */
  onUpdateShow?: (show: boolean) => void;
  /** 弹出层标题 */
  title?: string | JSX.Element;
  /** 弹出层关闭回调 */
  onClose?: () => void;
  /** 是否显示关闭按钮 */
  closeable?: boolean;
  /** 弹出层圆角 */
  round?: boolean;
  /** Portal 挂载目标 */
  teleport?: string | Element;
  /** z-index */
  zIndex?: number | string;

  /** 自定义类名 */
  class?: string;
  /** 自定义样式 */
  style?: JSX.CSSProperties | string;
}

export interface DayInfo {
  year: number;
  month: number;
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isDisabled: boolean;
  /** 农历信息文本，仅当 lunar=true 时有值，如 "初一"、"清明" */
  lunarText?: string;
}
