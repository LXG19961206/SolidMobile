import { type Component } from 'solid-js';


import zhCN from '../../i18n/floatingball/zh-CN';
import enUS from '../../i18n/floatingball/en-US';
import { registerLocale } from '../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { FloatingBall } from '../../../src/components/FloatingBall';
import { Icon } from '../../../src/components/Icon';

export interface FloatingBallMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const propsData = [
  { name: 'inset', type: '{ left?, top?, right?, bottom? }', desc: 'componentProps.floatingball.inset' },
  { name: 'draggable', type: 'boolean', desc: 'componentProps.floatingball.draggable' },
  { name: 'snapToEdge', type: 'boolean', desc: 'componentProps.floatingball.snapToEdge' },
  { name: 'zIndex', type: 'number', desc: 'componentProps.floatingball.zIndex' },
];

const demoBox = {
  position: 'relative' as const,
  height: '100px',
  background: 'var(--sc-doc-card-placeholder, #f5f5f5)',
  'border-radius': '10px',
  'margin-bottom': '12px',
};

export const FloatingBallMobile: Component<FloatingBallMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="FloatingBall" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <div style={{ padding: '8px 16px 16px', 'font-size': '0.85rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'line-height': 1.6 }}>
        {t('demoDesc.floatingball_intro')}
      </div>

      <div style={demoBox}>
        <FloatingBall inset={{ right: 16, bottom: 30 }}>
          <Icon name="arrow-up" size={22} />
        </FloatingBall>
      </div>

      <div style={demoBox}>
        <FloatingBall inset={{ left: 16, bottom: 30 }}>
          <span style="font-size:0.65rem;font-weight:600">TOP</span>
        </FloatingBall>
      </div>

      <div style={demoBox}>
        <FloatingBall
          inset={{ right: 16, bottom: 30 }}
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

      <div style={demoBox}>
        <FloatingBall draggable={false} inset={{ left: 16, bottom: 30 }}>
          <Icon name="arrow-up" size={22} />
        </FloatingBall>
      </div>
    </MobilePreview>
  );
};
