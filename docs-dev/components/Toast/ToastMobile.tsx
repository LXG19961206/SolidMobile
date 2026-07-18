import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Toast } from '../../../src/components/Toast';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useToastTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ToastMobile = () => {
  const t = useT();
  const { propsTables } = useToastTableData();

  const row = { display: 'flex', 'flex-wrap': 'wrap' as const, gap: '8px' };

  return (
    <MobilePreview title="Toast">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Types */}
        <Card title={t('toast.demo.types')}>
          <div style={row}>
            <Button type="success" size="sm" onClick={() => Toast.success('Operation successful!')}>Success</Button>
            <Button type="danger" size="sm" onClick={() => Toast.error('Something went wrong!')}>Error</Button>
            <Button type="warning" size="sm" onClick={() => Toast.warning('Please check your input.')}>Warning</Button>
            <Button size="sm" color="#6366f1" onClick={() => { const h = Toast.loading('Loading...'); setTimeout(() => h.dismiss(), 2000); }}>Loading</Button>
            <Button size="sm" onClick={() => Toast.info('This is an info message.')}>Info</Button>
          </div>
        </Card>

        {/* Position */}
        <Card title={t('toast.demo.position')}>
          <div style={row}>
            <Button variant="outline" size="sm" onClick={() => Toast.show({ message: 'Top', position: 'top', duration: 1500 })}>Top</Button>
            <Button variant="outline" size="sm" onClick={() => Toast.show({ message: 'Middle', position: 'middle', duration: 1500 })}>Middle</Button>
            <Button variant="outline" size="sm" onClick={() => Toast.show({ message: 'Bottom', position: 'bottom', duration: 1500 })}>Bottom</Button>
          </div>
        </Card>

        {/* Overlay & Multiline */}
        <Card title={t('toast.demo.overlay')}>
          <div style={row}>
            <Button variant="outline" size="sm" onClick={() => Toast.show({ message: 'Processing...', type: 'loading', overlay: true, duration: 2000 })}>With Overlay</Button>
            <Button variant="outline" size="sm" onClick={() => Toast.info('Line 1\nLine 2\nLine 3')}>Multiline</Button>
          </div>
        </Card>

        {/* JSX Message */}
        <Card title="JSX 自定义内容">
          <div style={row}>
            <Button size="sm" color="#f59e0b" onClick={() => Toast.show({ message:
              <span style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', gap: '4px' }}>
                <span style={{ 'font-size': '1.5rem' }}>🎂</span>
                <span>Happy <span style={{ color: '#f59e0b', 'font-weight': 700 }}>Birthday</span>!</span>
                <span style={{ 'font-size': '0.7rem', opacity: 0.7 }}>— from Solid Component</span>
              </span>,
              duration: 3000,
            })}>JSX Message</Button>
          </div>
        </Card>

        {/* Dismiss All */}
        <Card title={t('toast.demo.dismiss')}>
          <div style={row}>
            <Button variant="outline" size="sm" onClick={() => { Toast.info('Message one'); Toast.info('Message two'); }}>Pop Multiple</Button>
            <Button variant="ghost" size="sm" onClick={() => Toast.dismissAll()}>Dismiss All</Button>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
