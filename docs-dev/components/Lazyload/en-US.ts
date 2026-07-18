export default {
  lazyload: {
    props: {
      active: 'Controlled mode: manually activate.',
      placeholder: 'Placeholder shown when inactive.',
      children: 'Content rendered when active.',
      rootMargin: 'Trigger margin, default "50px" (loads 50px before element enters viewport). Supports negative values like "-100px".',
      height: 'Min height before activation, prevents layout shift.',
      threshold: 'Visibility ratio (0-1), default 0 (trigger as soon as any part enters). 0.5 = half visible, 1 = fully visible.',
      once: 'Trigger only once, default true.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    demo: {
      list: 'List Lazy Load',
      gallery: 'Image Gallery',
      controlled: 'Controlled Mode',
    },
    demoDesc: {
      list: 'Scroll down; cards load automatically when entering viewport.',
      gallery: 'Grid cards load individually as they enter the viewport.',
      controlled: 'Manually control loading via the active prop.',
    },
    misc: {
      scrollDown: '⬇ Scroll down',
      scrollHint: 'Content loads automatically on entering viewport',
      clickToLoad: 'Click to load',
      activated: 'Activated',
      reset: 'Reset',
      loading: 'Loading...',
    },
    intro: 'IntersectionObserver-based lazy load container. Renders content only when element enters viewport. Supports controlled mode, custom placeholders, and threshold.',
  },
};
