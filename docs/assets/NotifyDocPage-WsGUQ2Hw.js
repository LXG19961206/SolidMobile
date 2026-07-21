import{u as f,aD as p,c as e,i,P as d,F as l,t as y,r as g,aE as h,aF as u}from"./index-BZJjIwxN.js";import{D as N}from"./ComponentDocLayout-DHBBsU7j.js";import{D as x}from"./DocLayout-BD6WG0fn.js";var D=y('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Notify</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":u,"en-US":h});const z=()=>{const o=f(),{propsTables:n}=p(),a=[{title:o("notify.demo.types"),code:`Notify.primary("Connection established")
Notify.success("Operation completed")
Notify.warning("Low disk space")
Notify.danger("System error")`,desc:o("notify.demoDesc.types")},{title:o("notify.demo.position"),code:`Notify.show({ message: "Top notification", position: "top" })
Notify.show({ message: "Bottom notification", position: "bottom" })`,desc:o("notify.demoDesc.position")},{title:o("notify.demo.custom"),code:`Notify.show({
  message: "Custom styled notification",
  color: "#fff",
  background: "linear-gradient(90deg, #667eea, #764ba2)",
  duration: 4000,
})`,desc:o("notify.demoDesc.custom")}];return e(x,{get children(){var t=D(),r=t.firstChild,s=r.nextSibling,m=s.nextSibling;return i(s,()=>o("notify.intro")),i(t,e(d,{propsTables:n}),m),i(t,e(l,{each:a,children:c=>e(N,{demo:c})}),null),t}})};export{z as NotifyDocPage};
