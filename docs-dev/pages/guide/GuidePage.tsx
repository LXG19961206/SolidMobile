import { type Component } from 'solid-js';
import { CodeBlock } from '../../doc-utils';

const GuidePage: Component = () => (
  <div class="guide-card">
    <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 1rem' }}>快速开始</h1>
    <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>
      solid-mobile 是一个基于 SolidJS 的移动端组件库，提供丰富、易用的 UI 组件。
    </p>

    <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>安装</h2>
    <CodeBlock lang="bash" code="npm install solid-mobile" />

    <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>引入样式</h2>
    <CodeBlock lang="tsx" code={`// 在入口文件引入全局样式
import 'solid-mobile/styles.css';`} />

    <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>基础用法</h2>
    <CodeBlock lang="tsx" code={`import { Button, Toast, ToastRenderer } from 'solid-mobile';

function App() {
  return (
    <>
      <Button type="primary" text="Hello" onClick={() => Toast.success('你好')} />
      <ToastRenderer />
    </>
  );
}`} />

    <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>ConfigProvider 全局配置</h2>
    <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
      使用 ConfigProvider 在应用根节点配置主题色、暗色模式、国际化等全局设置。
    </p>
    <CodeBlock lang="tsx" code={`import { ProviderConfig } from 'solid-mobile';

function App() {
  return (
    <ProviderConfig config={{ colors: { light: { primary: '#6366f1' } }, locale: 'zh-CN' }}>
      {/* 你的应用 */}
    </ProviderConfig>
  );
}`} />
  </div>
);

export { GuidePage };
