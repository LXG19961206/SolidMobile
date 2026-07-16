
import zhCN from '../../../i18n/empty/zh-CN';
import enUS from '../../../i18n/empty/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { Empty } from '../../../../src/components/Empty';
import { Button } from '../../../../src/components/Button';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import css from './EmptyDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'description', type: 'string', default: '—', required: false, desc: 'componentProps.empty.description' },
  { name: 'image', type: "'default' | 'network' | 'search' | JSX.Element", default: "'default'", required: false, desc: 'componentProps.empty.image' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.empty.children' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.empty.class' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'basic', title: 'Basic Usage' },
  { id: 'custom', title: 'Custom' },
];

export const EmptyDocPage = () => {
  const t = useT();
  return (
  <DocLayout>

    <div class={css.page}>
      <h1 class={css.h1}>Empty</h1>
      <p class={css.intro}>{t('componentIntro.EmptyIntro')}</p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="basic" class={css.h2}>{t('demo.basic')}</h2>
      <DemoBlock title={t('demo.emptyPreset')} desc={t('demoDesc.empty_presets')} code={'<Empty description="No data" />\n<Empty description="Network error" image="network" />\n<Empty description="No results found" image="search" />'}>
        <div style="display:flex;gap:2rem;flex-wrap:wrap">
          <Empty description="No data" />
          <Empty description="Network error" image="network" />
          <Empty description="No results found" image="search" />
        </div>
      </DemoBlock>

      <h2 id="custom-image" class={css.h2}>{t('demo.customImage')}</h2>
      <DemoBlock title={t('demo.imageCustomJSX')} desc={t('demoDesc.empty_custom_image')} code={`<Empty\n  image={<img src="/empty.svg" style={{ width: 120 }} />}\n  description="No data"\n/>`}>
        <Empty
          image={<span style={{ 'font-size': '3rem', opacity: 0.35 }}>📭</span>}
          description="No data"
        />
      </DemoBlock>

      <h2 id="custom" class={css.h2}>{t('section.bottomActions')}</h2>
      <DemoBlock title={t('demo.imageChildrenButton')} desc={t('demoDesc.empty_children')} code={`<Empty description="加载失败" image="network">\n  <Button onClick={retry}>重试</Button>\n</Empty>`}>
        <Empty description="Load failed, tap to retry" image="network">
          <Button type="primary" size="sm" text="Retry" />
        </Empty>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
