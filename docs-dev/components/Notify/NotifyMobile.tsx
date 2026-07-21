import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Notify } from '../../../src/components/notify';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useNotifyTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const row = { display: 'flex', 'flex-wrap': 'wrap' as const, gap: '8px' };

export const NotifyMobile = () => {
  const t = useT();
  const { propsTables } = useNotifyTableData();

  return (
    <MobilePreview title="Notify">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Types */}
        <Card title={t('notify.demo.types')}>
          <div style={row}>
            <Button size="sm" onClick={() => Notify.primary('Connection established')}>Primary</Button>
            <Button type="success" size="sm" onClick={() => Notify.success('Operation completed')}>Success</Button>
            <Button type="warning" size="sm" onClick={() => Notify.warning('Low disk space')}>Warning</Button>
            <Button type="danger" size="sm" onClick={() => Notify.danger('System error')}>Danger</Button>
          </div>
        </Card>

        {/* Position */}
        <Card title={t('notify.demo.position')}>
          <div style={row}>
            <Button variant="outline" size="sm" onClick={() => Notify.show({ message: 'Bottom notification', type: 'primary', position: 'bottom', duration: 3000 })}>Bottom</Button>
          </div>
        </Card>

        {/* Custom Style + JSX */}
        <Card title={t('notify.demo.jsx')}>
          <div style={row}>
            <Button size="sm" color="#667eea" onClick={() => Notify.show({
              message: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px' }}>
                <span style={{ 'font-size': '1.2rem' }}>✨</span>
                <span><strong>Upgrade!</strong> v2.0 is here</span>
              </span>,
              color: '#fff',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              duration: 4000,
            })}>JSX + Gradient</Button>
          </div>
        </Card>

        <Card title={t('notify.demo.marquee')} subtitle={t('notify.demoDesc.marquee')}>
          <div style={row}>
            <Button size="sm" type="primary" onClick={() => Notify.show({
              type: 'primary',
              closeable: true,
              marquee: true,
              message: '🔥 Breaking — Stock hits all-time high! Earnings season kicks off with record profits.',
              duration: 0,
            })}>Marquee Notify</Button>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
