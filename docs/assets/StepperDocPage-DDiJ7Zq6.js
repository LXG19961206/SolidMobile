import{f as d,c as s,i as r,F as c,t as g,r as u}from"./index-CjqJoD8k.js";import{D as b}from"./ComponentDocLayout-7lKpA80h.js";import{u as h,e as v,z as S}from"./tableData-D5o8ArHO.js";import{P as f}from"./PropsAttrs-BEGKasrA.js";import{D as x}from"./DocLayout-BMuVmMAz.js";var D=g('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Stepper</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');u({"zh-CN":S,"en-US":v});const V=()=>{const e=d(),{propsTables:p,cssVarsTables:a}=h(),i=[{title:e("stepper.demo.basic"),code:`const [val, setVal] = createSignal(0);

<Stepper value={val()} onChange={setVal} />`,desc:e("stepper.demoDesc.basic")},{title:e("stepper.demo.range"),code:"<Stepper value={val()} onChange={setVal} min={1} max={10} />",desc:e("stepper.demoDesc.range")},{title:e("stepper.demo.step"),code:"<Stepper value={val()} onChange={setVal} step={0.5} decimalLength={1} />",desc:e("stepper.demoDesc.step")},{title:e("stepper.demo.disabled"),code:`<Stepper value={5} disabled />
<Stepper value={5} inputDisabled />`,desc:e("stepper.demoDesc.disabled")},{title:e("stepper.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => console.log(v)}>
  <FormItem name="count" label="Quantity">
    <Stepper />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("stepper.demoDesc.form")}];return s(x,{get children(){var t=D(),l=t.firstChild,o=l.nextSibling,n=o.nextSibling;return r(o,()=>e("stepper.intro")),r(t,s(f,{propsTables:p,cssVarsTables:a}),n),r(t,s(c,{each:i,children:m=>s(b,{demo:m})}),null),t}})};export{V as StepperDocPage};
