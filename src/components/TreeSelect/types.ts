import type { JSX } from 'solid-js';

export interface TreeSelectFieldNames {
  value?: string;    // default 'value'
  label?: string;    // default 'label'
  children?: string; // default 'children'
  leaf?: string;     // if set, use this boolean field to determine leaf instead of children.length
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
  /** Selection change callback */
  onChange?: (value: (string | number)[]) => void;
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
  /** Enable swipe navigation on rows: left-swipe a row to enter its children,
   *  right-swipe (on any row) to go back a level. Default false. */
  swipeable?: boolean;
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
  onSearch?: (keyword: string, options: TreeSelectOption[]) => Promise<TreeSelectOption[]> | TreeSelectOption[];
  /** Async load children */
  onLoadChildren?: (option: TreeSelectOption) => Promise<TreeSelectOption[]>;
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
  class?: string;
  style?: JSX.CSSProperties | string;
}
