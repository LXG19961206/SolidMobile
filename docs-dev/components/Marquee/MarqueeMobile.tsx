import { useT, registerLocale } from '../../doc-i18n';
import { Marquee } from '../../../src/components/Marquee';
import { Card } from '../../../src/components/Card';
import { Notify } from '../../../src/components/notify';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useMarqueeTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const MarqueeMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useMarqueeTableData();

  return (
    <MobilePreview title="Marquee">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('marquee.demo.basic')} subtitle={t('marquee.demoDesc.basic')}>
          <Marquee><span style={{ 'white-space': 'nowrap' }}>🔥 Breaking News — This marquee scrolls infinitely to the left &nbsp;&nbsp;&nbsp;</span></Marquee>
        </Card>
        <Card title={t('marquee.demo.speed')} subtitle={t('marquee.demoDesc.speed')}>
          <Marquee duration={3}><span style={{ color: '#f59e0b', 'white-space': 'nowrap' }}>⚡ Fast mode — 3 seconds per loop &nbsp;&nbsp;&nbsp;</span></Marquee>
        </Card>
        <Card title={t('marquee.demo.direction')} subtitle={t('marquee.demoDesc.direction')}>
          <Marquee direction="right" duration={6}><span style={{ 'white-space': 'nowrap' }}>⬅️ Reverse — scrolling rightward &nbsp;&nbsp;&nbsp;</span></Marquee>
        </Card>
        <Card title={t('marquee.demo.pause')} subtitle={t('marquee.demoDesc.pause')}>
          <Marquee duration={5} pauseOnHover={false}><span style={{ 'white-space': 'nowrap' }}>⚠ No pause on hover — keeps going &nbsp;&nbsp;&nbsp;</span></Marquee>
        </Card>
        <Card title={t('marquee.demo.notify')} subtitle={t('marquee.demoDesc.notify')}>
          <span onClick={() => Notify.show({
            type: 'primary',
            closeable: true,
            message: <Marquee><span style={{ 'white-space': 'nowrap' }}>🔥 Breaking — Stock hits all-time high! Earnings season kicks off with record profits. &nbsp;&nbsp;&nbsp;</span></Marquee>,
            duration: 0,
          })}
            style={{ cursor: 'pointer', color: 'var(--sc-color-primary, #1677ff)', 'font-size': '0.85rem' }}>
            📢 Open Notify with Marquee (close button) →
          </span>
        </Card>
      </div>
    </MobilePreview>
  );
};
