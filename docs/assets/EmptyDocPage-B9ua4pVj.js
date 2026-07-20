import{u as c,H as l,c as o,i as s,P as d,F as y,t as g,r as u,J as h,K as f}from"./index-osnDA0YE.js";import{D as x}from"./ComponentDocLayout-Db5cSvn2.js";import{D}from"./DocLayout-DrqhY6Yv.js";var E=g('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Empty</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');u({"zh-CN":f,"en-US":h});const w=()=>{const e=c(),{propsTables:i}=l(),m=[{title:e("empty.demo.preset"),code:`<Empty description="No data" />
<Empty description="Network error" image="network" />
<Empty description="No results found" image="search" />`,desc:e("empty.demoDesc.preset")},{title:e("empty.demo.custom"),code:`<Empty
  image={<div style={{ fontSize: "3rem" }}>📭</div>}
  description="Your cart is empty"
>
  <Button type="primary" size="sm">Go shopping</Button>
</Empty>`,desc:e("empty.demoDesc.custom")}];return o(D,{get children(){var t=E(),n=t.firstChild,r=n.nextSibling,p=r.nextSibling;return s(r,()=>e("empty.intro")),s(t,o(d,{propsTables:i}),p),s(t,o(y,{each:m,children:a=>o(x,{demo:a})}),null),t}})};export{w as EmptyDocPage};
