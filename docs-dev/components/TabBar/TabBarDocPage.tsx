import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTabBarTableData } from './tableData';
import { TabBarDesign } from './TabBarDesign';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const TabBarDocPage = () => {
  const t = useT();
  const { propsTables } = useTabBarTableData();

  const demos: DemoCode[] = [
    {
      title: t('tabbar.demo.basic'),
      code: '<TabBar defaultValue="home">\n  <TabBarItem name="home" icon="home" label="Home" />\n  <TabBarItem name="cart" icon="shopping-cart" label="Cart" />\n  <TabBarItem name="user" icon="user" label="Profile" />\n</TabBar>',
      desc: t('tabbar.demoDesc.basic'),
    },
    {
      title: t('tabbar.demo.badge'),
      code: '<TabBar defaultValue={0}>\n  <TabBarItem name={0} icon="home" label="Home" badge={5} />\n  <TabBarItem name={1} icon="chat" label="Messages" dot />\n  <TabBarItem name={2} icon="settings" label="Settings" badge={99} />\n</TabBar>',
      desc: t('tabbar.demoDesc.badge'),
    },
    {
      title: t('tabbar.demo.color'),
      code: '<TabBar defaultValue="a" activeColor="#22c55e">\n  <TabBarItem name="a" icon="home" label="Home" />\n  <TabBarItem name="b" icon="star" label="Favorites" />\n  <TabBarItem name="c" icon="user" label="Profile" />\n</TabBar>',
      desc: t('tabbar.demoDesc.color'),
    },
    {
      title: t('tabbar.demo.animated'),
      code: '/* CSS keyframes */\n@keyframes tb-pop {\n  0%{transform:scale(1)}\n  40%{transform:scale(1.28)}\n  70%{transform:scale(.92)}\n  100%{transform:scale(1)}\n}\n@keyframes tb-fill {\n  from{fill-opacity:.2}\n  to{fill-opacity:1}\n}\n\n/* Animated SVG icon component */\nconst AnimatedHomeIcon = (p: { active: boolean }) => (\n  <svg viewBox="0 0 24 24" width="22" height="22"\n    fill="none" stroke="currentColor" stroke-width="1.8"\n    style={p.active ? {\n      display:"inline-block",\n      animation:"tb-pop .4s ease",\n      transformOrigin:"center",\n    } : undefined}>\n    <path d="M3 12L12 3l9 9" />\n    <path d="M5 10v10..." fill={p.active ? "currentColor" : "none"}\n      style={p.active ? { animation:"tb-fill .3s ease" } : undefined} />\n  </svg>\n);\n\n/* Usage */\n<TabBar defaultValue="a">\n  <TabBarItem name="a" icon={AnimatedHomeIcon} label="Home" />\n  <TabBarItem name="b" icon={AnimatedStarIcon} label="Favorites" />\n  <TabBarItem name="c" icon={AnimatedUserIcon} label="Profile" />\n</TabBar>',
      desc: t('tabbar.demoDesc.animated'),
    },
    {
      title: t('tabbar.demo.fixed'),
      code: '<TabBar defaultValue="a" placeholder>\n  <TabBarItem name="a" icon="home" label="Home" badge={5} />\n  <TabBarItem name="b" icon="shopping-cart" label="Cart" dot />\n  <TabBarItem name="c" icon="user" label="Profile" />\n</TabBar>',
      desc: t('tabbar.demoDesc.fixed'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>TabBar</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('tabbar.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>

        <TabBarDesign />
      </div>
    </DocLayout>
  );
};
