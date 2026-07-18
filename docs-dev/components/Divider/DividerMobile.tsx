import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Divider } from '../../../src/components/Divider';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useDividerTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const DividerMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useDividerTableData();

  return (
    <MobilePreview title="Divider">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Basic horizontal */}
        <Card title={t('divider.demo.horizontal')}>
          <div style={{ padding: '12px 0' }}>Content above</div>
          <Divider />
          <div style={{ padding: '12px 0' }}>Content below</div>
        </Card>

        {/* With text */}
        <Card title={t('divider.demo.text')}>
          <Divider text="I am a divider" />
          <div style={{ height: '16px' }} />
          <Divider text="Or like this" />
          <div style={{ height: '16px' }} />
          <Divider text="No more content" />
        </Card>

        {/* Dashed */}
        <Card title={t('divider.demo.dashed')}>
          <Divider dashed />
          <div style={{ height: '16px' }} />
          <Divider dashed text="Dashed text" />
        </Card>

        {/* Custom color & size */}
        <Card title={t('divider.demo.color')}>
          <Divider color="var(--sc-color-primary, #1677ff)" size={2} />
          <div style={{ height: '16px' }} />
          <Divider color="#ef4444" text="Red warning" size={2} />
          <div style={{ height: '16px' }} />
          <Divider color="#22c55e" dashed text="Green dashed" />
        </Card>

        {/* Vertical divider */}
        <Card title={t('divider.demo.vertical')}>
          <div style={{ display: 'flex', 'align-items': 'center', height: '40px', gap: '12px' }}>
            <span>Text One</span>
            <Divider direction="vertical" />
            <span>Text Two</span>
            <Divider direction="vertical" dashed color="var(--sc-color-primary, #1677ff)" />
            <span>Text Three</span>
            <Divider direction="vertical" color="#ef4444" size={2} />
            <span>Text Four</span>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
