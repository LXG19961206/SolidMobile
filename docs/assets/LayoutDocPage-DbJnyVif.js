import{u as r,al as C,c as n,i as a,P as m,F as v,t as c,r as g,am as f,an as u}from"./index-zzIybHw_.js";import{D as y}from"./ComponentDocLayout-DH2w8NsB.js";import{D as w}from"./DocLayout-dzaL4NuS.js";var h=c('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Layout</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":u,"en-US":f});const b=()=>{const o=r(),{propsTables:s}=C(),i=[{title:o("layout.demo.grid"),code:`<Row gap={8}>
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
</Row>`,desc:o("layout.demoDesc.align")}];return n(w,{get children(){var e=h(),l=e.firstChild,t=l.nextSibling,d=t.nextSibling;return a(t,()=>o("layout.intro")),a(e,n(m,{propsTables:s}),d),a(e,n(v,{each:i,children:p=>n(y,{demo:p})}),null),e}})};export{b as LayoutDocPage};
