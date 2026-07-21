import{u as c,k as l,c as n,i as a,P as m,F as p,t as B,r as b,l as h,m as u}from"./index-CKeO2Rhr.js";import{D}from"./ComponentDocLayout-MZfk8orS.js";import{D as x}from"./DocLayout-CMm5c9ou.js";var f=B('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Badge</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');b({"zh-CN":u,"en-US":h});const z=()=>{const e=c(),{propsTables:d}=l(),s=[{title:e("badge.demo.withAvatar"),code:`<Badge content={5}>
  <Avatar size={40} />
</Badge>
<Badge dot>
  <Avatar size={40} />
</Badge>
<Badge content={120} max={99}>
  <Avatar size={48} />
</Badge>`,desc:e("badge.demoDesc.withAvatar")},{title:e("badge.demo.withButton"),code:`<Badge content={3}>
  <Button size="sm">Messages</Button>
</Badge>
<Badge content={8}>
  <Button size="sm" variant="outline">Orders</Button>
</Badge>
<Badge dot>
  <Button size="sm">System</Button>
</Badge>`,desc:e("badge.demoDesc.withButton")},{title:e("badge.demo.withTab"),code:`<Tabs>
  <Tab title={<span>All <Badge content={12} /></span>} name="all" />
  <Tab title={<span>Pending <Badge dot /></span>} name="pending" />
  <Tab title={<span>Done <Badge content={99} max={99} /></span>} name="done" />
</Tabs>`,desc:e("badge.demoDesc.withTab")},{title:e("badge.demo.position"),code:`<Badge content="TR" position="top-right" color="#1677ff">
  <div style={{ width: 44, height: 44, background: "#e5e7eb", borderRadius: 10 }} />
</Badge>
<Badge content="TL" position="top-left" color="#22c55e">
  <div style={{ width: 44, height: 44, background: "#e5e7eb", borderRadius: 10 }} />
</Badge>`,desc:e("badge.demoDesc.position")},{title:e("badge.demo.standalone"),code:`<span>New <Badge content={99} /></span>
<span><Badge dot /> Online</span>
<span>Done <Badge content="✓" color="#22c55e" /></span>`,desc:e("badge.demoDesc.standalone")}];return n(x,{get children(){var t=f(),i=t.firstChild,o=i.nextSibling,g=o.nextSibling;return a(o,()=>e("badge.intro")),a(t,n(m,{propsTables:d}),g),a(t,n(p,{each:s,children:r=>n(D,{demo:r})}),null),t}})};export{z as BadgeDocPage};
