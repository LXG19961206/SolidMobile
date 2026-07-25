import{u as p,K as m,c as s,i as a,P as h,F as u,t as f,r as M,L as x,M as C}from"./index-Bk7c9w-b.js";import{D as b}from"./ComponentDocLayout-CJQA7_GW.js";import{D as y}from"./DocLayout-CKEe4qPG.js";var T=f('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">ChatMessage</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 12px"></p><blockquote style="font-size:0.82rem;color:#9ca3af;border-left:3px solid #e5e7eb;padding-left:14px;margin:0 0 24px;line-height:1.7;font-style:italic"></blockquote><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');M({"zh-CN":C,"en-US":x});const S=()=>{const e=p(),{propsTables:o,cssVarsTables:l}=m(),c=[{title:e("chatMessage.demo.basic"),code:`<ChatMessage position="left" messageType="plainText"
  content="Hey! How are you doing? 👋"
  avatar="alice.jpg" name="Alice" time="10:30" />

<ChatMessage position="right" messageType="plainText"
  content="I'm good! Just shipped a new component 🎉"
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
  progress={65}
  time="10:34" status="sending" />

<ChatMessage position="right" messageType="custom" time="10:35">
  <div style="background:#f0fdf4;border:1px solid #22c55e;
    border-radius:12px;padding:12px 16px">
    ✅ Order confirmed!
  </div>
</ChatMessage>`,desc:e("chatMessage.demoDesc.fileAndCustom")},{title:e("chatMessage.demo.fileDownload"),code:`<ChatMessage position="left" messageType="file"
  fileName="contract.pdf" fileSize="1.2 MB"
  onContentClick={() => {
    Toast.info('Starting download...');
    setTimeout(() => {
      Toast.success('contract.pdf downloaded');
    }, 1500);
  }}
  name="Alice" time="10:35" avatar="alice.jpg" />`,desc:e("chatMessage.demoDesc.fileDownload")},{title:e("chatMessage.demo.statusesAndMeta"),code:`<ChatMessage position="right" messageType="plainText"
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
  time="10:42" status="read" statusPosition="side" />`,desc:e("chatMessage.demoDesc.statusPosition")},{title:e("chatMessage.demo.longPressArray"),code:`<ChatMessage position="left" messageType="plainText"
  content="Long-press me (array menu)"
  avatar="alice.jpg" name="Alice" time="10:43"
  longPressMenu={[
    { title: 'Copy', action: () => copyText() },
    { title: 'Recall', action: () => recall() },
    { title: 'Delete', action: () => del() },
  ]}
/>`,desc:e("chatMessage.demoDesc.longPressArray")},{title:e("chatMessage.demo.longPressCustom"),code:`<ChatMessage position="right" messageType="plainText"
  content="Custom JSX menu" time="10:45"
  longPressMenu={
    <div style="background:#fff;border-radius:10px;
      padding:8px 12px;display:flex;gap:8px">
      <span onClick={() => react("❤️")}>❤️</span>
      <span onClick={() => react("👍")}>👍</span>
      <span onClick={() => react("😂")}>😂</span>
    </div>
  }
/>`,desc:e("chatMessage.demoDesc.longPressCustom")},{title:e("chatMessage.demo.longPressSelect"),code:`<ChatMessage position="left" messageType="plainText"
  content="Hold to select this text — no menu."
  avatar="alice.jpg" name="Alice" time="10:46"
  selectOnLongPress
/>`,desc:e("chatMessage.demoDesc.longPressSelect")}];return s(y,{get children(){var t=T(),g=t.firstChild,i=g.nextSibling,n=i.nextSibling,d=n.nextSibling;return a(i,()=>e("chatMessage.intro")),a(n,()=>e("chatMessage.note")),a(t,s(h,{propsTables:o,cssVarsTables:l}),d),a(t,s(u,{each:c,children:r=>s(b,{demo:r})}),null),t}})};export{S as ChatMessageDocPage};
