import{u as m,bi as p,c as a,i as o,P as u,F as v,t as b,r as g,bj as h,bk as f}from"./index-osnDA0YE.js";import{D}from"./ComponentDocLayout-Db5cSvn2.js";import{D as x}from"./DocLayout-DrqhY6Yv.js";var R=b('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Rate</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":f,"en-US":h});const F=()=>{const e=m(),{propsTables:l,cssVarsTables:s}=p(),n=[{title:e("rate.demo.basic"),code:`const [val, setVal] = createSignal(3);

<Rate value={val()} onChange={setVal} />`,desc:e("rate.demoDesc.basic")},{title:e("rate.demo.half"),code:"<Rate value={3.5} allowHalf />",desc:e("rate.demoDesc.half")},{title:e("rate.demo.count"),code:'<Rate count={7} value={5} icon="heart" voidIcon="heart" />',desc:e("rate.demoDesc.count")},{title:e("rate.demo.color"),code:`<Rate value={3} color="#22c55e" voidColor="#e5e7eb" />
<Rate value={4} color="#f59e0b" voidColor="#fef3c7" />`,desc:e("rate.demoDesc.color")},{title:e("rate.demo.clearable"),code:`const [val, setVal] = createSignal(3);

<Rate value={val()} onChange={setVal} clearable />`,desc:e("rate.demoDesc.clearable")},{title:e("rate.demo.readonly"),code:`<Rate value={4} readonly />
<Rate value={2} disabled />`,desc:e("rate.demoDesc.readonly")},{title:e("rate.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => console.log(v)}>
  <FormItem name="rating" label="Rating">
    <Rate />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("rate.demoDesc.form")}];return a(x,{get children(){var t=R(),c=t.firstChild,r=c.nextSibling,i=r.nextSibling;return o(r,()=>e("rate.intro")),o(t,a(u,{propsTables:l,cssVarsTables:s}),i),o(t,a(v,{each:n,children:d=>a(D,{demo:d})}),null),t}})};export{F as RateDocPage};
