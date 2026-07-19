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
      title: t('dialog.demoAlert'),
      code: 'Dialog.alert({\n  title: "Notice",\n  message: "Operation successful!",\n})',
      desc: t('dialog.descAlert'),
    },
    {
      title: t('dialog.demoConfirm'),
      code: 'Dialog.confirm({\n  title: "Confirm Delete",\n  message: "This cannot be undone. Are you sure?",\n})',
      desc: t('dialog.descConfirm'),
    },
    {
      title: t('dialog.demoNoTitle'),
      code: 'Dialog.show({ message: "Plain text without a title." })',
      desc: t('dialog.descNoTitle'),
    },
    {
      title: t('dialog.demoMultiline'),
      code: 'Dialog.alert({ message: "Line 1\\nLine 2\\nLine 3" })',
      desc: t('dialog.descMultiline'),
    },
    {
      title: t('dialog.demoCustomBtns'),
      code: 'Dialog.confirm({\n  title: "Save Draft",\n  message: "Save current edits?",\n  confirmText: "Save",\n  cancelText: "Discard",\n})',
      desc: t('dialog.descCustomBtns'),
    },
    {
      title: t('dialog.demoJsx'),
      code: 'Dialog.alert({\n  title: "Order Summary",\n  message: (\n    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>\n      <div style={{ display: "flex", justifyContent: "space-between" }}>\n        <span>Item</span>\n        <span style={{ fontWeight: 600 }}>Solid Pro</span>\n      </div>\n      <div style={{ display: "flex", justifyContent: "space-between" }}>\n        <span>License</span>\n        <span style={{ color: "#22c55e", fontWeight: 700 }}>MIT — Free</span>\n      </div>\n    </div>\n  ),\n})',
      desc: t('dialog.descJsx'),
    },
    {
      title: t('dialog.demoAsync'),
      code: 'Dialog.confirm({\n  title: "Submit",\n  message: "Are you sure?",\n  confirmText: "Submit",\n  showCancelButton: true,\n  onConfirm: async () => {\n    await fetch("/api/submit");\n  },\n})',
      desc: t('dialog.descAsync'),
    },
    {
      title: t('dialog.demoPrevent'),
      code: 'Dialog.confirm({\n  title: "Confirm",\n  message: \'Only "Confirm" can close.\',\n  beforeClose: (action) => {\n    return action === "confirm" ? true : false;\n  },\n})',
      desc: t('dialog.descPrevent'),
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
