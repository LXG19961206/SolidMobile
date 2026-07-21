import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSidebarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SidebarDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSidebarTableData();
  const demos: DemoCode[] = [
    { title: t('sidebar.demo.basic'), code: 'const items = [\n  { key: \'form\', title: \'Form\' },\n  { key: \'item\', title: \'FormItem\' },\n  { key: \'rule\', title: \'FormRule\' },\n];\nconst [active, setActive] = createSignal(\'form\');\n\n<Sidebar items={items} activeKey={active()} onChange={setActive} />', desc: t('sidebar.demoDesc.basic') },
  ];
  return (<DocLayout><div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
    <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700 }}>Sidebar</h1>
    <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('sidebar.intro')}</p>
    <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
    <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
  </div></DocLayout>);
};
