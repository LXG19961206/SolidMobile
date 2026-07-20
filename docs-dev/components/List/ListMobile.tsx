import { createSignal, For, type Component } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { List } from '../../../src/components/List';
import { Cell } from '../../../src/components/Cell';
import { Avatar } from '../../../src/components/Avatar';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useListTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

interface Item {
  id: number;
  name: string;
  desc: string;
  color: string;
}

const NAMES = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
const DESCS = ['PM', 'Frontend', 'Design', 'Backend', 'QA', 'Ops', 'Marketing', 'Data', 'Support', 'Arch'];
const COLORS = ['#1677ff', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

function genItems(start: number, n: number): Item[] {
  return Array.from({ length: n }, (_, i) => ({
    id: start + i + 1,
    name: NAMES[(start + i) % NAMES.length],
    desc: DESCS[(start + i) % DESCS.length],
    color: COLORS[(start + i) % COLORS.length],
  }));
}

export const ListMobile = () => {
  const t = useT();
  const { propsTables } = useListTableData();
  const staticItems = genItems(0, 5);

  const [finished, setFinished] = createSignal(false);
  const allItems = genItems(0, 25);
  let cursor = 0;
  const PAGE = 8;
  const onLoad = async (): Promise<Item[]> => {
    await new Promise((r) => setTimeout(r, 600));
    const batch = allItems.slice(cursor, cursor + PAGE);
    cursor += PAGE;
    if (cursor >= allItems.length) setFinished(true);
    return batch;
  };

  return (
    <MobilePreview title="List">
      <MobilePropsSheet propsTables={propsTables} />

      <style>{'.list-scroll::-webkit-scrollbar { width:4px; } .list-scroll::-webkit-scrollbar-thumb { background:var(--sc-color-border,#d1d5db); border-radius:2px; } .list-scroll::-webkit-scrollbar-track { background:transparent; } html.dark .list-scroll::-webkit-scrollbar-thumb { background:#475569; }'}</style>

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Static Data */}
        <Card title={t('list.demo.static')}>
          <List data={staticItems} finished>
            {(item) => (
              <Cell title={item.name} description={item.desc} icon={<Avatar size="sm" color={item.color} text={item.name[0]} />} />
            )}
          </List>
        </Card>

        {/* Auto Load */}
        <Card title={t('list.demo.autoload')}>
          <div class="list-scroll" style={{ height: '380px', overflow: 'auto', 'border-radius': '8px', border: '1px solid var(--sc-color-border, #e5e7eb)' }}>
            <List onLoad={onLoad} finished={finished()} loadMoreText={t('list.misc.loading')} finishedText={t('list.misc.noMore')}>
              {(item) => (
                <Cell title={item.name} description={item.desc} icon={<Avatar size="sm" color={item.color} text={item.name[0]} />} />
              )}
            </List>
          </div>
        </Card>

        {/* Virtual List */}
        <Card title={t('list.demo.virtual')}>
          <List virtual itemHeight={56} data={genItems(0, 1000)} finished
            style={{ height: '380px', 'border-radius': '8px', border: '1px solid var(--sc-color-border, #e5e7eb)' }}>
            {(item) => (
              <Cell title={`${item.id}. ${item.name}`} description={item.desc} icon={<Avatar size="sm" color={item.color} text={item.name[0]} />} />
            )}
          </List>
        </Card>

        {/* Empty */}
        <Card title={t('list.demo.empty')}>
          <List data={[]} empty="No records" finished>
            {(item: Item) => <span>{item.name}</span>}
          </List>
        </Card>

        {/* Pull-to-Refresh */}
        <Card title={t('list.demo.refresh')}>
          <List
            data={genItems(0, 15)}
            pullRefresh
            onRefresh={async () => { await new Promise(r => setTimeout(r, 1000)); }}
            style={{ height: '360px', 'border-radius': '8px', border: '1px solid var(--sc-color-border, #e5e7eb)' }}
          >
            {(item) => (
              <Cell title={item.name} description={item.desc} icon={<Avatar size="sm" color={item.color} text={item.name[0]} />} />
            )}
          </List>
        </Card>
      </div>
    </MobilePreview>
  );
};
