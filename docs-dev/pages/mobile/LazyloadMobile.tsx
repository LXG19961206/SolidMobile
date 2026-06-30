import { createSignal, For, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface LazyloadMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Lazyload } from '../../../src/components/Lazyload';
import { Image } from '../../../src/components/Image';
import { Loading } from '../../../src/components/Loading';

const propsData = [
  { name: 'active', type: 'boolean', desc: '是否已激活（受控，不传则自动检测）' },
  { name: 'placeholder', type: 'JSX.Element', desc: '未激活时的占位内容' },
  { name: 'children', type: 'JSX.Element', desc: '激活后的实际内容' },
  { name: 'rootMargin', type: 'string', desc: 'Observer rootMargin，默认 50px' },
  { name: 'threshold', type: 'number | number[]', desc: '可见比例阈值，默认 0' },
  { name: 'once', type: 'boolean', desc: '只触发一次，默认 true' },
  { name: 'height', type: 'number | string', desc: '最小高度，防止布局抖动' },
  { name: 'as', type: 'string', desc: '渲染标签，默认 div' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const IMAGES = [
  'https://picsum.photos/id/10/400/300',
  'https://picsum.photos/id/20/400/300',
  'https://picsum.photos/id/30/400/300',
  'https://picsum.photos/id/40/400/300',
];

export const LazyloadMobile: Component<LazyloadMobileProps> = (props) => {
  return (
    <MobilePreview title="Lazyload 懒加载" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 说明 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>懒加载机制</div>
        <div style={CARD.desc}>
          基于 IntersectionObserver，元素进入视口时渲染实际内容。
          rootMargin 默认 50px 提前触发。滚动下方查看效果。
        </div>
      </div>

      {/* 图片懒加载 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>图片懒加载</div>
        <div style={CARD.desc}>滚动触发加载，占位期间显示 Loading</div>
        <div style={{ ...CARD.body, display: 'flex' as const, 'flex-direction': 'column' as const, gap: '12px' }}>
          <For each={IMAGES}>
            {(src, i) => (
              <Lazyload
                height={200}
                placeholder={
                  <div style={{ width: '100%', height: '200px', background: '#f3f4f6', 'border-radius': '8px', display: 'flex' as const, 'align-items': 'center' as const, 'justify-content': 'center' }}>
                    <Loading text={`加载中 ${i() + 1}`} />
                  </div>
                }
              >
                <Image src={src} width="100%" height={200} fit="cover" radius={8} />
              </Lazyload>
            )}
          </For>
        </div>
      </div>

      {/* 受控模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>受控模式</div>
        <div style={CARD.desc}>active 属性手动控制加载状态</div>
        <div style={CARD.body}>
          <Lazyload
            active
            placeholder={<div style={{ padding: '40px', 'text-align': 'center', background: '#f3f4f6', 'border-radius': '8px' }}>占位内容</div>}
          >
            <div style={{ padding: '40px', 'text-align': 'center', background: '#e8f5e9', 'border-radius': '8px', color: '#22c55e' }}>
              已激活的真实内容 ✓
            </div>
          </Lazyload>
        </div>
      </div>
    </MobilePreview>
  );
};
