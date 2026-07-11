import { createSignal, Show, useContext, type Component } from 'solid-js';
import { DialogAPI as Dialog } from '../../../../src/components/Dialog/DialogManager';
import { DialogComponent } from '../../../../src/components/Dialog';
import { Cell } from '../../../../src/components/Cell';
import { useT } from '../../../doc-i18n';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import type { DialogOptions } from '../../../../src/components/Dialog/types';
import css from './DialogDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'show', type: 'boolean', default: '—', required: true, desc: 'componentProps.dialog.show' },
  { name: 'title', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.dialog.title' },
  { name: 'message', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.dialog.message' },
  { name: 'width', type: 'number | string', default: "'320px'", required: false, desc: 'componentProps.dialog.width' },
  { name: 'messageAlign', type: "'left' | 'center' | 'right'", default: "'center'", required: false, desc: 'componentProps.dialog.messageAlign' },
  { name: 'showConfirmButton', type: 'boolean', default: 'true', required: false, desc: 'componentProps.dialog.showConfirmButton' },
  { name: 'showCancelButton', type: 'boolean', default: 'false', required: false, desc: 'componentProps.dialog.showCancelButton' },
  { name: 'confirmText', type: 'string | JSX.Element', default: "'确认'", required: false, desc: 'componentProps.dialog.confirmText' },
  { name: 'cancelText', type: 'string | JSX.Element', default: "'取消'", required: false, desc: 'componentProps.dialog.cancelText' },
  { name: 'confirmDisabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.dialog.confirmDisabled' },
  { name: 'cancelDisabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.dialog.cancelDisabled' },
  { name: 'zIndex', type: 'number | string', default: '2000', required: false, desc: 'componentProps.dialog.zIndex' },
  { name: 'overlay', type: 'boolean', default: 'true', required: false, desc: 'componentProps.dialog.overlay' },
  { name: 'closeOnClickOverlay', type: 'boolean', default: 'false', required: false, desc: 'componentProps.dialog.closeOnClickOverlay' },
  { name: 'lockScroll', type: 'boolean', default: 'true', required: false, desc: 'componentProps.dialog.lockScroll' },
  { name: 'beforeClose', type: '(action: string) => boolean | Promise<boolean>', default: '—', required: false, desc: 'componentProps.dialog.beforeClose' },
  { name: 'onConfirm', type: '() => void | Promise<void>', default: '—', required: false, desc: 'componentProps.dialog.onConfirm' },
  { name: 'onCancel', type: '() => void', default: '—', required: false, desc: 'componentProps.dialog.onCancel' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: 'componentProps.dialog.onClose' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'componentProps.dialog.teleport' },
  { name: 'destroyOnClose', type: 'boolean', default: 'false', required: false, desc: 'componentProps.dialog.destroyOnClose' },
  { name: 'lazyRender', type: 'boolean', default: 'true', required: false, desc: 'componentProps.dialog.lazyRender' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'api', title: '命令式 API' },
  { id: 'demo', title: '示例' },
];

const DialogDocInner: Component = () => {
  const t = useT();
  const phoneTarget = useContext(PhoneTargetContext);
  const mount = () => phoneTarget?.();
  const [declarativeShow, setDeclarativeShow] = createSignal(false);

  const show = (opts: DialogOptions) =>
    Dialog.show({ ...opts, teleport: mount() });

  return (
    <>
      <div class={css.page}>
        <h1 class={css.h1}>Dialog 弹窗</h1>
        <p class={css.intro}>
          {t('componentIntro.DialogIntro')}
        </p>

        <h2 id="props" class={css.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        <h2 id="api" class={css.h2}>{t('section.imperativeApi')}</h2>
        <div style={{ background: '#e8f5e9', border: '1px solid #66bb6a', 'border-radius': '6px', padding: '10px 14px', 'font-size': '0.85rem', 'line-height': 1.6, margin: '12px 0', color: '#2e7d32' }}>
          首次调用 <code>Dialog.show()</code> 等命令式方法时，渲染器会自动挂载到 <code>document.body</code>，<strong>无需手动添加 <code>&lt;DialogRenderer /&gt;</code></strong>。如需控制挂载位置（如放在 ProviderConfig 内部），仍可显式放置，自动检测会跳过。
        </div>
        <PropsTable rows={[
          { name: 'Dialog.show(options)', type: 'DialogHandle', default: '—', required: false, desc: 'componentProps.dialog.Dialog.show(options)' },
          { name: 'Dialog.alert(options)', type: 'DialogHandle', default: '—', required: false, desc: 'componentProps.dialog.Dialog.alert(options)' },
          { name: 'Dialog.confirm(options)', type: 'DialogHandle', default: '—', required: false, desc: 'componentProps.dialog.Dialog.confirm(options)' },
          { name: 'Dialog.dismissAll()', type: 'void', default: '—', required: false, desc: 'componentProps.dialog.Dialog.dismissAll()' },
        ]} />
        <DemoBlock
          title={t('demo.dialogDismiss')}
          desc={'show/alert/confirm 均返回 { dismiss: () => void } 句柄对象，调用 handle.dismiss() 可主动关闭该弹窗，常用于需要在异步操作完成后手动关闭的场景。'}
          code={`const handle = Dialog.show({\n  title: '处理中',\n  message: '请稍候...',\n  showConfirmButton: false,\n});\n\n// 异步操作完成后手动关闭\nawait doSomethingAsync();\nhandle.dismiss();`}
          phone={false}
        >
          <div />
        </DemoBlock>

        <h2 id="demo" class={css.h2}>{t('demo.examples')}</h2>

        <DemoBlock title={t('demo.dialogAlert')} desc={t('demoDesc.dialog_alert')} code={`Dialog.alert({\n  title: '提示',\n  message: '操作成功！',\n});`} groupCode="基础弹窗">
          <Cell title="弹出提示" clickable onClick={() => show({ title: '提示', message: '操作成功！' })} />
        </DemoBlock>
        <DemoBlock title={t('demo.dialogConfirm')} desc={t('demoDesc.dialog_confirm')} code={`Dialog.confirm({\n  title: '确认删除',\n  message: '此操作不可撤销，确定继续吗？',\n});`} groupCode="基础弹窗">
          <Cell title="删除确认" clickable onClick={() => show({ title: '确认删除', message: '此操作不可撤销，确定继续吗？', showCancelButton: true })} />
        </DemoBlock>
        <DemoBlock title={t('demo.dialogNoTitle')} desc={t('demoDesc.dialog_no_title')} code={`Dialog.show({\n  message: '这是一条纯文本消息，没有标题。',\n});`} groupCode="基础弹窗">
          <Cell title="纯消息" clickable onClick={() => show({ message: '这是一条纯文本消息，没有标题。' })} />
        </DemoBlock>
        <DemoBlock title={t('demo.dialogMultiline')} desc={t('demoDesc.message_中的___n_自动换行_')} code={`Dialog.alert({\n  message: '第一行\\n第二行\\n第三行',\n});`} groupCode="基础弹窗">
          <Cell title={t('demo.dialogMultiline')} clickable onClick={() => show({ message: '第一行\n第二行\n第三行' })} />
        </DemoBlock>
        <DemoBlock title={t('demo.dialogCustomText')} desc={t('demoDesc.dialog_custom_text')} code={`Dialog.confirm({\n  title: '保存草稿',\n  confirmText: '保存',\n  cancelText: '不保存',\n});`} groupCode="高级弹窗">
          <Cell title={t('demo.customTrigger')} clickable onClick={() => show({ title: '保存草稿', message: '是否保存当前编辑内容？', showCancelButton: true, confirmText: '保存', cancelText: '不保存' })} />
        </DemoBlock>
        <DemoBlock title={t('demo.dialogJSX')} desc={t('demoDesc.dialog_jsx')} code={`Dialog.alert({\n  title: '更新说明',\n  message: <div>...</div>,\n});`} groupCode="高级弹窗">
          <Cell title="更新日志" clickable onClick={() => show({ title: '更新说明', message: (<div><p>v2.0 版本已发布</p></div>) })} />
        </DemoBlock>
        <DemoBlock title={t('demo.asyncLoading')} desc={t('demoDesc.dialog_async')} code={`Dialog.confirm({\n  title: '提交确认',\n  onConfirm: async () => { await fetch(...); },\n});`} groupCode="高级弹窗">
          <Cell title="异步提交" clickable onClick={() => show({ title: '提交确认', message: '确定要提交吗？提交后不可修改。', showCancelButton: true, confirmText: '提交', onConfirm: () => new Promise(r => setTimeout(r, 1500)) })} />
        </DemoBlock>

        <GroupCodePhone />

        <DemoBlock
          title={t('demo.componentUsage')}
          desc={t('demoDesc.dialog_component')}
          groupCode="组件方式调用"
          code={`import { createSignal } from 'solid-js';\nimport { DialogComponent } from 'solid-mobile';\n\nfunction Demo() {\n  const [show, setShow] = createSignal(false);\n\n  return (\n    <>\n      <Button onClick={() => setShow(true)}>打开弹窗</Button>\n      <DialogComponent\n        show={show()}\n        onUpdateShow={setShow}\n        title="组件弹窗"\n        message="这是通过 JSX 组件方式调用的弹窗。"\n        showCancelButton\n        onConfirm={() => { /* ... */ }}\n        onCancel={() => setShow(false)}\n      />\n    </>\n  );\n}`}
        >
          <Cell title={t('demo.componentUsage')} clickable onClick={() => setDeclarativeShow(true)} />
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
