import { useT, registerLocale } from '../../doc-i18n';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Dialog } from '../../../src/components/Dialog';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useDialogTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const section = (title: string) => (
  <div style={{ 'font-size': '0.85rem', 'font-weight': 600, padding: '20px 12px 6px', color: 'var(--sc-color-text, #374151)' }}>{title}</div>
);

export const DialogMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useDialogTableData();

  return (
    <MobilePreview title="Dialog">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div>
        {/* Basic */}
        {section(t('dialog.demo.basic'))}
        <CellGroup card>
          <Cell title="Alert" clickable onClick={() => Dialog.alert({ title: 'Notice', message: 'Operation successful!' })} />
          <Cell title="Confirm" clickable onClick={() => Dialog.confirm({ title: 'Confirm Delete', message: 'This cannot be undone. Are you sure?' })} />
          <Cell title="No Title" clickable onClick={() => Dialog.show({ message: 'Plain text without a title.' })} />
          <Cell title="Multiline" clickable onClick={() => Dialog.alert({ message: 'Line 1\nLine 2\nLine 3' })} />
        </CellGroup>

        {/* Advanced */}
        {section(t('dialog.demo.advanced'))}
        <CellGroup card>
          <Cell title="Custom Buttons" clickable onClick={() => Dialog.confirm({ title: 'Save Draft', message: 'Save current edits?', confirmText: 'Save', cancelText: "Don't save" })} />
          <Cell title="JSX Content" clickable onClick={() => Dialog.alert({ title: 'Order Summary', message: <div style={{ display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <span>Item</span><span style={{ 'font-weight': 600 }}>Solid Component Pro</span>
            </div>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <span>Qty</span><span>× 1</span>
            </div>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <span>License</span><span style={{ color: '#22c55e', 'font-weight': 700 }}>MIT — Free</span>
            </div>
            <div style={{ 'border-top': '1px dashed var(--sc-color-border, #e5e7eb)', 'margin': '4px 0' }} />
            <div style={{ display: 'flex', 'justify-content': 'space-between', 'font-size': '0.8rem', color: 'var(--sc-color-text-secondary, #6b7280)' }}>
              <span>Version</span><span>v2.0.0</span>
            </div>
          </div> })} />
          <Cell title="Async Submit" clickable onClick={() => Dialog.confirm({ title: 'Submit', message: 'Are you sure?', showCancelButton: true, confirmText: 'Submit', onConfirm: () => new Promise(r => setTimeout(r, 1500)) })} />
          <Cell title="Prevent Close" clickable onClick={() => Dialog.confirm({ title: 'Confirm', message: 'Only "Confirm" can close.', beforeClose: (action: string) => action === 'confirm' ? true : false })} />
        </CellGroup>
      </div>
    </MobilePreview>
  );
};
