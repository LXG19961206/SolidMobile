import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useOverlayTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const OverlayDocPage = () => {
  const t = useT();
  const { propsTables } = useOverlayTableData();

  const demos: DemoCode[] = [
    {
      title: t('overlay.demo.basic'),
      code: 'const [open, setOpen] = createSignal(false);\n\n<Overlay open={open()} onClose={() => setOpen(false)}>\n  <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>\n    <p>Click backdrop to close</p>\n  </div>\n</Overlay>',
      desc: t('overlay.demoDesc.basic'),
    },
    {
      title: t('overlay.demo.content'),
      code: '<Overlay open={open()}>\n  <div style={{ background: "#fff", padding: "32px 40px", borderRadius: 12, textAlign: "center" }}>\n    <Loading type="circular" size={36} />\n    <p>Submitting...</p>\n  </div>\n</Overlay>',
      desc: t('overlay.demoDesc.content'),
    },
    {
      title: t('overlay.demo.scroll'),
      code: '<Overlay open={open()} onClose={() => setOpen(false)} lockScroll={false}>\n  <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>\n    <p>Background can still scroll</p>\n  </div>\n</Overlay>',
      desc: t('overlay.demoDesc.scroll'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Overlay</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('overlay.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
