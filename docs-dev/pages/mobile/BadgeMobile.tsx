import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface BadgeMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Badge } from '../../../src/components/Badge';
import { Avatar } from '../../../src/components/Avatar';
import { Button } from '../../../src/components/Button';
import { Tabs, Tab } from '../../../src/components/Tabs';
import { useT } from '../../doc-i18n';
import { Cell, CellGroup } from '../../../src/components/Cell';

const propsData = [
  { name: 'content', type: 'string | number', desc: '徽标内容，数字超出 max 时显示 max+' },
  { name: 'dot', type: 'boolean', desc: '仅显示小红点，忽略 content' },
  { name: 'max', type: 'number', desc: '数字上限，如 99 → "99+"' },
  { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", desc: '位置，默认 top-right' },
  { name: 'color', type: 'string', desc: '自定义背景色' },
  { name: 'children', type: 'JSX.Element', desc: '包裹的子元素，不传则为独立模式' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const },
};

const AVATAR_URL = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix';

export const BadgeMobile: Component<BadgeMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Badge 徽标" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 配头像 — 最常见场景 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>配合 Avatar 头像</div>
        <div style={CARD.desc}>未读消息数、在线状态等。最典型的使用场景。</div>
        <div style={{ ...CARD.body, gap: '20px' }}>
          <Badge content={5}>
            <Avatar src={AVATAR_URL} size="lg" />
          </Badge>
          <Badge content={99} max={99}>
            <Avatar src={AVATAR_URL} size="lg" />
          </Badge>
          <Badge dot>
            <Avatar src={AVATAR_URL} size="lg" />
          </Badge>
          <Badge content={120} max={99} color="#22c55e">
            <Avatar src={AVATAR_URL} size="xl" />
          </Badge>
        </div>
      </div>

      {/* 配按钮 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>配合 Button 按钮</div>
        <div style={CARD.desc}>按钮角标提示待处理数量，常用于消息、订单、购物车等。</div>
        <div style={{ ...CARD.body, gap: '12px' }}>
          <Badge content={3}>
            <Button size="sm">消息</Button>
          </Badge>
          <Badge content={8}>
            <Button size="sm" variant="outline">订单</Button>
          </Badge>
          <Badge dot>
            <Button size="sm" variant="ghost">系统</Button>
          </Badge>
        </div>
      </div>

      {/* 配 Tabs 标签页 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>配合 Tabs 标签页</div>
        <div style={CARD.desc}>Tab 标题中嵌入 Badge，展示各分类下的数量。</div>
        <div style={{ padding: '0 16px 16px' }}>
          <Tabs defaultActive="all">
            <Tab
              name="all"
              title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '6px' }}>全部 <Badge content={12} /></span>}
            />
            <Tab
              name="pending"
              title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '6px' }}>待处理 <Badge dot /></span>}
            />
            <Tab
              name="done"
              title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '6px' }}>已完成 <Badge content={99} max={99} /></span>}
            />
          </Tabs>
        </div>
      </div>

      {/* 配 Cell 列表 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>配合 Cell 单元格</div>
        <div style={CARD.desc}>列表项右侧的状态标记。</div>
        <div style={{ padding: '0 16px 16px' }}>
          <CellGroup>
            <Cell title="系统消息" value={<Badge content={5} />} clickable onClick={() => {}} icon="notification" />
            <Cell title="活动通知" value={<Badge dot />} clickable onClick={() => {}} icon="mail" />
            <Cell title="版本更新" value={<Badge content="新" color="#22c55e" />} clickable onClick={() => {}} icon="settings" />
            <Cell title="安全提醒" clickable onClick={() => {}} icon="shield" />
          </CellGroup>
        </div>
      </div>

      {/* 位置 & 颜色 */}
      <div style={{ ...CARD.wrapper, overflow: 'visible' as const }}>
        <div style={CARD.title}>位置 & 自定义颜色</div>
        <div style={CARD.desc}>四角定位 + 自定义背景色。因 Badge 绝对定位会溢出，此卡片不做 overflow:hidden。</div>
        <div style={{ ...CARD.body, gap: '24px', 'padding-top': '12px', 'padding-bottom': '20px' }}>
          <Badge content="TR" position="top-right" color="#1677ff">
            <div style={{ width: '44px', height: '44px', background: 'var(--sc-doc-card-placeholder, #e5e7eb)', 'border-radius': '10px' }} />
          </Badge>
          <Badge content="TL" position="top-left" color="#22c55e">
            <div style={{ width: '44px', height: '44px', background: 'var(--sc-doc-card-placeholder, #e5e7eb)', 'border-radius': '10px' }} />
          </Badge>
          <Badge content="BR" position="bottom-right" color="#f59e0b">
            <div style={{ width: '44px', height: '44px', background: 'var(--sc-doc-card-placeholder, #e5e7eb)', 'border-radius': '10px' }} />
          </Badge>
          <Badge content="BL" position="bottom-left" color="#ef4444">
            <div style={{ width: '44px', height: '44px', background: 'var(--sc-doc-card-placeholder, #e5e7eb)', 'border-radius': '10px' }} />
          </Badge>
        </div>
      </div>

      {/* 独立使用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>独立使用（无 children）</div>
        <div style={CARD.desc}>不包裹子元素时原地渲染，适合行内状态标记。</div>
        <div style={{ ...CARD.body, 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>
          <span>新消息 <Badge content={99} /></span>
          <span><Badge dot /> 在线</span>
          <span>已完成 <Badge content="✓" color="#22c55e" /></span>
        </div>
      </div>
    </MobilePreview>
  );
};
