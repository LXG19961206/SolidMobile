import{u as m,af as g,c as n,i,P as f,F as p,t as u,r as y,ag as D,ah as x}from"./index-osnDA0YE.js";import{D as h}from"./ComponentDocLayout-Db5cSvn2.js";import{D as C}from"./DocLayout-DrqhY6Yv.js";var v=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Dialog</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');y({"zh-CN":x,"en-US":D});const w=()=>{const e=m(),{propsTables:s,cssVarsTables:a}=g(),l=[{title:e("dialog.demoAlert"),code:`Dialog.alert({
  title: "Notice",
  message: "Operation successful!",
})`,desc:e("dialog.descAlert")},{title:e("dialog.demoConfirm"),code:`Dialog.confirm({
  title: "Confirm Delete",
  message: "This cannot be undone. Are you sure?",
})`,desc:e("dialog.descConfirm")},{title:e("dialog.demoNoTitle"),code:'Dialog.show({ message: "Plain text without a title." })',desc:e("dialog.descNoTitle")},{title:e("dialog.demoMultiline"),code:'Dialog.alert({ message: "Line 1\\nLine 2\\nLine 3" })',desc:e("dialog.descMultiline")},{title:e("dialog.demoCustomBtns"),code:`Dialog.confirm({
  title: "Save Draft",
  message: "Save current edits?",
  confirmText: "Save",
  cancelText: "Discard",
})`,desc:e("dialog.descCustomBtns")},{title:e("dialog.demoJsx"),code:`Dialog.alert({
  title: "Order Summary",
  message: (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Item</span>
        <span style={{ fontWeight: 600 }}>Solid Pro</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>License</span>
        <span style={{ color: "#22c55e", fontWeight: 700 }}>MIT — Free</span>
      </div>
    </div>
  ),
})`,desc:e("dialog.descJsx")},{title:e("dialog.demoAsync"),code:`Dialog.confirm({
  title: "Submit",
  message: "Are you sure?",
  confirmText: "Submit",
  showCancelButton: true,
  onConfirm: async () => {
    await fetch("/api/submit");
  },
})`,desc:e("dialog.descAsync")},{title:e("dialog.demoPrevent"),code:`Dialog.confirm({
  title: "Confirm",
  message: 'Only "Confirm" can close.',
  beforeClose: (action) => {
    return action === "confirm" ? true : false;
  },
})`,desc:e("dialog.descPrevent")}];return n(C,{get children(){var t=v(),r=t.firstChild,o=r.nextSibling,d=o.nextSibling;return i(o,()=>e("dialog.intro")),i(t,n(f,{propsTables:s,cssVarsTables:a}),d),i(t,n(p,{each:l,children:c=>n(h,{demo:c})}),null),t}})};export{w as DialogDocPage};
