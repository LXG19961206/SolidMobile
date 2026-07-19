import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useLoadingTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const LoadingDocPage = () => {
  const t = useT();
  const { propsTables } = useLoadingTableData();

  const demos: DemoCode[] = [
    {
      title: t('loading.demo.types'),
      code: '<Loading type="spinner" />\n<Loading type="circular" />\n<Loading type="dots" />',
      desc: t('loading.demoDesc.types'),
    },
    {
      title: t('loading.demo.text'),
      code: '<Loading text="Loading..." />\n<Loading text="Loading..." type="circular" vertical />\n<Loading text="Please wait..." type="dots" />',
      desc: t('loading.demoDesc.text'),
    },
    {
      title: t('loading.demo.sizeColor'),
      code: '<Loading size={32} color="#1677ff" />\n<Loading size={28} color="#22c55e" />\n<Loading size={36} color="#f59e0b" />',
      desc: t('loading.demoDesc.sizeColor'),
    },
    {
      title: t('loading.demo.overlay'),
      code: 'const [loading, setLoading] = createSignal(false);\n\n<button onClick={async () => {\n  setLoading(true);\n  await fetchData();\n  setLoading(false);\n}}>Submit</button>\n\n{loading() && <Loading overlay text="Processing..." />}',
      desc: t('loading.demoDesc.overlay'),
    },
    {
      title: t('loading.jsxDemo'),
      code: '<Button onClick={() => {\n  setLoading(true);\n  setTimeout(() => setLoading(false), 1500);\n}}>\n  {loading()\n    ? <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>\n        <Loading size={16} color="#fff" /> Saving\n      </span>\n    : "Save"\n  }\n</Button>',
      desc: t('loading.jsxDesc'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Loading</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('loading.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
