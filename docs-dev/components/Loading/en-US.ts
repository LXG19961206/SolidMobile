export default {
  loading: {
    props: {
      text: 'Loading text. Alternative to children.',
      children: 'Child element, used when text not set.',
      type: 'Animation type: spinner / circular / dots, default spinner.',
      size: 'Animation size. Numbers auto-suffixed with px.',
      color: 'Animation color.',
      textColor: 'Text color.',
      vertical: 'Stack text and animation vertically, default false.',
      overlay: 'Full-screen overlay mode.',
      mount: 'Overlay Portal mount target.',
      icon: 'Custom icon. Overrides type when set.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    demo: {
      types: 'Animation Types',
      text: 'Text & Layout',
      sizeColor: 'Size & Color',
      overlay: 'Overlay Mode',
    },
    demoDesc: {
      types: 'Three animations: spinner (rotating ring), circular (arc), dots (bouncing).',
      text: 'Add loading text and toggle vertical layout.',
      sizeColor: 'Control size and color via props.',
      overlay: 'Full-screen overlay with scroll lock for form submissions.',
    },
    jsxDemo: 'JSX Embedded',
    jsxDesc: 'JSX lets you embed Loading inside any component — Button, Card, ListItem, etc.',
    intro: 'Loading state feedback with three animations, custom icons, text, and overlay mode.',
  },
};
