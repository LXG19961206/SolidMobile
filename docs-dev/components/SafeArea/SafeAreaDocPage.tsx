import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSafeAreaTableData } from './tableData';
import { SafeAreaDesign } from './SafeAreaDesign';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

/* 与 DocLayout 左栏样式一致 */
const cardStyle = '.safearea-doc-card { background:#fff; border:1px solid #e5e7eb; } html.dark .safearea-doc-card { background:#1a1d21; border-color:#3a3d42; }';

export const SafeAreaDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSafeAreaTableData();

  const demos: DemoCode[] = [
    {
      title: t('safearea.demo.layout'),
      code: '<SafeArea position="top" />\n<NavBar title="Home" />\n\n<div>Page Content</div>\n\n<TabBar>\n  <TabBarItem name="home" icon="home" label="Home" />\n  <TabBarItem name="search" icon="search" label="Search" />\n</TabBar>\n<SafeArea position="bottom" />',
      desc: t('safearea.demoDesc.layout'),
    },
  ];

  return (
    <div style={{ padding: '1rem 1.5rem' }}>
      <style>{cardStyle}</style>
      <div class="safearea-doc-card" style={{
        'max-width': '960px',
        'border-radius': '10px',
        overflow: 'hidden',
        padding: '24px 32px',
      }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>SafeArea</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('safearea.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>

        <SafeAreaDesign />
      </div>
    </div>
  );
};
