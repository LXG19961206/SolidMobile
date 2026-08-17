import{m as g,br as h,c as t,r as p,bs as b,bt as f,i,P as w,F as x,D as T,a as v,t as u}from"./index-YBn7yUdg.js";var S=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Switch</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><p style="padding:8px 12px;background:#fef3c7;border-radius:6px;font-size:0.85rem;color:#92400e"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');p({"zh-CN":f,"en-US":b});const D=()=>{const e=g(),{propsTables:n,cssVarsTables:l}=h(),a=[{title:e("switch.demo.basic"),code:`// ⚠ Import with alias to avoid SolidJS built-in <Switch>
import { Switch as Toggle } from "solid-component";

const [on, setOn] = createSignal(false);

<Toggle checked={on()} onChange={setOn} />

{/* Uncontrolled */}
<Toggle defaultChecked onChange={(v) => console.log(v)} />`,desc:e("switch.demoDesc.basic")},{title:e("switch.demo.disabled"),code:`<Toggle disabled />
<Toggle disabled checked />`,desc:e("switch.demoDesc.disabled")},{title:e("switch.demo.color"),code:`<Toggle activeColor="#22c55e" inactiveColor="#f3f4f6" />
<Toggle activeColor="#ef4444" inactiveColor="#fee2e2" />`,desc:e("switch.demoDesc.color")},{title:e("switch.demo.size"),code:`<Toggle size={28} />   {/* default */}
<Toggle size={36} />
<Toggle size={48} />`,desc:e("switch.demoDesc.size")},{title:e("switch.demo.text"),code:'<Toggle activeText="ON" inactiveText="OFF" checked={on()} onChange={setOn} />',desc:e("switch.demoDesc.text")},{title:e("switch.demo.form"),code:`<Form controlAlign="right" onSubmit={(v) => console.log(v)}>
  <FormItem name="notify" label="Enable Notifications">
    <Toggle />
  </FormItem>
  <FormItem name="darkMode" label="Dark Mode">
    <Toggle />
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="Submit" />
  </div>
</Form>`,desc:e("switch.demoDesc.form")}];return t(v,{get children(){var o=S(),r=o.firstChild,s=r.nextSibling,c=s.nextSibling,d=c.nextSibling;return i(s,()=>e("switch.intro")),i(c,()=>e("switch.note")),i(o,t(w,{propsTables:n,cssVarsTables:l}),d),i(o,t(x,{each:a,children:m=>t(T,{demo:m})}),null),o}})};export{D as SwitchDocPage};
