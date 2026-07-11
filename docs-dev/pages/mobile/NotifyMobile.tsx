import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface NotifyMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Notify } from '../../../src/components/notify';
import { Button } from '../../../src/components/Button';
import { useT } from '../../doc-i18n';

const propsData = [
  { name: 'Notify.primary(msg)', type: 'NotifyHandle', desc: 'componentProps.notify.Notify.primary(msg)' },
  { name: 'Notify.success(msg)', type: 'NotifyHandle', desc: 'componentProps.notify.Notify.success(msg)' },
  { name: 'Notify.warning(msg)', type: 'NotifyHandle', desc: 'componentProps.notify.Notify.warning(msg)' },
  { name: 'Notify.danger(msg)', type: 'NotifyHandle', desc: 'componentProps.notify.Notify.danger(msg)' },
  { name: 'Notify.show(options)', type: 'NotifyHandle', desc: 'componentProps.notify.Notify.show(options)' },
  { name: 'Notify.dismissAll()', type: 'void', desc: 'componentProps.notify.Notify.dismissAll()' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px' },
};

export const NotifyMobile: Component<NotifyMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Notify 通知栏" props={propsData} components={props.components} onNavigate={props.onNavigate}>

      {/* 四种类型 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.notifyTypes')}</div>
        <div style={CARD.desc}>{t('demo.notifyTypesDesc')}</div>
        <div style={CARD.body}>
          <Button type="primary" size="sm" text="Primary" onClick={() => Notify.primary('Primary notification')} />
          <Button type="success" size="sm" text="Success" onClick={() => Notify.success('Operation successful!')} />
          <Button type="warning" size="sm" text="Warning" onClick={() => Notify.warning('Please check carefully')} />
          <Button type="danger" size="sm" text="Danger" onClick={() => Notify.danger('Operation failed')} />
        </div>
      </div>

      {/* 位置 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.position')}</div>
        <div style={CARD.desc}>{t('demo.positionDesc')}</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text={t('demo.top')} onClick={() => Notify.show({ message: 'Top notification', type: 'primary', position: 'top', duration: 2000 })} />
          <Button variant="outline" size="sm" text={t('demo.bottom')} onClick={() => Notify.show({ message: 'Bottom notification', type: 'success', position: 'bottom', duration: 2000 })} />
        </div>
      </div>

      {/* 自定义 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customStyle')}</div>
        <div style={CARD.desc}>{t('demo.notifyCustomDesc')}</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text={t('demo.customColor')} onClick={() => Notify.show({ message: 'Custom notification', background: '#6366f1', color: '#fff', duration: 2000 })} />
          <Button variant="outline" size="sm" text={t('demo.longDuration')} onClick={() => Notify.show({ message: 'Persistent notification (duration=0)', type: 'warning', duration: 0 })} />
        </div>
      </div>
    </MobilePreview>
  );
};
