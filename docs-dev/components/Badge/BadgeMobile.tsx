import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Badge } from '../../../src/components/Badge';
import { Avatar } from '../../../src/components/Avatar';
import { Button } from '../../../src/components/Button';
import { Tabs, Tab } from '../../../src/components/Tabs';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useBadgeTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const AVATAR_URL = '/avatar-demo.svg';
const row = { display: 'flex', 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const };

export const BadgeMobile = () => {
  const t = useT();
  const { propsTables } = useBadgeTableData();

  return (
    <MobilePreview title="Badge">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* With Avatar */}
        <Card title={t('badge.demo.withAvatar')}>
          <div style={{ ...row, gap: '20px' }}>
            <Badge content={5}><Avatar src={AVATAR_URL} size="lg" /></Badge>
            <Badge content={99} max={99}><Avatar src={AVATAR_URL} size="lg" /></Badge>
            <Badge dot><Avatar src={AVATAR_URL} size="lg" /></Badge>
            <Badge content={120} max={99} color="#22c55e"><Avatar src={AVATAR_URL} size="xl" /></Badge>
          </div>
        </Card>

        {/* With Button */}
        <Card title={t('badge.demo.withButton')}>
          <div style={row}>
            <Badge content={3}><Button size="sm">Messages</Button></Badge>
            <Badge content={8}><Button size="sm" variant="outline">Orders</Button></Badge>
            <Badge dot><Button size="sm">System</Button></Badge>
          </div>
        </Card>

        {/* With Tabs */}
        <Card title={t('badge.demo.withTab')}>
          <Tabs>
            <Tab name="all" title={<span style={{ display: 'flex', 'align-items': 'center', gap: '6px' }}>All <Badge content={12} /></span>} />
            <Tab name="pending" title={<span style={{ display: 'flex', 'align-items': 'center', gap: '6px' }}>Pending <Badge dot /></span>} />
            <Tab name="done" title={<span style={{ display: 'flex', 'align-items': 'center', gap: '6px' }}>Done <Badge content={99} max={99} /></span>} />
          </Tabs>
        </Card>

        {/* Position & Color */}
        <Card title={t('badge.demo.position')}>
          <div style={{ display: 'flex', 'flex-wrap': 'wrap', 'align-items': 'center', gap: '32px', padding: '12px 0' }}>
            <Badge content="TR" position="top-right" color="var(--sc-color-primary, #1677ff)">
              <div style={{ width: '44px', height: '44px', background: 'var(--sc-color-background-secondary, #e5e7eb)', 'border-radius': '10px' }} />
            </Badge>
            <Badge content="TL" position="top-left" color="#22c55e">
              <div style={{ width: '44px', height: '44px', background: 'var(--sc-color-background-secondary, #e5e7eb)', 'border-radius': '10px' }} />
            </Badge>
            <Badge content="BR" position="bottom-right" color="#f59e0b">
              <div style={{ width: '44px', height: '44px', background: 'var(--sc-color-background-secondary, #e5e7eb)', 'border-radius': '10px' }} />
            </Badge>
            <Badge content="BL" position="bottom-left" color="#ef4444">
              <div style={{ width: '44px', height: '44px', background: 'var(--sc-color-background-secondary, #e5e7eb)', 'border-radius': '10px' }} />
            </Badge>
          </div>
        </Card>

        {/* Standalone */}
        <Card title={t('badge.demo.standalone')}>
          <div style={{ ...row, 'font-size': '0.85rem' }}>
            <span>New <Badge content={99} /></span>
            <span><Badge dot /> Online</span>
            <span>Done <Badge content="✓" color="#22c55e" /></span>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
