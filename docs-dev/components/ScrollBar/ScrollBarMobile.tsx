import { useT, registerLocale } from '../../doc-i18n';
import { ScrollBar } from '../../../src/components/ScrollBar';
import { List } from '../../../src/components/List';
import { Cell } from '../../../src/components/Cell';
import { Avatar } from '../../../src/components/Avatar';
import { Card } from '../../../src/components/Card';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useScrollBarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const genItems = (start: number, count: number) =>
  Array.from({ length: count }, (_, i) => {
    const id = start + i + 1;
    return { id, name: `Item ${id}`, desc: `Description for item ${id}`, color: `hsl(${id * 37 % 360}, 70%, 65%)` };
  });

const ListContent = () => (
  <List virtual itemHeight={56} data={genItems(0, 1000)} finished>
    {(item: any) => <Cell title={`${item.id}. ${item.name}`} description={item.desc} icon={<Avatar size="sm" color={item.color} text={item.name[0]} />} />}
  </List>
);

export const ScrollBarMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useScrollBarTableData();

  return (
    <MobilePreview title="ScrollBar">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('scrollbar.demo.basic')} subtitle={t('scrollbar.demoDesc.basic')}>
          <ScrollBar style={{ height: '200px', border: '1px solid var(--sc-color-border, #e5e7eb)', 'border-radius': '8px', padding: '8px' }}>
            <div style={{ 'font-size': '0.85rem', 'line-height': 2.5, color: '#6b7280' }}>
              {Array.from({ length: 30 }, (_, i) => <div>Line {i + 1} — this is some long content to demonstrate the custom scrollbar</div>)}
            </div>
          </ScrollBar>
        </Card>

        <Card title={t('scrollbar.demo.color')} subtitle={t('scrollbar.demoDesc.color')}>
          <ScrollBar color="#1677ff" width={8} style={{ height: '200px', border: '1px solid var(--sc-color-border, #e5e7eb)', 'border-radius': '8px', padding: '8px' }}>
            <div style={{ 'font-size': '0.85rem', 'line-height': 2.5, color: '#6b7280' }}>
              {Array.from({ length: 30 }, (_, i) => <div>Blue scrollbar — item {i + 1}</div>)}
            </div>
          </ScrollBar>
        </Card>

        <Card title={t('scrollbar.demo.width')} subtitle={t('scrollbar.demoDesc.width')}>
          <ScrollBar width={4} style={{ height: '200px', border: '1px solid var(--sc-color-border, #e5e7eb)', 'border-radius': '8px', padding: '8px' }}>
            <div style={{ 'font-size': '0.85rem', 'line-height': 2.5, color: '#6b7280' }}>
              {Array.from({ length: 30 }, (_, i) => <div>Thinner 4px scrollbar — item {i + 1}</div>)}
            </div>
          </ScrollBar>
        </Card>

        <Card title={t('scrollbar.demo.list')} subtitle={t('scrollbar.demoDesc.list')}>
          <ScrollBar style={{ height: '380px', border: '1px solid var(--sc-color-border, #e5e7eb)', 'border-radius': '8px' }}>
            <ListContent />
          </ScrollBar>
        </Card>
      </div>
    </MobilePreview>
  );
};
