import{f as c,c as e,i as n,F as d,t as B,r as p}from"./index-CjqJoD8k.js";import{D as b}from"./ComponentDocLayout-7lKpA80h.js";import{u as g,e as h,z as y}from"./tableData-iNFt5JBn.js";import{P as x}from"./PropsAttrs-BEGKasrA.js";import{D as f}from"./DocLayout-BMuVmMAz.js";var z=B('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Button</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');p({"zh-CN":y,"en-US":h});const P=()=>{const t=c(),{propsTables:s,cssVarsTables:r}=g(),u=[{title:t("button.demo.types"),code:`<Button type="primary">Primary</Button>
<Button type="success">Success</Button>
<Button type="danger">Danger</Button>`,desc:t("button.demoDesc.button_types")},{title:t("button.demo.sizes"),code:`<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>`,desc:t("button.demoDesc.button_sizes")},{title:t("button.demo.variant"),code:`<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`},{title:t("button.demo.icon"),code:`<Button icon="star">Favorite</Button>
<Button icon="arrow-right" iconPosition="right">Next</Button>`},{title:t("button.demo.loading"),code:`<Button type="primary" loading>Submitting...</Button>
<Button disabled>Disabled</Button>`},{title:t("button.demo.block"),code:'<Button block round type="primary">Block Round</Button>'}];return e(f,{get children(){var o=z(),a=o.firstChild,i=a.nextSibling,l=i.nextSibling;return n(i,()=>t("button.intro")),n(o,e(x,{propsTables:s,cssVarsTables:r}),l),n(o,e(d,{each:u,children:m=>e(b,{demo:m})}),null),o}})};export{P as ButtonDocPage};
