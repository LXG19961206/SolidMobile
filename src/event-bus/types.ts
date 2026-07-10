/**
 * Known component names for type safety.
 * Extend this union when adding EventBus support to new components.
 */
export type EventBusComponent =
  | 'ActionSheet'
  | 'Button'
  | 'Calendar'
  | 'Cascader'
  | 'Checkbox'
  | 'CityPicker'
  | 'DatePicker'
  | 'Dialog'
  | 'Form'
  | 'Input'
  | 'NavBar'
  | 'Notify'
  | 'Picker'
  | 'PullRefresh'
  | 'Radio'
  | 'Rate'
  | 'Select'
  | 'Slider'
  | 'Stepper'
  | 'Swiper'
  | 'Switch'
  | 'TabBar'
  | 'Tabs'
  | 'Textarea'
  | 'TimePicker'
  | 'Toast'
  | 'Upload'
  | (string & {});

/** Event category — what kind of interaction occurred. */
export type EventBusEventType =
  | 'cancel'
  | 'change'
  | 'clear'
  | 'click'
  | 'confirm'
  | 'delete'
  | 'error'
  | 'refresh'
  | 'select'
  | 'show'
  | 'submit'
  | 'success';

/**
 * Structured event payload delivered to the global handler.
 */
export interface EventBusEvent {
  /** Component display name, e.g. 'Button', 'Picker' */
  component: EventBusComponent;
  /** Event category: 'click', 'change', 'confirm', 'show', 'submit', 'select', 'cancel', 'delete', 'refresh' */
  type: EventBusEventType;
  /** Event-specific payload. Type varies by component+event combination. */
  payload: unknown;
  /** The component's received props at the time of the event (for telemetry / auditing). */
  props: unknown;
  /** Millisecond timestamp of when the event was emitted. */
  timestamp: number;
}

/**
 * Global event handler. Registered once by the application.
 */
export type EventBusHandler = (event: EventBusEvent) => void;
