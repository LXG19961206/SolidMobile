import{u as c,bv as m,c as r,i as s,P as g,F as w,t as u,r as h,bw as f,bx as b}from"./index-BZJjIwxN.js";import{D as S}from"./ComponentDocLayout-DHBBsU7j.js";import{D as x}from"./DocLayout-BD6WG0fn.js";var y=u('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Swiper</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');h({"zh-CN":b,"en-US":f});const z=()=>{const e=c(),{propsTables:o,cssVarsTables:n}=m(),a=[{title:e("swiper.demo.custom"),code:`<Swiper height={180} loop autoplay={2500}>
  <div style={{ background: "#667eea" }}>Slide 1</div>
  <div style={{ background: "#f093fb" }}>Slide 2</div>
  <div style={{ background: "#4facfe" }}>Slide 3</div>
</Swiper>`,desc:e("swiper.demoDesc.custom")},{title:e("swiper.demo.autoplay"),code:`<Swiper imgUrls={[
  "./swiper-1.jpg",
  "./swiper-2.jpg",
  "./swiper-3.jpg",
]} height={200} autoplay={3000} />`,desc:e("swiper.demoDesc.autoplay")},{title:e("swiper.demo.indicator"),code:`<Swiper imgUrls={imgs} height={200}
  indicators={(cur, tot) => (
    <span style={{
      background: "rgba(0,0,0,0.5)", color: "#fff",
      borderRadius: 12, padding: "2px 10px",
      fontSize: "0.75rem", fontFamily: "monospace",
    }}>
      {cur + 1} / {tot}
    </span>
  )}
/>`,desc:e("swiper.demoDesc.indicator")},{title:e("swiper.demo.vertical"),code:`<Swiper imgUrls={[
  "./swiper-1.jpg",
  "./swiper-2.jpg",
  "./swiper-3.jpg",
]} height={260} vertical />`,desc:e("swiper.demoDesc.vertical")}];return r(x,{get children(){var i=y(),p=i.firstChild,t=p.nextSibling,l=t.nextSibling;return s(t,()=>e("swiper.intro")),s(i,r(g,{propsTables:o,cssVarsTables:n}),l),s(i,r(w,{each:a,children:d=>r(S,{demo:d})}),null),i}})};export{z as SwiperDocPage};
