import{u as m,bE as b,c as n,i as t,P as d,F as f,bF as h,t as p,r as u,bG as g,bH as B}from"./index-Dh_DZKbR.js";import{D as T}from"./ComponentDocLayout-DfDJoBz6.js";import{D as I}from"./DocLayout-CcVJyJAM.js";var k=p('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TabBar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');u({"zh-CN":B,"en-US":g});const y=()=>{const e=m(),{propsTables:r}=b(),s=[{title:e("tabbar.demo.basic"),code:`<TabBar defaultValue="home">
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
</TabBar>`,desc:e("tabbar.demoDesc.animated")},{title:e("tabbar.demo.pathDraw"),code:`/* ── Custom single-path SVGs for stroke-draw animation ── */
const PATH_PIN      = "M12 21c-1.7-2.8-7-8.2-7-12.6C5 4.7 8.1 2 12 2s7 2.7 7 6.4c0 4.4-5.3 9.8-7 12.6z";
const PATH_PENCIL   = "M3 17.2L14.8 5.4l3.8 3.8L6.8 21H3v-3.8z";
const PATH_BOOKMARK = "M5 3h14v18l-7-4.5L5 21V3z";

function measurePath(d:string):number {
  const p=document.createElementNS("http://www.w3.org/2000/svg","path");
  p.setAttribute("d",d);return Math.ceil(p.getTotalLength());
}

const LEN_PIN=measurePath(PATH_PIN),LEN_PENCIL=measurePath(PATH_PENCIL),LEN_BOOKMARK=measurePath(PATH_BOOKMARK);

/* Inject one-shot keyframes keyed to actual path lengths */
const css=\`@keyframes tb-draw-1{from{stroke-dashoffset:\${LEN_PIN}}to{stroke-dashoffset:0}}
@keyframes tb-draw-2{from{stroke-dashoffset:\${LEN_PENCIL}}to{stroke-dashoffset:0}}
@keyframes tb-draw-3{from{stroke-dashoffset:\${LEN_BOOKMARK}}to{stroke-dashoffset:0}}
@keyframes tb-fill-in{from{fill-opacity:0}to{fill-opacity:1}}\`;

function seg(len:number,anim:string,active:boolean){
  if(!active)return{strokeDasharray:len,strokeDashoffset:0,fill:"none"};
  return{strokeDasharray:len,strokeDashoffset:len,fillOpacity:0,
    animation:\`\${anim} .8s cubic-bezier(.4,0,.2,1) forwards, tb-fill-in .35s ease .55s forwards\`,
    fill:"currentColor"};
}

const PinIcon=(p:{active:boolean})=>(<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d={PATH_PIN} style={seg(LEN_PIN,"tb-draw-1",p.active)}/></svg>);
const PencilIcon=(p:{active:boolean})=>(<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d={PATH_PENCIL} style={seg(LEN_PENCIL,"tb-draw-2",p.active)}/></svg>);
const BookmarkIcon=(p:{active:boolean})=>(<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d={PATH_BOOKMARK} style={seg(LEN_BOOKMARK,"tb-draw-3",p.active)}/></svg>);

<TabBar defaultValue="a">
  <TabBarItem name="a" icon={PinIcon} label="Nearby" />
  <TabBarItem name="b" icon={PencilIcon} label="Write" />
  <TabBarItem name="c" icon={BookmarkIcon} label="Saved" />
</TabBar>`,desc:e("tabbar.demoDesc.pathDraw")},{title:e("tabbar.demo.fixed"),code:`<TabBar defaultValue="a" placeholder>
  <TabBarItem name="a" icon="home" label="Home" badge={5} />
  <TabBarItem name="b" icon="shopping-cart" label="Cart" dot />
  <TabBarItem name="c" icon="user" label="Profile" />
</TabBar>`,desc:e("tabbar.demoDesc.fixed")}];return n(I,{get children(){var a=k(),i=a.firstChild,o=i.nextSibling,l=o.nextSibling;return t(o,()=>e("tabbar.intro")),t(a,n(d,{propsTables:r}),l),t(a,n(f,{each:s,children:c=>n(T,{demo:c})}),null),t(a,n(h,{}),null),a}})};export{y as TabBarDocPage};
