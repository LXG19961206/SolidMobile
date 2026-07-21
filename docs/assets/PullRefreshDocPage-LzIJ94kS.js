import{u as f,a$ as d,c as t,i as r,P as m,F as p,t as u,r as x,b0 as g,b1 as R}from"./index-DO-B6k_y.js";import{D}from"./ComponentDocLayout-idRjphWL.js";import{D as P}from"./DocLayout-BcF6F-9v.js";var b=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">PullRefresh</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');x({"zh-CN":R,"en-US":g});const L=()=>{const e=f(),{propsTables:n,cssVarsTables:o}=d(),i=[{title:e("pullrefresh.demo.basic"),code:`<PullRefresh onRefresh={async () => {
  await fetch("/api/refresh");
}}>
  <div>Content area</div>
</PullRefresh>`,desc:e("pullrefresh.demoDesc.basic")},{title:e("pullrefresh.demo.customText"),code:`<PullRefresh
  onRefresh={handleRefresh}
  pullingText="Pull harder..."
  loosingText="Release to refresh"
  loadingText="Loading..."
  successText="Done!"
>
  <div>Content</div>
</PullRefresh>`,desc:e("pullrefresh.demoDesc.customText")},{title:e("pullrefresh.demo.withList"),code:`<List
  data={items()}
  pullRefresh
  onRefresh={handleRefresh}
>
  {(item) => <Cell title={item} />}
</List>`,desc:e("pullrefresh.demoDesc.withList")}];return t(P,{get children(){var s=b(),a=s.firstChild,l=a.nextSibling,h=l.nextSibling;return r(l,()=>e("pullrefresh.intro")),r(s,t(m,{propsTables:n,cssVarsTables:o}),h),r(s,t(p,{each:i,children:c=>t(D,{demo:c})}),null),s}})};export{L as PullRefreshDocPage};
