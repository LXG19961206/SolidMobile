import { type Component } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import zhCN from '../guide/Solidjs/zh-CN';
import enUS from '../guide/Solidjs/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export interface SolidjsMobileProps { components?: ComponentEntry[]; onNavigate?: (key: string) => void; }

const C ={wrapper:{background:'var(--sc-doc-card-bg, #fff)','border-radius':'10px',overflow:'hidden' as const,'box-shadow':'0 1px 4px rgba(0,0,0,0.06)',margin:'0 0 12px'},title:{'font-size':'0.9rem','font-weight':600,padding:'14px 14px 2px',color:'var(--sc-doc-card-title, #1f2937)'},body:{padding:'2px 14px 14px','font-size':'0.85rem','line-height':1.8,color:'var(--sc-color-text-secondary, #6b7280)'}};
const L={color:'var(--sc-color-primary, #1677ff)','font-weight':600};
const BQ={margin:'0.75rem 0',padding:'0.75rem 1rem','border-left':'3px solid var(--sc-color-primary, #1677ff)',background:'color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent)','border-radius':'0 6px 6px 0',color:'var(--sc-color-text-secondary, #6b7280)','font-size':'0.85rem','line-height':1.7};

export const SolidjsMobile: Component<SolidjsMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title={t('solidjs.title')} components={props.components} onNavigate={props.onNavigate}>
      <div style={{ padding:'12px' }}>
        <div style={C.wrapper}><div style={C.title}>{t('solidjs.whatTitle')}</div><div style={C.body}><a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={L}>{t('solidjs.whatP1')}</a>{t('solidjs.whatP1After')}</div></div>
        <div style={C.wrapper}><div style={C.title}>{t('solidjs.perfTitle')}</div><div style={C.body}><p style={{margin:'0 0 0.75rem'}}>{t('solidjs.perfP1')}</p><p style={{margin:0}}>{t('solidjs.perfP2')}<a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={L}>{t('solidjs.perfP2Link')}</a>{t('solidjs.perfP2After')}</p></div></div>
        <div style={C.wrapper}><div style={C.title}>{t('solidjs.missedTitle')}</div><div style={C.body}><p style={{margin:'0 0 0.75rem'}}>{t('solidjs.missedP1')}</p><p style={{margin:'0 0 0.75rem'}}>{t('solidjs.missedP2')}</p><p style={{margin:'0 0 0.75rem'}}>{t('solidjs.missedP3')}</p><blockquote style={BQ}><strong>{t('solidjs.missedQuote')}</strong></blockquote><p style={{margin:'0.75rem 0 0'}}>{t('solidjs.missedP4')}</p></div></div>
        <div style={C.wrapper}><div style={C.title}>{t('solidjs.whyTitle')}</div><div style={C.body}><p style={{margin:'0 0 0.75rem'}}>{t('solidjs.whyP1')}</p><p style={{margin:0}}>{t('solidjs.whyP2')}<a href="https://www.solidjs.com/tutorial" target="_blank" rel="noopener" style={L}>{t('solidjs.whyP2Link')}</a>{t('solidjs.whyP2After')}</p></div></div>
        <div style={C.wrapper}><div style={C.title}>{t('solidjs.readingTitle')}</div><div style={C.body}><ul style={{'line-height':2,'padding-left':'1.2rem',margin:0}}><li><a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={L}>{t('solidjs.reading1a')}</a> — {t('solidjs.reading1b')}</li><li><a href="https://www.solidjs.com/docs/latest/api" target="_blank" rel="noopener" style={L}>{t('solidjs.reading2a')}</a> — {t('solidjs.reading2b')}</li><li><a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={L}>{t('solidjs.reading3a')}</a> — {t('solidjs.reading3b')}</li><li><a href="https://krausest.github.io/js-framework-benchmark/" target="_blank" rel="noopener" style={L}>{t('solidjs.reading4a')}</a> — {t('solidjs.reading4b')}</li></ul></div></div>
      </div>
    </MobilePreview>
  );
};
