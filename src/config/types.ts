// ---- Color System ----

export interface ColorTokens {
  // Primary
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryDisabled: string;
  primaryPale: string;
  // Secondary / neutral
  secondary: string;
  secondaryHover: string;
  secondaryActive: string;
  secondaryDisabled: string;
  secondaryPale: string;
  // Surfaces
  background: string;
  backgroundSecondary: string;
  // Text
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  // Borders
  border: string;
  borderHover: string;
  // Semantic
  danger: string;
  dangerHover: string;
  dangerActive: string;
  dangerDisabled: string;
  dangerPale: string;
  success: string;
  successHover: string;
  successActive: string;
  successDisabled: string;
  successPale: string;
  warning: string;
  warningHover: string;
  warningActive: string;
  warningDisabled: string;
  warningPale: string;
  info: string;
  infoHover: string;
  infoActive: string;
  infoDisabled: string;
  infoPale: string;
  // Focus ring
  focus: string;
}

export interface ThemeColors {
  light: ColorTokens;
  dark: ColorTokens;
}

// ---- Typography ----

export interface TypographyConfig {
  fontFamily: {
    base: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

// ---- Border Radius ----

export interface BorderRadiusConfig {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

// ---- Dark Mode ----

export type DarkModeStrategy = 'class' | 'media';

// ---- Full Config ----

export interface SolidComponentConfig {
  /** CSS custom property prefix, e.g. "sc" produces --sc-color-primary */
  prefix: string;
  /** Dark mode strategy: "class" toggles .dark on <html>, "media" uses prefers-color-scheme */
  darkMode: DarkModeStrategy;
  /** Light and dark color palettes */
  colors: ThemeColors;
  /** Typography tokens */
  typography: TypographyConfig;
  /** Border radius tokens */
  borderRadius: BorderRadiusConfig;
  /** Locale for built-in text and documentation. Supports any locale string; built-in dictionaries exist for 'zh-CN' and 'en-US'. */
  locale: string;
}

// ---- Partial Config ----

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type PartialSolidComponentConfig = DeepPartial<SolidComponentConfig>;
