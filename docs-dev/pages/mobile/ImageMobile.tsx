import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface ImageMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Image } from '../../../src/components/Image';

const propsData = [
  { name: 'src', type: 'string', desc: '图片地址（必填）' },
  { name: 'alt', type: 'string', desc: '替代文本' },
  { name: 'width', type: 'string | number', desc: '宽度' },
  { name: 'height', type: 'string | number', desc: '高度' },
  { name: 'fit', type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'", desc: '填充方式，默认 fill' },
  { name: 'radius', type: 'string | number', desc: '圆角大小' },
  { name: 'round', type: 'boolean', desc: '圆形' },
  { name: 'block', type: 'boolean', desc: '块级元素' },
  { name: 'lazy', type: 'boolean', desc: '启用懒加载' },
  { name: 'placeholder', type: 'JSX.Element', desc: '加载中占位' },
  { name: 'fallback', type: 'JSX.Element', desc: '加载失败兜底' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const },
};

const DEMO_SRC = 'https://picsum.photos/200/200';

export const ImageMobile: Component<ImageMobileProps> = (props) => {
  return (
    <MobilePreview title="Image 图片" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础用法</div>
        <div style={CARD.desc}>指定宽高和 fit 填充方式</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, gap: '4px', 'align-items': 'center' as const }}>
            <Image src={DEMO_SRC} width={100} height={100} fit="cover" radius={8} />
            <span style={{ 'font-size': '0.7rem', color: '#9ca3af' }}>cover</span>
          </div>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, gap: '4px', 'align-items': 'center' as const }}>
            <Image src={DEMO_SRC} width={100} height={100} fit="contain" radius={8} />
            <span style={{ 'font-size': '0.7rem', color: '#9ca3af' }}>contain</span>
          </div>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, gap: '4px', 'align-items': 'center' as const }}>
            <Image src={DEMO_SRC} width={100} height={100} fit="fill" radius={8} />
            <span style={{ 'font-size': '0.7rem', color: '#9ca3af' }}>fill</span>
          </div>
        </div>
      </div>

      {/* 圆角 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>圆角 & 圆形</div>
        <div style={CARD.desc}>radius 控制圆角，round 为完全圆形</div>
        <div style={CARD.body}>
          <Image src={DEMO_SRC} width={80} height={80} radius={4} />
          <Image src={DEMO_SRC} width={80} height={80} radius={12} />
          <Image src={DEMO_SRC} width={80} height={80} round />
          <Image src={DEMO_SRC} width={80} height={80} radius={20} />
        </div>
      </div>

      {/* 宽度自适应 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>块级 & 自适应</div>
        <div style={CARD.desc}>block 模式占满宽度</div>
        <div style={{ ...CARD.body, 'flex-direction': 'column' as const }}>
          <Image src="https://picsum.photos/400/200" width="100%" height={160} fit="cover" radius={8} block />
          <Image src="https://picsum.photos/400/200" width="100%" height={160} fit="cover" radius={8} block />
        </div>
      </div>

      {/* 加载失败 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>加载失败兜底</div>
        <div style={CARD.desc}>src 无效时显示 fallback 占位</div>
        <div style={CARD.body}>
          <Image src="invalid-url" width={100} height={100} fallback={<div style={{ background: '#f3f4f6', width: '100%', height: '100%', display: 'flex' as const, 'align-items': 'center' as const, 'justify-content': 'center', 'border-radius': '8px', color: '#9ca3af', 'font-size': '0.8rem' }}>加载失败</div>} />
        </div>
      </div>
    </MobilePreview>
  );
};
