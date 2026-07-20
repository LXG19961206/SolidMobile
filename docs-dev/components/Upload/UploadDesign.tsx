import { useT } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { CodeBlock } from '../../doc-utils/CodeBlock';

const inIframe = typeof window !== 'undefined' && window.top !== window.self;

export function UploadDesign() {
  const t = useT();
  if (inIframe) return null;
  return (
    <Card title={t('upload.design.title')}>
      <div style={{ 'font-size': '0.9rem', 'line-height': 1.8, color: 'var(--sc-color-text, #374151)', 'overflow-wrap': 'break-word' }}>
        <p style={{ color: '#6b7280', 'margin-bottom': '12px' }}>{t('upload.design.ideal')}</p>
        <CodeBlock code={'<Upload action="/api/upload" />'} lang="tsx" />
        <p style={{ color: '#6b7280', margin: '12px 0' }}>{t('upload.design.reality')}</p>
        <ul style={{ color: '#6b7280', 'line-height': 2, 'padding-left': '1.5rem', margin: '0 0 16px', 'font-size': '0.85rem' }}>
          <li>{t('upload.design.q1')}</li>
          <li>{t('upload.design.q2')}</li>
          <li>{t('upload.design.q3')}</li>
          <li>{t('upload.design.q4')}</li>
          <li>{t('upload.design.q5')}</li>
          <li>{t('upload.design.q6')}</li>
        </ul>

        <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '24px 0 8px' }}>{t('upload.design.noHttpTitle')}</h3>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          {t('upload.design.noHttpDesc')}
        </p>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          {t('upload.design.noHttpSum')}
        </p>

        <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '24px 0 8px' }}>{t('upload.design.iocTitle')}</h3>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
          {t('upload.design.iocDesc')}
        </p>
        <CodeBlock code={"import { request } from '@/services/http';\n\n<Upload\n  api={(file, onProgress) =>\n    request.post('/upload', { body: file, onProgress })\n      .then(res => res.data.url)\n  }\n/>"} lang="tsx" />
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '12px' }}>
          {t('upload.design.noApi')}
        </p>
        <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '12px' }}>
          {t('upload.design.belief')}
        </p>

        <h3 style={{ 'font-size': '1rem', 'font-weight': 600, margin: '24px 0 8px' }}>{t('upload.design.means')}</h3>
        <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.8125rem', 'line-height': 1.7, 'margin-bottom': '12px' }}>
          <tbody>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600 }}>{t('upload.design.row1Title')}</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>{t('upload.design.row1Desc')}</td>
            </tr>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600 }}>{t('upload.design.row2Title')}</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>{t('upload.design.row2Desc')}</td>
            </tr>
            <tr style={{ 'border-bottom': '1px solid #f3f4f6' }}>
              <td style={{ padding: '8px 12px', 'font-weight': 600 }}>{t('upload.design.row3Title')}</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>{t('upload.design.row3Desc')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px', 'font-weight': 600 }}>{t('upload.design.row4Title')}</td>
              <td style={{ padding: '8px 12px', color: '#6b7280' }}>{t('upload.design.row4Desc')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
