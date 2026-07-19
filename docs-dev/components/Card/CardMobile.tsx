import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCardTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const DemoContent = () => (
  <div style={{ padding: '12px', color: '#6b7280', 'font-size': '0.85rem' }}>
    Some content inside the card.
  </div>
);

export const CardMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useCardTableData();

  return (
    <MobilePreview title="Card">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('card.demo.basic')} subtitle="Default shadow & border" divider>
          <DemoContent />
        </Card>
        <Card title={t('card.demo.noShadow')} subtitle="Flat style" shadow={false}>
          <DemoContent />
        </Card>
        <Card title={t('card.demo.noBorder')} subtitle="Borderless" border={false}>
          <DemoContent />
        </Card>
        <Card title={t('card.demo.customPadding')} subtitle="24px padding" padding={24}>
          <div style={{ color: '#6b7280', 'font-size': '0.85rem' }}>
            Extra-spacious card
          </div>
        </Card>
        {/* inset: parent Card provides the visual frame, inner Card(inset) is embedded */}
        <Card title={t('card.demo.inset')} subtitle={t('card.demoDesc.inset')} shadow={false}>
          <Card inset title="Shipping Info" subtitle="Recipient & address">
            <div style={{ color: '#6b7280', 'font-size': '0.85rem' }}>
              Name: Zhang San<br />
              Address: 123 Some Street
            </div>
          </Card>
        </Card>
      </div>
    </MobilePreview>
  );
};
