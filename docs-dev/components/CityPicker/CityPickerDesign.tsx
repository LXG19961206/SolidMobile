import { useT } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';

const inIframe = typeof window !== 'undefined' && window.top !== window.self;

export function CityPickerDesign() {
  const t = useT();

  if (inIframe) return null;

  return (
    <Card title={t('citypicker.design.cardTitle')}>
      <div style={{ 'font-size': '0.9rem', 'line-height': 1.8, color: 'var(--sc-color-text, #374151)' }}>
        <p>{t('citypicker.design.para1')}</p>
        <p style={{ 'margin-top': '12px' }}>{t('citypicker.design.para2')}</p>

        <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '20px 0 8px' }}>
          {t('citypicker.design.whyTitle')}
        </h3>
        <p>{t('citypicker.design.whyDesc')}</p>

        <ul style={{ padding: '0 0 0 20px', margin: '0 0 16px' }}>
          <li style={{ 'margin-bottom': '8px' }}><strong>{t('citypicker.design.reason1Title')}</strong>{t('citypicker.design.reason1Desc')}</li>
          <li style={{ 'margin-bottom': '8px' }}><strong>{t('citypicker.design.reason2Title')}</strong>{t('citypicker.design.reason2Desc')}</li>
          <li style={{ 'margin-bottom': '8px' }}><strong>{t('citypicker.design.reason3Title')}</strong>{t('citypicker.design.reason3Desc')}</li>
        </ul>

        <p style={{ margin: '16px 0 0', 'font-size': '0.85rem', color: 'var(--sc-color-text-secondary, #6b7280)' }}>
          {t('citypicker.design.summary')}
        </p>
      </div>
    </Card>
  );
}
