import { type Component } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import zhCN from '../guide/About/zh-CN';
import enUS from '../guide/About/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export interface AboutMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const completed = ['Button', 'Icon', 'Center', 'Divider', 'Layout', 'SafeArea', 'Card',
  'Avatar', 'Badge', 'Tag', 'Image', 'Empty', 'Lazyload', 'List', 'SwipeCell', 'Swiper', 'Ellipsis', 'Tooltip', 'FloatingBall', 'BackTop', 'PullRefresh',
  'Tabs', 'TabBar', 'NavBar', 'Cell',
  'Picker', 'Calendar', 'Cascader', 'DatePicker', 'TimePicker', 'CityPicker',
  'Toast', 'Notify', 'Dialog', 'Overlay', 'ActionSheet', 'Loading',
  'Form', 'Input', 'Textarea', 'Radio', 'Checkbox', 'Switch', 'Rate', 'Stepper', 'Slider', 'Select', 'Upload'];
const upcoming: string[] = [];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', margin: '0 0 12px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '14px 14px 2px', color: 'var(--sc-doc-card-title, #1f2937)' },
  body: { padding: '2px 14px 14px', 'font-size': '0.85rem', 'line-height': 1.8, color: 'var(--sc-color-text-secondary, #6b7280)' },
};

export const AboutMobile: Component<AboutMobileProps> = (props) => {
  const t = useT();

  return (
    <MobilePreview title={t('about.title')} components={props.components} onNavigate={props.onNavigate}>
      <div style={{ padding: '12px' }}>
        <div style={CARD.wrapper}><div style={CARD.title}>{t('about.origins')}</div><div style={CARD.body}><p style={{ margin: '0 0 0.75rem' }}>{t('about.originsP1')}</p><p style={{ margin: '0' }}>{t('about.originsP2')}<a href="https://vant-ui.github.io/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>{t('about.originsP2Link')}</a>{t('about.originsP2After')}</p></div></div>
        <div style={CARD.wrapper}><div style={CARD.title}>{t('about.firstVersion')}</div><div style={CARD.body}><p style={{ margin: '0' }}>{t('about.firstVersionP')}</p></div></div>
        <div style={CARD.wrapper}><div style={CARD.title}>{t('about.renaissance')}</div><div style={CARD.body}><p style={{ margin: '0' }}>{t('about.renaissanceP')}</p></div></div>
        <div style={CARD.wrapper}><div style={CARD.title}>{t('about.status')}</div><div style={CARD.body}><p style={{ margin: '0 0 0.75rem' }}>{t('about.statusP1')}<strong>{completed.length}</strong>{t('about.statusP1After')}</p><div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '6px' }}>
          {([
            { titleKey: 'catBasic' as const, items: ['Button', 'Icon', 'Center', 'Divider', 'Layout', 'SafeArea', 'Card'] },
            { titleKey: 'catDisplay' as const, items: ['Avatar', 'Badge', 'Tag', 'Image', 'Empty', 'Lazyload', 'List', 'SwipeCell', 'Swiper', 'Ellipsis', 'Tooltip', 'FloatingBall', 'BackTop', 'PullRefresh'] },
            { titleKey: 'catNav' as const, items: ['Tabs', 'TabBar', 'NavBar', 'Cell'] },
            { titleKey: 'catForm' as const, items: ['Form', 'Input', 'Textarea', 'Radio', 'Checkbox', 'Switch', 'Rate', 'Stepper', 'Slider', 'Select', 'Upload'] },
            { titleKey: 'catFeedback' as const, items: ['Toast', 'Notify', 'Dialog', 'Overlay', 'ActionSheet', 'Loading'] },
            { titleKey: 'catSelector' as const, items: ['Picker', 'Calendar', 'Cascader', 'DatePicker', 'TimePicker', 'CityPicker'] },
          ]).map(cat => (
            <div style={{ background: 'var(--sc-doc-card-placeholder, #f9fafb)', 'border-radius': '8px', padding: '8px 10px', 'min-width': '140px', flex: '1 1 auto' }}>
              <div style={{ 'font-size': '0.65rem', 'font-weight': 600, color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-transform': 'uppercase', 'letter-spacing': '0.05em', 'margin-bottom': '6px' }}>{t(`about.${cat.titleKey}`)} <span style={{ 'font-weight': 400, opacity: 0.6 }}>({cat.items.length})</span></div>
              <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '3px' }}>{cat.items.map(name => (<span style={{ 'font-size': '0.72rem', 'font-family': 'monospace', color: 'var(--sc-doc-card-title, #374151)', background: 'var(--sc-doc-card-bg, #fff)', padding: '1px 6px', 'border-radius': '4px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)' }}>{name}</span>))}</div>
            </div>
          ))}</div></div></div>
        <div style={CARD.wrapper}><div style={CARD.title}>{t('about.roadmap')}</div><div style={CARD.body}><p style={{ margin: '0 0 0.75rem' }}>{t('about.roadmapP')}</p><div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '6px' }}>{upcoming.map(name => (<span style={{ padding: '4px 10px', 'font-size': '0.8rem', background: '#fef3c7', 'border-radius': '4px', 'font-family': 'monospace', color: '#92400e' }}>{name}</span>))}</div></div></div>
        <div style={CARD.wrapper}><div style={CARD.title}>{t('about.acknowledgments')}</div><div style={CARD.body}><p style={{ margin: '0' }}>{t('about.acknowledgmentsP')}<a href="https://github.com/LXG19961206/SolidMobile" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>{t('about.acknowledgmentsLink')}</a>{t('about.acknowledgmentsAfter')}</p></div></div>
      </div>
    </MobilePreview>
  );
};
