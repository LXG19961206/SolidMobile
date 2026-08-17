import{m as d,aL as p,c as n,r as m,aM as v,aN as y,i as a,P as g,F as f,D as b,a as u,t as x}from"./index-YBn7yUdg.js";var h=x('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Overlay</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');m({"zh-CN":y,"en-US":v});const D=()=>{const e=d(),{propsTables:r}=p(),t=[{title:e("overlay.demo.basic"),code:`const [open, setOpen] = createSignal(false);

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
</Overlay>`,desc:e("overlay.demoDesc.scroll")}];return n(u,{get children(){var o=h(),s=o.firstChild,l=s.nextSibling,i=l.nextSibling;return a(l,()=>e("overlay.intro")),a(o,n(g,{propsTables:r}),i),a(o,n(f,{each:t,children:c=>n(b,{demo:c})}),null),o}})};export{D as OverlayDocPage};
