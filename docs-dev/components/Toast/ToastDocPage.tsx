import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useToastTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ToastDocPage = () => {
  const t = useT();
  const { propsTables } = useToastTableData();

  const demos: DemoCode[] = [
    {
      title: t('toast.demo.types'),
      code: 'Toast.success("Operation successful!")\nToast.error("Something went wrong!")\nToast.warning("Please check your input.")\nToast.loading("Loading...")\nToast.info("This is an info message.")',
      desc: t('toast.demoDesc.types'),
    },
    {
      title: t('toast.demo.position'),
      code: 'Toast.show({ message: "Top", position: "top" })\nToast.show({ message: "Middle", position: "middle" })\nToast.show({ message: "Bottom", position: "bottom" })',
      desc: t('toast.demoDesc.position'),
    },
    {
      title: t('toast.demo.overlay'),
      code: 'Toast.show({ message: "Loading...", type: "loading", overlay: true })\nToast.info("First line\\nSecond line\\nThird line")',
      desc: t('toast.demoDesc.overlay'),
    },
    {
      title: t('toast.demo.dismiss'),
      code: 'Toast.info("Message one")\nToast.info("Message two")\n\n// 关闭所有\nToast.dismissAll()',
      desc: t('toast.demoDesc.dismiss'),
    },
    {
      title: 'JSX 自定义内容',
      code: 'Toast.info(\n  <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>\n    <span>🎂</span>\n    <span>Happy <strong>Birthday</strong>!</span>\n    <small>— from Solid Component</small>\n  </span>\n)',
      desc: 'message 支持 JSX，想塞什么塞什么。',
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Toast</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('toast.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
