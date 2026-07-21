import{u as m,aA as b,c as t,i as s,P as v,F as p,t as f,r as g,aB as h,aC as x}from"./index-BUBEjxef.js";import{D as B}from"./ComponentDocLayout-BLUSG-Qz.js";import{D}from"./DocLayout-BdRy2cRJ.js";var N=f('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">NavBar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":x,"en-US":h});const y=()=>{const e=m(),{propsTables:n,cssVarsTables:o}=b(),i=[{title:e("navbar.demo.basic"),code:'<NavBar title="Page Title" border />',desc:e("navbar.demoDesc.basic")},{title:e("navbar.demo.back"),code:'<NavBar title="Details" backArrow onBack={() => history.back()} />',desc:e("navbar.demoDesc.back")},{title:e("navbar.demo.sides"),code:`<NavBar
  title="Messages"
  left={<Icon name="user" size={20} />}
  right={<Icon name="settings" size={20} />}
/>`,desc:e("navbar.demoDesc.sides")},{title:e("navbar.demo.style"),code:'<NavBar title="Brand" background="#1677ff" color="#fff" backArrow />',desc:e("navbar.demoDesc.style")},{title:e("navbar.demo.fixed"),code:'<NavBar title="Fixed Nav" fixed placeholder border />',desc:e("navbar.demoDesc.fixed")},{title:"JSX Title + Tabs",code:`<NavBar
  title={
    <Tabs>
      <Tab name="a" title="Posts" />
      <Tab name="b" title="Likes" />
      <Tab name="c" title="Saved" />
    </Tabs>
  }
  left={<Icon name="search" size={20} />}
  right={<span>+ New</span>}
/>`,desc:"title 支持任意 JSX，可嵌入 Tabs 等组件，实现导航栏 + 标签页的复合布局。"}];return t(D,{get children(){var a=N(),l=a.firstChild,r=l.nextSibling,c=r.nextSibling;return s(r,()=>e("navbar.intro")),s(a,t(v,{propsTables:n,cssVarsTables:o}),c),s(a,t(p,{each:i,children:d=>t(B,{demo:d})}),null),a}})};export{y as NavBarDocPage};
