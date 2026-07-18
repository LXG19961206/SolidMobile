import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useBadgeTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const BadgeDocPage = () => {
  const t = useT();
  const { propsTables } = useBadgeTableData();

  const demos: DemoCode[] = [
    {
      title: t('badge.demo.withAvatar'),
      code: '<Badge content={5}>\n  <Avatar size={40} />\n</Badge>\n<Badge dot>\n  <Avatar size={40} />\n</Badge>\n<Badge content={120} max={99}>\n  <Avatar size={48} />\n</Badge>',
      desc: t('badge.demoDesc.withAvatar'),
    },
    {
      title: t('badge.demo.withButton'),
      code: '<Badge content={3}>\n  <Button size="sm">Messages</Button>\n</Badge>\n<Badge content={8}>\n  <Button size="sm" variant="outline">Orders</Button>\n</Badge>\n<Badge dot>\n  <Button size="sm">System</Button>\n</Badge>',
      desc: t('badge.demoDesc.withButton'),
    },
    {
      title: t('badge.demo.withTab'),
      code: '<Tabs>\n  <Tab title={<span>All <Badge content={12} /></span>} name="all" />\n  <Tab title={<span>Pending <Badge dot /></span>} name="pending" />\n  <Tab title={<span>Done <Badge content={99} max={99} /></span>} name="done" />\n</Tabs>',
      desc: t('badge.demoDesc.withTab'),
    },
    {
      title: t('badge.demo.position'),
      code: '<Badge content="TR" position="top-right" color="#1677ff">\n  <div style={{ width: 44, height: 44, background: "#e5e7eb", borderRadius: 10 }} />\n</Badge>\n<Badge content="TL" position="top-left" color="#22c55e">\n  <div style={{ width: 44, height: 44, background: "#e5e7eb", borderRadius: 10 }} />\n</Badge>',
      desc: t('badge.demoDesc.position'),
    },
    {
      title: t('badge.demo.standalone'),
      code: '<span>New <Badge content={99} /></span>\n<span><Badge dot /> Online</span>\n<span>Done <Badge content="✓" color="#22c55e" /></span>',
      desc: t('badge.demoDesc.standalone'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Badge</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('badge.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
