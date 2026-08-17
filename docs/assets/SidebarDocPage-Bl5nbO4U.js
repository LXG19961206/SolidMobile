import{m as d,b9 as p,c as s,r as b,ba as y,bb as g,i as a,P as h,F as f,D as v,a as u,t as x}from"./index-YBn7yUdg.js";var S=x('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style=font-size:1.75rem;font-weight:700>Sidebar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');b({"zh-CN":g,"en-US":y});const D=()=>{const e=d(),{propsTables:n,cssVarsTables:o}=p(),r=[{title:e("sidebar.demo.basic"),code:`const items = [
  { key: 'form', title: 'Form' },
  { key: 'item', title: 'FormItem' },
  { key: 'rule', title: 'FormRule' },
];
const [active, setActive] = createSignal('form');

<Sidebar items={items} activeKey={active()} onChange={setActive} />`,desc:e("sidebar.demoDesc.basic")},{title:e("sidebar.demo.jsx"),code:`<Sidebar
  items={[
    { key: 'form', title: <><span style={{color:"#1677ff"}}>📋</span> Form</> },
    { key: 'item', title: <><span style={{color:"#22c55e"}}>📝</span> FormItem</> },
    { key: 'rule', title: <><span style={{color:"#f59e0b"}}>✅</span> Rules</> },
  ]}
  activeKey={active()} onChange={setActive}
/>`,desc:e("sidebar.demoDesc.jsx")},{title:e("sidebar.demo.compact"),code:`<Sidebar compact
  items={[
    { key: 'form', title: 'Form', icon: <span>📋</span> },
    { key: 'item', title: 'Item', icon: <span>📝</span> },
    { key: 'rule', title: 'Rules', icon: <span>✅</span> },
  ]}
  activeKey={active()} onChange={setActive}
/>`,desc:e("sidebar.demoDesc.compact")}];return s(u,{get children(){var t=S(),c=t.firstChild,i=c.nextSibling,l=i.nextSibling;return a(i,()=>e("sidebar.intro")),a(t,s(h,{propsTables:n,cssVarsTables:o}),l),a(t,s(f,{each:r,children:m=>s(v,{demo:m})}),null),t}})};export{D as SidebarDocPage};
