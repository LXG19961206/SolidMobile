import{m,aa as d,c as e,r as b,ab as p,ac as f,i as t,P as x,F as h,D as u,a as F,t as B}from"./index-DvnxeU6a.js";var z=B('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">FloatingBall</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');b({"zh-CN":f,"en-US":p});const y=()=>{const a=m(),{propsTables:o,cssVarsTables:i}=d(),s=[{title:a("floatingball.demo.basic"),code:`<FloatingBall>
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
</FloatingBall>`,desc:a("floatingball.demoDesc.fixed")}];return e(F,{get children(){var l=z(),r=l.firstChild,n=r.nextSibling,g=n.nextSibling;return t(n,()=>a("floatingball.intro")),t(l,e(x,{propsTables:o,cssVarsTables:i}),g),t(l,e(h,{each:s,children:c=>e(u,{demo:c})}),null),l}})};export{y as FloatingBallDocPage};
