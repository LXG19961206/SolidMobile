import{m as r,aw as c,c as i,r as p,ax as h,ay as L,i as s,P as f,F as g,D as x,a as u,t as v}from"./index-DvnxeU6a.js";var y=v('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">List</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');p({"zh-CN":L,"en-US":h});const C=()=>{const e=r(),{propsTables:n}=c(),o=[{title:e("list.demo.static"),code:`<List data={items}>
  {(item) => (
    <Cell title={item.name} description={item.desc}
      icon={<Avatar size="sm" text={item.name[0]} />} />
  )}
</List>`,desc:e("list.demoDesc.static")},{title:e("list.demo.autoload"),code:`<List onLoad={onLoad} finished={finished}
  loadMoreText="Loading..." finishedText="No more">
  {(item) => <Cell title={item.name} description={item.desc} />}
</List>`,desc:e("list.demoDesc.autoload")},{title:e("list.demo.virtual"),code:`<List virtual itemHeight={60} data={items}>
  {(item) => (
    <div style={{ height: 60, display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar size="md" text={item.name[0]} />
      <div>{item.name}</div>
    </div>
  )}
</List>`,desc:e("list.demoDesc.virtual")},{title:e("list.demo.empty"),code:`<List data={[]} empty="No records">
  {(item) => <Cell title={item.name} />}
</List>`,desc:e("list.demoDesc.empty")},{title:e("list.demo.refresh"),code:`<List
  data={items()}
  pullRefresh
  onRefresh={async () => {
    await fetch("/api/refresh");
  }}
>
  {(item) => <Cell title={item} />}
</List>`,desc:e("list.demoDesc.refresh")}];return i(u,{get children(){var t=y(),l=t.firstChild,a=l.nextSibling,m=a.nextSibling;return s(a,()=>e("list.intro")),s(t,i(f,{propsTables:n}),m),s(t,i(g,{each:o,children:d=>i(x,{demo:d})}),null),t}})};export{C as ListDocPage};
