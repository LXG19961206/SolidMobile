import { createMemo, createEffect, type ParentProps } from 'solid-js';
import { ConfigContext } from './context';
import { defaultConfig } from './defaults';
import { deepMerge } from './merge';
import { generateCSSVars } from './css-vars';
import { LocaleProvider } from '../i18n/context';
import type { Locale } from '../i18n/types';
import type { PartialSolidComponentConfig, SolidComponentConfig } from './types';

export interface ProviderConfigProps extends ParentProps {
  /**
   * Partial configuration overrides.
   * Deep-merged with `defaultConfig` — only supply what you want to change.
   */
  config?: PartialSolidComponentConfig;
}

/**
 * Root provider for the component library's global configuration.
 *
 * Place this near the top of your app tree:
 * ```tsx
 * import { ProviderConfig } from 'solid-component';
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
  const merged = createMemo<SolidComponentConfig>(() =>
    props.config
      ? (deepMerge(defaultConfig as unknown as Record<string, unknown>, props.config as Record<string, unknown>) as unknown as SolidComponentConfig)
      : defaultConfig,
  );

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
