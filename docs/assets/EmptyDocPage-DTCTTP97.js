import{m as c,a7 as l,c as o,r as d,a8 as y,a9 as g,i as s,P as h,F as u,D as x,a as f,t as D}from"./index-DvnxeU6a.js";var E=D('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Empty</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');d({"zh-CN":g,"en-US":y});const b=()=>{const e=c(),{propsTables:n}=l(),i=[{title:e("empty.demo.preset"),code:`<Empty description="No data" />
<Empty description="Network error" image="network" />
<Empty description="No results found" image="search" />`,desc:e("empty.demoDesc.preset")},{title:e("empty.demo.custom"),code:`<Empty
  image={<div style={{ fontSize: "3rem" }}>📭</div>}
  description="Your cart is empty"
>
  <Button type="primary" size="sm">Go shopping</Button>
</Empty>`,desc:e("empty.demoDesc.custom")}];return o(f,{get children(){var t=E(),m=t.firstChild,r=m.nextSibling,a=r.nextSibling;return s(r,()=>e("empty.intro")),s(t,o(h,{propsTables:n}),a),s(t,o(u,{each:i,children:p=>o(x,{demo:p})}),null),t}})};export{b as EmptyDocPage};
