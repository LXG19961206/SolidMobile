import{u as c,K as m,c as s,i as a,P as d,F as h,t as u,r as M,L as b,M as f}from"./index-BHQnn1ZV.js";import{D as C}from"./ComponentDocLayout-0GXZ6zej.js";import{D as x}from"./DocLayout-0Hhw0eJ2.js";var y=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">ChatMessage</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');M({"zh-CN":f,"en-US":b});const A=()=>{const e=c(),{propsTables:n,cssVarsTables:o}=m(),l=[{title:e("chatMessage.demo.basic"),code:`<ChatMessage position="left" messageType="plainText"
  content="Hey! How are you doing? 👋"
  bgColor="#dbeafe"
  avatar="alice.jpg" name="Alice" time="10:30" />

<ChatMessage position="right" messageType="plainText"
  content="I'm good! Just shipped a new component 🎉"
  bgColor="#95ec69"
  time="10:31" status="read" />`,desc:e("chatMessage.demoDesc.basic")},{title:e("chatMessage.demo.imageVideo"),code:`<ChatMessage position="left" messageType="image"
  src="photo.jpg" name="Alice" avatar="alice.jpg"
  time="10:32" />

<ChatMessage position="right" messageType="video"
  src="./demo-video.mp4" time="10:32" status="read" />`,desc:e("chatMessage.demoDesc.imageVideo")},{title:e("chatMessage.demo.fileAndCustom"),code:`<ChatMessage position="left" messageType="file"
  fileName="design-spec.pdf" fileSize="2.4 MB"
  iconMap={{ pdf: '📄', '*': '📎' }}
  name="Alice" time="10:33" avatar="alice.jpg" />

<ChatMessage position="right" messageType="file"
  fileName="report.xlsx" fileSize="1.8 MB"
  progress={65} src="https://..."
  time="10:34" status="sending" />

<ChatMessage position="right" messageType="custom" time="10:35">
  <div style="background:#f0fdf4;border:1px solid #22c55e;
    border-radius:12px;padding:12px 16px">
    ✅ Order confirmed!
  </div>
</ChatMessage>`,desc:e("chatMessage.demoDesc.fileAndCustom")},{title:e("chatMessage.demo.statusesAndMeta"),code:`<ChatMessage position="right" messageType="plainText"
  content="Sent ✓" time="10:36" status="sent" />

<ChatMessage position="right" messageType="plainText"
  content="Read ✓" time="10:37" status="read" />

<ChatMessage position="right" messageType="plainText"
  content="Sending..." time="10:38" status="sending" />

<ChatMessage position="right" messageType="plainText"
  content="This message failed" time="10:39"
  status="failed" onRetry={() => retry()} />`,desc:e("chatMessage.demoDesc.statusesAndMeta")},{title:e("chatMessage.demo.statusPosition"),code:`// meta (default): after time
<ChatMessage position="right" content="status after time"
  time="10:40" status="read" />

// bubble: inside the bubble
<ChatMessage position="right" content="status inside"
  time="10:41" status="sending" statusPosition="bubble" />

// side: between avatar and bubble
<ChatMessage position="right" content="status next to bubble"
  time="10:42" status="read" statusPosition="side" />`,desc:"Three positions for the status icon. 'meta' follows time (WhatsApp), 'bubble' floats inside (iMessage), 'side' sits between avatar & bubble (WeChat)."},{title:e("chatMessage.demo.longPressArray"),code:`<ChatMessage position="left" messageType="plainText"
  content="Long-press me (array menu)"
  avatar="alice.jpg" name="Alice" time="10:43"
  longPressMenu={[
    { title: 'Copy', action: () => copyText() },
    { title: 'Recall', action: () => recall() },
    { title: 'Delete', action: () => del() },
  ]}
/>`,desc:"Array mode: each item gets built-in styling. 500ms hold triggers the popup menu."},{title:e("chatMessage.demo.longPressCustom"),code:`<ChatMessage position="right" messageType="plainText"
  content="Custom JSX menu" time="10:45"
  longPressMenu={
    <div style="background:#fff;border-radius:10px;
      padding:8px 12px;display:flex;gap:8px">
      <span onClick={() => react("❤️")}>❤️</span>
      <span onClick={() => react("👍")}>👍</span>
      <span onClick={() => react("😂")}>😂</span>
    </div>
  }
/>`,desc:"Custom JSX mode: full control over menu layout. Still uses Tooltip for positioning."},{title:e("chatMessage.demo.longPressSelect"),code:`<ChatMessage position="left" messageType="plainText"
  content="Hold to select this text — no menu."
  avatar="alice.jpg" name="Alice" time="10:46"
  selectOnLongPress
/>`,desc:"selectOnLongPress selects all bubble text on hold. Mutually exclusive with longPressMenu."}];return s(x,{get children(){var t=y(),r=t.firstChild,i=r.nextSibling,g=i.nextSibling;return a(i,()=>e("chatMessage.intro")),a(t,s(d,{propsTables:n,cssVarsTables:o}),g),a(t,s(h,{each:l,children:p=>s(C,{demo:p})}),null),t}})};export{A as ChatMessageDocPage};
