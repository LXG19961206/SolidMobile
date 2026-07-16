# 文档站 i18n 约定

> **AI 助手须知**：本文件是文档站国际化的唯一权威约定。添加新组件文档时，**必须同步添加 i18n 词条**。

## 四条铁律

添加或修改任何组件文档页时，以下 **必须国际化**：

| 必须国际化 | 方式 | 示例 |
|---|---|---|
| **Props 属性表** | `desc: 'componentProps.<c>.<p>'`，字典填中英描述 | `componentProps.tooltip.content` |
| **CSS 变量表** | `desc: 'cssVars.<C>.__sc_<var>'`，字典填中英描述 | `cssVars.Tooltip.__sc_tooltip_bg` |
| **每个 Demo 的 title** | `title={t('demo.<key>')}`，字典填中英标题 | `t('demo.tooltipBasic')` |

以下 **不需要国际化**：

| 不需要国际化 | 做法 |
|---|---|
| **Demo 内容文字** | 一律使用最简单基础的英文，保证各国用户能看懂 |

简言之：**表格和标题必须翻译，Demo 内容写简单英文**。

## 文件职责

| 文件 | 用途 | 操作 |
|---|---|---|
| `docs-dev/i18n/<component>/zh-CN.ts` + `en-US.ts` | 每个组件独立的 i18n 词条，~30 行 | **在此新增词条** |
| `docs-dev/i18n/common/zh-CN.ts` + `en-US.ts` | 全局通用词条（common.*，分组标题等） | 跨组件词条放这里 |
| `docs-dev/doc-dictionaries.ts` + `doc-dictionaries-extra.ts` | 旧词条，已通过 migrate-i18n.cjs 拆到 `i18n/` 目录 | **不要再往里加东西，逐步废弃** |
| `src/i18n/dictionaries.ts` | 组件运行时词条（按钮文案、占位符等） | 仅组件内部使用的文案 |

### 按需加载机制

每个 doc 页 import 自己的词条文件并调用 `registerLocale()`：

```tsx
import { useT, registerLocale } from '../../../doc-i18n';
import zhCN from '../../../i18n/button/zh-CN';
import enUS from '../../../i18n/button/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
```

`registerLocale` 将词条 deep-merge 到运行时 dict。**不 import 不加载**，零浪费。Common 词条在 `doc-i18n.ts` 中自动注册。

## 词条命名规范

### demo 标题: `demo.<component><Variant>`
```ts
// zh-CN
demo: {
  tooltipBasic: '基础 Hover',
  tooltipPlacement: '多方向弹出',
  ellipsisSingleLine: '单行省略',
  tabsScrollable: '横向滚动',
}
// en-US
demo: {
  tooltipBasic: 'Basic Hover',
  tooltipPlacement: 'Placements',
  ellipsisSingleLine: 'Single Line',
  tabsScrollable: 'Scrollable Tabs',
}
```

### demo 描述: `demoDesc.<component>_<variant>`
```ts
// zh-CN
demoDesc: {
  tooltip_basic: '默认 hover 触发，鼠标悬停按钮即可看到气泡。',
  ellipsis_single_line: '默认单行省略，超出部分在末尾显示省略号。',
}
// en-US
demoDesc: {
  tooltip_basic: 'Default hover trigger. Hover the button to see the tooltip.',
  ellipsis_single_line: 'Default single-line truncation with ellipsis at the end.',
}
```

### Props 描述: `componentProps.<component>.<prop>`
```ts
componentProps: {
  tooltip: {
    content: '气泡内容，支持字符串或 JSX。',
    placement: '弹出方向：top / bottom / left / right。',
  },
  ellipsis: {
    lines: '显示行数，超出后打省略号。',
    expandable: '是否可展开/收起。',
  },
}
```

### 组件简介: `componentIntro.<Component>Intro`
```ts
componentIntro: {
  TooltipIntro: '气泡提示组件，hover/click/focus 时弹出...',
  EllipsisIntro: '文字省略组件，处理文字超出隐藏...',
}
```

### 章节标题: `section.<component><Section>`
```ts
section: {
  ellipsisBasic: '基础用法',
  ellipsisExpandable: '可展开/收起',
  tooltipBasic: '基础用法',
  tooltipCSSVars: 'CSS 变量',
}
```

### CSS 变量: `cssVars.<Component>.__sc_<var>`
```ts
cssVars: {
  Tooltip: {
    __sc_tooltip_bg: '气泡背景色，默认 #1f2937。',
    __sc_tooltip_arrow_size: '三角箭头大小，默认 5px。',
  },
}
```

### 导航标签: `nav.<key>`
```ts
nav: {
  tooltip: 'Tooltip 气泡提示',
  ellipsis: 'Ellipsis 文字省略',
}
```

## 文档页中的使用

### import
```tsx
import { useT } from '../../../doc-i18n';
```

### PropsTable
```tsx
// desc 填 key 路径字符串，PropsTable 内部自动调用 t()
const propsData: PropRow[] = [
  { name: 'content', type: 'JSX.Element', desc: 'componentProps.tooltip.content' },
  { name: 'placement', type: "'top' | 'bottom'", desc: 'componentProps.tooltip.placement' },
];
```

### DemoBlock
```tsx
// title 必须用 t()，desc 建议用 t()（简短说明也可 inline 英文）
<DemoBlock
  title={t('demo.tooltipBasic')}
  desc={t('demoDesc.tooltip_basic')}
  code={`<Tooltip content="Hello">...</Tooltip>`}
>
  {/* Demo 内容文字一律用简单英文 */}
  <Tooltip content="Hello! This is a tooltip.">
    <Button>Hover me</Button>
  </Tooltip>
</DemoBlock>
```

### CSS 变量表
```tsx
<PropsTable rows={[
  { name: '--sc-tooltip-bg', type: 'color', default: '#1f2937', desc: 'cssVars.Tooltip.__sc_tooltip_bg' },
]} />
```

### 导航
`nav.ts` 中注册 `{ name: 'Tooltip 气泡提示', key: 'tooltip' }` 后，侧边栏通过 `t('nav.tooltip')` 展示。

## 添加新组件的 checklist

1. [ ] `doc-dictionaries-extra.ts` — `zh-CN` 和 `en-US` 各加：
   - `demo.<component>*` / `demoDesc.<component>*`
   - `componentProps.<component>.*`
   - `componentIntro.<Component>Intro`
   - `section.<component>*`
   - `cssVars.<Component>.*`（如有 CSS 变量）
   - `nav.<key>`（中文导航名）
2. [ ] `nav.ts` — `GROUPS` 中注册 `{ name, key }`
3. [ ] `App.tsx` — import DocPage 和 Mobile 组件，注册到 `PAGES` / `PAGES_MOBILE`
4. [ ] 文档页中使用 `t()` 引用 key
5. [ ] demo 内容使用**简单英文**，保证多国用户可读
6. [ ] 运行 `npx tsc --noEmit` 确认零错误

## 翻译风格

- **zh-CN**: 简洁中文，完整句子以句号结尾
- **en-US**: Simple English, no jargon. Write for an international audience
- **Demo 文字内容**: 一律用简单英文（`This is a long text...`），不写中文
- **Props 描述**: 中文用 "默认 xxx。" 结尾，英文用 "Default: xxx." 结尾
