import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import { useT, registerLocale } from '../../../doc-i18n';
import zhCN from '../../../i18n/cell/zh-CN';
import enUS from '../../../i18n/cell/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import styles from './CellDocPage.module.css';

const cellProps: PropRow[] = [
  { name: 'title', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.cell.title' },
  { name: 'value', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.cell.value' },
  { name: 'description', type: 'string', default: '—', required: false, desc: 'componentProps.cell.description' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.cell.children' },
  { name: 'icon', type: 'IconName | JSX.Element', default: '—', required: false, desc: 'componentProps.cell.icon' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, desc: 'componentProps.cell.size' },
  { name: 'required', type: 'boolean', default: 'false', required: false, desc: 'componentProps.cell.required' },
  { name: 'center', type: 'boolean', default: 'false', required: false, desc: 'componentProps.cell.center' },
  { name: 'clickable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.cell.clickable' },
  { name: 'onClick', type: '() => void', default: '—', required: false, desc: 'componentProps.cell.onClick' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.cell.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.cell.style' },
];

const groupProps: PropRow[] = [
  { name: 'title', type: 'string', default: '—', required: false, desc: 'componentProps.cellgroup.title' },
  { name: 'card', type: 'boolean', default: 'false', required: false, desc: 'componentProps.cellgroup.card' },
  { name: 'border', type: 'boolean', default: 'true', required: false, desc: 'componentProps.cellgroup.border' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.cellgroup.children' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.cellgroup.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.cellgroup.style' },
];

const tocItems: TOCItem[] = [
  { id: 'cell-props', title: 'Cell Props' },
  { id: 'group-props', title: 'CellGroup Props' },
  { id: 'basic', title: 'Basic List' },
  { id: 'clickable', title: 'Clickable' },
  { id: 'icon', title: 'Icon & Required' },
  { id: 'size', title: 'Size' },
  { id: 'card', title: 'Card Mode' },
];

export const CellDocPage = () => {
  const t = useT();
  return (
    <DocLayout>

    <div class={styles.page}>
      <h1 class={styles.h1}>Cell / CellGroup</h1>
      <p class={styles.intro}>
        {t('componentIntro.CellIntro')}
      </p>

      <h2 id="cell-props" class={styles.h2}>{t('common.cellProps')}</h2>
      <PropsTable rows={cellProps} />

      <h2 id="group-props" class={styles.h2}>{t('common.cellGroupProps')}</h2>
      <PropsTable rows={groupProps} />

      {/* Basic */}
      <h2 id="basic" class={styles.h2}>{t('section.basicList')}</h2>
      <DemoBlock
        title={t('demo.cellBasic')}
        desc={t('demoDesc.cell_basic')}
        code={`<CellGroup title="Basic Info">\n  <Cell title="Username" value="John" />\n  <Cell title="Phone" value="138****8888" />\n  <Cell title="Bio" description="This is a description" />\n</CellGroup>`}
      >
        <div class={styles.demo}>
          <CellGroup title="Basic Info">
            <Cell title="Username" value="John" />
            <Cell title="Phone" value="138****8888" />
            <Cell title="Bio" description="This is a description" />
          </CellGroup>
        </div>
      </DemoBlock>

      {/* Clickable */}
      <h2 id="clickable" class={styles.h2}>{t('section.clickable')}</h2>
      <DemoBlock
        title={t('demo.cellClickable')}
        desc={t('demoDesc.cell_clickable')}
        code={`<CellGroup title="Settings">\n  <Cell title="Profile" clickable onClick={() => {}} />\n  <Cell title="Account Security" clickable />\n  <Cell title="Notification Settings" clickable value="Enabled" />\n</CellGroup>`}
      >
        <div class={styles.demo}>
          <CellGroup title="Settings">
            <Cell title="Profile" clickable />
            <Cell title="Account Security" clickable />
            <Cell title="Notification Settings" clickable value="Enabled" />
          </CellGroup>
        </div>
      </DemoBlock>

      {/* Icon & Required */}
      <h2 id="icon" class={styles.h2}>{t('section.iconRequired')}</h2>
      <DemoBlock
        title={t('demo.cellIconRequired')}
        desc={t('demoDesc.cell_icon_required')}
        code={`<Cell icon="user" title="Name" required value="John" />\n<Cell icon="phone" title="Phone" clickable />\n<Cell icon="mail" title="Email" value="zhang@example.com" />\n<Cell\n  icon="palette"\n  title="Theme Color"\n  value={<span><span style={{ width:'14px',height:'14px',borderRadius:'50%',background: 'var(--sc-color-primary, #1677ff)',display:'inline-block' }} /> Brand Blue</span>}\n/>`}
      >
        <div class={styles.demo}>
          <CellGroup>
            <Cell icon="user" title="Name" required value="John" />
            <Cell icon="phone" title="Phone" clickable />
            <Cell icon="mail" title="Email" value="zhang@example.com" />
            <Cell
              icon="palette"
              title="Theme Color"
              value={<span style={{ display:'inline-flex','align-items':'center',gap:'0.4rem' }}><span style={{ width:'14px',height:'14px','border-radius':'50%',background: 'var(--sc-color-primary, #1677ff)',display:'inline-block' }} /> Brand Blue</span>}
            />
          </CellGroup>
        </div>
      </DemoBlock>

      {/* Sizes */}
      <h2 id="size" class={styles.h2}>{t('demo.size')}</h2>
      <DemoBlock
        title="sm / md / lg"
        desc={t('demoDesc.cell_sizes')}
        code={`<Cell size="sm" title="Small" />\n<Cell size="md" title="Medium" />\n<Cell size="lg" title="Large" />`}
      >
        <div class={styles.demo}>
          <CellGroup>
            <Cell size="sm" title="Small Cell" value="40px" />
            <Cell size="md" title="Medium Cell (default)" value="48px" />
            <Cell size="lg" title="Large Cell" value="56px" />
          </CellGroup>
        </div>
      </DemoBlock>

      {/* Card mode */}
      <h2 id="card" class={styles.h2}>{t('section.cardMode')}</h2>
      <DemoBlock
        title="card"
        desc={t('demoDesc.cell_card')}
        code={`<CellGroup title="About" card>\n  <Cell title="Version" value="1.0.0" />\n  <Cell title="License" value="MIT" clickable />\n</CellGroup>`}
      >
        <div class={styles.demo} style={{ background: '#eff2f5', padding: '1rem 0', 'border-radius': '8px' }}>
          <CellGroup title="About" card>
            <Cell title="Version" value="1.0.0" />
            <Cell title="License" value="MIT" clickable />
            <Cell title="Author" value="solid-component" />
          </CellGroup>
        </div>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
