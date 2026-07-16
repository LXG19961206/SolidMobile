export default {
    demo: {
        swipeRight: 'Right',
        swipeRightDesc: 'Right swipe.',
        swiperCustomContent: 'Swiper Custom Content',
        swiperCustomContentDesc: 'Swiper Custom Content Description'
    },
    componentIntro: {
        SwiperIntro: '轮播组件，支持手势滑动、自动播放、循环、纵向滚动、自定义指示器。可通过 imgUrls 快速渲染图片轮播。'
    },
    cssVars: {
        Swiper: {
            __sc_swiper_dot_active_color: '当前指示器颜色。',
            __sc_swiper_dot_active_width: '当前指示器宽度。',
            __sc_swiper_dot_bottom: '指示器距底部距离。',
            __sc_swiper_dot_color: '指示器颜色。',
            __sc_swiper_dot_gap: '指示器间距。',
            __sc_swiper_dot_size: '指示器圆点大小。',
            __sc_swiper_radius: '轮播容器圆角。'
        }
    },
    demoDesc: {
        swiper_autoplay: 'imgUrls + autoplay 自动轮播。',
        swiper_vertical: 'vertical=true，上下滑动切换。'
    },
    componentProps: {
        swiper: {
            autoplay: '自动轮播间隔 (ms)。',
            duration: '动画时长 (ms)。',
            initialSwipe: '初始位置索引。',
            loop: '是否循环播放。',
            showIndicators: '是否显示指示器。',
            vertical: '纵向滚动。',
            touchable: '手势滑动。',
            indicatorColor: '指示器颜色。',
            indicators: '自定义指示器渲染函数。',
            imgUrls: '快捷图片数组，传此属性后无需写子组件。',
            lazyRender: '延迟渲染非当前页。',
            onChange: '切换回调。'
        }
    }
};
