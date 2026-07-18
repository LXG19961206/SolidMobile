export default {
  pullrefresh: {
    props: {
      loading: 'Controlled loading state.',
      onRefresh: 'Refresh callback. Promise auto-closes on completion.',
      pullDistance: 'Pull distance to trigger refresh (px), default 80.',
      headHeight: 'Refresh indicator area height (px), default 60.',
      successDuration: 'Success state display duration (ms), default 500.',
      animationDuration: 'Bounce-back animation duration (ms), default 300.',
      disabled: 'Disable pull-to-refresh.',
      pullingText: 'Pulling text.',
      loosingText: 'Release text.',
      loadingText: 'Loading text.',
      successText: 'Success text.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    cssVars: {
      '--sc-pullrefresh-duration': 'Bounce-back animation duration.',
      '--sc-pullrefresh-head': 'Indicator area height.',
    },
    demo: {
      basic: 'Basic',
      customText: 'Custom Text',
      withList: 'With List',
    },
    demoDesc: {
      basic: 'Pull down to refresh with damping and loading states.',
      customText: 'Customize status text via pullingText / loosingText / loadingText / successText.',
      withList: 'List has built-in pullRefresh prop for seamless integration.',
    },
    intro: 'Pull-down-to-refresh wrapper with damping and loading states.',
  },
};
