export default {
  badge: {
    props: {
      content: 'Badge content. Shows max+ when exceeded.',
      dot: 'Show only red dot, ignores content.',
      max: 'Number cap, e.g. max=99 shows "99+".',
      position: 'Position: top-right / top-left / bottom-right / bottom-left.',
      color: 'Custom background color.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
    },
    demo: {
      withAvatar: 'With Avatar',
      withButton: 'With Button',
      withTab: 'With Tabs',
      position: 'Position & Color',
      standalone: 'Standalone',
    },
    demoDesc: {
      withAvatar: 'Common use case — badge on avatar for unread count or status.',
      withButton: 'Badge on button for pending item count.',
      withTab: 'Per-category count on tab labels.',
      withCell: 'Status indicator on list item right side.',
      position: 'Four corner positions with custom background color.',
      standalone: 'Renders inline without wrapping a child element.',
    },
    intro: 'Small badge for message count and status. Attaches to icons, buttons, or tabs.',
  },
};
