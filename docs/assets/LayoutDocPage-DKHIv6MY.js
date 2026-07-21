import{f as r,c as n,i as t,F as m,t as C,r as v}from"./index-CjqJoD8k.js";import{D as c}from"./ComponentDocLayout-7lKpA80h.js";import{u as f,e as g,z as u}from"./tableData-DJZSJT9z.js";import{P as y}from"./PropsAttrs-BEGKasrA.js";import{D as w}from"./DocLayout-BMuVmMAz.js";var h=C('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Layout</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');v({"zh-CN":u,"en-US":g});const L=()=>{const o=r(),{propsTables:s}=f(),i=[{title:o("layout.demo.grid"),code:`<Row gap={8}>
  <Col span={12}><div>span=12</div></Col>
  <Col span={12}><div>span=12</div></Col>
</Row>
<Row gap={8}>
  <Col span={8}><div>span=8</div></Col>
  <Col span={8}><div>span=8</div></Col>
  <Col span={8}><div>span=8</div></Col>
</Row>`,desc:o("layout.demoDesc.grid")},{title:o("layout.demo.offset"),code:`<Row gap={8}>
  <Col span={8}><div>span=8</div></Col>
  <Col span={8} offset={8}><div>span=8 offset=8</div></Col>
</Row>`,desc:o("layout.demoDesc.offset")},{title:o("layout.demo.align"),code:`<Row gap={16} justify="between">
  <Col span={4}><div>Left</div></Col>
  <Col span={4}><div>Right</div></Col>
</Row>
<Row gap={8} justify="center">
  <Col span={5}><div>Center</div></Col>
  <Col span={5}><div>Center</div></Col>
</Row>`,desc:o("layout.demoDesc.align")}];return n(w,{get children(){var e=h(),l=e.firstChild,a=l.nextSibling,d=a.nextSibling;return t(a,()=>o("layout.intro")),t(e,n(y,{propsTables:s}),d),t(e,n(m,{each:i,children:p=>n(c,{demo:p})}),null),e}})};export{L as LayoutDocPage};
