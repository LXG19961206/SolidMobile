export default {
    demo: {
        rateCount: 'Count',
        rateCountDesc: 'Custom count.',
        rateBasic: 'Basic Rating',
        rateBasicDesc: 'Default 5 stars, tap to rate'
    },
    componentIntro: {
        RateIntro: 'Rating with half-star, clearable, custom icons and colors.'
    },
    nav: {
        rate: 'Rate'
    },
    demoDesc: {
        rate_count: 'count controls total icon count.',
        rate_size_gutter: 'size for icon size, gutter for spacing.',
        rate_readonly: 'Non-interactive in readonly state.'
    },
    componentProps: {
        rate: {
            value: 'Current rating value.',
            onChange: 'Rating change callback.',
            count: 'Total icon count, default 5.',
            size: 'Icon size.',
            gutter: 'Icon spacing.',
            color: 'Color when active.',
            voidColor: 'Color when inactive.',
            disabledColor: 'Color when disabled.',
            icon: 'Icon name when active, maps to Icon name prop.',
            voidIcon: 'Icon name when inactive.',
            allowHalf: 'Allow half-star selection.',
            clearable: 'Allow clearing on second click.',
            readonly: 'Readonly.',
            disabled: 'Disabled.'
        }
    }
};
