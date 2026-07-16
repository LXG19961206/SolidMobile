import { createSignal, Show, useContext, type Component } from 'solid-js';
import { DialogAPI as Dialog } from '../../../../src/components/Dialog/DialogManager';
import { DialogComponent } from '../../../../src/components/Dialog';
import { Cell } from '../../../../src/components/Cell';
import { useT, loadLocale } from '../../../doc-i18n';
loadLocale('dialog');
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
  { name: 'confirmText', type: 'string | JSX.Element', default: "'Confirm'", required: false, desc: 'componentProps.dialog.confirmText' },
  { name: 'cancelText', type: 'string | JSX.Element', default: "'Cancel'", required: false, desc: 'componentProps.dialog.cancelText' },
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
  { id: 'props', title: 'Props' },
  { id: 'api', title: 'Imperative API' },
  { id: 'demo', title: 'Examples' },
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
        <h1 class={css.h1}>Dialog</h1>
        <p class={css.intro}>
          {t('componentIntro.DialogIntro')}
        </p>

        <h2 id="props" class={css.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        <h2 id="api" class={css.h2}>{t('section.imperativeApi')}</h2>
        <PropsTable rows={[
          { name: 'Dialog.show(options)', type: 'DialogHandle', default: '—', required: false, desc: 'componentProps.dialog.Dialog.show(options)' },
          { name: 'Dialog.alert(options)', type: 'DialogHandle', default: '—', required: false, desc: 'componentProps.dialog.Dialog.alert(options)' },
          { name: 'Dialog.confirm(options)', type: 'DialogHandle', default: '—', required: false, desc: 'componentProps.dialog.Dialog.confirm(options)' },
          { name: 'Dialog.dismissAll()', type: 'void', default: '—', required: false, desc: 'componentProps.dialog.Dialog.dismissAll()' },
        ]} />
        <DemoBlock
          title={t('demo.dialogDismiss')}
          desc={'show/alert/confirm all return a { dismiss: () => void } handle. Call handle.dismiss() to programmatically close the dialog, useful for async workflows.'}
          code={`const handle = Dialog.show({\n  title: 'Processing',\n  message: 'Please wait...',\n  showConfirmButton: false,\n});\n\n// Dismiss manually after async operation\nawait doSomethingAsync();\nhandle.dismiss();`}
          phone={false}
        >
          <div />
        </DemoBlock>

        <h2 id="demo" class={css.h2}>{t('demo.examples')}</h2>

        <DemoBlock title={t('demo.dialogAlert')} desc={t('demoDesc.dialog_alert')} code={`Dialog.alert({\n  title: 'Notice',\n  message: 'Success!',\n});`} groupCode="基础弹窗">
          <Cell title="Show Alert" clickable onClick={() => show({ title: 'Notice', message: 'Success!' })} />
        </DemoBlock>
        <DemoBlock title={t('demo.dialogConfirm')} desc={t('demoDesc.dialog_confirm')} code={`Dialog.confirm({\n  title: 'Confirm Delete',\n  message: 'This cannot be undone. Are you sure?',\n});`} groupCode="基础弹窗">
          <Cell title="Confirm" clickable onClick={() => show({ title: 'Confirm Delete', message: 'This cannot be undone. Are you sure?', showCancelButton: true })} />
        </DemoBlock>
        <DemoBlock title={t('demo.dialogNoTitle')} desc={t('demoDesc.dialog_no_title')} code={`Dialog.show({\n  message: 'This is a plain text message without a title.',\n});`} groupCode="基础弹窗">
          <Cell title="Plain Text" clickable onClick={() => show({ message: 'This is a plain text message without a title.' })} />
        </DemoBlock>
        <DemoBlock title={t('demo.dialogMultiline')} desc={t('demoDesc.message_中的___n_自动换行_')} code={`Dialog.alert({\n  message: '第一行\\n第二行\\n第三行',\n});`} groupCode="基础弹窗">
          <Cell title={t('demo.dialogMultiline')} clickable onClick={() => show({ message: 'Line 1\nLine 2\nLine 3' })} />
        </DemoBlock>
        <DemoBlock title={t('demo.dialogCustomText')} desc={t('demoDesc.dialog_custom_text')} code={`Dialog.confirm({\n  title: 'Save Draft',\n  confirmText: 'Save',\n  cancelText: 'Discard',\n});`} groupCode="高级弹窗">
          <Cell title={t('demo.customTrigger')} clickable onClick={() => show({ title: 'Save Draft', message: '是否保存当前编辑内容？', showCancelButton: true, confirmText: 'Save', cancelText: 'Discard' })} />
        </DemoBlock>
        <DemoBlock title={t('demo.dialogJSX')} desc={t('demoDesc.dialog_jsx')} code={`Dialog.alert({\n  title: 'Release Notes',\n  message: <div>...</div>,\n});`} groupCode="高级弹窗">
          <Cell title="Release Notes" clickable onClick={() => show({ title: 'Release Notes', message: (<div><p>v2.0 Release is now available</p></div>) })} />
        </DemoBlock>
        <DemoBlock title={t('demo.asyncLoading')} desc={t('demoDesc.dialog_async')} code={`Dialog.confirm({\n  title: 'Confirm Submission',\n  onConfirm: async () => { await fetch(...); },\n});`} groupCode="高级弹窗">
          <Cell title="Async Submit" clickable onClick={() => show({ title: 'Confirm Submission', message: 'Are you sure? This cannot be undone.', showCancelButton: true, confirmText: 'Submit', onConfirm: () => new Promise(r => setTimeout(r, 1500)) })} />
        </DemoBlock>

        <GroupCodePhone />

        <DemoBlock
          title={t('demo.componentUsage')}
          desc={t('demoDesc.dialog_component')}
          groupCode="Component Usage"
          code={`import { createSignal } from 'solid-js';\nimport { DialogComponent } from 'solid-mobile';\n\nfunction Demo() {\n  const [show, setShow] = createSignal(false);\n\n  return (\n    <>\n      <Button onClick={() => setShow(true)}>Open Dialog</Button>\n      <DialogComponent\n        show={show()}\n        onUpdateShow={setShow}\n        title="Component Dialog"\n        message="Dialog Component Usage dialog."\n        showCancelButton\n        onConfirm={() => { /* ... */ }}\n        onCancel={() => setShow(false)}\n      />\n    </>\n  );\n}`}
        >
          <Cell title={t('demo.componentUsage')} clickable onClick={() => setDeclarativeShow(true)} />
          <DialogComponent
            show={declarativeShow()}
            onUpdateShow={setDeclarativeShow}
            teleport={mount()}
            title="Component Dialog"
            message="Dialog Component Usage dialog. Useful for embedding Dialog into templates with controlled visibility."
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
