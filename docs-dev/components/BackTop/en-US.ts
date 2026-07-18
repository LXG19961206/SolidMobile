export default {
  backtop: {
    props: {
      threshold: 'Show when scroll exceeds this distance (px), default 200.',
      target: 'Scroll target element. Auto-detects nearest scrollable ancestor.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
      children: 'Custom content, defaults to ↑ icon.',
    },
    demo: {
      basic: 'Basic',
    },
    demoDesc: {
      basic: 'Back-to-top built on FloatingBall. Auto-appears when scrolling past threshold. Smooth scroll to top on click.',
    },
    intro: 'Back-to-top button built on FloatingBall. Auto-appears when scrolling past threshold.',
  },
};
