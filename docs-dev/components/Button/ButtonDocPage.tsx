import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { TableSection, DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ButtonDocPage = () => {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'text', type: 'string', def: '—', desc: t('button.props.text') },
      { name: 'children', type: 'JSX.Element', def: '—', desc: t('button.props.children') },
      { name: 'type', type: 'string', def: '—', desc: t('button.props.type') },
      { name: 'variant', type: "'solid' | 'outline' | 'ghost'", def: "'solid'", desc: t('button.props.variant') },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", def: "'md'", desc: t('button.props.size') },
      { name: 'block', type: 'boolean', def: 'false', desc: t('button.props.block') },
      { name: 'round', type: 'boolean', def: 'false', desc: t('button.props.round') },
      { name: 'hairline', type: 'boolean', def: 'false', desc: t('button.props.hairline') },
      { name: 'color', type: 'string', def: '—', desc: t('button.props.color') },
      { name: 'textColor', type: 'string', def: '—', desc: t('button.props.textColor') },
      { name: 'icon', type: 'string | JSX.Element', def: '—', desc: t('button.props.icon') },
      { name: 'iconPosition', type: "'left' | 'right'", def: "'left'", desc: t('button.props.iconPosition') },
      { name: 'disabled', type: 'boolean', def: 'false', desc: t('button.props.disabled') },
      { name: 'loading', type: 'boolean', def: 'false', desc: t('button.props.loading') },
      { name: 'loadingText', type: 'string', def: '—', desc: t('button.props.loadingText') },
      { name: 'nativeType', type: "'button' | 'submit' | 'reset'", def: "'button'", desc: t('button.props.nativeType') },
      { name: 'href', type: 'string', def: '—', desc: t('button.props.href') },
      { name: 'target', type: 'string', def: '—', desc: t('button.props.target') },
      { name: 'onClick', type: '(e: MouseEvent) => void', def: '—', desc: t('button.props.onClick') },
      { name: 'class', type: 'string', def: '—', desc: t('button.props.class') },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: t('button.props.style') },
      { name: 'aria-label', type: 'string', def: '—', desc: t('button.props.aria-label') },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'Button',
    rows: [
      { name: '--sc-color-primary', type: 'color', def: '#1677ff', desc: t('button.cssVars.--sc-color-primary') },
      { name: '--sc-color-primary-hover', type: 'color', def: '#4995ff', desc: t('button.cssVars.--sc-color-primary-hover') },
      { name: '--sc-color-primary-active', type: 'color', def: '#005ee2', desc: t('button.cssVars.--sc-color-primary-active') },
      { name: '--sc-border-radius-sm', type: 'length', def: '4px', desc: t('button.cssVars.--sc-border-radius-sm') },
      { name: '--sc-border-radius-md', type: 'length', def: '8px', desc: t('button.cssVars.--sc-border-radius-md') },
      { name: '--sc-border-radius-lg', type: 'length', def: '12px', desc: t('button.cssVars.--sc-border-radius-lg') },
      { name: '--sc-border-radius-full', type: 'length', def: '999px', desc: t('button.cssVars.--sc-border-radius-full') },
    ],
  }];

  const demos: DemoCode[] = [
    { title: t('button.demo.types'), code: `<Button type="primary">Primary</Button>\n<Button type="success">Success</Button>\n<Button type="danger">Danger</Button>`, desc: t('button.demoDesc.button_types') },
    { title: t('button.demo.sizes'), code: `<Button size="xs">XS</Button>\n<Button size="sm">SM</Button>\n<Button size="md">MD</Button>\n<Button size="lg">LG</Button>`, desc: t('button.demoDesc.button_sizes') },
    { title: t('button.demo.variant'), code: `<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>` },
    { title: t('button.demo.icon'), code: `<Button icon="star">Favorite</Button>\n<Button icon="arrow-right" iconPosition="right">Next</Button>` },
    { title: t('button.demo.loading'), code: `<Button type="primary" loading>Submitting...</Button>\n<Button disabled>Disabled</Button>` },
    { title: t('button.demo.block'), code: `<Button block round type="primary">Block Round</Button>` },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Button</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('button.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
