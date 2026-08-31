import{m,x as p,c as a,r as g,y as h,A as C,i as t,P as b,F as u,D as x,a as v,t as f}from"./index-DvnxeU6a.js";var y=f('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Card</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":C,"en-US":h});const S=()=>{const e=m(),{propsTables:s,cssVarsTables:o}=p(),i=[{title:e("card.demo.basic"),code:`<Card title="Basic Usage" subtitle="Default card with shadow & border" divider>
  <div style={{ padding: '12px', color: '#6b7280' }}>
    Some content here
  </div>
</Card>`,desc:e("card.demoDesc.basic")},{title:e("card.demo.noShadow"),code:`<Card title="No Shadow" subtitle="Flat style" shadow={false}>
  <div style={{ padding: '12px', color: '#6b7280' }}>
    Flat card
  </div>
</Card>`,desc:e("card.demoDesc.noShadow")},{title:e("card.demo.noBorder"),code:`<Card title="No Border" subtitle="Borderless card" border={false}>
  <div style={{ padding: '12px', color: '#6b7280' }}>
    Borderless card
  </div>
</Card>`,desc:e("card.demoDesc.noBorder")},{title:e("card.demo.inset"),code:`// Parent Card provides the visual frame
<Card title="Inset Mode" subtitle="Parent controls spacing & style" shadow={false}>
  {/* Inset Card: transparent, no padding, embedded inside */}
  <Card inset title="Shipping Info" subtitle="Recipient & address">
    <div style={{ color: '#6b7280', 'font-size': '0.85rem' }}>
      Name: Zhang San
      Address: 123 Some Street
    </div>
  </Card>
</Card>`,desc:e("card.demoDesc.inset")},{title:e("card.demo.customPadding"),code:`<Card title="Custom Padding" subtitle="24px padding" padding={24}>
  <div style={{ color: '#6b7280' }}>
    Extra-spacious card
  </div>
</Card>`,desc:e("card.demoDesc.customPadding")}];return a(v,{get children(){var d=y(),n=d.firstChild,r=n.nextSibling,l=r.nextSibling;return t(r,()=>e("card.intro")),t(d,a(b,{propsTables:s,cssVarsTables:o}),l),t(d,a(u,{each:i,children:c=>a(x,{demo:c})}),null),d}})};export{S as CardDocPage};
