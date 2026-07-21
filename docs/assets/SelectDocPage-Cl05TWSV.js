import{f as p,c as o,i as s,F as d,t as h,r as S}from"./index-CjqJoD8k.js";import{D as u}from"./ComponentDocLayout-7lKpA80h.js";import{u as g,S as v,e as x,z as f}from"./SelectDesign-BH0KFsvg.js";import{P as b}from"./PropsAttrs-BEGKasrA.js";import{D as w}from"./DocLayout-BMuVmMAz.js";var y=h('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Select</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');S({"zh-CN":f,"en-US":x});const T=()=>{const e=p(),{propsTables:a,cssVarsTables:i}=g(),n=[{title:e("select.demo.basic"),code:`const opts = [
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
</Form>`,desc:e("select.demoDesc.form")}];return o(w,{get children(){var t=y(),r=t.firstChild,l=r.nextSibling,c=l.nextSibling;return s(l,()=>e("select.intro")),s(t,o(b,{propsTables:a,cssVarsTables:i}),c),s(t,o(d,{each:n,children:m=>o(u,{demo:m})}),null),s(t,o(v,{}),null),t}})};export{T as SelectDocPage};
