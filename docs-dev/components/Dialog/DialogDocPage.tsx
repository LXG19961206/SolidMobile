import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useDialogTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const DialogDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useDialogTableData();

  const demos: DemoCode[] = [
    {
      title: t('dialog.demo.basic'),
      code: 'Dialog.alert({ title: "Notice", message: "Success!" })\nDialog.confirm({ title: "Confirm", message: "Are you sure?" })',
      desc: t('dialog.demoDesc.basic'),
    },
    {
      title: t('dialog.demo.advanced'),
      code: 'Dialog.confirm({\n  title: "Save Draft",\n  message: "Save current edits?",\n  confirmText: "Save",\n  cancelText: "Discard",\n  onConfirm: async () => { await fetch("/api/save"); },\n})',
      desc: t('dialog.demoDesc.advanced'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Dialog</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('dialog.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
