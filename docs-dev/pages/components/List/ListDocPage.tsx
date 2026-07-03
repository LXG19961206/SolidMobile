import { createSignal, useContext, type Component } from 'solid-js';
import { List } from '../../../../src/components/List';
import { Cell } from '../../../../src/components/Cell';
import { SwipeCell } from '../../../../src/components/SwipeCell';
import { Toast } from '../../../../src/components/Toast';
import { Avatar } from '../../../../src/components/Avatar';
import { Tabs, Tab } from '../../../../src/components/Tabs';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import type { SwipeAction } from '../../../../src/components/SwipeCell';
import css from './ListDocPage.module.css';

const listProps: PropRow[] = [
  { name: 'data', type: 'I[]', default: '—', required: false, desc: '模式 1（受控）：外部管理的数据源。' },
  { name: 'onLoad', type: '() => Promise<I[]>', default: '—', required: false, desc: '模式 2（不受控）：触底时调用，返回值追加到列表。' },
  { name: 'finished', type: 'boolean', default: 'false', required: false, desc: '模式 2 是否已加载完成。' },
  { name: 'children', type: '(item: I, index: number) => JSX.Element', default: '—', required: true, desc: '渲染每一项的模板函数。' },
  { name: 'empty', type: 'string | JSX.Element', default: '—', required: false, desc: '空数据占位。' },
  { name: 'loadMoreText', type: 'string', default: "'加载中...'", required: false, desc: '加载中底部提示。' },
  { name: 'finishedText', type: 'string', default: "'没有更多了'", required: false, desc: '全部加载完成底部提示。' },
  { name: 'offset', type: 'number', default: '100', required: false, desc: '距底部多少 px 触发 onLoad。' },
  { name: 'virtual', type: 'boolean', default: 'false', required: false, desc: '开启虚拟列表。' },
  { name: 'itemHeight', type: 'number', default: '—', required: false, desc: '虚拟列表模式下每项的固定高度(px)。' },
  { name: "pullRefresh", type: "boolean", default: "false", required: false, desc: "开启下拉刷新，配合 onRefresh。" },
  { name: "onRefresh", type: "() => Promise<void>", default: "—", required: false, desc: "下拉刷新回调。" },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'demo', title: '示例' },
];

/* ── Data ── */

interface Item {
  id: number;
  name: string;
  desc: string;
  avatar: string;
}

const NAMES = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '钱一', '陈二'];
const DESCS = ['产品经理', '前端工程师', '设计师', '后端工程师', '测试工程师', '运营专员', '市场经理', '数据科学家', '技术支持', '架构师'];
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
    { text: '删除', theme: 'danger', onClick: () => Toast.success('删除', { portalMount: phone?.() }) },
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
              onClick={() => Toast.success(`点击了 ${item.name}`, { portalMount: phone?.() })}
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
    { text: '删除', theme: 'danger', onClick: () => Toast.success('删除', { portalMount: phone?.() }) },
    { text: '收藏', theme: 'warning', onClick: () => Toast.success('收藏', { portalMount: phone?.() }) },
  ];

  return (
    <div class={css.demoList} style="height: 520px">
      <List onLoad={onLoad} finished={finished()} empty="暂无数据" loadMoreText="加载中..." finishedText="— 没有更多了 —">
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
      <List virtual itemHeight={60} onLoad={onLoad} finished={finished()} empty="暂无数据" loadMoreText="加载中..." finishedText="— 全部加载完成 —">
        {(item: Item) => (
          <div style={{ height: '60px', display: 'flex', 'align-items': 'center', padding: '0 1rem', gap: '12px', 'box-sizing': 'border-box' }}>
            <Avatar size="md" color={item.avatar} text={item.name[0]} />
            <div>
              <div style={{ 'font-weight': 500 }}>{item.id}. {item.name}</div>
              <div style={{ 'font-size': '0.8rem', color: '#999' }}>{item.desc}</div>
            </div>
            <span style={{ 'margin-left': 'auto', color: '#999', 'font-size': '0.8rem' }}>{item.id % 7 === 0 ? '今天' : item.id % 5 === 0 ? '昨天' : '更早'}</span>
          </div>
        )}
      </List>
    </div>
  );
};

const EmptyTab: Component = () => (
  <div class={css.demoList}>
    <List data={[]} empty="暂无记录">
      {(item: Item) => <Cell title={item.name} />}
    </List>
  </div>
);

/** 下拉刷新 */
const PullRefreshTab: Component = () => {
  const [items, setItems] = createSignal<string[]>(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));

  const handleRefresh = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    setItems(Array.from({ length: 20 }, (_, i) => `Item ${i + 1} (刷新于 ${Date.now().toString().slice(-5)})`));
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
    <SwipeCell rightActions={[{ text: '删除', theme: 'danger' }]}>
      <Cell title={item.name} description={item.desc}
        icon={<Avatar size="sm" color={item.avatar} text={item.name[0]} />} />
    </SwipeCell>
  )}
</List>`,
  autoload: `<div style={{ height: '520px' }}>
  <List onLoad={onLoad} finished={finished()} finishedText="— 没有更多了 —">
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
        <span style={{ marginLeft: 'auto', color: '#999' }}>更早</span>
      </div>
    )}
  </List>
</div>`,
  empty: `<List data={[]} empty="暂无记录">
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
  const [activeTab, setActiveTab] = createSignal('controlled');

  return (
    <DocLayout>
      <div class={css.page}>
        <h1 class={css.h1}>List 列表</h1>
        <p class={css.intro}>
          滚动加载列表组件。支持受控（data）和不受控（onLoad + finished）两种数据模式，
          可通过 virtual 开启虚拟列表，pullRefresh 开启下拉刷新。
        </p>

        <h2 id="props" class={css.h2}>属性 / Props</h2>
        <PropsTable rows={listProps} />

        <h2 id="demo" class={css.h2}>示例</h2>
        <DemoBlock
          title="List 使用示例"
          desc="切换 Tab 查看不同模式。每个 Tab 独立管理数据源，互不干扰。"
          code={codes[activeTab()]}
          hideTitle
          flush
        >
          <Tabs active={activeTab()} onChange={setActiveTab} style={{ 'margin-top': '8px' }}>
            <Tab title="受控" name="controlled"><ControlledTab /></Tab>
            <Tab title="不受控" name="autoload"><AutoloadTab /></Tab>
            <Tab title="虚拟列表" name="virtual"><VirtualTab /></Tab>
            <Tab title="空数据" name="empty"><EmptyTab /></Tab>
            <Tab title="下拉刷新" name="pullrefresh"><PullRefreshTab /></Tab>
          </Tabs>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
