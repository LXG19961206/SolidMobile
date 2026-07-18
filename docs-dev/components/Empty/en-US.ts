export default {
  empty: {
    props: {
      description: 'Description text.',
      image: 'Image: preset (default / network / search) or custom JSX.',
      children: 'Custom bottom content (e.g. action button).',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    demo: {
      preset: 'Preset Types',
      custom: 'Custom Content',
    },
    demoDesc: {
      preset: 'Three presets: default, network (error), search (no results).',
      custom: 'Custom JSX image + action button for business scenarios.',
    },
    intro: 'Placeholder for empty data. Three presets with custom JSX support.',
  },
};
