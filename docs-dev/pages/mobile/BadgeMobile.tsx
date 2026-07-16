import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface BadgeMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Badge } from '../../../src/components/Badge';
import { Avatar } from '../../../src/components/Avatar';
import { Button } from '../../../src/components/Button';
import { Tabs, Tab } from '../../../src/components/Tabs';
import { useT, loadLocale } from '../../doc-i18n';
loadLocale('badge');
import { Cell, CellGroup } from '../../../src/components/Cell';

const propsData = [
  { name: 'content', type: 'string | number', desc: 'componentProps.badge.content' },
  { name: 'dot', type: 'boolean', desc: 'componentProps.badge.dot' },
  { name: 'max', type: 'number', desc: 'componentProps.badge.max' },
  { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", desc: 'componentProps.badge.position' },
  { name: 'color', type: 'string', desc: 'componentProps.badge.color' },
  { name: 'children', type: 'JSX.Element', desc: 'componentProps.badge.children' },
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
    <MobilePreview title="Badge" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 配头像 — 最常见场景 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.withAvatar')}</div>
        <div style={CARD.desc}>{t('demo.withAvatarDesc')}</div>
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
        <div style={CARD.title}>{t('demo.withButton')}</div>
        <div style={CARD.desc}>{t('demo.withButtonDesc')}</div>
        <div style={{ ...CARD.body, gap: '12px' }}>
          <Badge content={3}>
            <Button size="sm">Messages</Button>
          </Badge>
          <Badge content={8}>
            <Button size="sm" variant="outline">Orders</Button>
          </Badge>
          <Badge dot>
            <Button size="sm" variant="ghost">System</Button>
          </Badge>
        </div>
      </div>

      {/* 配 Tabs 标签页 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.withTab')}</div>
        <div style={CARD.desc}>{t('demo.withTabDesc')}</div>
        <div style={{ padding: '0 16px 16px' }}>
          <Tabs defaultActive="all">
            <Tab
              name="all"
              title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '6px' }}>All <Badge content={12} /></span>}
            />
            <Tab
              name="pending"
              title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '6px' }}>Pending <Badge dot /></span>}
            />
            <Tab
              name="done"
              title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '6px' }}>Done <Badge content={99} max={99} /></span>}
            />
          </Tabs>
        </div>
      </div>

      {/* 配 Cell 列表 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.withCell')}</div>
        <div style={CARD.desc}>{t('demo.withCellDesc')}</div>
        <div style={{ padding: '0 16px 16px' }}>
          <CellGroup>
            <Cell title="System Message" value={<Badge content={5} />} clickable onClick={() => {}} icon="notification" />
            <Cell title="Event Notice" value={<Badge dot />} clickable onClick={() => {}} icon="mail" />
            <Cell title="Version Update" value={<Badge content="New" color="#22c55e" />} clickable onClick={() => {}} icon="settings" />
            <Cell title="Security Alert" clickable onClick={() => {}} icon="shield" />
          </CellGroup>
        </div>
      </div>

      {/* 位置 & 颜色 */}
      <div style={{ ...CARD.wrapper, overflow: 'visible' as const }}>
        <div style={CARD.title}>{t('demo.positionAndColor')}</div>
        <div style={CARD.desc}>{t('demo.positionAndColorDesc')}</div>
        <div style={{ ...CARD.body, gap: '24px', 'padding-top': '12px', 'padding-bottom': '20px' }}>
          <Badge content="TR" position="top-right" color="var(--sc-color-primary, #1677ff)">
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
        <div style={CARD.title}>{t('demo.badgeStandalone')}</div>
        <div style={CARD.desc}>{t('demo.badgeStandaloneDesc')}</div>
        <div style={{ ...CARD.body, 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>
          <span>New messages <Badge content={99} /></span>
          <span><Badge dot /> Online</span>
          <span>Done <Badge content="✓" color="#22c55e" /></span>
        </div>
      </div>
    </MobilePreview>
  );
};
