
import zhCN from '../../../i18n/backtop/zh-CN';
import enUS from '../../../i18n/backtop/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { BackTop } from '../../../../src/components/BackTop';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';
import styles from './BackTopDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'threshold', type: 'number', default: '200', required: false, desc: 'componentProps.backtop.threshold' },
  { name: 'target', type: 'HTMLElement', default: 'auto', required: false, desc: 'componentProps.backtop.target' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.backtop.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.backtop.style' },
  { name: 'children', type: 'JSX.Element', default: '<Icon name="arrow-up" />', required: false, desc: 'Custom content. Default: arrow-up icon.' },
];

export const BackTopDocPage = () => {
  const t = useT();
  return (
    <DocLayout>
      <div class={styles.page}>
        <h1 class={styles.h1}>BackTop</h1>
        <p class={styles.intro}>{t('componentIntro.BackTopIntro')}</p>

        <h2 class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        <h2 class={styles.h2}>{t('demo.backtopBasic')}</h2>

        <DemoBlock
          hideTitle
          title={t('demo.backtopBasic')}
          desc={t('demoDesc.backtop_basic')}
          code={`<CellGroup>\n  ...long list...\n</CellGroup>\n<BackTop threshold={200} />`}
        >
          <CellGroup>
            {Array.from({ length: 30 }, (_, i) => (
              <Cell title={`Item ${i + 1}`} value={`Value ${i + 1}`} />
            ))}
          </CellGroup>
          <BackTop threshold={200} />
        </DemoBlock>

      </div>
    </DocLayout>
  );
};
