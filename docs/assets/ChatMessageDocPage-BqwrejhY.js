import{u as f,K as x,c as e,i as t,P as u,L as i,t as g,r as y,M as T,N as b}from"./index-J74HyoGm.js";import{D as C}from"./ComponentDocLayout-BceB4Opr.js";import{D as M}from"./DocLayout-CODuLJWo.js";var v=g('<div style="background:#f0fdf4;border:1px solid #22c55e;border-radius:12px;padding:12px 16px;font-size:0.85rem">✅ Order confirmed!<br><small style=color:#6b7280>Tracking #SC-2024 · Friday delivery'),w=g('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">ChatMessage</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos</h2><p style=font-size:0.85rem;color:#6b7280>Play the msgs ↓</p><div style="background:#f8f9fb;border:1px solid #e5e7eb;border-radius:12px;padding:12px 0;margin-bottom:24px;max-width:520px">');y({"zh-CN":b,"en-US":T});const o="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#6366f1"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">A</text></svg>'),A="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120"><rect width="200" height="120" fill="#dbeafe"/><text x="100" y="68" text-anchor="middle" fill="#3b82f6" font-size="14" font-family="sans-serif">📷 Photo</text></svg>'),_=()=>{const s=f(),{propsTables:p}=x(),d=[{title:s("chatMessage.demo.basic"),code:`<ChatMessage position="left" messageType="plainText"
  content="Hey! How are you doing?"
  bgColor="#dbeafe"
  avatar="alice.jpg" name="Alice" time="10:32" />

<ChatMessage position="right" messageType="plainText"
  content="I'm good! Just finished the new chat UI component 🎉"
  time="10:33" status="read" />`,desc:s("chatMessage.demoDesc.basic")},{title:s("chatMessage.demo.imageVideo"),code:`<ChatMessage position="left" messageType="image"
  src="photo.jpg" name="Bob" time="11:05"
  avatar="bob.jpg" />

<ChatMessage position="right" messageType="video"
  src="clip.mp4" time="11:07" status="read" />`,desc:s("chatMessage.demoDesc.imageVideo")},{title:s("chatMessage.demo.fileAndCustom"),code:`// file prop auto-extracts name + size
const pdf = new File([...], "design-spec.pdf",
  { type: "application/pdf" });

<ChatMessage position="left" messageType="file"
  file={pdf}
  name="Alice" time="11:20" avatar="alice.jpg" />

<ChatMessage position="right" messageType="custom" time="11:22">
  <div style="background:#f0fdf4;border:1px solid #22c55e;
    border-radius:12px;padding:12px 16px">
    ✅ Order confirmed! Tracking #SC-2024
    <br/><small>Estimated delivery: Friday</small>
  </div>
</ChatMessage>`,desc:s("chatMessage.demoDesc.fileAndCustom")},{title:s("chatMessage.demo.statusesAndMeta"),code:`// sending → sent → read progression
<ChatMessage position="right" messageType="plainText"
  content="Sending..." time="11:25" status="sending" />
<ChatMessage position="right" messageType="plainText"
  content="Sent ✓" time="11:26" status="sent" />
<ChatMessage position="right" messageType="plainText"
  content="Read ✓✓" time="11:30" status="read" />

// failed with retry
<ChatMessage position="right" messageType="plainText"
  content="This message failed" time="11:32"
  status="failed" onRetry={() => retry()} />`,desc:s("chatMessage.demoDesc.statusesAndMeta")}];return e(M,{get children(){var n=w(),m=n.firstChild,r=m.nextSibling,l=r.nextSibling,c=l.nextSibling,a=c.nextSibling;return t(r,()=>s("chatMessage.intro")),t(n,e(u,{propsTables:p}),l),t(a,e(i,{position:"left",messageType:"plainText",bgColor:"#dbeafe",get content(){return s("chatMessage.demoDesc.basic")?.toString()||"Hey! How are you doing?"},avatar:o,name:"Alice",time:"10:32"}),null),t(a,e(i,{position:"right",messageType:"plainText",content:"I'm good! Just finished the new chat UI component 🎉",time:"10:33",status:"read"}),null),t(a,e(i,{position:"left",messageType:"image",bgColor:"#dbeafe",src:A,name:"Bob",time:"11:05",avatar:o}),null),t(a,e(i,{position:"right",messageType:"plainText",content:"Nice photo! 📷",time:"11:06",status:"read"}),null),t(a,e(i,{position:"left",messageType:"file",bgColor:"#dbeafe",get file(){return new File(["x".repeat(25e5)],"design-spec.pdf",{type:"application/pdf"})},name:"Alice",time:"11:20",avatar:o}),null),t(a,e(i,{position:"right",messageType:"custom",time:"11:22",status:"read",get children(){return v()}}),null),t(a,e(i,{position:"right",messageType:"plainText",content:"Sending...",time:"11:25",status:"sending"}),null),t(a,e(i,{position:"right",messageType:"plainText",content:"Message sent ✓",time:"11:26",status:"sent"}),null),t(a,e(i,{position:"right",messageType:"plainText",content:"Message read ✓✓",time:"11:30",status:"read"}),null),t(a,e(i,{position:"right",messageType:"plainText",content:"This one failed to send",time:"11:32",status:"failed",onRetry:()=>alert("Retry!")}),null),t(n,()=>d.map(h=>e(C,{demo:h})),null),n}})};export{_ as ChatMessageDocPage};
