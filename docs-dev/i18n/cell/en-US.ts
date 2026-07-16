export default {
    demo: {
        cellBasic: 'Basic',
        cellBasicDesc: 'Basic cell.',
        cellClickable: 'Clickable',
        cellClickableDesc: 'Clickable.',
        cellIconRequired: 'Icon',
        cellIconRequiredDesc: 'Icon & required.',
        cellBasicTitle: 'Basic Cell',
        cellBasicMobileDesc: 'title label + value on right'
    },
    componentIntro: {
        CellIntro: 'List item component. Cell for single row, CellGroup for grouping.'
    },
    demoDesc: {
        cell_basic: 'Cell has three parts: title (left), value (right), description (bottom).',
        cell_clickable: 'Shows arrow when clickable; entire row is tappable. Use onClick for navigation.',
        cell_icon_required: 'icon, title, value all support strings or JSX. required shows a red asterisk.',
        cell_sizes: 'Three sizes, default md (48px).',
        cell_card: 'CellGroup with card style for rounded corners and separate background.'
    },
    componentProps: {
        cell: {
            title: 'Left title.',
            value: 'Right content.',
            description: 'Description below title.',
            children: 'Custom content. title/value/description ignored.',
            icon: 'Left icon, string or JSX.',
            size: 'Size: xs / sm / md / lg.',
            required: 'Show required red asterisk.',
            center: 'Vertically center content.',
            clickable: 'Clickable. Shows right arrow.',
            onClick: 'Click callback (only when clickable).',
            class: 'Custom CSS class.',
            style: 'Inline styles.'
        }
    }
};
