import { type Component, useContext } from 'solid-js';
import { SwipeCell } from '../../../../src/components/SwipeCell';
import { Cell } from '../../../../src/components/Cell';
import { Toast } from '../../../../src/components/Toast';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import type { SwipeAction } from '../../../../src/components/SwipeCell/types';
import { useT } from '../../../doc-i18n';

const propsData: PropRow[] = [
  { name: 'rightActions', type: 'SwipeAction[]', default: '—', required: false, desc: '右侧滑出按钮。' },
  { name: 'leftActions', type: 'SwipeAction[]', default: '—', required: false, desc: '左侧滑出按钮。' },
  { name: 'threshold', type: 'number', default: '30', required: false, desc: '触发打开的滑动阈值(px)。' },
  { name: 'actionsWidth', type: 'number', default: '自适应', required: false, desc: '按钮区域宽度(px)。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用。' },
  { name: 'onOpen', type: '() => void', default: '—', required: false, desc: '打开时回调。' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: '关闭时回调。' },
  { name: 'children', type: 'JSX.Element', default: '—', required: true, desc: '内容层，最常用 Cell。' },
  { name: 'class', type: 'string', default: '—', required: false, desc: '自定义类名。' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: '内联样式。' },
];

const actionRows: PropRow[] = [
  { name: 'text', type: 'string', default: '—', required: true, desc: '按钮文字。' },
  { name: 'theme', type: "'default' | 'primary' | 'success' | 'warning' | 'danger'", default: "'default'", required: false, desc: '颜色主题。' },
  { name: 'color', type: 'string', default: '—', required: false, desc: '自定义背景色，优先级高于 theme。' },
  { name: 'onClick', type: '() => void', default: '—', required: false, desc: '点击回调（自动关闭）。' },
  { name: 'class', type: 'string', default: '—', required: false, desc: '自定义类名。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'actions', title: 'SwipeAction' },
  { id: 'demo', title: '示例' },
];

/* ── Demo Components ── */

const RightActionsDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const actions: SwipeAction[] = [
    { text: '删除', theme: 'danger', onClick: () => Toast.success('删除', { portalMount: phone?.() }) },
    { text: '收藏', theme: 'warning', onClick: () => Toast.success('收藏', { portalMount: phone?.() }) },
  ];
  return (
    <SwipeCell rightActions={actions}>
      <Cell title="左滑试试" description="显示右侧两个操作按钮" />
    </SwipeCell>
  );
};

const LeftActionsDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const actions: SwipeAction[] = [
    { text: '标为已读', theme: 'primary', onClick: () => Toast.success('已读', { portalMount: phone?.() }) },
  ];
  return (
    <SwipeCell leftActions={actions}>
      <Cell title="右滑试试" description="显示左侧操作按钮" />
    </SwipeCell>
  );
};

const BothActionsDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  return (
    <SwipeCell
      leftActions={[{ text: '置顶', theme: 'success', onClick: () => Toast.success('置顶', { portalMount: phone?.() }) }]}
      rightActions={[
        { text: '删除', theme: 'danger', onClick: () => Toast.success('删除', { portalMount: phone?.() }) },
        { text: '归档', theme: 'primary', onClick: () => Toast.success('归档', { portalMount: phone?.() }) },
      ]}
    >
      <Cell title="双向滑动" description="左右都有操作按钮" />
    </SwipeCell>
  );
};

const MultiCellDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const delAction: SwipeAction[] = [
    { text: '删除', theme: 'danger', onClick: () => Toast.success('删除', { portalMount: phone?.() }) },
  ];
  return (
    <>
      <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'margin-bottom': '8px' }}>
        SwipeCell 是容器组件，可以包裹任意内容，Cell 是最常见的搭配。
      </div>
      <SwipeCell rightActions={delAction}>
        <Cell title="可滑动项" description="Cell 完全作为 SwipeCell 的子元素" />
      </SwipeCell>
      <SwipeCell rightActions={delAction}>
        <Cell title="第二项" description="每项独立管理滑动状态" />
      </SwipeCell>
    </>
  );
};

/* ── Code Snippets ── */

const codeRight = `<SwipeCell rightActions={[
  { text: '删除', theme: 'danger', onClick: () => del() },
  { text: '收藏', theme: 'warning', onClick: () => fav() },
]}>
  <Cell title="左滑试试" description="显示右侧两个操作按钮" />
</SwipeCell>`;

const codeLeft = `<SwipeCell leftActions={[
  { text: '标为已读', theme: 'primary', onClick: () => mark() },
]}>
  <Cell title="右滑试试" description="显示左侧操作按钮" />
</SwipeCell>`;

const codeBoth = `<SwipeCell
  leftActions={[{ text: '置顶', theme: 'success', onClick: () => pin() }]}
  rightActions={[{ text: '删除', theme: 'danger', onClick: () => del() }]}
>
  <Cell title="双向滑动" description="左右都有操作按钮" />
</SwipeCell>`;

const codeNested = `<SwipeCell rightActions={[{ text: '删除', theme: 'danger' }]}>
  <Cell title="可滑动项" description="Cell 完全作为 SwipeCell 的子元素" />
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

        <DemoBlock title="右侧按钮（最常见）" code={codeRight}>
          <RightActionsDemo />
        </DemoBlock>

        <DemoBlock title="左侧按钮" code={codeLeft}>
          <LeftActionsDemo />
        </DemoBlock>

        <DemoBlock title="双向按钮" code={codeBoth}>
          <BothActionsDemo />
        </DemoBlock>

        <DemoBlock title="包裹 Cell" code={codeNested}>
          <MultiCellDemo />
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
