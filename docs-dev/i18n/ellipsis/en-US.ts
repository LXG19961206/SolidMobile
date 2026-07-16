export default {
    demo: {
        ellipsisSingleLine: 'Single Line',
        ellipsisMultiLine: 'Multi Line',
        ellipsisCustomTag: 'Custom Tag',
        ellipsisSingleExpand: 'Single Line Expandable',
        ellipsisMultiExpand: 'Multi Line Expandable',
        ellipsisCustomExpand: 'Custom Expand/Collapse',
        ellipsisControlled: 'Controlled Mode',
        ellipsisNoOverflow: 'Short Text (No Overflow)'
    },
    section: {
        ellipsisBasic: 'Basic Usage',
        ellipsisExpandable: 'Expandable'
    },
    componentIntro: {
        EllipsisIntro: 'Text truncation component with single/multi-line ellipsis and expand/collapse. Built-in ResizeObserver adapts to container size changes. Toggle buttons use native button elements for keyboard accessibility.'
    },
    cssVars: {
        Ellipsis: {
            __sc_ellipsis_action_color: 'Action button text color. Defaults to primary theme color --sc-color-primary.',
            __sc_ellipsis_action_hover_opacity: 'Action button hover opacity. Default: 0.8.',
            __sc_ellipsis_action_gap: 'Gap between icon and text in action button. Default: 2px.',
            __sc_ellipsis_action_padding: 'Left padding of action button. Default: 4px.'
        }
    },
    demoDesc: {
        ellipsis_single_line: 'Default single-line truncation with ellipsis at the end.',
        ellipsis_multi_line: 'Use the lines prop to set the number of visible lines before truncation.',
        ellipsis_custom_tag: 'Use the as prop to change the rendered HTML tag, e.g. span or p.',
        ellipsis_single_expand: 'When expandable is enabled, an expand button automatically appears if the content overflows.',
        ellipsis_multi_expand: 'Multi-line clamp with expand/collapse. The button only appears when content actually overflows.',
        ellipsis_custom_expand: 'Customize the expand/collapse button content via expandElement / collapseElement props.',
        ellipsis_controlled: 'Control the expanded state externally via expanded + onExpandChange.',
        ellipsis_no_overflow: 'When the text is short and does not exceed the line limit, no button is shown.'
    },
    componentProps: {
        ellipsis: {
            lines: 'Number of visible lines before truncation.',
            expandable: 'Enable expand/collapse. Button only appears when content overflows.',
            expanded: 'Controlled expanded state.',
            defaultExpanded: 'Default expanded state (uncontrolled).',
            onExpandChange: 'Callback when expanded state changes.',
            showAction: 'Whether to show the expand/collapse button. Set to false for controlled mode with an external trigger.',
            expandElement: 'Custom expand button content (JSX supported).',
            collapseElement: 'Custom collapse button content (JSX supported).',
            as: 'Rendered HTML tag, defaults to div.',
            class: 'Custom CSS class.',
            style: 'Inline style.'
        }
    }
};
