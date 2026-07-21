export default {
  marquee: {
    props: {
      duration: 'Full loop duration in seconds, default 10s. Smaller = faster.',
      direction: 'Direction: left (default) / right.',
      pauseOnHover: 'Pause on hover, default true.',
      gap: 'Gap between items.',
      class: 'Custom CSS class.',
      style: 'Inline styles.',
      children: 'Content — rendered as-is, no intrusive styles.',
    },
    cssVars: {
      '--mq-duration': 'Animation duration.',
      '--mq-direction': 'Animation direction.',
      '--mq-gap': 'Content gap.',
    },
    demo: {
      basic: 'Basic',
      speed: 'Speed',
      direction: 'Direction',
      pause: 'No Pause',
      notify: 'With Notify',
    },
    demoDesc: {
      basic: "Default 10s leftward loop. Content duplicated for seamless scroll.",
      speed: 'duration={3} for fast scrolling.',
      direction: 'direction="right" to reverse.',
      pause: 'pauseOnHover={false} keeps scrolling on hover.',
      notify: 'Click marquee text to trigger a manual-dismiss Notify — demo of interactive content inside Marquee.',
    },
    intro: 'Marquee component — seamless horizontal scrolling. Children render as-is with zero intrusive styling. Configurable speed, direction, and hover behavior.',
  },
};
