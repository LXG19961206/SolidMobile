import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface SwipeCellMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { SwipeCell } from '../../../src/components/SwipeCell';
import type { SwipeAction } from '../../../src/components/SwipeCell/types';

const propsData = [
  { name: 'rightActions', type: 'SwipeAction[]', desc: '右侧滑出按钮' },
  { name: 'leftActions', type: 'SwipeAction[]', desc: '左侧滑出按钮' },
  { name: 'threshold', type: 'number', desc: '触发滑动的阈值(px)，默认 30' },
  { name: 'actionsWidth', type: 'number', desc: '按钮区域宽度，默认自适应' },
  { name: 'disabled', type: 'boolean', desc: '禁用滑动' },
  { name: 'onOpen', type: '() => void', desc: '打开时回调' },
  { name: 'onClose', type: '() => void', desc: '关闭时回调' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const SwipeCellMobile: Component<SwipeCellMobileProps> = (props) => {
  const rightActions: SwipeAction[] = [
    { text: '编辑', theme: 'primary', onClick: () => {} },
    { text: '删除', theme: 'danger', onClick: () => {} },
  ];

  const rightActionsExt: SwipeAction[] = [
    { text: '收藏', theme: 'warning', onClick: () => {} },
    { text: '编辑', theme: 'primary', onClick: () => {} },
    { text: '删除', theme: 'danger', onClick: () => {} },
  ];

  const leftActions: SwipeAction[] = [
    { text: '标为已读', theme: 'success', onClick: () => {} },
  ];

  return (
    <MobilePreview title="SwipeCell 滑动单元格" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>右滑操作</div>
        <div style={CARD.desc}>向左滑动露出右侧操作按钮</div>
        <div style={CARD.body}>
          <div style={{ overflow: 'hidden', 'border-radius': '8px' }}>
            <SwipeCell rightActions={rightActions}>
              <div style={{ padding: '16px', background: '#fff', 'border-bottom': '1px solid #f3f4f6' }}>
                <div style={{ 'font-size': '0.9rem' }}>左滑试试 →</div>
                <div style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>向右滑动显示操作按钮</div>
              </div>
            </SwipeCell>
            <SwipeCell rightActions={rightActions}>
              <div style={{ padding: '16px', background: '#fff', 'border-bottom': '1px solid #f3f4f6' }}>
                <div style={{ 'font-size': '0.9rem' }}>消息通知</div>
                <div style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>您有一条新消息</div>
              </div>
            </SwipeCell>
            <SwipeCell rightActions={rightActions}>
              <div style={{ padding: '16px', background: '#fff' }}>
                <div style={{ 'font-size': '0.9rem' }}>系统通知</div>
                <div style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>版本已更新至 v2.0</div>
              </div>
            </SwipeCell>
          </div>
        </div>
      </div>

      {/* 多种操作 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>多个操作按钮</div>
        <div style={CARD.desc}>支持不同 theme 的操作按钮组合</div>
        <div style={CARD.body}>
          <div style={{ overflow: 'hidden', 'border-radius': '8px' }}>
            <SwipeCell rightActions={rightActionsExt}>
              <div style={{ padding: '16px', background: '#fff' }}>
                <div style={{ 'font-size': '0.9rem' }}>三个操作按钮</div>
                <div style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>收藏 / 编辑 / 删除</div>
              </div>
            </SwipeCell>
          </div>
        </div>
      </div>

      {/* 左侧操作 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>左侧操作</div>
        <div style={CARD.desc}>向右滑动露出左侧操作按钮</div>
        <div style={CARD.body}>
          <div style={{ overflow: 'hidden', 'border-radius': '8px' }}>
            <SwipeCell leftActions={leftActions}>
              <div style={{ padding: '16px', background: '#fff' }}>
                <div style={{ 'font-size': '0.9rem' }}>← 右滑试试</div>
                <div style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>向左滑动显示左侧操作</div>
              </div>
            </SwipeCell>
          </div>
        </div>
      </div>

      {/* 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用滑动</div>
        <div style={CARD.desc}>disabled=true 时无法滑动</div>
        <div style={CARD.body}>
          <div style={{ overflow: 'hidden', 'border-radius': '8px' }}>
            <SwipeCell rightActions={rightActions} disabled>
              <div style={{ padding: '16px', background: '#fff' }}>
                <div style={{ 'font-size': '0.9rem', color: '#9ca3af' }}>禁用的单元格</div>
                <div style={{ 'font-size': '0.75rem', color: '#d1d5db' }}>无法滑动操作</div>
              </div>
            </SwipeCell>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
