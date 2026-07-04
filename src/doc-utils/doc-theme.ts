import { createSignal } from 'solid-js';

const THEME_COLOR_KEY = 'sc-docs-theme-color';
const DEFAULT = '#1677ff';

function load(): string {
  try { return localStorage.getItem(THEME_COLOR_KEY) || DEFAULT; } catch { return DEFAULT; }
}

export const [docThemeColor, setDocThemeColor] = createSignal(load());

export function persistThemeColor(c: string) {
  setDocThemeColor(c);
  localStorage.setItem(THEME_COLOR_KEY, c);
}
