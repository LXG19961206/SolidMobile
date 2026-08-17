import{m as d,J as p,c as t,r as m,K as C,L as x,i as r,P as f,F as h,D as v,a as g,t as D}from"./index-YBn7yUdg.js";var u=D('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Center</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');m({"zh-CN":x,"en-US":C});const b=()=>{const e=d(),{propsTables:s}=p(),o=[{title:e("center.demo.default"),code:`<Center>
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
</div>`,desc:e("center.demoDesc.position")}];return t(g,{get children(){var n=u(),l=n.firstChild,i=l.nextSibling,c=i.nextSibling;return r(i,()=>e("center.intro")),r(n,t(f,{propsTables:s}),c),r(n,t(h,{each:o,children:a=>t(v,{demo:a})}),null),n}})};export{b as CenterDocPage};
