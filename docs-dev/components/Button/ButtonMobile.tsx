import { Show } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Button } from '../../../src/components/Button';
import { PropsAttrs } from '../../doc-utils/PropsAttrs';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const inIframe = () => typeof window !== 'undefined' && window.top !== window.self;

export const ButtonMobile = () => {
  const t = useT();
  return (
    <MobilePreview title="Button">
      {/* Demos */}
      <div style={{ padding: '12px 12px 8px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('button.demo.types')} subtitle="primary / secondary / success">
          <Row><Button type="primary">Primary</Button><Button type="danger">Danger</Button><Button type="success">Success</Button></Row>
        </Card>
        <Card title={t('button.demo.sizes')} subtitle="xs / sm / md / lg">
          <Row><Button size="xs">XS</Button><Button size="sm">SM</Button><Button size="md">MD</Button><Button size="lg">LG</Button></Row>
        </Card>
        <Card title={t('button.demo.variant')} subtitle="solid / outline / ghost">
          <Row><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button></Row>
        </Card>
        <Card title={t('button.demo.icon')}>
          <Row><Button icon="star">Favorite</Button><Button icon="arrow-right" iconPosition="right">Next</Button></Row>
        </Card>
        <Card title={t('button.demo.loading')}>
          <Row><Button type="primary" loading loadingText="Loading...">Submit</Button></Row>
          <Row style="margin-top:8px"><Button disabled>Disabled</Button><Button type="primary" disabled>Primary</Button></Row>
        </Card>
        <Card title={t('button.demo.block')}>
          <Button block round type="primary">Block Round</Button>
        </Card>
      </div>

      {/* Props + CSS vars — 仅在独立模式展示（iframe 中隐藏） */}
      <Show when={!inIframe()}>
        <PropsAttrs
          compact
          propsTables={[{
            rows: [
              { name: 'type', type: 'string', desc: t('button.props.type') },
              { name: 'variant', type: "'solid' | 'outline' | 'ghost'", def: "'solid'", desc: t('button.props.variant') },
              { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", def: "'md'", desc: t('button.props.size') },
              { name: 'disabled', type: 'boolean', def: 'false', desc: t('button.props.disabled') },
              { name: 'loading', type: 'boolean', def: 'false', desc: t('button.props.loading') },
              { name: 'icon', type: 'string | JSX.Element', desc: t('button.props.icon') },
              { name: 'block', type: 'boolean', def: 'false', desc: t('button.props.block') },
              { name: 'round', type: 'boolean', def: 'false', desc: t('button.props.round') },
              { name: 'color', type: 'string', desc: t('button.props.color') },
              { name: 'onClick', type: '(e: MouseEvent) => void', desc: t('button.props.onClick') },
            ],
          }]}
          cssVarsTables={[{
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
          }]}
        />
      </Show>
    </MobilePreview>
  );
};

function Row(props: { children: any; style?: string }) {
  return <div style={`display:flex;gap:8px;flex-wrap:wrap;align-items:center;${props.style ?? ''}`}>{props.children}</div>;
}
