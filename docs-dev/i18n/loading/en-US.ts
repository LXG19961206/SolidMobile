export default {
    demo: {
        loading: 'Loading',
        loadingDesc: 'Loading spinner.',
        loadingIconProp: 'Icon',
        loadingIconPropDesc: 'Custom icon.',
        loadingOverlay: 'Overlay',
        loadingOverlayDesc: 'Overlay.',
        loadingOverlayMode: 'Overlay',
        loadingOverlayModeDesc: 'Overlay.',
        loadingPure: 'Pure',
        loadingPureDesc: 'Animation only.',
        loadingSizeColor: 'Size & Color',
        loadingSizeColorDesc: 'Size & color.',
        loadingTypes: 'Types',
        loadingTypesDesc: 'Animation types.',
        loadingVertical: 'Vertical',
        loadingVerticalDesc: 'Vertical.',
        loadingRegionData: 'Loading region data...',
        loadingEllipsis: 'Loading Ellipsis',
        loadingOverlayMobile: 'Loading Overlay Mobile',
        loadingOverlayMobileDesc: 'Loading Overlay Mobile Desc',
        loadingSizeColorMobile: 'Loading Size Color Mobile',
        loadingSizeColorMobileDesc: 'Loading Size Color Mobile Desc',
        loadingTextMobile: 'Loading Text Mobile',
        loadingTextMobileDesc: 'Loading Text Mobile Desc',
        loadingTypesMobile: 'Loading Types Mobile',
        loadingTypesMobileDesc: 'Loading Types Mobile Desc'
    },
    componentIntro: {
        LoadingIntro: 'Loading state feedback. Three animations, custom icons, overlay.'
    },
    nav: {
        loading: 'Loading'
    },
    demoDesc: {
        loading_types: 'Three animations: spinner, circular, dots.',
        loading_pure: 'Animation only without text. Suitable for inline or button use.',
        loading_size_color: 'size supports numbers (px) or CSS strings. color sets animation color.',
        loading_vertical: 'Text below animation when true. For cards or fullscreen loading.',
        loading_custom_icon: 'Custom JSX to replace built-in animation.',
        loading_overlay: 'Fullscreen overlay with scroll lock when true.'
    },
    componentProps: {
        loading: {
            text: 'Loading text. Takes precedence over children.',
            children: 'Children. Used when text not provided.',
            type: 'Built-in animation type: spinner / circular / dots.',
            size: 'Animation size. Numbers auto-suffixed with px.',
            color: 'Animation color.',
            textColor: 'Text color.',
            vertical: 'Stack text and animation vertically.',
            overlay: 'Full-screen overlay mode.',
            icon: 'Custom icon. Overrides type when set.',
            class: 'Custom CSS class.',
            style: 'Inline styles.'
        }
    }
};
