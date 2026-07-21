import{u as d,bs as m,c as l,i,P as w,F as h,t as C,r as g,bt as S,bu as b}from"./index-CKeO2Rhr.js";import{D as x}from"./ComponentDocLayout-MZfk8orS.js";import{D as f}from"./DocLayout-CMm5c9ou.js";var D=C('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">SwipeCell</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":b,"en-US":S});const z=()=>{const e=d(),{propsTables:o,cssVarsTables:n}=m(),c=[{title:e("swipecell.demo.right"),code:`<SwipeCell rightActions={[
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
</SwipeCell>`,desc:e("swipecell.demoDesc.disabled")}];return l(f,{get children(){var t=D(),r=t.firstChild,s=r.nextSibling,p=s.nextSibling;return i(s,()=>e("swipecell.intro")),i(t,l(w,{propsTables:o,cssVarsTables:n}),p),i(t,l(h,{each:c,children:a=>l(x,{demo:a})}),null),t}})};export{z as SwipeCellDocPage};
