import type { JSX } from 'solid-js';

export interface TreeSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: TreeSelectOption[];
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
  /** Async load children */
  onLoadChildren?: (option: TreeSelectOption) => Promise<TreeSelectOption[]>;
  class?: string;
  style?: JSX.CSSProperties | string;
}
