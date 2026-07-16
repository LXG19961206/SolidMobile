import { createSignal, type Component } from 'solid-js';


import zhCN from '../../i18n/tag/zh-CN';
import enUS from '../../i18n/tag/en-US';
import { registerLocale } from '../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface TagMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Tag } from '../../../src/components/Tag';

const propsData = [
  { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", desc: 'componentProps.tag.type' },
  { name: 'variant', type: "'solid' | 'outline'", desc: 'componentProps.tag.variant' },
  { name: 'size', type: "'sm' | 'md'", desc: 'componentProps.tag.size' },
  { name: 'round', type: 'boolean', desc: 'componentProps.tag.round' },
  { name: 'closeable', type: 'boolean', desc: 'componentProps.tag.closeable' },
  { name: 'onClose', type: '() => void', desc: 'componentProps.tag.onClose' },
  { name: 'color', type: 'string', desc: 'componentProps.tag.color' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px', 'align-items': 'center' as const },
};

export const TagMobile: Component<TagMobileProps> = (props) => {
  const t = useT();
  const [closed, setClosed] = createSignal(new Set<string>());
  const isOpen = (id: string) => !closed().has(id);
  const close = (id: string) => setClosed(prev => new Set([...prev, id]));

  return (
    <MobilePreview title={t('demo.tagMobileTitle')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Types */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tagTypes')}</div>
        <div style={CARD.desc}>{t('demo.tagTypesMobileDesc')}</div>
        <div style={CARD.body}>
          <Tag type="primary">Primary</Tag>
          <Tag type="success">Success</Tag>
          <Tag type="warning">Warning</Tag>
          <Tag type="danger">Danger</Tag>
          <Tag type="info">Info</Tag>
        </div>
      </div>

      {/* Variant */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.variant')}</div>
        <div style={CARD.desc}>{t('demo.tagVariantMobileDesc')}</div>
        <div style={CARD.body}>
          <Tag type="primary" variant="solid">Solid</Tag>
          <Tag type="primary" variant="outline">Outline</Tag>
          <Tag type="success" variant="solid">Solid</Tag>
          <Tag type="success" variant="outline">Outline</Tag>
          <Tag type="danger" variant="solid">Solid</Tag>
          <Tag type="danger" variant="outline">Outline</Tag>
        </div>
      </div>

      {/* Size & Round */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tagSizeRound')}</div>
        <div style={CARD.desc}>{t('demo.tagSizeRoundMobileDesc')}</div>
        <div style={CARD.body}>
          <Tag size="sm" type="primary">Small</Tag>
          <Tag size="md" type="primary">Medium</Tag>
          <Tag round type="primary">Capsule</Tag>
          <Tag round type="success">Capsule</Tag>
          <Tag size="sm" round type="danger">Small Capsule</Tag>
        </div>
      </div>

      {/* Closable */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tagClosable')}</div>
        <div style={CARD.desc}>{t('demo.tagClosableMobileDesc')}</div>
        <div style={CARD.body}>
          {isOpen('a') && <Tag closeable onClose={() => close('a')}>Closable</Tag>}
          {isOpen('b') && <Tag closeable type="primary" onClose={() => close('b')}>Tag 1</Tag>}
          {isOpen('c') && <Tag closeable type="success" onClose={() => close('c')}>Tag 2</Tag>}
          {isOpen('d') && <Tag closeable type="danger" onClose={() => close('d')}>Tag 3</Tag>}
        </div>
      </div>

      {/* Custom Color */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customColor')}</div>
        <div style={CARD.desc}>{t('demo.customColorDesc')}</div>
        <div style={CARD.body}>
          <Tag color="#6366f1">Indigo</Tag>
          <Tag color="#ec4899">Pink</Tag>
          <Tag color="#f59e0b">Amber</Tag>
          <Tag color="#10b981">Emerald</Tag>
        </div>
      </div>
    </MobilePreview>
  );
};
