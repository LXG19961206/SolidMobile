import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToHex,
  lighten,
  darken,
  alpha,
  desaturate,
  deriveColorSet,
} from './color';

describe('hexToRgb', () => {
  it('parses 6-digit hex', () => {
    expect(hexToRgb('#1677ff')).toEqual({ r: 22, g: 119, b: 255 });
  });

  it('parses 3-digit hex', () => {
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('handles missing #', () => {
    expect(hexToRgb('1677ff')).toEqual({ r: 22, g: 119, b: 255 });
  });
});

describe('rgbToHex', () => {
  it('converts RGB to hex', () => {
    expect(rgbToHex(22, 119, 255)).toBe('#1677ff');
  });

  it('clamps out-of-range values', () => {
    expect(rgbToHex(300, -10, 128)).toBe('#ff0080');
  });
});

describe('hexToHsl / hslToHex round-trip', () => {
  it('round-trips a color correctly', () => {
    const hex = '#1677ff';
    const hsl = hexToHsl(hex);
    const result = hslToHex(hsl.h, hsl.s, hsl.l);
    expect(result).toBe(hex);
  });

  it('round-trips a gray', () => {
    const hex = '#808080';
    const hsl = hexToHsl(hex);
    const result = hslToHex(hsl.h, hsl.s, hsl.l);
    expect(result).toBe(hex);
  });
});

describe('lighten', () => {
  it('increases lightness', () => {
    const result = lighten('#1677ff', 10);
    const orig = hexToHsl('#1677ff');
    const res = hexToHsl(result);
    expect(res.l).toBeGreaterThan(orig.l);
  });

  it('caps at 100% lightness', () => {
    const result = lighten('#ffffff', 10);
    expect(result).toBe('#ffffff');
  });
});

describe('darken', () => {
  it('decreases lightness', () => {
    const result = darken('#1677ff', 10);
    const orig = hexToHsl('#1677ff');
    const res = hexToHsl(result);
    expect(res.l).toBeLessThan(orig.l);
  });

  it('floors at 0% lightness', () => {
    const result = darken('#000000', 10);
    expect(result).toBe('#000000');
  });
});

describe('alpha', () => {
  it('returns rgba with correct opacity', () => {
    expect(alpha('#1677ff', 0.4)).toBe('rgba(22, 119, 255, 0.4)');
  });

  it('clamps opacity to [0, 1]', () => {
    expect(alpha('#1677ff', 1.5)).toBe('rgba(22, 119, 255, 1)');
    expect(alpha('#1677ff', -0.5)).toBe('rgba(22, 119, 255, 0)');
  });
});

describe('desaturate', () => {
  it('reduces saturation', () => {
    const result = desaturate('#1677ff', 50);
    const res = hexToHsl(result);
    expect(res.s).toBeLessThan(100);
  });

  it('floors at 0% saturation', () => {
    const result = desaturate('#808080', 50);
    const res = hexToHsl(result);
    expect(res.s).toBe(0);
  });
});

describe('deriveColorSet', () => {
  const set = deriveColorSet('#1677ff');

  it('preserves the base color', () => {
    expect(set.base).toBe('#1677ff');
  });

  it('produces a lighter hover', () => {
    const baseL = hexToHsl(set.base).l;
    const hoverL = hexToHsl(set.hover).l;
    expect(hoverL).toBeGreaterThan(baseL);
  });

  it('produces a darker active', () => {
    const baseL = hexToHsl(set.base).l;
    const activeL = hexToHsl(set.active).l;
    expect(activeL).toBeLessThan(baseL);
  });

  it('produces a rgba disabled color', () => {
    expect(set.disabled).toMatch(/^rgba\(/);
  });

  it('produces a rgba focus color', () => {
    expect(set.focus).toMatch(/^rgba\(/);
  });

  it('produces a pale tint (not pure white)', () => {
    expect(set.pale).not.toBe('#ffffff');
    const paleHsl = hexToHsl(set.pale);
    expect(paleHsl.l).toBeGreaterThan(85); // very light
  });

  it('pale retains a hint of the original hue', () => {
    const baseHsl = hexToHsl(set.base);
    const paleHsl = hexToHsl(set.pale);
    // Pale should still have some saturation (not fully gray)
    expect(paleHsl.s).toBeGreaterThan(0);
  });

  it('accepts custom options', () => {
    const custom = deriveColorSet('#1677ff', { hoverLighten: 20, activeDarken: 5 });
    expect(custom.base).toBe('#1677ff');
    expect(custom.hover).not.toBe(set.hover);
    expect(custom.active).not.toBe(set.active);
  });
});
