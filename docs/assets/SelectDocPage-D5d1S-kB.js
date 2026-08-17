import{m as p,b5 as d,c as s,r as h,b6 as S,b7 as g,i as o,P as u,F as v,D as x,b8 as b,a as w,t as y}from"./index-YBn7yUdg.js";var f=y('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Select</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');h({"zh-CN":g,"en-US":S});const D=()=>{const e=p(),{propsTables:a,cssVarsTables:n}=d(),i=[{title:e("select.demo.basic"),code:`const opts = [
  { text: 'Beijing', value: 'bj' },
  { text: 'Shanghai', value: 'sh' },
  { text: 'Guangzhou', value: 'gz' },
];
const [show, setShow] = createSignal(false);
const [val, setVal] = createSignal<string | number>('');

<CellGroup card>
  <Cell title="City" value={val() || 'Select'}
    clickable onClick={() => setShow(true)} />
</CellGroup>

<Select show={show()} onUpdateShow={setShow}
  options={opts} value={val()} onChange={setVal}
  onConfirm={(v) => { setVal(v); setShow(false); }}
  title="Select City"
/>`,desc:e("select.demoDesc.basic")},{title:e("select.demo.customRender"),code:`const opts = [
  { text: 'SolidJS', value: 'solid',
    render: <span style={{display:'flex',gap:'8px'}}>◈ SolidJS</span> },
  { text: 'React', value: 'react',
    render: <span style={{display:'flex',gap:'8px'}}>◇ React</span> },
];

<Select show={show()} onUpdateShow={setShow}
  options={opts}
  onConfirm={(v) => { setVal(v); setShow(false); }}
  title="Framework"
/>`,desc:e("select.demoDesc.customRender")},{title:e("select.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => console.log(v)}>
  <FormItem name="city" label="City">
    <Select options={[
      { text: 'Beijing', value: 'bj' },
      { text: 'Shanghai', value: 'sh' },
    ]} />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}><Button type="primary" block nativeType="submit" text="Submit" /></div>
</Form>`,desc:e("select.demoDesc.form")}];return s(w,{get children(){var t=f(),c=t.firstChild,l=c.nextSibling,r=l.nextSibling;return o(l,()=>e("select.intro")),o(t,s(u,{propsTables:a,cssVarsTables:n}),r),o(t,s(v,{each:i,children:m=>s(x,{demo:m})}),null),o(t,s(b,{}),null),t}})};export{D as SelectDocPage};
