
import { useT } from '../../../doc-i18n';
import { Row, Col } from '../../../../src/components/Layout';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import css from './LayoutDocPage.module.css';

const rowProps: PropRow[] = [
  { name: 'gap', type: 'string | number', default: '—', required: false, desc: 'componentProps.layout.gap' },
  { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: '—', required: false, desc: 'componentProps.row.align' },
  { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", default: '—', required: false, desc: 'componentProps.row.justify' },
  { name: 'wrap', type: 'boolean', default: 'false', required: false, desc: 'componentProps.layout.wrap' },
];

const colProps: PropRow[] = [
  { name: 'span', type: 'number (1-24)', default: '—', required: false, desc: 'componentProps.layout.span' },
  { name: 'offset', type: 'number (1-24)', default: '—', required: false, desc: 'componentProps.layout.offset' },
];

const tocItems: TOCItem[] = [
  { id: 'row-props', title: 'Row Props' },
  { id: 'col-props', title: 'Col Props' },
  { id: 'grid', title: 'Grid' },
  { id: 'offset', title: 'Offset' },
  { id: 'gap', title: 'Gap & Align' },
];

const Bar = (props: { children: any; color?: string }) => (
  <div style={{ background: props.color || 'var(--sc-color-primary, #1677ff)', color: '#fff', 'text-align': 'center', padding: '8px 0', 'border-radius': '4px', 'font-size': '0.8rem' }}>{props.children}</div>
);

export const LayoutDocPage = () => {
  const t = useT();
  return (
  <DocLayout>

    <div class={css.page}>
      <h1 class={css.h1}>Layout</h1>
      <p class={css.intro}>{t('componentIntro.LayoutIntro')}</p>

      <h2 id="row-props" class={css.h2}>{t('common.rowProps')}</h2>
      <PropsTable rows={rowProps} />
      <h2 id="col-props" class={css.h2}>{t('common.colProps')}</h2>
      <PropsTable rows={colProps} />

      <h2 id="grid" class={css.h2}>{t('section.grid')}</h2>
      <DemoBlock title={t('demo.layoutGrid')} desc={t('demoDesc.layout_grid')} code={'<Row>\n  <Col span={12}><div>12</div></Col>\n  <Col span={12}><div>12</div></Col>\n</Row>\n<Row>\n  <Col span={8}><div>8</div></Col>\n  <Col span={8}><div>8</div></Col>\n  <Col span={8}><div>8</div></Col>\n</Row>'}>
        <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%">
          <Row><Col span={12}><Bar>span=12</Bar></Col><Col span={12}><Bar color="var(--sc-color-primary-hover, #4995ff)">span=12</Bar></Col></Row>
          <Row><Col span={8}><Bar>span=8</Bar></Col><Col span={8}><Bar color="var(--sc-color-primary-hover, #4995ff)">span=8</Bar></Col><Col span={8}><Bar color="var(--sc-color-primary-active, #005ee2)">span=8</Bar></Col></Row>
          <Row><Col span={6}><Bar>6</Bar></Col><Col span={6}><Bar color="var(--sc-color-primary-hover, #4995ff)">6</Bar></Col><Col span={6}><Bar color="var(--sc-color-primary-active, #005ee2)">6</Bar></Col><Col span={6}><Bar color="var(--sc-color-primary-active, #0045cc)">6</Bar></Col></Row>
        </div>
      </DemoBlock>

      <h2 id="offset" class={css.h2}>{t('demo.layoutOffset')}</h2>
      <DemoBlock title={t('demo.layoutOffset')} desc={t('demoDesc.layout_offset')} code={'<Row>\n  <Col span={8} offset={8}><div>Centered</div></Col>\n</Row>'}>
        <Row><Col span={8} offset={8}><Bar>span=8 offset=8</Bar></Col></Row>
      </DemoBlock>

      <h2 id="gap" class={css.h2}>{t('section.gapAlign')}</h2>
      <DemoBlock title={t('demo.layoutGapAlign')} desc={t('demoDesc.layout_gap_align')} code={'<Row gap={16} align="center">\n  <Col span={6}><div>A</div></Col>\n  <Col span={6}><div style={{padding:24}}>B</div></Col>\n  <Col span={6}><div>C</div></Col>\n</Row>'}>
        <Row gap={16} align="center">
          <Col span={6}><Bar>S</Bar></Col>
          <Col span={6}><div style={{ background: 'var(--sc-color-primary-hover, #4995ff)', color: '#fff', 'text-align': 'center', padding: '24px 8px', 'border-radius': '4px', 'font-size': '0.8rem' }}>Tall</div></Col>
          <Col span={6}><Bar>S</Bar></Col>
        </Row>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
