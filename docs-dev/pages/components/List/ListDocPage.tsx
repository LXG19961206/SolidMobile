import { createSignal, useContext, type Component } from 'solid-js';


import { useT } from '../../../doc-i18n';
import { List } from '../../../../src/components/List';
import { Cell } from '../../../../src/components/Cell';
import { SwipeCell } from '../../../../src/components/SwipeCell';
import { Toast } from '../../../../src/components/Toast';
import { Avatar } from '../../../../src/components/Avatar';
import { Tabs, Tab } from '../../../../src/components/Tabs';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import type { SwipeAction } from '../../../../src/components/SwipeCell';
import css from './ListDocPage.module.css';

const listProps: PropRow[] = [
  { name: 'data', type: 'I[]', default: '—', required: false, desc: 'componentProps.list.data' },
  { name: 'onLoad', type: '() => Promise<I[]>', default: '—', required: false, desc: 'componentProps.list.onLoad' },
  { name: 'finished', type: 'boolean', default: 'false', required: false, desc: 'componentProps.list.finished' },
  { name: 'children', type: '(item: I, index: number) => JSX.Element', default: '—', required: true, desc: 'componentProps.list.children' },
  { name: 'empty', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.list.empty' },
  { name: 'loadMoreText', type: 'string', default: "'Loading...'", required: false, desc: 'componentProps.list.loadMoreText' },
  { name: 'finishedText', type: 'string', default: "'No more'", required: false, desc: 'componentProps.list.finishedText' },
  { name: 'offset', type: 'number', default: '100', required: false, desc: 'componentProps.list.offset' },
  { name: 'virtual', type: 'boolean', default: 'false', required: false, desc: 'componentProps.list.virtual' },
  { name: 'itemHeight', type: 'number', default: '—', required: false, desc: 'componentProps.list.itemHeight' },
  { name: "pullRefresh", type: "boolean", default: "false", required: false, desc: 'componentProps.list.pullRefresh' },
  { name: "onRefresh", type: "() => Promise<void>", default: "—", required: false, desc: 'componentProps.list.onRefresh' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'demo', title: 'Examples' },
];

/* ── Data ── */

interface Item {
  id: number;
  name: string;
  desc: string;
  avatar: string;
}

const NAMES = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah', 'Ivan', 'Julia'];
const DESCS = ['Product Manager', 'Frontend Developer', 'Designer', 'Backend Developer', 'QA Engineer', 'Operations', 'Marketing Manager', 'Data Scientist', 'Support', 'Architect'];
const COLORS = ['#1677ff', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

function genItems(n: number): Item[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    name: NAMES[i % NAMES.length],
    desc: DESCS[i % DESCS.length],
    avatar: COLORS[i % COLORS.length],
  }));
}

/* ── Tab Components ── */

const ControlledTab: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const items = genItems(20);
  const delAction: SwipeAction[] = [
    { text: 'Delete', theme: 'danger', onClick: () => Toast.success('Deleted', { portalMount: phone?.() }) },
  ];
  return (
    <div class={css.demoList}>
      <List data={items.slice(0, 6)}>
        {(item: Item) => (
          <SwipeCell rightActions={delAction}>
            <Cell
              title={item.name}
              description={item.desc}
              icon={<Avatar size="sm" color={item.avatar} text={item.name[0]} />}
              clickable
              onClick={() => Toast.success(`Clicked ${item.name}`, { portalMount: phone?.() })}
            />
          </SwipeCell>
        )}
      </List>
    </div>
  );
};

const AutoloadTab: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const all = genItems(30);
  const [finished, setFinished] = createSignal(false);
  let cursor = 0;
  const PAGE = 8;

  const onLoad = async (): Promise<Item[]> => {
    await new Promise((r) => setTimeout(r, 600));
    const batch = all.slice(cursor, cursor + PAGE);
    cursor += PAGE;
    if (cursor >= all.length) setFinished(true);
    return batch;
  };

  const delAction: SwipeAction[] = [
    { text: 'Delete', theme: 'danger', onClick: () => Toast.success('Deleted', { portalMount: phone?.() }) },
    { text: 'Favorite', theme: 'warning', onClick: () => Toast.success('Favorited', { portalMount: phone?.() }) },
  ];

  return (
    <div class={css.demoList} style="height: 520px">
      <List onLoad={onLoad} finished={finished()} empty="No data" loadMoreText="Loading..." finishedText="— No more —">
        {(item: Item) => (
          <SwipeCell rightActions={delAction}>
            <Cell title={item.name} description={item.desc} icon={<Avatar size="sm" color={item.avatar} text={item.name[0]} />} />
          </SwipeCell>
        )}
      </List>
    </div>
  );
};

