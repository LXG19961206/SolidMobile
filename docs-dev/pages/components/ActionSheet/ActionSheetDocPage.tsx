import { createSignal, useContext } from 'solid-js';
import { ActionSheet } from '../../../../src/components/ActionSheet';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import { useT } from '../../../doc-i18n';
import type { PropRow } from '../../../doc-utils';
import type { ActionSheetItem } from '../../../../src/components/ActionSheet/types';

const propsData: PropRow[] = [
  { name: 'open', type: 'boolean', default: '—', required: true, desc: 'componentProps.actionsheet.open' },
  { name: 'onClose', type: '() => void', default: '—', required: true, desc: 'componentProps.actionsheet.onClose' },
  { name: 'items', type: 'ActionSheetItem[]', default: '—', required: false, desc: 'componentProps.actionsheet.items' },
  { name: 'title', type: 'string', default: '—', required: false, desc: 'componentProps.actionsheet.title' },
  { name: 'closeable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.actionsheet.closeable' },
  { name: 'description', type: 'string', default: '—', required: false, desc: 'componentProps.actionsheet.description' },
  { name: 'cancelText', type: 'string', default: '—', required: false, desc: 'componentProps.actionsheet.cancelText' },
  { name: 'closeOnSelect', type: 'boolean', default: 'true', required: false, desc: 'componentProps.actionsheet.closeOnSelect' },
  { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', required: false, desc: 'componentProps.actionsheet.closeOnOverlayClick' },
  { name: 'round', type: 'boolean', default: 'true', required: false, desc: 'componentProps.actionsheet.round' },
];

const basicItems: ActionSheetItem[] = [
  { name: 'Edit' }, { name: 'Copy' }, { name: 'Share' }, { name: 'Delete' },
];

const twoLineItems: ActionSheetItem[] = [
  { name: 'Take Photo', subname: 'Use camera to capture' },
  { name: 'Choose from Album', subname: 'Select from photo library' },
  { name: 'Choose from Files', subname: 'Browse file manager' },
];

const mixedItems: ActionSheetItem[] = [
  { name: 'Set as Default' }, { name: 'Rename', subname: 'Change file name' }, { name: 'View Details' },
  { name: 'Delete', disabled: true },
];

/* ── Inner ── */

const ActionSheetDocInner = () => {
  const t = useT();
  const phone = useContext(PhoneTargetContext);
  const pm = () => phone?.();
  const [s1, s1s] = createSignal(false);
  const [s2, s2s] = createSignal(false);
  const [s3, s3s] = createSignal(false);
  const [s4, s4s] = createSignal(false);
  const [s5, s5s] = createSignal(false);
  const [s6, s6s] = createSignal(false);
  const [s7, s7s] = createSignal(false);

  return (
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>ActionSheet</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px' }}>{t('componentIntro.ActionSheetIntro')}</p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <DemoBlock title={t('demo.actionOptions')} desc={t('demoDesc.actionsheet_items')} code={`<ActionSheet open={open} onClose={...} items={items} />`} groupCode="Basic">
        <Cell title={t('demo.actionOptions')} clickable onClick={() => s1s(true)} />
        <ActionSheet mount={pm()} open={s1()} onClose={() => s1s(false)} items={basicItems} />
      </DemoBlock>
      <DemoBlock title={t('demo.actionTitleCancel')} desc="title + closeable + cancelText." code={`<ActionSheet open={open} title="Choose Action" closeable items={items} cancelText="Cancel" />`} groupCode="Basic">
        <Cell title={t('demo.actionTitleCancel')} clickable onClick={() => s2s(true)} />
        <ActionSheet mount={pm()} open={s2()} onClose={() => s2s(false)} title="Choose Action" closeable items={basicItems} cancelText="Cancel" />
      </DemoBlock>
      <DemoBlock title={t('demo.actionDesc')} desc={t('demoDesc.actionsheet_description')} code={`<ActionSheet open={open} title="Confirm Delete?" description="..." items={items} cancelText="Cancel" />`} groupCode="Basic">
        <Cell title={t('demo.actionDesc')} clickable onClick={() => s3s(true)} />
        <ActionSheet mount={pm()} open={s3()} onClose={() => s3s(false)} title="Confirm Delete?" closeable description="This action cannot be undone." items={[{ name: 'Delete directly' }, { name: 'Export then delete' }]} cancelText="Cancel" />
      </DemoBlock>
      <DemoBlock title={t('demo.actionTwoLine')} desc="name + subname." code={`<ActionSheet open={open} title="Upload Method" items={items} cancelText="Cancel" />`} groupCode="Option Styles">
        <Cell title={t('demo.actionTwoLine')} clickable onClick={() => s4s(true)} />
        <ActionSheet mount={pm()} open={s4()} onClose={() => s4s(false)} title="Upload Method" closeable items={twoLineItems} cancelText="Cancel" />
      </DemoBlock>
      <DemoBlock title={t('demo.actionDisabled')} desc="item.disabled = true." code={`<ActionSheet open={open} items={items} cancelText="Cancel" />`} groupCode="Option Styles">
        <Cell title={t('demo.actionDisabled')} clickable onClick={() => s5s(true)} />
        <ActionSheet mount={pm()} open={s5()} onClose={() => s5s(false)} items={mixedItems} cancelText="Cancel" />
      </DemoBlock>
      <DemoBlock title={t('demo.actionNoClose')} desc="closeOnSelect={false}." code={`<ActionSheet open={open} closeOnSelect={false} items={items} />`} groupCode="Option Styles">
        <Cell title={t('demo.actionNoClose')} clickable onClick={() => s6s(true)} />
        <ActionSheet mount={pm()} open={s6()} onClose={() => s6s(false)} title="Choose Theme Color" closeable closeOnSelect={false} items={[{ name: 'Blue' }, { name: 'Green' }, { name: 'Purple' }, { name: 'Orange' }]} cancelText="OK" />
      </DemoBlock>
      <DemoBlock title={t('demo.customRender')} desc={t('demo.customRenderDesc')} code={`<ActionSheet open={open} title="Custom Panel">...</ActionSheet>`} groupCode="Option Styles">
        <Cell title={t('demo.customRender')} clickable onClick={() => s7s(true)} />
        <ActionSheet mount={pm()} open={s7()} onClose={() => s7s(false)} title="Custom Panel" closeable>
          <div style={{ padding: '24px', 'text-align': 'center' }}>
            <p style={{ margin: '0 0 16px', color: '#666' }}>You can place any content here, such as forms, image pickers, etc.</p>
          </div>
        </ActionSheet>
      </DemoBlock>

      <GroupCodePhone />
    </div>
  );
};

export const ActionSheetDocPage = () => (
  <DocLayout><ActionSheetDocInner /></DocLayout>
);
