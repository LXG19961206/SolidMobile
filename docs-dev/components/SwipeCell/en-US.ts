export default {
  swipecell: {
    props: {
      rightActions: 'Right-side swipe actions.',
      leftActions: 'Left-side swipe actions.',
      threshold: 'Swipe threshold to open (px), default 30.',
      actionsWidth: 'Action area width (px), auto by default.',
      disabled: 'Disable swipe.',
      onOpen: 'Open callback.',
      onClose: 'Close callback.',
      children: 'Content layer, most commonly paired with Cell.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    actionProps: {
      text: 'Button text.',
      theme: 'Color theme: default / primary / success / warning / danger.',
      color: 'Custom background color, overrides theme.',
      onClick: 'Click callback.',
      class: 'Custom CSS class.',
    },
    cssVars: {
      '--sc-swipecell-bg': 'Cell background color.',
      '--sc-swipecell-action-font-size': 'Action button font size.',
      '--sc-swipecell-action-padding': 'Action button padding.',
    },
    demo: {
      right: 'Right Swipe',
      left: 'Left Swipe',
      both: 'Both Sides',
      disabled: 'Disabled',
    },
    demoDesc: {
      right: 'Swipe left to reveal right-side actions like delete or favorite.',
      left: 'Swipe right to reveal left-side actions like mark as read.',
      both: 'Swipe both directions with actions on both sides.',
      disabled: 'Disable swipe interaction via the disabled prop.',
    },
    intro: 'Swipeable container with configurable action buttons on left/right sides. Commonly used in lists. Note: swipe interaction originates from iOS HIG — not the optimal UX on Android. Recommend using only for frequent quick actions like delete or favorite.',
  },
};
