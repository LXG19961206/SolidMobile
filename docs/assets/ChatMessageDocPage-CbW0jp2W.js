import{u as f,K as x,c as e,i as t,P as u,L as a,t as g,r as y,M as T,N as b}from"./index-DaFPOJHh.js";import{D as M}from"./ComponentDocLayout-BNbdylMK.js";import{D as C}from"./DocLayout-ClAGE1fK.js";var v=g('<div style="background:#f0fdf4;border:1px solid #22c55e;border-radius:12px;padding:12px 16px;font-size:0.85rem">✅ Order confirmed!<br><small style=color:#6b7280>Tracking #SC-2024 · Friday delivery'),w=g('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">ChatMessage</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos</h2><p style=font-size:0.85rem;color:#6b7280>Play the msgs ↓</p><div style="background:#f8f9fb;border:1px solid #e5e7eb;border-radius:12px;padding:12px 0;margin-bottom:24px;max-width:520px">');y({"zh-CN":b,"en-US":T});const o="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#6366f1"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">A</text></svg>'),S="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120"><rect width="200" height="120" fill="#dbeafe"/><text x="100" y="68" text-anchor="middle" fill="#3b82f6" font-size="14" font-family="sans-serif">📷 Photo</text></svg>'),_=()=>{const i=f(),{propsTables:d}=x(),m=[{title:i("chatMessage.demo.basic"),code:`<ChatMessage position="left" messageType="plainText"
  content="Hey! How are you doing?"
  bgColor="#dbeafe"
  avatar="alice.jpg" name="Alice" time="10:32" />

<ChatMessage position="right" messageType="plainText"
  content="I'm good! Just finished the new chat UI component 🎉"
  time="10:33" status="read" />`,desc:i("chatMessage.demoDesc.basic")},{title:i("chatMessage.demo.imageVideo"),code:`<ChatMessage position="left" messageType="image"
  src="photo.jpg" name="Bob" time="11:05"
  avatar="bob.jpg" />

<ChatMessage position="right" messageType="video"
  src="clip.mp4" time="11:07" status="read" />`,desc:i("chatMessage.demoDesc.imageVideo")},{title:i("chatMessage.demo.fileAndCustom"),code:`<ChatMessage position="left" messageType="file"
  fileName="design-spec.pdf" fileSize="2.4 MB"
  iconMap={{ pdf: '📄', doc: '📝', '*': '📎' }}
  name="Alice" time="11:20" avatar="alice.jpg" />

<ChatMessage position="right" messageType="custom" time="11:22">
  <div style="background:#f0fdf4;border:1px solid #22c55e;
    border-radius:12px;padding:12px 16px">
    ✅ Order confirmed! Tracking #SC-2024
    <br/><small>Estimated delivery: Friday</small>
  </div>
</ChatMessage>`,desc:i("chatMessage.demoDesc.fileAndCustom")},{title:i("chatMessage.demo.statusesAndMeta"),code:`// sending → sent → read progression
<ChatMessage position="right" messageType="plainText"
  content="Sending..." time="11:25" status="sending" />
<ChatMessage position="right" messageType="plainText"
  content="Sent ✓" time="11:26" status="sent" />
<ChatMessage position="right" messageType="plainText"
  content="Read ✓✓" time="11:30" status="read" />

// failed with retry
<ChatMessage position="right" messageType="plainText"
  content="This message failed" time="11:32"
  status="failed" onRetry={() => retry()} />`,desc:i("chatMessage.demoDesc.statusesAndMeta")}];return e(C,{get children(){var n=w(),p=n.firstChild,l=p.nextSibling,r=l.nextSibling,c=r.nextSibling,s=c.nextSibling;return t(l,()=>i("chatMessage.intro")),t(n,e(u,{propsTables:d}),r),t(s,e(a,{position:"left",messageType:"plainText",bgColor:"#dbeafe",get content(){return i("chatMessage.demoDesc.basic")?.toString()||"Hey! How are you doing?"},avatar:o,name:"Alice",time:"10:32"}),null),t(s,e(a,{position:"right",messageType:"plainText",content:"I'm good! Just finished the new chat UI component 🎉",time:"10:33",status:"read"}),null),t(s,e(a,{position:"left",messageType:"image",bgColor:"#dbeafe",src:S,name:"Bob",time:"11:05",avatar:o}),null),t(s,e(a,{position:"right",messageType:"plainText",content:"Nice photo! 📷",time:"11:06",status:"read"}),null),t(s,e(a,{position:"left",messageType:"file",bgColor:"#dbeafe",fileName:"design-spec.pdf",fileSize:"2.4 MB",src:"./logo.jpg",name:"Alice",time:"11:20",avatar:o}),null),t(s,e(a,{position:"right",messageType:"file",fileName:"report.xlsx",fileSize:"1.8 MB",progress:65,src:"https://example.com/report.xlsx",time:"11:21",status:"sending",onDownload:()=>alert(`Custom download handler fired!
Real use case: bridge.download(url)`)}),null),t(s,e(a,{position:"right",messageType:"custom",time:"11:22",status:"read",get children(){return v()}}),null),t(s,e(a,{position:"right",messageType:"plainText",content:"Sending...",time:"11:25",status:"sending"}),null),t(s,e(a,{position:"right",messageType:"plainText",content:"Message sent ✓",time:"11:26",status:"sent"}),null),t(s,e(a,{position:"right",messageType:"plainText",content:"Message read ✓✓",time:"11:30",status:"read"}),null),t(s,e(a,{position:"right",messageType:"plainText",content:"This one failed to send",time:"11:32",status:"failed",onRetry:()=>alert("Retry!")}),null),t(n,()=>m.map(h=>e(M,{demo:h})),null),n}})};export{_ as ChatMessageDocPage};
