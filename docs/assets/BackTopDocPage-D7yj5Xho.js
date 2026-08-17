import{m as p,g as m,c as t,r as h,h as d,j as g,i as a,P as x,F as b,D as k,a as u,t as C}from"./index-YBn7yUdg.js";var f=C('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">BackTop</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');h({"zh-CN":g,"en-US":d});const T=()=>{const o=p(),{propsTables:n}=m(),r=[{title:o("backtop.demo.basic"),code:`<BackTop threshold={200} />

<CellGroup>
  <For each={items}>{(item) =>
    <Cell title={item.name} />
  }</For>
</CellGroup>`,desc:o("backtop.demoDesc.basic")}];return t(u,{get children(){var e=f(),i=e.firstChild,s=i.nextSibling,l=s.nextSibling;return a(s,()=>o("backtop.intro")),a(e,t(x,{propsTables:n}),l),a(e,t(b,{each:r,children:c=>t(k,{demo:c})}),null),e}})};export{T as BackTopDocPage};
