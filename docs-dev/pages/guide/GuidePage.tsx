import { type Component } from 'solid-js';
import { CodeBlock } from '../../doc-utils';
import { useT, registerLocale } from '../../doc-i18n';
import zhCN from './Guide/zh-CN';
import enUS from './Guide/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const GUIDE_CODE = `import { Button, Toast } from 'solid-mobile';

function App() {
  return (
    <Button type="primary" text="Hello" onClick={() => Toast.success('你好')} />
  );
}`;

const CONFIG_CODE = `import { ProviderConfig } from 'solid-mobile';

function App() {
  return (
    <ProviderConfig config={{ colors: { light: { primary: '#6366f1' } }, locale: 'zh-CN' }}>
      {/* 你的应用 */}
    </ProviderConfig>
  );
}`;

const GuidePage: Component = () => {
  const t = useT();

  return (
    <div class="guide-card">
      <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 1rem' }}>{t('guide.title')}</h1>
      <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>{t('guide.intro')}</p>

      <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('guide.install')}</h2>
      <CodeBlock lang="bash" code={t('guide.installCode')} />

      <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('guide.styleTitle')}</h2>
      <CodeBlock lang="tsx" code={`// ${t('guide.styleDesc')}\nimport 'solid-mobile/styles.css';`} />

      <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('guide.basicTitle')}</h2>
      <CodeBlock lang="tsx" code={GUIDE_CODE} />

      <h2 style={{ 'font-size': '1.15rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>{t('guide.configTitle')}</h2>
      <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>{t('guide.configDesc')}</p>
      <CodeBlock lang="tsx" code={CONFIG_CODE} />
    </div>
  );
};

export { GuidePage };
