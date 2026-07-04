import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface TabsMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Tabs, Tab } from '../../../src/components/Tabs';
import { Icon } from '../../../src/components/Icon';

const propsData = [
  { name: 'active', type: 'number | string', desc: 'componentProps.tabs.active' },
  { name: 'defaultActive', type: 'number | string', desc: 'componentProps.tabs.defaultActive' },
  { name: 'onChange', type: '(name) => void', desc: 'componentProps.tabs.onChange' },
  { name: 'type', type: "'line' | 'card'", desc: 'componentProps.tabs.type' },
  { name: 'color', type: 'string', desc: 'componentProps.tabs.color' },
  { name: 'background', type: 'string', desc: 'componentProps.tabs.background' },
  { name: 'animated', type: 'boolean', desc: 'componentProps.tabs.animated' },
  { name: 'border', type: 'boolean', desc: 'componentProps.tabs.border' },
  { name: 'sticky', type: 'boolean', desc: 'componentProps.tabs.sticky' },
  { name: 'swipeable', type: 'boolean', desc: 'componentProps.tabs.swipeable' },
  { name: 'lazyRender', type: 'boolean', desc: 'componentProps.tabs.lazyRender' },
  { name: 'beforeChange', type: '(name) => boolean', desc: 'componentProps.tabs.beforeChange' },
  { name: 'titleActiveColor', type: 'string', desc: 'componentProps.tabs.titleActiveColor' },
  { name: 'titleInactiveColor', type: 'string', desc: 'componentProps.tabs.titleInactiveColor' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const TabsMobile: Component<TabsMobileProps> = (props) => {
  const t = useT();
  const [active1, setActive1] = createSignal(0);
  const [active2, setActive2] = createSignal(0);
  const [active3, setActive3] = createSignal('a');

  return (
    <MobilePreview title="Tabs 标签页" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 line 模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>line 模式（默认）</div>
        <div style={CARD.desc}>底部线条指示器跟随切换</div>
        <div style={CARD.body}>
          <Tabs active={active1()} onChange={setActive1}>
            <Tab name={0} title="标签 1">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>内容 1</div>
            </Tab>
            <Tab name={1} title="标签 2">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>内容 2</div>
            </Tab>
            <Tab name={2} title="标签 3">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>内容 3</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* card 模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>card 模式</div>
        <div style={CARD.desc}>卡片式标签，选中项高亮</div>
        <div style={CARD.body}>
          <Tabs type="card" active={active2()} onChange={setActive2}>
            <Tab name={0} title="选项 A">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>卡片 A 内容</div>
            </Tab>
            <Tab name={1} title="选项 B">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>卡片 B 内容</div>
            </Tab>
            <Tab name={2} title="选项 C">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>卡片 C 内容</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* 自定义颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义颜色 & 边框</div>
        <div style={CARD.desc}>color / titleActiveColor / border 等外观定制</div>
        <div style={CARD.body}>
          <Tabs active={active3()} onChange={setActive3} color="#22c55e" border>
            <Tab name="a" title="全部">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>全部订单</div>
            </Tab>
            <Tab name="b" title="待付款">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>待付款订单</div>
            </Tab>
            <Tab name="c" title="已完成">
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>已完成订单</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* 图标标题 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>图标标题</div>
        <div style={CARD.desc}>title 支持 JSX，可以嵌入 Icon 或任意元素</div>
        <div style={CARD.body}>
          <Tabs defaultActive={0}>
            <Tab name={0} title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '4px' }}><Icon name="home" size={16} /> 首页</span>}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>首页内容</div>
            </Tab>
            <Tab name={1} title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '4px' }}><Icon name="heart" size={16} /> 收藏</span>}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>收藏内容</div>
            </Tab>
            <Tab name={2} title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '4px' }}><Icon name="user" size={16} /> 我的</span>}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>个人中心</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用选项</div>
        <div style={CARD.desc}>Tab 设置 disabled 后不可点击</div>
        <div style={CARD.body}>
          <Tabs defaultActive={0}>
            <Tab name={0} title="正常" />
            <Tab name={1} title="禁用" disabled />
            <Tab name={2} title="正常" />
          </Tabs>
        </div>
      </div>
    </MobilePreview>
  );
};
