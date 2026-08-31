import{m as d,bl as m,c as l,r as w,bm as h,bn as C,i,P as g,F as S,D as b,a as x,t as f}from"./index-DvnxeU6a.js";var D=f('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">SwipeCell</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');w({"zh-CN":C,"en-US":h});const y=()=>{const e=d(),{propsTables:n,cssVarsTables:o}=m(),c=[{title:e("swipecell.demo.right"),code:`<SwipeCell rightActions={[
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
</SwipeCell>`,desc:e("swipecell.demoDesc.disabled")}];return l(x,{get children(){var t=D(),a=t.firstChild,s=a.nextSibling,p=s.nextSibling;return i(s,()=>e("swipecell.intro")),i(t,l(g,{propsTables:n,cssVarsTables:o}),p),i(t,l(S,{each:c,children:r=>l(b,{demo:r})}),null),t}})};export{y as SwipeCellDocPage};
