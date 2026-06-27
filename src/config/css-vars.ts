import type { SolidComponentConfig } from './types';

/**
 * Converts a camelCase key to kebab-case for CSS variable naming.
 *   "primaryHover" → "primary-hover"
 *   "backgroundSecondary" → "background-secondary"
 */
function toKebab(str: string): string {
  return str.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
}

/**
 * Recursively flattens a nested object into a flat map of CSS custom properties.
 *
 * Given `{ primary: '#3b82f6', primaryHover: '#2563eb' }`
 * with prefix `sc` and category `color`, produces:
 *   { '--sc-color-primary': '#3b82f6', '--sc-color-primary-hover': '#2563eb' }
 */
function flattenObject(
  obj: Record<string, unknown>,
  prefix: string,
  category: string,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      // Nested object: recurse with the same prefix and an extended category path
      Object.assign(result, flattenObject(value as Record<string, unknown>, prefix, `${category}-${key}`));
    } else {
      const varName = `--${prefix}-${category}-${toKebab(key)}`;
      result[varName] = String(value);
    }
  }

  return result;
}

/**
 * Formats a flat vars record to indented CSS lines.
 */
function formatVars(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([prop, value]) => `  ${prop}: ${value};`)
    .join('\n');
}

/**
 * Generates the complete CSS custom property string from the config.
 *
 * Output structure (for darkMode: 'class'):
 *   :root { ... light colors + typography + border-radius ... }
 *   .dark { ... dark color overrides ... }
 *
 * Output structure (for darkMode: 'media'):
 *   :root { ... light colors + typography + border-radius ... }
 *   @media (prefers-color-scheme: dark) { :root { ... dark overrides ... } }
 */
export function generateCSSVars(config: SolidComponentConfig): string {
  const { prefix, darkMode, colors, typography, borderRadius } = config;

  // Light color tokens
  const lightColorVars = flattenObject(colors.light as unknown as Record<string, unknown>, prefix, 'color');

  // Dark color tokens
  const darkColorVars = flattenObject(colors.dark as unknown as Record<string, unknown>, prefix, 'color');

  // Non-color tokens — each top-level key is a category (fontFamily → font-family, etc.)
  const typographyVars: Record<string, string> = {};
  for (const [cat, tokens] of Object.entries(typography)) {
    Object.assign(
      typographyVars,
      flattenObject(tokens as unknown as Record<string, unknown>, prefix, toKebab(cat)),
    );
  }
  const radiusVars = flattenObject(borderRadius as unknown as Record<string, unknown>, prefix, 'border-radius');

  // :root block
  const rootVars = {
    ...lightColorVars,
    ...typographyVars,
    ...radiusVars,
  };

  let css = ':root {\n';
  css += '  color-scheme: light dark;\n';
  css += formatVars(rootVars);
  css += '\n}\n';

  // Dark mode block
  if (darkMode === 'media') {
    css += '\n@media (prefers-color-scheme: dark) {\n';
    css += '  :root {\n';
    css += formatVars(darkColorVars);
    css += '\n  }\n';
    css += '}\n';
  } else {
    // 'class' strategy (default)
    css += '\n.dark {\n';
    css += formatVars(darkColorVars);
    css += '\n}\n';
  }

  return css;
}
