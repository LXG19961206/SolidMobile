export default {
  treeselect: {
    props: {
      options: 'Tree data array.',
      value: 'Selected leaf value array.',
      defaultValue: 'Default selected values.',
      onChange: 'Selection change callback.',
      onConfirm: 'Fired with the current selection when the header confirm is tapped.',
      onCancel: 'Fired when the sheet is closed via the backdrop or the close button.',
      max: 'Max selection count. 0 = unlimited.',
      mode: "Click behavior: 'select' (click to select, arrow to expand) or 'expand' (click to expand, arrow to select).",
      checkStrictly:
        'Strict checking: checking a parent selects the parent node itself, not cascading to all its leaves.',
      onlyLeafCheckable:
        'Only leaf nodes can be checked. Tapping a parent row navigates into its children (also in select mode).',
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
      emptyText: 'Placeholder shown when there are no options or search has no results.',
      loadErrorText: 'Text of the retry control shown when an async child load fails.',
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
      format: 'Formatter for the trigger text. (value, options) => string',
      clearable: 'Show a clear button in the trigger when a value is selected.',
      readonly: 'Read-only mode: the sheet can be opened for viewing, selection cannot change.',
      renderTrigger: 'Fully custom trigger rendering; call open / clear yourself.',
      ref: 'Ref callback — receives the imperative handle on mount, null on unmount. For uncontrolled usage (programmatic open/close, set/read/clear value, reset navigation). Controlled props (value/show) remain the preferred way. Available methods are listed in the "Ref Methods" table below.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    refMethods: {
      open: 'Open the sheet. No-op when disabled/readonly; with a controlled `show`, calls onUpdateShow(true) instead.',
      close: 'Close the sheet. With a controlled `show`, calls onUpdateShow(false). Does not fire onCancel.',
      setValue: 'Set the selection programmatically. Fires onChange when controlled, updates internal state otherwise.',
      getValue: 'Read the current selection.',
      clear: 'Clear the selection. No-op when disabled/readonly.',
      resetNavigation: 'Reset navigation to the root level and clear the search keyword.',
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
      checkStrictly: 'Strict Checking',
      trigger: 'Trigger Customization',
      ref: 'Ref API',
    },
    demoDesc: {
      basic: 'Two-level tree with multi-select. Click row to select, arrow to expand.',
      maxLimit: 'Limit max selections to 3 items.',
      modeExpand: "mode='expand': click row to expand into children, right arrow to select.",
      customRender: 'renderItem gives full control over each row layout.',
      asyncLoad: 'Load children dynamically on first expand.',
      bigData:
        '1,800 options. With global search, typing a keyword instantly locates any item across the whole tree. Results are capped at 100 rows.',
      checkStrictly:
        'checkStrictly: checking a parent selects the parent itself instead of cascading to all its leaves.',
      trigger: 'clearable adds a clear button to the trigger; format customizes the selected text.',
      ref: 'Drive the component imperatively via ref: open the sheet, clear the value, etc. Controlled props remain the preferred way; ref is for uncontrolled usage.',
    },
    intro:
      'Push-based multi-select tree component. Navigate through levels, select leaf nodes, view count per parent.',
  },
};
