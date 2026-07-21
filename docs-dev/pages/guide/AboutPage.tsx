import { type Component } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import zhCN from './About/zh-CN';
import enUS from './About/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const AboutPage: Component = () => {
  const t = useT();
  const completed = ['Button', 'Icon', 'Center', 'Divider', 'Layout', 'SafeArea',
    'Card', 'ScrollBar', 'Sidebar', 'Avatar', 'Badge', 'Tag', 'Image', 'Empty', 'Lazyload', 'List', 'SwipeCell', 'Swiper', 'Ellipsis', 'Tooltip', 'FloatingBall', 'BackTop', 'Marquee', 'PullRefresh',
    'Tabs', 'TabBar', 'NavBar', 'Cell',
    'Picker', 'Calendar', 'Cascader', 'DatePicker', 'TimePicker', 'CityPicker',
    'Toast', 'Notify', 'Dialog', 'Overlay', 'ActionSheet', 'Loading',
    'Form', 'Input', 'Textarea', 'Radio', 'Checkbox', 'Switch', 'Rate', 'Stepper', 'Slider', 'Select', 'Upload'];
  // const upcoming = ['Grid', 'Table', 'SKU', 'RichText', 'LiveRoom'];

  return (
    <div class="guide-card">
      <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 1rem' }}>{t('about.title')}</h1>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('about.origins')}</h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>{t('about.originsP1')}</p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
        {t('about.originsP2')}
        <a href="https://vant-ui.github.io/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>{t('about.originsP2Link')}</a>
        {t('about.originsP2After')}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('about.firstVersion')}</h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>{t('about.firstVersionP')}</p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('about.renaissance')}</h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>{t('about.renaissanceP')}</p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('about.status')}</h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {t('about.statusP1')}<strong>{completed.length}</strong>{t('about.statusP1After')}
      </p>

      <div style={{ 'margin-top': '1rem', display: 'grid', 'grid-template-columns': 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {([
          { titleKey: 'catBasic' as const, items: ['Button', 'Icon', 'Center', 'Divider', 'Layout', 'SafeArea', 'Card', 'ScrollBar', 'Sidebar'] },
          { titleKey: 'catDisplay' as const, items: ['Avatar', 'Badge', 'Tag', 'Image', 'Empty', 'Lazyload', 'List', 'SwipeCell', 'Swiper', 'Ellipsis', 'Tooltip', 'FloatingBall', 'BackTop', 'Marquee', 'PullRefresh'] },
          { titleKey: 'catNav' as const, items: ['Tabs', 'TabBar', 'NavBar', 'Cell'] },
          { titleKey: 'catForm' as const, items: ['Form', 'Input', 'Textarea', 'Radio', 'Checkbox', 'Switch', 'Rate', 'Stepper', 'Slider', 'Select', 'Upload'] },
          { titleKey: 'catFeedback' as const, items: ['Toast', 'Notify', 'Dialog', 'Overlay', 'ActionSheet', 'Loading'] },
          { titleKey: 'catSelector' as const, items: ['Picker', 'Calendar', 'Cascader', 'DatePicker', 'TimePicker', 'CityPicker'] },
        ]).map(cat => (
          <div style={{ background: 'var(--sc-doc-card-placeholder, #f9fafb)', 'border-radius': '8px', padding: '12px 14px' }}>
            <div style={{ 'font-size': '0.7rem', 'font-weight': 600, color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-transform': 'uppercase', 'letter-spacing': '0.05em', 'margin-bottom': '8px' }}>
              {t(`about.${cat.titleKey}`)} <span style={{ 'font-weight': 400, opacity: 0.6 }}>({cat.items.length})</span>
            </div>
            <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '4px' }}>
              {cat.items.map(name => (
                <span style={{ 'font-size': '0.78rem', 'font-family': 'monospace', color: 'var(--sc-doc-card-title, #374151)', background: 'var(--sc-doc-card-bg, #fff)', padding: '2px 8px', 'border-radius': '4px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)' }}>{name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('about.acknowledgments')}</h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {t('about.acknowledgmentsP')}
        <a href="https://github.com/LXG19961206/SolidMobile" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>{t('about.acknowledgmentsLink')}</a>
        {t('about.acknowledgmentsAfter')}
      </p>
    </div>
  );
};

export { AboutPage };
