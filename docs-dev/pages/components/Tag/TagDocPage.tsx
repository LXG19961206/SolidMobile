import { Tag } from '../../../../src/components/Tag';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';
import css from './TagDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", required: false, desc: '语义色。' },
  { name: 'variant', type: "'solid' | 'outline'", default: "'solid'", required: false, desc: '填充方式。' },
  { name: 'size', type: "'sm' | 'md'", default: "'md'", required: false, desc: '尺寸。' },
  { name: 'round', type: 'boolean', default: 'false', required: false, desc: '胶囊圆角。' },
  { name: 'closeable', type: 'boolean', default: 'false', required: false, desc: '是否可关闭。' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: '关闭回调。' },
  { name: 'color', type: 'string', default: '—', required: false, desc: '自定义颜色。' },
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
      <p class={css.intro}>用于标记和分类的小型标签，支持多种语义色和填充方式。</p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="types" class={css.h2}>语义色</h2>
      <DemoBlock title={t('demo.tagTypes')} code={'<Tag type="primary">Primary</Tag>\n<Tag type="success">Success</Tag>\n<Tag type="warning">Warning</Tag>\n<Tag type="danger">Danger</Tag>\n<Tag type="info">Info</Tag>'}>
        <div class={css.row}><Tag type="primary">Primary</Tag><Tag type="success">Success</Tag><Tag type="warning">Warning</Tag><Tag type="danger">Danger</Tag><Tag type="info">Info</Tag></div>
      </DemoBlock>

      <h2 id="variants" class={css.h2}>样式变体</h2>
      <DemoBlock title={t('demo.tagOutlineRound')} code={'<Tag variant="outline" round>Outline</Tag>\n<Tag type="danger" variant="outline" round>Danger</Tag>'}>
        <div class={css.row}><Tag variant="outline" round>Outline</Tag><Tag type="danger" variant="outline" round>Danger</Tag></div>
      </DemoBlock>
      <DemoBlock title={t('demo.size')} code={'<Tag size="sm">小号</Tag>\n<Tag size="md">中号</Tag>'}>
        <div class={css.row}><Tag size="sm">小号</Tag><Tag size="md">中号</Tag></div>
      </DemoBlock>

      <h2 id="closeable" class={css.h2}>可关闭</h2>
      <DemoBlock title={t('demo.closable')} code={'<Tag closeable onClose={() => {}}>可关闭</Tag>'}>
        <Tag closeable>可关闭</Tag>
      </DemoBlock>

      <h2 id="scenes" class={css.h2}>场景示例</h2>
      <DemoBlock
        title={t('demo.tagDict')}
        desc="用 outline variant 模拟 key-value 字典效果。"
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
        desc="不同语义色搭配 round 胶囊样式，模拟文章标签或筛选条件。"
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
        desc="closeable 标签模拟已选筛选条件，可逐个移除。"
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
