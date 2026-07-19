export default {
  card: {
    props: {
      title: 'Card title.',
      subtitle: 'Secondary description below the title.',
      shadow: 'Show shadow, default true.',
      border: 'Show border, default true.',
      inset: 'Inset mode: removes padding, radius, border, shadow, and sets transparent background. Default false.',
      divider: 'Show a Divider line below the header, default false.',
      padding: 'Inner padding, default 16px. Ignored in inset mode.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
      children: 'Card content.',
    },
    cssVars: {
      '--sc-card-bg': 'Card background, default #fff.',
      '--sc-card-border': 'Border color, default #ebedf0.',
      '--sc-card-radius': 'Border radius, default 10px.',
      '--sc-card-padding': 'Inner padding, default 16px.',
      '--sc-card-title': 'Title color, default #1f2937.',
      '--sc-card-subtitle': 'Subtitle color, default #6b7280.',
    },
    demo: {
      basic: 'Basic',
      noShadow: 'No Shadow',
      noBorder: 'No Border',
      inset: 'Inset Mode',
      customPadding: 'Custom Padding',
    },
    demoDesc: {
      basic: 'Title + subtitle + content, default shadow & border.',
      noShadow: 'shadow=false removes the drop shadow for a flat look.',
      noBorder: 'border=false removes the border line.',
      inset: 'Outer Card provides the visual frame, inner Card(inset) embeds inside — transparent, no padding, structure only.',
      customPadding: 'Custom inner padding via the padding prop, e.g. "24px".',
    },
    intro: 'General-purpose content container card with title, subtitle, rounded corners, and shadow. Used for demo groups, settings panels, info sections, etc.',
  },
};
