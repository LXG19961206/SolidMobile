import { FloatingBall } from '../../../../src/components/FloatingBall';
import { Icon } from '../../../../src/components/Icon';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';
import { useT, loadLocale } from '../../../doc-i18n';
loadLocale('floatingball');
import styles from './FloatingBallDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'inset', type: '{ left?, top?, right?, bottom? }', default: "{ right: 16, bottom: 24 }", required: false, desc: 'componentProps.floatingball.inset' },
  { name: 'draggable', type: 'boolean', default: 'true', required: false, desc: 'componentProps.floatingball.draggable' },
  { name: 'snapToEdge', type: 'boolean', default: 'true', required: false, desc: 'componentProps.floatingball.snapToEdge' },
  { name: 'zIndex', type: 'number', default: '999', required: false, desc: 'componentProps.floatingball.zIndex' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.floatingball.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.floatingball.style' },
];

const cssVarsData: PropRow[] = [
  { name: '--sc-floating-ball-size', type: 'length', default: '44px', required: false, desc: 'cssVars.FloatingBall.__sc_floating_ball_size' },
  { name: '--sc-floating-ball-bg', type: 'color', default: 'var(--sc-color-primary, #1677ff)', required: false, desc: 'cssVars.FloatingBall.__sc_floating_ball_bg' },
  { name: '--sc-floating-ball-color', type: 'color', default: '#fff', required: false, desc: 'cssVars.FloatingBall.__sc_floating_ball_color' },
  { name: '--sc-floating-ball-shadow', type: 'shadow', default: '0 4px 12px rgba(0,0,0,0.2)', required: false, desc: 'cssVars.FloatingBall.__sc_floating_ball_shadow' },
  { name: '--sc-floating-ball-radius', type: 'length', default: '50%', required: false, desc: 'cssVars.FloatingBall.__sc_floating_ball_radius' },
  { name: '--sc-floating-ball-z-index', type: 'number', default: '999', required: false, desc: 'cssVars.FloatingBall.__sc_floating_ball_z_index' },
];

export const FloatingBallDocPage = () => {
  const t = useT();
  return (
    <DocLayout>
      <div class={styles.page}>
        <h1 class={styles.h1}>FloatingBall</h1>
        <p class={styles.intro}>
          {t('componentIntro.FloatingBallIntro')}
        </p>

        <h2 class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        <h2 class={styles.h2}>{t('common.cssVars')}</h2>
        <PropsTable rows={cssVarsData} />

        <h2 class={styles.h2}>{t('section.floatingballBasic')}</h2>
        <DemoBlock
          title={t('demo.floatingballBasic')}
          desc={t('demoDesc.floatingball_basic')}
          code={`<FloatingBall>\n  <Icon name="arrow-up" size={22} />\n</FloatingBall>`}
        >
          <div style="height:120px;background:var(--sc-color-background-secondary,#f5f5f5);border-radius:8px;position:relative;overflow:hidden">
            <FloatingBall inset={{ right: 16, bottom: 24 }}>
              <Icon name="arrow-up" size={22} />
            </FloatingBall>
          </div>
        </DemoBlock>

        <DemoBlock
          hideTitle
          title={t('demo.floatingballSnap')}
          desc={t('demoDesc.floatingball_snap')}
          code={`<FloatingBall inset={{ right: 16, bottom: 120 }} snapToEdge>\n  <Icon name="arrow-down" size={22} />\n</FloatingBall>`}
        >
          <div style="height:120px;background:var(--sc-color-background-secondary,#f5f5f5);border-radius:8px;position:relative;overflow:hidden">
            <FloatingBall inset={{ right: 16, bottom: 80 }} snapToEdge>
              <Icon name="arrow-down" size={22} />
            </FloatingBall>
          </div>
        </DemoBlock>

        <DemoBlock
          hideTitle
          title="Custom Content"
          desc="Any JSX content can be placed inside the ball."
          code={`<FloatingBall>\n  <span style="font-size:0.7rem;font-weight:600">TOP</span>\n</FloatingBall>`}
        >
          <div style="height:120px;background:var(--sc-color-background-secondary,#f5f5f5);border-radius:8px;position:relative;overflow:hidden">
            <FloatingBall inset={{ right: 80, bottom: 24 }}>
              <span style="font-size:0.7rem;font-weight:600">TOP</span>
            </FloatingBall>
          </div>
        </DemoBlock>

        <DemoBlock
          hideTitle
          title="Not Draggable"
          desc="draggable={false} — fixed position only, no drag."
          code={`<FloatingBall draggable={false}>\n  <Icon name="arrow-up" size={22} />\n</FloatingBall>`}
        >
          <div style="height:120px;background:var(--sc-color-background-secondary,#f5f5f5);border-radius:8px;position:relative;overflow:hidden">
            <FloatingBall draggable={false} inset={{ right: 160, bottom: 24 }}>
              <Icon name="arrow-up" size={22} />
            </FloatingBall>
          </div>
        </DemoBlock>

      </div>
    </DocLayout>
  );
};
