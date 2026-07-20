import { onCleanup, type Component } from 'solid-js';
import { CodeBlock } from '../../doc-utils';
import { registerLocale, useLocale, useT, setGlobalLocale } from '../../doc-i18n';
import { messages as libMessages } from '../../../src/i18n/dictionaries';
import zhCN from './I18n/zh-CN';
import enUS from './I18n/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const SECTION_H2 = { 'font-size': '1.15rem', 'font-weight': 600, margin: '2.5rem 0 0.75rem' };

const I18nDocPage: Component = () => {
  const t = useT();
  const isEn = () => useLocale() === 'en-US';
  // 进入时记住全局语言，demo 切换语言后可通过 onCleanup 还原
  const savedLocale = useLocale();
  onCleanup(() => setGlobalLocale(savedLocale));

  const handleDownloadTemplate = () => {
    const componentDict = (libMessages as any)['en-US']?.component;
    const template = { 'your-locale': { component: componentDict ?? {} } };
    const json = JSON.stringify(template, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'solid-component-i18n-template.json'; a.click();
    URL.revokeObjectURL(a.href);
  };

  return (

      <div class="guide-card">
        <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 0.5rem' }}>{t('i18n.title')}</h1>
        <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>{t('i18n.intro')}</p>

        <h2 style={SECTION_H2}>{t('i18n.downloadTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>{t('i18n.downloadDesc')}</p>
        <div style={{ background: 'var(--sc-doc-card-placeholder, #f3f4f6)', 'border-radius': '10px', padding: '16px 20px', 'margin-bottom': '0.75rem' }}>
          <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
            <strong>{isEn() ? 'Steps:' : '使用步骤：'}</strong><br />{t('i18n.downloadStep1')}
          </div>
          <div style={{ 'font-size': '0.8rem', color: '#9ca3af', 'line-height': 1.6, 'margin-bottom': '12px' }}>{t('i18n.downloadNote')}</div>
          <button onClick={handleDownloadTemplate} style={{ padding: '8px 20px', 'font-size': '0.85rem', 'font-weight': 500, background: 'var(--sc-color-primary, #1677ff)', color: '#fff', border: 'none', 'border-radius': '6px', cursor: 'pointer' }}>{t('i18n.downloadBtn')}</button>
        </div>

        <h2 style={SECTION_H2}>{t('i18n.basicTitle')}</h2>
        <CodeBlock lang="jsx" code={`// Multi-locale setup with ProviderConfig localeMessages
import { ProviderConfig, Picker, Cell } from 'solid-mobile';

const messages = {
  'ja-JP': { component: { picker: { cancel: 'キャンセル', confirm: '確認' } } },
  'ko-KR': { component: { picker: { cancel: '취소', confirm: '확인' } } },
};

function App() {
  return (
    <ProviderConfig config={{ locale: 'ja-JP' }} localeMessages={messages}>
      <Picker columns={[{text:'東京',value:'tokyo'}]} />
    </ProviderConfig>
  );
}`} />

        <h2 style={SECTION_H2}>{t('i18n.overrideTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>{t('i18n.overrideDesc')}</p>
        <CodeBlock lang="jsx" code={`import { ProviderConfig } from 'solid-mobile';
const zhOverride = { 'zh-CN': { component: { dialog: { confirmText: '好的', cancelText: '算了' } } } };
function App() {
  return <ProviderConfig config={{ locale: 'zh-CN' }} localeMessages={zhOverride}><App /></ProviderConfig>;
}`} />

        <h2 style={SECTION_H2}>{t('i18n.fallbackTitle')}</h2>
        <div style={{ color: '#6b7280', 'line-height': 1.8 }}>
          <p style={{ margin: '0 0 0.5rem' }}>{t('i18n.fallbackDesc')}</p>
          <ol style={{ 'padding-left': '1.5rem', margin: '0 0 0.75rem' }}>
            <li>{t('i18n.fallback1')}</li><li>{t('i18n.fallback2')}</li><li>{t('i18n.fallback3')}</li>
          </ol>
          <p style={{ margin: '0', 'font-size': '0.85rem', color: '#9ca3af' }}>{t('i18n.fallbackNote')}</p>
        </div>

        <h2 style={SECTION_H2}>{t('i18n.dictTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>{t('i18n.dictDesc')}</p>
        <CodeBlock lang="ts" code={`{ designTokens, config, common, component: { picker, datePicker, dialog, select, calendar, list, upload, pullRefresh, stepper, tag, loading, cityPicker, timePicker, cascader, ... } }`} />

        <h2 style={SECTION_H2}>{t('i18n.progTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>{t('i18n.progDesc')}</p>
        <CodeBlock lang="jsx" code={`import { setUserMessages } from 'solid-mobile';
setUserMessages({ 'ja-JP': { component: { picker: { cancel: 'キャンセル', confirm: '確認' } } } });`} />
      </div>

  );
};

export { I18nDocPage };
