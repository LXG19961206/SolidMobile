import{f as m,c as t,i as r,F as c,t as p,r as d}from"./index-CjqJoD8k.js";import{D as u}from"./ComponentDocLayout-7lKpA80h.js";import{u as x,e as g,z as R}from"./tableData-BsP5UVHS.js";import{P as D}from"./PropsAttrs-BEGKasrA.js";import{D as P}from"./DocLayout-BMuVmMAz.js";var T=p('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">PullRefresh</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');d({"zh-CN":R,"en-US":g});const y=()=>{const e=m(),{propsTables:n,cssVarsTables:o}=x(),i=[{title:e("pullrefresh.demo.basic"),code:`<PullRefresh onRefresh={async () => {
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
</List>`,desc:e("pullrefresh.demoDesc.withList")}];return t(P,{get children(){var s=T(),a=s.firstChild,l=a.nextSibling,h=l.nextSibling;return r(l,()=>e("pullrefresh.intro")),r(s,t(D,{propsTables:n,cssVarsTables:o}),h),r(s,t(c,{each:i,children:f=>t(u,{demo:f})}),null),s}})};export{y as PullRefreshDocPage};
