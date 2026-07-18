export default {
  cell: {
    props: {
      title: 'Left title. String or JSX.',
      value: 'Right content. String or JSX.',
      description: 'Description text below title.',
      children: 'Custom content. Overrides title/value/description.',
      icon: 'Left icon. Built-in name or JSX.',
      size: 'Size: sm / md / lg, default md.',
      required: 'Show required red asterisk.',
      center: 'Center content vertically.',
      clickable: 'Clickable. Shows right arrow.',
      onClick: 'Click callback (only when clickable).',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    groupProps: {
      title: 'Group title.',
      card: 'Card mode (rounded + separate background).',
      border: 'Show cell borders, default true.',
      children: 'Child elements (Cell).',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    demo: {
      basic: 'Basic List',
      clickable: 'Clickable & Icon',
      form: 'Form & Required',
      card: 'Card Mode',
    },
    demoDesc: {
      basic: 'Cell has title (left), value (right), description (bottom).',
      clickable: 'clickable shows arrow, icon for visual cue.',
      form: 'required shows red asterisk, description for hints.',
      card: 'CellGroup card mode for rounded corners.',
    },
    cssVars: {
      '--sc-cell-min-height': 'Cell minimum height (overrides sm/md/lg presets).',
    },
    intro: 'List item component. Cell for single row, CellGroup for grouping with title and card mode.',
  },
};
