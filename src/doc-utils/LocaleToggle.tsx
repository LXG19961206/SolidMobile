import { useLocale, setGlobalLocale } from '../i18n';

/**
 * 中/英语言切换按钮。文档页专用。
 * 点击在 zh-CN ↔ en-US 之间切换，状态持久化到 localStorage。
 */
export function LocaleToggle() {
  const locale = useLocale();

  const toggle = () => {
    setGlobalLocale(locale === 'zh-CN' ? 'en-US' : 'zh-CN');
  };

  return (
    <button
      onClick={toggle}
      title={locale === 'zh-CN' ? 'Switch to English' : '切换到中文'}
      style={{
        position: 'fixed',
        top: '1rem',
        left: '3.5rem',
        'z-index': 9999,
        width: '36px',
        height: '36px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        border: '1px solid #d1d5db',
        'border-radius': '8px',
        background: '#fff',
        cursor: 'pointer',
        'font-size': '0.75rem',
        'font-weight': '700',
        transition: 'all 0.2s',
        'box-shadow': '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      {locale === 'zh-CN' ? 'EN' : '中'}
    </button>
  );
}
