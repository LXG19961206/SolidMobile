import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Tag } from '../../../src/components/Tag';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTagTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const row = { display: 'flex', 'flex-wrap': 'wrap' as const, gap: '8px', 'align-items': 'center' as const };

export const TagMobile = () => {
  const t = useT();
  const { propsTables } = useTagTableData();
  const [closed, setClosed] = createSignal(new Set<string>());
  const isOpen = (id: string) => !closed().has(id);
  const close = (id: string) => setClosed(prev => new Set([...prev, id]));

  return (
    <MobilePreview title="Tag">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Types */}
        <Card title={t('tag.demo.types')}>
          <div style={row}>
            <Tag type="primary">Primary</Tag>
            <Tag type="success">Success</Tag>
            <Tag type="warning">Warning</Tag>
            <Tag type="danger">Danger</Tag>
            <Tag type="info">Info</Tag>
          </div>
        </Card>

        {/* Variants */}
        <Card title={t('tag.demo.variant')}>
          <div style={row}>
            <Tag type="primary" variant="solid">Solid</Tag>
            <Tag type="primary" variant="outline">Outline</Tag>
            <Tag type="success" variant="solid">Solid</Tag>
            <Tag type="success" variant="outline">Outline</Tag>
            <Tag type="danger" variant="solid">Solid</Tag>
            <Tag type="danger" variant="outline">Outline</Tag>
          </div>
        </Card>

        {/* Size & Round */}
        <Card title={t('tag.demo.size')}>
          <div style={row}>
            <Tag size="sm" type="primary">Small</Tag>
            <Tag size="md" type="primary">Medium</Tag>
            <Tag round type="primary">Capsule</Tag>
            <Tag round type="success">Capsule</Tag>
            <Tag size="sm" round type="danger">Small Capsule</Tag>
          </div>
        </Card>

        {/* Closable */}
        <Card title={t('tag.demo.closeable')}>
          <div style={row}>
            {isOpen('a') && <Tag closeable onClose={() => close('a')}>Closable</Tag>}
            {isOpen('b') && <Tag closeable type="primary" onClose={() => close('b')}>Tag 1</Tag>}
            {isOpen('c') && <Tag closeable type="success" onClose={() => close('c')}>Tag 2</Tag>}
            {isOpen('d') && <Tag closeable type="danger" onClose={() => close('d')}>Tag 3</Tag>}
          </div>
        </Card>

        {/* Custom Color */}
        <Card title="Custom Color">
          <div style={row}>
            <Tag color="#6366f1">Indigo</Tag>
            <Tag color="#ec4899">Pink</Tag>
            <Tag color="#f59e0b">Amber</Tag>
            <Tag color="#10b981">Emerald</Tag>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
