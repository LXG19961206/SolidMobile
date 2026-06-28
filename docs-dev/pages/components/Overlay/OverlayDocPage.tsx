import { createSignal, useContext } from 'solid-js';
import { Overlay } from '../../../../src/components/Overlay';
import { ActionSheet } from '../../../../src/components/ActionSheet';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';
import styles from './OverlayDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'open', type: 'boolean', default: '—', required: true, desc: '控制遮罩显示/隐藏。' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: '点击背景或按 Escape 时的回调。' },
  { name: 'zIndex', type: 'number', default: '999', required: false, desc: '自定义层级。' },
  { name: 'lockScroll', type: 'boolean', default: 'true', required: false, desc: '是否锁定 body 滚动。' },
  { name: 'mount', type: 'Node', default: 'document.body', required: false, desc: 'Portal 挂载目标。' },
  { name: 'duration', type: 'number', default: '200', required: false, desc: '进出动画时长（ms）。' },
];

const OverlayDocInner = () => {
  const phone = useContext(PhoneTargetContext);
  const pm = () => phone?.();
  const [s1, s1s] = createSignal(false);
  const [s2, s2s] = createSignal(false);
  const [s3, s3s] = createSignal(false);

  return (
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Overlay 遮罩层</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px' }}>全屏半透明遮罩，所有弹出层组件的基础设施。</p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>属性</h2>
      <PropsTable rows={propsData} />

      <DemoBlock title="点击遮罩关闭" desc="居中对话框，点击背景关闭。" code={`<Overlay open={open} onClose={...}>...</Overlay>`} groupCode="overlayDemo">
        <Cell title="点击遮罩关闭" clickable onClick={() => s1s(true)} />
        <Overlay open={s1()} onClose={() => s1s(false)} mount={pm()}>
          <div class={styles.overlayContent}>
            <div class={styles.overlayTitle}>提示</div>
            <div class={styles.overlayBody}>点击遮罩背景或按 Escape 键关闭</div>
            <button class={`${styles.btn} ${styles.btnPrimary}`} onClick={() => s1s(false)}>知道了</button>
          </div>
        </Overlay>
      </DemoBlock>

      <DemoBlock title="ActionSheet 内置" desc="ActionSheet 内部使用 Overlay。" code={`<ActionSheet open={open} onClose={...} items={...} />`} groupCode="overlayDemo">
        <Cell title="ActionSheet" clickable onClick={() => s2s(true)} />
        <ActionSheet mount={pm()} open={s2()} onClose={() => s2s(false)} title="选择操作" closeable items={[{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]} cancelText="取消" />
      </DemoBlock>

      <DemoBlock title="不锁定滚动" desc="lockScroll={false}" code={`<Overlay open={open} onClose={...} lockScroll={false}>...</Overlay>`} groupCode="overlayDemo">
        <Cell title="不锁定滚动" clickable onClick={() => s3s(true)} />
        <Overlay open={s3()} onClose={() => s3s(false)} lockScroll={false} mount={pm()}>
          <div class={styles.overlayContent}>
            <div class={styles.overlayTitle}>可滚动</div>
            <div class={styles.overlayBody}>此时可以滚动页面</div>
            <button class={`${styles.btn} ${styles.btnPrimary}`} onClick={() => s3s(false)}>关闭</button>
          </div>
        </Overlay>
      </DemoBlock>

      <GroupCodePhone />
    </div>
  );
};

export const OverlayDocPage = () => (
  <DocLayout><OverlayDocInner /></DocLayout>
);
