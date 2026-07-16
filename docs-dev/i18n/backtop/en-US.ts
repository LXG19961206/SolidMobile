export default {
    demo: {
        backtopBasic: 'Basic Usage'
    },
    componentIntro: {
        BackTopIntro: 'Back-to-top button built on FloatingBall. Auto-appears when scrolling past threshold. Smooth scroll to top on click.'
    },
    nav: {
        backtop: 'BackTop'
    },
    demoDesc: {
        backtop_basic: 'Auto-appears when scrolling past threshold. Click to smoothly scroll back to top. Default: 200px.',
        backtop_custom: 'Custom children and style via children and style props.'
    },
    componentProps: {
        backtop: {
            threshold: 'Show when scroll exceeds this distance (px). Default: 200.',
            target: 'Scroll target element. Auto-detects nearest scrollable ancestor when omitted; falls back to window.',
            class: 'Custom CSS class.',
            style: 'Inline style.'
        }
    }
};