const VirtualTab: Component = () => {
  const all = genItems(1000);
  const [finished, setFinished] = createSignal(false);
  let cursor = 0;
  const PAGE = 20;

  const onLoad = async (): Promise<Item[]> => {
    await new Promise((r) => setTimeout(r, 400));
    const batch = all.slice(cursor, cursor + PAGE);
    cursor += PAGE;
    if (cursor >= all.length) setFinished(true);
    return batch;
  };

  return (
    <div class={css.demoList} style="height: 520px">
      <List virtual itemHeight={60} onLoad={onLoad} finished={finished()} empty="No data" loadMoreText="Loading..." finishedText="— All loaded —">
        {(item: Item) => (
          <div style={{ height: '60px', display: 'flex', 'align-items': 'center', padding: '0 1rem', gap: '12px', 'box-sizing': 'border-box' }}>
            <Avatar size="md" color={item.avatar} text={item.name[0]} />
            <div>
              <div style={{ 'font-weight': 500 }}>{item.id}. {item.name}</div>
              <div style={{ 'font-size': '0.8rem', color: '#999' }}>{item.desc}</div>
            </div>
            <span style={{ 'margin-left': 'auto', color: '#999', 'font-size': '0.8rem' }}>{item.id % 7 === 0 ? 'Today' : item.id % 5 === 0 ? 'Yesterday' : 'Older'}</span>
          </div>
        )}
      </List>
    </div>
  );
};

const EmptyTab: Component = () => (
  <div class={css.demoList}>
    <List data={[]} empty="No records">
      {(item: Item) => <Cell title={item.name} />}
    </List>
  </div>
);

/** 下拉刷新 */
const PullRefreshTab: Component = () => {
  const [items, setItems] = createSignal<string[]>(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));

  const handleRefresh = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    setItems(Array.from({ length: 20 }, (_, i) => `Item ${i + 1} (refreshed at ${Date.now().toString().slice(-5)})`));
  };

  return (
    <div class={css.demoList} style="height: 520px">
      <List data={items()} pullRefresh onRefresh={handleRefresh}>
        {(item: string) => <Cell title={item} />}
      </List>
    </div>
  );
};

/* ── Code Snippets ── */

const codes: Record<string, string> = {
  controlled: `<List data={items.slice(0, 6)}>
  {(item) => (
    <SwipeCell rightActions={[{ text: 'Delete', theme: 'danger' }]}>
      <Cell title={item.name} description={item.desc}
        icon={<Avatar size="sm" color={item.avatar} text={item.name[0]} />} />
    </SwipeCell>
  )}
</List>`,
  autoload: `<div style={{ height: '520px' }}>
  <List onLoad={onLoad} finished={finished()} finishedText="— No more —">
    {(item) => (
      <SwipeCell rightActions={actions}>
        <Cell title={item.name} description={item.desc}
          icon={<Avatar size="sm" color={item.avatar} text={item.name[0]} />} />
      </SwipeCell>
    )}
  </List>
</div>`,
  virtual: `<div style={{ height: '520px' }}>
  <List virtual itemHeight={60} onLoad={onLoad} finished={finished()}>
    {(item) => (
      <div style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '12px' }}>
        <Avatar size="md" color={item.avatar} text={item.name[0]} />
        <div>
          <div style={{ fontWeight: 500 }}>{item.id}. {item.name}</div>
          <div style={{ fontSize: '0.8rem', color: '#999' }}>{item.desc}</div>
        </div>
        <span style={{ marginLeft: 'auto', color: '#999' }}>Older</span>
      </div>
    )}
  </List>
</div>`,
  empty: `<List data={[]} empty="No records">
  {(item) => <Cell title={item.name} />}
</List>`,
  pullrefresh: `<List
  data={items()}
  pullRefresh
  onRefresh={handleRefresh}
  style={{ height: "520px" }}
>
  {(item) => <Cell title={item} />}
</List>`,
};

/* ── Main ── */

export const ListDocPage: Component = () => {
  const t = useT();
  const [activeTab, setActiveTab] = createSignal('controlled');

  return (
    <DocLayout>
      <div class={css.page}>
        <h1 class={css.h1}>List</h1>
        <p class={css.intro}>
          {t('componentIntro.ListIntro')}
        </p>

        <h2 id="props" class={css.h2}>{t('common.props')}</h2>
        <PropsTable rows={listProps} />

        <h2 id="demo" class={css.h2}>{t('demo.examples')}</h2>
        <DemoBlock
          title={t('demo.listExample')}
          desc={t('demoDesc.list_example')}
          code={codes[activeTab()]}
          hideTitle
          flush
        >
          <Tabs active={activeTab()} onChange={setActiveTab} style={{ 'margin-top': '8px' }}>
            <Tab title="Controlled" name="controlled"><ControlledTab /></Tab>
            <Tab title="Uncontrolled" name="autoload"><AutoloadTab /></Tab>
            <Tab title="Virtual List" name="virtual"><VirtualTab /></Tab>
            <Tab title="Empty Data" name="empty"><EmptyTab /></Tab>
            <Tab title={t('demo.refresh')} name="pullrefresh"><PullRefreshTab /></Tab>
          </Tabs>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
