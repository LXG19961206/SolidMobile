import{m,_ as g,c as n,r as p,$ as f,a0 as u,i,P as y,F as x,D,a as h,t as C}from"./index-DvnxeU6a.js";var v=C('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Dialog</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');p({"zh-CN":u,"en-US":f});const S=()=>{const e=m(),{propsTables:s,cssVarsTables:a}=g(),l=[{title:e("dialog.demoAlert"),code:`Dialog.alert({
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
})`,desc:e("dialog.descPrevent")}];return n(h,{get children(){var t=v(),d=t.firstChild,o=d.nextSibling,r=o.nextSibling;return i(o,()=>e("dialog.intro")),i(t,n(y,{propsTables:s,cssVarsTables:a}),r),i(t,n(x,{each:l,children:c=>n(D,{demo:c})}),null),t}})};export{S as DialogDocPage};
