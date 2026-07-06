/**
 * Concatenates class names, filtering out falsy values.
 * Useful for conditionally joining CSS module classes and external class overrides.
 *
 * @example
 * ```ts
 * cn(styles.base, isActive && styles.active, props.class)
 * // => "base-abc123 active-xyz789 custom"
 * ```
 */
export function cn(...classes: (string | false | null | undefined | Record<string, boolean | null | undefined>)[]): string {
  return classes
    .flatMap(c => {
      if (!c) return [];
      if (typeof c === 'string') return [c];
      return Object.entries(c).filter(([, v]) => v).map(([k]) => k);
    })
    .join(' ');
}

/**
 * Creates a ref callback for Solid.js.
 * Useful when you need a stable ref without JSX ref={el => elRef = el}.
 *
 * @example
 * ```tsx
 * const [ref, setRef] = createRef<HTMLDivElement>();
 * // ...
 * <div ref={setRef}>...</div>
 * ```
 */
export function createRef<T extends HTMLElement = HTMLElement>(): [
  () => T | undefined,
  (el: T) => void,
] {
  let ref: T | undefined;
  const get = () => ref;
  const set = (el: T) => {
    ref = el;
  };
  return [get, set];
}

// CSS Modules scoped style helper
export { scopedStyle } from './scopedStyle';

// Color utilities
export {
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToHex,
  lighten,
  darken,
  alpha,
  desaturate,
  deriveColorSet,
  contrastText,
} from './color';
export type { Rgb, Hsl, DerivedColors } from './color';
