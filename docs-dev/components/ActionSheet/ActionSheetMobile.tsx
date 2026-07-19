import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { ActionSheet } from '../../../src/components/ActionSheet';
import type { ActionSheetItem } from '../../../src/components/ActionSheet';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Image } from '../../../src/components/Image';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useActionSheetTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ActionSheetMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useActionSheetTableData();
  const [open, setOpen] = createSignal<string | null>(null);
  const close = () => setOpen(null);

  const basicItems: ActionSheetItem[] = [{ name: 'Edit' }, { name: 'Share' }, { name: 'Delete' }];
  const twoLineItems: ActionSheetItem[] = [
    { name: 'From Album', subname: 'Select from your photo library' },
    { name: 'Take Photo', subname: 'Use your camera' },
  ];

  return (
    <MobilePreview title="ActionSheet">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px 0 0' }}>
        <CellGroup card>
          <Cell title={t('actionsheet.demo.basic')} description="Simple option list" clickable onClick={() => setOpen('basic')} />
          <Cell title={t('actionsheet.demo.full')} description="Title + closeable + description + cancel" clickable onClick={() => setOpen('full')} />
          <Cell title={t('actionsheet.demo.twoline')} description="name + subname" clickable onClick={() => setOpen('twoline')} />
          <Cell title={t('actionsheet.demo.disabled')} description="disabled items" clickable onClick={() => setOpen('disabled')} />
          <Cell title={t('actionsheet.demo.noClose')} description="closeOnSelect=false" clickable onClick={() => setOpen('noClose')} />
          <Cell title={t('actionsheet.demo.custom')} description="Custom JSX content" clickable onClick={() => setOpen('custom')} />
        </CellGroup>

        <ActionSheet open={open() === 'basic'} onClose={close} items={basicItems} />
        <ActionSheet open={open() === 'full'} onClose={close} title="Confirm Delete"
          description="This cannot be undone." closeable
          items={[{ name: 'Delete directly' }, { name: 'Export then delete' }]}
          cancelText="Cancel" onSelect={close} />
        <ActionSheet open={open() === 'twoline'} onClose={close} title="Upload Method"
          closeable items={twoLineItems} cancelText="Cancel" onSelect={close} />
        <ActionSheet open={open() === 'disabled'} onClose={close}
          items={[{ name: 'Option A' }, { name: 'Option B (disabled)', disabled: true }, { name: 'Option C' }]}
          cancelText="Cancel" />
        <ActionSheet open={open() === 'noClose'} onClose={close} title="Select Tags"
          closeable closeOnSelect={false}
          items={[{ name: 'Frontend' }, { name: 'Backend' }, { name: 'Design' }, { name: 'Product' }]}
          cancelText="Done" />
        <ActionSheet open={open() === 'custom'} onClose={close} title="Why SolidJS?" closeable>
          <div style={{ padding: '24px', display: 'flex', 'flex-direction': 'column', 'align-items': 'center', gap: '16px' }}>
            <Image src="./solid-logo.png" width={72} height={72} round />
            <div style={{ 'text-align': 'center' }}>
              <div style={{ 'font-size': '1rem', 'font-weight': 600, 'margin-bottom': '12px' }}>SolidJS</div>
              <ul style={{ 'list-style': 'none', padding: 0, margin: 0, 'font-size': '0.8rem', 'line-height': 2, color: 'var(--sc-color-text-secondary, #6b7280)', 'text-align': 'left' }}>
                <li>✅ <strong>Fine-grained Reactivity</strong> — no VDOM diffing</li>
                <li>🚀 <strong>Blazing Fast</strong> — compiled, not interpreted</li>
                <li>🧩 <strong>TypeScript First</strong> — full type inference</li>
                <li>📦 <strong>Tiny Bundle</strong> — 7KB runtime, zero deps</li>
                <li>🔧 <strong>JSX Native</strong> — no template syntax to learn</li>
                <li>♻️ <strong>Reusable</strong> — components are just functions</li>
              </ul>
            </div>
          </div>
        </ActionSheet>
      </div>
    </MobilePreview>
  );
};
