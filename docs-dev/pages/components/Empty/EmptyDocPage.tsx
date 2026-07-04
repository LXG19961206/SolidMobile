import { Empty } from '../../../../src/components/Empty';
import { Button } from '../../../../src/components/Button';
import { useT } from '../../../doc-i18n';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import css from './EmptyDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'description', type: 'string', default: '—', required: false, desc: 'componentProps.empty.description' },
  { name: 'image', type: "'default' | 'network' | 'search' | JSX.Element", default: "'default'", required: false, desc: 'componentProps.empty.image' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.empty.children' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.empty.class' },
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
      <p class={css.intro}>{t('componentIntro.EmptyIntro')}</p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="basic" class={css.h2}>{t('demo.basic')}</h2>
      <DemoBlock title={t('demo.emptyPreset')} desc={t('demoDesc.Empty_7e7d97')} code={'<Empty description="暂无数据" />\n<Empty description="网络异常" image="network" />\n<Empty description="未找到结果" image="search" />'}>
        <div style="display:flex;gap:2rem;flex-wrap:wrap">
          <Empty description="暂无数据" />
          <Empty description="网络异常" image="network" />
          <Empty description="未找到结果" image="search" />
        </div>
      </DemoBlock>

      <h2 id="custom-image" class={css.h2}>{t('demo.customImage')}</h2>
      <DemoBlock title={t('demo.imageCustomJSX')} desc={t('demoDesc.empty_custom_image')} code={`<Empty\n  image={<img src="/empty.svg" style={{ width: 120 }} />}\n  description="暂无数据"\n/>`}>
        <Empty
          image={<span style={{ 'font-size': '3rem', opacity: 0.35 }}>📭</span>}
          description="暂无数据"
        />
      </DemoBlock>

      <h2 id="custom" class={css.h2}>{t('section.bottomActions')}</h2>
      <DemoBlock title={t('demo.imageChildrenButton')} desc={t('demoDesc.empty_children')} code={`<Empty description="加载失败" image="network">\n  <Button onClick={retry}>重试</Button>\n</Empty>`}>
        <Empty description="加载失败，请重试" image="network">
          <Button type="primary" size="sm" text="重试" />
        </Empty>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
