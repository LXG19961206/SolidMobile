import { useT, registerLocale } from '../../doc-i18n';
import { FloatingBall } from '../../../src/components/FloatingBall';
import { Icon } from '../../../src/components/Icon';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useFloatingBallTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const spacer = { height: '100px', 'margin-bottom': '12px' };

export const FloatingBallMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useFloatingBallTableData();

  return (
    <MobilePreview title="FloatingBall">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px' }}>
        <p style={{ 'font-size': '0.8rem', color: 'var(--sc-color-text-secondary, #6b7280)', 'line-height': 1.6, 'margin-bottom': '16px' }}>
          {t('floatingball.intro')}
        </p>

        {/* Basic — right side with arrow-up */}
        <div style={spacer}>
          <FloatingBall inset={{ right: 20, bottom: 30 }} snapToEdge={false}>
            <Icon name="arrow-up" size={22} />
          </FloatingBall>
        </div>

        {/* Custom style — left side, gradient + rounded square */}
        <div style={spacer}>
          <FloatingBall
            inset={{ left: 20, bottom: 30 }}
            style={{
              '--sc-floating-ball-bg': 'linear-gradient(135deg, #667eea, #764ba2)',
              '--sc-floating-ball-radius': '16px',
              '--sc-floating-ball-size': '48px',
              '--sc-floating-ball-shadow': '0 4px 20px rgba(102, 126, 234, 0.5)',
            }}
          >
            <Icon name="star" size={22} />
          </FloatingBall>
        </div>

        {/* Not draggable — right side, higher up */}
        <div style={{ height: '80px', 'margin-bottom': '12px' }}>
          <FloatingBall draggable={false} inset={{ right: 80, bottom: 20 }}>
            <Icon name="close" size={22} />
          </FloatingBall>
        </div>

        {/* Text content — left side, top text */}
        <div style={{ height: '60px', 'margin-bottom': '12px' }}>
          <FloatingBall inset={{ left: 80, bottom: 10 }} snapToEdge={false}>
            <span style={{ 'font-size': '0.65rem', 'font-weight': 700 }}>TOP</span>
          </FloatingBall>
        </div>

        {/* Search action — right side, green + snap */}
        <div style={spacer}>
          <FloatingBall
            inset={{ right: 20, bottom: 30 }}
            style={{
              '--sc-floating-ball-size': '52px',
              '--sc-floating-ball-bg': '#22c55e',
              '--sc-floating-ball-shadow': '0 4px 16px rgba(34, 197, 94, 0.4)',
            }}
          >
            <Icon name="search" size={24} />
          </FloatingBall>
        </div>
      </div>
    </MobilePreview>
  );
};
