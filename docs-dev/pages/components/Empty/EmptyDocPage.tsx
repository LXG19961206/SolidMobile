import { Empty } from '../../../../src/components/Empty';
import { Button } from '../../../../src/components/Button';
import { useT } from '../../../doc-i18n';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import css from './EmptyDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'description', type: 'string', default: '—', required: false, desc: '描述文字。' },
  { name: 'image', type: "'default' | 'network' | 'search' | JSX.Element", default: "'default'", required: false, desc: '图片：预设类型或自定义 JSX。' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: '自定义底部内容（如按钮）。' },
  { name: 'class', type: 'string', default: '—', required: false, desc: '自定义 CSS class。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'basic', title: '基础用法' },
  { id: 'custom', title: '自定义' },
];

export const EmptyDocPage = () => {
  const t = useT();
  return (
  <DocLayout>

    <div class={css.page}>
      <h1 class={css.h1}>Empty 空状态</h1>
      <p class={css.intro}>数据为空时的占位提示。内置三种预设图片，也支持自定义 JSX 和底部操作。</p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="basic" class={css.h2}>基础用法</h2>
      <DemoBlock title="预设类型" desc="image 支持 'default'（通用）、'network'（网络异常）、'search'（无搜索结果）三种预设。" code={'<Empty description="暂无数据" />\n<Empty description="网络异常" image="network" />\n<Empty description="未找到结果" image="search" />'}>
        <div style="display:flex;gap:2rem;flex-wrap:wrap">
          <Empty description="暂无数据" />
          <Empty description="网络异常" image="network" />
          <Empty description="未找到结果" image="search" />
        </div>
      </DemoBlock>

      <h2 id="custom-image" class={css.h2}>自定义图片</h2>
      <DemoBlock title="image={JSX}" desc="image 支持传入任意 JSX，不再局限于内置图标。" code={`<Empty\n  image={<img src="/empty.svg" style={{ width: 120 }} />}\n  description="暂无数据"\n/>`}>
        <Empty
          image={<span style={{ 'font-size': '3rem', opacity: 0.35 }}>📭</span>}
          description="暂无数据"
        />
      </DemoBlock>

      <h2 id="custom" class={css.h2}>底部操作</h2>
      <DemoBlock title="children 按钮" desc="children 传入按钮，支持自定义操作。" code={`<Empty description="加载失败" image="network">\n  <Button onClick={retry}>重试</Button>\n</Empty>`}>
        <Empty description="加载失败，请重试" image="network">
          <Button type="primary" size="sm" text="重试" />
        </Empty>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
