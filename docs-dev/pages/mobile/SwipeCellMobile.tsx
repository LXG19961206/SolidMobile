import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface SwipeCellMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { SwipeCell } from '../../../src/components/SwipeCell';
import { Cell } from '../../../src/components/Cell';
import { Avatar } from '../../../src/components/Avatar';
import { Toast } from '../../../src/components/Toast';
import type { SwipeAction } from '../../../src/components/SwipeCell/types';

const propsData = [
  { name: 'rightActions', type: 'SwipeAction[]', desc: 'componentProps.swipecell.rightActions' },
  { name: 'leftActions', type: 'SwipeAction[]', desc: 'componentProps.swipecell.leftActions' },
  { name: 'threshold', type: 'number', desc: 'componentProps.swipecell.threshold' },
  { name: 'disabled', type: 'boolean', desc: 'componentProps.swipecell.disabled' },
  { name: 'onOpen', type: '() => void', desc: 'componentProps.swipecell.onOpen' },
  { name: 'onClose', type: '() => void', desc: 'componentProps.swipecell.onClose' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const COLORS = ['#1677ff', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];

export const SwipeCellMobile: Component<SwipeCellMobileProps> = (props) => {
  const t = useT();

  const rightActions: SwipeAction[] = [
    { text: t('demo.edit'), theme: 'primary', onClick: () => Toast.success(t('demo.edit')) },
    { text: t('demo.delete'), theme: 'danger', onClick: () => Toast.success(t('demo.delete')) },
  ];

  const leftActions: SwipeAction[] = [
    { text: t('demo.markRead'), theme: 'success', onClick: () => Toast.success(t('demo.read')) },
  ];

  const multiActions: SwipeAction[] = [
    { text: t('demo.collect'), theme: 'warning', onClick: () => Toast.success(t('demo.collect')) },
    { text: t('demo.edit'), theme: 'primary', onClick: () => Toast.success(t('demo.edit')) },
    { text: t('demo.delete'), theme: 'danger', onClick: () => Toast.success(t('demo.delete')) },
  ];

  return (
    <MobilePreview title={t('nav.swipecell')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础右滑 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.swipeCellRight')}</div>
        <div style={CARD.desc}>{t('demo.swipeCellRightDesc')}</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell rightActions={rightActions}>
            <Cell
              title={t('demo.demoUser1')}
              description={t('demo.demoRole1')}
              icon={<Avatar size="sm" color={COLORS[0]} text={t('demo.demoUser1')[0]} />}
            />
          </SwipeCell>
          <SwipeCell rightActions={rightActions}>
            <Cell
              title={t('demo.demoUser2')}
              description={t('demo.demoRole2')}
              icon={<Avatar size="sm" color={COLORS[1]} text={t('demo.demoUser2')[0]} />}
            />
          </SwipeCell>
          <SwipeCell rightActions={rightActions}>
            <Cell
              title={t('demo.demoUser3')}
              description={t('demo.demoRole3')}
              icon={<Avatar size="sm" color={COLORS[2]} text={t('demo.demoUser3')[0]} />}
            />
          </SwipeCell>
        </div>
      </div>

      {/* 左侧操作 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.swipeCellLeft')}</div>
        <div style={CARD.desc}>{t('demo.swipeCellLeftDesc')}</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell leftActions={leftActions}>
            <Cell
              title={t('demo.demoNotice1')}
              description={t('demo.demoNotice1Desc')}
              icon={<Avatar size="sm" color={COLORS[3]} text={t('demo.demoNotice1')[0]} />}
            />
          </SwipeCell>
          <SwipeCell leftActions={leftActions}>
            <Cell
              title={t('demo.demoNotice2')}
              description={t('demo.demoNotice2Desc')}
              icon={<Avatar size="sm" color={COLORS[4]} text={t('demo.demoNotice2')[0]} />}
            />
          </SwipeCell>
        </div>
      </div>

      {/* 多个操作 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.swipeCellMulti')}</div>
        <div style={CARD.desc}>{t('demo.swipeCellMultiDesc')}</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell rightActions={multiActions}>
            <Cell
              title={t('demo.demoUser4')}
              description={t('demo.demoRole4')}
              icon={<Avatar size="sm" color={COLORS[0]} text={t('demo.demoUser4')[0]} />}
            />
          </SwipeCell>
          <SwipeCell rightActions={multiActions}>
            <Cell
              title={t('demo.demoUser5')}
              description={t('demo.demoRole5')}
              icon={<Avatar size="sm" color={COLORS[1]} text={t('demo.demoUser5')[0]} />}
            />
          </SwipeCell>
        </div>
      </div>

      {/* 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.swipeCellDisabled')}</div>
        <div style={CARD.desc}>{t('demo.swipeCellDisabledDesc')}</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell rightActions={rightActions} disabled>
            <Cell
              title={t('demo.demoDisabledCell')}
              description={t('demo.demoDisabledCellDesc')}
              icon={<Avatar size="sm" color="#9ca3af" text={t('demo.demoDisabledCell')[0]} />}
            />
          </SwipeCell>
        </div>
      </div>
    </MobilePreview>
  );
};
