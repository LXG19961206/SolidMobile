import { useContext, type Component } from 'solid-js';


import { useT } from '../../../doc-i18n';
import { Toast } from '../../../../src/components/Toast/ToastManager';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';
import styles from './ToastDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'message', type: 'string | JSX.Element', default: '—', required: true, desc: 'componentProps.toast.message' },
  { name: 'type', type: "'success' | 'error' | 'warning' | 'loading' | 'info'", default: '—', required: false, desc: 'componentProps.toast.type' },
  { name: 'position', type: "'top' | 'middle' | 'bottom'", default: "'middle'", required: false, desc: 'componentProps.toast.position' },
  { name: 'duration', type: 'number', default: '3000', required: false, desc: 'componentProps.toast.duration' },
  { name: 'overlay', type: 'boolean', default: 'false', required: false, desc: 'componentProps.toast.overlay' },
  { name: 'closeOnClick', type: 'boolean', default: 'false', required: false, desc: 'componentProps.toast.closeOnClick' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: 'componentProps.toast.onClose' },
];

const methodsData: PropRow[] = [
  { name: 'Toast.show(options)', type: 'ToastHandle', default: '—', required: false, desc: 'componentProps.toast.Toast.show(options)' },
  { name: 'Toast.success(msg, opts?)', type: 'ToastHandle', default: '—', required: false, desc: 'componentProps.toast.Toast.success(msg, opts?)' },
  { name: 'Toast.error(msg, opts?)', type: 'ToastHandle', default: '—', required: false, desc: 'componentProps.toast.Toast.error(msg, opts?)' },
  { name: 'Toast.warning(msg, opts?)', type: 'ToastHandle', default: '—', required: false, desc: 'componentProps.toast.Toast.warning(msg, opts?)' },
  { name: 'Toast.loading(msg, opts?)', type: 'ToastHandle', default: '—', required: false, desc: 'componentProps.toast.Toast.loading(msg, opts?)' },
  { name: 'Toast.info(msg, opts?)', type: 'ToastHandle', default: '—', required: false, desc: 'componentProps.toast.Toast.info(msg, opts?)' },
  { name: 'Toast.dismissAll()', type: 'void', default: '—', required: false, desc: 'componentProps.toast.Toast.dismissAll()' },
];

/* ── Inner Component (inside DocLayout for context) ── */

const ToastDocInner: Component = () => {
  const t = useT();
  const phone = useContext(PhoneTargetContext);
  const m = () => phone?.();

  return (
    <div class={styles.page}>
      <h1 class={styles.h1}>Toast</h1>
      <p class={styles.lead}>{t('componentIntro.ToastIntro')}</p>

      <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="methods" class={styles.h2}>{t('section.methods')}</h2>
      <PropsTable rows={methodsData} />

      <DemoBlock title={t('demo.toastShorthand')} desc={t('demoDesc.toast_shorthand')} code={`Toast.success('Success！');\nToast.error('Failed');\nToast.info('This is a message');`} groupCode="结果反馈">
        <Cell title={t('demo.toastSuccess')} clickable onClick={() => Toast.success('Success！', { portalMount: m() })} />
      </DemoBlock>
      <DemoBlock title={t('demo.toastError')} code={`Toast.error('Failed, please retry');`} groupCode="结果反馈">
        <Cell title={t('demo.toastError')} clickable onClick={() => Toast.error('Failed, please retry', { portalMount: m(), overlay: false })} />
      </DemoBlock>
      <DemoBlock title={t('demo.toastWarning')} code={`Toast.warning('Warning: check your input');`} groupCode="Notice">
        <Cell title={t('demo.toastWarning')} clickable onClick={() => Toast.warning('Warning: check your input', { portalMount: m() })} />
      </DemoBlock>
      <DemoBlock title={t('demo.toastInfo')} code={`Toast.info('This is a message');`} groupCode="Notice">
        <Cell title={t('demo.toastInfo')} clickable onClick={() => Toast.info('This is a message', { portalMount: m() })} />
      </DemoBlock>
      <DemoBlock title={t('demo.toastLoading')} code={`const h = Toast.loading('Loading...');\n// 完成后\nh.dismiss();`} groupCode="Notice">
        <Cell title="Loading (auto-close 2s)" clickable onClick={() => {
          const h = Toast.loading('Loading...', { portalMount: m(), overlay: false });
          setTimeout(() => h.dismiss(), 2000);
        }} />
      </DemoBlock>
      <DemoBlock title={t('demo.customPosition')} code={`Toast.success('Top notification', { position: 'top' });`} groupCode="Notice">
        <Cell title="Top Position" clickable onClick={() => Toast.success('Top notification', { position: 'top', portalMount: m() })} />
      </DemoBlock>

      <DemoBlock title={t('demo.overlayMode')} desc={t('demoDesc.toast_overlay')} code={`Toast.error('Failed', { overlay: true });`} groupCode="遮罩">
        <Cell title="Error + Overlay" clickable onClick={() => Toast.error('Failed, please retry', { portalMount: m() })} />
      </DemoBlock>
      <DemoBlock title={t('demo.loadingOverlay')} desc={t('demoDesc.toast_loading')} code={`Toast.loading('Loading...', { overlay: true });`} groupCode="遮罩">
        <Cell title="Loading + Overlay" clickable onClick={() => Toast.loading('Loading...', { portalMount: m(), overlay: true })} />
      </DemoBlock>
      <GroupCodePhone />
    </div>
  );
};

/* ── Page ── */

export const ToastDocPage: Component = () => (
  <DocLayout>
    <ToastDocInner />
  </DocLayout>
);
