export default {
  treeselect: {
    props: {
      options: 'Tree data array.',
      value: 'Selected leaf value array.',
      defaultValue: 'Default selected values.',
      onChange: 'Selection change callback.',
      max: 'Max selection count. 0 = unlimited.',
      mode: "Click behavior: 'select' (click to select, arrow to expand) or 'expand' (click to expand, arrow to select).",
      searchable: 'Show a search bar at the top of each level.',
      searchMode:
        "'local' filters current level, 'global' searches entire tree with result dropdown.",
      onSearch:
        'Async search callback. When provided, typing calls this instead of local filtering.',
      renderItem:
        'Custom render for each option. (node, selected, expand, toggle) => JSX.Element; toggle switches selection.',
      placeholder: 'Placeholder text when empty.',
      title: 'Overlay title.',
      disabled: 'Disable the component.',
      onLoadChildren:
        'Async children loader. Nodes without children become expandable when provided.',
      show: 'Controlled overlay visibility.',
      onUpdateShow: 'Overlay visibility change callback (controlled).',
      onClose: 'Overlay close callback.',
      closeable: 'Show a close button in the header.',
      swipeable:
        'Enable swipe navigation: left-swipe a row to enter its children, right-swipe to go back.',
      checkboxPosition: "Checkbox position in expand mode. 'left' or 'right'.",
      teleport: 'Portal mount target.',
      zIndex: 'Overlay z-index.',
      maxHeight: 'Overlay content max height.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    cssVars: {
      triggerPadding: 'Trigger padding.',
      triggerHeight: 'Trigger min height.',
      zIndex: 'Overlay z-index.',
      bg: 'Overlay content background.',
      itemPadding: 'Item padding.',
      checkboxLeftMargin:
        'Gap between left-side checkbox and label. Only used when checkboxPosition="left".',
    },
    demo: {
      basic: 'Basic Usage',
      maxLimit: 'Max Selection',
      modeExpand: 'Expand Mode',
      customRender: 'Custom Render',
      asyncLoad: 'Async Load',
      bigData: 'Big Data + Search',
    },
    demoDesc: {
      basic: 'Two-level tree with multi-select. Click row to select, arrow to expand.',
      maxLimit: 'Limit max selections to 3 items.',
      modeExpand: "mode='expand': click row to expand into children, right arrow to select.",
      customRender: 'renderItem gives full control over each row layout.',
      asyncLoad: 'Load children dynamically on first expand.',
      bigData:
        '1,800 options. With global search, typing a keyword instantly locates any item across the whole tree. Results are capped at 100 rows.',
    },
    intro:
      'Push-based multi-select tree component. Navigate through levels, select leaf nodes, view count per parent.',
  },
};
