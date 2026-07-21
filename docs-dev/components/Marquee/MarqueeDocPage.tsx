import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useMarqueeTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const MarqueeDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useMarqueeTableData();
  const demos: DemoCode[] = [
    { title: t('marquee.demo.basic'), code: '<Marquee>\n  <span>🔥 Breaking News — scrolls infinitely to the left</span>\n</Marquee>', desc: t('marquee.demoDesc.basic') },
    { title: t('marquee.demo.speed'), code: '<Marquee duration={3}>\n  <span style={{ color: "#f59e0b" }}>⚡ Fast mode — 3s per loop</span>\n</Marquee>', desc: t('marquee.demoDesc.speed') },
    { title: t('marquee.demo.direction'), code: '<Marquee direction="right" duration={6}>\n  <span>⬅️ Reverse — scrolling rightward</span>\n</Marquee>', desc: t('marquee.demoDesc.direction') },
    { title: t('marquee.demo.pause'), code: '<Marquee pauseOnHover={false}>\n  <span>⚠ No pause on hover</span>\n</Marquee>', desc: t('marquee.demoDesc.pause') },
    { title: t('marquee.demo.notify'), code: '// Controlled Notify with Marquee as message content\nconst [show, setShow] = createSignal(false);\n\n<div>\n  <span onClick={() => setShow(true)}\n    style={{ cursor: \'pointer\', color: \'var(--sc-color-primary)\' }}>\n    📢 Open Notify with Marquee →\n  </span>\n  <Notify show={show()} onUpdateShow={setShow} duration={0}\n    message={\n      <Marquee>\n        <span>🔥 Breaking — Stock market hits all-time high! &nbsp;&nbsp;&nbsp;</span>\n      </Marquee>\n    } />\n</div>', desc: t('marquee.demoDesc.notify') },
  ];
  return (<DocLayout><div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
    <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700 }}>Marquee</h1>
    <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('marquee.intro')}</p>
    <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
    <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
  </div></DocLayout>);
};
