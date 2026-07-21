export default {
  notify: {
    props: {
      message: 'Display text. Supports line breaks.',
      type: 'Type: primary / success / warning / danger.',
      position: 'Position: top / bottom, default top.',
      duration: 'Display duration (ms). 0 = no dismiss, default 3000.',
      color: 'Text color.',
      background: 'Background color.',
      closeable: 'Show close button.',
      marquee: 'Marquee mode — auto-wraps message in Marquee component for long text notifications.',
      lockScroll: 'Lock background scroll.',
      onClick: 'Click callback.',
      onClose: 'Close callback.',
      className: 'Custom CSS class.',
      zIndex: 'Custom z-index.',
    },
    methods: {
      primary: 'Notify.primary(msg, opts?) — Primary notification.',
      success: 'Notify.success(msg, opts?) — Success (default 2s).',
      warning: 'Notify.warning(msg, opts?) — Warning notification.',
      danger: 'Notify.danger(msg, opts?) — Danger notification.',
      show: 'Notify.show(options) — Full config.',
      dismissAll: 'Notify.dismissAll() — Close all.',
    },
    demo: {
      types: 'Types',
      position: 'Position',
      custom: 'Custom Style',
    },
    demoDesc: {
      types: 'Four types: primary / success / warning / danger.',
      position: 'Top and bottom positions.',
      custom: 'Customize via color / background props.',
    },
    intro: 'Top notification bar. Imperative API for page-level global feedback.',
  },
};
