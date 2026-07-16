export default {
    demo: {
        buttonAddToCart: 'Button Add To Cart',
        buttonBuyNow: 'Button Buy Now',
        buttonCapsule: 'Button Capsule',
        buttonClickSubmit: 'Button Click Submit',
        buttonEdit: 'Button Edit',
        buttonFavorite: 'Button Favorite',
        buttonIconMobileDesc: 'Button Icon  (Mobile) Description',
        buttonLoadingDisabled: 'Button Loading Disabled',
        buttonLoadingDisabledMobileDesc: 'Button Loading Disabled  (Mobile) Description',
        buttonMobileTitle: 'Button  (Mobile) Title',
        buttonNext: 'Button Next',
        buttonRoundBlock: 'Button Round Block',
        buttonRoundBlockMobileDesc: 'Button Round Block  (Mobile) Description',
        buttonSearch: 'Button Search',
        buttonSemanticTypeMobileDesc: 'Button Semantic Type  (Mobile) Description',
        buttonSettings: 'Button Settings',
        buttonSizeMobileDesc: 'Button Size  (Mobile) Description',
        buttonSubmitting: 'Button Submitting',
        buttonVariantMobileDesc: 'Button Variant  (Mobile) Description'
    },
    componentIntro: {
        ButtonIntro: 'General-purpose action button with multiple variants, sizes, icons, loading, and link mode.'
    },
    nav: {
        button: 'Button'
    },
    cssVars: {
        Button: {
            __sc_border_radius_full: 'Full border radius (round mode).',
            __sc_border_radius_lg: 'Large border radius (size=lg).',
            __sc_border_radius_md: 'Medium border radius (size=md).',
            __sc_border_radius_sm: 'Small border radius (size=sm).',
            __sc_color_primary: 'Primary color background (primary type).',
            __sc_color_primary_active: 'Primary color active/pressed state.',
            __sc_color_primary_hover: 'Primary color hover state.',
            __sc_color_primary_pale: 'Primary color pale background (ghost/outline hover).',
            __sc_color_text_inverse: 'Button text color.'
        }
    },
    demoDesc: {
        button_sizes: 'Four sizes: xs (28px) / sm (32px) / md (40px) / lg (48px).',
        button_variants: 'Solid, outline, and ghost variants, orthogonal to type.',
        button_round: 'Fully rounded pill shape for tags or filter buttons.',
        button_icon_only: 'Icon-only button must set aria-label for accessibility.',
        button_link: 'Renders as anchor tag when href is set. Supports target attribute.',
        button_color: 'Override background color; text color auto-calculated. Can also set textColor manually.',
        button_form_actions: 'Primary action + outline cancel, right-aligned.',
        button_mobile_actions: 'Block + round + size=lg for mobile bottom bar.',
        button_danger: 'Danger variant for destructive actions, paired with outline cancel.',
        button_types: 'Six types: primary, secondary, success, warning, danger, info.',
        button_icon_text: 'Add icon via icon prop. Supports string names or JSX. Default position is left.',
        button_submit: 'Use nativeType="submit" with a form element.'
    },
    componentProps: {
        button: {
            text: 'Button text. Takes precedence over children.',
            children: 'Button children. Used when text not provided.',
            type: 'Semantic color: primary / secondary / success / warning / danger / info.',
            variant: 'Fill style. solid=filled, outline=bordered, ghost=transparent.',
            size: 'Size: xs / sm / md / lg.',
            block: 'Full-width button.',
            round: 'Pill shape with full border-radius.',
            hairline: '0.5px hairline border (experimental).',
            color: 'Custom background color, overrides variant.',
            textColor: 'Custom text color.',
            icon: 'Icon element. Accepts any JSX.',
            iconPosition: 'Icon position relative to text: left / right.',
            disabled: 'Disabled state, not interactive.',
            loading: 'Loading state, shows spinner and disables interaction.',
            loadingText: 'Text shown during loading.',
            nativeType: 'HTML button type: button / submit / reset.',
            href: 'Link URL. Renders as <a> when set.',
            target: 'Link target, only effective when href is set.',
            onClick: 'Click callback. Not fired when disabled or loading.',
            class: 'Custom CSS class.',
            style: 'Inline styles.',
            'aria-label': 'Accessibility label. Required for icon-only buttons.'
        }
    },
    component: {
        button: {
            title: 'Button',
            intro: 'General-purpose button component with multiple types, variants, and sizes.',
            type: 'Button Type',
            variant: 'Button Variant',
            size: 'Button Size',
            primary: 'Primary Button',
            danger: 'Danger Button',
            default: 'Default Button',
            text: 'Text Button',
            dashed: 'Dashed Button',
            block: 'Block Button',
            loading: 'Loading State',
            disabled: 'Disabled State',
            icon: 'Icon Button'
        }
    }
};
