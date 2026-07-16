# 文档站 i18n 指南

## 架构

```
docs-dev/i18n/
├── common/
│   ├── zh-CN.ts    ← nav (所有组件侧边栏标签) + common.* (共享 UI 文字)
│   └── en-US.ts
├── button/
│   ├── zh-CN.ts    ← 按钮组件全部词条
│   └── en-US.ts
├── input/
│   ├── zh-CN.ts
│   └── en-US.ts
└── ...              ← 每个组件一个目录
```

- **common** 只放 nav 和 common.*，不要放组件专属词条
- **每个组件目录** 自包含：demo、demoDesc、componentProps、section、cssVars、componentIntro

## 添加新组件

### 1. 创建 locale 文件

```ts
// docs-dev/i18n/newcomponent/zh-CN.ts
export default {
  demo: {
    basicUsage: '基础用法',
    customStyle: '自定义样式',
  },
  demoDesc: {
    basic_usage: '默认用法说明。',
    custom_style: '自定义样式说明。',
  },
  section: {
    basic: '基础用法',
    advanced: '高级用法',
  },
  componentIntro: {
    NewComponentIntro: '组件简介，一句话描述。',
  },
  componentProps: {
    newcomponent: {
      // 如果 Props 表需要翻译，放在这里
      size: '尺寸。',
      color: '颜色。',
    },
  },
  cssVars: {
    // 如有 CSS 变量
    NewComponent: {
      __sc_newcomponent_bg: '背景色。',
    },
  },
};
```

```ts
// docs-dev/i18n/newcomponent/en-US.ts  —— 同样结构，英文值
export default {
  demo: {
    basicUsage: 'Basic Usage',
    customStyle: 'Custom Style',
  },
  // ...
};
```

### 2. 在 doc 页中注册

```tsx
// Desktop: pages/components/NewComponent/NewComponentDocPage.tsx
// Mobile:  pages/mobile/NewComponentMobile.tsx

import zhCN from '../../../i18n/newcomponent/zh-CN';
import enUS from '../../../i18n/newcomponent/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
```

注意：`registerLocale` 调用必须放在 `useT` import 之前。

### 3. 在 common 里加 nav 标签

在 `i18n/common/zh-CN.ts` 和 `i18n/common/en-US.ts` 的 `nav` 对象里加一行：

```ts
nav: {
  // ...existing entries
  newcomponent: 'NewComponent 新组件',  // zh-CN
  newcomponent: 'NewComponent',         // en-US
}
```

## Demo 文字规范

| 项 | 规则 | 示例 |
|---|---|---|
| Props 表 desc | 用 i18n key `componentProps.<comp>.<prop>` | `componentProps.tooltip.content` |
| CSS 变量表 desc | 用 i18n key `cssVars.<Comp>.__sc_<var>` | `cssVars.Tooltip.__sc_tooltip_bg` |
| Demo title | 用 `t('demo.xxx')`，中英双译 | `t('demo.basicUsage')` |
| Demo 内容文字 | 用简单英文，**不翻译** | `"Hello world"` |

## 不要做的事

- 不要在 common 里放 demo/demoDesc/componentProps/componentIntro/section/cssVars
- 不要用 `import.meta.glob` 或动态 `import()`
- 不要跑 `scripts/rebuild-i18n.cjs` — 它会从旧 dict 重建，覆盖手动翻译
- 不要跑 `scripts/translate-*.cjs` — 机器翻译质量不可控
- 每个组件词条都在自己的目录下手写
