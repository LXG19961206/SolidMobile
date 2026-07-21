import{u as p,bR as d,c as o,i as s,P as h,F as S,bS as u,t as g,r as v,bT as x,bU as b}from"./index-CMUIHquS.js";import{D as f}from"./ComponentDocLayout-CTIAxjRF.js";import{D as w}from"./DocLayout-Cw9mKrhd.js";var y=g('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Select</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');v({"zh-CN":b,"en-US":x});const F=()=>{const e=p(),{propsTables:a,cssVarsTables:n}=d(),i=[{title:e("select.demo.basic"),code:`const opts = [
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
</Form>`,desc:e("select.demoDesc.form")}];return o(w,{get children(){var t=y(),r=t.firstChild,l=r.nextSibling,c=l.nextSibling;return s(l,()=>e("select.intro")),s(t,o(h,{propsTables:a,cssVarsTables:n}),c),s(t,o(S,{each:i,children:m=>o(f,{demo:m})}),null),s(t,o(u,{}),null),t}})};export{F as SelectDocPage};
