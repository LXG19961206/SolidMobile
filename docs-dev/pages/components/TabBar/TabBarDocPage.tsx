import { createSignal, type Component } from 'solid-js';
import { TabBar, TabBarItem } from '../../../../src/components/TabBar';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';

const tabBarProps: PropRow[] = [
  { name: 'value', type: 'number | string', default: '—', required: false, desc: '当前选中标签（受控）。' },
  { name: 'defaultValue', type: 'number | string', default: '0', required: false, desc: '默认选中（非受控）。' },
  { name: 'onChange', type: '(name) => void', default: '—', required: false, desc: '切换回调。' },
  { name: 'fixed', type: 'boolean', default: 'true', required: false, desc: '是否固定在底部。' },
  { name: 'border', type: 'boolean', default: 'true', required: false, desc: '是否显示外边框。' },
  { name: 'zIndex', type: 'number | string', default: '1', required: false, desc: '元素 z-index。' },
  { name: 'height', type: 'number | string', default: "'50px'", required: false, desc: '标签栏高度，占位高度同步变化。' },
  { name: 'activeColor', type: 'string', default: "'#1989fa'", required: false, desc: '选中标签颜色。' },
  { name: 'inactiveColor', type: 'string', default: "'#7d7e80'", required: false, desc: '未选中标签颜色。' },
  { name: 'safeArea', type: 'boolean', default: 'false', required: false, desc: '底部安全区域占位。' },
  { name: 'bgColor', type: 'string', default: '—', required: false, desc: '自定义背景色，支持渐变、半透明毛玻璃。' },
  { name: 'placeholder', type: 'boolean', default: 'false', required: false, desc: 'fixed 时生成等高占位，防止页面内容被遮挡。' },
  { name: 'beforeChange', type: '(name) => boolean | Promise<boolean>', default: '—', required: false, desc: '切换前回调，返回 false 阻止。' },
];

const itemProps: PropRow[] = [
  { name: 'name', type: 'number | string', default: '—', required: true, desc: '标签标识符。' },
  { name: 'icon', type: 'string | JSX.Element', default: '—', required: false, desc: '图标名或自定义 JSX。' },
  { name: 'label', type: 'string', default: '—', required: false, desc: '标签文字。' },
  { name: 'dot', type: 'boolean', default: 'false', required: false, desc: '图标右上角小红点。' },
  { name: 'badge', type: 'number | string', default: '—', required: false, desc: '图标右上角徽标。' },
  { name: 'badgeProps', type: 'Record<string, unknown>', default: '—', required: false, desc: '透传 Badge 组件 props。' },
];

/* ── Animated SVG icon components (selected state: pop + fill) ── */

const animKeyframes = `
  @keyframes tb-pop { 0%{transform:scale(1)} 40%{transform:scale(1.28)} 70%{transform:scale(.92)} 100%{transform:scale(1)} }
  @keyframes tb-fill { from{fill-opacity:.2} to{fill-opacity:1} }
`;
if (typeof document !== 'undefined') {
  const s = document.createElement('style'); s.textContent = animKeyframes; document.head.appendChild(s);
}

const pop = { display:'inline-block', animation:'tb-pop .4s ease', transformOrigin:'center' };
const fill = { animation:'tb-fill .3s ease' };

const AnimatedHomeIcon = (p: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={p.active ? pop : undefined}>
    <path d="M3 12L12 3l9 9" />
    <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" fill={p.active ? 'currentColor' : 'none'} fill-opacity={p.active ? 1 : 0} style={p.active ? fill : undefined} />
  </svg>
);
const AnimatedStarIcon = (p: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" style={p.active ? pop : undefined}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={p.active ? 'currentColor' : 'none'} fill-opacity={p.active ? 1 : 0} style={p.active ? fill : undefined} />
  </svg>
);
const AnimatedUserIcon = (p: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style={p.active ? pop : undefined}>
    <circle cx="12" cy="8" r="4" fill={p.active ? 'currentColor' : 'none'} fill-opacity={p.active ? 1 : 0} style={p.active ? fill : undefined} />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);

