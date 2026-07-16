import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { FloatingBall } from '../../../src/components/FloatingBall';
import { Icon } from '../../../src/components/Icon';
import { useT } from '../../doc-i18n';

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
  height: '120px',
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

      {/* zIndex elevated above prev/next nav */}
      <div style={demoBox}>
        <FloatingBall inset={{ right: 16, bottom: 50 }} zIndex={1100}>
          <Icon name="arrow-up" size={22} />
        </FloatingBall>
      </div>

      {/* Left side */}
      <div style={demoBox}>
        <FloatingBall inset={{ left: 16, bottom: 30 }}>
          <span style="font-size:0.65rem;font-weight:600">TOP</span>
        </FloatingBall>
      </div>

      {/* Center-ish */}
      <div style={demoBox}>
        <FloatingBall inset={{ right: 120, bottom: 50 }}>
          <Icon name="send" size={20} />
        </FloatingBall>
      </div>

      {/* Fancy gradient */}
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

      {/* Not draggable, top-right */}
      <div style={demoBox}>
        <FloatingBall draggable={false} inset={{ right: 16, top: 60 }}>
          <Icon name="arrow-up" size={22} />
        </FloatingBall>
      </div>
    </MobilePreview>
  );
};
