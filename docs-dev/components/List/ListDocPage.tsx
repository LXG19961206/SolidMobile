import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useListTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ListDocPage = () => {
  const t = useT();
  const { propsTables } = useListTableData();

  const demos: DemoCode[] = [
    {
      title: t('list.demo.static'),
      code: '<List data={items}>\n  {(item) => (\n    <Cell title={item.name} description={item.desc}\n      icon={<Avatar size="sm" text={item.name[0]} />} />\n  )}\n</List>',
      desc: t('list.demoDesc.static'),
    },
    {
      title: t('list.demo.autoload'),
      code: '<List onLoad={onLoad} finished={finished}\n  loadMoreText="Loading..." finishedText="No more">\n  {(item) => <Cell title={item.name} description={item.desc} />}\n</List>',
      desc: t('list.demoDesc.autoload'),
    },
    {
      title: t('list.demo.virtual'),
      code: '<List virtual itemHeight={60} data={items}>\n  {(item) => (\n    <div style={{ height: 60, display: "flex", alignItems: "center", gap: 12 }}>\n      <Avatar size="md" text={item.name[0]} />\n      <div>{item.name}</div>\n    </div>\n  )}\n</List>',
      desc: t('list.demoDesc.virtual'),
    },
    {
      title: t('list.demo.empty'),
      code: '<List data={[]} empty="No records">\n  {(item) => <Cell title={item.name} />}\n</List>',
      desc: t('list.demoDesc.empty'),
    },
    {
      title: t('list.demo.refresh'),
      code: '<List\n  data={items()}\n  pullRefresh\n  onRefresh={async () => {\n    await fetch("/api/refresh");\n  }}\n>\n  {(item) => <Cell title={item} />}\n</List>',
      desc: t('list.demoDesc.refresh'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>List</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('list.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
