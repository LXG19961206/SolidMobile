import { useT, registerLocale } from '../../doc-i18n';
import { Swiper } from '../../../src/components/Swiper';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSwiperTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const IMGS = ['./swiper-1.jpg', './swiper-2.jpg', './swiper-3.jpg'];

export const SwiperMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSwiperTableData();

  const section = (title: string) => (
    <div style={{ 'font-size': '0.8rem', 'font-weight': 600, padding: '0 12px 6px', color: 'var(--sc-color-text-secondary, #6b7280)' }}>{title}</div>
  );

  return (
    <MobilePreview title="Swiper">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div>
        {/* Custom Content */}
        <div style={{ 'margin-top': '12px', 'margin-bottom': '16px' }}>
          {section(t('swiper.demo.custom'))}
          <Swiper height={140} loop autoplay={2500}>
            <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>Slide 1</div>
            <div style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>Slide 2</div>
            <div style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)', width: '100%', height: '100%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: '#fff', 'font-size': '1.2rem', 'font-weight': 600 }}>Slide 3</div>
          </Swiper>
        </div>

        {/* Auto Play */}
        <div style={{ 'margin-bottom': '16px' }}>
          {section(t('swiper.demo.autoplay'))}
          <Swiper imgUrls={IMGS} height={160} autoplay={3000} />
        </div>

        {/* Custom Indicator */}
        <div style={{ 'margin-bottom': '16px' }}>
          {section(t('swiper.demo.indicator'))}
          <Swiper
            imgUrls={IMGS}
            height={160}
            indicators={(cur, tot) => (
              <span style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', 'border-radius': '12px', padding: '2px 10px', 'font-size': '0.75rem', 'font-family': 'monospace' }}>
                {cur + 1} / {tot}
              </span>
            )}
          />
        </div>

        {/* Vertical */}
        <div style={{ 'margin-bottom': '16px' }}>
          {section(t('swiper.demo.vertical'))}
          <Swiper imgUrls={IMGS} height={240} vertical />
        </div>
      </div>
    </MobilePreview>
  );
};
