export default {
  ellipsis: {
    props: {
      lines: 'Number of visible lines before truncation, default 1.',
      expandable: 'Enable expand/collapse. Button only appears when content overflows.',
      expanded: 'Controlled expanded state.',
      defaultExpanded: 'Default expanded state (uncontrolled).',
      onExpandChange: 'Callback when expanded state changes.',
      showAction: 'Whether to show expand/collapse button, default true.',
      expandElement: 'Custom expand button content (JSX supported).',
      collapseElement: 'Custom collapse button content (JSX supported).',
      as: 'Rendered HTML tag, defaults to div.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    cssVars: {
      '--sc-ellipsis-action-color': 'Action button text color.',
      '--sc-ellipsis-action-hover-opacity': 'Button hover opacity.',
      '--sc-ellipsis-action-gap': 'Gap between icon and text in action button.',
      '--sc-ellipsis-action-padding': 'Left padding of action button.',
    },
    demo: {
      basic: 'Single Line',
      multi: 'Multi Line',
      expand: 'Expandable',
      custom: 'Custom Button',
      controlled: 'Controlled Mode',
    },
    demoDesc: {
      basic: 'Default single-line truncation with ellipsis at the end.',
      multi: 'Use lines prop to set visible lines before truncation.',
      expand: 'Expand button automatically appears when content overflows.',
      custom: 'Customize button content via expandElement / collapseElement.',
      controlled: 'Control expanded state externally via expanded + onExpandChange.',
    },
    intro: 'Text truncation component with single/multi-line ellipsis and expand/collapse. Built-in ResizeObserver adapts to container size changes.',
  },
};
