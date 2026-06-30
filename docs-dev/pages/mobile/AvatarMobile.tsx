import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface AvatarMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Avatar } from '../../../src/components/Avatar';

const propsData = [
  { name: 'src', type: 'string', desc: '头像图片地址' },
  { name: 'alt', type: 'string', desc: '替代文本' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", desc: '尺寸，默认 md' },
  { name: 'round', type: 'boolean', desc: '完全圆形，默认 true' },
  { name: 'square', type: 'boolean | number', desc: '方形+圆角，与 round 互斥' },
  { name: 'icon', type: 'IconName', desc: '无图片时显示的图标' },
  { name: 'text', type: 'string', desc: '无图片时的文字（取首字符）' },
  { name: 'color', type: 'string', desc: '自定义背景色' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const },
};

const AVATAR_URL = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix';

export const AvatarMobile: Component<AvatarMobileProps> = (props) => {
  return (
    <MobilePreview title="Avatar 头像" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 尺寸 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>尺寸 size</div>
        <div style={CARD.desc}>xs / sm / md / lg / xl 五档预设</div>
        <div style={CARD.body}>
          <Avatar src={AVATAR_URL} size="xs" />
          <Avatar src={AVATAR_URL} size="sm" />
          <Avatar src={AVATAR_URL} size="md" />
          <Avatar src={AVATAR_URL} size="lg" />
          <Avatar src={AVATAR_URL} size="xl" />
        </div>
      </div>

      {/* 圆形 & 方形 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>圆形 & 方形</div>
        <div style={CARD.desc}>round 圆形（默认）/ square 方形</div>
        <div style={CARD.body}>
          <Avatar src={AVATAR_URL} size="lg" round />
          <Avatar src={AVATAR_URL} size="lg" square />
          <Avatar src={AVATAR_URL} size="lg" square={8} />
        </div>
      </div>

      {/* 文字 & 图标头像 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>文字 & 图标头像</div>
        <div style={CARD.desc}>无 src 时显示 icon 或 text（取首字符）</div>
        <div style={CARD.body}>
          <Avatar size="lg" text="张三" color="#1677ff" />
          <Avatar size="lg" text="李四" color="#22c55e" />
          <Avatar size="lg" text="Wang" color="#f59e0b" />
          <Avatar size="lg" icon="user" color="#6366f1" />
          <Avatar size="lg" icon="user-3" color="#ec4899" />
        </div>
      </div>

      {/* 自定义颜色 & 尺寸 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义颜色</div>
        <div style={CARD.desc}>color 属性控制背景色，文字自动计算对比度</div>
        <div style={CARD.body}>
          <Avatar size="md" text="A" color="#1677ff" />
          <Avatar size="md" text="B" color="#22c55e" />
          <Avatar size="md" text="C" color="#ef4444" />
          <Avatar size="md" text="D" color="#f59e0b" />
          <Avatar size="md" text="E" color="#6366f1" />
          <Avatar size="md" text="F" color="#ec4899" />
          <Avatar size="md" text="G" color="#10b981" />
        </div>
      </div>
    </MobilePreview>
  );
};
