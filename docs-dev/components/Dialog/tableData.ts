import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useDialogTableData() {
  const t = useT();

  const propsTables: TableSection[] = [
    {
      title: 'Dialog Options',
      rows: [
        { name: 'show', type: 'boolean', def: '—', desc: 'dialog.props.show' },
        { name: 'title', type: 'string | JSX.Element', def: '—', desc: 'dialog.props.title' },
        { name: 'message', type: 'string | JSX.Element', def: '—', desc: 'dialog.props.message' },
        { name: 'width', type: 'number | string', def: "'320px'", desc: 'dialog.props.width' },
        { name: 'messageAlign', type: "'left' | 'center' | 'right'", def: "'center'", desc: 'dialog.props.messageAlign' },
        { name: 'showConfirmButton', type: 'boolean', def: 'true', desc: 'dialog.props.showConfirmButton' },
        { name: 'showCancelButton', type: 'boolean', def: 'false', desc: 'dialog.props.showCancelButton' },
        { name: 'confirmText', type: 'string | JSX.Element', def: '—', desc: 'dialog.props.confirmText' },
        { name: 'cancelText', type: 'string | JSX.Element', def: '—', desc: 'dialog.props.cancelText' },
        { name: 'confirmDisabled', type: 'boolean', def: 'false', desc: 'dialog.props.confirmDisabled' },
        { name: 'cancelDisabled', type: 'boolean', def: 'false', desc: 'dialog.props.cancelDisabled' },
        { name: 'zIndex', type: 'number | string', def: '2000', desc: 'dialog.props.zIndex' },
        { name: 'overlay', type: 'boolean', def: 'true', desc: 'dialog.props.overlay' },
        { name: 'closeOnClickOverlay', type: 'boolean', def: 'false', desc: 'dialog.props.closeOnClickOverlay' },
        { name: 'lockScroll', type: 'boolean', def: 'true', desc: 'dialog.props.lockScroll' },
        { name: 'beforeClose', type: '(action) => boolean | Promise<boolean>', def: '—', desc: 'dialog.props.beforeClose' },
        { name: 'onConfirm', type: '() => void | Promise<void>', def: '—', desc: 'dialog.props.onConfirm' },
        { name: 'onCancel', type: '() => void', def: '—', desc: 'dialog.props.onCancel' },
        { name: 'onClose', type: '() => void', def: '—', desc: 'dialog.props.onClose' },
        { name: 'teleport', type: 'string | Element', def: 'document.body', desc: 'dialog.props.teleport' },
        { name: 'destroyOnClose', type: 'boolean', def: 'false', desc: 'dialog.props.destroyOnClose' },
        { name: 'lazyRender', type: 'boolean', def: 'true', desc: 'dialog.props.lazyRender' },
        { name: 'class', type: 'string', def: '—', desc: 'dialog.props.class' },
        { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'dialog.props.style' },
      ],
    },
    {
      title: 'Methods',
      rows: [
        { name: 'Dialog.alert(options)', type: 'DialogHandle', def: '—', desc: 'dialog.methods.alert' },
        { name: 'Dialog.confirm(options)', type: 'DialogHandle', def: '—', desc: 'dialog.methods.confirm' },
        { name: 'Dialog.show(options)', type: 'DialogHandle', def: '—', desc: 'dialog.methods.show' },
        { name: 'Dialog.dismissAll()', type: 'void', def: '—', desc: 'dialog.methods.dismissAll' },
      ],
    },
  ];

  const cssVarsTables: TableSection[] = [{
    title: 'Dialog',
    rows: [
      { name: '--sc-dialog-bg', type: 'color', def: '#fff', desc: 'dialog.cssVars.--sc-dialog-bg' },
      { name: '--sc-dialog-radius', type: 'length', def: '16px', desc: 'dialog.cssVars.--sc-dialog-radius' },
      { name: '--sc-dialog-header-size', type: 'length', def: '1.05rem', desc: 'dialog.cssVars.--sc-dialog-header-size' },
      { name: '--sc-dialog-body-size', type: 'length', def: '0.9rem', desc: 'dialog.cssVars.--sc-dialog-body-size' },
      { name: '--sc-dialog-btn-height', type: 'length', def: '50px', desc: 'dialog.cssVars.--sc-dialog-btn-height' },
      { name: '--sc-dialog-confirm-color', type: 'color', def: '--sc-color-primary', desc: 'dialog.cssVars.--sc-dialog-confirm-color' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
