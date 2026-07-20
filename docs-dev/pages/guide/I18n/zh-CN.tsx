import type { JSX } from 'solid-js';

const Code = (p: { children: string }) => <code style={{ background: '#f3f4f6', padding: '1px 4px', 'border-radius': '3px', 'font-size': '0.9em' }}>{p.children}</code>;
const Strong = (p: { children: JSX.Element }) => <strong>{p.children}</strong>;

export default {
  i18n: {
    title: 'i18n 国际化',
    intro: 'solid-mobile 内置中英文双语支持，组件运行时通过 locale 自动切换。业务文案可使用 useT() 函数，或自行接入第三方 i18n 方案——组件库不绑定任何特定方案。',

    downloadTitle: '下载词条模板',
    downloadDesc: <><Strong>点击下方按钮下载组件运行时词条模板（JSON）。</Strong>仅包含组件实际使用的文案（Picker、Dialog、Calendar 等的按钮、占位符、状态提示），不含文档站内部词条。</>,
    downloadSteps: '使用步骤：',
    downloadStep1: '1. 下载模板 → 2. 将英文 value 替换为目标语言 → 3. 通过 localeMessages 传入',
    downloadNote: <><Strong>注意：</Strong>JSON 的层级结构必须保持不变。你可以删除不需要翻译的字段（缺失的自动回退英文），但不能改变 key 的嵌套层级关系（如 <Code>component.picker.cancel</Code> 必须是 {`{ component: { picker: { cancel: "..." } } }`} 这样的结构）。</>,
    downloadBtn: '下载英文词条模板 (JSON)',

    demoTitle: '多语言演示',
    demoDesc: '选择一种语言，下方 Picker 组件的标题和按钮文字会跟随切换：',

    basicTitle: '基础用法',
    overrideTitle: '覆盖内置词条',
    overrideDesc: <>你也可以用同样的方式 <Strong>覆盖</Strong> zh-CN / en-US 中的特定词条。同 key 以用户提供的为准。</>,

    fallbackTitle: '回退机制',
    fallbackDesc: '当某个 key 在当前语言中不存在时，按以下链路回退：',
    fallback1: <><Strong>当前语言</Strong>（如 ja-JP，含用户自定义字典）</>,
    fallback2: <><Strong>en-US</Strong>（内置英文，作为通用兜底）</>,
    fallback3: <><Strong>返回 key path</Strong>（如 component.picker.confirm），同时在控制台输出 console.warn（同一 key 仅警告一次）</>,
    fallbackNote: <>这意味着 <Strong>你不需要一次性翻译完所有词条</Strong>——传一部分，剩下的自动走英文兜底。控制台的 warning 能帮你快速定位还有哪些 key 没覆盖。</>,

    dictTitle: '字典结构总览',
    dictDesc: '以下是内置字典的顶层结构，你可以按需覆盖任意层级的 key：',

    progTitle: '编程式 API',
    progDesc: <>除了通过 <Code>ProviderConfig</Code> 的 prop 传入，你也可以在应用入口直接调用 <Code>setUserMessages()</Code>：</>,
  },
};
