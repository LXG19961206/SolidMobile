# 组件文档范式

以 Button 为模板，每个组件统一结构。

## 目录结构

```
docs-dev/components/Xxx/
├── XxxDocPage.tsx    ← 桌面文档页
├── XxxMobile.tsx     ← 移动端 Demo 页
├── zh-CN.ts          ← 简体中文词条
├── en-US.ts          ← 英文词条
└── tableData.ts      ← Props + CSS Vars 数据（可选）
```

不再拆分到 `i18n/`、`pages/components/`、`pages/mobile/` 三个地方。

## 文件职责

### zh-CN.ts / en-US.ts

组件专用的全部 i18n 词条，使用 `namespace` 包装防冲突：

```ts
export default {
  xxx: {                          // namespace：与目录名一致
    props: {
      type: '按钮语义色。',
      size: '按钮尺寸。',
    },
    cssVars: {
      '--sc-color-primary': '主色。',
    },
    demo: {
      basic: '基础用法',
    },
    demoDesc: {
      basic: '默认用法。',
    },
    intro: '组件一句话介绍。',
  },
};
```

调用时：`t('xxx.props.type')`、`t('xxx.demo.basic')`，永远不会和其他组件冲突。

### tableData.ts

桌面和移动端共用一份表格数据，消除重复维护风险：

```ts
import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useData() {
  const t = useT();
  const propsTables: TableSection[] = [{ rows: [...] }];
  const cssVarsTables: TableSection[] = [{ rows: [...] }];
  return { propsTables, cssVarsTables };
}
```

### XxxDocPage.tsx

桌面完整文档：标题 + 介绍 + Props 表 + CSS 变量表 + Demo 代码块

```tsx
import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs, DemoCodeBlock } from '../../doc-utils';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const XxxDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useData();
  const demos: DemoCode[] = [...];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1>Xxx</h1>
        <p>{t('xxx.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
```

### XxxMobile.tsx

移动端 Demo：MobilePreview 包裹 + MobilePropsSheet + Card 分组的 demo

```tsx
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Xxx } from '../../../src/components/Xxx';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const XxxMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useData();

  return (
    <MobilePreview title="Xxx">
      {/* 独立模式显示"Props & CSS Vars"入口按钮 */}
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      {/* Demo 卡片组 */}
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('xxx.demo.basic')} subtitle="one / two / three">
          <Xxx ... />
        </Card>
      </div>
    </MobilePreview>
  );
};
```

### 注册到 App.tsx

```tsx
const XxxDocPage = lazy(() => import('./components/Xxx/XxxDocPage').then(m => ({default: m.XxxDocPage})));
const XxxMobile = lazy(() => import('./components/Xxx/XxxMobile').then(m => ({default: m.XxxMobile})));

// PAGES_MOBILE
{ xxx: XxxMobile }

// PAGES
{ xxx: XxxDocPage }
```

### 注册到 nav.ts

```tsx
{ name: 'Xxx 中文名', key: 'xxx' }
```

## 共享组件

| 组件 | 用途 |
|---|---|
| `DocLayout` | 桌面布局（左侧文档 + 右侧手机模拟器 iframe） |
| `PropsAttrs` | Props 表格 + CSS 变量表格（桌面完整、移动端紧凑） |
| `MobilePropsSheet` | 移动端属性查看入口 + ActionSheet 弹出（自动处理 iframe 隐藏） |
| `DemoCodeBlock` | 桌面代码块（Card 包裹 + Prism 高亮 + 复制按钮） |
| `Card` | 通用卡片容器（demo 分组用） |
| `MobilePreview` | 移动端页面外壳（NavBar + inIframe 检测） |

## 三端视图

| 场景 | 展示内容 |
|---|---|
| **桌面** | 完整文档（Props 表 + CSS 变量 + 代码块） |
| **移动端 iframe** | 纯 Demo 卡片（无属性表、无 NavBar） |
| **移动端独立** | Demo 卡片 + "Props & CSS Vars" 底部弹出 |

## Demo 规范

| 项 | 规则 |
|---|---|
| Props 表 desc | 用 `t('xxx.props.*')` i18n 键值 |
| CSS 变量表 desc | 用 `t('xxx.cssVars.*')` i18n 键值 |
| Demo 卡片 title | 用 `t('xxx.demo.*')` i18n 键值 |
| Demo 按钮文字 | 简单英文，不翻译 |
| Card subtitle | 简单英文，不翻译 |
