import { createSignal, For, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface ListMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { List } from '../../../src/components/List';
import { Cell } from '../../../src/components/Cell';
import { Button } from '../../../src/components/Button';

const propsData = [
  { name: 'data', type: 'I[]', desc: '受控模式：外部数据源' },
  { name: 'onLoad', type: '() => Promise<I[]>', desc: '不受控模式：触底加载回调' },
  { name: 'finished', type: 'boolean', desc: '是否加载完成' },
  { name: 'offset', type: 'number', desc: '距底部触发距离(px)，默认 100' },
  { name: 'empty', type: 'string | JSX.Element', desc: '空数据占位' },
  { name: 'loadMoreText', type: 'string', desc: '加载中底部文字' },
  { name: 'finishedText', type: 'string', desc: '加载完成底部文字' },
  { name: 'errorText', type: 'string', desc: '加载失败底部文字' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

let counter = 0;
const genItem = () => {
  counter++;
  return { id: counter, text: `列表项 #${counter}`, desc: `这是第 ${counter} 条数据的描述信息` };
};

const ITEMS = Array.from({ length: 3 }, genItem);

export const ListMobile: Component<ListMobileProps> = (props) => {
  const [items, setItems] = createSignal(ITEMS);
  const [finished, setFinished] = createSignal(false);

  const loadMore = async () => {
    // simulate async
    await new Promise(r => setTimeout(r, 1000));
    if (items().length >= 10) {
      setFinished(true);
      return [];
    }
    const more = [genItem(), genItem()];
    setItems([...items(), ...more]);
    return more;
  };

  return (
    <MobilePreview title="List 列表" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 静态数据 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>静态数据 data</div>
        <div style={CARD.desc}>受控模式：直接传入 data 数组</div>
        <div style={CARD.body}>
          <List
            data={[
              { id: 1, name: '项目 Alpha' },
              { id: 2, name: '项目 Beta' },
              { id: 3, name: '项目 Gamma' },
            ]}
            finished
          >
            {(item) => (
              <Cell title={item.name} clickable onClick={() => {}} />
            )}
          </List>
        </div>
      </div>

      {/* 触底加载 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>触底加载 onLoad</div>
        <div style={CARD.desc}>滚动到底部自动加载更多（最多 10 条）</div>
        <div style={CARD.body}>
          <List
            onLoad={loadMore}
            finished={finished()}
            loadMoreText="加载中..."
            finishedText="— 没有更多了 —"
          >
            {(item) => (
              <div style={{ padding: '12px 0', 'border-bottom': '1px solid #f3f4f6' }}>
                <div style={{ 'font-size': '0.9rem', color: '#374151' }}>{item.text}</div>
                <div style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>{item.desc}</div>
              </div>
            )}
          </List>
        </div>
      </div>

      {/* 空数据 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>空数据状态</div>
        <div style={CARD.desc}>data 为空数组时显示 empty 占位</div>
        <div style={CARD.body}>
          <List data={[]} finished>
            {() => <div />}
          </List>
        </div>
      </div>
    </MobilePreview>
  );
};
