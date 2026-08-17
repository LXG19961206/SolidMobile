import{m,b as v,c as t,r as d,d as A,f as x,i as r,P as p,F as g,D as f,a as h,t as z}from"./index-YBn7yUdg.js";var u=z('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Avatar</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');d({"zh-CN":x,"en-US":A});const b=()=>{const e=m(),{propsTables:s}=v(),c=[{title:e("avatar.demo.image"),code:`<Avatar src="user.jpg" size="lg" />
<Avatar src="user.jpg" size="md" />
<Avatar src="user.jpg" size="sm" />
<Avatar src="user.jpg" size="xs" />`,desc:e("avatar.demoDesc.image")},{title:e("avatar.demo.icon"),code:`<Avatar icon="user" color="#1677ff" />
<Avatar icon="star" color="#f59e0b" />
<Avatar icon="settings" color="#22c55e" />`,desc:e("avatar.demoDesc.icon")},{title:e("avatar.demo.text"),code:`<Avatar text="Alice" color="#f59e0b" />
<Avatar text="Bob" color="#22c55e" />
<Avatar text="Carol" color="#ef4444" />`,desc:e("avatar.demoDesc.text")},{title:e("avatar.demo.shape"),code:`<Avatar text="A" size="xs" />
<Avatar text="A" size="sm" />
<Avatar text="A" size="md" />
<Avatar text="A" size="lg" />
<Avatar text="A" size="xl" />`,desc:e("avatar.demoDesc.shape")},{title:e("avatar.demo.custom"),code:`<Avatar text="A" color="#1677ff" />
<Avatar text="B" color="#22c55e" />
<Avatar text="C" color="#ef4444" />`,desc:e("avatar.demoDesc.custom")}];return t(h,{get children(){var a=u(),i=a.firstChild,o=i.nextSibling,n=o.nextSibling;return r(o,()=>e("avatar.intro")),r(a,t(p,{propsTables:s}),n),r(a,t(g,{each:c,children:l=>t(f,{demo:l})}),null),a}})};export{b as AvatarDocPage};
