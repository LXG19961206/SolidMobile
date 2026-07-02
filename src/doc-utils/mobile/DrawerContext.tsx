import { createContext, useContext } from 'solid-js';

export const DrawerContext = createContext<(() => void) | undefined>();

export function useDrawer() {
  return useContext(DrawerContext);
}
