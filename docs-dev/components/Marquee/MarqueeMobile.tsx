import { useT, registerLocale } from '../../doc-i18n';
import { Marquee } from '../../../src/components/Marquee';
import { Card } from '../../../src/components/Card';
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
          <Marquee><span style={{ 'white-space': 'nowrap' }}>🔥 这是一条跑马灯消息，会向左无限循环滚动 —— &nbsp;&nbsp;&nbsp;</span></Marquee>
        </Card>
        <Card title={t('marquee.demo.speed')} subtitle={t('marquee.demoDesc.speed')}>
          <Marquee duration={3}><span style={{ color: '#f59e0b', 'white-space': 'nowrap' }}>⚡ 快速滚动，3 秒完成一圈 &nbsp;&nbsp;&nbsp;</span></Marquee>
        </Card>
        <Card title={t('marquee.demo.direction')} subtitle={t('marquee.demoDesc.direction')}>
          <Marquee direction="right" duration={6}><span style={{ 'white-space': 'nowrap' }}>⬅️ 从右往左的反向滚动 &nbsp;&nbsp;&nbsp;</span></Marquee>
        </Card>
        <Card title={t('marquee.demo.pause')} subtitle={t('marquee.demoDesc.pause')}>
          <Marquee duration={5} pauseOnHover={false}><span style={{ 'white-space': 'nowrap' }}>⚠ 悬停时继续滚动，不会暂停 &nbsp;&nbsp;&nbsp;</span></Marquee>
        </Card>
      </div>
    </MobilePreview>
  );
};
