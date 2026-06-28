import { createSignal, Show, useContext, type Component } from 'solid-js';
import { DialogAPI as Dialog, DialogRenderer } from '../../../../src/components/Dialog/DialogManager';
import { DialogComponent } from '../../../../src/components/Dialog';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import type { DialogOptions } from '../../../../src/components/Dialog/types';
import css from './DialogDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'show', type: 'boolean', default: '—', required: true, desc: '是否显示弹窗（受控模式）。' },
  { name: 'title', type: 'string | JSX.Element', default: '—', required: false, desc: '标题。' },
  { name: 'message', type: 'string | JSX.Element', default: '—', required: false, desc: '内容，支持 \\n 换行和 JSX。' },
  { name: 'width', type: 'number | string', default: "'320px'", required: false, desc: '弹窗宽度。' },
  { name: 'messageAlign', type: "'left' | 'center' | 'right'", default: "'center'", required: false, desc: '内容水平对齐。' },
  { name: 'showConfirmButton', type: 'boolean', default: 'true', required: false, desc: '是否展示确认按钮。' },
  { name: 'showCancelButton', type: 'boolean', default: 'false', required: false, desc: '是否展示取消按钮。' },
  { name: 'confirmText', type: 'string | JSX.Element', default: "'确认'", required: false, desc: '确认按钮文案。' },
  { name: 'cancelText', type: 'string | JSX.Element', default: "'取消'", required: false, desc: '取消按钮文案。' },
  { name: 'confirmDisabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用确认按钮。' },
  { name: 'cancelDisabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用取消按钮。' },
  { name: 'zIndex', type: 'number | string', default: '2000', required: false, desc: 'z-index 层级。' },
  { name: 'overlay', type: 'boolean', default: 'true', required: false, desc: '是否展示遮罩层。' },
  { name: 'closeOnClickOverlay', type: 'boolean', default: 'false', required: false, desc: '点击遮罩是否关闭。' },
  { name: 'lockScroll', type: 'boolean', default: 'true', required: false, desc: '是否锁定背景滚动。' },
  { name: 'beforeClose', type: '(action: string) => boolean | Promise<boolean>', default: '—', required: false, desc: '关闭前回调，返回 false 阻止关闭。' },
  { name: 'onConfirm', type: '() => void | Promise<void>', default: '—', required: false, desc: '确认回调。' },
  { name: 'onCancel', type: '() => void', default: '—', required: false, desc: '取消回调。' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: '关闭回调。' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: '挂载目标节点。' },
  { name: 'destroyOnClose', type: 'boolean', default: 'false', required: false, desc: '关闭时销毁内容。' },
  { name: 'lazyRender', type: 'boolean', default: 'true', required: false, desc: '懒渲染。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'api', title: '命令式 API' },
  { id: 'demo', title: '示例' },
];

