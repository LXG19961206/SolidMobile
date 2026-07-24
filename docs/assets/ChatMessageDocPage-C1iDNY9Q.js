import{u as g,K as d,c as s,i as a,P as m,F as c,t as h,r as u,L as f,M}from"./index-yENRe9RL.js";import{D as y}from"./ComponentDocLayout-DlPNf7O1.js";import{D as x}from"./DocLayout-Dis-OZUg.js";var C=h('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">ChatMessage</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');u({"zh-CN":M,"en-US":f});const D=()=>{const e=g(),{propsTables:o}=d(),n=[{title:e("chatMessage.demo.basic"),code:`<ChatMessage position="left" messageType="plainText"
  content="Hey! How are you doing?"
  bgColor="#dbeafe"
  avatar="alice.jpg" name="Alice" time="10:32" />

<ChatMessage position="right" messageType="plainText"
  content="I'm good! Just finished the new chat UI component 🎉"
  time="10:33" status="read" />`,desc:e("chatMessage.demoDesc.basic")},{title:e("chatMessage.demo.imageVideo"),code:`<ChatMessage position="left" messageType="image"
  src="photo.jpg" name="Bob" time="11:05"
  avatar="bob.jpg" />

<ChatMessage position="right" messageType="video"
  src="clip.mp4" time="11:07" status="read" />`,desc:e("chatMessage.demoDesc.imageVideo")},{title:e("chatMessage.demo.fileAndCustom"),code:`<ChatMessage position="left" messageType="file"
  fileName="design-spec.pdf" fileSize="2.4 MB"
  iconMap={{ pdf: '📄', doc: '📝', '*': '📎' }}
  name="Alice" time="11:20" avatar="alice.jpg" />

<ChatMessage position="right" messageType="custom" time="11:22">
  <div style="background:#f0fdf4;border:1px solid #22c55e;
    border-radius:12px;padding:12px 16px">
    ✅ Order confirmed! Tracking #SC-2024
    <br/><small>Estimated delivery: Friday</small>
  </div>
</ChatMessage>`,desc:e("chatMessage.demoDesc.fileAndCustom")},{title:e("chatMessage.demo.statusesAndMeta"),code:`// sending → sent → read progression
<ChatMessage position="right" messageType="plainText"
  content="Sending..." time="11:25" status="sending" />
<ChatMessage position="right" messageType="plainText"
  content="Sent ✓" time="11:26" status="sent" />
<ChatMessage position="right" messageType="plainText"
  content="Read ✓✓" time="11:30" status="read" />

// failed with retry
<ChatMessage position="right" messageType="plainText"
  content="This message failed" time="11:32"
  status="failed" onRetry={() => retry()} />`,desc:e("chatMessage.demoDesc.statusesAndMeta")},{title:"Long Press Menu",code:`<ChatMessage position="right" messageType="plainText"
  content="Hold me for 500ms"
  longPressMenu={[
    { title: 'Copy', action: () => copyText() },
    { title: 'Recall', action: () => recall() },
    { title: 'Delete', action: () => del() },
  ]}
  time="11:33" status="read" />

{/* or custom JSX */}
<ChatMessage position="left" messageType="plainText"
  content="Custom menu example"
  avatar="alice.jpg" name="Alice"
  longPressMenu={
    <div style="background:#fff;border-radius:10px;padding:8px;box-shadow:0 4px 12px rgba(0,0,0,.1)">
      <button onClick={() => reply()}>💬 Reply</button>
      <button onClick={() => emoji()}>😄 React</button>
    </div>
  }
/>`,desc:"Long press (500ms hold) pops up a menu. Use array mode for built-in styling, or pass JSX for full custom control."}];return s(x,{get children(){var t=C(),r=t.firstChild,i=r.nextSibling,l=i.nextSibling;return a(i,()=>e("chatMessage.intro")),a(t,s(m,{propsTables:o}),l),a(t,s(c,{each:n,children:p=>s(y,{demo:p})}),null),t}})};export{D as ChatMessageDocPage};
