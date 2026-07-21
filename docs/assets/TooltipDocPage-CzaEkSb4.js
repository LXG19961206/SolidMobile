import{u as m,bU as d,c as e,i as n,P as u,F as T,t as g,r as B,bV as h,bW as b}from"./index-BpewzGtL.js";import{D}from"./ComponentDocLayout-Bkjb1zAw.js";import{D as f}from"./DocLayout-CaxxNUR0.js";var x=g('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Tooltip</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');B({"zh-CN":b,"en-US":h});const v=()=>{const t=m(),{propsTables:i,cssVarsTables:p}=d(),s=[{title:t("tooltip.demo.basic"),code:`<Tooltip content="Hello! This is a tooltip.">
  <Button>Hover me</Button>
</Tooltip>`,desc:t("tooltip.demoDesc.basic")},{title:t("tooltip.demo.placement"),code:`<Tooltip content="Top" placement="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Bottom" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip content="Left" placement="left">
  <Button>Left</Button>
</Tooltip>
<Tooltip content="Right" placement="right">
  <Button>Right</Button>
</Tooltip>`,desc:t("tooltip.demoDesc.placement")},{title:t("tooltip.demo.trigger"),code:`<Tooltip content="Copied!" trigger="click">
  <Button>Copy</Button>
</Tooltip>`,desc:t("tooltip.demoDesc.trigger")},{title:t("tooltip.demo.custom"),code:`<Tooltip content={<span>⚠️ This action cannot be undone</span>}>
  <Button type="danger">Delete</Button>
</Tooltip>`,desc:t("tooltip.demoDesc.custom")},{title:t("tooltip.demo.closeable"),code:`<Tooltip content="Tap ✕ to dismiss" trigger="click" closeable>
  <Button>Click me</Button>
</Tooltip>`,desc:t("tooltip.demoDesc.closeable")},{title:t("tooltip.demo.delay"),code:`<Tooltip content="500ms to appear..." delay={{ show: 500, hide: 200 }}>
  <Button>Slow</Button>
</Tooltip>`,desc:t("tooltip.demoDesc.delay")},{title:t("tooltip.demo.controlled"),code:`const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(v => !v)}>
  {open() ? "Hide" : "Show"}
</Button>

<Tooltip
  content="Controlled by external state"
  trigger="manual"
  open={open()}
  onOpenChange={setOpen}
>
  <Button>Trigger</Button>
</Tooltip>`,desc:t("tooltip.demoDesc.controlled")}];return e(f,{get children(){var o=x(),c=o.firstChild,l=c.nextSibling,a=l.nextSibling;return n(l,()=>t("tooltip.intro")),n(o,e(u,{propsTables:i,cssVarsTables:p}),a),n(o,e(T,{each:s,children:r=>e(D,{demo:r})}),null),o}})};export{v as TooltipDocPage};