const DialogDocInner: Component = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const mount = () => phoneTarget?.();
  const [declarativeShow, setDeclarativeShow] = createSignal(false);

  const show = (opts: DialogOptions) =>
    Dialog.show({ ...opts, teleport: mount() });

  return (
    <>
      <DialogRenderer />
      <div class={css.page}>
        <h1 class={css.h1}>Dialog 弹窗</h1>
        <p class={css.intro}>
          居中模态对话框，支持标题、内容、确认/取消按钮。
          既可通过组件声明式调用，也可通过命令式 API 弹出。
        </p>

        <h2 id="props" class={css.h2}>属性 / Props</h2>
        <PropsTable rows={propsData} />

        <h2 id="api" class={css.h2}>命令式 API</h2>
        <DemoBlock
          title="DialogRenderer"
          desc={'命令式调用需要在应用根组件中挂载 <DialogRenderer />。它负责渲染所有通过 Dialog.show() 等命令式方法创建的弹窗实例，本身不产生任何 DOM 节点。'}
          code={`// main.tsx 或 App.tsx 根组件\nimport { DialogRenderer } from 'solid-component';\n\nrender(() => (\n  <>\n    <App />\n    <DialogRenderer />\n  </>\n), document.getElementById('root'));`}
          phone={false}
        >
          <div />
        </DemoBlock>
        <PropsTable rows={[
          { name: 'Dialog.show(options)', type: 'DialogHandle', default: '—', required: false, desc: '完整配置弹窗。options 同 DialogProps（不含 show/onUpdateShow）。返回 handle，可通过 handle.dismiss() 手动关闭。' },
          { name: 'Dialog.alert(options)', type: 'DialogHandle', default: '—', required: false, desc: '提示弹窗。等价于 show({ ...options, showCancelButton: false })。仅展示确认按钮。' },
          { name: 'Dialog.confirm(options)', type: 'DialogHandle', default: '—', required: false, desc: '确认弹窗。等价于 show({ ...options, showCancelButton: true })。展示确认+取消按钮。' },
          { name: 'Dialog.dismissAll()', type: 'void', default: '—', required: false, desc: '立即关闭页面上所有弹窗。通常在路由切换时调用。' },
        ]} />
        <DemoBlock
          title="handle.dismiss()"
          desc={'show/alert/confirm 均返回 { dismiss: () => void } 句柄对象，调用 handle.dismiss() 可主动关闭该弹窗，常用于需要在异步操作完成后手动关闭的场景。'}
          code={`const handle = Dialog.show({\n  title: '处理中',\n  message: '请稍候...',\n  showConfirmButton: false,\n});\n\n// 异步操作完成后手动关闭\nawait doSomethingAsync();\nhandle.dismiss();`}
          phone={false}
        >
          <div />
        </DemoBlock>

        <h2 id="demo" class={css.h2}>示例</h2>

        <DemoBlock title="提示弹窗" desc="基础提示，仅确认按钮。" code={`Dialog.alert({\n  title: '提示',\n  message: '操作成功！',\n});`} groupCode="基础弹窗">
          <Cell title="弹出提示" clickable onClick={() => show({ title: '提示', message: '操作成功！' })} />
        </DemoBlock>
        <DemoBlock title="确认弹窗" desc="带取消按钮，常用于删除确认。" code={`Dialog.confirm({\n  title: '确认删除',\n  message: '此操作不可撤销，确定继续吗？',\n});`} groupCode="基础弹窗">
          <Cell title="删除确认" clickable onClick={() => show({ title: '确认删除', message: '此操作不可撤销，确定继续吗？', showCancelButton: true })} />
        </DemoBlock>
        <DemoBlock title="无标题" desc="不传 title 时只展示内容。" code={`Dialog.show({\n  message: '这是一条纯文本消息，没有标题。',\n});`} groupCode="基础弹窗">
          <Cell title="纯消息" clickable onClick={() => show({ message: '这是一条纯文本消息，没有标题。' })} />
        </DemoBlock>
        <DemoBlock title="多行消息" desc="message 中的 \\n 自动换行。" code={`Dialog.alert({\n  message: '第一行\\n第二行\\n第三行',\n});`} groupCode="基础弹窗">
          <Cell title="多行消息" clickable onClick={() => show({ message: '第一行\n第二行\n第三行' })} />
        </DemoBlock>
        <DemoBlock title="自定义按钮文案" desc="通过 confirmText / cancelText 自定义按钮文字。" code={`Dialog.confirm({\n  title: '保存草稿',\n  confirmText: '保存',\n  cancelText: '不保存',\n});`} groupCode="高级弹窗">
          <Cell title="自定义按钮" clickable onClick={() => show({ title: '保存草稿', message: '是否保存当前编辑内容？', showCancelButton: true, confirmText: '保存', cancelText: '不保存' })} />
        </DemoBlock>
        <DemoBlock title="JSX 内容" desc="message 支持传入 JSX。" code={`Dialog.alert({\n  title: '更新说明',\n  message: <div>...</div>,\n});`} groupCode="高级弹窗">
          <Cell title="更新日志" clickable onClick={() => show({ title: '更新说明', message: (<div><p>v2.0 版本已发布</p></div>) })} />
        </DemoBlock>
        <DemoBlock title="异步加载" desc="onConfirm 异步时自动展示 Loading。" code={`Dialog.confirm({\n  title: '提交确认',\n  onConfirm: async () => { await fetch(...); },\n});`} groupCode="高级弹窗">
          <Cell title="异步提交" clickable onClick={() => show({ title: '提交确认', message: '确定要提交吗？提交后不可修改。', showCancelButton: true, confirmText: '提交', onConfirm: () => new Promise(r => setTimeout(r, 1500)) })} />
        </DemoBlock>

        <GroupCodePhone />

        <DemoBlock
          title="组件方式调用"
          desc="通过 show 属性受控显示，适合需要将弹窗嵌入模板的场景。"
          groupCode="组件方式调用"
          code={`import { createSignal } from 'solid-js';\nimport { DialogComponent } from 'solid-component';\n\nfunction Demo() {\n  const [show, setShow] = createSignal(false);\n\n  return (\n    <>\n      <Button onClick={() => setShow(true)}>打开弹窗</Button>\n      <DialogComponent\n        show={show()}\n        onUpdateShow={setShow}\n        title="组件弹窗"\n        message="这是通过 JSX 组件方式调用的弹窗。"\n        showCancelButton\n        onConfirm={() => { /* ... */ }}\n        onCancel={() => setShow(false)}\n      />\n    </>\n  );\n}`}
        >
          <Cell title="组件方式调用" clickable onClick={() => setDeclarativeShow(true)} />
          <DialogComponent
            show={declarativeShow()}
            onUpdateShow={setDeclarativeShow}
            teleport={mount()}
            title="组件弹窗"
            message="这是通过 JSX 组件方式调用的弹窗。适合需要将 Dialog 嵌入模板、受控显示的场景。"
            showCancelButton
            onConfirm={() => { setDeclarativeShow(false); }}
            onCancel={() => { setDeclarativeShow(false); }}
          />
        </DemoBlock>
      </div>
    </>
  );
};

export const DialogDocPage = () => (
  <DocLayout>
    <DialogDocInner />
  </DocLayout>
);
