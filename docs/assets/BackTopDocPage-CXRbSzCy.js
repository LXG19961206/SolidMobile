import{f as m,c as t,i as r,F as c,t as h,r as d}from"./index-CjqJoD8k.js";import{D as f}from"./ComponentDocLayout-7lKpA80h.js";import{u as g,e as x,z as b}from"./tableData-C-kC6ZQ-.js";import{P as u}from"./PropsAttrs-BEGKasrA.js";import{D as k}from"./DocLayout-BMuVmMAz.js";var C=h('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">BackTop</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');d({"zh-CN":b,"en-US":x});const _=()=>{const o=m(),{propsTables:s}=g(),i=[{title:o("backtop.demo.basic"),code:`<BackTop threshold={200} />

<CellGroup>
  <For each={items}>{(item) =>
    <Cell title={item.name} />
  }</For>
</CellGroup>`,desc:o("backtop.demoDesc.basic")}];return t(k,{get children(){var e=C(),n=e.firstChild,a=n.nextSibling,l=a.nextSibling;return r(a,()=>o("backtop.intro")),r(e,t(u,{propsTables:s}),l),r(e,t(c,{each:i,children:p=>t(f,{demo:p})}),null),e}})};export{_ as BackTopDocPage};
