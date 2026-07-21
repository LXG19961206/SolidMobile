import{f as d,c as n,i as r,F as p,t as m,r as C}from"./index-CjqJoD8k.js";import{D as f}from"./ComponentDocLayout-7lKpA80h.js";import{u as x,e as h,z as v}from"./tableData-Db71t7nF.js";import{P as g}from"./PropsAttrs-BEGKasrA.js";import{D}from"./DocLayout-BMuVmMAz.js";var u=m('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Center</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');C({"zh-CN":v,"en-US":h});const $=()=>{const e=d(),{propsTables:o}=x(),s=[{title:e("center.demo.default"),code:`<Center>
  <span>Full center</span>
</Center>`,desc:e("center.demoDesc.default")},{title:e("center.demo.flexX"),code:`<Center flexX>
  <span>Horizontal only</span>
</Center>`,desc:e("center.demoDesc.flexX")},{title:e("center.demo.flexY"),code:`<div style={{ height: 80 }}>
  <Center flexY>
    <span>Vertical center</span>
  </Center>
</div>`,desc:e("center.demoDesc.flexY")},{title:e("center.demo.inline"),code:`Before <Center flexX inline>
  <span>Inline Center</span>
</Center> After`,desc:e("center.demoDesc.inline")},{title:e("center.demo.text"),code:`<Center text>
  <div>Centered Title</div>
  <div>Subtitle text</div>
</Center>`,desc:e("center.demoDesc.text")},{title:e("center.demo.vertical"),code:`Left <Center vertical inline>
  <span>⭐</span>
</Center>
Middle <Center vertical inline>
  <span>❤️</span>
</Center> Right`,desc:e("center.demoDesc.vertical")},{title:e("center.demo.position"),code:`<div style={{ height: 100 }}>
  <Center position>
    <span>Overlay center</span>
  </Center>
</div>`,desc:e("center.demoDesc.position")}];return n(D,{get children(){var t=u(),l=t.firstChild,i=l.nextSibling,c=i.nextSibling;return r(i,()=>e("center.intro")),r(t,n(g,{propsTables:o}),c),r(t,n(p,{each:s,children:a=>n(f,{demo:a})}),null),t}})};export{$ as CenterDocPage};
