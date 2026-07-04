import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface TabBarMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { TabBar, TabBarItem } from '../../../src/components/TabBar';
import { ToastRenderer } from '../../../src/components/Toast';

const propsData = [
  { name: 'TabBar.value', type: 'number | string', desc: 'componentProps.tabbar.TabBar.value' },
  { name: 'TabBar.defaultValue', type: 'number | string', desc: 'componentProps.tabbar.TabBar.defaultValue' },
  { name: 'TabBar.onChange', type: '(name) => void', desc: 'componentProps.tabbar.TabBar.onChange' },
  { name: 'TabBar.fixed', type: 'boolean', desc: 'componentProps.tabbar.TabBar.fixed' },
  { name: 'TabBar.border', type: 'boolean', desc: 'componentProps.tabbar.TabBar.border' },
  { name: 'TabBar.zIndex', type: 'number | string', desc: 'componentProps.tabbar.TabBar.zIndex' },
  { name: 'TabBar.height', type: 'number | string', desc: 'componentProps.tabbar.TabBar.height' },
  { name: 'TabBar.activeColor', type: 'string', desc: 'componentProps.tabbar.TabBar.activeColor' },
  { name: 'TabBar.inactiveColor', type: 'string', desc: 'componentProps.tabbar.TabBar.inactiveColor' },
  { name: 'TabBar.safeArea', type: 'boolean', desc: 'componentProps.tabbar.TabBar.safeArea' },
  { name: 'TabBar.bgColor', type: 'string', desc: 'componentProps.tabbar.TabBar.bgColor' },
  { name: 'TabBar.placeholder', type: 'boolean', desc: 'componentProps.tabbar.TabBar.placeholder' },
  { name: 'TabBar.beforeChange', type: '(name) => boolean | Promise', desc: 'componentProps.tabbar.TabBar.beforeChange' },
  { name: 'TabBarItem.name', type: 'number | string', desc: 'componentProps.tabbar.TabBarItem.name' },
  { name: 'TabBarItem.icon', type: 'string | JSX.Element', desc: 'componentProps.tabbar.TabBarItem.icon' },
  { name: 'TabBarItem.label', type: 'string', desc: 'componentProps.tabbar.TabBarItem.label' },
  { name: 'TabBarItem.dot', type: 'boolean', desc: 'componentProps.tabbar.TabBarItem.dot' },
  { name: 'TabBarItem.badge', type: 'number | string', desc: 'componentProps.tabbar.TabBarItem.badge' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 0 16px' },
};

/* ── Animated SVG icons (selected state: scale up + fill) ── */

const animStyle = `
  @keyframes tab-icon-pop {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.28); }
    70%  { transform: scale(0.92); }
    100% { transform: scale(1); }
  }
  @keyframes tab-icon-fill {
    from { fill-opacity: 0.2; }
    to   { fill-opacity: 1; }
  }
`;
const styleEl = document.createElement('style');
styleEl.textContent = animStyle;
document.head.appendChild(styleEl);

const S = { display: 'inline-block', animation: 'tab-icon-pop 0.4s ease', transformOrigin: 'center' };

const AnimatedHomeIcon = (p: { active?: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={p.active ? S : undefined}>
    <path d="M3 12L12 3l9 9" />
    <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" fill={p.active ? 'currentColor' : 'none'} fill-opacity={p.active ? 1 : 0} style={p.active ? { animation: 'tab-icon-fill 0.3s ease' } : undefined} />
  </svg>
);

const AnimatedStarIcon = (p: { active?: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" style={p.active ? S : undefined}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={p.active ? 'currentColor' : 'none'} fill-opacity={p.active ? 1 : 0}
      style={p.active ? { animation: 'tab-icon-fill 0.3s ease' } : undefined} />
  </svg>
);

const AnimatedUserIcon = (p: { active?: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={p.active ? S : undefined}>
    <circle cx="12" cy="8" r="4" fill={p.active ? 'currentColor' : 'none'} fill-opacity={p.active ? 1 : 0} style={p.active ? { animation: 'tab-icon-fill 0.3s ease' } : undefined} />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);

export const TabBarMobile: Component<TabBarMobileProps> = (props) => {
  const t = useT();
  const [val1, setVal1] = createSignal('home');

  return (
    <MobilePreview title="TabBar 标签栏" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.basic')}</div>
        <div style={CARD.desc}>{t('demo.basicDesc')}</div>
        <div style={CARD.body}>
          <TabBar value={val1()} onChange={setVal1} fixed={false}>
            <TabBarItem name="home" icon="home" label="首页" />
            <TabBarItem name="cart" icon="shopping-cart" label="购物车" />
            <TabBarItem name="user" icon="user" label="我的" />
          </TabBar>
        </div>
      </div>

      {/* 徽标 & 红点 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>徽标 & 红点</div>
        <div style={CARD.desc}>badge 数字徽标 / dot 小红点</div>
        <div style={CARD.body}>
          <TabBar defaultValue={0} fixed={false} activeColor="#1677ff">
            <TabBarItem name={0} icon="home" label="首页" />
            <TabBarItem name={1} icon="chat" label="消息" dot />
            <TabBarItem name={2} icon="settings" label="设置" badge={5} />
          </TabBar>
        </div>
      </div>

      {/* 自定义颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customColor')}</div>
        <div style={CARD.desc}>{t('demo.customColorDesc')}</div>
        <div style={CARD.body}>
          <TabBar defaultValue="a" activeColor="#22c55e" fixed={false}>
            <TabBarItem name="a" icon="home" label="首页" />
            <TabBarItem name="b" icon="star" label="收藏" />
            <TabBarItem name="c" icon="user" label="我的" />
          </TabBar>
        </div>
      </div>

      {/* 自定义动画 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义动画 icon</div>
        <div style={CARD.desc}>icon 属性接受 JSX.Element，可传入自带动画的 SVG，实现选中态路径绘制、缩放等效果。</div>
        <div style={CARD.body}>
          <TabBar defaultValue="a" fixed={false}>
            <TabBarItem name="a" label="首页" icon={AnimatedHomeIcon} />
            <TabBarItem name="b" label="收藏" icon={AnimatedStarIcon} />
            <TabBarItem name="c" label="我的" icon={AnimatedUserIcon} />
          </TabBar>
          <div style={{ 'font-size': '0.65rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px', padding: '0 16px', 'line-height': 1.5 }}>
            选中态下 icon 有放大 + 填充动画。icon 属性直接接受 JSX，用户可自由使用 Lottie / Rive / CSS animation 等任意方案。
          </div>
        </div>
      </div>

      {/* 路由说明 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>与路由配合</div>
        <div style={CARD.desc}>
          组件库不内置路由相关属性，以避免与具体路由方案耦合。
          切换标签时通过 <code>onChange</code> 回调拿到 name，自行控制页面切换。
          可在 <code>beforeChange</code> 中返回 <code>false</code> 拦截切换（如表单未保存时阻止离开）。
        </div>
      </div>

      {/* Fixed 固定在底部 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>Fixed 固定底部</div>
        <div style={CARD.desc}>默认 fixed=true，吸附在视口底部。配合 Badge 和红点。</div>
        <div style={{ height: '60px' }} />
      </div>

      <TabBar defaultValue="home" activeColor="#1677ff">
        <TabBarItem name="home" icon="home" label="首页" badge={5} />
        <TabBarItem name="cart" icon="shopping-cart" label="购物车" dot />
        <TabBarItem name="user" icon="user" label="我的" />
      </TabBar>
    </MobilePreview>
  );
};
