import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface ImageMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Image } from '../../../src/components/Image';

const propsData = [
  { name: 'src', type: 'string', desc: '图片地址（必填）' },
  { name: 'width', type: 'string | number', desc: '宽度' },
  { name: 'height', type: 'string | number', desc: '高度' },
  { name: 'fit', type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'", desc: '填充方式，默认 fill' },
  { name: 'radius', type: 'string | number', desc: '圆角大小' },
  { name: 'round', type: 'boolean', desc: '完全圆形' },
  { name: 'block', type: 'boolean', desc: '块级元素，占满宽度' },
  { name: 'lazy', type: 'boolean', desc: '启用懒加载' },
  { name: 'placeholder', type: 'JSX.Element', desc: '加载中占位' },
  { name: 'fallback', type: 'JSX.Element', desc: '加载失败兜底' },
  { name: 'preview', type: 'boolean', desc: '点击预览大图' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const },
};

/* ── Framework logos (GitHub org avatars, stable URLs) ── */

/* ── Framework logos (GitHub org avatars) ── */

const VUE_SRC = 'https://avatars.githubusercontent.com/u/6128107?s=200&v=4';
const REACT_SRC = 'https://avatars.githubusercontent.com/u/6412038?s=200&v=4';
const SOLID_SRC = 'https://avatars.githubusercontent.com/u/79226042?s=200&v=4';
const SVELTE_SRC = 'https://avatars.githubusercontent.com/u/23617963?s=200&v=4';

const LOGOS = [
  { src: SOLID_SRC, name: 'Solid', color: '#3b82f6' },
  { src: VUE_SRC, name: 'Vue', color: '#41b883' },
  { src: REACT_SRC, name: 'React', color: '#61dafb' },
  { src: SVELTE_SRC, name: 'Svelte', color: '#ff3e00' },
];

export const ImageMobile: Component<ImageMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Image 图片" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Logo 展示 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>Logo 展示</div>
        <div style={CARD.desc}>solid-mobile 官方 logo · 彩色渐变环 + 代码括号</div>
        <div style={{ ...CARD.body, 'align-items': 'center' as const, 'justify-content': 'center' as const }}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
            <span style={{ 'font-size': '1.4rem', color: '#1677ff', 'font-family': 'monospace', 'font-weight': 200, opacity: 0.3 }}>{'{'}</span>
            <div style={{ position: 'relative' as const }}>
              <div style={{
                width: '86px', height: '86px', 'border-radius': '50%',
                background: 'conic-gradient(from 0deg, #1677ff, #22c55e, #f59e0b, #ef4444, #8b5cf6, #1677ff)',
                opacity: 0.15, position: 'absolute' as const, top: '-5px', left: '-5px',
              }} />
              <Image src="./logo.jpg" width={72} height={72} fit="cover" round />
            </div>
            <span style={{ 'font-size': '1.4rem', color: '#1677ff', 'font-family': 'monospace', 'font-weight': 200, opacity: 0.3 }}>{'}'}</span>
          </div>
        </div>
      </div>

      {/* 基础填充方式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>填充方式 fit</div>
        <div style={CARD.desc}>cover / contain / fill 三种常用模式对比</div>
        <div style={CARD.body}>
          {LOGOS.map((logo) => (
            <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
              <Image src={logo.src} width={56} height={56} fit="cover" radius={12} />
              <span style={{ 'font-size': '0.65rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>cover</span>
            </div>
          ))}
        </div>
      </div>

      {/* 圆角 & 圆形 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>圆角 & 圆形</div>
        <div style={CARD.desc}>radius 控制圆角大小 / round 完全圆形</div>
        <div style={CARD.body}>
          <Image src={REACT_SRC} width={60} height={60} radius={4} />
          <Image src={REACT_SRC} width={60} height={60} radius={12} />
          <Image src={REACT_SRC} width={60} height={60} round />
          <Image src={REACT_SRC} width={60} height={60} radius={20} />
        </div>
      </div>

      {/* 块级 & 宽高比 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>块级 & 宽高比</div>
        <div style={CARD.desc}>自定义宽高比例 + block 通栏模式</div>
        <div style={{ ...CARD.body, 'flex-direction': 'column' as const, 'align-items': 'center' as const }}>
          <Image src={REACT_SRC} width={100} height={60} fit="cover" radius={8} />
          <span style={{ 'font-size': '0.6rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>100×60 自定义宽高</span>
          <Image src={VUE_SRC} width="100%" fit="cover" radius={8} block />
          <span style={{ 'font-size': '0.6rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>block 独占一行</span>
        </div>
      </div>

      {/* 点击预览 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>点击预览 preview</div>
        <div style={CARD.desc}>preview 属性开启点击预览大图，点击下方图片试试</div>
        <div style={CARD.body}>
          <Image src={SOLID_SRC} width={80} height={80} fit="cover" round preview />
          <Image src={VUE_SRC} width={80} height={80} fit="cover" round preview />
          <Image src={SVELTE_SRC} width={80} height={80} fit="cover" round preview />
        </div>
      </div>

      {/* 加载失败兜底 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>加载失败兜底 fallback</div>
        <div style={CARD.desc}>src 无效时显示 fallback 占位内容</div>
        <div style={CARD.body}>
          <Image
            src="invalid-url"
            width={80} height={80}
            fallback={
              <div style={{
                width: '80px', height: '80px', background: 'var(--sc-doc-card-placeholder, #f3f4f6)',
                display: 'flex' as const, 'align-items': 'center' as const,
                'justify-content': 'center' as const, 'border-radius': '8px',
                color: 'var(--sc-doc-card-muted, #9ca3af)', 'font-size': '0.75rem',
              }}>
                加载失败
              </div>
            }
          />
          <Image
            src="invalid-url"
            width={80} height={80} round
            fallback={
              <div style={{
                width: '80px', height: '80px', background: '#1677ff',
                display: 'flex' as const, 'align-items': 'center' as const,
                'justify-content': 'center' as const, 'border-radius': '50%',
                color: '#fff', 'font-size': '1.5rem', 'font-weight': 700,
              }}>
                ?
              </div>
            }
          />
        </div>
      </div>
    </MobilePreview>
  );
};
