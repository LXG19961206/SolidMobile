export default {
  avatar: {
    props: {
      src: 'Avatar image URL.',
      alt: 'Alt text (accessibility).',
      size: 'Size: xs(24) / sm(32) / md(40) / lg(48) / xl(64) or custom px.',
      round: 'Fully round (default, mutually exclusive with square).',
      square: 'Square shape. Number controls border-radius.',
      icon: 'Icon name when no src or load fails.',
      text: 'Text shown when no src/icon (first character).',
      color: 'Custom background color.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    demo: {
      image: 'Image',
      icon: 'Icon',
      text: 'Text',
      shape: 'Shape & Size',
      custom: 'Custom Color',
    },
    demoDesc: {
      image: 'Use src for image URL, supports preset sizes xs ~ xl.',
      icon: 'Display an Icon when no src is provided.',
      text: 'Use first character of text as avatar when no src/icon.',
      shape: 'Round vs Square with sizes from xs to xl.',
      custom: 'Set background color via color prop with icon or text.',
    },
    intro: 'User avatar with fallback: image -> icon -> first letter.',
  },
};
