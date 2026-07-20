export default {
  i18n: {
    title: 'i18n 国际化',
    intro: 'solid-mobile 内置中英文双语支持，组件运行时通过 locale 自动切换。业务文案可使用 useT() 函数，或自行接入第三方 i18n 方案——组件库不绑定任何特定方案。',
    runtimeTitle: '运行时切换',
    runtimeDesc: '使用 setGlobalLocale() 即可切换组件内部文本。业务文案可通过 useT() 读取翻译字典。',
    dictTitle: '扩展翻译字典',
    dictDesc: '通过 registerLocale() 注册自定义翻译词条，深层合并到内置字典。适合组件文档站、管理后台等需要大量业务文案的场景。',
    phoneTitle: '手机预览 — 实时切换',
    phoneDesc: '点击下方按钮分别切换中英文，下面是一个真实的 Picker 组件，标题和按钮文字会随语言切换而变化：',
    components: '组件内置文案',
    business: '业务文案',
    pickerTitle: '选择日期',
    zh: '中文',
    en: '英文',
    switchLang: '切换语言',
    greeting: '你好，世界！',
  },
};
