export default {
    demo: {
        sliderBasic: 'Basic Slider',
        sliderBasicDesc: 'Drag to adjust, value displayed in real time',
        sliderDisabledReadonly: 'Slider Disabled Readonly',
        sliderDual: 'Slider Dual',
        sliderDualDesc: 'Slider Dual Desc',
        sliderStepColor: 'Slider Step Color',
        sliderStepColorDesc: 'Slider Step Color Desc'
    },
    componentIntro: {
        SliderIntro: 'Slider with single/dual/triple thumbs. Custom colors/sizes.'
    },
    nav: {
        slider: 'Slider'
    },
    demoDesc: {
        slider_range: 'count=2 for dual-thumb range control.',
        slider_triple: 'count=3 for triple-thumb; value is length-3 array.',
        slider_custom: 'Custom colors, track height, and thumb size.',
        slider_thumb: 'thumbRender receives current value for custom thumb.'
    },
    componentProps: {
        slider: {
            value: 'Current value. Number when count=1, array when count>1.',
            onChange: 'Value change callback.',
            min: 'Minimum value, default 0.',
            max: 'Maximum value, default 100.',
            step: 'Step size, default 1.',
            count: 'Thumb count. 1=single, 2=dual, etc.',
            barHeight: 'Track height.',
            buttonSize: 'Thumb button size.',
            thumbRender: 'Custom thumb render function. Receives (value, index).',
            activeColor: 'Active track color, default #1989fa.',
            inactiveColor: 'Inactive track color, default #e5e5e5.',
            reverse: 'Reverse direction.',
            disabled: 'Disabled.',
            readonly: 'Readonly.'
        }
    }
};
