import{f as c,c as r,i as s,F as u,t as d,r as q}from"./index-CjqJoD8k.js";import{D as h}from"./ComponentDocLayout-7lKpA80h.js";import{u as f,e as g,z as M}from"./tableData-Dh_UhjBV.js";import{P as y}from"./PropsAttrs-BEGKasrA.js";import{D}from"./DocLayout-BMuVmMAz.js";var x=d('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style=font-size:1.75rem;font-weight:700>Marquee</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');q({"zh-CN":M,"en-US":g});const C=()=>{const e=c(),{propsTables:t,cssVarsTables:n}=f(),i=[{title:e("marquee.demo.basic"),code:`<Marquee>
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
</span>`,desc:e("marquee.demoDesc.notify")}];return r(D,{get children(){var a=x(),m=a.firstChild,o=m.nextSibling,p=o.nextSibling;return s(o,()=>e("marquee.intro")),s(a,r(y,{propsTables:t,cssVarsTables:n}),p),s(a,r(u,{each:i,children:l=>r(h,{demo:l})}),null),a}})};export{C as MarqueeDocPage};
