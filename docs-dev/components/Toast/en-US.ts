export default {
  toast: {
    props: {
      message: 'Toast message content. String or JSX.',
      type: 'Type: success / error / warning / loading / info.',
      position: 'Position: top / middle / bottom, default middle.',
      duration: 'Auto-dismiss ms. 0 = no auto-dismiss. Default 3000.',
      overlay: 'Show semi-transparent overlay, default false.',
      closeOnClick: 'Close on click.',
      onClose: 'Close callback.',
      icon: 'Custom icon, overrides type default.',
      zIndex: 'Custom z-index.',
      stack: 'Stack multiple toasts, default false (replace).',
    },
    methods: {
      show: 'Toast.show(options) — Full config toast.',
      success: 'Toast.success(msg, opts?) — Success (2s).',
      error: 'Toast.error(msg, opts?) — Error (3s + overlay).',
      warning: 'Toast.warning(msg, opts?) — Warning.',
      loading: 'Toast.loading(msg, opts?) — Loading (no auto-dismiss).',
      info: 'Toast.info(msg, opts?) — Info (2.5s).',
      dismissAll: 'Toast.dismissAll() — Close all toasts.',
    },
    demo: {
      types: 'Basic Types',
      position: 'Position',
      overlay: 'Overlay & Multiline',
      dismiss: 'Dismiss All',
    },
    demoDesc: {
      types: 'Five built-in types: success / error / warning / loading / info.',
      position: 'Three positions: top / middle / bottom.',
      overlay: 'Overlay blocks interaction; multiline text support.',
      dismiss: 'Toast.dismissAll() closes all active toasts at once.',
    },
    intro: 'Global lightweight feedback. Imperative API — no component import needed.',
  },
};
