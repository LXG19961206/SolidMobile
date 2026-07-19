export default {
  overlay: {
    props: {
      open: 'Control overlay visibility.',
      onClose: 'Fires on backdrop click or Escape.',
      zIndex: 'Custom z-index, default 999.',
      lockScroll: 'Lock body scroll, default true.',
      mount: 'Portal mount target.',
      duration: 'Transition duration (ms), default 200.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    demo: {
      basic: 'Basic Overlay',
      content: 'Overlay + Content',
      scroll: 'Scroll Through',
    },
    demoDesc: {
      basic: 'Click backdrop or press Escape to close.',
      content: 'Show a Loading card on overlay, auto-closes after 2s.',
      scroll: 'lockScroll={false} — background scrolls freely, suitable for Toast-like overlays.',
    },
    intro: 'Full-screen semi-transparent overlay. Foundation for all popup components (Dialog, ActionSheet, Popup, etc.).',
  },
};
