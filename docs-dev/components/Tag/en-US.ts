export default {
  tag: {
    props: {
      type: 'Semantic color: primary / success / warning / danger / info.',
      variant: 'Fill style: solid / outline.',
      size: 'Size: sm / md.',
      round: 'Pill rounded corners.',
      closeable: 'Show close button.',
      onClose: 'Close callback.',
      color: 'Custom color, overrides type.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    demo: {
      types: 'Semantic Colors',
      variant: 'Variants',
      size: 'Size & Round',
      closeable: 'Closable',
      scenes: 'Scenarios',
    },
    demoDesc: {
      types: 'Five semantic colors: primary / success / warning / danger / info.',
      variant: 'Solid fill vs outline.',
      size: 'Two sizes sm/md, round toggles pill shape.',
      closeable: 'Click ✕ to close the tag.',
      scenes: 'Dict labels, tag cloud, removable filter chips.',
    },
    intro: 'Small label for marking and categorizing. Multiple semantic colors and fill styles.',
  },
};
