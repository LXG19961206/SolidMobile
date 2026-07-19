import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useActionSheetTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ActionSheetDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useActionSheetTableData();

  const demos: DemoCode[] = [
    {
      title: t('actionsheet.demo.basic'),
      code: 'const items = [{ name: "Edit" }, { name: "Share" }, { name: "Delete" }];\n\n<ActionSheet\n  open={open()}\n  onClose={() => setOpen(false)}\n  items={items}\n/>',
      desc: t('actionsheet.demoDesc.basic'),
    },
    {
      title: t('actionsheet.demo.full'),
      code: '<ActionSheet\n  open={open()}\n  onClose={() => setOpen(false)}\n  title="Confirm Delete"\n  description="This cannot be undone."\n  closeable\n  items={[{ name: "Delete directly" }, { name: "Export then delete" }]}\n  cancelText="Cancel"\n/>',
      desc: t('actionsheet.demoDesc.full'),
    },
    {
      title: t('actionsheet.demo.twoline'),
      code: '<ActionSheet\n  open={open()}\n  title="Upload Method"\n  items={[\n    { name: "From Album", subname: "Select from library" },\n    { name: "Take Photo", subname: "Use camera" },\n  ]}\n  cancelText="Cancel"\n/>',
      desc: t('actionsheet.demoDesc.twoline'),
    },
    {
      title: t('actionsheet.demo.disabled'),
      code: '<ActionSheet\n  open={open()}\n  items={[\n    { name: "Option A" },\n    { name: "Option B", disabled: true },\n    { name: "Option C" },\n  ]}\n  cancelText="Cancel"\n/>',
      desc: t('actionsheet.demoDesc.disabled'),
    },
    {
      title: t('actionsheet.demo.noClose'),
      code: '<ActionSheet\n  open={open()}\n  title="Select Tags"\n  closeable\n  closeOnSelect={false}\n  items={[\n    { name: "Frontend" }, { name: "Backend" },\n  ]}\n  cancelText="Done"\n/>',
      desc: t('actionsheet.demoDesc.noClose'),
    },
    {
      title: t('actionsheet.demo.custom'),
      code: '<ActionSheet open={open()} title="About" closeable>\n  <div style={{ padding: 20, textAlign: "center" }}>\n    <p>Custom content here</p>\n  </div>\n</ActionSheet>',
      desc: t('actionsheet.demoDesc.custom'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>ActionSheet</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('actionsheet.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
