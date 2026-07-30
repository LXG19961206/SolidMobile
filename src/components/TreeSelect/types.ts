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
  /** Custom render for each option. (node, selected, expand) => JSX */
  renderItem?: (opt: TreeSelectOption, selected: boolean, expand: () => void) => JSX.Element;
  /** Show search bar at the top of each level */
  searchable?: boolean;
  /** 'local' filters current level, 'global' searches entire tree with result dropdown */
  searchMode?: 'local' | 'global';
  /** Async search callback. If omitted, filters locally by label */
  onSearch?: (keyword: string, options: TreeSelectOption[]) => TreeSelectOption[];
  /** Async load children */
  onLoadChildren?: (option: TreeSelectOption) => Promise<TreeSelectOption[]>;
  class?: string;
  style?: JSX.CSSProperties | string;
}
