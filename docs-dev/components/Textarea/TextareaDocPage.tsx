import { For } from 'solid-js'; import { useT, registerLocale } from '../../doc-i18n'; import { DocLayout, PropsAttrs } from '../../doc-utils'; import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout'; import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN'; import enUS from './en-US'; import { useTextareaTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
export const TextareaDocPage = () => {
  const t = useT(); const { propsTables, cssVarsTables } = useTextareaTableData();
  const demos: DemoCode[] = [
    { title: t('textarea.demo.basic'), code: '<Textarea placeholder="Enter text" />\n<Textarea rows={5} placeholder="5 rows tall" />', desc: t('textarea.demoDesc.basic') },
    { title: t('textarea.demo.autoSize'), code: '<Textarea autoSize placeholder="Auto-expand as you type" />\n<Textarea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="Min 2, max 6 rows" />', desc: t('textarea.demoDesc.autoSize') },
    { title: t('textarea.demo.states'), code: '<Textarea rows={3} placeholder="Normal" />\n<Textarea disabled value="Not editable" />\n<Textarea readonly value="Focusable & copyable" />\n<Textarea error value="Invalid format" />\n<Textarea clearable defaultValue="Tap X to clear" />', desc: t('textarea.demoDesc.states') },
    { title: t('textarea.demo.count'), code: '<Textarea showCount maxlength={200} rows={4} placeholder="Max 200 chars" />', desc: t('textarea.demoDesc.count') },
    { title: t('textarea.demo.form'), code: '<Form controlAlign="right" onSubmit={(v) => console.log(v)}>\n  <FormItem name="remark" label="Note" rules={[{\n    validator: (v) => (v as string)?.length <= 200,\n    message: "Max 200 chars",\n  }]}>\n    <Textarea placeholder="Enter note" showCount maxlength={200} rows={4} />\n  </FormItem>\n  <div style={{ padding: "12px 1rem" }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>', desc: t('textarea.demoDesc.form') },
  ];
  return (<DocLayout><div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
    <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Textarea</h1>
    <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('textarea.intro')}</p>
    <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
    <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
  </div></DocLayout>);
};
