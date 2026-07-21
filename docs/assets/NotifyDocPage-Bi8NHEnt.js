import{f,c as e,i,F as p,t as d,r as l}from"./index-CjqJoD8k.js";import{D as y}from"./ComponentDocLayout-7lKpA80h.js";import{u as g,e as h,z as u}from"./tableData-DYuwmedE.js";import{P as N}from"./PropsAttrs-BEGKasrA.js";import{D as x}from"./DocLayout-BMuVmMAz.js";var D=d('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Notify</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');l({"zh-CN":u,"en-US":h});const _=()=>{const o=f(),{propsTables:n}=g(),r=[{title:o("notify.demo.types"),code:`Notify.primary("Connection established")
Notify.success("Operation completed")
Notify.warning("Low disk space")
Notify.danger("System error")`,desc:o("notify.demoDesc.types")},{title:o("notify.demo.position"),code:`Notify.show({ message: "Top notification", position: "top" })
Notify.show({ message: "Bottom notification", position: "bottom" })`,desc:o("notify.demoDesc.position")},{title:o("notify.demo.custom"),code:`Notify.show({
  message: "Custom styled notification",
  color: "#fff",
  background: "linear-gradient(90deg, #667eea, #764ba2)",
  duration: 4000,
})`,desc:o("notify.demoDesc.custom")}];return e(x,{get children(){var t=D(),a=t.firstChild,s=a.nextSibling,m=s.nextSibling;return i(s,()=>o("notify.intro")),i(t,e(N,{propsTables:n}),m),i(t,e(p,{each:r,children:c=>e(y,{demo:c})}),null),t}})};export{_ as NotifyDocPage};
