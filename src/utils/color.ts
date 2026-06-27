// ---- Color Parsing & Conversion ----

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

/** Parse a hex color string (#rgb, #rrggbb, #rrggbbaa) to RGB. */
export function hexToRgb(hex: string): Rgb {
  let h = hex.replace('#', '');
  if (h.length === 3 || h.length === 4) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

/** Convert RGB to hex string (#rrggbb). */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return '#' + [clamp(r), clamp(g), clamp(b)].map((n) => clamp(n).toString(16).padStart(2, '0')).join('');
}

/** Parse a hex color string to HSL. */
export function hexToHsl(hex: string): Hsl {
  const { r, g, b } = hexToRgb(hex);
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case nr:
        h = ((ng - nb) / d + (ng < nb ? 6 : 0)) / 6;
        break;
      case ng:
        h = ((nb - nr) / d + 2) / 6;
        break;
      case nb:
        h = ((nr - ng) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/** Convert HSL to hex string (#rrggbb). */
export function hslToHex(h: number, s: number, l: number): string {
  const nh = ((h % 360) + 360) % 360;
  const ns = Math.max(0, Math.min(100, s)) / 100;
  const nl = Math.max(0, Math.min(100, l)) / 100;

  const hueToRgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  if (ns === 0) {
    const v = Math.round(nl * 255);
    return rgbToHex(v, v, v);
  }

  const q = nl < 0.5 ? nl * (1 + ns) : nl + ns - nl * ns;
  const p = 2 * nl - q;
  const nhue = nh / 360;

  return rgbToHex(
    Math.round(hueToRgb(p, q, nhue + 1 / 3) * 255),
    Math.round(hueToRgb(p, q, nhue) * 255),
    Math.round(hueToRgb(p, q, nhue - 1 / 3) * 255),
  );
}

// ---- Manipulation ----

/**
 * Lighten a hex color by a given amount (0–100).
 * Increases HSL lightness by `amount` percentage points.
 */
export function lighten(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  return hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + amount));
}

/**
 * Darken a hex color by a given amount (0–100).
 * Decreases HSL lightness by `amount` percentage points.
 */
export function darken(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  return hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - amount));
}

/**
 * Set the alpha/opacity of a hex color.
 * Returns an rgba() string.
 */
export function alpha(hex: string, opacity: number): string {
  const { r, g, b } = hexToRgb(hex);
  const a = Math.max(0, Math.min(1, opacity));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Reduce saturation of a hex color (0–100, where 100 is fully desaturated).
 */
export function desaturate(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  return hslToHex(hsl.h, Math.max(0, hsl.s - amount), hsl.l);
}

// ---- Derivation ----

export interface DerivedColors {
  /** The base color (unchanged) */
  base: string;
  /** Hover state — slightly lighter (~10%) */
  hover: string;
  /** Active/pressed state — slightly darker (~10%) */
  active: string;
  /** Disabled state — lighter with reduced opacity overlay */
  disabled: string;
  /** Focus ring — base color with alpha */
  focus: string;
  /** Very light pale tint — for backgrounds, badges, etc. */
  pale: string;
}

/**
 * Derive a full color set from a single base hex color.
 *
 * Uses HSL color space for perceptually uniform adjustments:
 * - hover:  lightness +10
 * - active: lightness -10
 * - disabled: lightness +25, saturation -30
 * - focus:  40% alpha of base
 * - pale:    proportional lightness toward white (75% distance), 30% saturation
 *
 * @example
 * ```ts
 * const primarySet = deriveColorSet('#1677ff');
 * // { base: '#1677ff', hover: '#7b93ff', active: '#1d44e0', ... }
 * ```
 */
export function deriveColorSet(base: string, options?: {
  hoverLighten?: number;
  activeDarken?: number;
  disabledLighten?: number;
  disabledDesaturate?: number;
  focusAlpha?: number;
}): DerivedColors {
  const {
    hoverLighten = 10,
    activeDarken = 10,
    disabledLighten = 25,
    disabledDesaturate = 30,
    focusAlpha: focusAlphaVal = 0.4,
  } = options ?? {};

  const hover = lighten(base, hoverLighten);
  const active = darken(base, activeDarken);

  const disabledBase = desaturate(lighten(base, disabledLighten), disabledDesaturate);
  const disabled = alpha(disabledBase, 0.5);

  const focus = alpha(base, focusAlphaVal);

  // Pale: bring lightness proportionally toward 100% (instead of adding a
  // fixed amount, which overflows to white for already-bright colors).
  // 75% of the distance to white, keep ~30% of original saturation.
  const paleHsl = hexToHsl(base);
  const pale = hslToHex(
    paleHsl.h,
    paleHsl.s * 0.3,
    paleHsl.l + (100 - paleHsl.l) * 0.75,
  );

  return { base, hover, active, disabled, focus, pale };
}

/**
 * Compute the appropriate text color (white or dark) for a given background
 * color, using the WCAG relative luminance formula.
 *
 * Returns `'#ffffff'` for dark backgrounds and `'#1a1d21'` for light backgrounds.
 * Threshold of 0.55 separates light from dark.
 *
 * @example
 * ```ts
 * contrastText('#1677ff');  // '#ffffff' — blue is dark enough for white text
 * contrastText('#fef0c7');  // '#1a1d21' — pale yellow needs dark text
 * ```
 */
export function contrastText(bgHex: string): string {
  const { r, g, b } = hexToRgb(bgHex);
  // sRGB → linear
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  // Relative luminance
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return L > 0.55 ? '#1a1d21' : '#ffffff';
}
