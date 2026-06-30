import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface RateMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Rate } from '../../../src/components/Rate';

const propsData = [
  { name: 'value', type: 'number', desc: '当前分值' },
  { name: 'onChange', type: '(value: number) => void', desc: '分值变化回调' },
  { name: 'count', type: 'number | string', desc: '图标总数，默认 5' },
  { name: 'size', type: 'number | string', desc: '图标大小，默认 px' },
  { name: 'gutter', type: 'number | string', desc: '图标间距' },
  { name: 'color', type: 'string', desc: '选中时颜色' },
  { name: 'voidColor', type: 'string', desc: '未选中时颜色' },
  { name: 'allowHalf', type: 'boolean', desc: '允许半选' },
  { name: 'clearable', type: 'boolean', desc: '再次点击清除' },
  { name: 'readonly', type: 'boolean', desc: '只读' },
  { name: 'disabled', type: 'boolean', desc: '禁用' },
  { name: 'icon', type: 'string', desc: '选中图标名' },
  { name: 'voidIcon', type: 'string', desc: '未选中图标名' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-direction': 'column' as const, gap: '12px', 'align-items': 'center' as const },
};

export const RateMobile: Component<RateMobileProps> = (props) => {
  const [val, setVal] = createSignal(3);
  const [halfVal, setHalfVal] = createSignal(3.5);

  return (
    <MobilePreview title="Rate 评分" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础评分</div>
        <div style={CARD.desc}>默认 5 颗星，点击评价</div>
        <div style={CARD.body}>
          <Rate value={val()} onChange={setVal} />
          <span style={{ 'font-size': '0.85rem', color: '#6b7280' }}>当前: {val()} 分</span>
        </div>
      </div>

      {/* 半选 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>半选 allowHalf</div>
        <div style={CARD.desc}>允许选中半颗星</div>
        <div style={CARD.body}>
          <Rate value={halfVal()} onChange={setHalfVal} allowHalf />
          <span style={{ 'font-size': '0.85rem', color: '#6b7280' }}>当前: {halfVal()} 分</span>
        </div>
      </div>

      {/* 只读 & 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>只读 & 禁用</div>
        <div style={CARD.desc}>readonly / disabled 不可交互</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Rate value={4} readonly />
            <span style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>只读 (4分)</span>
          </div>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Rate value={2} disabled />
            <span style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>禁用 (2分)</span>
          </div>
        </div>
      </div>

      {/* 自定义 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义图标 & 数量</div>
        <div style={CARD.desc}>icon / voidIcon / count / size / color</div>
        <div style={CARD.body}>
          <Rate value={4} count={3} size={32} color="#ef4444" icon="heart" voidIcon="heart" readonly />
          <Rate value={3} count={10} size={16} color="#f59e0b" readonly />
        </div>
      </div>
    </MobilePreview>
  );
};
