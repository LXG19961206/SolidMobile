import { Badge } from '../../../../src/components/Badge';
import { Button } from '../../../../src/components/Button';
import { Avatar } from '../../../../src/components/Avatar';
import { Tabs, Tab } from '../../../../src/components/Tabs';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import css from './BadgeDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'content', type: 'string | number', default: '—', required: false, desc: 'componentProps.badge.content' },
  { name: 'dot', type: 'boolean', default: 'false', required: false, desc: 'componentProps.badge.dot' },
  { name: 'max', type: 'number', default: '—', required: false, desc: 'componentProps.badge.max' },
  { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", default: "'top-right'", required: false, desc: 'componentProps.badge.position' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.badge.color' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'basic', title: '基础用法' },
];

export const BadgeDocPage = () => {
  const t = useT();
  return (
  <DocLayout>

    <div class={css.page}>
      <h1 class={css.h1}>Badge 徽标</h1>
      <p class={css.intro}>{t('componentIntro.BadgeIntro')}</p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="basic" class={css.h2}>{t('demo.basic')}</h2>

      <DemoBlock
        title={t('demo.withAvatar')}
        desc="最常见场景——头像角标表示未读消息。"
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
        desc="按钮角标提示待处理数量。"
        code={`<Badge content={3}>\n  <Button size="sm">消息</Button>\n</Badge>\n<Badge content={8}>\n  <Button size="sm" variant="outline">订单</Button>\n</Badge>\n<Badge dot>\n  <Button size="sm">系统</Button>\n</Badge>`}
      >
        <div class={css.row} style="gap:1rem">
          <Badge content={3}><Button size="sm">消息</Button></Badge>
          <Badge content={8}><Button size="sm" variant="outline">订单</Button></Badge>
          <Badge dot><Button size="sm">系统</Button></Badge>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.withTab')}
        desc="Tab 徽标提示各分类下的数量。"
        code={`<Tabs>\n  <Tab title={<span>全部 <Badge content={12} /></span>} name="all" />\n  <Tab title={<span>待处理 <Badge dot /></span>} name="pending" />\n  <Tab title={<span>已完成 <Badge content={99} max={99} /></span>} name="done" />\n</Tabs>`}
      >
        <Tabs>
          <Tab title={<span>全部 <Badge content={12} /></span>} name="all" />
          <Tab title={<span>待处理 <Badge dot /></span>} name="pending" />
          <Tab title={<span>已完成 <Badge content={99} max={99} /></span>} name="done" />
        </Tabs>
      </DemoBlock>

      <DemoBlock
        title={t('demo.standalone')}
        desc="不包裹子元素时原地渲染，适合列表项右侧的状态标记。"
        code={`<div style="display:flex;align-items:center;gap:0.5rem">\n  新消息 <Badge content={99} />\n</div>\n<Badge dot /> 在线`}
      >
        <div class={css.row} style="gap:1.5rem;align-items:center">
          <span style="font-size:0.85rem">新消息 <Badge content={99} /></span>
          <span style="font-size:0.85rem"><Badge dot /> 在线</span>
        </div>
      </DemoBlock>
    </div>
  </DocLayout>
);
};
