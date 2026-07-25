import{u as m,bp as p,c as o,i as t,P as g,F as b,t as u,r as v,bq as S,br as h}from"./index-DlR2SW7y.js";import{D as x}from"./ComponentDocLayout-BB-mE6C9.js";import{D}from"./DocLayout-D2PlSy3l.js";var f=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Slider</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');v({"zh-CN":h,"en-US":S});const V=()=>{const e=m(),{propsTables:s,cssVarsTables:i}=p(),a=[{title:e("slider.demo.basic"),code:`const [val, setVal] = createSignal(50);

<Slider value={val()} onChange={setVal} />`,desc:e("slider.demoDesc.basic")},{title:e("slider.demo.range"),code:`const [val, setVal] = createSignal([20, 80]);

<Slider count={2} value={val()} onChange={setVal} />`,desc:e("slider.demoDesc.range")},{title:e("slider.demo.step"),code:"<Slider value={50} step={10} />",desc:e("slider.demoDesc.step")},{title:e("slider.demo.color"),code:'<Slider value={40} activeColor="#22c55e" inactiveColor="#e5e7eb" />',desc:e("slider.demoDesc.color")},{title:e("slider.demo.disabled"),code:`<Slider value={60} disabled />
<Slider value={60} readonly />`,desc:e("slider.demoDesc.disabled")},{title:e("slider.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => console.log(v)}>
  <FormItem name="range" label="Volume">
    <Slider />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("slider.demoDesc.form")}];return o(D,{get children(){var l=f(),d=l.firstChild,r=d.nextSibling,n=r.nextSibling;return t(r,()=>e("slider.intro")),t(l,o(g,{propsTables:s,cssVarsTables:i}),n),t(l,o(b,{each:a,children:c=>o(x,{demo:c})}),null),l}})};export{V as SliderDocPage};
