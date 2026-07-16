export default {
    demo: {
        floatingballBasic: '基础用法',
        floatingballSnap: '边缘吸附'
    },
    section: {
        floatingballBasic: '基础用法'
    },
    componentIntro: {
        FloatingBallIntro: '固定定位的悬浮球组件。支持拖动、松手自动吸附到最近边缘。常用于回到顶部、页面导航、快捷操作等场景。'
    },
    cssVars: {
        FloatingBall: {
            __sc_floating_ball_size: '悬浮球尺寸，默认 44px。',
            __sc_floating_ball_bg: '背景色，默认跟随 --sc-color-primary。',
            __sc_floating_ball_color: '内容颜色，默认 #fff。',
            __sc_floating_ball_shadow: '阴影，默认 0 4px 12px rgba(0,0,0,0.2)。',
            __sc_floating_ball_radius: '圆角，默认 50%。',
            __sc_floating_ball_z_index: '层级，默认 999。'
        }
    },
    demoDesc: {
        floatingball_basic: '固定定位在右下角，可拖动，松手吸附到最近边缘。',
        floatingball_snap: '拖到屏幕左侧松手，球自动吸附到左边缘。',
        floatingball_intro: '固定定位的悬浮球，可拖动、松手自动吸附到最近边缘。常用于回到顶部、快捷操作、页面导航等移动端场景。'
    },
    componentProps: {
        floatingball: {
            inset: '初始位置，距视口边缘的距离。支持 left/top/right/bottom，默认 { right: 16, bottom: 24 }。',
            draggable: '是否可拖动，默认 true。',
            snapToEdge: '松手时自动吸附到最近边缘，默认 true。',
            zIndex: '层级，默认 999。',
            class: '自定义 CSS class。',
            style: '内联样式。'
        }
    }
};
