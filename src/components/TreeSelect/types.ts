import type { JSX } from 'solid-js';

export interface TreeSelectFieldNames {
  value?: string; // default 'value'
  label?: string; // default 'label'
  children?: string; // default 'children'
  leaf?: string; // if set, use this boolean field to determine leaf instead of children.length
}

export interface TreeSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: TreeSelectOption[];
  [key: string]: any;
}

export interface TreeSelectProps {
  /** Tree data */
  options: TreeSelectOption[];
  /** Selected leaf values */
  value?: (string | number)[];
  /** Default selected values (uncontrolled) */
  defaultValue?: (string | number)[];
  /** Selection change callback (fires on every toggle) */
  onChange?: (value: (string | number)[]) => void;
  /** Confirm callback — fired with the current selection when the header
   *  confirm button is tapped. Use together with `onChange` when you need to
   *  distinguish "confirmed" from "still editing". */
  onConfirm?: (value: (string | number)[]) => void;
  /** Cancel callback — fired when the overlay backdrop or the ✕ button is
   *  tapped (i.e. the sheet closed without confirming). */
  onCancel?: () => void;
  /** Max selection count. 0 = unlimited */
  max?: number;
  /** Placeholder text when no value */
  placeholder?: string;
  /** Top bar title */
  title?: string;
  /** Disable the whole picker */
  disabled?: boolean;
  /** Field name mapping: { value, label, children, leaf }. Default all as named. */
  fieldNames?: TreeSelectFieldNames;
  /** Interaction mode: 'select' = click row to select (default), 'expand' = click row to expand */
  mode?: 'select' | 'expand';
  /** Strict checking: when true, checking a parent selects the parent node
   *  itself instead of cascading to all its leaf descendants. Parent and leaf
   *  values are then independent. Default false. */
  checkStrictly?: boolean;
  /** Only leaf nodes can be checked. Parent rows can't be toggled — clicking
   *  a parent row (or its arrow) expands into its children instead. */
  onlyLeafCheckable?: boolean;
  /** Enable swipe navigation on rows: left-swipe a row to enter its children,
   *  right-swipe (on any row) to go back a level. Default false. */
  swipeable?: boolean;
  /** Checkbox position in expand mode. Default 'right'. */
  checkboxPosition?: 'left' | 'right';
  /** Custom render for each option. (node, selected, expand, toggle) => JSX */
  renderItem?: (
    opt: TreeSelectOption,
    selected: boolean,
    expand: () => void,
    toggle?: () => void,
  ) => JSX.Element;
  /** Show search bar at the top of each level */
  searchable?: boolean;
  /** 'local' filters current level, 'global' searches entire tree with result dropdown */
  searchMode?: 'local' | 'global';
  /** Async search callback. If omitted, filters locally by label */
  onSearch?: (
    keyword: string,
    options: TreeSelectOption[],
  ) => Promise<TreeSelectOption[]> | TreeSelectOption[];
  /** Async load children */
  onLoadChildren?: (option: TreeSelectOption) => Promise<TreeSelectOption[]>;
  /** Placeholder shown when the current level (or search) has no rows.
   *  Defaults to the built-in locale message. */
  emptyText?: string;
  /** Text shown on the retry control when an async child load fails.
   *  Defaults to the built-in locale message. */
  loadErrorText?: string;
  /** Controlled open state */
  show?: boolean;
  /** Called when open state changes (controlled) */
  onUpdateShow?: (show: boolean) => void;
  /** Called when the overlay is closed */
  onClose?: () => void;
  /** Show a close (×) button in the header, default false */
  closeable?: boolean;
  /** Portal mount target */
  teleport?: string | Element;
  /** Overlay z-index */
  zIndex?: number | string;
  /** Overlay content max height, default '80vh' */
  maxHeight?: number | string;
  /** Custom trigger text formatter. Receives the selected values and the full
   *  option tree; return the string to display in the trigger. */
  format?: (value: (string | number)[], options: TreeSelectOption[]) => string;
  /** Show a clear (✕) button in the trigger when a value is selected */
  clearable?: boolean;
  /** Read-only mode: the sheet can be opened for viewing but selection
   *  cannot be changed. */
  readonly?: boolean;
  /** Fully custom trigger rendering. Replaces the default trigger entirely;
   *  you are responsible for calling `open()` / `clear()` yourself. */
  renderTrigger?: (info: {
    value: (string | number)[];
    text: string;
    open: () => void;
    clear: () => void;
  }) => JSX.Element;
  /** Ref callback — receives the imperative handle on mount, `null` on unmount.
   *  Use it for uncontrolled usage (programmatic open/close, set/read/clear
   *  value, reset navigation). Controlled props (`value`/`show`) remain the
   *  preferred way to drive the component. */
  ref?: ((handle: TreeSelectHandle) => void) | null;
  class?: string;
  style?: JSX.CSSProperties | string;
}

/** Imperative handle exposed via the `ref` prop. */
export interface TreeSelectHandle {
  /** Open the picker sheet. No-op when `disabled`/`readonly`; when `show` is
   *  controlled, calls `onUpdateShow(true)` instead. */
  open: () => void;
  /** Close the picker sheet. When `show` is controlled, calls
   *  `onUpdateShow(false)`. Does NOT fire `onCancel`. */
  close: () => void;
  /** Set the selected values programmatically. Respects controlled/uncontrolled. */
  setValue: (value: (string | number)[]) => void;
  /** Read the current selected values. */
  getValue: () => (string | number)[];
  /** Clear the selected values. No-op when `disabled`/`readonly`. */
  clear: () => void;
  /** Reset the navigation stack to the root level and clear the search keyword. */
  resetNavigation: () => void;
}
