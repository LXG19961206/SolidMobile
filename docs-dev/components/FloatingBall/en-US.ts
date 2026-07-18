export default {
  floatingball: {
    props: {
      inset: 'Initial position from viewport edges. Supports left/top/right/bottom. Default: { right: 16, bottom: 24 }.',
      draggable: 'Whether draggable, default true.',
      snapToEdge: 'Auto-snap to nearest edge on release, default true.',
      zIndex: 'Stack order, default 999.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
      children: 'Ball content (icon, text, etc.).',
    },
    cssVars: {
      '--sc-floating-ball-size': 'Ball size.',
      '--sc-floating-ball-bg': 'Background color, defaults to theme primary.',
      '--sc-floating-ball-color': 'Content color.',
      '--sc-floating-ball-shadow': 'Box shadow.',
      '--sc-floating-ball-radius': 'Border radius, default 50%.',
      '--sc-floating-ball-z-index': 'Stack order.',
    },
    demo: {
      basic: 'Basic',
      custom: 'Custom Style',
      fixed: 'Not Draggable',
    },
    demoDesc: {
      basic: 'Fixed at bottom-right. Drag to move, snaps to nearest edge on release.',
      custom: 'Customize size, radius, gradient background, and shadow via CSS variables.',
      fixed: 'draggable={false} — fixed position, no drag interaction.',
    },
    intro: 'Fixed-position floating ball. Draggable with auto snap-to-edge. Common for back-to-top, quick actions, or navigation.',
  },
};
