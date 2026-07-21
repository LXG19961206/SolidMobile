import{f as m,c as t,i,F as p,t as u,r as C}from"./index-CjqJoD8k.js";import{D as b}from"./ComponentDocLayout-7lKpA80h.js";import{u as f,e as h,z as g}from"./tableData-DmLn5zXB.js";import{P as x}from"./PropsAttrs-BEGKasrA.js";import{D}from"./DocLayout-BMuVmMAz.js";var v=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Cell / CellGroup</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');C({"zh-CN":g,"en-US":h});const S=()=>{const e=m(),{propsTables:r,cssVarsTables:s}=f(),c=[{title:e("cell.demo.basic"),code:`<CellGroup title="Basic Info">
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
</CellGroup>`,desc:e("cell.demoDesc.card")}];return t(D,{get children(){var l=v(),a=l.firstChild,o=a.nextSibling,n=o.nextSibling;return i(o,()=>e("cell.intro")),i(l,t(x,{propsTables:r,cssVarsTables:s}),n),i(l,t(p,{each:c,children:d=>t(b,{demo:d})}),null),l}})};export{S as CellDocPage};
