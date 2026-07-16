import { type Component } from 'solid-js';


import zhCN from '../../i18n/empty/zh-CN';
import enUS from '../../i18n/empty/en-US';
import { registerLocale } from '../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface EmptyMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Empty } from '../../../src/components/Empty';
import { Button } from '../../../src/components/Button';

const propsData = [
  { name: 'description', type: 'string', desc: 'componentProps.empty.description' },
  { name: 'image', type: "'default' | 'network' | 'search' | JSX.Element", desc: 'componentProps.empty.image' },
  { name: 'children', type: 'JSX.Element', desc: 'componentProps.empty.children' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const EmptyMobile: Component<EmptyMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Empty" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.basic')}</div>
        <div style={CARD.desc}>{t('demo.basicDesc')}</div>
        <div style={CARD.body}>
          <Empty description="No data" />
        </div>
      </div>

      {/* 不同预设 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.emptyPreset')}</div>
        <div style={CARD.desc}>{t('demo.emptyPresetDesc')}</div>
        <div style={{ ...CARD.body, display: 'flex' as const, gap: '12px', 'justify-content': 'space-around' }}>
          <div style={{ flex: 1 }}>
            <Empty image="default" description="No data" />
          </div>
          <div style={{ flex: 1 }}>
            <Empty image="network" description="Network error" />
          </div>
          <div style={{ flex: 1 }}>
            <Empty image="search" description="No results found" />
          </div>
        </div>
      </div>

      {/* 带操作按钮 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.emptyChildren')}</div>
        <div style={CARD.desc}>{t('demo.emptyChildrenDesc')}</div>
        <div style={CARD.body}>
          <Empty description="Your cart is empty">
            <Button type="primary" text="Go shopping" size="sm" style={{ 'margin-top': '8px' }} />
          </Empty>
        </div>
      </div>

      {/* 自定义图片 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.emptyJSX')}</div>
        <div style={CARD.desc}>{t('demo.emptyJSXDesc')}</div>
        <div style={CARD.body}>
          <Empty
            image={<div style={{ 'font-size': '3rem' }}>📭</div>}
            description="Custom empty state"
          >
            <Button type="primary" text="Refresh" size="sm" style={{ 'margin-top': '8px' }} />
          </Empty>
        </div>
      </div>
    </MobilePreview>
  );
};
