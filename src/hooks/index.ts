import { createSignal, onMount, type Accessor, type Setter } from 'solid-js';

export interface UseControllableStateOptions<T> {
  /** Controlled value (if provided, component is controlled) */
  value?: Accessor<T>;
  /** Default value for uncontrolled mode */
  defaultValue?: T;
  /** Called when the value changes */
  onChange?: (value: T) => void;
}

/**
 * A hook that manages controllable state — supporting both controlled
 * (parent-driven) and uncontrolled (internal) modes.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useControllableState({
 *   value: props.value,
 *   defaultValue: '',
 *   onChange: props.onChange,
 * });
 * ```
 */
export function useControllableState<T>(
  options: UseControllableStateOptions<T>,
): [Accessor<T>, Setter<T>] {
  const isControlled = () => options.value !== undefined;

  const [internalValue, setInternalValue] = createSignal<T>(
    (options.value?.() ?? options.defaultValue) as T,
  );

  const currentValue = () =>
    isControlled() ? (options.value as Accessor<T>)() : internalValue();

  const setValue: Setter<T> = ((next: T | ((prev: T) => T)) => {
    const resolved = typeof next === 'function' ? (next as (prev: T) => T)(currentValue()) : next;

    if (!isControlled()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (setInternalValue as (v: any) => any)(resolved);
    }

    options.onChange?.(resolved);
    return resolved;
  }) as unknown as Setter<T>;

  return [currentValue, setValue];
}

/**
 * 禁止移动端双指缩放和双击缩放。
 * 在文档或移动端 Web 应用的根组件中调用一次即可。
 *
 * @example
 * ```tsx
 * function App() {
 *   useDisableZoom();
 *   return <div>...</div>;
 * }
 * ```
 */
export function useDisableZoom() {
  onMount(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      const m = document.createElement('meta');
      m.name = 'viewport';
      m.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
      document.head.appendChild(m);
    }
    document.documentElement.style.touchAction = 'manipulation';
  });
}
