import{f as p,c as e,i as t,F as d,t as c,r as g}from"./index-CjqJoD8k.js";import{D as T}from"./ComponentDocLayout-7lKpA80h.js";import{u as f,e as h,z as y}from"./tableData-DW-IE5YV.js";import{P as u}from"./PropsAttrs-BEGKasrA.js";import{D as x}from"./DocLayout-BMuVmMAz.js";var D=c('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Toast</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":y,"en-US":h});const C=()=>{const s=p(),{propsTables:a}=f(),i=[{title:s("toast.demo.types"),code:`Toast.success("Operation successful!")
Toast.error("Something went wrong!")
Toast.warning("Please check your input.")
Toast.loading("Loading...")
Toast.info("This is an info message.")`,desc:s("toast.demoDesc.types")},{title:s("toast.demo.position"),code:`Toast.show({ message: "Top", position: "top" })
Toast.show({ message: "Middle", position: "middle" })
Toast.show({ message: "Bottom", position: "bottom" })`,desc:s("toast.demoDesc.position")},{title:s("toast.demo.overlay"),code:`Toast.show({ message: "Loading...", type: "loading", overlay: true })
Toast.info("First line\\nSecond line\\nThird line")`,desc:s("toast.demoDesc.overlay")},{title:s("toast.demo.dismiss"),code:`Toast.info("Message one")
Toast.info("Message two")

// 关闭所有
Toast.dismissAll()`,desc:s("toast.demoDesc.dismiss")},{title:"JSX 自定义内容",code:`Toast.info(
  <span style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <span>🎂</span>
    <span>Happy <strong>Birthday</strong>!</span>
    <small>— from Solid Component</small>
  </span>
)`,desc:"message 支持 JSX，想塞什么塞什么。"}];return e(x,{get children(){var o=D(),r=o.firstChild,n=r.nextSibling,l=n.nextSibling;return t(n,()=>s("toast.intro")),t(o,e(u,{propsTables:a}),l),t(o,e(d,{each:i,children:m=>e(T,{demo:m})}),null),o}})};export{C as ToastDocPage};
