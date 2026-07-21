import{f as p,c as t,i as n,F as c,t as d,r as T}from"./index-CjqJoD8k.js";import{D as m}from"./ComponentDocLayout-7lKpA80h.js";import{u as y,e as u,z as f}from"./tableData-rTKezgrs.js";import{P as x}from"./PropsAttrs-BEGKasrA.js";import{D}from"./DocLayout-BMuVmMAz.js";var b=d('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Tag</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');T({"zh-CN":f,"en-US":u});const w=()=>{const e=p(),{propsTables:g}=y(),o=[{title:e("tag.demo.types"),code:`<Tag type="primary">Primary</Tag>
<Tag type="success">Success</Tag>
<Tag type="warning">Warning</Tag>
<Tag type="danger">Danger</Tag>
<Tag type="info">Info</Tag>`,desc:e("tag.demoDesc.types")},{title:e("tag.demo.variant"),code:`<Tag variant="outline" round>Outline</Tag>
<Tag type="danger" variant="outline" round>Danger</Tag>
<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>`,desc:e("tag.demoDesc.variant")},{title:e("tag.demo.size"),code:`<Tag size="sm" round type="danger">Small Capsule</Tag>
<Tag round type="primary">Capsule</Tag>`,desc:e("tag.demoDesc.size")},{title:e("tag.demo.closeable"),code:`<Tag closeable onClose={() => {}}>Closable</Tag>
<Tag closeable type="success">Tag 1</Tag>
<Tag closeable type="danger">Tag 2</Tag>`,desc:e("tag.demoDesc.closeable")},{title:e("tag.demo.scenes"),code:`<div style="display:flex;flex-wrap:wrap;gap:6px">
  <Tag round>Frontend</Tag>
  <Tag type="success" round>React</Tag>
  <Tag type="warning" round>TypeScript</Tag>
  <Tag closeable type="primary">Beijing</Tag>
  <Tag closeable type="primary">Frontend</Tag>
</div>`,desc:e("tag.demoDesc.scenes")}];return t(D,{get children(){var a=b(),r=a.firstChild,s=r.nextSibling,i=s.nextSibling;return n(s,()=>e("tag.intro")),n(a,t(x,{propsTables:g}),i),n(a,t(c,{each:o,children:l=>t(m,{demo:l})}),null),a}})};export{w as TagDocPage};
