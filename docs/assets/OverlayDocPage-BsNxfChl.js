import{u as d,aG as p,c as n,i as a,P as m,F as v,t as y,r as g,aH as f,aI as u}from"./index-BZJjIwxN.js";import{D as b}from"./ComponentDocLayout-DHBBsU7j.js";import{D as x}from"./DocLayout-BD6WG0fn.js";var h=y('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Overlay</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":u,"en-US":f});const C=()=>{const e=d(),{propsTables:t}=p(),l=[{title:e("overlay.demo.basic"),code:`const [open, setOpen] = createSignal(false);

<Overlay open={open()} onClose={() => setOpen(false)}>
  <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
    <p>Click backdrop to close</p>
  </div>
</Overlay>`,desc:e("overlay.demoDesc.basic")},{title:e("overlay.demo.content"),code:`<Overlay open={open()}>
  <div style={{ background: "#fff", padding: "32px 40px", borderRadius: 12, textAlign: "center" }}>
    <Loading type="circular" size={36} />
    <p>Submitting...</p>
  </div>
</Overlay>`,desc:e("overlay.demoDesc.content")},{title:e("overlay.demo.scroll"),code:`<Overlay open={open()} onClose={() => setOpen(false)} lockScroll={false}>
  <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
    <p>Background can still scroll</p>
  </div>
</Overlay>`,desc:e("overlay.demoDesc.scroll")}];return n(x,{get children(){var o=h(),s=o.firstChild,r=s.nextSibling,i=r.nextSibling;return a(r,()=>e("overlay.intro")),a(o,n(m,{propsTables:t}),i),a(o,n(v,{each:l,children:c=>n(b,{demo:c})}),null),o}})};export{C as OverlayDocPage};
