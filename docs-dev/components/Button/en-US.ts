export default {
  button: {
  props: {
    type: 'Button color: primary / secondary / success / warning / danger / info.',
    variant: 'Fill style: solid, outline, ghost.',
    size: 'Size: xs / sm / md / lg.',
    block: 'Full-width block button.',
    round: 'Capsule shape with full border-radius.',
    disabled: 'Disabled, not clickable.',
    loading: 'Loading state with spinner, interaction disabled.',
    icon: 'Icon name or JSX element.',
    iconPosition: 'Icon position: left / right.',
    color: 'Custom background color.',
    onClick: 'Click callback. Not fired when disabled or loading.',
  },
  cssVars: {
    '--sc-color-primary': 'Primary background color.',
    '--sc-color-primary-hover': 'Primary hover color.',
    '--sc-color-primary-active': 'Primary active color.',
    '--sc-border-radius-sm': 'Small button radius (xs/sm).',
    '--sc-border-radius-md': 'Medium button radius (md).',
    '--sc-border-radius-lg': 'Large button radius (lg).',
    '--sc-border-radius-full': 'Round button radius.',
  },
  demo: {
    types: 'Types',
    sizes: 'Sizes',
    variant: 'Variants',
  },
  demoDesc: {
    button_types: 'primary / secondary / success / warning / danger / info',
    button_sizes: 'xs (28px) / sm (32px) / md (40px) / lg (48px)',
    button_variants: 'solid, outline, ghost.',
  },
  intro: 'General-purpose button component with multiple types, variants, and sizes.',
  },
};
