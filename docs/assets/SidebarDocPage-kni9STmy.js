import{f as p,c as s,i,F as d,t as b,r as y}from"./index-CjqJoD8k.js";import{D as f}from"./ComponentDocLayout-7lKpA80h.js";import{u as g,e as h,z as u}from"./tableData-BFKeOEwj.js";import{P as v}from"./PropsAttrs-BEGKasrA.js";import{D as x}from"./DocLayout-BMuVmMAz.js";var S=b('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style=font-size:1.75rem;font-weight:700>Sidebar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');y({"zh-CN":u,"en-US":h});const A=()=>{const e=p(),{propsTables:o,cssVarsTables:r}=g(),n=[{title:e("sidebar.demo.basic"),code:`const items = [
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
/>`,desc:e("sidebar.demoDesc.compact")}];return s(x,{get children(){var t=S(),c=t.firstChild,a=c.nextSibling,m=a.nextSibling;return i(a,()=>e("sidebar.intro")),i(t,s(v,{propsTables:o,cssVarsTables:r}),m),i(t,s(d,{each:n,children:l=>s(f,{demo:l})}),null),t}})};export{A as SidebarDocPage};
