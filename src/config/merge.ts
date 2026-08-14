/**
 * Recursively merges `source` into `target`.
 *
 * - Plain objects are merged deeply (nested keys preserved).
 * - Non-plain-object values (strings, numbers, booleans, arrays) are replaced.
 * - `undefined` values in `source` are ignored (they do not clear the target).
 *
 * This allows partial config overrides at any nesting depth:
 *   deepMerge(defaults, { colors: { light: { primary: '#000' } } })
 *   → only `colors.light.primary` is overridden; all other tokens stay default.
 */
/** Recursive partial: nested objects stay partially-typed. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown> ? DeepPartial<T[K]> : T[K];
};

export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: DeepPartial<T> & Record<string, unknown>,
): T {
  const result = { ...target };

  for (const key of Object.keys(source) as (keyof T)[]) {
    const sourceVal = source[key];
    const targetVal = target[key];

    if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
      result[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      ) as T[keyof T];
    } else if (sourceVal !== undefined) {
      result[key] = sourceVal as T[keyof T];
    }
  }

  return result;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
