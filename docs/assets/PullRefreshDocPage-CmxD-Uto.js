import{m as d,aR as f,c as t,r as m,aS as p,aT as u,i as l,P as x,F as g,D as R,a as P,t as D}from"./index-DvnxeU6a.js";var T=D('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">PullRefresh</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');m({"zh-CN":u,"en-US":p});const C=()=>{const e=d(),{propsTables:n,cssVarsTables:a}=f(),o=[{title:e("pullrefresh.demo.basic"),code:`<PullRefresh onRefresh={async () => {
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
</List>`,desc:e("pullrefresh.demoDesc.withList")}];return t(P,{get children(){var s=T(),i=s.firstChild,r=i.nextSibling,h=r.nextSibling;return l(r,()=>e("pullrefresh.intro")),l(s,t(x,{propsTables:n,cssVarsTables:a}),h),l(s,t(g,{each:o,children:c=>t(R,{demo:c})}),null),s}})};export{C as PullRefreshDocPage};
