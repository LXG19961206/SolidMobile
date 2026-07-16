import { createSignal, type Component } from 'solid-js';

import zhCN from '../../../i18n/tabbar/zh-CN';
import enUS from '../../../i18n/tabbar/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { TabBar, TabBarItem } from '../../../../src/components/TabBar';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';

const tabBarProps: PropRow[] = [
  { name: 'value', type: 'number | string', default: '—', required: false, desc: 'componentProps.tabbar.value' },
  { name: 'defaultValue', type: 'number | string', default: '0', required: false, desc: 'componentProps.tabbar.defaultValue' },
  { name: 'onChange', type: '(name) => void', default: '—', required: false, desc: 'componentProps.tabbar.onChange' },
  { name: 'fixed', type: 'boolean', default: 'true', required: false, desc: 'componentProps.tabbar.fixed' },
  { name: 'border', type: 'boolean', default: 'true', required: false, desc: 'componentProps.tabbar.border' },
  { name: 'zIndex', type: 'number | string', default: '1', required: false, desc: 'componentProps.tabbar.zIndex' },
  { name: 'height', type: 'number | string', default: "'50px'", required: false, desc: 'componentProps.tabbar.height' },
  { name: 'activeColor', type: 'string', default: "'#1989fa'", required: false, desc: 'componentProps.tabbar.activeColor' },
  { name: 'inactiveColor', type: 'string', default: "'#7d7e80'", required: false, desc: 'componentProps.tabbar.inactiveColor' },
  { name: 'safeArea', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tabbar.safeArea' },
  { name: 'bgColor', type: 'string', default: '—', required: false, desc: 'componentProps.tabbar.bgColor' },
  { name: 'placeholder', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tabbar.placeholder' },
  { name: 'beforeChange', type: '(name) => boolean | Promise<boolean>', default: '—', required: false, desc: 'componentProps.tabbar.beforeChange' },
];

const itemProps: PropRow[] = [
  { name: 'name', type: 'number | string', default: '—', required: true, desc: 'componentProps.tabbar.name' },
  { name: 'icon', type: 'string | JSX.Element', default: '—', required: false, desc: 'componentProps.tabbar.icon' },
  { name: 'label', type: 'string', default: '—', required: false, desc: 'componentProps.tabbar.label' },
  { name: 'dot', type: 'boolean', default: 'false', required: false, desc: 'componentProps.tabbar.dot' },
  { name: 'badge', type: 'number | string', default: '—', required: false, desc: 'componentProps.tabbar.badge' },
  { name: 'badgeProps', type: 'Record<string, unknown>', default: '—', required: false, desc: 'componentProps.tabbar.badgeProps' },
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
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>TabBar</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t('componentIntro.TabBarIntro')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>TabBar {t('common.props')}</h2>
        <PropsTable rows={tabBarProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>TabBarItem {t('common.props')}</h2>
        <PropsTable rows={itemProps} />

        <DemoBlock title={t('demo.basic')} desc={t('demo.basicDesc')} code={`<TabBar value={val()} onChange={setVal}>\n  <TabBarItem name="home" icon="home" label="Home" />\n  <TabBarItem name="cart" icon="shopping-cart" label="Cart" />\n  <TabBarItem name="user" icon="user" label="Profile" />\n</TabBar>`}>
          <div style={{ position: 'relative', height: '60px' }}>
            <TabBar value={val1()} onChange={setVal1} fixed={false}>
              <TabBarItem name="home" icon="home" label="Home" />
              <TabBarItem name="cart" icon="shopping-cart" label="Cart" />
              <TabBarItem name="user" icon="user" label="Profile" />
            </TabBar>
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.badgeDot')} desc={t('demoDesc.tabbar_badge')} code={`<TabBar value={val()} onChange={setVal}>\n  <TabBarItem name={0} icon="home" label="Home" badge={5} />\n  <TabBarItem name={1} icon="chat" label="Messages" dot />\n  <TabBarItem name={2} icon="settings" label="Settings" badge={99} />\n</TabBar>`}>
          <div style={{ position: 'relative', height: '60px' }}>
            <TabBar value={val2()} onChange={setVal2} fixed={false}>
              <TabBarItem name={0} icon="home" label="Home" badge={5} />
              <TabBarItem name={1} icon="chat" label="Messages" dot />
              <TabBarItem name={2} icon="settings" label="Settings" badge={99} />
            </TabBar>
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.tabbarAnimated')} desc={t('demoDesc.tabbar_animated_icon')} code={`/* 1. 定义 keyframes 并注入页面 */\nconst keyframes = \`\n  @keyframes tb-pop { 0%{transform:scale(1)} 40%{transform:scale(1.28)} 70%{transform:scale(.92)} 100%{transform:scale(1)} }\n  @keyframes tb-fill { from{fill-opacity:.2} to{fill-opacity:1} }\n\`;\nconst s = document.createElement('style');\ns.textContent = keyframes;\ndocument.head.appendChild(s);\n\n/* 2. 编写三个带动画的 SVG 图标组件 */\nconst pop = { display:'inline-block', animation:'tb-pop .4s ease', transformOrigin:'center' };\nconst fill = { animation:'tb-fill .3s ease' };\n\nconst HomeIcon = (p: { active: boolean }) => (\n  <svg viewBox="0 0 24 24" width="22" height="22"\n    fill="none" stroke="currentColor" stroke-width="1.8"\n    stroke-linecap="round" stroke-linejoin="round"\n    style={p.active ? pop : undefined}>\n    <path d="M3 12L12 3l9 9" />\n    <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"\n      fill={p.active ? 'currentColor' : 'none'}\n      fill-opacity={p.active ? 1 : 0}\n      style={p.active ? fill : undefined} />\n  </svg>\n);\n\nconst StarIcon = (p: { active: boolean }) => (\n  <svg viewBox="0 0 24 24" width="22" height="22"\n    fill="none" stroke="currentColor" stroke-width="1.8"\n    stroke-linejoin="round"\n    style={p.active ? pop : undefined}>\n    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"\n      fill={p.active ? 'currentColor' : 'none'}\n      fill-opacity={p.active ? 1 : 0}\n      style={p.active ? fill : undefined} />\n  </svg>\n);\n\nconst UserIcon = (p: { active: boolean }) => (\n  <svg viewBox="0 0 24 24" width="22" height="22"\n    fill="none" stroke="currentColor" stroke-width="1.8"\n    stroke-linecap="round" stroke-linejoin="round"\n    style={p.active ? pop : undefined}>\n    <circle cx="12" cy="8" r="4"\n      fill={p.active ? 'currentColor' : 'none'}\n      fill-opacity={p.active ? 1 : 0}\n      style={p.active ? fill : undefined} />\n    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />\n  </svg>\n);\n\n/* 3. 传入 TabBarItem 的 icon 属性 */\n<TabBar defaultValue="a">\n  <TabBarItem name="a" icon={HomeIcon} label="Home" />\n  <TabBarItem name="b" icon={StarIcon} label="Favorites" />\n  <TabBarItem name="c" icon={UserIcon} label="Profile" />\n</TabBar>`}>
          <div style={{ position: 'relative', height: '60px' }}>
            <TabBar defaultValue="a" fixed={false}>
              <TabBarItem name="a" icon={AnimatedHomeIcon} label="Home" />
              <TabBarItem name="b" icon={AnimatedStarIcon} label="Favorites" />
              <TabBarItem name="c" icon={AnimatedUserIcon} label="Profile" />
            </TabBar>
          </div>
          <p style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'line-height': 1.6, margin: '8px 0 0' }}>
            Active icon has scale+fill animation. Accepts any JSX.Element -- Lottie, Rive, CSS animation 均可自由使用。
          </p>
        </DemoBlock>

        <DemoBlock title={t('demo.fixedBottom')} desc={t('demoDesc.tabbar_fixed')} code={`<TabBar defaultValue="home" placeholder>\n  <TabBarItem name="home" icon="home" label="Home" badge={5} />\n  <TabBarItem name="cart" icon="shopping-cart" label="Cart" dot />\n  <TabBarItem name="user" icon="user" label="Profile" />\n</TabBar>`}>
          <TabBar defaultValue="home" placeholder>
            <TabBarItem name="home" icon="home" label="Home" badge={5} />
            <TabBarItem name="cart" icon="shopping-cart" label="Cart" dot />
            <TabBarItem name="user" icon="user" label="Profile" />
          </TabBar>
        </DemoBlock>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('section.withRouter')}</h2>
        <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
          Library does not bundle routing support to avoid coupling with specific routers.
          On tab switch, use <code>onChange</code> to get the current <code>name</code>, then call your router.由跳转。
          Return <code>false</code> in <code>beforeChange</code> to block tab switches, useful for表单未保存时阻止离开等场景。
        </p>
      </div>
    </DocLayout>
  );
};
