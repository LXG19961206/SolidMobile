import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { SwipeCell } from '../../../src/components/SwipeCell';
import { Avatar } from '../../../src/components/Avatar';
import { Toast } from '../../../src/components/Toast';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import type { SwipeAction } from '../../../src/components/SwipeCell/types';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSwipeCellTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const COLORS = ['#1677ff', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];

const itemStyle = {
  display: 'flex' as const, 'align-items': 'center' as const, gap: '12px', padding: '14px 16px',
  background: 'var(--sc-swipecell-bg, #f8f9fb)',
};

const itemName = { 'font-weight': 500, 'font-size': '0.85rem', color: 'var(--sc-color-text, #374151)' };
const itemDesc = { 'font-size': '0.72rem', color: 'var(--sc-color-text-secondary, #9ca3af)', 'margin-top': '2px' };

export const SwipeCellMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSwipeCellTableData();

  const rightActions: SwipeAction[] = [
    { text: 'Edit', theme: 'primary', onClick: () => Toast.success('Edit') },
    { text: 'Delete', theme: 'danger', onClick: () => Toast.success('Delete') },
  ];

  const leftActions: SwipeAction[] = [
    { text: 'Mark Read', theme: 'success', onClick: () => Toast.success('Marked as read') },
  ];

  const bothLeft: SwipeAction[] = [
    { text: 'Pin', theme: 'success', onClick: () => Toast.success('Pinned') },
  ];

  const bothRight: SwipeAction[] = [
    { text: 'Edit', theme: 'primary', onClick: () => Toast.success('Edit') },
    { text: 'Delete', theme: 'danger', onClick: () => Toast.success('Delete') },
  ];

  const Item = (props: { name: string; desc: string; color: string; letter: string }) => (
    <div style={itemStyle}>
      <Avatar size="sm" color={props.color} text={props.letter} />
      <div>
        <div style={itemName}>{props.name}</div>
        <div style={itemDesc}>{props.desc}</div>
      </div>
    </div>
  );

  return (
    <MobilePreview title="SwipeCell">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Right swipe */}
        <Card title={t('swipecell.demo.right')}>
          <SwipeCell rightActions={rightActions}>
            <Item name="User 1" desc="Frontend Developer" color={COLORS[0]} letter="U" />
          </SwipeCell>
          <SwipeCell rightActions={rightActions}>
            <Item name="User 2" desc="Backend Developer" color={COLORS[1]} letter="U" />
          </SwipeCell>
          <SwipeCell rightActions={rightActions}>
            <Item name="User 3" desc="UI Designer" color={COLORS[2]} letter="U" />
          </SwipeCell>
        </Card>

        {/* Left swipe */}
        <Card title={t('swipecell.demo.left')}>
          <SwipeCell leftActions={leftActions}>
            <Item name="System Notice" desc="Server maintenance at 2 AM" color={COLORS[3]} letter="S" />
          </SwipeCell>
          <SwipeCell leftActions={leftActions}>
            <Item name="Task Reminder" desc="Review Q3 report" color={COLORS[4]} letter="T" />
          </SwipeCell>
        </Card>

        {/* Both sides */}
        <Card title={t('swipecell.demo.both')}>
          <SwipeCell leftActions={bothLeft} rightActions={bothRight}>
            <Item name="User 4" desc="Product Manager" color={COLORS[0]} letter="U" />
          </SwipeCell>
          <SwipeCell leftActions={bothLeft} rightActions={bothRight}>
            <Item name="User 5" desc="QA Engineer" color={COLORS[1]} letter="U" />
          </SwipeCell>
        </Card>

        {/* Disabled */}
        <Card title={t('swipecell.demo.disabled')}>
          <SwipeCell rightActions={rightActions} disabled>
            <Item name="Disabled Item" desc="Swipe is disabled" color="#9ca3af" letter="D" />
          </SwipeCell>
        </Card>
      </div>
    </MobilePreview>
  );
};
