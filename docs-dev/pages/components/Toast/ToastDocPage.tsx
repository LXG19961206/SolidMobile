import { useContext, type Component } from 'solid-js';
import { Toast, ToastRenderer } from '../../../../src/components/Toast/ToastManager';
import { Button } from '../../../../src/components/Button';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import styles from './ToastDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'message', type: 'string | JSX.Element', default: '—', required: true, desc: '提示消息内容。' },
  { name: 'type', type: "'success' | 'error' | 'warning' | 'loading' | 'info'", default: '—', required: false, desc: '类型，决定图标和默认样式。' },
  { name: 'position', type: "'top' | 'middle' | 'bottom'", default: "'middle'", required: false, desc: '显示位置。' },
  { name: 'duration', type: 'number', default: '3000', required: false, desc: '自动关闭的毫秒数，0 表示不自动关闭。' },
  { name: 'overlay', type: 'boolean', default: 'false', required: false, desc: '是否显示半透明遮罩。error/loading 默认开启。' },
  { name: 'closeOnClick', type: 'boolean', default: 'false', required: false, desc: '点击 toast 自身是否关闭。' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: '关闭时的回调。' },
  { name: 'icon', type: 'JSX.Element', default: '—', required: false, desc: '自定义图标，覆盖 type 的默认图标。' },
  { name: 'zIndex', type: 'number', default: '1000', required: false, desc: '自定义 z-index。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'methods', title: '方法' },
  { id: 'basic', title: '基础用法' },
  { id: 'types', title: '不同类型' },
  { id: 'position', title: '位置' },
  { id: 'loading', title: '加载提示' },
];

