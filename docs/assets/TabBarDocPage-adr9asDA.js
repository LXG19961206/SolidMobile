import{u as b,bB as c,c as n,i as t,P as d,F as h,bC as f,t as p,r as g,bD as B,bE as T}from"./index-DeBcw5pX.js";import{D as u}from"./ComponentDocLayout-CY9fyMGm.js";import{D as I}from"./DocLayout-gs02urVk.js";var v=p('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TabBar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":T,"en-US":B});const P=()=>{const e=b(),{propsTables:r}=c(),l=[{title:e("tabbar.demo.basic"),code:`<TabBar defaultValue="home">
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
</TabBar>`,desc:e("tabbar.demoDesc.animated")},{title:e("tabbar.demo.pathDraw"),code:`/* Path-draw via stroke-dasharray transition (no @keyframes) */
function getPathLen(d: string) {
  const ns = "http://www.w3.org/2000/svg";
  const tmp = document.createElementNS(ns,"path");
  tmp.setAttribute("d", d);
  return tmp.getTotalLength();
}

const PathHomeIcon = (p: { active: boolean }) => {
  const roof = getPathLen("M3 12L12 3l9 9");
  const body = getPathLen("M5 10v10...");
  const s = (len: number) => ({
    "stroke-dasharray": len,
    "stroke-dashoffset": p.active ? 0 : len,
    transition: "stroke-dashoffset .6s ease, fill .3s ease .3s",
    fill: p.active ? "currentColor" : "none",
  });
  return (
    <svg viewBox="0 0 24 24" width="22" height="22"
      fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M3 12L12 3l9 9" {...s(roof)} />
      <path d="M5 10v10..." {...s(body)} />
    </svg>
  );
};

<TabBar defaultValue="a">
  <TabBarItem name="a" icon={PathHomeIcon} label="Home" />
  <TabBarItem name="b" icon={PathStarIcon} label="Favorites" />
  <TabBarItem name="c" icon={PathUserIcon} label="Profile" />
</TabBar>`,desc:e("tabbar.demoDesc.pathDraw")},{title:e("tabbar.demo.fixed"),code:`<TabBar defaultValue="a" placeholder>
  <TabBarItem name="a" icon="home" label="Home" badge={5} />
  <TabBarItem name="b" icon="shopping-cart" label="Cart" dot />
  <TabBarItem name="c" icon="user" label="Profile" />
</TabBar>`,desc:e("tabbar.demoDesc.fixed")}];return n(I,{get children(){var a=v(),s=a.firstChild,o=s.nextSibling,i=o.nextSibling;return t(o,()=>e("tabbar.intro")),t(a,n(d,{propsTables:r}),i),t(a,n(h,{each:l,children:m=>n(u,{demo:m})}),null),t(a,n(f,{}),null),a}})};export{P as TabBarDocPage};
