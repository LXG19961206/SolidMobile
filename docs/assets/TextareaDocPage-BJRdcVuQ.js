import{u as d,bL as x,c as t,i as o,P as p,F as u,t as h,r as b,bM as g,bN as T}from"./index-BpewzGtL.js";import{D as v}from"./ComponentDocLayout-Bkjb1zAw.js";import{D as f}from"./DocLayout-CaxxNUR0.js";var w=h('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Textarea</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');b({"zh-CN":T,"en-US":g});const z=()=>{const e=d(),{propsTables:s,cssVarsTables:l}=x(),n=[{title:e("textarea.demo.basic"),code:`<Textarea placeholder="Enter text" />
<Textarea rows={5} placeholder="5 rows tall" />`,desc:e("textarea.demoDesc.basic")},{title:e("textarea.demo.autoSize"),code:`<Textarea autoSize placeholder="Auto-expand as you type" />
<Textarea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="Min 2, max 6 rows" />`,desc:e("textarea.demoDesc.autoSize")},{title:e("textarea.demo.states"),code:`<Textarea rows={3} placeholder="Normal" />
<Textarea disabled value="Not editable" />
<Textarea readonly value="Focusable & copyable" />
<Textarea error value="Invalid format" />
<Textarea clearable defaultValue="Tap X to clear" />`,desc:e("textarea.demoDesc.states")},{title:e("textarea.demo.count"),code:'<Textarea showCount maxlength={200} rows={4} placeholder="Max 200 chars" />',desc:e("textarea.demoDesc.count")},{title:e("textarea.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => console.log(v)}>
  <FormItem name="remark" label="Note" rules={[{
    validator: (v) => (v as string)?.length <= 200,
    message: "Max 200 chars",
  }]}>
    <Textarea placeholder="Enter note" showCount maxlength={200} rows={4} />
  </FormItem>
  <div style={{ padding: "12px 1rem" }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("textarea.demoDesc.form")}];return t(f,{get children(){var a=w(),i=a.firstChild,r=i.nextSibling,m=r.nextSibling;return o(r,()=>e("textarea.intro")),o(a,t(p,{propsTables:s,cssVarsTables:l}),m),o(a,t(u,{each:n,children:c=>t(v,{demo:c})}),null),a}})};export{z as TextareaDocPage};
