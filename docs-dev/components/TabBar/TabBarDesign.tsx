import { useT } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';

const inIframe = typeof window !== 'undefined' && window.top !== window.self;

const titleStyle = '.tabbar-design-card .sc-card-title { font-size: 1rem; }';

export function TabBarDesign() {
  const t = useT();

  // 在 iframe 中不展示
  if (inIframe) return null;

  return (
    <Card title={t('tabbar.design.cardTitle')} class="tabbar-design-card">
      <style>{titleStyle}</style>
      <div style={{ 'font-size': '0.9rem', 'line-height': 1.8, color: 'var(--sc-color-text, #374151)' }}>
        <p>{t('tabbar.design.para1')}</p>

        <h3 style={{ 'font-size': '0.95rem', 'font-weight': 600, margin: '20px 0 8px' }}>
          {t('tabbar.design.whyTitle')}
        </h3>
        <p>{t('tabbar.design.whyDesc')}</p>

        <ul style={{ padding: '0 0 0 20px', margin: '0 0 16px' }}>
          <li style={{ 'margin-bottom': '8px' }}><strong>{t('tabbar.design.reason1Title')}</strong>{t('tabbar.design.reason1Desc')}</li>
          <li style={{ 'margin-bottom': '8px' }}><strong>{t('tabbar.design.reason2Title')}</strong>{t('tabbar.design.reason2Desc')}</li>
          <li style={{ 'margin-bottom': '8px' }}><strong>{t('tabbar.design.reason3Title')}</strong>{t('tabbar.design.reason3Desc')}</li>
        </ul>

        <p style={{ margin: '16px 0 0', 'font-size': '0.85rem', color: 'var(--sc-color-text-secondary, #6b7280)' }}>
          {t('tabbar.design.summary')}
        </p>
      </div>
    </Card>
  );
}
