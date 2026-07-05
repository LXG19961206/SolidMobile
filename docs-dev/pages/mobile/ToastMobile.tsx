import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface ToastMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Toast, ToastRenderer } from '../../../src/components/Toast';
import { Button } from '../../../src/components/Button';

const propsData = [
  { name: 'Toast.success(msg)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.success(msg)' },
  { name: 'Toast.error(msg)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.error(msg)' },
  { name: 'Toast.warning(msg)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.warning(msg)' },
  { name: 'Toast.loading(msg)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.loading(msg)' },
  { name: 'Toast.info(msg)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.info(msg)' },
  { name: 'Toast.show(options)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.show(options)' },
  { name: 'Toast.dismissAll()', type: 'void', desc: 'componentProps.toast.Toast.dismissAll()' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px' },
};

export const ToastMobile: Component<ToastMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title={t('demo.toastMobileTitle')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* 基础类型 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.toastFiveTypes')}</div>
        <div style={CARD.desc}>{t('demo.toastFiveTypesMobileDesc')}</div>
        <div style={CARD.body}>
          <Button type="success" text={t('demo.toastSuccessBtn')} size="sm" onClick={() => Toast.success(t('demo.toastSuccessMsg'))} />
          <Button type="danger" text={t('demo.toastErrorBtn')} size="sm" onClick={() => Toast.error(t('demo.toastErrorMsg'))} />
          <Button type="warning" text={t('demo.toastWarningBtn')} size="sm" onClick={() => Toast.warning(t('demo.toastWarningMsg'))} />
          <Button size="sm" text={t('demo.toastLoadingBtn')} color="#6366f1" onClick={() => { const h = Toast.loading(t('demo.toastLoadingMsg')); setTimeout(() => h.dismiss(), 2000); }} />
          <Button size="sm" text={t('demo.toastInfoBtn')} color="var(--sc-color-primary, #1677ff)" onClick={() => Toast.info(t('demo.toastInfoMsg'))} />
        </div>
      </div>

      {/* 位置 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.toastPosition')}</div>
        <div style={CARD.desc}>{t('demo.toastPositionMobileDesc')}</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text={t('demo.toastTop')} onClick={() => Toast.show({ message: t('demo.toastTopMsg'), position: 'top', duration: 1500 })} />
          <Button variant="outline" size="sm" text={t('demo.toastMiddle')} onClick={() => Toast.show({ message: t('demo.toastMiddleMsg'), position: 'middle', duration: 1500 })} />
          <Button variant="outline" size="sm" text={t('demo.toastBottom')} onClick={() => Toast.show({ message: t('demo.toastBottomMsg'), position: 'bottom', duration: 1500 })} />
        </div>
      </div>

      {/* 长文本 & 遮罩 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.toastOverlayMultiline')}</div>
        <div style={CARD.desc}>{t('demo.toastOverlayMultilineMobileDesc')}</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text={t('demo.toastOverlayMode')} onClick={() => Toast.show({ message: t('demo.toastProcessingMsg'), type: 'loading', overlay: true, duration: 2000 })} />
          <Button variant="outline" size="sm" text={t('demo.toastMultiline')} onClick={() => Toast.info(t('demo.toastMultilineMsg'))} />
        </div>
      </div>

      {/* 全局关闭 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.toastDismissAll')}</div>
        <div style={CARD.desc}>{t('demo.toastDismissAllMobileDesc')}</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text={t('demo.toastPopMultiple')} onClick={() => { Toast.info(t('demo.toastMsg1')); Toast.info(t('demo.toastMsg2')); }} />
          <Button variant="ghost" size="sm" text={t('demo.toastDismissAllBtn')} onClick={() => Toast.dismissAll()} />
        </div>
      </div>
    </MobilePreview>
  );
};
