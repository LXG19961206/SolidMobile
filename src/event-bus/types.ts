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
  | 'Notify'
  | 'Picker'
  | 'Radio'
  | 'Rate'
  | 'Select'
  | 'Slider'
  | 'Stepper'
  | 'Switch'
  | 'Tabs'
  | 'Toast';

/** Event category — what kind of interaction occurred. */
export type EventBusEventType =
  | 'cancel'
  | 'change'
  | 'click'
  | 'confirm'
  | 'select'
  | 'show'
  | 'submit';

/**
 * Structured event payload delivered to the global handler.
 */
export interface EventBusEvent {
  /** Component display name, e.g. 'Button', 'Picker' */
  component: EventBusComponent;
  /** Event category: 'click', 'change', 'confirm', 'show', 'submit', 'select', 'cancel' */
  type: EventBusEventType;
  /** Event-specific payload. Type varies by component+event combination. */
  payload: unknown;
  /** Millisecond timestamp of when the event was emitted. */
  timestamp: number;
}

/**
 * Global event handler. Registered once by the application.
 */
export type EventBusHandler = (event: EventBusEvent) => void;
