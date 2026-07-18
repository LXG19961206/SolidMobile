import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSwipeCellTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SwipeCellDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSwipeCellTableData();

  const demos: DemoCode[] = [
    {
      title: t('swipecell.demo.right'),
      code: '<SwipeCell rightActions={[\n  { text: "Edit", theme: "primary" },\n  { text: "Delete", theme: "danger" },\n]}>\n  <Cell title="Swipe left" description="Shows two action buttons" />\n</SwipeCell>',
      desc: t('swipecell.demoDesc.right'),
    },
    {
      title: t('swipecell.demo.left'),
      code: '<SwipeCell leftActions={[\n  { text: "Mark Read", theme: "success" },\n]}>\n  <Cell title="Swipe right" description="Shows action on the left" />\n</SwipeCell>',
      desc: t('swipecell.demoDesc.left'),
    },
    {
      title: t('swipecell.demo.both'),
      code: '<SwipeCell\n  leftActions={[{ text: "Pin", theme: "success" }]}\n  rightActions={[{ text: "Delete", theme: "danger" }]}\n>\n  <Cell title="Two-way Swipe" description="Actions on both sides" />\n</SwipeCell>',
      desc: t('swipecell.demoDesc.both'),
    },
    {
      title: t('swipecell.demo.disabled'),
      code: '<SwipeCell rightActions={actions} disabled>\n  <Cell title="Disabled" description="Cannot swipe" />\n</SwipeCell>',
      desc: t('swipecell.demoDesc.disabled'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>SwipeCell</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('swipecell.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
