import{f as m,c as l,i as o,F as h,t as p,r as b}from"./index-CjqJoD8k.js";import{D as g}from"./ComponentDocLayout-7lKpA80h.js";import{u as f,e as S,z as B}from"./tableData-mKEh2XcG.js";import{P as v}from"./PropsAttrs-BEGKasrA.js";import{D as x}from"./DocLayout-BMuVmMAz.js";var D=p('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">ScrollBar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');b({"zh-CN":B,"en-US":S});const L=()=>{const e=m(),{propsTables:s,cssVarsTables:a}=f(),i=[{title:e("scrollbar.demo.basic"),code:`<ScrollBar height={200}>
  <div>Long content that overflows...</div>
</ScrollBar>`,desc:e("scrollbar.demoDesc.basic")},{title:e("scrollbar.demo.color"),code:`<ScrollBar height={200} color="#1677ff" width={8}>
  <div>Blue scrollbar</div>
</ScrollBar>`,desc:e("scrollbar.demoDesc.color")},{title:e("scrollbar.demo.width"),code:`<ScrollBar height={200} width={4}>
  <div>Thinner scrollbar</div>
</ScrollBar>`,desc:e("scrollbar.demoDesc.width")},{title:e("scrollbar.demo.list"),code:`<ScrollBar height={380}>
  <List virtual itemHeight={56} data={genItems(0, 1000)} finished>
    {(item) => <Cell title={item.name} />}
  </List>
</ScrollBar>`,desc:e("scrollbar.demoDesc.list")}];return l(x,{get children(){var r=D(),c=r.firstChild,t=c.nextSibling,n=t.nextSibling;return o(t,()=>e("scrollbar.intro")),o(r,l(v,{propsTables:s,cssVarsTables:a}),n),o(r,l(h,{each:i,children:d=>l(g,{demo:d})}),null),r}})};export{L as ScrollBarDocPage};
