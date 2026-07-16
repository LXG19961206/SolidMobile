export default {
    demo: {
        rateCount: 'Count',
        rateCountDesc: 'Custom count.',
        rateBasic: 'Basic Rating',
        rateBasicDesc: 'Default 5 stars, tap to rate'
    },
    componentIntro: {
        RateIntro: '评分组件，支持半选、清除、自定义图标和颜色。'
    },
    demoDesc: {
        rate_count: 'count 控制图标总数。',
        rate_size_gutter: 'size 图标大小，gutter 间距。',
        rate_readonly: 'readonly 状态无法交互。'
    },
    componentProps: {
        rate: {
            value: '当前分值。',
            onChange: '分值变化回调。',
            count: '图标总数，默认 5。',
            size: '图标大小。',
            gutter: '图标间距。',
            color: '选中时的颜色。',
            voidColor: '未选中时的颜色。',
            disabledColor: '禁用时的颜色。',
            icon: '选中时的图标名，对应 Icon 的 name 属性。',
            voidIcon: '未选中时的图标名。',
            allowHalf: '是否允许半选。',
            clearable: '是否允许再次点击后清除。',
            readonly: '只读。',
            disabled: '禁用。'
        }
    }
};
