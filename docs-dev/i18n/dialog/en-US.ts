export default {
    demo: {
        asyncLoading: 'Async Loading',
        dialogAlert: 'Alert',
        dialogAlertDesc: 'Alert.',
        dialogConfirm: 'Confirm',
        dialogConfirmDesc: 'Confirm.',
        dialogCustomText: 'Custom Text',
        dialogCustomTextDesc: 'Custom text.',
        dialogDismiss: 'Dismiss',
        dialogDismissDesc: 'Dismiss.',
        dialogJSX: 'JSX',
        dialogJSXDesc: 'JSX content.',
        dialogMultiline: 'Multiline',
        dialogMultilineDesc: 'Multiline.',
        dialogNoTitle: 'No Title',
        dialogNoTitleDesc: 'No title.',
        dialogRenderer: 'Renderer',
        dialogRendererDesc: 'Renderer.',
        dialogBasic: 'Basic Dialogs',
        dialogBasicDesc: 'alert (confirm only) / confirm (with cancel) / message without title',
        dialogAdvanced: 'Advanced Dialogs',
        dialogAdvancedDesc: 'Custom button text / JSX content / async confirm / prevent close',
        dialogComponentDismiss: 'Component & Manual Dismiss',
        dialogComponentDismissDesc: 'Declarative JSX component / handle.dismiss() for manual close'
    },
    componentIntro: {
        DialogIntro: 'Centered modal dialog. Declarative component or imperative API.'
    },
    demoDesc: {
        dialog_alert: 'Basic alert with confirm button only.',
        dialog_confirm: 'With cancel button for delete confirmation.',
        dialog_no_title: 'Content only when no title.',
        dialog_custom_text: 'Custom button text via confirmText/cancelText.',
        dialog_jsx: 'message supports JSX.',
        dialog_async: 'Auto-loading when onConfirm is async.',
        dialog_component: 'Controlled via show prop for embedding in templates.'
    },
    componentProps: {
        dialog: {
            show: 'Whether dialog is visible (controlled, required).',
            title: 'Title, supports string or JSX.',
            message: 'Content, supports line breaks and JSX.',
            width: 'Dialog width.',
            messageAlign: 'Content horizontal alignment: left / center / right.',
            showConfirmButton: 'Show confirm button, default true.',
            showCancelButton: 'Show cancel button, default false.',
            confirmText: 'Confirm button text.',
            cancelText: 'Cancel button text.',
            confirmDisabled: 'Disable confirm button.',
            cancelDisabled: 'Disable cancel button.',
            zIndex: 'Stack level, default 2000.',
            overlay: 'Show overlay, default true.',
            closeOnClickOverlay: 'Close on overlay click, default false.',
            lockScroll: 'Lock background scroll, default true.',
            beforeClose: 'Before-close guard. Return false to prevent close.',
            onConfirm: 'Confirm callback.',
            onCancel: 'Cancel callback.',
            onClose: 'Close callback.',
            teleport: 'Mount target node.',
            destroyOnClose: 'Destroy content on close.',
            lazyRender: 'Lazy render, default true.'
        }
    }
};
