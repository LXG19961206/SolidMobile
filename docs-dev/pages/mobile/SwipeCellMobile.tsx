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
  { name: 'rightActions', type: 'SwipeAction[]', desc: '右侧滑出按钮' },
  { name: 'leftActions', type: 'SwipeAction[]', desc: '左侧滑出按钮' },
  { name: 'threshold', type: 'number', desc: '触发滑动的阈值(px)，默认 30' },
  { name: 'disabled', type: 'boolean', desc: '禁用滑动' },
  { name: 'onOpen', type: '() => void', desc: '打开时回调' },
  { name: 'onClose', type: '() => void', desc: '关闭时回调' },
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
    { text: '编辑', theme: 'primary', onClick: () => Toast.success('编辑') },
    { text: '删除', theme: 'danger', onClick: () => Toast.success('删除') },
  ];

  const leftActions: SwipeAction[] = [
    { text: '标为已读', theme: 'success', onClick: () => Toast.success('已读') },
  ];

  const multiActions: SwipeAction[] = [
    { text: '收藏', theme: 'warning', onClick: () => Toast.success('收藏') },
    { text: '编辑', theme: 'primary', onClick: () => Toast.success('编辑') },
    { text: '删除', theme: 'danger', onClick: () => Toast.success('删除') },
  ];

  return (
    <MobilePreview title="SwipeCell 滑动单元格" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础右滑 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>右滑操作</div>
        <div style={CARD.desc}>向左滑动露出右侧操作按钮（编辑 / 删除）</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell rightActions={rightActions}>
            <Cell
              title="张三"
              description="产品经理"
              icon={<Avatar size="sm" color={COLORS[0]} text="张" />}
            />
          </SwipeCell>
          <SwipeCell rightActions={rightActions}>
            <Cell
              title="李四"
              description="前端工程师"
              icon={<Avatar size="sm" color={COLORS[1]} text="李" />}
            />
          </SwipeCell>
          <SwipeCell rightActions={rightActions}>
            <Cell
              title="王五"
              description="设计师"
              icon={<Avatar size="sm" color={COLORS[2]} text="王" />}
            />
          </SwipeCell>
        </div>
      </div>

      {/* 左侧操作 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>左侧操作</div>
        <div style={CARD.desc}>向右滑动露出左侧操作按钮</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell leftActions={leftActions}>
            <Cell
              title="系统通知"
              description="版本 v2.0 已发布"
              icon={<Avatar size="sm" color={COLORS[3]} text="系" />}
            />
          </SwipeCell>
          <SwipeCell leftActions={leftActions}>
            <Cell
              title="活动提醒"
              description="今晚 8 点线上会议"
              icon={<Avatar size="sm" color={COLORS[4]} text="活" />}
            />
          </SwipeCell>
        </div>
      </div>

      {/* 多个操作 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>多个操作按钮</div>
        <div style={CARD.desc}>支持不同 theme 的操作按钮组合（收藏 / 编辑 / 删除）</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell rightActions={multiActions}>
            <Cell
              title="赵六"
              description="后端工程师"
              icon={<Avatar size="sm" color={COLORS[0]} text="赵" />}
            />
          </SwipeCell>
          <SwipeCell rightActions={multiActions}>
            <Cell
              title="孙七"
              description="测试工程师"
              icon={<Avatar size="sm" color={COLORS[1]} text="孙" />}
            />
          </SwipeCell>
        </div>
      </div>

      {/* 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用滑动</div>
        <div style={CARD.desc}>disabled=true 时无法滑动操作</div>
        <div style={{ ...CARD.body, 'padding-left': 0, 'padding-right': 0 }}>
          <SwipeCell rightActions={rightActions} disabled>
            <Cell
              title="禁用的单元格"
              description="无法滑动操作"
              icon={<Avatar size="sm" color="#9ca3af" text="禁" />}
            />
          </SwipeCell>
        </div>
      </div>
    </MobilePreview>
  );
};
