export default {
  safearea: {
    props: {
      position: 'Safe area position: top / bottom.',
      class: 'Custom CSS class.',
    },
    cssVars: {
      '--sc-safe-area-top': 'Top safe area height. Falls back to env(safe-area-inset-top, 0px).',
      '--sc-safe-area-bottom': 'Bottom safe area height. Falls back to env(safe-area-inset-bottom, 0px).',
    },
    demo: {
      layout: 'Typical Page Layout',
    },
    demoDesc: {
      layout: 'Complete page skeleton: SafeArea spacer + NavBar + content + TabBar, all in spacer mode.',
    },
    intro: 'Safe area spacer to avoid notches and home indicators.',
    design: {
      cardTitle: 'Design & Best Practices',
      para1: 'SafeArea is a platform adaptation component that prevents content from being obscured by notched screens and system bars.',
      whyTitle: 'Why SafeArea',
      notch: 'Notch / Punch-hole',
      notchDesc: ': iOS notch ~44px, Android punch-hole varies. Content can be hidden behind the camera area.',
      statusBar: 'Status Bar',
      statusBarDesc: ': Android status bar height varies across devices and is hard to detect in webview.',
      homeIndicator: 'Home Indicator',
      homeIndicatorDesc: ': iOS home indicator ~34px. Tapping or swiping there can trigger returning to home.',
      cssChainTitle: 'CSS Variable Fallback Chain',
      cssChainDesc: 'SafeArea height/padding resolves through a CSS variable fallback chain, working in all environments:',
      chainUser: 'User custom (highest priority)',
      chainDevice: 'Device native safe area',
      chainFallback: 'Fallback (non-notched screen or no webview support)',
      modesTitle: 'Two Usage Modes',
      spacerTitle: 'Spacer Mode (no children)',
      spacerDesc: 'A pure spacer that occupies the safe area height. Place alongside NavBar/TabBar:',
      containerTitle: 'Container Mode (with children)',
      containerDesc: 'Wrap NavBar/TabBar inside SafeArea to automatically add top/bottom padding:',
      customTitle: 'Custom Safe Area Height',
      customDesc: 'In some scenarios (simulators, non-iOS devices, custom themes), override the safe area height via CSS variables:',
      priority: 'Priority: component style prop > --sc-safe-area-* vars > env(safe-area-inset-*) > 0px',
    },
  },
};
