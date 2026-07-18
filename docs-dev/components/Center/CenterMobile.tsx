import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Center } from '../../../src/components/Center';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCenterTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const CenterMobile = () => {
  const t = useT();
  const { propsTables } = useCenterTableData();

  const chip = {
    background: 'var(--sc-color-primary, #1677ff)', color: '#fff', padding: '6px 16px',
    'border-radius': '16px', 'font-size': '0.8rem', 'font-weight': 600,
    'white-space': 'nowrap' as const,
  };

  const stage = (h?: string) => ({
    background: 'var(--sc-color-background-secondary, #f8fafc)',
    border: '1px dashed var(--sc-color-border, #cbd5e1)',
    'border-radius': '8px',
    width: '100%',
    ...(h ? { height: h } : {}),
    position: 'relative' as const,
  });

  return (
    <MobilePreview title="Center">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Default: no props */}
        <Card title={t('center.demo.default')} subtitle="flexX + flexY">
          <div style={stage('80px')}>
            <Center>
              <span style={chip}>Full center</span>
            </Center>
          </div>
        </Card>

        {/* flexX — horizontal only */}
        <Card title={t('center.demo.flexX')} subtitle="justify-content: center">
          <div style={stage('80px')}>
            <Center flexX>
              <span style={chip}>Horizontal only</span>
            </Center>
          </div>
        </Card>

        {/* flexY — vertical only */}
        <Card title={t('center.demo.flexY')} subtitle="align-items: center">
          <div style={stage('80px')}>
            <Center flexY>
              <span style={chip}>Vertical center</span>
            </Center>
          </div>
        </Card>

        {/* inline — inline-flex */}
        <Card title={t('center.demo.inline')} subtitle="inline-flex">
          <div style={{ ...stage(), padding: '12px' }}>
            Before{' '}
            <Center flexX inline>
              <span style={chip}>Inline Center</span>
            </Center>{' '}
            After
          </div>
        </Card>

        {/* text — text-align center */}
        <Card title={t('center.demo.text')} subtitle="text-align: center">
          <div style={{ ...stage(), padding: '16px' }}>
            <Center text>
              <div style={{ 'font-size': '0.9rem', 'font-weight': 600 }}>Centered Title</div>
              <div style={{ 'font-size': '0.75rem', color: 'var(--sc-color-text-secondary, #9ca3af)', 'margin-top': '4px' }}>Subtitle text</div>
            </Center>
          </div>
        </Card>

        {/* vertical — vertical-align */}
        <Card title={t('center.demo.vertical')} subtitle="vertical-align: middle">
          <div style={{ ...stage(), padding: '16px', 'font-size': '0.85rem', 'line-height': '32px' }}>
            Left{' '}
            <Center vertical inline style={{ width: '40px', 'text-align': 'center' }}>
              <span style={{ 'font-size': '1.2rem' }}>⭐</span>
            </Center>{' '}
            Middle{' '}
            <Center vertical inline style={{ width: '40px', 'text-align': 'center' }}>
              <span style={{ 'font-size': '1.2rem' }}>❤️</span>
            </Center>{' '}
            Right
          </div>
        </Card>

        {/* position — absolute centering */}
        <Card title={t('center.demo.position')} subtitle="absolute + transform">
          <div style={stage('100px')}>
            <Center position>
              <span style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '6px 16px', 'border-radius': '20px', 'font-size': '0.75rem', 'white-space': 'nowrap' }}>
                Overlay center
              </span>
            </Center>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
