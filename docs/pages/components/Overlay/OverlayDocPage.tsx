import { createSignal, useContext } from 'solid-js';
import { Overlay } from '../../../../src/components/Overlay';
import { ActionSheet } from '../../../../src/components/ActionSheet';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import styles from './OverlayDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'open', type: 'boolean', default: '—', required: true, desc: '控制遮罩显示/隐藏。' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: '点击背景或按 Escape 时的回调。' },
  { name: 'zIndex', type: 'number', default: '999', required: false, desc: '自定义层级。' },
  { name: 'lockScroll', type: 'boolean', default: 'true', required: false, desc: '是否锁定 body 滚动。设为 false 时背景仍可滚动。' },
  { name: 'mount', type: 'Node', default: 'document.body', required: false, desc: 'Portal 挂载目标节点。' },
  { name: 'duration', type: 'number', default: '200', required: false, desc: '进出动画时长（ms）。' },
  { name: 'class', type: 'string', default: '—', required: false, desc: '自定义 CSS class。' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: '内联样式。' },
  { name: 'id', type: 'string', default: '—', required: false, desc: 'DOM id。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'basic', title: '基础用法' },
  { id: 'bottom-sheet', title: '底部弹出' },
  { id: 'no-scroll-lock', title: '不锁定滚动' },
];

const OverlayDocInner = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const phoneMount = () => phoneTarget?.();

  const [basicOpen, setBasicOpen] = createSignal(false);
  const [sheetOpen, setSheetOpen] = createSignal(false);
  const [noScrollLock, setNoScrollLock] = createSignal(false);

  return (
    <>

      <div class={styles.page}>
        <h1 class={styles.h1}>Overlay 遮罩层</h1>
        <p class={styles.intro}>
          Overlay 是所有弹出层组件（Modal、ActionSheet、Dialog 等）的基础设施。
          渲染一个全屏半透明遮罩，支持点击背景关闭、body 滚动锁定、Portal 挂载、
          进出动画和 Escape 键关闭。
        </p>

        <h2 id="props" class={styles.h2}>属性 / Props</h2>
        <PropsTable rows={propsData} />

        <h2 id="basic" class={styles.h2}>基础用法</h2>
        <DemoBlock
          title="点击遮罩关闭"
          desc="展示一个居中对话框，点击背景或按 Escape 键关闭。"
          code={`import { createSignal } from 'solid-js';\nimport { Overlay } from 'solid-component';\n\nfunction Demo() {\n  const [open, setOpen] = createSignal(false);\n\n  return (\n    <>\n      <button onClick={() => setOpen(true)}>打开遮罩</button>\n      <Overlay open={open()} onClose={() => setOpen(false)}>\n        <div class="dialog">\n          <p>点击遮罩背景或按 Escape 键关闭</p>\n          <button onClick={() => setOpen(false)}>知道了</button>\n        </div>\n      </Overlay>\n    </>\n  );\n}`}
        >
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => setBasicOpen(true)}>打开遮罩</button>
            <Overlay open={basicOpen()} onClose={() => setBasicOpen(false)} mount={phoneMount()}>
              <div class={styles.overlayContent}>
                <div class={styles.overlayTitle}>提示</div>
                <div class={styles.overlayBody}>点击遮罩背景或按 Escape 键关闭</div>
                <button class={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setBasicOpen(false)}>知道了</button>
              </div>
            </Overlay>
          </div>
        </DemoBlock>

        <h2 id="bottom-sheet" class={styles.h2}>基于 Overlay 的组件</h2>
        <DemoBlock
          title="ActionSheet 内置了 Overlay"
          desc="ActionSheet 内部使用 Overlay 提供遮罩、动画和滚动锁定，你不需要手动包裹 Overlay。"
          code={`import { ActionSheet } from 'solid-component';\n\n<ActionSheet\n  open={open()}\n  onClose={() => setOpen(false)}\n  title="选择操作"\n  closeable\n  items={[\n    { name: '选项一' },\n    { name: '选项二' },\n    { name: '选项三' },\n  ]}\n  cancelText="取消"\n/>`}
        >
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => setSheetOpen(true)}>打开菜单</button>
            <ActionSheet mount={phoneMount()}
              open={sheetOpen()}
              onClose={() => setSheetOpen(false)}
              title="选择操作"
              closeable
              items={[{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]}
              cancelText="取消"
            />
          </div>
        </DemoBlock>

        <h2 id="no-scroll-lock" class={styles.h2}>不锁定滚动</h2>
        <DemoBlock
          title="锁滚动设为 false"
          desc="适合 Toast 等不需要阻止背景滚动的轻量场景。"
          code={`<Overlay open={open()} onClose={() => setOpen(false)} lockScroll={false}>\n  <div class="toast">轻量提示 — 背景仍可滚动</div>\n</Overlay>`}
        >
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => setNoScrollLock(true)}>打开（可滚动背景）</button>
            <Overlay open={noScrollLock()} onClose={() => setNoScrollLock(false)} lockScroll={false} mount={phoneMount()}>
              <div class={styles.overlayContent}>
                <div class={styles.overlayTitle}>轻量提示</div>
                <div class={styles.overlayBody}>背景仍可滚动</div>
                <button class={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setNoScrollLock(false)}>关闭</button>
              </div>
            </Overlay>
          </div>
        </DemoBlock>
      </div>
    </>
  );
};

export const OverlayDocPage = () => (
  <DocLayout>
    <OverlayDocInner />
  </DocLayout>
);
