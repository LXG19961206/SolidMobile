import { Tag } from '../../../../src/components/Tag';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import { useT } from '../../../doc-i18n';
import css from './TagDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", required: false, desc: 'componentProps.tag.type' },
  { name: 'variant', type: "'solid' | 'outline'", default: "'solid'", required: false, desc: 'componentProps.tag.variant' },
  { name: 'size', type: "'sm' | 'md'", default: "'md'", required: false, desc: 'componentProps.tag.size' },
  { name: 'round', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tag.round' },
  { name: 'closeable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tag.closeable' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: 'componentProps.tag.onClose' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.tag.color' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'types', title: '语义色' },
  { id: 'variants', title: '样式变体' },
  { id: 'closeable', title: '可关闭' },
  { id: 'scenes', title: '场景示例' },
];

export const TagDocPage = () => {
  const t = useT();
  return (
    <DocLayout>

    <div class={css.page}>
      <h1 class={css.h1}>Tag 标签</h1>
      <p class={css.intro}>{t('componentIntro.TagIntro')}</p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="types" class={css.h2}>{t('section.semantic')}</h2>
      <DemoBlock title={t('demo.tagTypes')} code={'<Tag type="primary">Primary</Tag>\n<Tag type="success">Success</Tag>\n<Tag type="warning">Warning</Tag>\n<Tag type="danger">Danger</Tag>\n<Tag type="info">Info</Tag>'}>
        <div class={css.row}><Tag type="primary">Primary</Tag><Tag type="success">Success</Tag><Tag type="warning">Warning</Tag><Tag type="danger">Danger</Tag><Tag type="info">Info</Tag></div>
      </DemoBlock>

      <h2 id="variants" class={css.h2}>{t('section.variants')}</h2>
      <DemoBlock title={t('demo.tagOutlineRound')} code={'<Tag variant="outline" round>Outline</Tag>\n<Tag type="danger" variant="outline" round>Danger</Tag>'}>
        <div class={css.row}><Tag variant="outline" round>Outline</Tag><Tag type="danger" variant="outline" round>Danger</Tag></div>
      </DemoBlock>
      <DemoBlock title={t('demo.size')} code={'<Tag size="sm">小号</Tag>\n<Tag size="md">中号</Tag>'}>
        <div class={css.row}><Tag size="sm">小号</Tag><Tag size="md">中号</Tag></div>
      </DemoBlock>

      <h2 id="closeable" class={css.h2}>{t('demo.closable')}</h2>
      <DemoBlock title={t('demo.closable')} code={'<Tag closeable onClose={() => {}}>可关闭</Tag>'}>
        <Tag closeable>可关闭</Tag>
      </DemoBlock>

      <h2 id="scenes" class={css.h2}>{t('section.scenarios')}</h2>
      <DemoBlock
        title={t('demo.tagDict')}
        desc={t('demoDesc.tag_dict')}
        code={`<div style="display:flex;flex-direction:column;gap:8px">\n  <div style="display:flex;align-items:center;gap:8px">\n    <Tag variant="outline">姓名</Tag><span>张三</span>\n  </div>\n  <div style="display:flex;align-items:center;gap:8px">\n    <Tag variant="outline" type="info">状态</Tag><span>在职</span>\n  </div>\n  <div style="display:flex;align-items:center;gap:8px">\n    <Tag variant="outline" type="success">部门</Tag><span>技术部</span>\n  </div>\n</div>`}
      >
        <div style="display:flex;flex-direction:column;gap:8px;font-size:0.85rem">
          <div style="display:flex;align-items:center;gap:8px"><Tag variant="outline" size="sm">姓名</Tag><span>张三</span></div>
          <div style="display:flex;align-items:center;gap:8px"><Tag variant="outline" size="sm" type="info">状态</Tag><span>在职</span></div>
          <div style="display:flex;align-items:center;gap:8px"><Tag variant="outline" size="sm" type="success">部门</Tag><span>技术部</span></div>
          <div style="display:flex;align-items:center;gap:8px"><Tag variant="outline" size="sm" type="warning">级别</Tag><span>P6</span></div>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.tagCloud')}
        desc={t('demoDesc.tag_cloud')}
        code={`<div style="display:flex;flex-wrap:wrap;gap:6px">\n  <Tag round>前端</Tag>\n  <Tag type="success" round>React</Tag>\n  <Tag type="warning" round>TypeScript</Tag>\n  <Tag type="danger" round>热门</Tag>\n  <Tag type="info" round>2024</Tag>\n</div>`}
      >
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          <Tag round>前端</Tag>
          <Tag type="success" round>React</Tag>
          <Tag type="warning" round>TypeScript</Tag>
          <Tag type="danger" round>热门</Tag>
          <Tag type="info" round>2024</Tag>
          <Tag variant="outline" round>CSS</Tag>
          <Tag variant="outline" round type="success">SolidJS</Tag>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.tagFilter')}
        desc={t('demoDesc.tag_filter')}
        code={`<div style="display:flex;flex-wrap:wrap;gap:6px">\n  <Tag closeable type="primary">北京</Tag>\n  <Tag closeable type="primary">前端</Tag>\n  <Tag closeable type="primary">3-5年</Tag>\n</div>`}
      >
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          <Tag closeable type="primary">北京</Tag>
          <Tag closeable type="primary">前端</Tag>
          <Tag closeable type="primary">3-5年</Tag>
          <Tag closeable type="primary">本科</Tag>
        </div>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
