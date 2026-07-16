
import zhCN from '../../../i18n/divider/zh-CN';
import enUS from '../../../i18n/divider/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { Divider } from '../../../../src/components/Divider';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import css from './DividerDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", required: false, desc: 'componentProps.divider.direction' },
  { name: 'text', type: 'string', default: '—', required: false, desc: 'componentProps.divider.text' },
  { name: 'dashed', type: 'boolean', default: 'false', required: false, desc: 'componentProps.divider.dashed' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.divider.color' },
  { name: 'size', type: 'string | number', default: '—', required: false, desc: 'componentProps.divider.size' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'horizontal', title: 'Horizontal' },
  { id: 'vertical', title: 'Vertical' },
];

export const DividerDocPage = () => {
  const t = useT();
  return (
  <DocLayout>

    <div class={css.page}>
      <h1 class={css.h1}>Divider</h1>
      <p class={css.intro}>{t('componentIntro.DividerIntro')}</p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="horizontal" class={css.h2}>{t('section.horizontalDivider')}</h2>
      <DemoBlock title={t('demo.basic')} code="<Divider />">
        <Divider />
      </DemoBlock>
      <DemoBlock title={t('demo.dividerText')} desc={'text="or"'} code={'<Divider text="or" />'}>
        <Divider text="or" />
      </DemoBlock>
      <DemoBlock title={t('demo.dashed')} code="<Divider dashed />">
        <Divider dashed />
      </DemoBlock>

      <h2 id="vertical" class={css.h2}>{t('section.verticalDivider')}</h2>
      <DemoBlock title={t('demo.verticalDir')} desc={t('demoDesc.divider_vertical')} code={'Text A <Divider direction="vertical" /> Text B'}>
        <span>Text A <Divider direction="vertical" /> Text B</span>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
