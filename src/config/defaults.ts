import type { SolidComponentConfig } from './types';
import { deriveColorSet } from '../utils/color';

// ---- Design-spec base colors ----
// Derived from the provided color palette spec

const primaryBlue = deriveColorSet('#1677ff');
const secondaryBlue = deriveColorSet('#6ba3ff');
const secondaryGray = deriveColorSet('#969799');
const dangerRed = deriveColorSet('#fc000a', {
  // Red needs subtler hover — lightening pure red too much looks pink
  hoverLighten: 8,
  activeDarken: 8,
});
const successGreen = deriveColorSet('#00d35b');
const warningOrange = deriveColorSet('#ff9162');

/**
 * Default configuration with mobile-first conventions.
 *
 * Border radius follows the 4px base grid (mobile-friendly):
 *   sm=4px, md=8px, lg=12px, full=9999px
 *
 * Font sizes use rem units for accessibility:
 *   xs=0.75rem(12px), sm=0.875rem(14px), md=1rem(16px),
 *   lg=1.125rem(18px), xl=1.25rem(20px), xxl=1.5rem(24px)
 *
 * Colors follow the design spec:
 *   Primary #1677ff, Danger #fc000a, Success #00d35b, Warning #ff9162
 *
 * Use `deriveColorSet(baseHex)` from `solid-component` to generate
 * a matching set from your own brand color.
 */
export const defaultConfig: SolidComponentConfig = {
  prefix: 'sc',
  darkMode: 'class',

  colors: {
    light: {
      // Primary
      primary: primaryBlue.base,
      primaryHover: primaryBlue.hover,
      primaryActive: primaryBlue.active,
      primaryDisabled: primaryBlue.disabled,
      primaryPale: primaryBlue.pale,

      // Secondary / neutral
      secondary: secondaryBlue.base,
      secondaryHover: secondaryBlue.hover,
      secondaryActive: secondaryBlue.active,
      secondaryDisabled: secondaryBlue.disabled,
      secondaryPale: secondaryBlue.pale,

      // Surfaces (from design spec: #eff2f5 background, #f7f8fa surface)
      background: '#eff2f5',
      backgroundSecondary: '#f7f8fa',

      // Text (from design spec: #323233 primary, #969799 secondary)
      text: '#323233',
      textSecondary: '#969799',
      textTertiary: '#afaba9',
      textInverse: '#ffffff',

      // Borders (from design spec: #dcdee0, hover darken)
      border: '#dcdee0',
      borderHover: '#c5c7ca',

      // Danger
      danger: dangerRed.base,
      dangerHover: dangerRed.hover,
      dangerActive: dangerRed.active,
      dangerDisabled: dangerRed.disabled,
      dangerPale: dangerRed.pale,

      // Success
      success: successGreen.base,
      successHover: successGreen.hover,
      successDisabled: successGreen.disabled,
      successPale: successGreen.pale,

      // Warning
      warning: warningOrange.base,
      warningHover: warningOrange.hover,
      warningDisabled: warningOrange.disabled,
      warningPale: warningOrange.pale,

      // Info (neutral gray)
      info: secondaryGray.base,
      infoHover: secondaryGray.hover,
      infoActive: secondaryGray.active,
      infoDisabled: secondaryGray.disabled,
      infoPale: secondaryGray.pale,
      focus: primaryBlue.focus,
    },

    // Dark mode: invert surface lightness while keeping brand colors recognizable
    dark: {
      primary: '#5195ff',
      primaryHover: '#7ab0ff',
      primaryActive: '#3678e0',
      primaryDisabled: 'rgba(81, 149, 255, 0.35)',
      primaryPale: 'rgba(81, 149, 255, 0.12)',

      secondary: '#6396e8',
      secondaryHover: '#7aabf5',
      secondaryActive: '#4d80cc',
      secondaryDisabled: 'rgba(99, 150, 232, 0.35)',
      secondaryPale: 'rgba(99, 150, 232, 0.12)',

      background: '#1a1d21',
      backgroundSecondary: '#24282d',

      text: '#f0f1f3',
      textSecondary: '#9a9ca0',
      textTertiary: '#6b6d70',
      textInverse: '#ffffff',

      border: '#3a3d42',
      borderHover: '#54575c',

      danger: '#ff5c61',
      dangerHover: '#ff8084',
      dangerActive: '#e63338',
      dangerDisabled: 'rgba(255, 92, 97, 0.35)',
      dangerPale: 'rgba(255, 92, 97, 0.12)',

      success: '#33e07a',
      successHover: '#66ea9f',
      successDisabled: 'rgba(51, 224, 122, 0.35)',
      successPale: 'rgba(51, 224, 122, 0.12)',

      warning: '#ffb08a',
      warningHover: '#ffc8ad',
      warningDisabled: 'rgba(255, 176, 138, 0.35)',
      warningPale: 'rgba(255, 176, 138, 0.12)',

      info: '#8b8e93',
      infoHover: '#a0a3a8',
      infoActive: '#7a7d82',
      infoDisabled: 'rgba(139, 142, 147, 0.35)',
      infoPale: 'rgba(139, 142, 147, 0.12)',
      focus: 'rgba(81, 149, 255, 0.5)',
    },
  },

  typography: {
    fontFamily: {
      base: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },

  locale: 'zh-CN',
};
