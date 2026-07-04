import { createSignal, For, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface ListMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { List } from '../../../src/components/List';
import { Cell } from '../../../src/components/Cell';
import { Avatar } from '../../../src/components/Avatar';
import { useT } from '../../doc-i18n';

const propsData = [
  { name: 'data', type: 'I[]', desc: '受控模式：外部管理的数据源' },
  { name: 'onLoad', type: '() => Promise<I[]>', desc: '不受控模式：触底加载回调' },
  { name: 'finished', type: 'boolean', desc: '是否已全部加载完成' },
  { name: 'offset', type: 'number', desc: '距底部触发距离(px)，默认 100' },
  { name: 'empty', type: 'string | JSX.Element', desc: '空数据占位' },
  { name: 'loadMoreText', type: 'string', desc: '加载中底部提示' },
  { name: 'finishedText', type: 'string', desc: '加载完成底部提示' },
  { name: 'virtual', type: 'boolean', desc: '开启虚拟列表' },
  { name: 'itemHeight', type: 'number', desc: '虚拟列表每项高度(px)' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

/* ── Data ── */

interface ListItem {
  id: number;
  name: string;
  desc: string;
  color: string;
}

const NAMES = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '钱一', '陈二'];
const DESCS = ['产品经理', '前端工程师', '设计师', '后端工程师', '测试', '运营', '市场', '数据', '技术支持', '架构师'];
const COLORS = ['#1677ff', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

function genItems(start: number, n: number): ListItem[] {
  return Array.from({ length: n }, (_, i) => ({
    id: start + i + 1,
    name: NAMES[(start + i) % NAMES.length],
    desc: DESCS[(start + i) % DESCS.length],
    color: COLORS[(start + i) % COLORS.length],
  }));
}

export const ListMobile: Component<ListMobileProps> = (props) => {
  const t = useT();
  /* ── 静态数据 ── */
  const staticItems = genItems(0, 5);

  /* ── 触底加载 ── */
  const allItems = genItems(0, 25);
  const [finished, setFinished] = createSignal(false);
  let cursor = 0;
  const PAGE = 8;

  const onLoad = async (): Promise<ListItem[]> => {
    await new Promise((r) => setTimeout(r, 600));
    const batch = allItems.slice(cursor, cursor + PAGE);
    cursor += PAGE;
    if (cursor >= allItems.length) setFinished(true);
    return batch;
  };

  return (
    <MobilePreview title="List 列表" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 静态数据 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>静态数据 data</div>
        <div style={CARD.desc}>受控模式：直接传入 data 数组，组件不管理数据源</div>
        <div style={CARD.body}>
          <List data={staticItems} finished>
            {(item) => (
              <Cell
                title={item.name}
                description={item.desc}
                icon={<Avatar size="sm" color={item.color} text={item.name[0]} />}
                clickable
                onClick={() => {}}
              />
            )}
          </List>
        </div>
      </div>

      {/* 触底加载 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>触底加载 onLoad</div>
        <div style={CARD.desc}>固定高度容器内滚动到底部自动加载更多（最多 25 条，每次 8 条）</div>
        <div style={CARD.body}>
          <div style={{
            height: '380px', overflow: 'auto' as const,
            '-webkit-overflow-scrolling': 'touch',
            border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px',
          }}>
            <List
              onLoad={onLoad}
              finished={finished()}
              loadMoreText="加载中..."
              finishedText="— 没有更多了 —"
            >
              {(item) => (
                <Cell
                  title={item.name}
                  description={item.desc}
                  icon={<Avatar size="sm" color={item.color} text={item.name[0]} />}
                />
              )}
            </List>
          </div>
        </div>
      </div>

      {/* 虚拟列表 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>虚拟列表 virtual</div>
        <div style={CARD.desc}>itemHeight=60，1000 条数据只渲染可视区域的 DOM 节点</div>
        <div style={CARD.body}>
          <div style={{
            height: '380px', overflow: 'auto' as const,
            '-webkit-overflow-scrolling': 'touch',
            border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px',
          }}>
            <List
              virtual
              itemHeight={60}
              data={genItems(0, 1000)}
              finished
            >
              {(item) => (
                <div style={{
                  height: '60px', display: 'flex' as const, 'align-items': 'center' as const,
                  gap: '12px', padding: '0 12px', 'box-sizing': 'border-box' as const,
                  'border-bottom': '1px solid #f3f4f6',
                }}>
                  <Avatar size="md" color={item.color} text={item.name[0]} />
                  <div>
                    <div style={{ 'font-weight': 500, 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>{item.id}. {item.name}</div>
                    <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{item.desc}</div>
                  </div>
                  <span style={{ 'margin-left': 'auto', color: 'var(--sc-doc-card-muted, #9ca3af)', 'font-size': '0.7rem' }}>ID: {item.id}</span>
                </div>
              )}
            </List>
          </div>
        </div>
      </div>

      {/* 空数据 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>空数据状态</div>
        <div style={CARD.desc}>data 为空数组时展示 empty 占位内容</div>
        <div style={CARD.body}>
          <List data={[]} empty="暂无记录" finished>
            {(item) => <Cell title={(item as ListItem).name} />}
          </List>
        </div>
      </div>
    </MobilePreview>
  );
};
