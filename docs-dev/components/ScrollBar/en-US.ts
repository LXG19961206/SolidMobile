export default {
  scrollbar: {
    props: {
      width: 'Scrollbar width, default 6px.',
      color: 'Thumb color, default #d1d5db. Auto-switches to #475569 in dark mode.',
      trackColor: 'Track color, default transparent.',
      direction: 'Scroll direction: vertical (default) / horizontal / both. Auto-sets overflow on child.',
      height: 'Container height. Passed directly to child element.',
      children: 'Content node. Child auto-receives height + overflow + scrollbar class.',
    },
    cssVars: {
      '--sc-scrollbar-width': 'Scrollbar width, default 6px.',
      '--sc-scrollbar-color': 'Thumb color.',
      '--sc-scrollbar-track': 'Track color, default transparent.',
    },
    demo: {
      basic: 'Basic',
      color: 'Custom Color',
      width: 'Custom Width',
      list: 'Virtual List',
    },
    demoDesc: {
      basic: 'Wrap any content for unified scrollbar styling. Container needs explicit height.',
      color: 'Custom thumb color via color prop.',
      width: 'width={4} for a thinner scrollbar.',
      list: 'ScrollBar + List virtual scroll — 1000 items, smooth scrolling, dark mode ready.',
    },
    intro: 'Custom scrollbar container. Wraps children with unified scrollbar styling. Dark/light mode auto-switch, configurable width and color.',
  },
};
