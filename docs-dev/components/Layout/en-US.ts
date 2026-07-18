export default {
  layout: {
    props: {
      rowGap: 'Column gap. Numbers auto-suffixed with px.',
      rowAlign: 'Vertical align: start / center / end / stretch / baseline.',
      rowJustify: 'Horizontal justify: start / center / end / between / around / evenly.',
      rowWrap: 'Allow wrapping.',
      colSpan: 'Grid span 1-24. Auto fills when not set.',
      colOffset: 'Left offset 1-24.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    cssVars: {},
    demo: {
      grid: 'Basic Grid',
      offset: 'Offset',
      align: 'Alignment & Gap',
    },
    demoDesc: {
      grid: 'Col span from 1-24 divides the row equally; total exceeding 24 wraps.',
      offset: 'Col offset shifts right by grid columns.',
      align: 'Row justify controls horizontal distribution; gap controls column spacing.',
    },
    intro: 'Flex-based 24-column grid. Row container, Col with span/offset.',
  },
};
