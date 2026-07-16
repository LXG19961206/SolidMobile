export default {
    demo: {
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
        UploadIntro: '文件选择、预览与上传组件。支持图片缩略图网格和文件列表两种展示模式，通过 api 属性注入上传策略。'
    },
    nav: {
        upload: 'Upload 文件上传'
    },
    demoDesc: {
        upload_iconmap: 'iconMap 按文件后缀指定图标，支持内置图标名或自定义 JSX。特殊 key image/video/audio 匹配 MIME 类别，* 为兜底。',
        upload_limits: 'maxCount 限制数量，maxSize 限制单文件大小，beforeUpload 自定义校验。',
        upload_controlled: '通过 fileList + onChange 完全接管文件列表。',
        upload_callbacks: 'onSuccess / onError 监听单个文件的上传结果，适合做提示或埋点。',
        upload_custom_button: '传入 children 替代默认的 + 按钮。',
        upload_custom_render: 'renderFile + children 完全接管文件项和添加按钮的渲染。'
    },
    componentProps: {
        upload: {
            type: '展示类型。image 缩略图网格，file 文件列表。',
            accept: '接受的文件类型，同 <input accept>。',
            multiple: '是否允许多选。',
            maxCount: '最大文件数，达到后隐藏添加按钮。',
            capture: '调用系统相机。',
            maxSize: '单文件大小上限 (bytes)。',
            beforeUpload: '上传前置校验，return false 跳过该文件。',
            api: '上传函数。必须返回文件 URL 用于反显。不传则只管理文件列表。',
            fileList: '受控文件列表。',
            defaultFileList: '非受控初始文件列表。',
            onChange: '列表变化回调（添加 / 删除 / 状态变更 / 进度更新）。',
            onSuccess: '单个文件上传成功回调。',
            onError: '单个文件上传失败回调。',
            onDelete: '删除前回调，return false 阻止删除。',
            disabled: '禁用上传。',
            iconMap: '文件后缀到图标映射。',
            children: '自定义添加按钮。',
            renderFile: '自定义文件项渲染。'
        }
    }
};
