import { createSignal, onMount } from 'solid-js';
import { defaultConfig } from '../../src/config/defaults';
import { generateCSSVars } from '../../src/config/css-vars';

const KEY = 'sc-docs-dark-mode';

function getInitial(): boolean {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(KEY);
    if (stored !== null) return stored === '1';
  }
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

/** Inject default config CSS variables + doc page chrome dark-mode styles. */
function injectCSSVars() {
  const id = 'sc-docs-css-vars';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent =
    generateCSSVars(defaultConfig) +
    // Doc page chrome: body background & text follow CSS vars
    // Also covers demo area buttons, search inputs, and common UI elements
    `html.dark body { background: var(--sc-color-background); color: var(--sc-color-text); }
     html.dark a { color: var(--sc-color-primary, #5195ff); }`;
  document.head.appendChild(style);
}

/**
 * 暗色/浅色模式切换按钮 + 默认 CSS 变量注入。文档页专用。
 * 点击切换 `html.dark` class，组件（Button/Toast 等）和文档 chrome 同步响应。
 */
export function DarkModeToggle() {
  const [dark, setDark] = createSignal(getInitial());

  onMount(() => {
    injectCSSVars();
    apply(dark());
  });

  function apply(on: boolean) {
    document.documentElement.classList.toggle('dark', on);
    localStorage.setItem(KEY, on ? '1' : '0');
  }

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      apply(next);
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      title={dark() ? '切换到浅色模式' : '切换到暗色模式'}
      style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        'z-index': 9999,
        width: '36px',
        height: '36px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        border: dark() ? '1px solid #3a3d42' : '1px solid #d1d5db',
        'border-radius': '8px',
        background: dark() ? '#24282d' : '#fff',
        cursor: 'pointer',
        'font-size': '1.1rem',
        transition: 'all 0.2s',
        'box-shadow': dark()
          ? '0 1px 3px rgba(0,0,0,0.3)'
          : '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      {dark() ? '☀️' : '🌙'}
    </button>
  );
}
