export default {
  divider: {
    props: {
      direction: 'Direction: horizontal / vertical.',
      text: 'Middle text (horizontal only).',
      dashed: 'Dashed style.',
      color: 'Line color.',
      size: 'Line thickness. Numbers auto-suffixed with px.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    demo: {
      horizontal: 'Basic',
      text: 'With Text',
      dashed: 'Dashed',
      color: 'Custom Color & Size',
      vertical: 'Vertical',
    },
    demoDesc: {
      horizontal: 'Default horizontal divider separates above and below content.',
      text: 'Add text in the middle via the text prop.',
      dashed: 'Toggle dashed border style.',
      color: 'color controls line color, size controls thickness.',
      vertical: "Use direction='vertical' as inline vertical separator.",
    },
    cssVars: {
      '--sc-divider-color': 'Line color. Equivalent to color prop; lower priority than the color prop.',
      '--sc-divider-size': 'Line thickness. Equivalent to size prop; lower priority than the size prop.',
      '--sc-divider-text-color': 'Middle text color.',
    },
    intro: 'Visual divider for content grouping. Supports horizontal/vertical, text, and dashed styles.',
  },
};
