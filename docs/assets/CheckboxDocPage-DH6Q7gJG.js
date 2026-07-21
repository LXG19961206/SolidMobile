import{f as r,c as l,i as a,F as d,t as x,r as k}from"./index-CjqJoD8k.js";import{D as u}from"./ComponentDocLayout-7lKpA80h.js";import{u as C,e as m,z as v}from"./tableData-Coh4UPKR.js";import{P as p}from"./PropsAttrs-BEGKasrA.js";import{D as g}from"./DocLayout-BMuVmMAz.js";var G=x('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Checkbox</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');k({"zh-CN":v,"en-US":m});const y=()=>{const e=r(),{propsTables:n,cssVarsTables:s}=C(),t=[{title:e("checkbox.demo.basic"),code:`const [vals, setVals] = createSignal<unknown[]>([]);

<CheckboxGroup value={vals()} onChange={setVals}>
  <Checkbox value="code" label="Code" />
  <Checkbox value="music" label="Music" />
  <Checkbox value="read" label="Read" />
</CheckboxGroup>`,desc:e("checkbox.demoDesc.basic")},{title:e("checkbox.demo.disabled"),code:`<CheckboxGroup value={vals()} onChange={setVals}>
  <Checkbox value="a" label="Normal" />
  <Checkbox value="b" label="Disabled" disabled />
  <Checkbox value="c" label="Also Normal" />
</CheckboxGroup>

{/* Global disable */}
<CheckboxGroup disabled value={vals()} onChange={setVals}>
  <Checkbox value="x" label="All disabled" />
</CheckboxGroup>`,desc:e("checkbox.demoDesc.disabled")},{title:e("checkbox.demo.shape"),code:`<CheckboxGroup value={vals()} onChange={setVals}>
  <Checkbox value="a" label="Square (default)" />
  <Checkbox value="b" label="Round" shape="round" />
</CheckboxGroup>`,desc:e("checkbox.demoDesc.shape")},{title:e("checkbox.demo.color"),code:`<CheckboxGroup value={vals()} onChange={setVals} checkedColor="#22c55e">
  <Checkbox value="a" label="Green" />
  <Checkbox value="b" label="Green" />
  <Checkbox value="c" label="Green" />
</CheckboxGroup>`,desc:e("checkbox.demoDesc.color")},{title:e("checkbox.demo.horizontal"),code:`<CheckboxGroup direction="horizontal" value={vals()} onChange={setVals}>
  <Checkbox value="a" label="Option A" />
  <Checkbox value="b" label="Option B" />
  <Checkbox value="c" label="Option C" />
</CheckboxGroup>`,desc:e("checkbox.demoDesc.horizontal")},{title:e("checkbox.demo.max"),code:`<CheckboxGroup max={2} value={vals()} onChange={setVals}>
  <Checkbox value="a" label="Option A" />
  <Checkbox value="b" label="Option B" />
  <Checkbox value="c" label="Option C" />
  <Checkbox value="d" label="This one gets disabled when 2 selected" />
</CheckboxGroup>`,desc:e("checkbox.demoDesc.max")},{title:e("checkbox.demo.indeterminate"),code:`const [vals, setVals] = createSignal<unknown[]>([]);
const all = ['a', 'b', 'c'];
const isAll = () => vals().length === all.length;
const isIndeterminate = () => vals().length > 0 && vals().length < all.length;

<div>
  <Checkbox
    label={isAll() ? 'Deselect All' : 'Select All'}
    checked={isAll()}
    indeterminate={isIndeterminate()}
    onChange={(checked) => setVals(checked ? all : [])}
  />
  <CheckboxGroup value={vals()} onChange={setVals}>
    <Checkbox value="a" label="Option A" />
    <Checkbox value="b" label="Option B" />
    <Checkbox value="c" label="Option C" />
  </CheckboxGroup>
</div>`,desc:e("checkbox.demoDesc.indeterminate")},{title:e("checkbox.demo.standalone"),code:`const [checked, setChecked] = createSignal(false);

<Checkbox
  value="agree"
  label="I agree to the terms"
  checked={checked()}
  onChange={setChecked}
/>`,desc:e("checkbox.demoDesc.standalone")},{title:e("checkbox.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => Toast.success(JSON.stringify(v))}>
  <FormItem name="hobbies" label="Hobbies" labelAlign="top" required
    rules={[{
      validator: (v) => (v as unknown[])?.length > 0,
      message: 'Please select at least one',
    }]}>
    <CheckboxGroup direction="horizontal">
      <Checkbox value="code" label="Code" />
      <Checkbox value="music" label="Music" />
      <Checkbox value="read" label="Read" />
    </CheckboxGroup>
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("checkbox.demoDesc.form")}];return l(g,{get children(){var o=G(),b=o.firstChild,c=b.nextSibling,h=c.nextSibling;return a(c,()=>e("checkbox.intro")),a(o,l(p,{propsTables:n,cssVarsTables:s}),h),a(o,l(d,{each:t,children:i=>l(u,{demo:i})}),null),o}})};export{y as CheckboxDocPage};
