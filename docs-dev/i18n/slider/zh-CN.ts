export default {
    demo: {
        sliderBasic: 'Basic Slider',
        sliderBasicDesc: 'Drag to adjust, value displayed in real time',
        sliderDual: 'Slider Dual',
        sliderDualDesc: 'Slider Dual Desc',
        sliderStepColor: 'Slider Step Color',
        sliderStepColorDesc: 'Slider Step Color Desc',
        sliderDisabledReadonly: 'Slider Disabled Readonly'
    },
    componentIntro: {
        SliderIntro: '滑块组件，支持单滑块、多滑块、自定义颜色和尺寸。'
    },
    demoDesc: {
        slider_range: 'count=2 时出现两个滑块，控制一个范围。',
        slider_triple: 'count=3 三个滑块，value 为长度为 3 的数组。',
        slider_custom: '自定义颜色、进度条高度、滑块大小。',
        slider_thumb: 'thumbRender 接收当前值，返回自定义内容渲染滑块按钮。'
    },
    componentProps: {
        slider: {
            value: '当前值。count=1 时为数字，count>1 时为数组。',
            onChange: '值变化回调。',
            min: '最小值，默认 0。',
            max: '最大值，默认 100。',
            step: '步长，默认 1。',
            count: '滑块数量。1 为单滑块，2 为双滑块，以此类推。',
            barHeight: '进度条高度。',
            buttonSize: '滑块按钮大小。',
            thumbRender: '自定义滑块按钮渲染。接收当前值和索引。',
            activeColor: '进度条激活态颜色，默认 #1989fa。',
            inactiveColor: '进度条非激活态颜色，默认 #e5e5e5。',
            reverse: '是否反转。',
            disabled: '禁用。',
            readonly: '只读。'
        }
    }
};
