import { type Component } from 'solid-js';


import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface SwiperMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Swiper } from '../../../src/components/Swiper';

const propsData = [
  { name: 'autoplay', type: 'number | string', desc: 'componentProps.swiper.autoplay' },
  { name: 'duration', type: 'number | string', desc: 'componentProps.swiper.duration' },
  { name: 'initialSwipe', type: 'number | string', desc: 'componentProps.swiper.initialSwipe' },
  { name: 'width / height', type: 'number | string', desc: 'componentProps.swiper.width / height' },
  { name: 'loop', type: 'boolean', desc: 'componentProps.swiper.loop' },
  { name: 'showIndicators', type: 'boolean', desc: 'componentProps.swiper.showIndicators' },
  { name: 'vertical', type: 'boolean', desc: 'componentProps.swiper.vertical' },
  { name: 'touchable', type: 'boolean', desc: 'componentProps.swiper.touchable' },
  { name: 'indicatorColor', type: 'string', desc: 'componentProps.swiper.indicatorColor' },
  { name: 'indicators', type: '(current, total) => JSX', desc: 'componentProps.swiper.indicators' },
  { name: 'imgUrls', type: 'string[]', desc: 'componentProps.swiper.imgUrls' },
  { name: 'lazyRender', type: 'boolean', desc: 'componentProps.swiper.lazyRender' },
  { name: 'onChange', type: '(index) => void', desc: 'componentProps.swiper.onChange' },
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
    <MobilePreview title="Swiper" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Custom Content */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.swiperCustomContent')}</div>
        <div style={CARD.desc}>{t('demo.swiperCustomContentDesc')}</div>
        <div style={CARD.body}>
          <Swiper height={140} loop autoplay={2500}>
            <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>Slide 1</div>
            <div style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>Slide 2</div>
            <div style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>Slide 3</div>
            <div style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>Slide 4</div>
          </Swiper>
        </div>
      </div>

      {/* Auto Play */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.imageCarousel')}</div>
        <div style={CARD.desc}>{t('demo.imageCarouselDesc')}</div>
        <div style={CARD.body}>
          <Swiper imgUrls={IMGS} height={160} autoplay={3000} />
        </div>
      </div>

      {/* Custom Indicator */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.indicator')}</div>
        <div style={CARD.desc}>{t('demo.indicatorDesc')}</div>
        <div style={CARD.body}>
          <Swiper
            imgUrls={IMGS}
            height={160}
            indicators={(cur, tot) => (
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: tot }, (_, i) => (
                  <span style={{
                    width: i === cur ? '16px' : '6px', height: '6px',
                    'border-radius': '3px', background: i === cur ? 'var(--sc-color-primary, #1677ff)' : 'rgba(0,0,0,0.15)',
                    transition: 'all 0.3s',
                  }} />
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* Vertical */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.verticalScroll')}</div>
        <div style={CARD.desc}>{t('demo.verticalScrollDesc')}</div>
        <div style={CARD.body}>
          <Swiper imgUrls={IMGS} height={240} vertical />
        </div>
      </div>
    </MobilePreview>
  );
};
