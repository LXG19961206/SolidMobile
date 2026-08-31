import{m as c,at as m,c as o,r as p,au as y,av as z,i as l,P as g,F as h,D as L,a as v,t as x}from"./index-DvnxeU6a.js";var u=x('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Lazyload</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');p({"zh-CN":z,"en-US":y});const D=()=>{const e=c(),{propsTables:d}=m(),n=[{title:e("lazyload.demo.list"),code:`<Lazyload rootMargin="100px" placeholder={<div>Loading...</div>}>
  <div>Actual content</div>
</Lazyload>`,desc:e("lazyload.demoDesc.list")},{title:e("lazyload.demo.gallery"),code:`<div style={{ display: "grid", "grid-template-columns": "1fr 1fr", gap: "8px" }}>
  <For each={items}>{(item) =>
    <Lazyload height={100} placeholder={<Skeleton />}>
      <GalleryCard item={item} />
    </Lazyload>
  }</For>
</div>`,desc:e("lazyload.demoDesc.gallery")},{title:e("lazyload.demo.controlled"),code:`<Button onClick={() => setLoaded(true)}>Load</Button>
<Lazyload active={loaded()} placeholder={<Skeleton />}>
  <div>Loaded content</div>
</Lazyload>`,desc:e("lazyload.demoDesc.controlled")}];return o(v,{get children(){var a=u(),i=a.firstChild,t=i.nextSibling,r=t.nextSibling;return l(t,()=>e("lazyload.intro")),l(a,o(g,{propsTables:d}),r),l(a,o(h,{each:n,children:s=>o(L,{demo:s})}),null),a}})};export{D as LazyloadDocPage};
