import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { PullRefresh } from '../../../src/components/PullRefresh';
import { List } from '../../../src/components/List';
import { Cell } from '../../../src/components/Cell';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { usePullRefreshTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

async function mockRefresh(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1200));
}

export const PullRefreshMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = usePullRefreshTableData();
  const [count, setCount] = createSignal(0);
  const [items, setItems] = createSignal<string[]>(Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`));

  async function handleListRefresh() {
    await mockRefresh();
    setItems(Array.from({ length: 12 }, (_, i) => `Item ${i + 1} ${Date.now().toString().slice(-4)}`));
  }

  return (
    <MobilePreview title="PullRefresh">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Basic */}
        <Card title={t('pullrefresh.demo.basic')}>
          <PullRefresh onRefresh={async () => { await mockRefresh(); setCount(c => c + 1); }}>
            <div style={{ padding: '80px 16px', 'text-align': 'center', color: 'var(--sc-color-text-secondary, #969799)', 'font-size': '0.8rem' }}>
              <div style={{ 'font-size': '0.9rem', color: 'var(--sc-color-text, #323233)', 'margin-bottom': '8px' }}>Pull down to refresh</div>
              <div>Refreshed: {count()} times</div>
            </div>
          </PullRefresh>
        </Card>

        {/* Custom Text */}
        <Card title={t('pullrefresh.demo.customText')}>
          <PullRefresh
            onRefresh={mockRefresh}
            pullingText="Pull harder..."
            loosingText="Release to refresh"
            loadingText="Loading..."
            successText="Done!"
          >
            <div style={{ padding: '80px 16px', 'text-align': 'center', color: 'var(--sc-color-text, #323233)', 'font-size': '0.9rem' }}>
              Custom status text
            </div>
          </PullRefresh>
        </Card>

        {/* With List */}
        <Card title={t('pullrefresh.demo.withList')}>
          <List data={items()} pullRefresh onRefresh={handleListRefresh} style={{ height: '360px', 'border-radius': '8px', border: '1px solid var(--sc-color-border, #e5e7eb)' }}>
              {(item) => <Cell title={item as string} />}
          </List>
        </Card>
      </div>
    </MobilePreview>
  );
};
