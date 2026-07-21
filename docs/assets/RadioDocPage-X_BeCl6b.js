import{f as u,c as o,i as l,F as m,t as p,r as v}from"./index-CjqJoD8k.js";import{D as h}from"./ComponentDocLayout-7lKpA80h.js";import{u as b,e as R,z as g}from"./tableData-CnfbPnsQ.js";import{P as C}from"./PropsAttrs-BEGKasrA.js";import{D as f}from"./DocLayout-BMuVmMAz.js";var x=p('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Radio</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');v({"zh-CN":g,"en-US":R});const S=()=>{const e=u(),{propsTables:n,cssVarsTables:d}=b(),r=[{title:e("radio.demo.basic"),code:`const [val, setVal] = createSignal('a');

<RadioGroup value={val()} onChange={setVal}>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
  <Radio value="c" label="Option C" />
</RadioGroup>`,desc:e("radio.demoDesc.basic")},{title:e("radio.demo.disabled"),code:`<RadioGroup value={val()} onChange={setVal}>
  <Radio value="a" label="Normal" />
  <Radio value="b" label="Disabled" disabled />
  <Radio value="c" label="Also Normal" />
</RadioGroup>

{/* Or disable the whole group */}
<RadioGroup disabled value={val()} onChange={setVal}>
  <Radio value="x" label="All disabled" />
</RadioGroup>`,desc:e("radio.demoDesc.disabled")},{title:e("radio.demo.shape"),code:`<RadioGroup value={val()} onChange={setVal}>
  <Radio value="a" label="Round (default)" />
  <Radio value="b" label="Square" shape="square" />
  <Radio value="c" label="Dot" shape="dot" />
</RadioGroup>`,desc:e("radio.demoDesc.shape")},{title:e("radio.demo.color"),code:`<RadioGroup value={val()} onChange={setVal} checkedColor="#22c55e">
  <Radio value="a" label="Green" />
  <Radio value="b" label="Green" />
  <Radio value="c" label="Green" />
</RadioGroup>`,desc:e("radio.demoDesc.color")},{title:e("radio.demo.horizontal"),code:`<RadioGroup direction="horizontal" value={val()} onChange={setVal}>
  <Radio value="a" label="Light" />
  <Radio value="b" label="Dark" />
</RadioGroup>`,desc:e("radio.demoDesc.horizontal")},{title:e("radio.demo.customIcon"),code:`// Custom face icons
const LikeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em"
    fill="none" stroke="currentColor" stroke-width="1.8">
    <circle cx="12" cy="12" r="10" />
    <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <path d="M8 15c0 0 1.5 2.5 4 2.5s4-2.5 4-2.5" />
  </svg>
);

<RadioGroup value={val()} onChange={setVal} iconSize="28px">
  <Radio value="like" label="Good"
    checkedIcon={<LikeIcon />}
    uncheckedIcon={<LikeIcon />} />
  {/* ... meh, bad variants */}
</RadioGroup>`,desc:e("radio.demoDesc.customIcon")},{title:e("radio.demo.standalone"),code:`const [checked, setChecked] = createSignal(false);

<Radio
  value="x"
  label="Tap to toggle"
  checked={checked()}
  onChange={setChecked}
/>`,desc:e("radio.demoDesc.standalone")},{title:e("radio.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => Toast.success(JSON.stringify(v))}>
  <FormItem name="lang" label="Language" required
    rules={[{ validator: (v) => !!v, message: 'Please select' }]}>
    <RadioGroup direction="horizontal">
      <Radio value="zh" label="Chinese" />
      <Radio value="en" label="English" />
      <Radio value="ja" label="Japanese" />
    </RadioGroup>
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("radio.demoDesc.form")}];return o(f,{get children(){var a=x(),t=a.firstChild,i=t.nextSibling,s=i.nextSibling;return l(i,()=>e("radio.intro")),l(a,o(C,{propsTables:n,cssVarsTables:d}),s),l(a,o(m,{each:r,children:c=>o(h,{demo:c})}),null),a}})};export{S as RadioDocPage};
