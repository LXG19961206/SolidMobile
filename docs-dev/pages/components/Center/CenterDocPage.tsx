import { Center } from '../../../../src/components/Center';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import { useT, loadLocale } from '../../../doc-i18n';
loadLocale('center');
import styles from './CenterDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'flexX', type: 'boolean', default: '—', required: false, desc: 'componentProps.center.flexX' },
  { name: 'flexY', type: 'boolean', default: '—', required: false, desc: 'componentProps.center.flexY' },
  { name: 'text', type: 'boolean', default: '—', required: false, desc: 'componentProps.center.text' },
  { name: 'vertical', type: 'boolean', default: '—', required: false, desc: 'componentProps.center.vertical' },
  { name: 'position', type: 'boolean', default: '—', required: false, desc: 'componentProps.center.position' },
  { name: 'inline', type: 'boolean', default: 'false', required: false, desc: 'componentProps.center.inline' },
  { name: 'as', type: 'string', default: "'div'", required: false, desc: 'componentProps.center.as' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.center.class' },
  { name: 'style', type: 'CSSProperties', default: '—', required: false, desc: 'componentProps.center.style' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'flex', title: 'Flex Center' },
  { id: 'text', title: 'Text Center' },
  { id: 'position', title: 'Absolute Center' },
];

const Box = (props: { children?: any }) => <div class={styles.demoBox}>{props.children}</div>;

export const CenterDocPage = () => {
  const t = useT();
  return (
    <DocLayout>

    <div class={styles.page}>
      <h1 class={styles.h1}>Center</h1>
      <p class={styles.intro}>
        {t('componentIntro.CenterIntro')}
      </p>

      {/* Props */}
      <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      {/* Flex */}
      <h2 id="flex" class={styles.h2}>{t('section.flexCenter')}</h2>
      <DemoBlock
        title={t('demo.centerDefault')}
        desc={t('demoDesc.center_default')}
        code={`<Center>\n  <div>Centered content</div>\n</Center>`}
      >
        <div class={styles.demoContainer}>
          <Center><Box>Both axes centered</Box></Center>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.centerFlexX')}
        desc={t('demoDesc.center_horizontal')}
        code={`<Center flexX>\n  <div>Horizontally centered</div>\n</Center>`}
      >
        <div class={styles.demoContainer}>
          <Center flexX><Box>Horizontally centered</Box></Center>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.centerFlexY')}
        desc={t('demoDesc.center_vertical')}
        code={`<div style={{ height: 160 }}>\n  <Center flexY>\n    <div>Vertically centered</div>\n  </Center>\n</div>`}
      >
        <div class={styles.demoContainer}>
          <Center flexY><Box>Vertically centered</Box></Center>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.centerInline')}
        desc={t('demoDesc.center_inline')}
        code={`<Center flexX inline>\n  <span>inline</span>\n</Center>`}
      >
        <span>
          Before <Center flexX inline><span style="background:var(--sc-color-primary, #1677ff);color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8rem">Inline Center</span></Center> After
        </span>
      </DemoBlock>

      {/* Text */}
      <h2 id="text" class={styles.h2}>{t('section.textCenter')}</h2>
      <DemoBlock
        title={t('demo.centerText')}
        desc={t('demoDesc.center_text')}
        code={`<Center text>\n  <span>This will be centered</span>\n</Center>`}
      >
        <div class={styles.demoContainer}>
          <Center text><Box>text-align: center</Box></Center>
        </div>
      </DemoBlock>

      <DemoBlock
        title={t('demo.centerVertical')}
        desc={t('demoDesc.center_vertical_align')}
        code={`<div style="line-height: 3">\n  Large text <Center vertical inline>\n    <span>Align me</span>\n  </Center>\n</div>`}
      >
        <div style="line-height: 3">
          Large text <Center vertical inline><Box>Align me</Box></Center>
        </div>
      </DemoBlock>

      {/* Position */}
      <h2 id="position" class={styles.h2}>{t('section.absoluteCenter')}</h2>
      <DemoBlock
        title={t('demo.centerPosition')}
        desc={'absolute + transform centering. Center acts as a positioning container; the parent only needs a height.'}
        code={`<div style={{ height: 160 }}>\n  <Center position>\n    <div>Absolute Center</div>\n  </Center>\n</div>`}
      >
        <div class={styles.demoContainer}>
          <Center position><Box>Absolute Center</Box></Center>
        </div>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
