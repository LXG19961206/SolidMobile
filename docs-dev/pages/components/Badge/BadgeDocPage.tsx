import { Badge } from '../../../../src/components/Badge';
import { Button } from '../../../../src/components/Button';
import { Avatar } from '../../../../src/components/Avatar';
import { Tabs, Tab } from '../../../../src/components/Tabs';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import { useT, registerLocale } from '../../../doc-i18n';
import zhCN from '../../../i18n/badge/zh-CN';
import enUS from '../../../i18n/badge/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import type { PropRow, TOCItem } from '../../../doc-utils';
import css from './BadgeDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'content', type: 'string | number', default: '—', required: false, desc: 'componentProps.badge.content' },
  { name: 'dot', type: 'boolean', default: 'false', required: false, desc: 'componentProps.badge.dot' },
  { name: 'max', type: 'number', default: '—', required: false, desc: 'componentProps.badge.max' },
  { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", default: "'top-right'", required: false, desc: 'componentProps.badge.position' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.badge.color' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'basic', title: 'Basic Usage' },
];

export const BadgeDocPage = () => {
  const t = useT();
  return (
  <DocLayout>

    <div class={css.page}>
      <h1 class={css.h1}>Badge</h1>
      <p class={css.intro}>{t('componentIntro.BadgeIntro')}</p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="basic" class={css.h2}>{t('demo.basic')}</h2>

      <DemoBlock
        title={t('demo.withAvatar')}
        desc={t('demoDesc.badge_with_avatar')}
        code={`<Badge content={5}>\n  <Avatar size={40} />\n</Badge>\n<Badge dot>\n  <Avatar size={40} />\n</Badge>\n<Badge content={120} max={99}>\n  <Avatar size={48} />\n</Badge>`}
      >
        <div class={css.row} style="gap:1.5rem">
          <Badge content={5}><Avatar size={40} /></Badge>
          <Badge dot><Avatar size={40} /></Badge>
          <Badge content={120} max={99}><Avatar size={48} /></Badge>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.withButton')}
        desc={t('demoDesc.badge_with_button')}
        code={`<Badge content={3}>\n  <Button size="sm">Messages</Button>\n</Badge>\n<Badge content={8}>\n  <Button size="sm" variant="outline">Orders</Button>\n</Badge>\n<Badge dot>\n  <Button size="sm">System</Button>\n</Badge>`}
      >
        <div class={css.row} style="gap:1rem">
          <Badge content={3}><Button size="sm">Messages</Button></Badge>
          <Badge content={8}><Button size="sm" variant="outline">Orders</Button></Badge>
          <Badge dot><Button size="sm">System</Button></Badge>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.withTab')}
        desc={t('demoDesc.badge_with_tab')}
        code={`<Tabs>\n  <Tab title={<span>All <Badge content={12} /></span>} name="all" />\n  <Tab title={<span>Pending <Badge dot /></span>} name="pending" />\n  <Tab title={<span>Completed <Badge content={99} max={99} /></span>} name="done" />\n</Tabs>`}
      >
        <Tabs>
          <Tab title={<span>All <Badge content={12} /></span>} name="all" />
          <Tab title={<span>Pending <Badge dot /></span>} name="pending" />
          <Tab title={<span>Completed <Badge content={99} max={99} /></span>} name="done" />
        </Tabs>
      </DemoBlock>

      <DemoBlock
        title={t('demo.standalone')}
        desc={t('demoDesc.badge_standalone')}
        code={`<div style="display:flex;align-items:center;gap:0.5rem">\n  New <Badge content={99} />\n</div>\n<Badge dot /> Online`}
      >
        <div class={css.row} style="gap:1.5rem;align-items:center">
          <span style="font-size:0.85rem">New <Badge content={99} /></span>
          <span style="font-size:0.85rem"><Badge dot /> Online</span>
        </div>
      </DemoBlock>
    </div>
  </DocLayout>
);
};
