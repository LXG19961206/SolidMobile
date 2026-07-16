import { type Component } from 'solid-js';


import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface ToastMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Toast } from '../../../src/components/Toast';
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

      {/* Basic types */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.toastFiveTypes')}</div>
        <div style={CARD.desc}>{t('demo.toastFiveTypesMobileDesc')}</div>
        <div style={CARD.body}>
          <Button type="success" text="Success" size="sm" onClick={() => Toast.success('Operation successful!')} />
          <Button type="danger" text="Error" size="sm" onClick={() => Toast.error('Something went wrong!')} />
          <Button type="warning" text="Warning" size="sm" onClick={() => Toast.warning('Please check your input.')} />
          <Button size="sm" text="Loading" color="#6366f1" onClick={() => { const h = Toast.loading('Loading...'); setTimeout(() => h.dismiss(), 2000); }} />
          <Button size="sm" text="Info" color="var(--sc-color-primary, #1677ff)" onClick={() => Toast.info('This is an info message.')} />
        </div>
      </div>

      {/* Position */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.toastPosition')}</div>
        <div style={CARD.desc}>{t('demo.toastPositionMobileDesc')}</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text="Top" onClick={() => Toast.show({ message: 'Position: top', position: 'top', duration: 1500 })} />
          <Button variant="outline" size="sm" text="Middle" onClick={() => Toast.show({ message: 'Position: middle', position: 'middle', duration: 1500 })} />
          <Button variant="outline" size="sm" text="Bottom" onClick={() => Toast.show({ message: 'Position: bottom', position: 'bottom', duration: 1500 })} />
        </div>
      </div>

      {/* Overlay & multiline */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.toastOverlayMultiline')}</div>
        <div style={CARD.desc}>{t('demo.toastOverlayMultilineMobileDesc')}</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text="With Overlay" onClick={() => Toast.show({ message: 'Processing, please wait...', type: 'loading', overlay: true, duration: 2000 })} />
          <Button variant="outline" size="sm" text="Multiline" onClick={() => Toast.info('First line\nSecond line\nThird line')} />
        </div>
      </div>

      {/* Dismiss all */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.toastDismissAll')}</div>
        <div style={CARD.desc}>{t('demo.toastDismissAllMobileDesc')}</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text="Pop Multiple" onClick={() => { Toast.info('Message one'); Toast.info('Message two'); }} />
          <Button variant="ghost" size="sm" text="Dismiss All" onClick={() => Toast.dismissAll()} />
        </div>
      </div>
    </MobilePreview>
  );
};
