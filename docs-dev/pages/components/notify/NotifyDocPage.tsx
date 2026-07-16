import { useContext, type Component } from 'solid-js';
import { Notify } from '../../../../src/components/notify/NotifyManager';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';
import type { NotifyOptions } from '../../../../src/components/notify/types';
import { useT, registerLocale } from '../../../doc-i18n';
import zhCN from '../../../i18n/notify/zh-CN';
import enUS from '../../../i18n/notify/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const propsData: PropRow[] = [
  { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger'", default: "'danger'", required: false, desc: 'componentProps.notify.type' },
  { name: 'message', type: 'string', default: '—', required: true, desc: 'componentProps.notify.message' },
  { name: 'duration', type: 'number', default: '3000', required: false, desc: 'componentProps.notify.duration' },
  { name: 'position', type: "'top' | 'bottom'", default: "'top'", required: false, desc: 'componentProps.notify.position' },
  { name: 'color', type: 'string', default: "'white'", required: false, desc: 'componentProps.notify.color' },
  { name: 'background', type: 'string', default: '—', required: false, desc: 'componentProps.notify.background' },
  { name: 'lockScroll', type: 'boolean', default: 'false', required: false, desc: 'componentProps.notify.lockScroll' },
  { name: 'onClick', type: '(e: MouseEvent) => void', default: '—', required: false, desc: 'componentProps.notify.onClick' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: 'componentProps.notify.onClose' },
];

const NotifyDocInner: Component = () => {
  const t = useT();
  const phone = useContext(PhoneTargetContext);
  const m = () => phone?.();
  const noti = (fn: Function, msg: string, opts?: Partial<NotifyOptions>) =>
    fn(msg, { ...opts, teleport: m() });

  return (
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Notify</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px' }}>
        Top/bottom notification bar, imperative API, works out of the box.
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <DemoBlock title={t('demo.toastPrimary')} desc={t('demoDesc.notify_primary')} code="Notify.primary('This is a primary notification');" groupCode="基础类型">
        <Cell title={t('demo.toastPrimary')} clickable onClick={() => noti(Notify.primary, 'This is a primary notification')} />
      </DemoBlock>
      <DemoBlock title={t('demo.toastSuccess')} desc={t('demoDesc.notify_success')} code="Notify.success('操作成功');" groupCode="基础类型">
        <Cell title={t('demo.toastSuccess')} clickable onClick={() => noti(Notify.success, '操作成功')} />
      </DemoBlock>
      <DemoBlock title={t('demo.toastWarning')} desc={t('demoDesc.notify_warning')} code="Notify.warning('Attention');" groupCode="提示">
        <Cell title={t('demo.toastWarning')} clickable onClick={() => noti(Notify.warning, 'Attention')} />
      </DemoBlock>
      <DemoBlock title={t('demo.toastDanger')} desc={t('demoDesc.notify_danger')} code="Notify.danger('操作失败');" groupCode="提示">
        <Cell title={t('demo.toastDanger')} clickable onClick={() => noti(Notify.danger, '操作失败')} />
      </DemoBlock>
      <DemoBlock title={t('demo.bottomPopup')} desc="position: 'bottom'。" code={`Notify.success('Added', { position: 'bottom' });`} groupCode="其他">
        <Cell title={t('demo.bottomPopup')} clickable onClick={() => noti(Notify.success, 'Added to cart', { position: 'bottom' })} />
      </DemoBlock>
      <DemoBlock title={t('demo.noAutoDismiss')} desc={t('demoDesc.notify_manual')} code="Notify.primary('Tap to close', { duration: 0 });" groupCode="其他">
        <Cell title={t('demo.noAutoDismiss')} clickable onClick={() => Notify.primary('Tap anywhere to dismiss', { duration: 0, teleport: m() })} />
      </DemoBlock>

      <GroupCodePhone />
    </div>
  );
};

export const NotifyDocPage = () => (
  <DocLayout><NotifyDocInner /></DocLayout>
);
