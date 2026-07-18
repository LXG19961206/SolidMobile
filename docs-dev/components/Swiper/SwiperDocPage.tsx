import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSwiperTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SwiperDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSwiperTableData();

  const demos: DemoCode[] = [
    {
      title: t('swiper.demo.custom'),
      code: '<Swiper height={180} loop autoplay={2500}>\n  <div style={{ background: "#667eea" }}>Slide 1</div>\n  <div style={{ background: "#f093fb" }}>Slide 2</div>\n  <div style={{ background: "#4facfe" }}>Slide 3</div>\n</Swiper>',
      desc: t('swiper.demoDesc.custom'),
    },
    {
      title: t('swiper.demo.autoplay'),
      code: '<Swiper imgUrls={[\n  "./swiper-1.jpg",\n  "./swiper-2.jpg",\n  "./swiper-3.jpg",\n]} height={200} autoplay={3000} />',
      desc: t('swiper.demoDesc.autoplay'),
    },
    {
      title: t('swiper.demo.indicator'),
      code: '<Swiper imgUrls={imgs} height={200}\n  indicators={(cur, tot) => (\n    <span style={{\n      background: "rgba(0,0,0,0.5)", color: "#fff",\n      borderRadius: 12, padding: "2px 10px",\n      fontSize: "0.75rem", fontFamily: "monospace",\n    }}>\n      {cur + 1} / {tot}\n    </span>\n  )}\n/>',
      desc: t('swiper.demoDesc.indicator'),
    },
    {
      title: t('swiper.demo.vertical'),
      code: '<Swiper imgUrls={[\n  "./swiper-1.jpg",\n  "./swiper-2.jpg",\n  "./swiper-3.jpg",\n]} height={260} vertical />',
      desc: t('swiper.demoDesc.vertical'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Swiper</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('swiper.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
