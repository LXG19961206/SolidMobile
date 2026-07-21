import{f as p,c as o,i as l,F as h,t as d,r as S}from"./index-CjqJoD8k.js";import{D as w}from"./ComponentDocLayout-7lKpA80h.js";import{u as v,e as u,z as f}from"./tableData-BWSugvSc.js";import{P as C}from"./PropsAttrs-BEGKasrA.js";import{D as k}from"./DocLayout-BMuVmMAz.js";var g=d('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">TimePicker</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');S({"zh-CN":f,"en-US":u});const D=()=>{const e=p(),{propsTables:a,cssVarsTables:i}=v(),r=[{title:e("timepicker.demo.basic"),code:`const [show, setShow] = createSignal(false);
const [val, setVal] = createSignal('');

<CellGroup card>
  <Cell title="Select Time" value={val() || 'Please select'}
    clickable onClick={() => setShow(true)} />
</CellGroup>

<TimePicker show={show()} onUpdateShow={setShow}
  onChange={(v) => setVal(v)}
  onConfirm={(v) => { setVal(v); setShow(false); }}
  onCancel={() => setShow(false)} />`,desc:e("timepicker.demoDesc.basic")},{title:e("timepicker.demo.preset"),code:`const [show, setShow] = createSignal(false);
const [val, setVal] = createSignal('14:30:00');

<CellGroup card>
  <Cell title="Preset Value" value={val()}
    clickable onClick={() => setShow(true)} />
</CellGroup>

<TimePicker show={show()} onUpdateShow={setShow}
  value={val()} onChange={(v) => setVal(v)}
  onConfirm={(v) => { setVal(v); setShow(false); }}
  onCancel={() => setShow(false)} />`,desc:e("timepicker.demoDesc.preset")},{title:e("timepicker.demo.showUnit"),code:`const [show, setShow] = createSignal(false);
const [val, setVal] = createSignal('');

<CellGroup card>
  <Cell title="Show Units" value={val() || 'Please select'} description="08时 30分 15秒"
    clickable onClick={() => setShow(true)} />
</CellGroup>

<TimePicker show={show()} onUpdateShow={setShow}
  showUnit
  value={val()} onChange={(v) => setVal(v)}
  onConfirm={(v) => { setVal(v); setShow(false); }}
  onCancel={() => setShow(false)} />`,desc:e("timepicker.demoDesc.showUnit")},{title:e("timepicker.demo.form"),code:`const [formVal, setFormVal] = createSignal({});

<Form onSubmit={(v) => { setFormVal(v); }} labelWidth="5em">
  <FormItem name="startTime" label="Start Time" required>
    <TimePicker placeholder="Select start time" />
  </FormItem>
  <FormItem name="endTime" label="End Time">
    <TimePicker placeholder="Select end time" />
  </FormItem>
  <div style={{ padding: '8px 0' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("timepicker.demoDesc.form")}];return o(k,{get children(){var t=g(),c=t.firstChild,s=c.nextSibling,m=s.nextSibling;return l(s,()=>e("timepicker.intro")),l(t,o(C,{propsTables:a,cssVarsTables:i}),m),l(t,o(h,{each:r,children:n=>o(w,{demo:n})}),null),t}})};export{D as TimePickerDocPage};
