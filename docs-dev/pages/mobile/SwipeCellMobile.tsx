import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { useT, registerLocale } from '../../doc-i18n';
import zhCN from '../../i18n/swipecell/zh-CN';
import enUS from '../../i18n/swipecell/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

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
    { text: "Edit", theme: 'primary', onClick: () => Toast.success("Edit") },
    { text: "Delete", theme: 'danger', onClick: () => Toast.success("Delete") },
  ];

  const leftActions: SwipeAction[] = [
    { text: "Mark Read", theme: 'success', onClick: () => Toast.success("Marked as read") },
  ];

  const multiActions: SwipeAction[] = [
    { text: "Collect", theme: 'warning', onClick: () => Toast.success("Collected") },
    { text: "Edit", theme: 'primary', onClick: () => Toast.success("Edit") },
    { text: "Delete", theme: 'danger', onClick: () => Toast.success("Delete") },
  ];

  return (
    <MobilePreview title={t('nav.swipecell')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Basic right swipe */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.swipeCellRight')}</div>
        <div style={CARD.desc}>{t('demo.swipeCellRightDesc')}</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell rightActions={rightActions}>
            <Cell
              title="User 1"
              description="Frontend Developer"
              icon={<Avatar size="sm" color={COLORS[0]} text="U" />}
            />
          </SwipeCell>
          <SwipeCell rightActions={rightActions}>
            <Cell
              title="User 2"
              description="Backend Developer"
              icon={<Avatar size="sm" color={COLORS[1]} text="U" />}
            />
          </SwipeCell>
          <SwipeCell rightActions={rightActions}>
            <Cell
              title="User 3"
              description="UI Designer"
              icon={<Avatar size="sm" color={COLORS[2]} text="U" />}
            />
          </SwipeCell>
        </div>
      </div>

      {/* Left actions */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.swipeCellLeft')}</div>
        <div style={CARD.desc}>{t('demo.swipeCellLeftDesc')}</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell leftActions={leftActions}>
            <Cell
              title="System Notice"
              description="Server maintenance at 2 AM"
              icon={<Avatar size="sm" color={COLORS[3]} text="S" />}
            />
          </SwipeCell>
          <SwipeCell leftActions={leftActions}>
            <Cell
              title="Task Reminder"
              description="Review Q3 report due tomorrow"
              icon={<Avatar size="sm" color={COLORS[4]} text="T" />}
            />
          </SwipeCell>
        </div>
      </div>

      {/* Multiple actions */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.swipeCellMulti')}</div>
        <div style={CARD.desc}>{t('demo.swipeCellMultiDesc')}</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell rightActions={multiActions}>
            <Cell
              title="User 4"
              description="Product Manager"
              icon={<Avatar size="sm" color={COLORS[0]} text="U" />}
            />
          </SwipeCell>
          <SwipeCell rightActions={multiActions}>
            <Cell
              title="User 5"
              description="QA Engineer"
              icon={<Avatar size="sm" color={COLORS[1]} text="U" />}
            />
          </SwipeCell>
        </div>
      </div>

      {/* Disabled */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.swipeCellDisabled')}</div>
        <div style={CARD.desc}>{t('demo.swipeCellDisabledDesc')}</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell rightActions={rightActions} disabled>
            <Cell
              title="Disabled Item"
              description="Swipe is disabled for this cell"
              icon={<Avatar size="sm" color="#9ca3af" text="D" />}
            />
          </SwipeCell>
        </div>
      </div>
    </MobilePreview>
  );
};
