import{u as r,ao as p,c as t,i as o,P as h,F as b,t as u,r as S,ap as x,aq as D}from"./index-osnDA0YE.js";import{D as f}from"./ComponentDocLayout-Db5cSvn2.js";import{D as g}from"./DocLayout-DrqhY6Yv.js";var A=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">ActionSheet</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');S({"zh-CN":D,"en-US":x});const O=()=>{const e=r(),{propsTables:a,cssVarsTables:i}=p(),c=[{title:e("actionsheet.demo.basic"),code:`const items = [{ name: "Edit" }, { name: "Share" }, { name: "Delete" }];

<ActionSheet
  open={open()}
  onClose={() => setOpen(false)}
  items={items}
/>`,desc:e("actionsheet.demoDesc.basic")},{title:e("actionsheet.demo.full"),code:`<ActionSheet
  open={open()}
  onClose={() => setOpen(false)}
  title="Confirm Delete"
  description="This cannot be undone."
  closeable
  items={[{ name: "Delete directly" }, { name: "Export then delete" }]}
  cancelText="Cancel"
/>`,desc:e("actionsheet.demoDesc.full")},{title:e("actionsheet.demo.twoline"),code:`<ActionSheet
  open={open()}
  title="Upload Method"
  items={[
    { name: "From Album", subname: "Select from library" },
    { name: "Take Photo", subname: "Use camera" },
  ]}
  cancelText="Cancel"
/>`,desc:e("actionsheet.demoDesc.twoline")},{title:e("actionsheet.demo.disabled"),code:`<ActionSheet
  open={open()}
  items={[
    { name: "Option A" },
    { name: "Option B", disabled: true },
    { name: "Option C" },
  ]}
  cancelText="Cancel"
/>`,desc:e("actionsheet.demoDesc.disabled")},{title:e("actionsheet.demo.noClose"),code:`<ActionSheet
  open={open()}
  title="Select Tags"
  closeable
  closeOnSelect={false}
  items={[
    { name: "Frontend" }, { name: "Backend" },
  ]}
  cancelText="Done"
/>`,desc:e("actionsheet.demoDesc.noClose")},{title:e("actionsheet.demo.custom"),code:`<ActionSheet open={open()} title="About" closeable>
  <div style={{ padding: 20, textAlign: "center" }}>
    <p>Custom content here</p>
  </div>
</ActionSheet>`,desc:e("actionsheet.demoDesc.custom")}];return t(g,{get children(){var n=A(),l=n.firstChild,s=l.nextSibling,m=s.nextSibling;return o(s,()=>e("actionsheet.intro")),o(n,t(h,{propsTables:a,cssVarsTables:i}),m),o(n,t(b,{each:c,children:d=>t(f,{demo:d})}),null),n}})};export{O as ActionSheetDocPage};
