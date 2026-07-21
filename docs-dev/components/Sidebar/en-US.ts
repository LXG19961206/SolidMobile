export default {
  sidebar: {
    props: {
      items: 'Item list: { key: string; title: string | JSX.Element }[]. title supports JSX.',
      activeKey: 'Currently selected key.',
      onChange: 'Change callback: (key: string) => void.',
      width: 'Sidebar width, default 90px.',
      compact: 'Compact mode: icon-only, auto width.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    cssVars: {
      '--sc-color-border': 'Divider color.',
      '--sc-color-background-secondary': 'Background color.',
      '--sc-card-bg': 'Active/hover background.',
      '--sc-color-primary': 'Active text + left indicator color.',
      '--sc-color-text-secondary': 'Inactive text color.',
    },
    demo: {
      basic: 'Basic',
      jsx: 'Custom JSX',
      compact: 'Compact',
    },
    demoDesc: {
      basic: 'Vertical group nav for switching between grouped content.',
      jsx: 'title supports JSX, icon supports custom elements — freely combine.',
      compact: 'compact mode shows icons only, auto-width for tight spaces.',
    },
    intro: 'Vertical group navigation component for switching between groups/tables in popup panels. Dark mode supported.',
  },
};
