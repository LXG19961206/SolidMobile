import{f as c,c as o,i as r,F as p,t as g,r as u}from"./index-CjqJoD8k.js";import{D as v}from"./ComponentDocLayout-7lKpA80h.js";import{u as S,e as b,z as h}from"./tableData-DeeLwWVa.js";import{P as f}from"./PropsAttrs-BEGKasrA.js";import{D as x}from"./DocLayout-BMuVmMAz.js";var D=g('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Slider</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');u({"zh-CN":h,"en-US":b});const T=()=>{const e=c(),{propsTables:s,cssVarsTables:i}=S(),a=[{title:e("slider.demo.basic"),code:`const [val, setVal] = createSignal(50);

<Slider value={val()} onChange={setVal} />`,desc:e("slider.demoDesc.basic")},{title:e("slider.demo.range"),code:`const [val, setVal] = createSignal([20, 80]);

<Slider count={2} value={val()} onChange={setVal} />`,desc:e("slider.demoDesc.range")},{title:e("slider.demo.step"),code:"<Slider value={50} step={10} />",desc:e("slider.demoDesc.step")},{title:e("slider.demo.color"),code:'<Slider value={40} activeColor="#22c55e" inactiveColor="#e5e7eb" />',desc:e("slider.demoDesc.color")},{title:e("slider.demo.disabled"),code:`<Slider value={60} disabled />
<Slider value={60} readonly />`,desc:e("slider.demoDesc.disabled")},{title:e("slider.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => console.log(v)}>
  <FormItem name="range" label="Volume">
    <Slider />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("slider.demoDesc.form")}];return o(x,{get children(){var l=D(),d=l.firstChild,t=d.nextSibling,n=t.nextSibling;return r(t,()=>e("slider.intro")),r(l,o(f,{propsTables:s,cssVarsTables:i}),n),r(l,o(p,{each:a,children:m=>o(v,{demo:m})}),null),l}})};export{T as SliderDocPage};
