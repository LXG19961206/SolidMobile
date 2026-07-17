import { useT, registerLocale } from '../../doc-i18n';
import { ComponentDocLayout, DocLayout } from '../../doc-utils';
import type { TableSection, DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ButtonDocPage = () => {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'type', type: 'string', desc: t('button.props.type') },
      { name: 'variant', type: "'solid' | 'outline' | 'ghost'", def: "'solid'", desc: t('button.props.variant') },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", def: "'md'", desc: t('button.props.size') },
      { name: 'block', type: 'boolean', def: 'false', desc: t('button.props.block') },
      { name: 'round', type: 'boolean', def: 'false', desc: t('button.props.round') },
      { name: 'disabled', type: 'boolean', def: 'false', desc: t('button.props.disabled') },
      { name: 'loading', type: 'boolean', def: 'false', desc: t('button.props.loading') },
      { name: 'icon', type: 'string | JSX.Element', desc: t('button.props.icon') },
      { name: 'iconPosition', type: "'left' | 'right'", def: "'left'", desc: t('button.props.iconPosition') },
      { name: 'color', type: 'string', desc: t('button.props.color') },
      { name: 'onClick', type: '(e: MouseEvent) => void', desc: t('button.props.onClick') },
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
    {
      title: t('button.demo.types'),
      code: `<Button type="primary">Primary</Button>\n<Button type="danger">Danger</Button>`,
      desc: t('button.demoDesc.button_types'),
    },
    {
      title: t('button.demo.sizes'),
      code: `<Button size="xs">XS</Button>\n<Button size="lg">LG</Button>`,
      desc: t('button.demoDesc.button_sizes'),
    },
    {
      title: t('button.demo.variant'),
      code: `<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>`,
    },
  ];

  return (
    <DocLayout>
      <ComponentDocLayout
        title="Button"
        intro={t('button.intro')}
        propsTables={propsTables}
        cssVarsTables={cssVarsTables}
        demos={demos}
      />
    </DocLayout>
  );
};
