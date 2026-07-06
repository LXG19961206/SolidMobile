/**
 * Wraps a CSS Modules mapping so every property access returns the hashed
 * class name PLUS a stable, human-readable alias. Consumers can override
 * styles via predictable selectors like `.sc-button-root` instead of
 * fragile DOM-structure chains.
 *
 * Uses a Proxy so it works with Vite's CSS module objects — which may use
 * non-enumerable getters (e.g. in vitest/happy-dom) that `{ ...spread }`
 * cannot capture.
 *
 * @example
 * ```ts
 * import raw from './Button.module.css';
 * const styles = scopedStyle(raw, 'sc-button');
 * // styles.root → '_root_a269b3 sc-button-root'
 * // styles.icon → '_icon_f81e2d sc-button-icon'
 * ```
 *
 * @param styles    - The raw CSS Modules mapping object
 * @param namespace - A unique, stable namespace for the component (e.g. `'sc-button'`)
 * @returns A Proxy that appends ` <namespace>-<key>` to every string value
 */
export function scopedStyle<T extends Record<string, string>>(
  styles: T,
  namespace: string,
): T {
  return new Proxy(styles, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      // Only augment string-valued string-keyed properties (class names);
      // skip Symbols, `then` (then-able check used by Promise resolution),
      // and any non-string values.
      if (typeof prop === 'string' && typeof value === 'string') {
        return `${value} ${namespace}-${prop}`;
      }
      return value;
    },
  }) as T;
}
