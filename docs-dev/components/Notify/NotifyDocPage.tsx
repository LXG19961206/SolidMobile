import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useNotifyTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const NotifyDocPage = () => {
  const t = useT();
  const { propsTables } = useNotifyTableData();

  const demos: DemoCode[] = [
    {
      title: t('notify.demo.types'),
      code: 'Notify.primary("Connection established")\nNotify.success("Operation completed")\nNotify.warning("Low disk space")\nNotify.danger("System error")',
      desc: t('notify.demoDesc.types'),
    },
    {
      title: t('notify.demo.position'),
      code: 'Notify.show({ message: "Top notification", position: "top" })\nNotify.show({ message: "Bottom notification", position: "bottom" })',
      desc: t('notify.demoDesc.position'),
    },
    {
      title: t('notify.demo.custom'),
      code: 'Notify.show({\n  message: "Custom styled notification",\n  color: "#fff",\n  background: "linear-gradient(90deg, #667eea, #764ba2)",\n  duration: 4000,\n})',
      desc: t('notify.demoDesc.custom'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Notify</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('notify.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
