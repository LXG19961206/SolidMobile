import{m as v,a1 as m,c as d,r as p,a2 as D,a3 as h,i as r,P as x,F as g,D as f,a as z,t as y}from"./index-DvnxeU6a.js";var b=y('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Divider</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');p({"zh-CN":h,"en-US":D});const C=()=>{const e=v(),{propsTables:o,cssVarsTables:s}=m(),a=[{title:e("divider.demo.horizontal"),code:`<div>Content above</div>
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
</div>`,desc:e("divider.demoDesc.vertical")}];return d(z,{get children(){var i=b(),n=i.firstChild,t=n.nextSibling,c=t.nextSibling;return r(t,()=>e("divider.intro")),r(i,d(x,{propsTables:o,cssVarsTables:s}),c),r(i,d(g,{each:a,children:l=>d(f,{demo:l})}),null),i}})};export{C as DividerDocPage};
