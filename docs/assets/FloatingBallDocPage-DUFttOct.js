import{u as m,a5 as d,c as e,i as t,P as p,F as f,t as b,r as x,a6 as u,a7 as h}from"./index-CKeO2Rhr.js";import{D as F}from"./ComponentDocLayout-MZfk8orS.js";import{D as B}from"./DocLayout-CMm5c9ou.js";var D=b('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">FloatingBall</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');x({"zh-CN":h,"en-US":u});const C=()=>{const a=m(),{propsTables:n,cssVarsTables:i}=d(),s=[{title:a("floatingball.demo.basic"),code:`<FloatingBall>
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
</FloatingBall>`,desc:a("floatingball.demoDesc.fixed")}];return e(B,{get children(){var l=D(),r=l.firstChild,o=r.nextSibling,g=o.nextSibling;return t(o,()=>a("floatingball.intro")),t(l,e(p,{propsTables:n,cssVarsTables:i}),g),t(l,e(f,{each:s,children:c=>e(F,{demo:c})}),null),l}})};export{C as FloatingBallDocPage};
