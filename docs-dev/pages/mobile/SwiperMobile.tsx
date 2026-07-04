import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface SwiperMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Swiper } from '../../../src/components/Swiper';

const propsData = [
  { name: 'autoplay', type: 'number | string', desc: '自动轮播间隔 (ms)' },
  { name: 'duration', type: 'number | string', desc: '动画时长 (ms)，默认 500' },
  { name: 'initialSwipe', type: 'number | string', desc: '初始位置索引，默认 0' },
  { name: 'width / height', type: 'number | string', desc: '滑块宽高，默认 auto / 160px' },
  { name: 'loop', type: 'boolean', desc: '循环播放，默认 true' },
  { name: 'showIndicators', type: 'boolean', desc: '显示指示器，默认 true' },
  { name: 'vertical', type: 'boolean', desc: '纵向滚动，默认 false' },
  { name: 'touchable', type: 'boolean', desc: '手势滑动，默认 true' },
  { name: 'indicatorColor', type: 'string', desc: '指示器颜色，默认 #1989fa' },
  { name: 'indicators', type: '(current, total) => JSX', desc: '自定义指示器' },
  { name: 'imgUrls', type: 'string[]', desc: '快捷图片数组，无需写子组件' },
  { name: 'lazyRender', type: 'boolean', desc: '延迟渲染非当前页' },
  { name: 'onChange', type: '(index) => void', desc: '切换回调' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 0 16px' },
};

const IMGS = [
  'https://picsum.photos/seed/sw1/400/200',
  'https://picsum.photos/seed/sw2/400/200',
  'https://picsum.photos/seed/sw3/400/200',
];

export const SwiperMobile: Component<SwiperMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Swiper 轮播" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 自定义内容 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义内容</div>
        <div style={CARD.desc}>children 传入任意 JSX，不限于图片</div>
        <div style={CARD.body}>
          <Swiper height={140} loop autoplay={2500}>
            <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>🚀 SolidJS</div>
            <div style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>⚡ Fine-grained</div>
            <div style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>🎯 No Virtual DOM</div>
            <div style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>📦 Tree Shakable</div>
          </Swiper>
        </div>
      </div>

      {/* 自动播放 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>imgUrls 图片轮播</div>
        <div style={CARD.desc}>autoplay=3000 每 3 秒自动切换，手指触摸时暂停</div>
        <div style={CARD.body}>
          <Swiper imgUrls={IMGS} height={160} autoplay={3000} />
        </div>
      </div>

      {/* 自定义指示器 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义指示器</div>
        <div style={CARD.desc}>indicators 属性传入 (current, total) 渲染函数</div>
        <div style={CARD.body}>
          <Swiper
            imgUrls={IMGS}
            height={160}
            indicators={(cur, tot) => (
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: tot }, (_, i) => (
                  <span style={{
                    width: i === cur ? '16px' : '6px', height: '6px',
                    'border-radius': '3px', background: i === cur ? '#1677ff' : 'rgba(0,0,0,0.15)',
                    transition: 'all 0.3s',
                  }} />
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* 纵向 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>纵向滚动</div>
        <div style={CARD.desc}>vertical，上下滑动切换，适合卡片详情页</div>
        <div style={CARD.body}>
          <Swiper imgUrls={IMGS} height={240} vertical />
        </div>
      </div>
    </MobilePreview>
  );
};
