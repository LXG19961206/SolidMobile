import { type Component } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import zhCN from './Solidjs/zh-CN';
import enUS from './Solidjs/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const SolidjsPage: Component = () => {
  const t = useT();

  return (
    <div class="guide-card">
      <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 1rem' }}>{t('solidjs.title')}</h1>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('solidjs.whatTitle')}</h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        <a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)', 'font-weight': 600 }}>{t('solidjs.whatP1')}</a>{t('solidjs.whatP1After')}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('solidjs.perfTitle')}</h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>{t('solidjs.perfP1')}</p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
        {t('solidjs.perfP2')}
        <a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>{t('solidjs.perfP2Link')}</a>
        {t('solidjs.perfP2After')}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('solidjs.missedTitle')}</h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>{t('solidjs.missedP1')}</p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>{t('solidjs.missedP2')}</p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>{t('solidjs.missedP3')}</p>
      <blockquote style="margin:1rem 0;padding:0.75rem 1rem;border-left:3px solid var(--sc-color-primary, #1677ff);background:color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent);border-radius:0 6px 6px 0;color:var(--sc-color-text-secondary,#6b7280);font-size:0.9rem;line-height:1.7">
        <strong>{t('solidjs.missedQuote')}</strong>
      </blockquote>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>{t('solidjs.missedP4')}</p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('solidjs.whyTitle')}</h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>{t('solidjs.whyP1')}</p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
        {t('solidjs.whyP2')}
        <a href="https://www.solidjs.com/tutorial" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>{t('solidjs.whyP2Link')}</a>
        {t('solidjs.whyP2After')}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('solidjs.readingTitle')}</h2>
      <ul style={{ color: '#6b7280', 'line-height': 1.8, 'padding-left': '1.2rem' }}>
        <li><a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>{t('solidjs.reading1a')}</a> — {t('solidjs.reading1b')}</li>
        <li><a href="https://www.solidjs.com/docs/latest/api" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>{t('solidjs.reading2a')}</a> — {t('solidjs.reading2b')}</li>
        <li><a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>{t('solidjs.reading3a')}</a> — {t('solidjs.reading3b')}</li>
        <li><a href="https://krausest.github.io/js-framework-benchmark/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>{t('solidjs.reading4a')}</a> — {t('solidjs.reading4b')}</li>
      </ul>
    </div>
  );
};

export { SolidjsPage };
