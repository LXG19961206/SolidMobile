export default {
  icon: {
    props: {
      name: 'Icon name.',
      variant: 'Style: line / fill.',
      size: 'Size. Numbers auto-suffixed with px.',
      color: 'Icon color.',
      'aria-label': 'Accessibility label. Required for functional icons.',
      onClick: 'Click event.',
    },
    demo: {
      basic: 'Basic',
      size: 'Size',
      color: 'Color',
      clickable: 'Clickable',
      line: 'Line / Fill',
    },
    demoDesc: {
      basic: 'Specify icon via name prop; variant toggles line/fill style.',
      size: 'size supports numbers (px) or any CSS unit string.',
      color: 'color sets icon color; inherits parent text color when not set.',
      clickable: 'Set aria-label and cursor style for clickable, accessible icons.',
      line: "variant='line' for outline, variant='fill' for solid.",
    },
    intro: '131 curated Remix Icons in line and fill variants.',
  },
};
