import { type Component, useContext } from 'solid-js';


import { useT } from '../../../doc-i18n';
import { SwipeCell } from '../../../../src/components/SwipeCell';
import { Cell } from '../../../../src/components/Cell';
import { Toast } from '../../../../src/components/Toast';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import type { SwipeAction } from '../../../../src/components/SwipeCell/types';

const propsData: PropRow[] = [
  { name: 'rightActions', type: 'SwipeAction[]', default: '—', required: false, desc: 'componentProps.swipecell.rightActions' },
  { name: 'leftActions', type: 'SwipeAction[]', default: '—', required: false, desc: 'componentProps.swipecell.leftActions' },
  { name: 'threshold', type: 'number', default: '30', required: false, desc: 'componentProps.swipecell.threshold' },
  { name: 'actionsWidth', type: 'number', default: 'Auto', required: false, desc: 'componentProps.swipecell.actionsWidth' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.swipecell.disabled' },
  { name: 'onOpen', type: '() => void', default: '—', required: false, desc: 'componentProps.swipecell.onOpen' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: 'componentProps.swipecell.onClose' },
  { name: 'children', type: 'JSX.Element', default: '—', required: true, desc: 'componentProps.swipecell.children' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.swipecell.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.swipecell.style' },
];

const actionRows: PropRow[] = [
  { name: 'text', type: 'string', default: '—', required: true, desc: 'componentProps.swipecell.text' },
  { name: 'theme', type: "'default' | 'primary' | 'success' | 'warning' | 'danger'", default: "'default'", required: false, desc: 'componentProps.swipecell.theme' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.swipecell.color' },
  { name: 'onClick', type: '() => void', default: '—', required: false, desc: 'componentProps.swipecell.onClick' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.swipecell.class' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'actions', title: 'SwipeAction' },
  { id: 'demo', title: 'Examples' },
];

/* ── Demo Components ── */

const RightActionsDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const actions: SwipeAction[] = [
    { text: 'Delete', theme: 'danger', onClick: () => Toast.success('Delete', { portalMount: phone?.() }) },
    { text: 'Favorite', theme: 'warning', onClick: () => Toast.success('Favorite', { portalMount: phone?.() }) },
  ];
  return (
    <SwipeCell rightActions={actions}>
      <Cell title="Swipe left" description="Shows two action buttons on the right" />
    </SwipeCell>
  );
};

const LeftActionsDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const actions: SwipeAction[] = [
    { text: 'Mark Read', theme: 'primary', onClick: () => Toast.success('Read', { portalMount: phone?.() }) },
  ];
  return (
    <SwipeCell leftActions={actions}>
      <Cell title="Swipe right" description="Shows action button on the left" />
    </SwipeCell>
  );
};

const BothActionsDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  return (
    <SwipeCell
      leftActions={[{ text: 'Pin', theme: 'success', onClick: () => Toast.success('Pin', { portalMount: phone?.() }) }]}
      rightActions={[
        { text: 'Delete', theme: 'danger', onClick: () => Toast.success('Delete', { portalMount: phone?.() }) },
        { text: 'Archive', theme: 'primary', onClick: () => Toast.success('Archive', { portalMount: phone?.() }) },
      ]}
    >
      <Cell title="Two-way Swipe" description="Action buttons on both sides" />
    </SwipeCell>
  );
};

const MultiCellDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const delAction: SwipeAction[] = [
    { text: 'Delete', theme: 'danger', onClick: () => Toast.success('Delete', { portalMount: phone?.() }) },
  ];
  return (
    <>
      <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'margin-bottom': '8px' }}>
        SwipeCell is a container; it can wrap any content. Cell is the most common pairing.
      </div>
      <SwipeCell rightActions={delAction}>
        <Cell title="Swipable item" description="Cell as a child of SwipeCell" />
      </SwipeCell>
      <SwipeCell rightActions={delAction}>
        <Cell title="Second item" description="Each item manages its own swipe state" />
      </SwipeCell>
    </>
  );
};

/* ── Code Snippets ── */

const codeRight = `<SwipeCell rightActions={[
  { text: 'Delete', theme: 'danger', onClick: () => del() },
  { text: 'Favorite', theme: 'warning', onClick: () => fav() },
]}>
  <Cell title="Swipe left" description="Shows two action buttons on the right" />
</SwipeCell>`;

const codeLeft = `<SwipeCell leftActions={[
  { text: 'Mark Read', theme: 'primary', onClick: () => mark() },
]}>
  <Cell title="Swipe right" description="Shows action button on the left" />
</SwipeCell>`;

const codeBoth = `<SwipeCell
  leftActions={[{ text: 'Pin', theme: 'success', onClick: () => pin() }]}
  rightActions={[{ text: 'Delete', theme: 'danger', onClick: () => del() }]}
>
  <Cell title="Two-way Swipe" description="Action buttons on both sides" />
</SwipeCell>`;

const codeNested = `<SwipeCell rightActions={[{ text: 'Delete', theme: 'danger' }]}>
  <Cell title="Swipable item" description="Cell as a child of SwipeCell" />
</SwipeCell>`;

/* ── Main ── */

export const SwipeCellDocPage: Component = () => {
  const t = useT();
  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h2 id="props" style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '16px 0 12px' }}>
          {t('common.props')}
        </h2>
        <PropsTable rows={propsData} />

        <h2 id="actions" style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>
          SwipeAction
        </h2>
        <PropsTable rows={actionRows} />

        <h2 id="demo" style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>
          示例
        </h2>

        <DemoBlock title={t('demo.swipeRight')} code={codeRight}>
          <RightActionsDemo />
        </DemoBlock>

        <DemoBlock title={t('demo.swipeLeft')} code={codeLeft}>
          <LeftActionsDemo />
        </DemoBlock>

        <DemoBlock title={t('demo.swipeBoth')} code={codeBoth}>
          <BothActionsDemo />
        </DemoBlock>

        <DemoBlock title={t('demo.swipeCellWrap')} code={codeNested}>
          <MultiCellDemo />
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
