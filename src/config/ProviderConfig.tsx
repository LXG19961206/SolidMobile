import { createMemo, createEffect, type ParentProps } from 'solid-js';
import { ConfigContext } from './context';
import { defaultConfig } from './defaults';
import { deepMerge } from './merge';
import { generateCSSVars } from './css-vars';
import { LocaleProvider } from '../i18n/context';
import { deriveColorSet } from '../utils/color';
import type { Locale } from '../i18n/types';
import type { PartialSolidComponentConfig, SolidComponentConfig } from './types';

export interface ProviderConfigProps extends ParentProps {
  /**
   * Partial configuration overrides.
   * Deep-merged with `defaultConfig` — only supply what you want to change.
   *
   * **Auto-derivation**: when you provide a semantic base color
   * (e.g. `primary: '#ff6b00'`) without its state variants (hover, active,
   * disabled, pale), those variants are automatically derived from the base
   * color using `deriveColorSet`. You only need to specify state colors when
   * you want to override the derivation formula.
   */
  config?: PartialSolidComponentConfig;
}

/** Semantic color keys that have derived hover / active / disabled / pale states. */
const SEMANTIC_COLORS = ['primary', 'secondary', 'danger', 'success', 'warning', 'info'] as const;

/**
 * Auto-derive missing state colors from any base colors present in the input.
 *
 * When a user provides e.g. `{ primary: '#ff6b00' }` without `primaryHover`,
 * `primaryActive`, etc., this fills them in with values computed from the base
 * color.  Explicitly provided state colors are preserved as-is.
 */
function autoDeriveColors(colors: Record<string, unknown>): Record<string, unknown> {
  const result = { ...colors };

  for (const key of SEMANTIC_COLORS) {
    const base = result[key];
    if (typeof base !== 'string') continue;

    const derived = deriveColorSet(base);

    if (result[`${key}Hover`] === undefined) {
      result[`${key}Hover`] = derived.hover;
    }
    if (result[`${key}Active`] === undefined) {
      result[`${key}Active`] = derived.active;
    }
    if (result[`${key}Disabled`] === undefined) {
      result[`${key}Disabled`] = derived.disabled;
    }
    if (result[`${key}Pale`] === undefined) {
      result[`${key}Pale`] = derived.pale;
    }
  }

  // Auto-derive secondary from primary when not explicitly provided.
  // Uses the "hover" (lightened) variant of primary as the secondary base,
  // then derives its hover/active/… states from that base.  This keeps the
  // same hue family while making secondary noticeably lighter — a natural
  // complementary role.
  if (result['secondary'] === undefined && typeof result['primary'] === 'string') {
    const primarySet = deriveColorSet(result['primary'] as string);
    const secondaryBase = primarySet.hover;
    const secondarySet = deriveColorSet(secondaryBase);
    result['secondary'] = secondaryBase;
    if (result['secondaryHover'] === undefined) result['secondaryHover'] = secondarySet.hover;
    if (result['secondaryActive'] === undefined) result['secondaryActive'] = secondarySet.active;
    if (result['secondaryDisabled'] === undefined) result['secondaryDisabled'] = secondarySet.disabled;
    if (result['secondaryPale'] === undefined) result['secondaryPale'] = secondarySet.pale;
  }

  // Auto-derive focus ring from primary when not explicitly provided
  if (result['focus'] === undefined && typeof result['primary'] === 'string') {
    result['focus'] = deriveColorSet(result['primary'] as string).focus;
  }

  return result;
}

/**
 * Root provider for the component library's global configuration.
 *
 * Place this near the top of your app tree:
 * ```tsx
 * import { ProviderConfig } from 'solid-mobile';
 *
 * <ProviderConfig config={{ darkMode: 'class' }}>
 *   <App />
 * </ProviderConfig>
 * ```
 *
 * It does three things:
 * 1. Injects CSS custom properties (--sc-*) into <head> for all components to inherit.
 * 2. Provides the resolved config via Solid context for JS-side access.
 * 3. Provides the current locale for built-in i18n text.
 *
 * When omitted, components use `defaultConfig` — everything still works.
 */
export function ProviderConfig(props: ProviderConfigProps) {
  const merged = createMemo<SolidComponentConfig>(() => {
    if (!props.config) return defaultConfig;

    // Auto-derive missing state colors before deep-merging so that
    // user-provided base colors produce matching hover / active / … variants,
    // while explicitly specified state colors take precedence.
    const processed = { ...props.config } as Record<string, unknown>;

    if (props.config.colors) {
      const colors = { ...props.config.colors } as Record<string, unknown>;
      for (const theme of ['light', 'dark']) {
        if (colors[theme] && typeof colors[theme] === 'object') {
          colors[theme] = autoDeriveColors(colors[theme] as Record<string, unknown>);
        }
      }
      processed.colors = colors;
    }

    return deepMerge(
      defaultConfig as unknown as Record<string, unknown>,
      processed,
    ) as unknown as SolidComponentConfig;
  });

  createEffect(() => {
    const config = merged();
    const styleId = 'solid-component-theme';

    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = generateCSSVars(config);
  });

  return (
    <ConfigContext.Provider value={merged()}>
      <LocaleProvider locale={merged().locale as Locale}>
        {props.children}
      </LocaleProvider>
    </ConfigContext.Provider>
  );
}
