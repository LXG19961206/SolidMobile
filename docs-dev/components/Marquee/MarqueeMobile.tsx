import { useT, registerLocale } from '../../doc-i18n';
import { Marquee } from '../../../src/components/Marquee';
import { Card } from '../../../src/components/Card';
import { Notify } from '../../../src/components/Notify';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useMarqueeTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const MarqueeMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useMarqueeTableData();
  let nKey = 0;

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
          <Marquee duration={8}>
            <span onClick={() => Notify.show({ message: `Notification #${++nKey}`, duration: 0 })}
              style={{ cursor: 'pointer', color: 'var(--sc-color-primary, #1677ff)', 'white-space': 'nowrap' }}>
              📢 Click me to trigger a Notify (manual dismiss) — tap to dismiss &nbsp;&nbsp;&nbsp;
            </span>
          </Marquee>
        </Card>
      </div>
    </MobilePreview>
  );
};