export const TabBarDocPage: Component = () => {
  const t = useT();
  const [val1, setVal1] = createSignal('home');
  const [val2, setVal2] = createSignal(0);

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>TabBar 标签栏</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          移动端底部标签导航栏，支持图标+文字、徽标红点、自定义颜色。一般配合页面容器使用。
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>TabBar {t('common.props')}</h2>
        <PropsTable rows={tabBarProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>TabBarItem {t('common.props')}</h2>
        <PropsTable rows={itemProps} />

        <DemoBlock title={t('demo.basic')} desc={t('demo.basicDesc')} code={`<TabBar value={val()} onChange={setVal}>\n  <TabBarItem name="home" icon="home" label="首页" />\n  <TabBarItem name="cart" icon="shopping-cart" label="购物车" />\n  <TabBarItem name="user" icon="user" label="我的" />\n</TabBar>`}>
          <div style={{ position: 'relative', height: '60px' }}>
            <TabBar value={val1()} onChange={setVal1} fixed={false}>
              <TabBarItem name="home" icon="home" label="首页" />
              <TabBarItem name="cart" icon="shopping-cart" label="购物车" />
              <TabBarItem name="user" icon="user" label="我的" />
            </TabBar>
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.badgeDot')} desc="Badge + dot 展示未读消息数。" code={`<TabBar value={val()} onChange={setVal}>\n  <TabBarItem name={0} icon="home" label="首页" badge={5} />\n  <TabBarItem name={1} icon="chat" label="消息" dot />\n  <TabBarItem name={2} icon="settings" label="设置" badge={99} />\n</TabBar>`}>
          <div style={{ position: 'relative', height: '60px' }}>
            <TabBar value={val2()} onChange={setVal2} fixed={false}>
              <TabBarItem name={0} icon="home" label="首页" badge={5} />
              <TabBarItem name={1} icon="chat" label="消息" dot />
              <TabBarItem name={2} icon="settings" label="设置" badge={99} />
            </TabBar>
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.tabbarAnimated')} desc="icon 属性接受任意 JSX，TabBarItem 自动注入 active 布尔 prop，组件据此切换选中态样式。适合 Lottie / Rive / CSS animation 等方案。" code={`/* 1. 定义 keyframes 并注入页面 */\nconst keyframes = \`\n  @keyframes tb-pop { 0%{transform:scale(1)} 40%{transform:scale(1.28)} 70%{transform:scale(.92)} 100%{transform:scale(1)} }\n  @keyframes tb-fill { from{fill-opacity:.2} to{fill-opacity:1} }\n\`;\nconst s = document.createElement('style');\ns.textContent = keyframes;\ndocument.head.appendChild(s);\n\n/* 2. 编写三个带动画的 SVG 图标组件 */\nconst pop = { display:'inline-block', animation:'tb-pop .4s ease', transformOrigin:'center' };\nconst fill = { animation:'tb-fill .3s ease' };\n\nconst HomeIcon = (p: { active: boolean }) => (\n  <svg viewBox="0 0 24 24" width="22" height="22"\n    fill="none" stroke="currentColor" stroke-width="1.8"\n    stroke-linecap="round" stroke-linejoin="round"\n    style={p.active ? pop : undefined}>\n    <path d="M3 12L12 3l9 9" />\n    <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"\n      fill={p.active ? 'currentColor' : 'none'}\n      fill-opacity={p.active ? 1 : 0}\n      style={p.active ? fill : undefined} />\n  </svg>\n);\n\nconst StarIcon = (p: { active: boolean }) => (\n  <svg viewBox="0 0 24 24" width="22" height="22"\n    fill="none" stroke="currentColor" stroke-width="1.8"\n    stroke-linejoin="round"\n    style={p.active ? pop : undefined}>\n    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"\n      fill={p.active ? 'currentColor' : 'none'}\n      fill-opacity={p.active ? 1 : 0}\n      style={p.active ? fill : undefined} />\n  </svg>\n);\n\nconst UserIcon = (p: { active: boolean }) => (\n  <svg viewBox="0 0 24 24" width="22" height="22"\n    fill="none" stroke="currentColor" stroke-width="1.8"\n    stroke-linecap="round" stroke-linejoin="round"\n    style={p.active ? pop : undefined}>\n    <circle cx="12" cy="8" r="4"\n      fill={p.active ? 'currentColor' : 'none'}\n      fill-opacity={p.active ? 1 : 0}\n      style={p.active ? fill : undefined} />\n    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />\n  </svg>\n);\n\n/* 3. 传入 TabBarItem 的 icon 属性 */\n<TabBar defaultValue="a">\n  <TabBarItem name="a" icon={HomeIcon} label="首页" />\n  <TabBarItem name="b" icon={StarIcon} label="收藏" />\n  <TabBarItem name="c" icon={UserIcon} label="我的" />\n</TabBar>`}>
          <div style={{ position: 'relative', height: '60px' }}>
            <TabBar defaultValue="a" fixed={false}>
              <TabBarItem name="a" icon={AnimatedHomeIcon} label="首页" />
              <TabBarItem name="b" icon={AnimatedStarIcon} label="收藏" />
              <TabBarItem name="c" icon={AnimatedUserIcon} label="我的" />
            </TabBar>
          </div>
          <p style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'line-height': 1.6, margin: '8px 0 0' }}>
            选中态下 icon 有放大 + 填充动画。icon 属性直接接受 JSX.Element，不限动画方案，Lottie、Rive、CSS animation 均可自由使用。
          </p>
        </DemoBlock>

        <DemoBlock title={t('demo.fixedBottom')} desc="默认 fixed=true，固定在模拟器底部并占位，模拟真实 App 底部导航体验。" code={`<TabBar defaultValue="home" placeholder>\n  <TabBarItem name="home" icon="home" label="首页" badge={5} />\n  <TabBarItem name="cart" icon="shopping-cart" label="购物车" dot />\n  <TabBarItem name="user" icon="user" label="我的" />\n</TabBar>`}>
          <TabBar defaultValue="home" placeholder>
            <TabBarItem name="home" icon="home" label="首页" badge={5} />
            <TabBarItem name="cart" icon="shopping-cart" label="购物车" dot />
            <TabBarItem name="user" icon="user" label="我的" />
          </TabBar>
        </DemoBlock>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>与路由配合</h2>
        <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
          组件库不内置路由相关属性，以避免与具体路由方案（solid-router、solid-app-router 等）耦合。
          切换标签时通过 <code>onChange</code> 回调拿到当前 <code>name</code>，自行调用路由跳转。
          可在 <code>beforeChange</code> 中返回 <code>false</code> 拦截切换，适用于表单未保存时阻止离开等场景。
        </p>
      </div>
    </DocLayout>
  );
};
