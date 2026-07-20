import{u as c,bL as m,c as t,i as a,P as h,F as d,t as b,r as g,bM as x,bN as u}from"./index-DTqWD5Gv.js";import{D as f}from"./ComponentDocLayout-Brn98A7-.js";import{D as k}from"./DocLayout-JK7mFTPD.js";var C=b('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">BackTop</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":u,"en-US":x});const z=()=>{const o=c(),{propsTables:r}=m(),n=[{title:o("backtop.demo.basic"),code:`<BackTop threshold={200} />

<CellGroup>
  <For each={items}>{(item) =>
    <Cell title={item.name} />
  }</For>
</CellGroup>`,desc:o("backtop.demoDesc.basic")}];return t(k,{get children(){var e=C(),i=e.firstChild,s=i.nextSibling,l=s.nextSibling;return a(s,()=>o("backtop.intro")),a(e,t(h,{propsTables:r}),l),a(e,t(d,{each:n,children:p=>t(f,{demo:p})}),null),e}})};export{z as BackTopDocPage};
