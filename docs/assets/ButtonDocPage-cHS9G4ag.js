import{u as m,n as d,c as e,i as n,P as B,F as p,t as b,r as g,o as h,p as y}from"./index-DO-B6k_y.js";import{D as x}from"./ComponentDocLayout-idRjphWL.js";import{D}from"./DocLayout-BcF6F-9v.js";var z=b('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Button</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');g({"zh-CN":y,"en-US":h});const _=()=>{const t=m(),{propsTables:i,cssVarsTables:u}=d(),r=[{title:t("button.demo.types"),code:`<Button type="primary">Primary</Button>
<Button type="success">Success</Button>
<Button type="danger">Danger</Button>`,desc:t("button.demoDesc.button_types")},{title:t("button.demo.sizes"),code:`<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>`,desc:t("button.demoDesc.button_sizes")},{title:t("button.demo.variant"),code:`<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`},{title:t("button.demo.icon"),code:`<Button icon="star">Favorite</Button>
<Button icon="arrow-right" iconPosition="right">Next</Button>`},{title:t("button.demo.loading"),code:`<Button type="primary" loading>Submitting...</Button>
<Button disabled>Disabled</Button>`},{title:t("button.demo.block"),code:'<Button block round type="primary">Block Round</Button>'}];return e(D,{get children(){var o=z(),a=o.firstChild,s=a.nextSibling,l=s.nextSibling;return n(s,()=>t("button.intro")),n(o,e(B,{propsTables:i,cssVarsTables:u}),l),n(o,e(p,{each:r,children:c=>e(x,{demo:c})}),null),o}})};export{_ as ButtonDocPage};
