import{u as m,bz as h,c as l,i as o,P as b,F as p,t as g,r as S,bA as B,bB as f}from"./index-CMUIHquS.js";import{D as v}from"./ComponentDocLayout-CTIAxjRF.js";import{D as x}from"./DocLayout-Cw9mKrhd.js";var D=g('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">ScrollBar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');S({"zh-CN":f,"en-US":B});const C=()=>{const e=m(),{propsTables:s,cssVarsTables:a}=h(),i=[{title:e("scrollbar.demo.basic"),code:`<ScrollBar height={200}>
  <div>Long content that overflows...</div>
</ScrollBar>`,desc:e("scrollbar.demoDesc.basic")},{title:e("scrollbar.demo.color"),code:`<ScrollBar height={200} color="#1677ff" width={8}>
  <div>Blue scrollbar</div>
</ScrollBar>`,desc:e("scrollbar.demoDesc.color")},{title:e("scrollbar.demo.width"),code:`<ScrollBar height={200} width={4}>
  <div>Thinner scrollbar</div>
</ScrollBar>`,desc:e("scrollbar.demoDesc.width")},{title:e("scrollbar.demo.list"),code:`<ScrollBar height={380}>
  <List virtual itemHeight={56} data={genItems(0, 1000)} finished>
    {(item) => <Cell title={item.name} />}
  </List>
</ScrollBar>`,desc:e("scrollbar.demoDesc.list")}];return l(x,{get children(){var r=D(),c=r.firstChild,t=c.nextSibling,n=t.nextSibling;return o(t,()=>e("scrollbar.intro")),o(r,l(b,{propsTables:s,cssVarsTables:a}),n),o(r,l(p,{each:i,children:d=>l(v,{demo:d})}),null),r}})};export{C as ScrollBarDocPage};
