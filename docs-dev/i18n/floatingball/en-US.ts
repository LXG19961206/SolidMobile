export default {
    demo: {
        floatingballBasic: 'Basic Usage',
        floatingballSnap: 'Snap to Edge'
    },
    section: {
        floatingballBasic: 'Basic Usage'
    },
    componentIntro: {
        FloatingBallIntro: 'Fixed-position floating ball. Draggable with auto snap-to-edge. Common for back-to-top buttons, quick actions, or page navigation.'
    },
    nav: {
        floatingball: 'FloatingBall'
    },
    cssVars: {
        FloatingBall: {
            __sc_floating_ball_size: 'Ball size. Default: 44px.',
            __sc_floating_ball_bg: 'Background color. Defaults to --sc-color-primary.',
            __sc_floating_ball_color: 'Content color. Default: #fff.',
            __sc_floating_ball_shadow: 'Box shadow. Default: 0 4px 12px rgba(0,0,0,0.2).',
            __sc_floating_ball_radius: 'Border radius. Default: 50%.',
            __sc_floating_ball_z_index: 'Stack order. Default: 999.'
        }
    },
    demoDesc: {
        floatingball_basic: 'Fixed at the bottom-right corner. Drag to move, auto-snaps to the nearest edge on release.',
        floatingball_snap: 'Drag to the left side and release — the ball auto-snaps to the left edge.',
        floatingball_intro: 'Fixed-position floating ball — draggable, auto-snaps to the nearest edge. Common for back-to-top, quick actions, or page navigation on mobile.'
    },
    componentProps: {
        floatingball: {
            inset: 'Initial position from viewport edges. Supports left/top/right/bottom. Default: { right: 16, bottom: 24 }.',
            draggable: 'Whether the ball is draggable. Default: true.',
            snapToEdge: 'Auto-snap to the nearest edge on release. Default: true.',
            zIndex: 'Stack order. Default: 999.',
            class: 'Custom CSS class.',
            style: 'Inline style.'
        }
    }
};
