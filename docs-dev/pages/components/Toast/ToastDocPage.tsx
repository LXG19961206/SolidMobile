import { useContext, type Component } from 'solid-js';
import { Toast, ToastRenderer } from '../../../../src/components/Toast/ToastManager';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';
import styles from './ToastDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'message', type: 'string | JSX.Element', default: '—', required: true, desc: '提示消息内容。' },
  { name: 'type', type: "'success' | 'error' | 'warning' | 'loading' | 'info'", default: '—', required: false, desc: '类型，决定图标和默认样式。' },
  { name: 'position', type: "'top' | 'middle' | 'bottom'", default: "'middle'", required: false, desc: '显示位置。' },
  { name: 'duration', type: 'number', default: '3000', required: false, desc: '自动关闭的毫秒数，0 表示不自动关闭。' },
  { name: 'overlay', type: 'boolean', default: 'false', required: false, desc: '是否显示半透明遮罩。' },
  { name: 'closeOnClick', type: 'boolean', default: 'false', required: false, desc: '点击 toast 自身是否关闭。' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: '关闭时的回调。' },
];

const methodsData: PropRow[] = [
  { name: 'Toast.show(options)', type: 'ToastHandle', default: '—', required: false, desc: '完整配置显示 toast。' },
  { name: 'Toast.success(msg, opts?)', type: 'ToastHandle', default: '—', required: false, desc: '成功提示，2000ms 自动关闭。' },
  { name: 'Toast.error(msg, opts?)', type: 'ToastHandle', default: '—', required: false, desc: '错误提示，3000ms + 遮罩。' },
  { name: 'Toast.warning(msg, opts?)', type: 'ToastHandle', default: '—', required: false, desc: '警告提示，3000ms。' },
  { name: 'Toast.loading(msg, opts?)', type: 'ToastHandle', default: '—', required: false, desc: '加载提示，不自动关闭 + 遮罩。' },
  { name: 'Toast.info(msg, opts?)', type: 'ToastHandle', default: '—', required: false, desc: '信息提示，2500ms。' },
  { name: 'Toast.dismissAll()', type: 'void', default: '—', required: false, desc: '关闭所有 toast。' },
];

/* ── Inner Component (inside DocLayout for context) ── */

const ToastDocInner: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const m = () => phone?.();

  return (
    <div class={styles.page}>
      <ToastRenderer />
      <h1 class={styles.h1}>Toast 轻提示</h1>
      <p class={styles.lead}>全局的轻量级反馈提示，命令式 API 调用。</p>

      <h2 id="props" class={styles.h2}>属性 / Props</h2>
      <PropsTable rows={propsData} />

      <h2 id="methods" class={styles.h2}>方法</h2>
      <PropsTable rows={methodsData} />

      <DemoBlock title="简写方法" desc="点击 Cell 弹出对应类型。" code={`Toast.success('操作成功！');\nToast.error('操作失败');\nToast.info('这是一条消息');`} groupCode="结果反馈">
        <Cell title="Success" clickable onClick={() => Toast.success('操作成功！', { portalMount: m() })} />
      </DemoBlock>
      <DemoBlock title="Error" code={`Toast.error('操作失败，请重试');`} groupCode="结果反馈">
        <Cell title="Error" clickable onClick={() => Toast.error('操作失败，请重试', { portalMount: m(), overlay: false })} />
      </DemoBlock>
      <DemoBlock title="Warning" code={`Toast.warning('请注意检查输入');`} groupCode="提示">
        <Cell title="Warning" clickable onClick={() => Toast.warning('请注意检查输入', { portalMount: m() })} />
      </DemoBlock>
      <DemoBlock title="Info" code={`Toast.info('这是一条消息');`} groupCode="提示">
        <Cell title="Info" clickable onClick={() => Toast.info('这是一条消息', { portalMount: m() })} />
      </DemoBlock>
      <DemoBlock title="Loading" code={`const h = Toast.loading('加载中...');\n// 完成后\nh.dismiss();`} groupCode="提示">
        <Cell title="Loading（2s 后关闭）" clickable onClick={() => {
          const h = Toast.loading('加载中...', { portalMount: m(), overlay: false });
          setTimeout(() => h.dismiss(), 2000);
        }} />
      </DemoBlock>
      <DemoBlock title="自定义位置" code={`Toast.success('顶部提示', { position: 'top' });`} groupCode="提示">
        <Cell title="顶部弹出" clickable onClick={() => Toast.success('顶部提示', { position: 'top', portalMount: m() })} />
      </DemoBlock>

      <DemoBlock title="遮罩模式" desc="Error / Loading 默认开启 overlay 防止误触。" code={`Toast.error('操作失败', { overlay: true });`} groupCode="遮罩">
        <Cell title="Error + 遮罩" clickable onClick={() => Toast.error('操作失败，请重试', { portalMount: m() })} />
      </DemoBlock>
      <DemoBlock title="Loading 遮罩" desc="加载中带遮罩，阻止背景操作。" code={`Toast.loading('加载中...', { overlay: true });`} groupCode="遮罩">
        <Cell title="Loading + 遮罩" clickable onClick={() => Toast.loading('加载中...', { portalMount: m(), overlay: true })} />
      </DemoBlock>
      <GroupCodePhone />
    </div>
  );
};

/* ── Page ── */

export const ToastDocPage: Component = () => (
  <DocLayout>
    <ToastDocInner />
  </DocLayout>
);
