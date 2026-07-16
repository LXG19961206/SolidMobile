import { createSignal, useContext } from 'solid-js';

import zhCN from '../../../i18n/overlay/zh-CN';
import enUS from '../../../i18n/overlay/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { Overlay } from '../../../../src/components/Overlay';
import { ActionSheet } from '../../../../src/components/ActionSheet';
import { Cell } from '../../../../src/components/Cell';
import { Button } from '../../../../src/components/Button';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';
import styles from './OverlayDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'open', type: 'boolean', default: '—', required: true, desc: 'componentProps.overlay.open' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: 'componentProps.overlay.onClose' },
  { name: 'zIndex', type: 'number', default: '999', required: false, desc: 'componentProps.overlay.zIndex' },
  { name: 'lockScroll', type: 'boolean', default: 'true', required: false, desc: 'componentProps.overlay.lockScroll' },
  { name: 'mount', type: 'Node', default: 'document.body', required: false, desc: 'componentProps.overlay.mount' },
  { name: 'duration', type: 'number', default: '200', required: false, desc: 'componentProps.overlay.duration' },
];

const OverlayDocInner = () => {
  const t = useT();
  const phone = useContext(PhoneTargetContext);
  const pm = () => phone?.();
  const [s1, s1s] = createSignal(false);
  const [s2, s2s] = createSignal(false);
  const [s3, s3s] = createSignal(false);

  return (
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Overlay</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px' }}>{t('componentIntro.OverlayIntro')}</p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <DemoBlock title={t('demo.overlayClose')} desc={t('demoDesc.overlay_dialog')} code={`<Overlay open={open} onClose={...}>...</Overlay>`} groupCode="overlayDemo">
        <Cell title={t('demo.overlayClose')} clickable onClick={() => s1s(true)} />
        <Overlay open={s1()} onClose={() => s1s(false)} mount={pm()}>
          <div class={styles.overlayContent}>
            <div class={styles.overlayTitle}>Notice</div>
            <div class={styles.overlayBody}>Click backdrop or press Escape to close</div>
            <Button type="primary" text="Got it" onClick={() => s1s(false)} />
          </div>
        </Overlay>
      </DemoBlock>

      <DemoBlock title={t('demo.overlayActionSheet')} desc={t('demoDesc.overlay_actionsheet')} code={`<ActionSheet open={open} onClose={...} items={...} />`} groupCode="overlayDemo">
        <Cell title="ActionSheet" clickable onClick={() => s2s(true)} />
        <ActionSheet mount={pm()} open={s2()} onClose={() => s2s(false)} title="Choose Action" closeable items={[{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }]} cancelText="Cancel" />
      </DemoBlock>

      <DemoBlock title={t('demo.noScrollLock')} desc={t('demo.noScrollLockDesc')} code={`<Overlay open={open} onClose={...} lockScroll={false}>...</Overlay>`} groupCode="overlayDemo">
        <Cell title={t('demo.noScrollLock')} clickable onClick={() => s3s(true)} />
        <Overlay open={s3()} onClose={() => s3s(false)} lockScroll={false} mount={pm()}>
          <div class={styles.overlayContent}>
            <div class={styles.overlayTitle}>Scrollable</div>
            <div class={styles.overlayBody}>Page scroll is enabled</div>
            <Button type="primary" text="Close" onClick={() => s3s(false)} />
          </div>
        </Overlay>
      </DemoBlock>

      <GroupCodePhone />
    </div>
  );
};

export const OverlayDocPage = () => (
  <DocLayout><OverlayDocInner /></DocLayout>
);
