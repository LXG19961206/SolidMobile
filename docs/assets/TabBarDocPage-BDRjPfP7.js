import{u as m,bB as b,c as n,i as t,P as d,F as h,bC as f,t as p,r as T,bD as u,bE as B}from"./index-C9u4wmDu.js";import{D as g}from"./ComponentDocLayout-tkI-GR2P.js";import{D as v}from"./DocLayout-BFPGsvJi.js";var k=p('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TabBar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');T({"zh-CN":B,"en-US":u});const C=()=>{const e=m(),{propsTables:r}=b(),s=[{title:e("tabbar.demo.basic"),code:`<TabBar defaultValue="home">
  <TabBarItem name="home" icon="home" label="Home" />
  <TabBarItem name="cart" icon="shopping-cart" label="Cart" />
  <TabBarItem name="user" icon="user" label="Profile" />
</TabBar>`,desc:e("tabbar.demoDesc.basic")},{title:e("tabbar.demo.badge"),code:`<TabBar defaultValue={0}>
  <TabBarItem name={0} icon="home" label="Home" badge={5} />
  <TabBarItem name={1} icon="chat" label="Messages" dot />
  <TabBarItem name={2} icon="settings" label="Settings" badge={99} />
</TabBar>`,desc:e("tabbar.demoDesc.badge")},{title:e("tabbar.demo.color"),code:`<TabBar defaultValue="a" activeColor="#22c55e">
  <TabBarItem name="a" icon="home" label="Home" />
  <TabBarItem name="b" icon="star" label="Favorites" />
  <TabBarItem name="c" icon="user" label="Profile" />
</TabBar>`,desc:e("tabbar.demoDesc.color")},{title:e("tabbar.demo.animated"),code:`/* CSS keyframes style — inject once */
@keyframes tb-pop {
  0%{transform:scale(1)}
  40%{transform:scale(1.28)}
  70%{transform:scale(.92)}
  100%{transform:scale(1)}
}
@keyframes tb-fill {
  from{fill-opacity:.2}
  to{fill-opacity:1}
}

/* Icon component with CSS keyframe animation */
const AnimatedHomeIcon = (p: { active: boolean }) => (
  <svg viewBox="0 0 24 24" width="22" height="22"
    fill="none" stroke="currentColor" stroke-width="1.8"
    style={p.active ? {
      display:"inline-block",
      animation:"tb-pop .4s ease",
      transformOrigin:"center",
    } : undefined}>
    <path d="M3 12L12 3l9 9" />
    <path d="M5 10v10..." fill={p.active ? "currentColor" : "none"}
      style={p.active ? { animation:"tb-fill .3s ease" } : undefined} />
  </svg>
);

<TabBar defaultValue="a">
  <TabBarItem name="a" icon={AnimatedHomeIcon} label="Home" />
  <TabBarItem name="b" icon={AnimatedStarIcon} label="Favorites" />
  <TabBarItem name="c" icon={AnimatedUserIcon} label="Profile" />
</TabBar>`,desc:e("tabbar.demoDesc.animated")},{title:e("tabbar.demo.pathDraw"),code:`/* ── Custom SVG paths for stroke-draw animation ── */
/* Each icon is a single continuous path with smooth bezier curves */
const PATH_HEART = "M12 21.5C6.5 17 2.5 13.5 2.5 9.2c0-3.2 2.5-5.7 5.7-5.7 1.7 0 3.2.7 4.3 1.9l-.5.5.5-.5c1.1-1.2 2.6-1.9 4.3-1.9 3.2 0 5.7 2.5 5.7 5.7 0 4.3-4 7.8-9.5 12.3z";
const PATH_CHAT  = "M4.5 6.5h15c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-5.5l-3.8 3.8-.2-.2v-3.6H4.5c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2z";
const PATH_BELL  = "M12 3C9.8 3 8 4.8 8 7v3.5c0 .8-.3 1.5-.8 2L6 14h12l-1.2-1.5c-.5-.5-.8-1.2-.8-2V7c0-2.2-1.8-4-4-4zm-1.5 14.5h3s-.5 1.5-1.5 1.5-1.5-1.5-1.5-1.5z";

function measurePath(d: string): number {
  const p = document.createElementNS("http://www.w3.org/2000/svg","path");
  p.setAttribute("d",d); return Math.ceil(p.getTotalLength());
}

const LEN_HEART = measurePath(PATH_HEART);
const LEN_CHAT  = measurePath(PATH_CHAT);
const LEN_BELL  = measurePath(PATH_BELL);

/* Inject one-shot draw keyframes */
const css = \`@keyframes tb-draw-1{from{stroke-dashoffset:\${LEN_HEART}}to{stroke-dashoffset:0}}
@keyframes tb-draw-2{from{stroke-dashoffset:\${LEN_CHAT}}to{stroke-dashoffset:0}}
@keyframes tb-draw-3{from{stroke-dashoffset:\${LEN_BELL}}to{stroke-dashoffset:0}}
@keyframes tb-fill-in{from{fill-opacity:0}to{fill-opacity:1}}\`;

function seg(len:number, anim:string, active:boolean) {
  if(!active) return { strokeDasharray:len, strokeDashoffset:0, fill:"none" };
  return { strokeDasharray:len, animation:\`\${anim} .8s cubic-bezier(.4,0,.2,1) forwards, tb-fill-in .35s ease .55s forwards\`, fill:"currentColor" };
}

const PathHeartIcon = (p:{active:boolean}) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d={PATH_HEART} style={seg(LEN_HEART,"tb-draw-1",p.active)} />
  </svg>
);

const PathChatIcon = (p:{active:boolean}) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d={PATH_CHAT} style={seg(LEN_CHAT,"tb-draw-2",p.active)} />
  </svg>
);

const PathBellIcon = (p:{active:boolean}) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d={PATH_BELL} style={seg(LEN_BELL,"tb-draw-3",p.active)} />
  </svg>
);

<TabBar defaultValue="a">
  <TabBarItem name="a" icon={PathHeartIcon} label="Likes" />
  <TabBarItem name="b" icon={PathChatIcon} label="Chat" />
  <TabBarItem name="c" icon={PathBellIcon} label="Alerts" />
</TabBar>`,desc:e("tabbar.demoDesc.pathDraw")},{title:e("tabbar.demo.fixed"),code:`<TabBar defaultValue="a" placeholder>
  <TabBarItem name="a" icon="home" label="Home" badge={5} />
  <TabBarItem name="b" icon="shopping-cart" label="Cart" dot />
  <TabBarItem name="c" icon="user" label="Profile" />
</TabBar>`,desc:e("tabbar.demoDesc.fixed")}];return n(v,{get children(){var a=k(),i=a.firstChild,o=i.nextSibling,l=o.nextSibling;return t(o,()=>e("tabbar.intro")),t(a,n(d,{propsTables:r}),l),t(a,n(h,{each:s,children:c=>n(g,{demo:c})}),null),t(a,n(f,{}),null),a}})};export{C as TabBarDocPage};
