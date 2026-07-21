import{u as s,bB as c,c as n,i as t,P as d,F as p,bC as f,t as B,r as T,bD as g,bE as h}from"./index-BZJjIwxN.js";import{D as u}from"./ComponentDocLayout-DHBBsU7j.js";import{D as I}from"./DocLayout-BD6WG0fn.js";var v=B('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TabBar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');T({"zh-CN":h,"en-US":g});const C=()=>{const a=s(),{propsTables:r}=c(),l=[{title:a("tabbar.demo.basic"),code:`<TabBar defaultValue="home">
  <TabBarItem name="home" icon="home" label="Home" />
  <TabBarItem name="cart" icon="shopping-cart" label="Cart" />
  <TabBarItem name="user" icon="user" label="Profile" />
</TabBar>`,desc:a("tabbar.demoDesc.basic")},{title:a("tabbar.demo.badge"),code:`<TabBar defaultValue={0}>
  <TabBarItem name={0} icon="home" label="Home" badge={5} />
  <TabBarItem name={1} icon="chat" label="Messages" dot />
  <TabBarItem name={2} icon="settings" label="Settings" badge={99} />
</TabBar>`,desc:a("tabbar.demoDesc.badge")},{title:a("tabbar.demo.color"),code:`<TabBar defaultValue="a" activeColor="#22c55e">
  <TabBarItem name="a" icon="home" label="Home" />
  <TabBarItem name="b" icon="star" label="Favorites" />
  <TabBarItem name="c" icon="user" label="Profile" />
</TabBar>`,desc:a("tabbar.demoDesc.color")},{title:a("tabbar.demo.animated"),code:`/* CSS keyframes */
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

/* Animated SVG icon component */
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

/* Usage */
<TabBar defaultValue="a">
  <TabBarItem name="a" icon={AnimatedHomeIcon} label="Home" />
  <TabBarItem name="b" icon={AnimatedStarIcon} label="Favorites" />
  <TabBarItem name="c" icon={AnimatedUserIcon} label="Profile" />
</TabBar>`,desc:a("tabbar.demoDesc.animated")},{title:a("tabbar.demo.fixed"),code:`<TabBar defaultValue="a" placeholder>
  <TabBarItem name="a" icon="home" label="Home" badge={5} />
  <TabBarItem name="b" icon="shopping-cart" label="Cart" dot />
  <TabBarItem name="c" icon="user" label="Profile" />
</TabBar>`,desc:a("tabbar.demoDesc.fixed")}];return n(I,{get children(){var e=v(),i=e.firstChild,o=i.nextSibling,m=o.nextSibling;return t(o,()=>a("tabbar.intro")),t(e,n(d,{propsTables:r}),m),t(e,n(p,{each:l,children:b=>n(u,{demo:b})}),null),t(e,n(f,{}),null),e}})};export{C as TabBarDocPage};
