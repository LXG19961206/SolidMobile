import { Show, createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Button } from '../../../src/components/Button';
import { ActionSheet } from '../../../src/components/ActionSheet';
import { Tabs, Tab } from '../../../src/components/Tabs';
import { PropsAttrs } from '../../doc-utils/PropsAttrs';
import type { TableSection } from '../../doc-utils';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const inIframe = () => typeof window !== 'undefined' && window.top !== window.self;

export const ButtonMobile = () => {
  const t = useT();
  const [showSheet, setShowSheet] = createSignal(false);

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

  const [sheetTab, setSheetTab] = createSignal<'props' | 'cssvars'>('props');

  return (
    <MobilePreview title="Button">
      {/* 查看属性按钮 — 仅独立模式 */}
      <Show when={!inIframe()}>
        <div style={{ padding: '12px 12px 0' }}>
          <div onClick={() => setShowSheet(true)} style={{
            padding: '10px 14px', background: 'var(--sc-color-background-secondary, #f5f5f5)', 'border-radius': '8px',
            'font-size': '0.85rem', color: '#1677ff', cursor: 'pointer',
            display: 'flex', 'align-items': 'center', 'justify-content': 'space-between',
          }}>
            <span>{t("common.props")} & {t("common.cssVars")}</span>
            <span style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>View</span>
          </div>
        </div>
      </Show>

      {/* Demos */}
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
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

      {/* 底部弹出 — Props / CSS Vars */}
      <ActionSheet open={showSheet()} onClose={() => setShowSheet(false)}>
        <div style={{ padding: '4px 16px 20px' }}>
          <Tabs active={sheetTab()} onChange={(v) => setSheetTab(v as 'props' | 'cssvars')}>
            <Tab title={t('common.props')} name="props">
              <PropsAttrs compact hideTitle propsTables={propsTables} />
            </Tab>
            <Tab title={t('common.cssVars')} name="cssvars">
              <PropsAttrs compact hideTitle cssVarsTables={cssVarsTables} />
            </Tab>
          </Tabs>
        </div>
      </ActionSheet>
    </MobilePreview>
  );
};

function Row(props: { children: any; style?: string }) {
  return <div style={`display:flex;gap:8px;flex-wrap:wrap;align-items:center;${props.style ?? ''}`}>{props.children}</div>;
}
