import{f as c,c as o,i as r,F as l,t as d,r as y}from"./index-CjqJoD8k.js";import{D as g}from"./ComponentDocLayout-7lKpA80h.js";import{u,e as f,z as h}from"./tableData-C6FuVlHg.js";import{P as x}from"./PropsAttrs-BEGKasrA.js";import{D}from"./DocLayout-BMuVmMAz.js";var z=d('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Empty</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');y({"zh-CN":h,"en-US":f});const N=()=>{const e=c(),{propsTables:m}=u(),i=[{title:e("empty.demo.preset"),code:`<Empty description="No data" />
<Empty description="Network error" image="network" />
<Empty description="No results found" image="search" />`,desc:e("empty.demoDesc.preset")},{title:e("empty.demo.custom"),code:`<Empty
  image={<div style={{ fontSize: "3rem" }}>📭</div>}
  description="Your cart is empty"
>
  <Button type="primary" size="sm">Go shopping</Button>
</Empty>`,desc:e("empty.demoDesc.custom")}];return o(D,{get children(){var t=z(),n=t.firstChild,s=n.nextSibling,p=s.nextSibling;return r(s,()=>e("empty.intro")),r(t,o(x,{propsTables:m}),p),r(t,o(l,{each:i,children:a=>o(g,{demo:a})}),null),t}})};export{N as EmptyDocPage};
