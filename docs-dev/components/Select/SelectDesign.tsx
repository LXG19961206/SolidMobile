import { useT } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';

const inIframe = typeof window !== 'undefined' && window.top !== window.self;

export function SelectDesign() {
  const t = useT();
  if (inIframe) return null;
  return (
    <Card title={t('select.design.cardTitle')}>
      <div style={{ 'font-size': '0.9rem', 'line-height': 1.8, color: 'var(--sc-color-text, #374151)', 'overflow-wrap': 'break-word' }}>
        <p>{t('select.design.para1')}</p>
        <p style={{ 'margin-top': '12px' }}>{t('select.design.para2')}</p>

        <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '20px 0 8px' }}>
          {t('select.design.whenTitle')}
        </h3>
        <ul style={{ padding: '0 0 0 20px', margin: '0 0 16px' }}>
          <li style={{ 'margin-bottom': '8px' }}><strong>{t('select.design.when1Title')}</strong>{t('select.design.when1Desc')}</li>
          <li style={{ 'margin-bottom': '8px' }}><strong>{t('select.design.when2Title')}</strong>{t('select.design.when2Desc')}</li>
          <li style={{ 'margin-bottom': '8px' }}><strong>{t('select.design.when3Title')}</strong>{t('select.design.when3Desc')}</li>
        </ul>

        <p style={{ margin: '16px 0 0', 'font-size': '0.85rem', color: 'var(--sc-color-text-secondary, #6b7280)' }}>
          {t('select.design.summary')}
        </p>
      </div>
    </Card>
  );
}
