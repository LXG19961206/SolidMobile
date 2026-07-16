export default {
    demo: {
        ellipsisSingleLine: '单行省略',
        ellipsisMultiLine: '多行省略',
        ellipsisCustomTag: '自定义标签',
        ellipsisSingleExpand: '单行可展开',
        ellipsisMultiExpand: '多行可展开',
        ellipsisCustomExpand: '自定义展开按钮',
        ellipsisControlled: '受控模式',
        ellipsisNoOverflow: '短文本（无溢出）'
    },
    section: {
        ellipsisBasic: '基础用法',
        ellipsisExpandable: '可展开/收起'
    },
    componentIntro: {
        EllipsisIntro: '文字省略组件，处理文字超出隐藏。支持单行/多行省略、展开/收起。内置 ResizeObserver 自动响应容器尺寸变化，按钮使用原生 button 元素支持键盘无障碍操作。'
    },
    cssVars: {
        Ellipsis: {
            __sc_ellipsis_action_color: '展开/收起按钮颜色。默认为主题主色 --sc-color-primary。',
            __sc_ellipsis_action_hover_opacity: '按钮 hover 态透明度，默认 0.8。',
            __sc_ellipsis_action_gap: '按钮内图标与文字的间距，默认 2px。',
            __sc_ellipsis_action_padding: '按钮左侧内边距，默认 4px。'
        }
    },
    demoDesc: {
        ellipsis_single_line: '默认单行省略，超出部分在末尾显示省略号。',
        ellipsis_multi_line: '通过 lines 属性控制显示行数，超出后在第 N 行末尾打省略号。',
        ellipsis_custom_tag: '通过 as 属性切换渲染标签，如 span、p 等。',
        ellipsis_single_expand: 'expandable 开启后，内容超出时自动显示展开按钮，点击可查看完整内容。',
        ellipsis_multi_expand: '多行省略 + 可展开。展开按钮仅在内容真正溢出时才出现。',
        ellipsis_custom_expand: '通过 expandElement / collapseElement 自定义按钮内容，支持 JSX。',
        ellipsis_controlled: '通过 expanded + onExpandChange 受控管理展开状态。',
        ellipsis_no_overflow: '文字较短、未超出行数限制时，不显示展开按钮。'
    },
    componentProps: {
        ellipsis: {
            lines: '显示行数，超出后打省略号。',
            expandable: '是否可展开/收起，开启后仅在内容溢出时显示按钮。',
            expanded: '受控模式：当前是否展开。',
            defaultExpanded: '非受控模式：默认是否展开。',
            onExpandChange: '展开状态变化回调。',
            showAction: '是否显示展开/收起按钮，默认 true。受控模式下可设为 false，由外部触发。',
            expandElement: '展开按钮内容，支持传入 JSX。',
            collapseElement: '收起按钮内容，支持传入 JSX。',
            as: '渲染的 HTML 标签，默认 div。',
            class: '自定义 CSS class。',
            style: '内联样式。'
        }
    }
};
