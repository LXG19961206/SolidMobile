export default {
    demo: {
        swipeRight: 'Right',
        swipeRightDesc: 'Right swipe.',
        swiperCustomContent: 'Swiper Custom Content',
        swiperCustomContentDesc: 'Swiper Custom Content Description'
    },
    componentIntro: {
        SwiperIntro: 'Carousel with swipe, autoplay, loop, vertical, custom indicators.'
    },
    nav: {
        swiper: 'Swiper'
    },
    cssVars: {
        Swiper: {
            __sc_swiper_dot_active_color: 'Swiper active indicator color.',
            __sc_swiper_dot_active_width: 'Swiper active indicator width.',
            __sc_swiper_dot_bottom: 'Swiper indicator distance from bottom.',
            __sc_swiper_dot_color: 'Swiper indicator color.',
            __sc_swiper_dot_gap: 'Swiper indicator spacing.',
            __sc_swiper_dot_size: 'Swiper indicator dot size.',
            __sc_swiper_radius: 'Swiper container border radius.'
        }
    },
    demoDesc: {
        swiper_autoplay: 'imgUrls + autoplay for auto-rotation.',
        swiper_vertical: 'vertical=true for up/down swipe.'
    },
    componentProps: {
        swiper: {
            autoplay: 'Auto-play interval (ms).',
            duration: 'Animation duration (ms).',
            initialSwipe: 'Initial slide index.',
            loop: 'Enable loop playback.',
            showIndicators: 'Show indicators.',
            vertical: 'Vertical scroll direction.',
            touchable: 'Enable touch swipe.',
            indicatorColor: 'Indicator color.',
            indicators: 'Custom indicator render function.',
            imgUrls: 'Quick image array. No need for children.',
            lazyRender: 'Lazy render non-current pages.',
            onChange: 'Slide change callback.'
        }
    }
};
