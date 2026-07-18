export default {
  safearea: {
    props: {
      position: '安全区域位置：top（顶部）/ bottom（底部）。',
      class: '自定义 CSS class。',
    },
    cssVars: {
      '--sc-safe-area-top': '顶部安全区高度。默认回退 env(safe-area-inset-top, 0px)。',
      '--sc-safe-area-bottom': '底部安全区高度。默认回退 env(safe-area-inset-bottom, 0px)。',
    },
    demo: {
      layout: '典型页面布局',
    },
    demoDesc: {
      layout: 'SafeArea spacer + NavBar + 内容区 + TabBar 的完整页面骨架，均使用 spacer 模式平级排列。',
    },
    intro: '安全区域占位组件，确保内容不被设备的刘海屏、状态栏、Home Indicator 等遮挡。',
    design: {
      cardTitle: '设计理念与实践场景',
      para1: 'SafeArea 是一个纯粹的平台适配组件，用于解决异形屏设备的内容遮挡问题。',
      whyTitle: '为什么需要 SafeArea',
      notch: '刘海屏 / 挖孔屏',
      notchDesc: '：iOS 刘海区域约 44px，Android 挖孔屏各厂家尺寸不一。内容如果不避开，会被摄像头区域遮挡。',
      statusBar: '状态栏',
      statusBarDesc: '：部分 Android 设备状态栏高度不固定，webview 中难以精确获取。',
      homeIndicator: 'Home Indicator',
      homeIndicatorDesc: '：iOS 底部横条区域约 34px，点击/滑动操作误触会触发返回桌面。',
      cssChainTitle: 'CSS 变量回退链',
      cssChainDesc: 'SafeArea 的高度 / padding 通过 CSS 变量链逐级回退，确保在所有环境下都有合理表现：',
      chainUser: '用户自定义（最高优先级）',
      chainDevice: '设备原生安全区',
      chainFallback: '兜底（非异形屏或无 WebView 支持时）',
      modesTitle: '两种用法',
      spacerTitle: 'Spacer 模式（无 children）',
      spacerDesc: '单纯用于占位，撑出安全区域的高度。适合与 NavBar / TabBar 平级排列：',
      containerTitle: 'Container 模式（有 children）',
      containerDesc: '将 NavBar / TabBar 放入 SafeArea 内部，自动为顶部/底部添加 padding，组件结构更紧凑：',
      customTitle: '自定义安全区高度',
      customDesc: '在某些场景下（如模拟器、非 iOS 设备、用户自定义主题），可以通过 CSS 变量覆盖安全区高度：',
      priority: '优先级：组件 style prop > --sc-safe-area-* 变量 > env(safe-area-inset-*) > 0px',
    },
  },
};
