import{u as p,ax as u,c as s,i as r,P as d,F as q,t as h,r as g,ay as f,az as y}from"./index-CKeO2Rhr.js";import{D as M}from"./ComponentDocLayout-MZfk8orS.js";import{D}from"./DocLayout-CMm5c9ou.js";var x=h('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style=font-size:1.75rem;font-weight:700>Marquee</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":y,"en-US":f});const k=()=>{const e=p(),{propsTables:t,cssVarsTables:n}=u(),i=[{title:e("marquee.demo.basic"),code:`<Marquee>
  <span>🔥 Breaking News — scrolls infinitely to the left</span>
</Marquee>`,desc:e("marquee.demoDesc.basic")},{title:e("marquee.demo.speed"),code:`<Marquee duration={3}>
  <span style={{ color: "#f59e0b" }}>⚡ Fast mode — 3s per loop</span>
</Marquee>`,desc:e("marquee.demoDesc.speed")},{title:e("marquee.demo.direction"),code:`<Marquee direction="right" duration={6}>
  <span>⬅️ Reverse — scrolling rightward</span>
</Marquee>`,desc:e("marquee.demoDesc.direction")},{title:e("marquee.demo.pause"),code:`<Marquee pauseOnHover={false}>
  <span>⚠ No pause on hover</span>
</Marquee>`,desc:e("marquee.demoDesc.pause")},{title:e("marquee.demo.notify"),code:`<span onClick={() => Notify.show({
  message: <Marquee><span>🔥 Breaking — Stock market hits all-time high!</span></Marquee>,
  duration: 0, // manual dismiss
})}
  style={{ cursor: 'pointer', color: 'var(--sc-color-primary)' }}>
  📢 Open Notify with Marquee (swipe or tap to dismiss) →
</span>`,desc:e("marquee.demoDesc.notify")}];return s(D,{get children(){var a=x(),m=a.firstChild,o=m.nextSibling,l=o.nextSibling;return r(o,()=>e("marquee.intro")),r(a,s(d,{propsTables:t,cssVarsTables:n}),l),r(a,s(q,{each:i,children:c=>s(M,{demo:c})}),null),a}})};export{k as MarqueeDocPage};