/** Inner component — rendered inside DocLayout so useContext works */
const ToastDocInner: Component = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const mount = () => phoneTarget?.();

  const show = (opts: Parameters<typeof Toast.show>[0]) =>
    Toast.show({ ...opts, portalMount: mount() });
  const success = (msg: string, opts?: Parameters<typeof Toast.success>[1]) =>
    Toast.success(msg, { ...opts, portalMount: mount() });
  const error = (msg: string, opts?: Parameters<typeof Toast.error>[1]) =>
    Toast.error(msg, { ...opts, portalMount: mount() });
  const warning = (msg: string, opts?: Parameters<typeof Toast.warning>[1]) =>
    Toast.warning(msg, { ...opts, portalMount: mount() });
  const loading = (msg: string, opts?: Parameters<typeof Toast.loading>[1]) =>
    Toast.loading(msg, { ...opts, portalMount: mount() });
  const info = (msg: string, opts?: Parameters<typeof Toast.info>[1]) =>
    Toast.info(msg, { ...opts, portalMount: mount() });

  return (
    <>

      <div class={styles.page}>
        <ToastRenderer />
        <h1 class={styles.h1}>Toast 轻提示</h1>
        <p class={styles.lead}>
          全局的轻量级反馈提示。支持多种类型、三种位置、遮罩模式，使用命令式 API 调用。
        </p>

        <h2 id="props" class={styles.h2}>属性 / Props</h2>
        <PropsTable rows={propsData} />

        <h2 id="methods" class={styles.h2}>方法</h2>
        <div class={styles.tableWrap}>
          <table class={styles.table}>
            <thead>
              <tr><th>方法</th><th>说明</th><th>返回值</th></tr>
            </thead>
            <tbody>
              <tr><td><code>Toast.show(options)</code></td><td>完整配置显示 toast</td><td><code>ToastHandle</code></td></tr>
              <tr><td><code>Toast.success(msg, opts?)</code></td><td>成功提示，2000ms 自动关闭</td><td><code>ToastHandle</code></td></tr>
              <tr><td><code>Toast.error(msg, opts?)</code></td><td>错误提示，3000ms + 遮罩</td><td><code>ToastHandle</code></td></tr>
              <tr><td><code>Toast.warning(msg, opts?)</code></td><td>警告提示，3000ms</td><td><code>ToastHandle</code></td></tr>
              <tr><td><code>Toast.loading(msg, opts?)</code></td><td>加载提示，不自动关闭 + 遮罩</td><td><code>ToastHandle</code></td></tr>
              <tr><td><code>Toast.info(msg, opts?)</code></td><td>信息提示，2500ms</td><td><code>ToastHandle</code></td></tr>
              <tr><td><code>Toast.dismissAll()</code></td><td>关闭所有 toast</td><td><code>void</code></td></tr>
              <tr><td><code>handle.dismiss()</code></td><td>手动关闭此 toast</td><td><code>void</code></td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="basic" class={styles.h2}>基础用法</h2>
        <DemoBlock
          title="简写方法"
          desc="使用便捷方法快速弹出提示。每个方法返回一个句柄，可手动关闭。"
          code={`import { Toast } from 'solid-component';\n\n// 需要先在根组件挂载渲染器\n<ToastRenderer />\n\n// 然后任意位置调用\nToast.success('操作成功！');\nToast.error('操作失败，请重试');\nToast.warning('请注意检查输入');\nToast.info('这是一条消息');`}
        >
          <div class={styles.row}>
            <Button variant="primary" text="Success" onClick={() => success('操作成功！')} />
            <Button variant="danger" text="Error" onClick={() => error('操作失败，请重试')} />
            <Button color="#f59e0b" text="Warning" onClick={() => warning('请注意检查输入')} />
            <Button variant="outline" text="Info" onClick={() => info('这是一条消息')} />
          </div>
        </DemoBlock>

        <h2 id="types" class={styles.h2}>不同类型</h2>
        <DemoBlock
          title="完整配置"
          desc="使用 Toast.show() 传入完整配置，控制位置、时长、遮罩等。"
          code={`// 顶部 + 遮罩\nToast.show({\n  message: '保存成功',\n  type: 'success',\n  position: 'top',\n  overlay: true,\n});\n\n// 点击关闭\nToast.show({\n  message: '点击我关闭',\n  type: 'info',\n  closeOnClick: true,\n  duration: 0,\n});\n\n// 长文案自动换行\nToast.show({\n  message: '这是一条很长很长的提示消息用来测试换行',\n  type: 'info',\n  duration: 3000,\n});`}
        >
          <div class={styles.row}>
            <Button variant="primary" text="顶部 + 遮罩" onClick={() => show({ message: '保存成功', type: 'success', position: 'top', overlay: true })} />
            <Button variant="outline" text="点击关闭" onClick={() => show({ message: '点击我关闭', type: 'info', closeOnClick: true, duration: 0 })} />
            <Button variant="ghost" text="长文案" onClick={() => show({ message: '这是一条很长很长的提示消息用来测试换行', type: 'info', duration: 3000 })} />
          </div>
        </DemoBlock>

        <h2 id="position" class={styles.h2}>位置</h2>
        <DemoBlock
          title="三种位置"
          desc="top / middle / bottom，通过 position 参数控制。"
          code={`Toast.success('顶部提示', { position: 'top' });\nToast.success('中间提示', { position: 'middle' });\nToast.success('底部提示', { position: 'bottom' });`}
        >
          <div class={styles.row}>
            <Button variant="primary" size="xs" text="Top" onClick={() => success('顶部提示', { position: 'top' })} />
            <Button variant="primary" size="xs" text="Middle" onClick={() => success('中间提示', { position: 'middle' })} />
            <Button variant="primary" size="xs" text="Bottom" onClick={() => success('底部提示', { position: 'bottom' })} />
          </div>
        </DemoBlock>

        <h2 id="loading" class={styles.h2}>加载提示</h2>
        <DemoBlock
          title="手动控制生命周期"
          desc="Toast.loading() 不自动关闭，需要手动调用 handle.dismiss()。"
          code={`const loading = Toast.loading('正在处理...');\n\n// 异步操作完成后关闭\nconst res = await fetchSomething();\nloading.dismiss();\n\nif (res.ok) {\n  Toast.success('处理完成！');\n} else {\n  Toast.error('处理失败');\n}`}
        >
          <div class={styles.row}>
            <Button
              variant="secondary"
              text="模拟异步操作"
              onClick={() => {
                const h = loading('正在处理...');
                setTimeout(() => {
                  h.dismiss();
                  success('处理完成！');
                }, 2000);
              }}
            />
          </div>
        </DemoBlock>
      </div>
    </>
  );
};

export const ToastDocPage: Component = () => (
  <DocLayout>
    <ToastDocInner />
  </DocLayout>
);
