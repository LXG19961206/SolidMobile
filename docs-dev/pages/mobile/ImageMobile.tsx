import { type Component } from 'solid-js';


import zhCN from '../../i18n/image/zh-CN';
import enUS from '../../i18n/image/en-US';
import { registerLocale } from '../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface ImageMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Image } from '../../../src/components/Image';

const propsData = [
  { name: 'src', type: 'string', desc: 'componentProps.image.src' },
  { name: 'width', type: 'string | number', desc: 'componentProps.image.width' },
  { name: 'height', type: 'string | number', desc: 'componentProps.image.height' },
  { name: 'fit', type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'", desc: 'componentProps.image.fit' },
  { name: 'radius', type: 'string | number', desc: 'componentProps.image.radius' },
  { name: 'round', type: 'boolean', desc: 'componentProps.image.round' },
  { name: 'block', type: 'boolean', desc: 'componentProps.image.block' },
  { name: 'lazy', type: 'boolean', desc: 'componentProps.image.lazy' },
  { name: 'placeholder', type: 'JSX.Element', desc: 'componentProps.image.placeholder' },
  { name: 'fallback', type: 'JSX.Element', desc: 'componentProps.image.fallback' },
  { name: 'preview', type: 'boolean', desc: 'componentProps.image.preview' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const },
};

const VUE_SRC = './vue-logo.png';
const REACT_SRC = './react-logo.png';
const SOLID_SRC = './solid-logo.png';
const SVELTE_SRC = './svelte-logo.png';

export const ImageMobile: Component<ImageMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Image 图片" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Logo */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.imageLogo')}</div>
        <div style={CARD.desc}>{t('demo.imageLogoDesc')}</div>
        <div style={{ ...CARD.body, 'align-items': 'center' as const, 'justify-content': 'center' as const }}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
            <span style={{ 'font-size': '1.4rem', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace', 'font-weight': 200, opacity: 0.3 }}>{'{'}</span>
            <div style={{ position: 'relative' as const }}>
              <div style={{
                width: '86px', height: '86px', 'border-radius': '50%',
                background: 'conic-gradient(from 0deg, #1677ff, #22c55e, #f59e0b, #ef4444, #8b5cf6, #1677ff)',
                opacity: 0.15, position: 'absolute' as const, top: '-7px', left: '-7px',
              }} />
              <Image src="./logo.jpg" width={72} height={72} fit="cover" round />
            </div>
            <span style={{ 'font-size': '1.4rem', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace', 'font-weight': 200, opacity: 0.3 }}>{'}'}</span>
          </div>
        </div>
      </div>

      {/* Fit modes */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.imageFit')}</div>
        <div style={CARD.desc}>{t('demo.imageFitMobileDesc')}</div>
        <div style={CARD.body}>
          {[
            { fit: 'cover' as const, label: 'cover' },
            { fit: 'contain' as const, label: 'contain' },
            { fit: 'fill' as const, label: 'fill' },
            { fit: 'none' as const, label: 'none' },
          ].map((item) => (
            <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
              <div style={{ width: '100px', height: '50px', background: 'var(--sc-doc-card-placeholder, #f3f4f6)', 'border-radius': '8px', overflow: 'hidden' as const }}>
                <Image src="./demo-photo.jpg" width={100} height={50} fit={item.fit} />
              </div>
              <span style={{ 'font-size': '0.65rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Radius & Round */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.imageRadius')}</div>
        <div style={CARD.desc}>{t('demo.imageRadiusMobileDesc')}</div>
        <div style={CARD.body}>
          <Image src={REACT_SRC} width={60} height={60} radius={4} />
          <Image src={REACT_SRC} width={60} height={60} radius={12} />
          <Image src={REACT_SRC} width={60} height={60} round />
          <Image src={REACT_SRC} width={60} height={60} radius={20} />
        </div>
      </div>

      {/* Block & Aspect Ratio */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.imageBlockMobile')}</div>
        <div style={CARD.desc}>{t('demo.imageBlockMobileDesc')}</div>
        <div style={{ ...CARD.body, 'flex-direction': 'column' as const, 'align-items': 'center' as const }}>
          <Image src={REACT_SRC} width={100} height={60} fit="cover" radius={8} />
          <span style={{ 'font-size': '0.6rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{t('demo.imageCustomSize')}</span>
          <Image src={VUE_SRC} width="100%" fit="cover" radius={8} block />
          <span style={{ 'font-size': '0.6rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{t('demo.imageBlockFull')}</span>
        </div>
      </div>

      {/* Preview */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.imagePreview')}</div>
        <div style={CARD.desc}>{t('demo.imagePreviewMobileDesc')}</div>
        <div style={CARD.body}>
          <Image src={SOLID_SRC} width={80} height={80} fit="cover" round preview />
          <Image src={VUE_SRC} width={80} height={80} fit="cover" round preview />
          <Image src={SVELTE_SRC} width={80} height={80} fit="cover" round preview />
        </div>
      </div>

      {/* Fallback */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.imageFallbackMobile')}</div>
        <div style={CARD.desc}>{t('demo.imageFallbackMobileDesc')}</div>
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
                {t('demo.loadFailed')}
              </div>
            }
          />
          <Image
            src="invalid-url"
            width={80} height={80} round
            fallback={
              <div style={{
                width: '80px', height: '80px', background: 'var(--sc-color-primary, #1677ff)',
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
