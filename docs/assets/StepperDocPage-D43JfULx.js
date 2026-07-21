import{u as d,bl as c,c as s,i as p,P as g,F as b,t as u,r as h,bm as v,bn as S}from"./index-CMUIHquS.js";import{D as x}from"./ComponentDocLayout-CTIAxjRF.js";import{D}from"./DocLayout-Cw9mKrhd.js";var f=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Stepper</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');h({"zh-CN":S,"en-US":v});const z=()=>{const e=d(),{propsTables:o,cssVarsTables:a}=c(),l=[{title:e("stepper.demo.basic"),code:`const [val, setVal] = createSignal(0);

<Stepper value={val()} onChange={setVal} />`,desc:e("stepper.demoDesc.basic")},{title:e("stepper.demo.range"),code:"<Stepper value={val()} onChange={setVal} min={1} max={10} />",desc:e("stepper.demoDesc.range")},{title:e("stepper.demo.step"),code:"<Stepper value={val()} onChange={setVal} step={0.5} decimalLength={1} />",desc:e("stepper.demoDesc.step")},{title:e("stepper.demo.disabled"),code:`<Stepper value={5} disabled />
<Stepper value={5} inputDisabled />`,desc:e("stepper.demoDesc.disabled")},{title:e("stepper.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => console.log(v)}>
  <FormItem name="count" label="Quantity">
    <Stepper />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("stepper.demoDesc.form")}];return s(D,{get children(){var t=f(),n=t.firstChild,r=n.nextSibling,i=r.nextSibling;return p(r,()=>e("stepper.intro")),p(t,s(g,{propsTables:o,cssVarsTables:a}),i),p(t,s(b,{each:l,children:m=>s(x,{demo:m})}),null),t}})};export{z as StepperDocPage};
