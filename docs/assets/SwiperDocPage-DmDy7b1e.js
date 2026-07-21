import{f as c,c as r,i as t,F as m,t as g,r as w}from"./index-CjqJoD8k.js";import{D as f}from"./ComponentDocLayout-7lKpA80h.js";import{u,e as h,z as S}from"./tableData-Bj1y9E9M.js";import{P as y}from"./PropsAttrs-BEGKasrA.js";import{D as b}from"./DocLayout-BMuVmMAz.js";var x=g('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Swiper</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');w({"zh-CN":S,"en-US":h});const C=()=>{const e=c(),{propsTables:o,cssVarsTables:n}=u(),p=[{title:e("swiper.demo.custom"),code:`<Swiper height={180} loop autoplay={2500}>
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
]} height={260} vertical />`,desc:e("swiper.demoDesc.vertical")}];return r(b,{get children(){var i=x(),a=i.firstChild,s=a.nextSibling,l=s.nextSibling;return t(s,()=>e("swiper.intro")),t(i,r(y,{propsTables:o,cssVarsTables:n}),l),t(i,r(m,{each:p,children:d=>r(f,{demo:d})}),null),i}})};export{C as SwiperDocPage};
