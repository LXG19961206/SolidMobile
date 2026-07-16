export default {
    demo: {
        uploadDesignNoHttp: 'Upload <strong>does not provide</strong> <code>action</code>, <code>headers</code>, <code>data</code>, <code>withCredentials</code> or other request-related props. The reason is simple: <strong>HTTP requests are a concern of the business layer, not the component layer.</strong>',
        uploadDesignWhyApi: 'Traditional component libraries spread these parameters as props and send requests on your behalf. It seems convenient, but in reality every project has different Authorization, BaseURL, timeout, and retry strategies — you can never list enough props. More importantly, your global HTTP interceptors and token refresh logic already work fine; why let the component add another layer?',
        uploadDesignDecoupleTitle: 'No HTTP library lock-in',
        uploadDesignDecoupleDesc: 'fetch, axios, ky, wx.uploadFile — you implement the api function; no restrictions on the request method.',
        uploadDesignTokenTitle: 'Infrastructure intact',
        uploadDesignTokenDesc: 'Your request instance — interceptors, token refresh, error handling, loading state — all remain unaffected.',
        uploadDesignOssTitle: 'Any upload flow',
        uploadDesignOssDesc: 'OSS signatures, COS auth headers, callbacks — all achievable through a single async function. The traditional action + data model cannot describe such scenarios.',
        uploadDesignTestTitle: 'Naturally testable',
        uploadDesignTestDesc: 'Pass an async () => ({ url: "/fake" }) — no HTTP mocking required. Upload logic is fully decoupled from UI; tests verify UI behavior only.',
        uploadDesignIoc: '<strong>Upload does one thing: manage the file lifecycle</strong> (select file → validate → display → delete). "How to upload" is a <strong>strategy</strong>, injected by you via the <code>api</code> prop (Inversion of Control / IoC): you write a function that returns a Promise, and Upload calls it. Tokens, interceptors, and HTTP libraries are all under your control. If you do not pass <code>api</code>, Upload degrades to a "file picker + list manager".'
    },
    componentIntro: {
        UploadIntro: 'File selection, preview, upload. Image grid and file list.'
    },
    nav: {
        upload: 'Upload'
    },
    demoDesc: {
        upload_iconmap: 'iconMap maps extensions to icons. Special keys: image/video/audio for MIME, * for fallback.',
        upload_limits: 'maxCount limits files; maxSize limits per-file; beforeUpload for validation.',
        upload_controlled: 'Full control via fileList + onChange.',
        upload_callbacks: 'onSuccess/onError for per-file upload results. For toasts or analytics.',
        upload_custom_button: 'Pass children to replace default + button.',
        upload_custom_render: 'renderFile + children for full custom rendering.'
    },
    componentProps: {
        upload: {
            type: 'Display type. image=thumbnail grid, file=file list.',
            accept: 'Accepted file types, same as <input accept>.',
            multiple: 'Allow multi-select.',
            maxCount: 'Max file count. Add button hidden when reached.',
            capture: 'Invoke system camera.',
            maxSize: 'Max single file size (bytes).',
            beforeUpload: 'Pre-upload guard. Return false to skip the file.',
            api: 'Upload function. Must return file URL for display. Only manages list if omitted.',
            fileList: 'Controlled file list.',
            defaultFileList: 'Uncontrolled initial file list.',
            onChange: 'File list change callback (add/delete/status/progress).',
            onSuccess: 'Single file upload success callback.',
            onError: 'Single file upload error callback.',
            onDelete: 'Pre-delete guard. Return false to prevent deletion.',
            disabled: 'Disable upload.',
            iconMap: 'File extension to icon mapping.',
            children: 'Custom add button.',
            renderFile: 'Custom file item render.'
        }
    }
};
