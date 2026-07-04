import { type Component } from 'solid-js';
import { Swiper } from '../../../../src/components/Swiper';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';

const propsData: PropRow[] = [
  { name: 'autoplay', type: 'number | string', default: '—', required: false, desc: 'componentProps.swiper.autoplay' },
  { name: 'duration', type: 'number | string', default: '500', required: false, desc: 'componentProps.swiper.duration' },
  { name: 'initialSwipe', type: 'number | string', default: '0', required: false, desc: 'componentProps.swiper.initialSwipe' },
  { name: 'width / height', type: 'number | string', default: "100% / '160px'", required: false, desc: 'componentProps.swiper.width / height' },
  { name: 'loop', type: 'boolean', default: 'true', required: false, desc: 'componentProps.swiper.loop' },
  { name: 'showIndicators', type: 'boolean', default: 'true', required: false, desc: 'componentProps.swiper.showIndicators' },
  { name: 'vertical', type: 'boolean', default: 'false', required: false, desc: 'componentProps.swiper.vertical' },
  { name: 'touchable', type: 'boolean', default: 'true', required: false, desc: 'componentProps.swiper.touchable' },
  { name: 'indicatorColor', type: 'string', default: "'#1989fa'", required: false, desc: 'componentProps.swiper.indicatorColor' },
  { name: 'indicators', type: '(current, total) => JSX', default: '—', required: false, desc: 'componentProps.swiper.indicators' },
  { name: 'imgUrls', type: 'string[]', default: '—', required: false, desc: 'componentProps.swiper.imgUrls' },
  { name: 'lazyRender', type: 'boolean', default: 'false', required: false, desc: 'componentProps.swiper.lazyRender' },
  { name: 'onChange', type: '(index: number) => void', default: '—', required: false, desc: 'componentProps.swiper.onChange' },
];

const IMGS = [
  'https://picsum.photos/seed/sw1/400/200',
  'https://picsum.photos/seed/sw2/400/200',
  'https://picsum.photos/seed/sw3/400/200',
];

export const SwiperDocPage: Component = () => {
  const t = useT();
  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Swiper 轮播</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t('componentIntro.SwiperIntro')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        <DemoBlock title={t('demo.customRender')} desc={t('demo.customRenderDesc')} code={`<Swiper height={180} loop autoplay={2500}>\n  <div style="...">Slide 1</div>\n  <div style="...">Slide 2</div>\n  <div style="...">Slide 3</div>\n</Swiper>`}>
          <Swiper height={180} loop autoplay={2500}>
            <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>🚀 SolidJS — Declarative & Efficient</div>
            <div style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>⚡ Fine-grained Reactivity</div>
            <div style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>🎯 No Virtual DOM</div>
          </Swiper>
        </DemoBlock>

        <DemoBlock title={t('demo.imageCarousel')} desc={t('demoDesc.swiper_autoplay')} code={`<Swiper imgUrls={[...]} height={200} autoplay={3000} />`}>
          <Swiper imgUrls={IMGS} height={200} autoplay={3000} />
        </DemoBlock>

        <DemoBlock title={t('demo.indicator')} desc={t('demo.indicatorDesc')} code={`<Swiper\n  imgUrls={imgs}\n  indicators={(cur, tot) => (\n    <div style="display:flex;gap:4px">\n      {Array.from({length:tot}, (_,i) => (\n        <span style={{...i===cur?active:inactive}} />\n      ))}\n    </div>\n  )}\n/>`}>
          <Swiper
            imgUrls={IMGS}
            height={200}
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
        </DemoBlock>

        <DemoBlock title={t('demo.verticalScroll')} desc={t('demoDesc.swiper_vertical')} code={`<Swiper imgUrls={imgs} height={260} vertical />`}>
          <Swiper imgUrls={IMGS} height={260} vertical />
        </DemoBlock>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.cssVars')}</h2>
        <PropsTable rows={[
          { name: '--sc-swiper-dot-size', type: 'length', default: '6px', required: false, desc: 'cssVars.Swiper.__sc_swiper_dot_size' },
          { name: '--sc-swiper-dot-active-width', type: 'length', default: '18px', required: false, desc: 'cssVars.Swiper.__sc_swiper_dot_active_width' },
          { name: '--sc-swiper-dot-color', type: 'color', default: 'rgba(255,255,255,0.5)', required: false, desc: 'cssVars.Swiper.__sc_swiper_dot_color' },
          { name: '--sc-swiper-dot-active-color', type: 'color', default: '#1989fa', required: false, desc: 'cssVars.Swiper.__sc_swiper_dot_active_color' },
          { name: '--sc-swiper-dot-gap', type: 'length', default: '6px', required: false, desc: 'cssVars.Swiper.__sc_swiper_dot_gap' },
          { name: '--sc-swiper-dot-bottom', type: 'length', default: '10px', required: false, desc: 'cssVars.Swiper.__sc_swiper_dot_bottom' },
          { name: '--sc-swiper-radius', type: 'length', default: '0px', required: false, desc: 'cssVars.Swiper.__sc_swiper_radius' },
        ]} />
      </div>
    </DocLayout>
  );
};
