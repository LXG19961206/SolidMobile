import{u as d,ac as p,c as e,i as t,P as c,F as g,t as T,r as h,ad as f,ae as y}from"./index-CMUIHquS.js";import{D as u}from"./ComponentDocLayout-CTIAxjRF.js";import{D as x}from"./DocLayout-Cw9mKrhd.js";var D=T('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Toast</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');h({"zh-CN":y,"en-US":f});const v=()=>{const s=d(),{propsTables:n}=p(),i=[{title:s("toast.demo.types"),code:`Toast.success("Operation successful!")
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
)`,desc:"message 支持 JSX，想塞什么塞什么。"}];return e(x,{get children(){var o=D(),r=o.firstChild,a=r.nextSibling,l=a.nextSibling;return t(a,()=>s("toast.intro")),t(o,e(c,{propsTables:n}),l),t(o,e(g,{each:i,children:m=>e(u,{demo:m})}),null),o}})};export{v as ToastDocPage};
