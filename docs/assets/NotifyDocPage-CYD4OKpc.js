import{m as d,aI as f,c as e,r as l,aJ as p,aK as y,i,P as g,F as h,D as u,a as N,t as x}from"./index-YBn7yUdg.js";var b=x('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Notify</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');l({"zh-CN":y,"en-US":p});const w=()=>{const o=d(),{propsTables:s}=f(),a=[{title:o("notify.demo.types"),code:`Notify.primary("Connection established")
Notify.success("Operation completed")
Notify.warning("Low disk space")
Notify.danger("System error")`,desc:o("notify.demoDesc.types")},{title:o("notify.demo.position"),code:`Notify.show({ message: "Top notification", position: "top" })
Notify.show({ message: "Bottom notification", position: "bottom" })`,desc:o("notify.demoDesc.position")},{title:o("notify.demo.custom"),code:`Notify.show({
  message: "Custom styled notification",
  color: "#fff",
  background: "linear-gradient(90deg, #667eea, #764ba2)",
  duration: 4000,
})`,desc:o("notify.demoDesc.custom")}];return e(N,{get children(){var t=b(),r=t.firstChild,n=r.nextSibling,c=n.nextSibling;return i(n,()=>o("notify.intro")),i(t,e(g,{propsTables:s}),c),i(t,e(h,{each:a,children:m=>e(u,{demo:m})}),null),t}})};export{w as NotifyDocPage};
