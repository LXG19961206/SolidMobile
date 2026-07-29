export default {
  treeselect: {
    props: {
      options: 'Tree data array.',
      value: 'Selected leaf value array.',
      defaultValue: 'Default selected values.',
      onChange: 'Selection change callback.',
      max: 'Max selection count. 0 = unlimited.',
      placeholder: 'Placeholder text when empty.',
      title: 'Overlay title.',
      disabled: 'Disable the component.',
      onLoadChildren: 'Async children loader.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    cssVars: {
      triggerPadding: 'Trigger padding.',
      triggerHeight: 'Trigger min height.',
      zIndex: 'Overlay z-index.',
      bg: 'Overlay content background.',
      itemPadding: 'Item padding.',
    },
    demo: {
      basic: 'Basic Usage',
      maxLimit: 'Max Selection',
      asyncLoad: 'Async Load',
    },
    demoDesc: {
      basic: 'Two-level tree with multi-select. Parents auto-count selected children.',
      maxLimit: 'Limit max selections to 3 items.',
      asyncLoad: 'Load children dynamically on first expand.',
    },
    intro: 'Push-based multi-select tree component. Navigate through levels, select leaf nodes, view count per parent.',
  },
};