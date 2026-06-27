import type { Preview } from 'storybook-solidjs-vite';

const preview: Preview = {
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: { method: 'alphabetical' },
    },
    // Default expand all sidebar categories
    sidebar: {
      collapsedRoots: [] as string[],
    },
    // Inject dark mode styles for Storybook chrome (sidebar, toolbar, etc.)
    docs: {
      theme: undefined as any, // will be set dynamically
    },
  },
};

// Inject CSS & runtime style fixes for Storybook's own UI chrome.
// Our DarkModeToggle toggles `html.dark` — the styles below mirror that
// to Storybook's sidebar, toolbar, and panels.
if (typeof document !== 'undefined') {
  const STYLE_ID = 'sc-storybook-chrome';
  const INJECT_CSS = `
    /* ── Dark mode chrome ── */
    html.dark .sidebar-header,
    html.dark .sidebar-container,
    html.dark .sidebar-subheading,
    html.dark #storybook-panel-root,
    html.dark .sb-bar,
    html.dark .sb-preview-container,
    html.dark [class*="sidebar"],
    html.dark [class*="Sidebar"] {
      background: #1a1d21 !important;
      color: #e2e8f0 !important;
    }
    html.dark .sidebar-item,
    html.dark [class*="sidebar-item"],
    html.dark [class*="SidebarItem"] {
      color: #94a3b8 !important;
    }
    html.dark .sidebar-item:hover,
    html.dark [class*="sidebar-item"]:hover,
    html.dark [class*="SidebarItem"]:hover {
      background: #24282d !important;
      color: #e2e8f0 !important;
    }
    html.dark .sidebar-item[data-selected="true"],
    html.dark .sidebar-item.selected,
    html.dark [class*="sidebar-item"][aria-selected="true"],
    html.dark [class*="SidebarItem"][data-active="true"] {
      background: #24282d !important;
      color: #5195ff !important;
    }
    html.dark .sidebar-header {
      border-bottom: 1px solid #3a3d42 !important;
    }
  `;

  function ensureStyle() {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = INJECT_CSS;
      document.head.appendChild(style);
    }
  }

  // Run as early as possible; re-check on DOM ready
  ensureStyle();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureStyle);
  }
}

export default preview;
