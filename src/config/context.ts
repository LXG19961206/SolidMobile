import { createContext, useContext } from 'solid-js';
import type { SolidComponentConfig } from './types';
import { defaultConfig } from './defaults';

/**
 * Solid.js context holding the resolved configuration.
 * Defaults to `defaultConfig` when no `<ProviderConfig>` is in the tree,
 * so components work correctly out of the box.
 */
export const ConfigContext = createContext<SolidComponentConfig>(defaultConfig);

/**
 * Hook to access the current configuration from any component.
 *
 * @example
 * ```tsx
 * const config = useConfig();
 * console.log(config.colors.light.primary);
 * ```
 */
export function useConfig(): SolidComponentConfig {
  const config = useContext(ConfigContext);
  // Safe to assert non-null: createContext with default never yields undefined
  return config!;
}
