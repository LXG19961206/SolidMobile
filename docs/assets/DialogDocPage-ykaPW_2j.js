import{f as m,c as i,i as o,F as g,t as f,r as p}from"./index-CjqJoD8k.js";import{D as u}from"./ComponentDocLayout-7lKpA80h.js";import{u as y,e as D,z as x}from"./tableData-CSkOYle_.js";import{P as h}from"./PropsAttrs-BEGKasrA.js";import{D as C}from"./DocLayout-BMuVmMAz.js";var v=f('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Dialog</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');p({"zh-CN":x,"en-US":D});const P=()=>{const e=m(),{propsTables:s,cssVarsTables:a}=y(),l=[{title:e("dialog.demoAlert"),code:`Dialog.alert({
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
})`,desc:e("dialog.descPrevent")}];return i(C,{get children(){var t=v(),r=t.firstChild,n=r.nextSibling,d=n.nextSibling;return o(n,()=>e("dialog.intro")),o(t,i(h,{propsTables:s,cssVarsTables:a}),d),o(t,i(g,{each:l,children:c=>i(u,{demo:c})}),null),t}})};export{P as DialogDocPage};
