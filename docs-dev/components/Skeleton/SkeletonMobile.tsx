import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Skeleton } from '../../../src/components/Skeleton';
import { Switch } from '../../../src/components/Switch';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSkeletonTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SkeletonMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSkeletonTableData();
  const [loading, setLoading] = createSignal(true);

  return (
    <MobilePreview title="Skeleton">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Basic */}
        <Card title={t('skeleton.demo.basic')}>
          <Skeleton loading={loading()} rows={2}>
            <div style={{ padding: '8px 0', 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>
              Content loaded! The skeleton placeholder is gone.
            </div>
          </Skeleton>
          <div style={{ display: 'flex', 'align-items': 'center', gap: '10px', 'margin-top': '10px' }}>
            <Switch checked={loading()} onChange={setLoading} />
            <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>
              {loading() ? 'Skeleton visible' : 'Content visible'}
            </span>
          </div>
        </Card>

        {/* Animated */}
        <Card title={t('skeleton.demo.animated')}>
          <Skeleton loading animated rows={3} />
        </Card>

        {/* Multiple rows */}
        <Card title={t('skeleton.demo.rows')}>
          <Skeleton loading rows={5} />
        </Card>

        {/* Shapes */}
        <Card title={t('skeleton.demo.shapes')}>
          <div style={{ display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
            <Skeleton loading shape="round" />
            <Skeleton loading shape="square" />
            <Skeleton loading shape="circle" width={48} height={48} />
          </div>
        </Card>

        {/* Sizes */}
        <Card title={t('skeleton.demo.sizes')}>
          <div style={{ display: 'flex', 'flex-direction': 'column', gap: '8px' }}>
            <Skeleton loading size="small" />
            <Skeleton loading size="normal" />
            <Skeleton loading size="large" />
          </div>
        </Card>

        {/* Custom size */}
        <Card title={t('skeleton.demo.custom')}>
          <Skeleton loading width="100%" height={24} rows={2} animated />
        </Card>
      </div>
    </MobilePreview>
  );
};
