import { Divider } from '../../../../src/components/Divider';
import { useT } from '../../../doc-i18n';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import css from './DividerDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", required: false, desc: '方向。' },
  { name: 'text', type: 'string', default: '—', required: false, desc: 'componentProps.Divider.text' },
  { name: 'dashed', type: 'boolean', default: 'false', required: false, desc: 'componentProps.Divider.dashed' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.Divider.color' },
  { name: 'size', type: 'string | number', default: '—', required: false, desc: 'componentProps.Divider.size' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'horizontal', title: '水平分割线' },
  { id: 'vertical', title: '垂直分割线' },
];

export const DividerDocPage = () => {
  const t = useT();
  return (
  <DocLayout>

    <div class={css.page}>
      <h1 class={css.h1}>Divider 分割线</h1>
      <p class={css.intro}>{t('componentIntro.DividerIntro')}</p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="horizontal" class={css.h2}>{t('section.horizontalDivider')}</h2>
      <DemoBlock title={t('demo.basic')} code="<Divider />">
        <Divider />
      </DemoBlock>
      <DemoBlock title={t('demo.dividerText')} desc={'text="或者"'} code={'<Divider text="或者" />'}>
        <Divider text="或者" />
      </DemoBlock>
      <DemoBlock title={t('demo.dashed')} code="<Divider dashed />">
        <Divider dashed />
      </DemoBlock>

      <h2 id="vertical" class={css.h2}>{t('section.verticalDivider')}</h2>
      <DemoBlock title={t('demo.verticalDir')} desc="direction='vertical'，行内使用。" code={'文字A <Divider direction="vertical" /> 文字B'}>
        <span>文字A <Divider direction="vertical" /> 文字B</span>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
