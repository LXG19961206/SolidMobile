import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface TagMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Tag } from '../../../src/components/Tag';

const propsData = [
  { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", desc: '语义色，默认 primary' },
  { name: 'variant', type: "'solid' | 'outline'", desc: '填充方式，默认 solid' },
  { name: 'size', type: "'sm' | 'md'", desc: '尺寸，默认 md' },
  { name: 'round', type: 'boolean', desc: '胶囊圆角' },
  { name: 'closeable', type: 'boolean', desc: '可关闭，显示 X 按钮' },
  { name: 'onClose', type: '() => void', desc: '关闭回调' },
  { name: 'color', type: 'string', desc: '自定义背景色' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px', 'align-items': 'center' as const },
};

export const TagMobile: Component<TagMobileProps> = (props) => {
  const [visible, setVisible] = createSignal(true);

  return (
    <MobilePreview title="Tag 标签" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 语义色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>语义色 type</div>
        <div style={CARD.desc}>五种语义色 solid 填充</div>
        <div style={CARD.body}>
          <Tag type="primary">主色</Tag>
          <Tag type="success">成功</Tag>
          <Tag type="warning">警告</Tag>
          <Tag type="danger">危险</Tag>
          <Tag type="info">信息</Tag>
        </div>
      </div>

      {/* 填充方式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>填充方式 variant</div>
        <div style={CARD.desc}>solid（实心）/ outline（线框）</div>
        <div style={CARD.body}>
          <Tag type="primary" variant="solid">Solid</Tag>
          <Tag type="primary" variant="outline">Outline</Tag>
          <Tag type="success" variant="solid">Solid</Tag>
          <Tag type="success" variant="outline">Outline</Tag>
          <Tag type="danger" variant="solid">Solid</Tag>
          <Tag type="danger" variant="outline">Outline</Tag>
        </div>
      </div>

      {/* 尺寸 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>尺寸 & 圆角</div>
        <div style={CARD.desc}>sm/md 和 round 胶囊</div>
        <div style={CARD.body}>
          <Tag size="sm" type="primary">小标签 SM</Tag>
          <Tag size="md" type="primary">中标签 MD</Tag>
          <Tag round type="primary">胶囊</Tag>
          <Tag round type="success">胶囊</Tag>
          <Tag size="sm" round type="danger">小胶囊</Tag>
        </div>
      </div>

      {/* 可关闭 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>可关闭 closeable</div>
        <div style={CARD.desc}>closeable 开启关闭按钮，onClose 处理关闭</div>
        <div style={CARD.body}>
          {visible() && <Tag closeable onClose={() => setVisible(false)}>可关闭</Tag>}
          <Tag closeable type="primary" onClose={() => {}}>标签一</Tag>
          <Tag closeable type="success" onClose={() => {}}>标签二</Tag>
        </div>
      </div>

      {/* 自定义颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义颜色</div>
        <div style={CARD.desc}>color 覆盖默认配色</div>
        <div style={CARD.body}>
          <Tag color="#6366f1">Indigo</Tag>
          <Tag color="#ec4899">Pink</Tag>
          <Tag color="#f59e0b">Amber</Tag>
          <Tag color="#10b981">Emerald</Tag>
        </div>
      </div>
    </MobilePreview>
  );
};
