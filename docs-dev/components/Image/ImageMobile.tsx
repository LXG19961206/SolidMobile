import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Image } from '../../../src/components/Image';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useImageTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const SRC_REACT = './react-logo.png';
const SRC_VUE = './vue-logo.png';
const SRC_SOLID = './solid-logo.png';
const SRC_SVELTE = './svelte-logo.png';
const SRC_DEMO = './demo-photo.jpg';

const flexRow = { display: 'flex', 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const };
const fitRow = { display: 'flex', 'flex-wrap': 'wrap' as const, gap: '16px', 'align-items': 'flex-end' as const };

export const ImageMobile = () => {
  const t = useT();
  const { propsTables } = useImageTableData();

  return (
    <MobilePreview title="Image">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Basic */}
        <Card title={t('image.demo.basic')}>
          <div style={{ ...flexRow, 'justify-content': 'center' }}>
            <Image src="./logo.jpg" width={72} height={72} fit="cover" round />
          </div>
        </Card>

        {/* Fit modes */}
        <Card title={t('image.demo.fit')}>
          <div style={fitRow}>
            {(['cover', 'contain', 'fill', 'none'] as const).map((fit) => (
              <div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', gap: '4px' }}>
                <div style={{ width: '100px', height: '50px', background: 'var(--sc-color-background-secondary, #f5f5f5)', 'border-radius': '8px', overflow: 'hidden' }}>
                  <Image src={SRC_DEMO} width={100} height={50} fit={fit} />
                </div>
                <span style={{ 'font-size': '0.65rem', color: 'var(--sc-color-text-secondary, #9ca3af)' }}>{fit}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Shape: radius & round */}
        <Card title={t('image.demo.shape')}>
          <div style={flexRow}>
            <Image src={SRC_REACT} width={60} height={60} radius={4} />
            <Image src={SRC_REACT} width={60} height={60} radius={12} />
            <Image src={SRC_REACT} width={60} height={60} round />
            <Image src={SRC_REACT} width={60} height={60} radius={20} />
          </div>
        </Card>

        {/* Block */}
        <Card title={t('image.demo.block')}>
          <Image src={SRC_VUE} width={100} height={60} fit="cover" radius={8} />
        </Card>

        {/* Preview */}
        <Card title={t('image.demo.preview')}>
          <div style={flexRow}>
            <Image src={SRC_SOLID} width={80} height={80} fit="cover" round preview />
            <Image src={SRC_VUE} width={80} height={80} fit="cover" round preview />
            <Image src={SRC_SVELTE} width={80} height={80} fit="cover" round preview />
          </div>
        </Card>

        {/* State: fallback */}
        <Card title={t('image.demo.state')}>
          <div style={flexRow}>
            <Image src="invalid-url" width={80} height={80}
              fallback={
                <div style={{ width: '80px', height: '80px', display: 'flex', 'align-items': 'center', 'justify-content': 'center', background: 'var(--sc-color-background-secondary, #f5f5f5)', 'border-radius': '8px', color: 'var(--sc-color-text-secondary, #9ca3af)', 'font-size': '0.75rem' }}>
                  Failed
                </div>
              }
            />
            <Image src="invalid-url" width={80} height={80} round
              fallback={
                <div style={{ width: '80px', height: '80px', display: 'flex', 'align-items': 'center', 'justify-content': 'center', background: 'var(--sc-color-primary, #1677ff)', 'border-radius': '50%', color: '#fff', 'font-size': '1.5rem', 'font-weight': 700 }}>
                  ?
                </div>
              }
            />
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
