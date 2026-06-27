import { useContext, type Component } from 'solid-js';
import { Notify, NotifyRenderer } from '../../../../src/components/notify/NotifyManager';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import type { NotifyOptions } from '../../../../src/components/notify/types';
import css from './NotifyDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger'", default: "'danger'", required: false, desc: '类型。' },
  { name: 'message', type: 'string', default: '—', required: true, desc: '展示文案，支持通过 \\n 换行。' },
  { name: 'duration', type: 'number', default: '3000', required: false, desc: '展示时长(ms)，值为 0 时不会消失。' },
  { name: 'zIndex', type: 'number', default: '2000', required: false, desc: 'z-index 层级。' },
  { name: 'position', type: "'top' | 'bottom'", default: "'top'", required: false, desc: '弹出位置。' },
  { name: 'color', type: 'string', default: "'white'", required: false, desc: '字体颜色。' },
  { name: 'background', type: 'string', default: '—', required: false, desc: '背景颜色，覆盖 type 默认色。' },
  { name: 'className', type: 'string', default: '—', required: false, desc: '自定义类名。' },
  { name: 'lockScroll', type: 'boolean', default: 'false', required: false, desc: '是否锁定背景滚动。' },
  { name: 'teleport', type: 'Node', default: 'document.body', required: false, desc: '挂载目标节点。' },
  { name: 'onClick', type: '(event: MouseEvent) => void', default: '—', required: false, desc: '点击时的回调函数。' },
  { name: 'onOpened', type: '() => void', default: '—', required: false, desc: '完全展示后的回调函数。' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: '关闭时的回调函数。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'demo', title: '示例' },
];

/** Inner component — rendered inside DocLayout so useContext works */
const NotifyDocInner: Component = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const mount = () => phoneTarget?.();

  const show = (opts: NotifyOptions) =>
    Notify.show({ ...opts, teleport: mount() });
  const primary = (msg: string, opts?: Partial<NotifyOptions>) =>
    Notify.primary(msg, { ...opts, teleport: mount() });
  const success = (msg: string, opts?: Partial<NotifyOptions>) =>
    Notify.success(msg, { ...opts, teleport: mount() });
  const warning = (msg: string, opts?: Partial<NotifyOptions>) =>
    Notify.warning(msg, { ...opts, teleport: mount() });
  const danger = (msg: string, opts?: Partial<NotifyOptions>) =>
    Notify.danger(msg, { ...opts, teleport: mount() });

  return (
    <>

      <NotifyRenderer />
      <div class={css.page}>
        <h1 class={css.h1}>Notify 通知栏</h1>
        <p class={css.intro}>
          顶部/底部弹出式通知栏，支持 primary、success、warning、danger 四种类型。
          通过命令式 API 调用，支持自动消失和手动关闭。
        </p>

        <h2 id="props" class={css.h2}>属性 / Props</h2>
        <PropsTable rows={propsData} />

        <h2 id="demo" class={css.h2}>示例</h2>
        <DemoBlock
          title="基础类型"
          desc="四种类型：primary、success、warning、danger。默认从顶部弹出，3 秒后自动消失。"
          code={`import { Notify, NotifyRenderer } from 'solid-component';\n\n// 在 App 根组件挂载 Renderer\n<NotifyRenderer />\n\n// 命令式调用\nNotify.primary('这是一条主要通知');\nNotify.success('操作成功');\nNotify.warning('请注意');\nNotify.danger('操作失败');`}
        >
          <div class={css.demoGrid}>
            <button class={css.demoBtn} onClick={() => primary('这是一条主要通知')}>Primary</button>
            <button class={css.demoBtn} onClick={() => success('操作成功')}>Success</button>
            <button class={css.demoBtn} onClick={() => warning('请注意')}>Warning</button>
            <button class={css.demoBtn} onClick={() => danger('操作失败')}>Danger</button>
          </div>
        </DemoBlock>

        <DemoBlock
          title="底部弹出"
          desc={'设置 position: "bottom" 从底部滑入。'}
          code={`Notify.success('已添加至购物车', { position: 'bottom' });`}
        >
          <button class={css.demoBtn} onClick={() => success('已添加至购物车', { position: 'bottom' })}>
            底部弹出
          </button>
        </DemoBlock>

        <DemoBlock
          title="持续展示"
          desc="设置 duration: 0 不会自动消失，需手动 dismiss。"
          code={`const handle = Notify.warning('请先完成表单', { duration: 0 });\n\n// 手动关闭\nhandle.dismiss();`}
        >
          <button
            class={css.demoBtn}
            onClick={() => {
              const h = warning('请先完成表单', { duration: 0 });
              setTimeout(() => h.dismiss(), 2000);
            }}
          >
            显示2秒后手动关闭
          </button>
        </DemoBlock>

        <DemoBlock
          title="多行消息"
          desc="message 中 \\n 会自动换行。"
          code={`Notify.primary('第一行\\n第二行\\n第三行');`}
        >
          <button class={css.demoBtn} onClick={() => primary('第一行\n第二行\n第三行')}>
            多行通知
          </button>
        </DemoBlock>

        <DemoBlock
          title="自定义颜色"
          desc="通过 color 和 background 自定义样式。"
          code={`Notify.show({\n  message: '自定义通知',\n  color: '#1f2937',\n  background: '#fbbf24',\n});`}
        >
          <button
            class={css.demoBtn}
            onClick={() =>
              show({ message: '自定义通知', color: '#1f2937', background: '#fbbf24' })
            }
          >
            自定义风格
          </button>
        </DemoBlock>

        <DemoBlock
          title="JSX 自定义内容"
          desc="message 支持传入 JSX，可自由组合内容。"
          code={`Notify.success(<>操作成功！共导入 <strong>128</strong> 条数据</>);`}
        >
          <button
            class={css.demoBtn}
            onClick={() =>
              success(<>操作成功！共导入 <strong>128</strong> 条数据</>)
            }
          >
            JSX 内容通知
          </button>
        </DemoBlock>
      </div>
    </>
  );
};

export const NotifyDocPage = () => (
  <DocLayout>
    <NotifyDocInner />
  </DocLayout>
);
