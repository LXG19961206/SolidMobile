import{m,G as p,c as t,r as u,H as C,I as b,i,P as h,F as f,D as g,a as x,t as v}from"./index-YBn7yUdg.js";var D=v('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Cell / CellGroup</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');u({"zh-CN":b,"en-US":C});const k=()=>{const e=m(),{propsTables:c,cssVarsTables:s}=p(),r=[{title:e("cell.demo.basic"),code:`<CellGroup title="Basic Info">
  <Cell title="Username" value="John" />
  <Cell title="Phone" value="138****8888" />
  <Cell title="Bio" description="A brief description" />
</CellGroup>`,desc:e("cell.demoDesc.basic")},{title:e("cell.demo.clickable"),code:`<CellGroup title="Settings">
  <Cell title="Profile" icon="user" clickable />
  <Cell title="Notifications" icon="bell" clickable value="Enabled" />
  <Cell title="Security" icon="shield" clickable />
</CellGroup>`,desc:e("cell.demoDesc.clickable")},{title:e("cell.demo.form"),code:`<Cell title="Username" required value="John" description="6-20 characters" />
<Cell title="Password" required value="Enter password" description="At least 8 chars" />`,desc:e("cell.demoDesc.form")},{title:e("cell.demo.card"),code:`<CellGroup title="About" card>
  <Cell title="Version" value="1.0.0" />
  <Cell title="License" value="MIT" clickable />
</CellGroup>`,desc:e("cell.demoDesc.card")}];return t(x,{get children(){var l=D(),a=l.firstChild,o=a.nextSibling,n=o.nextSibling;return i(o,()=>e("cell.intro")),i(l,t(h,{propsTables:c,cssVarsTables:s}),n),i(l,t(f,{each:r,children:d=>t(g,{demo:d})}),null),l}})};export{k as CellDocPage};
