import { createSignal, type Component } from 'solid-js';
import { PullRefresh } from '../../../../src/components/PullRefresh';
import { List } from "../../../../src/components/List";
import { Cell } from "../../../../src/components/Cell";
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';
import { useT } from '../../../doc-i18n';

/* ── Helper: simulate async refresh ── */

async function mockRefresh(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1200));
}

const pullRefreshProps: PropRow[] = [
  { name: 'loading', type: 'boolean', default: '—', required: false, desc: 'componentProps.pullrefresh.loading' },
  { name: 'onRefresh', type: '() => void | Promise<void>', default: '—', required: false, desc: 'componentProps.pullrefresh.onRefresh' },
  { name: 'pullDistance', type: 'number', default: '80', required: false, desc: 'componentProps.pullrefresh.pullDistance' },
  { name: 'headHeight', type: 'number', default: '60', required: false, desc: 'componentProps.pullrefresh.headHeight' },
  { name: 'successDuration', type: 'number', default: '500', required: false, desc: 'componentProps.pullrefresh.successDuration' },
  { name: 'animationDuration', type: 'number', default: '300', required: false, desc: 'componentProps.pullrefresh.animationDuration' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.pullrefresh.disabled' },
  { name: 'pullingText', type: 'string', default: "'Pull to Refresh'", required: false, desc: 'componentProps.pullrefresh.pullingText' },
  { name: 'loosingText', type: 'string', default: "'Release to Refresh'", required: false, desc: 'componentProps.pullrefresh.loosingText' },
  { name: 'loadingText', type: 'string', default: "'Refreshing...'", required: false, desc: 'componentProps.pullrefresh.loadingText' },
  { name: 'successText', type: 'string', default: "'Refresh successful'", required: false, desc: 'componentProps.pullrefresh.successText' },
];

export const PullRefreshDocPage: Component = () => {
  const t = useT();
  const [count, setCount] = createSignal(0);
  const [items, setItems] = createSignal<string[]>(Array.from({length: 20}, (_, i) => `Item ${i + 1}`));

  async function handleListRefresh() {
    await new Promise(r => setTimeout(r, 1200));
    setItems(Array.from({length: 20}, (_, i) => `Item ${i + 1} (刷新于 ${Date.now()})`));
  }

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>PullRefresh Pull to Refresh</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t('componentIntro.PullRefreshIntro')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
        <PropsTable rows={pullRefreshProps} />

        <DemoBlock title={t('demo.basic')} desc={t('demo.basicDesc')} code={`import { PullRefresh } from 'solid-mobile';\n\nfunction Page() {\n  const [list, setList] = createSignal(0);\n\n  return (\n    <PullRefresh\n      onRefresh={async () => {\n        await fetch('/api/refresh');\n        setList(c => c + 1);\n      }}\n    >\n      <List>\n        <Cell>Item {list()}</Cell>\n      </List>\n    </PullRefresh>\n  );\n}`}>
          <div style={{ background: '#fff', 'border-radius': '8px', padding: '12px', 'text-align': 'center', color: '#969799', 'font-size': '0.8rem' }}>
            <PullRefresh onRefresh={mockRefresh}>
              <div style={{ padding: '40px 0' }}>
                <div style={{ 'font-size': '0.9rem', color: '#323233', 'margin-bottom': '8px' }}>Pull down</div>
                <div style={{ 'font-size': '0.75rem' }}>Refresh count: {count()}</div>
              </div>
            </PullRefresh>
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.pullCustomText')} desc={t('demoDesc.pullrefresh_custom_text')} code={`<PullRefresh\n  pullingText="再用力一点"\n  loosingText="Release to refresh"\n  loadingText="Loading..."\n  successText="加载完成"\n/>`}>
          <div style={{ background: '#fff', 'border-radius': '8px', padding: '12px', 'text-align': 'center', color: '#969799', 'font-size': '0.8rem' }}>
            <PullRefresh
              onRefresh={mockRefresh}
              pullingText="再用力一点"
              loosingText="Release to refresh"
              loadingText="Loading..."
              successText="加载完成"
            >
              <div style={{ padding: '40px 0', color: '#323233' }}>
                自定义文案Pull to Refresh
              </div>
            </PullRefresh>
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.pullWithList')} desc={t('demoDesc.pullrefresh_with_list')} code={`import { List } from "solid-mobile";

function Page() {
  const [items, setItems] = createSignal(["Item 1", "Item 2"]);

  return (
    <List
      data={items()}
      pullRefresh
      onRefresh={async () => {
        const res = await fetch("/api/list");
        setItems(await res.json());
      }}
    >
      {(item) => <Cell>{item}</Cell>}
    </List>
  );
}`}>
          <div style={{ background: "#fff", "border-radius": "8px", height: "260px", overflow: "hidden" }}>
            <List
              data={items()}
              pullRefresh
              onRefresh={handleListRefresh}
              style={{ height: "260px" }}
            >
              {(item) => <Cell>{item}</Cell>}
            </List>
          </div>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
