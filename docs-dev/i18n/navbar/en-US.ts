export default {
    componentIntro: {
        NavBarIntro: 'Top navigation bar with left/center/right layout.'
    },
    demoDesc: {
        navbar_fixed: 'fixed + placeholder for top positioning.',
        navbar_basic: 'Simplest navbar with just a title.',
        navbar_back: 'Show back arrow; onBack handles click.',
        navbar_right: 'right slot accepts buttons, icons, or any JSX.',
        navbar_custom: 'Custom left and right areas for complex action bars.'
    },
    componentProps: {
        navbar: {
            title: 'Title.',
            left: 'Custom left content.',
            right: 'Custom right content.',
            backArrow: 'Show back arrow.',
            onBack: 'Back arrow click callback.',
            onLeftClick: 'Left area click callback.',
            onRightClick: 'Right area click callback.',
            fixed: 'Fix at top.',
            placeholder: 'Generate placeholder when fixed.',
            border: 'Show bottom border.',
            zIndex: 'z-index.',
            background: 'Background color.',
            color: 'Text color.',
            height: 'Nav bar height.'
        }
    }
};
