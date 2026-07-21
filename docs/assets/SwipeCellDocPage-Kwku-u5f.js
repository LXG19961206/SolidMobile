import{f as d,c as i,i as l,F as m,t as w,r as h}from"./index-CjqJoD8k.js";import{D as C}from"./ComponentDocLayout-7lKpA80h.js";import{u as g,e as S,z as f}from"./tableData-DXfxbwdB.js";import{P as x}from"./PropsAttrs-BEGKasrA.js";import{D as b}from"./DocLayout-BMuVmMAz.js";var D=w('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">SwipeCell</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');h({"zh-CN":f,"en-US":S});const _=()=>{const e=d(),{propsTables:o,cssVarsTables:n}=g(),r=[{title:e("swipecell.demo.right"),code:`<SwipeCell rightActions={[
  { text: "Edit", theme: "primary" },
  { text: "Delete", theme: "danger" },
]}>
  <Cell title="Swipe left" description="Shows two action buttons" />
</SwipeCell>`,desc:e("swipecell.demoDesc.right")},{title:e("swipecell.demo.left"),code:`<SwipeCell leftActions={[
  { text: "Mark Read", theme: "success" },
]}>
  <Cell title="Swipe right" description="Shows action on the left" />
</SwipeCell>`,desc:e("swipecell.demoDesc.left")},{title:e("swipecell.demo.both"),code:`<SwipeCell
  leftActions={[{ text: "Pin", theme: "success" }]}
  rightActions={[{ text: "Delete", theme: "danger" }]}
>
  <Cell title="Two-way Swipe" description="Actions on both sides" />
</SwipeCell>`,desc:e("swipecell.demoDesc.both")},{title:e("swipecell.demo.disabled"),code:`<SwipeCell rightActions={actions} disabled>
  <Cell title="Disabled" description="Cannot swipe" />
</SwipeCell>`,desc:e("swipecell.demoDesc.disabled")}];return i(b,{get children(){var t=D(),c=t.firstChild,s=c.nextSibling,p=s.nextSibling;return l(s,()=>e("swipecell.intro")),l(t,i(x,{propsTables:o,cssVarsTables:n}),p),l(t,i(m,{each:r,children:a=>i(C,{demo:a})}),null),t}})};export{_ as SwipeCellDocPage};
