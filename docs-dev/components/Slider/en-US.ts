export default {
  slider: { props: {
      value: 'Current value: number (count=1) or number[] (count>1).',
      onChange: 'Change callback: (value: number | number[]) => void.',
      min: 'Min, default 0.', max: 'Max, default 100.', step: 'Step, default 1.',
      count: 'Slider count (arbitrary N supported). count=2 for range.', barHeight: 'Bar height.',
      buttonSize: 'Button size.', activeColor: 'Active bar color.',
      inactiveColor: 'Inactive bar color.', reverse: 'Reverse direction.',
      disabled: 'Disabled.', readonly: 'Readonly.',
      thumbRender: 'Custom thumb render: (value, index) => JSX|null.',
      class: 'Custom CSS class.', style: 'Inline styles.',
    },
    cssVars: {
      '--sc-slider-bar-height': 'Bar height, default 4px.',
      '--sc-slider-button-size': 'Button size, default 24px.',
      '--sc-slider-active-color': 'Active color.',
      '--sc-slider-inactive-color': 'Inactive color.',
      '--sc-slider-disabled-opacity': 'Disabled opacity, default 0.4.',
    },
    demo: { basic: 'Basic', range: 'Range', step: 'Step', color: 'Color', disabled: 'Disabled', form: 'Form' },
    demoDesc: {
      basic: 'value + onChange single slider.', range: 'count={2} dual-thumb range. Technically count supports any N, but >2 sliders are rarely needed.',
      step: 'step={10} discrete steps.', color: 'activeColor + inactiveColor.',
      disabled: 'disabled vs readonly.', form: 'Inside FormItem via useFormField().',
    },
    intro: 'Slider with single and range (dual-thumb) modes. Custom colors, step, bar/button sizes.',
  },
};
