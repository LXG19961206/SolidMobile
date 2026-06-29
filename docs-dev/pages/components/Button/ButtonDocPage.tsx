import { createSignal, type Component } from 'solid-js';
import { Button } from '../../../../src/components/Button';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import styles from './ButtonDocPage.module.css';

/* ---------------------------------------------------------------------- */
/*  Props Table Data                                                       */
/* ---------------------------------------------------------------------- */

const propsData: PropRow[] = [
  { name: 'text', type: 'string', default: '—', required: false, desc: '按钮文字。与 children 二选一，text 优先。' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: '按钮子元素。text 未提供时生效。' },
  { name: 'type', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", required: false, desc: '按钮语义色。' },
  { name: 'variant', type: "'solid' | 'outline' | 'ghost'", default: "'solid'", required: false, desc: '按钮填充方式。solid 实心，outline 线框，ghost 透明。' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", required: false, desc: '按钮尺寸。' },
  { name: 'block', type: 'boolean', default: 'false', required: false, desc: '通栏按钮，宽度撑满父容器。' },
  { name: 'round', type: 'boolean', default: 'false', required: false, desc: '胶囊形状，使用 full 圆角值。' },
  { name: 'hairline', type: 'boolean', default: 'false', required: false, desc: '0.5px 细线边框（实验性）。' },
  { name: 'color', type: 'string', default: '—', required: false, desc: '自定义背景色，优先级高于 variant。' },
  { name: 'textColor', type: 'string', default: '—', required: false, desc: '自定义文字颜色。' },
  { name: 'icon', type: 'JSX.Element', default: '—', required: false, desc: '图标元素。支持传入任意 JSX。' },
  { name: 'iconPosition', type: "'left' | 'right'", default: "'left'", required: false, desc: '图标相对文字的位置。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '禁用状态，不可点击。' },
  { name: 'loading', type: 'boolean', default: 'false', required: false, desc: '加载中状态，显示旋转动画并禁用交互。' },
  { name: 'loadingText', type: 'string', default: '—', required: false, desc: '加载中显示的文字，不设置则保留原文字。' },
  { name: 'nativeType', type: "'button' | 'submit' | 'reset'", default: "'button'", required: false, desc: 'HTML button type 属性，用于表单场景。' },
  { name: 'href', type: 'string', default: '—', required: false, desc: '链接地址。设置后按钮渲染为 a 标签。' },
  { name: 'target', type: 'string', default: '—', required: false, desc: '链接打开方式，仅在 href 存在时生效。' },
  { name: 'onClick', type: '(e: MouseEvent) => void', default: '—', required: false, desc: '点击事件回调。禁用或加载中时不触发。' },
  { name: 'class', type: 'string', default: '—', required: false, desc: '自定义 CSS class。' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: '内联样式。' },
  { name: 'aria-label', type: 'string', default: '—', required: false, desc: '无障碍标签，纯图标按钮必须设置。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'events', title: '事件 / Events' },
  { id: 'basic', title: '基础用法' },
  { id: 'icons', title: '图标按钮' },
  { id: 'states', title: '状态' },
  { id: 'link', title: '链接模式' },
  { id: 'custom-color', title: '自定义颜色' },
  { id: 'examples', title: '典型场景' },
];

/* ---------------------------------------------------------------------- */
/*  Main Doc Page                                                           */
/* ---------------------------------------------------------------------- */

export const ButtonDocPage: Component = () => {
  const [loading, setLoading] = createSignal(false);
  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <DocLayout>

      <div class={styles.page}>
        <h1 class={styles.h1}>Button 按钮</h1>
        <p class={styles.lead}>通用的操作触发按钮。支持多种变体风格、四种尺寸、图标、加载态、链接模式及自定义颜色。</p>

        {/* ---- Props Table ---- */}
        <h2 id="props" class={styles.h2}>属性 / Props</h2>
        <PropsTable rows={propsData} />

        <h2 id="css-vars" class={styles.h2}>CSS 变量</h2>
        <PropsTable rows={[
          { name: '--sc-color-primary', type: 'color', default: '#1677ff', required: false, desc: '主色背景（primary 类型）。' },
          { name: '--sc-color-primary-hover', type: 'color', default: '#4995ff', required: false, desc: '主色悬停态。' },
          { name: '--sc-color-primary-active', type: 'color', default: '#005ee2', required: false, desc: '主色按下态。' },
          { name: '--sc-color-primary-pale', type: 'color', default: '—', required: false, desc: '主色浅色背景（ghost/outline 悬停）。' },
          { name: '--sc-color-text-inverse', type: 'color', default: '#fff', required: false, desc: '按钮文字颜色。' },
          { name: '--sc-border-radius-sm', type: 'length', default: '4px', required: false, desc: '小圆角（size=sm）。' },
          { name: '--sc-border-radius-md', type: 'length', default: '8px', required: false, desc: '中圆角（size=md）。' },
          { name: '--sc-border-radius-lg', type: 'length', default: '12px', required: false, desc: '大圆角（size=lg）。' },
          { name: '--sc-border-radius-full', type: 'length', default: '999px', required: false, desc: '胶囊圆角（round 模式）。' },
        ]} />

        {/* ---- Events ---- */}
        <h2 id="events" class={styles.h2}>事件 / Events</h2>
      <div class={styles.tableWrap}>
        <table class={styles.table}>
          <thead>
            <tr><th>事件名</th><th>参数</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>onClick</code></td>
              <td><code>(e: MouseEvent) =&gt; void</code></td>
              <td>点击按钮时触发。disabled 或 loading 状态下不触发。</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ---- 基础用法 ---- */}
      <h2 id="basic" class={styles.h2}>基础用法</h2>
      <DemoBlock title="语义色 type" desc={`六种 type：primary / secondary / success / warning / danger / info`}
        code={`<Button type="primary" text="Primary" />\n<Button type="secondary" text="Secondary" />\n<Button type="success" text="Success" />\n<Button type="warning" text="Warning" />\n<Button type="danger" text="Danger" />\n<Button type="info" text="Info" />`}
      >
        <div class={styles.row}>
          <Button type="primary" text="Primary" />
          <Button type="secondary" text="Secondary" />
          <Button type="success" text="Success" />
          <Button type="warning" text="Warning" />
          <Button type="danger" text="Danger" />
          <Button type="info" text="Info" />
        </div>
      </DemoBlock>

      <DemoBlock title="不同尺寸" desc="四档尺寸：xs (28px) / sm (32px) / md (40px) / lg (48px)"
        code={`<Button size="xs">XS</Button>\n<Button size="sm">SM</Button>\n<Button size="md">MD</Button>\n<Button size="lg">LG</Button>`}
      >
        <div class={styles.row}>
          <Button type="primary" size="xs" text="XS" />
          <Button type="primary" size="sm" text="SM" />
          <Button type="primary" size="md" text="MD" />
          <Button type="primary" size="lg" text="LG" />
        </div>
      </DemoBlock>

      <DemoBlock title="填充方式 variant" desc="solid（实心）、outline（线框）、ghost（透明）三种填充方式，与 type 正交组合。"
        code={`<Button type="primary" variant="solid" text="Solid" />\n<Button type="primary" variant="outline" text="Outline" />\n<Button type="primary" variant="ghost" text="Ghost" />`}
      >
        <div class={styles.row}>
          <Button type="primary" variant="solid" text="Solid" />
          <Button type="primary" variant="outline" text="Outline" />
          <Button type="primary" variant="ghost" text="Ghost" />
        </div>
      </DemoBlock>

      <DemoBlock title="胶囊形状 (round)" desc="完全圆角，适合标签或筛选按钮。"
        code={`<Button type="primary" round text="胶囊" />\n<Button type="primary" variant="outline" round text="Outline" />`}
      >
        <div class={styles.row}>
          <Button type="primary" round text="胶囊" />
          <Button type="primary" variant="outline" round text="Outline" />
          <Button type="danger" variant="outline" round text="Danger" />
        </div>
      </DemoBlock>

      {/* ---- 图标 ---- */}
      <h2 id="icons" class={styles.h2}>图标按钮</h2>
      <DemoBlock title="图标 + 文字" desc={`通过 icon 和 iconPosition 控制。icon 支持字符串（内置图标名）或 JSX。默认图标在左。`}
        code={`<Button icon="star" text="收藏" />\n<Button icon="arrow-right" text="下一步" iconPosition="right" type="primary" />\n<Button icon="edit" text="编辑" variant="outline" />\n{/* 也支持传入 JSX */}\n<Button icon={<MyCustomIcon />} text="自定义" />`}
      >
        <div class={styles.row}>
          <Button icon="star" text="收藏" />
          <Button icon="arrow-right" text="下一步" iconPosition="right" type="primary" />
          <Button icon="edit" text="编辑" variant="outline" />
        </div>
      </DemoBlock>

      <DemoBlock title="纯图标按钮" desc="纯图标按钮必须设置 aria-label 以保证无障碍访问。"
        code={`<Button icon="search" aria-label="搜索" variant="ghost" />\n<Button icon="settings" aria-label="设置" variant="ghost" />\n<Button icon="close" aria-label="关闭" variant="ghost" />`}
      >
        <div class={styles.row}>
          <Button icon="search" aria-label="搜索" variant="ghost" />
          <Button icon="settings" aria-label="设置" variant="ghost" />
          <Button icon="close" aria-label="关闭" variant="ghost" />
        </div>
      </DemoBlock>

      {/* ---- 状态 ---- */}
      <h2 id="states" class={styles.h2}>状态</h2>
      <DemoBlock title="加载状态" desc="loading 为 true 时显示旋转动画并禁用交互。点击下方按钮体验。"
        code={`<Button loading={loading} loadingText="提交中..." onClick={submit}>{loading ? '提交中...' : '提交'}</Button>`}
      >
        <div class={styles.row}>
          <Button type="primary" text={loading() ? '提交中...' : '点击提交'} loading={loading()} loadingText="提交中..." onClick={handleLoadingDemo} />
          <Button variant="outline" text="取消" disabled={loading()} />
        </div>
      </DemoBlock>

      <DemoBlock title="禁用状态" desc="disabled 为 true 时不可点击，所有变体统一降 opacity 至 50%。"
        code={`<Button disabled>Disabled</Button>`}
      >
        <div class={styles.row}>
          <Button type="primary" text="Primary" disabled />
          <Button variant="outline" text="Outline" disabled />
          <Button type="danger" text="Danger" disabled />
          <Button variant="ghost" text="Ghost" disabled />
        </div>
      </DemoBlock>

      {/* ---- 链接模式 ---- */}
      <h2 id="link" class={styles.h2}>链接模式</h2>
      <DemoBlock title="href 渲染为 a 标签" desc="设置 href 后自动渲染为 <a> 标签，支持 target 控制打开方式。"
        code={`<Button href="https://github.com" target="_blank">打开链接</Button>\n<Button href="/page">跳转页面</Button>`}
      >
        <div class={styles.row}>
          <Button href="https://github.com" target="_blank" type="primary" text="打开链接" />
          <Button href="#" variant="outline" text="跳转页面" />
          <Button href="#" variant="ghost" text="了解更多 →" />
        </div>
      </DemoBlock>

      {/* ---- 自定义颜色 ---- */}
      <h2 id="custom-color" class={styles.h2}>自定义颜色</h2>
      <DemoBlock title="color / textColor" desc="直接覆盖背景色，文字色自动计算对比度。也可手动指定 textColor。"
        code={`<Button color="#6366f1" text="Indigo" />\n<Button color="#ec4899" text="Pink" />\n<Button color="#f59e0b" text="Amber" />\n<Button color="#10b981" text="Emerald" />`}
      >
        <div class={styles.row}>
          <Button color="#6366f1" text="Indigo" />
          <Button color="#ec4899" text="Pink" />
          <Button color="#f59e0b" text="Amber" />
          <Button color="#10b981" text="Emerald" />
        </div>
      </DemoBlock>

      {/* ---- 典型场景 ---- */}
      <h2 id="examples" class={styles.h2}>典型场景</h2>
      <DemoBlock title="表单操作栏" desc="Primary 主操作 + Outline 取消，右对齐。"
        code={`<div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>\n  <Button variant="outline">取消</Button>\n  <Button type="primary">保存</Button>\n</div>`}
      >
        <div class={styles.row} style={{ 'justify-content': 'flex-end' }}>
          <Button variant="outline" text="取消" />
          <Button type="primary" text="保存" />
        </div>
      </DemoBlock>

      <DemoBlock title="移动端底部操作" desc="block + round + size=lg，适合移动端底部固定区域。"
        code={`<Button type="primary" block round size="lg">立即购买</Button>\n<Button variant="outline" block>加入购物车</Button>`}
      >
        <div style="width:320px;display:flex;flex-direction:column;gap:0.5rem;">
          <Button type="primary" block round size="lg" text="立即购买" />
          <div style="display:flex;gap:0.5rem;">
            <Button variant="outline" block text="加入购物车" />
            <Button variant="ghost" block text="收藏" />
          </div>
        </div>
      </DemoBlock>

      <DemoBlock title="危险操作确认" desc="danger 变体用于删除类操作，搭配 outline 取消。"
        code={`<Button variant="outline">取消</Button>\n<Button type="danger">确认删除</Button>`}
      >
        <div class={styles.row}>
          <Button variant="outline" text="取消" />
          <Button type="danger" text="确认删除" />
          <Button type="danger" variant="outline" text="删除" size="xs" />
        </div>
      </DemoBlock>

      <DemoBlock title="表单提交" desc={`nativeType="submit" 配合 form 标签使用。`}
        code={`<form onSubmit={handleSubmit}>\n  <Button nativeType="submit">提交</Button>\n</form>`}
      >
        <div class={styles.row}>
          <Button type="primary" nativeType="submit" text="提交" />
          <Button variant="outline" nativeType="reset" text="重置" />
        </div>
      </DemoBlock>
      </div>
    </DocLayout>
  );
};
