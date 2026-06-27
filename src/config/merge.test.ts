import { describe, it, expect } from 'vitest';
import { deepMerge } from './merge';

describe('deepMerge', () => {
  it('returns target when source is empty', () => {
    const target = { a: 1, b: 2 };
    const result = deepMerge(target, {});
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('overrides shallow values', () => {
    const target = { a: 1, b: 2 };
    const result = deepMerge(target, { a: 10 });
    expect(result).toEqual({ a: 10, b: 2 });
  });

  it('deeply merges nested objects', () => {
    const target = { colors: { primary: '#000', secondary: '#fff' }, size: 10 };
    const source = { colors: { primary: '#f00' } };
    const result = deepMerge(target, source);
    expect(result).toEqual({
      colors: { primary: '#f00', secondary: '#fff' },
      size: 10,
    });
  });

  it('deeply merges multiple nesting levels', () => {
    const target = { a: { b: { c: 1, d: 2 } } };
    const source = { a: { b: { c: 99 } } };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: { b: { c: 99, d: 2 } } });
  });

  it('ignores undefined values in source', () => {
    const target = { a: 1, b: 2 };
    const result = deepMerge(target, { a: undefined, c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('replaces arrays (does not merge them)', () => {
    const target = { list: [1, 2, 3] };
    const source = { list: [4, 5] };
    const result = deepMerge(target, source);
    expect(result).toEqual({ list: [4, 5] });
  });

  it('does not mutate the target', () => {
    const target = { a: 1, nested: { b: 2 } };
    const copy = { a: 1, nested: { b: 2 } };
    deepMerge(target, { a: 10 });
    expect(target).toEqual(copy);
  });
});
