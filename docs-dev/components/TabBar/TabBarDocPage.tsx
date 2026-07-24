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
      code: '/* ── Custom single-path SVGs for stroke-draw animation ── */\nconst PATH_PIN      = "M12 21c-1.7-2.8-7-8.2-7-12.6C5 4.7 8.1 2 12 2s7 2.7 7 6.4c0 4.4-5.3 9.8-7 12.6z";\nconst PATH_PENCIL   = "M3 17.2L14.8 5.4l3.8 3.8L6.8 21H3v-3.8z";\nconst PATH_BOOKMARK = "M5 3h14v18l-7-4.5L5 21V3z";\n\nfunction measurePath(d:string):number {\n  const p=document.createElementNS("http://www.w3.org/2000/svg","path");\n  p.setAttribute("d",d);return Math.ceil(p.getTotalLength());\n}\n\nconst LEN_PIN=measurePath(PATH_PIN),LEN_PENCIL=measurePath(PATH_PENCIL),LEN_BOOKMARK=measurePath(PATH_BOOKMARK);\n\n/* Inject one-shot keyframes keyed to actual path lengths */\nconst css=`@keyframes tb-draw-1{from{stroke-dashoffset:${LEN_PIN}}to{stroke-dashoffset:0}}\n@keyframes tb-draw-2{from{stroke-dashoffset:${LEN_PENCIL}}to{stroke-dashoffset:0}}\n@keyframes tb-draw-3{from{stroke-dashoffset:${LEN_BOOKMARK}}to{stroke-dashoffset:0}}\n@keyframes tb-fill-in{from{fill-opacity:0}to{fill-opacity:1}}`;\n\nfunction seg(len:number,anim:string,active:boolean){\n  if(!active)return{strokeDasharray:len,strokeDashoffset:0,fill:"none"};\n  return{strokeDasharray:len,strokeDashoffset:len,fillOpacity:0,\n    animation:`${anim} .8s cubic-bezier(.4,0,.2,1) forwards, tb-fill-in .35s ease .55s forwards`,\n    fill:"currentColor"};\n}\n\nconst PinIcon=(p:{active:boolean})=>(<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d={PATH_PIN} style={seg(LEN_PIN,"tb-draw-1",p.active)}/></svg>);\nconst PencilIcon=(p:{active:boolean})=>(<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d={PATH_PENCIL} style={seg(LEN_PENCIL,"tb-draw-2",p.active)}/></svg>);\nconst BookmarkIcon=(p:{active:boolean})=>(<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d={PATH_BOOKMARK} style={seg(LEN_BOOKMARK,"tb-draw-3",p.active)}/></svg>);\n\n<TabBar defaultValue="a">\n  <TabBarItem name="a" icon={PinIcon} label="Nearby" />\n  <TabBarItem name="b" icon={PencilIcon} label="Write" />\n  <TabBarItem name="c" icon={BookmarkIcon} label="Saved" />\n</TabBar>',
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
