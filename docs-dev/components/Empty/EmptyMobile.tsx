import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Empty } from '../../../src/components/Empty';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useEmptyTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const EmptyMobile = () => {
  const t = useT();
  const { propsTables } = useEmptyTableData();

  return (
    <MobilePreview title="Empty">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Presets */}
        <Card title={t('empty.demo.preset')}>
          <div style={{ display: 'flex', gap: '12px', 'justify-content': 'space-around' }}>
            <div style={{ flex: 1 }}><Empty description="No data" /></div>
            <div style={{ flex: 1 }}><Empty description="Network error" image="network" /></div>
            <div style={{ flex: 1 }}><Empty description="No results" image="search" /></div>
          </div>
        </Card>

        {/* Custom */}
        <Card title={t('empty.demo.custom')}>
          <Empty
            image={<div style={{ 'font-size': '3rem' }}>📭</div>}
            description="Your cart is empty"
          >
            <Button type="primary" size="sm">Go shopping</Button>
          </Empty>
        </Card>
      </div>
    </MobilePreview>
  );
};
