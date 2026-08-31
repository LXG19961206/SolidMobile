import{m as d,bi as c,c as s,r as g,bj as b,bk as u,i as a,P as h,F as v,D as S,a as x,t as D}from"./index-DvnxeU6a.js";var y=D('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Stepper</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":u,"en-US":b});const C=()=>{const e=d(),{propsTables:r,cssVarsTables:o}=c(),l=[{title:e("stepper.demo.basic"),code:`const [val, setVal] = createSignal(0);

<Stepper value={val()} onChange={setVal} />`,desc:e("stepper.demoDesc.basic")},{title:e("stepper.demo.range"),code:"<Stepper value={val()} onChange={setVal} min={1} max={10} />",desc:e("stepper.demoDesc.range")},{title:e("stepper.demo.step"),code:"<Stepper value={val()} onChange={setVal} step={0.5} decimalLength={1} />",desc:e("stepper.demoDesc.step")},{title:e("stepper.demo.disabled"),code:`<Stepper value={5} disabled />
<Stepper value={5} inputDisabled />`,desc:e("stepper.demoDesc.disabled")},{title:e("stepper.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => console.log(v)}>
  <FormItem name="count" label="Quantity">
    <Stepper />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("stepper.demoDesc.form")}];return s(x,{get children(){var t=y(),n=t.firstChild,p=n.nextSibling,i=p.nextSibling;return a(p,()=>e("stepper.intro")),a(t,s(h,{propsTables:r,cssVarsTables:o}),i),a(t,s(v,{each:l,children:m=>s(S,{demo:m})}),null),t}})};export{C as StepperDocPage};
