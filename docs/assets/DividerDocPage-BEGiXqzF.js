import{u as v,Y as m,c as d,i as r,P as p,F as D,t as h,r as x,Z as g,_ as f}from"./index-DO-B6k_y.js";import{D as z}from"./ComponentDocLayout-idRjphWL.js";import{D as u}from"./DocLayout-BcF6F-9v.js";var y=h('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Divider</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');x({"zh-CN":f,"en-US":g});const T=()=>{const e=v(),{propsTables:o,cssVarsTables:s}=m(),n=[{title:e("divider.demo.horizontal"),code:`<div>Content above</div>
<Divider />
<div>Content below</div>`,desc:e("divider.demoDesc.horizontal")},{title:e("divider.demo.text"),code:`<Divider text="I am a divider" />
<Divider text="Or like this" />
<Divider text="No more content" />`,desc:e("divider.demoDesc.text")},{title:e("divider.demo.dashed"),code:`<Divider dashed />
<Divider dashed text="Dashed text" />`,desc:e("divider.demoDesc.dashed")},{title:e("divider.demo.color"),code:`<Divider color="var(--sc-color-primary, #1677ff)" size={2} />
<Divider color="#ef4444" text="Red warning" size={2} />
<Divider color="#22c55e" dashed text="Green dashed" />`,desc:e("divider.demoDesc.color")},{title:e("divider.demo.vertical"),code:`<div style={{ display: "flex", gap: "12px", "align-items": "center" }}>
  <span>One</span>
  <Divider direction="vertical" />
  <span>Two</span>
  <Divider direction="vertical" dashed color="var(--sc-color-primary)" />
  <span>Three</span>
  <Divider direction="vertical" color="#ef4444" size={2} />
  <span>Four</span>
</div>`,desc:e("divider.demoDesc.vertical")}];return d(u,{get children(){var i=y(),a=i.firstChild,t=a.nextSibling,c=t.nextSibling;return r(t,()=>e("divider.intro")),r(i,d(p,{propsTables:o,cssVarsTables:s}),c),r(i,d(D,{each:n,children:l=>d(z,{demo:l})}),null),i}})};export{T as DividerDocPage};
