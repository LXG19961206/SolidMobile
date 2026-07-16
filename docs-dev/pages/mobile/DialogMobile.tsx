import { createSignal, type Component } from 'solid-js';


import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface DialogMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { DialogAPI as Dialog } from '../../../src/components/Dialog/DialogManager';
import { DialogComponent } from '../../../src/components/Dialog';
import { Button } from '../../../src/components/Button';
import { Cell, CellGroup } from '../../../src/components/Cell';

const propsData = [
  { name: 'Dialog.alert(opts)', type: 'DialogHandle', desc: 'componentProps.dialog.Dialog.alert(opts)' },
  { name: 'Dialog.confirm(opts)', type: 'DialogHandle', desc: 'componentProps.dialog.Dialog.confirm(opts)' },
  { name: 'Dialog.show(opts)', type: 'DialogHandle', desc: 'componentProps.dialog.Dialog.show(opts)' },
  { name: 'handle.dismiss()', type: 'void', desc: 'componentProps.dialog.handle.dismiss()' },
  { name: 'Dialog.dismissAll()', type: 'void', desc: 'componentProps.dialog.Dialog.dismissAll()' },
  { name: 'title', type: 'string | JSX.Element', desc: 'componentProps.dialog.title' },
  { name: 'message', type: 'string | JSX.Element', desc: 'componentProps.dialog.message' },
  { name: 'showConfirmButton', type: 'boolean', desc: 'componentProps.dialog.showConfirmButton' },
  { name: 'showCancelButton', type: 'boolean', desc: 'componentProps.dialog.showCancelButton' },
  { name: 'confirmText / cancelText', type: 'string', desc: 'componentProps.dialog.confirmText / cancelText' },
  { name: 'closeOnClickOverlay', type: 'boolean', desc: 'componentProps.dialog.closeOnClickOverlay' },
  { name: 'onConfirm / onCancel', type: '() => void', desc: 'componentProps.dialog.onConfirm / onCancel' },
  { name: 'beforeClose', type: '(action) => boolean', desc: 'componentProps.dialog.beforeClose' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const DialogMobile: Component<DialogMobileProps> = (props) => {
  const t = useT();
  const [showDeclarative, setShowDeclarative] = createSignal(false);

  return (
    <MobilePreview title="Dialog" props={propsData} components={props.components} onNavigate={props.onNavigate}>

      {/* Basic dialogs */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.dialogBasic')}</div>
        <div style={CARD.desc}>{t('demo.dialogBasicDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="Alert" clickable onClick={() => Dialog.alert({ title: 'Notice', message: 'Operation successful!' })} />
            <Cell title="Confirm" clickable onClick={() => Dialog.confirm({ title: 'Confirm Delete', message: 'This action cannot be undone. Are you sure you want to continue?' })} />
            <Cell title="No Title" clickable onClick={() => Dialog.show({ message: 'This is a plain text message without a title.' })} />
            <Cell title="Multiline" clickable onClick={() => Dialog.alert({ message: 'Line one\nLine two\nLine three' })} />
          </CellGroup>
        </div>
      </div>

      {/* Advanced dialogs */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.dialogAdvanced')}</div>
        <div style={CARD.desc}>{t('demo.dialogAdvancedDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="Custom Buttons" clickable onClick={() => Dialog.confirm({ title: 'Save Draft', message: 'Save current edits?', confirmText: 'Save', cancelText: "Don't save" })} />
            <Cell title="JSX Content" clickable onClick={() => Dialog.alert({ title: 'Release Notes', message: (<div><p style="margin:0">v2.0 has been released</p><p style="margin:4px 0 0;font-size:0.8rem;color:#6b7280">New: Picker inertia scrolling, SwipeCell reverse close</p></div>) })} />
            <Cell title="Async Submit" clickable onClick={() => Dialog.confirm({ title: 'Submit Confirmation', message: 'Are you sure you want to submit? This cannot be modified after submission.', showCancelButton: true, confirmText: 'Submit', onConfirm: () => new Promise(r => setTimeout(r, 1500)) })} />
            <Cell title="Prevent Close" clickable onClick={() => Dialog.confirm({ title: 'Confirm Action', message: 'Only clicking "Confirm" can close this dialog. Cancel and overlay click are disabled.', beforeClose: (action) => { if (action === 'confirm') return true; return false; } })} />
          </CellGroup>
        </div>
      </div>

      {/* Component usage & dismiss */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.dialogComponentDismiss')}</div>
        <div style={CARD.desc}>{t('demo.dialogComponentDismissDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="Component Usage" clickable onClick={() => setShowDeclarative(true)} />
            <Cell title="Manual Dismiss" clickable onClick={() => {
              const h = Dialog.show({ title: 'Processing', message: 'Please wait...', showConfirmButton: false });
              setTimeout(() => h.dismiss(), 2000);
            }} />
          </CellGroup>
          <DialogComponent
            show={showDeclarative()}
            onUpdateShow={setShowDeclarative}
            title="Component Dialog"
            message="This dialog is invoked via JSX component. Suitable for template embedding and controlled visibility scenarios."
            showCancelButton
            onConfirm={() => { setShowDeclarative(false); }}
            onCancel={() => { setShowDeclarative(false); }}
          />
        </div>
      </div>
    </MobilePreview>
  );
};
