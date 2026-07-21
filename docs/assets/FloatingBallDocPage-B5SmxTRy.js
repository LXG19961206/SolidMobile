import{f as c,c as e,i as o,F as d,t as p,r as f}from"./index-CjqJoD8k.js";import{D as b}from"./ComponentDocLayout-7lKpA80h.js";import{u as x,e as u,z as h}from"./tableData-CogqE6hX.js";import{P as F}from"./PropsAttrs-BEGKasrA.js";import{D as z}from"./DocLayout-BMuVmMAz.js";var B=p('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">FloatingBall</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');f({"zh-CN":h,"en-US":u});const $=()=>{const a=c(),{propsTables:n,cssVarsTables:i}=x(),s=[{title:a("floatingball.demo.basic"),code:`<FloatingBall>
  <Icon name="arrow-up" size={22} />
</FloatingBall>`,desc:a("floatingball.demoDesc.basic")},{title:a("floatingball.demo.custom"),code:`<FloatingBall
  style={{
    "--sc-floating-ball-bg": "linear-gradient(135deg, #667eea, #764ba2)",
    "--sc-floating-ball-radius": "16px",
    "--sc-floating-ball-size": "48px",
  }}
>
  <Icon name="star" size={22} />
</FloatingBall>`,desc:a("floatingball.demoDesc.custom")},{title:a("floatingball.demo.fixed"),code:`<FloatingBall draggable={false}>
  <Icon name="arrow-up" size={22} />
</FloatingBall>`,desc:a("floatingball.demoDesc.fixed")}];return e(z,{get children(){var l=B(),r=l.firstChild,t=r.nextSibling,g=t.nextSibling;return o(t,()=>a("floatingball.intro")),o(l,e(F,{propsTables:n,cssVarsTables:i}),g),o(l,e(d,{each:s,children:m=>e(b,{demo:m})}),null),l}})};export{$ as FloatingBallDocPage};
