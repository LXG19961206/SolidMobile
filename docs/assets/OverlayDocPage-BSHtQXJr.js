import{f as d,c as n,i as r,F as p,t as m,r as f}from"./index-CjqJoD8k.js";import{D as v}from"./ComponentDocLayout-7lKpA80h.js";import{u as y,e as g,z as u}from"./tableData-DoM5cYe7.js";import{P as b}from"./PropsAttrs-BEGKasrA.js";import{D as x}from"./DocLayout-BMuVmMAz.js";var h=m('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Overlay</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');f({"zh-CN":u,"en-US":g});const S=()=>{const e=d(),{propsTables:t}=y(),l=[{title:e("overlay.demo.basic"),code:`const [open, setOpen] = createSignal(false);

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
</Overlay>`,desc:e("overlay.demoDesc.scroll")}];return n(x,{get children(){var o=h(),s=o.firstChild,a=s.nextSibling,i=a.nextSibling;return r(a,()=>e("overlay.intro")),r(o,n(b,{propsTables:t}),i),r(o,n(p,{each:l,children:c=>n(v,{demo:c})}),null),o}})};export{S as OverlayDocPage};
