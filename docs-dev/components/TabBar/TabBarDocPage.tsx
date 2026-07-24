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
      code: '/* CSS keyframes style — inject once */\n@keyframes tb-pop {\n  0%{transform:scale(1)}\n  40%{transform:scale(1.28)}\n  70%{transform:scale(.92)}\n  100%{transform:scale(1)}\n}\n@keyframes tb-fill {\n  from{fill-opacity:.2}\n  to{fill-opacity:1}\n}\n\n/* Icon component with CSS keyframe animation */\nconst AnimatedHomeIcon = (p: { active: boolean }) => (\n  <svg viewBox="0 0 24 24" width="22" height="22"\n    fill="none" stroke="currentColor" stroke-width="1.8"\n    style={p.active ? {\n      display:"inline-block",\n      animation:"tb-pop .4s ease",\n      transformOrigin:"center",\n    } : undefined}>\n    <path d="M3 12L12 3l9 9" />\n    <path d="M5 10v10..." fill={p.active ? "currentColor" : "none"}\n      style={p.active ? { animation:"tb-fill .3s ease" } : undefined} />\n  </svg>\n);\n\n<TabBar defaultValue="a">\n  <TabBarItem name="a" icon={AnimatedHomeIcon} label="Home" />\n  <TabBarItem name="b" icon={AnimatedStarIcon} label="Favorites" />\n  <TabBarItem name="c" icon={AnimatedUserIcon} label="Profile" />\n</TabBar>',
      desc: t('tabbar.demoDesc.animated'),
    },
    {
      title: t('tabbar.demo.pathDraw'),
      code: '/* ── Custom SVG paths for stroke-draw animation ── */\n/* Each icon is a single continuous path with smooth bezier curves */\nconst PATH_HEART = "M12 21.5C6.5 17 2.5 13.5 2.5 9.2c0-3.2 2.5-5.7 5.7-5.7 1.7 0 3.2.7 4.3 1.9l-.5.5.5-.5c1.1-1.2 2.6-1.9 4.3-1.9 3.2 0 5.7 2.5 5.7 5.7 0 4.3-4 7.8-9.5 12.3z";\nconst PATH_CHAT  = "M4.5 6.5h15c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-5.5l-3.8 3.8-.2-.2v-3.6H4.5c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2z";\nconst PATH_BELL  = "M12 3C9.8 3 8 4.8 8 7v3.5c0 .8-.3 1.5-.8 2L6 14h12l-1.2-1.5c-.5-.5-.8-1.2-.8-2V7c0-2.2-1.8-4-4-4zm-1.5 14.5h3s-.5 1.5-1.5 1.5-1.5-1.5-1.5-1.5z";\n\nfunction measurePath(d: string): number {\n  const p = document.createElementNS("http://www.w3.org/2000/svg","path");\n  p.setAttribute("d",d); return Math.ceil(p.getTotalLength());\n}\n\nconst LEN_HEART = measurePath(PATH_HEART);\nconst LEN_CHAT  = measurePath(PATH_CHAT);\nconst LEN_BELL  = measurePath(PATH_BELL);\n\n/* Inject one-shot draw keyframes */\nconst css = `@keyframes tb-draw-1{from{stroke-dashoffset:${LEN_HEART}}to{stroke-dashoffset:0}}\n@keyframes tb-draw-2{from{stroke-dashoffset:${LEN_CHAT}}to{stroke-dashoffset:0}}\n@keyframes tb-draw-3{from{stroke-dashoffset:${LEN_BELL}}to{stroke-dashoffset:0}}\n@keyframes tb-fill-in{from{fill-opacity:0}to{fill-opacity:1}}`;\n\nfunction seg(len:number, anim:string, active:boolean) {\n  if(!active) return { strokeDasharray:len, strokeDashoffset:0, fill:"none" };\n  return { strokeDasharray:len, animation:`${anim} .6s ease forwards, tb-fill-in .25s ease .4s forwards`, fill:"currentColor" };\n}\n\nconst PathHeartIcon = (p:{active:boolean}) => (\n  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">\n    <path d={PATH_HEART} style={seg(LEN_HEART,"tb-draw-1",p.active)} />\n  </svg>\n);\n\nconst PathChatIcon = (p:{active:boolean}) => (\n  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">\n    <path d={PATH_CHAT} style={seg(LEN_CHAT,"tb-draw-2",p.active)} />\n  </svg>\n);\n\nconst PathBellIcon = (p:{active:boolean}) => (\n  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">\n    <path d={PATH_BELL} style={seg(LEN_BELL,"tb-draw-3",p.active)} />\n  </svg>\n);\n\n<TabBar defaultValue="a">\n  <TabBarItem name="a" icon={PathHeartIcon} label="Likes" />\n  <TabBarItem name="b" icon={PathChatIcon} label="Chat" />\n  <TabBarItem name="c" icon={PathBellIcon} label="Alerts" />\n</TabBar>',
      desc: t('tabbar.demoDesc.pathDraw'),
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
