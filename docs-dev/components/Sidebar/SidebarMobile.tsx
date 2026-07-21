import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Sidebar } from '../../../src/components/Sidebar';
import { Card } from '../../../src/components/Card';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSidebarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SidebarMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSidebarTableData();
  const [active1, setActive1] = createSignal('form');
  const [active2, setActive2] = createSignal('form');
  const [active3, setActive3] = createSignal('form');

  const items = [
    { key: 'form', title: 'Form' },
    { key: 'item', title: 'FormItem' },
    { key: 'rule', title: 'FormRule' },
  ];

  return (
    <MobilePreview title="Sidebar">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('sidebar.demo.basic')} subtitle={t('sidebar.demoDesc.basic')}>
          <div style={{ display: 'flex', height: '220px', 'border-radius': '8px', overflow: 'hidden', border: '1px solid var(--sc-color-border, #e5e7eb)' }}>
            <Sidebar items={items} activeKey={active1()} onChange={setActive1} />
            <div style={{ flex: 1, padding: '16px', display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'font-size': '0.9rem', color: '#6b7280' }}>
              Selected: <strong style={{ 'margin-left': '6px', color: 'var(--sc-color-primary, #1677ff)' }}>{active1()}</strong>
            </div>
          </div>
        </Card>

        <Card title={t('sidebar.demo.jsx')} subtitle={t('sidebar.demoDesc.jsx')}>
          <div style={{ display: 'flex', height: '220px', 'border-radius': '8px', overflow: 'hidden', border: '1px solid var(--sc-color-border, #e5e7eb)' }}>
            <Sidebar
              items={[
                { key: 'form', title: <><span style={{ color: '#1677ff', 'margin-right': '4px' }}>📋</span> Form</> },
                { key: 'item', title: <><span style={{ color: '#22c55e', 'margin-right': '4px' }}>📝</span> FormItem</> },
                { key: 'rule', title: <><span style={{ color: '#f59e0b', 'margin-right': '4px' }}>✅</span> Rules</> },
              ]}
              activeKey={active2()} onChange={setActive2}
            />
            <div style={{ flex: 1, padding: '16px', display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'font-size': '0.9rem', color: '#6b7280' }}>
              Selected: <strong style={{ 'margin-left': '6px', color: 'var(--sc-color-primary, #1677ff)' }}>{active2()}</strong>
            </div>
          </div>
        </Card>

        <Card title={t('sidebar.demo.compact')} subtitle={t('sidebar.demoDesc.compact')}>
          <div style={{ display: 'flex', height: '220px', 'border-radius': '8px', overflow: 'hidden', border: '1px solid var(--sc-color-border, #e5e7eb)' }}>
            <Sidebar compact
              items={[
                { key: 'form', title: 'Form', icon: <span style={{ 'font-size': '1.1rem' }}>📋</span> },
                { key: 'item', title: 'Item', icon: <span style={{ 'font-size': '1.1rem' }}>📝</span> },
                { key: 'rule', title: 'Rules', icon: <span style={{ 'font-size': '1.1rem' }}>✅</span> },
              ]}
              activeKey={active3()} onChange={setActive3}
            />
            <div style={{ flex: 1, padding: '16px', display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'font-size': '0.9rem', color: '#6b7280' }}>
              Selected: <strong style={{ 'margin-left': '6px', color: 'var(--sc-color-primary, #1677ff)' }}>{active3()}</strong>
            </div>
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
