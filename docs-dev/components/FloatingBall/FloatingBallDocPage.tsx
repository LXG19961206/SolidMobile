import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useFloatingBallTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const FloatingBallDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useFloatingBallTableData();

  const demos: DemoCode[] = [
    {
      title: t('floatingball.demo.basic'),
      code: '<FloatingBall>\n  <Icon name="arrow-up" size={22} />\n</FloatingBall>',
      desc: t('floatingball.demoDesc.basic'),
    },
    {
      title: t('floatingball.demo.custom'),
      code: '<FloatingBall\n  style={{\n    "--sc-floating-ball-bg": "linear-gradient(135deg, #667eea, #764ba2)",\n    "--sc-floating-ball-radius": "16px",\n    "--sc-floating-ball-size": "48px",\n  }}\n>\n  <Icon name="star" size={22} />\n</FloatingBall>',
      desc: t('floatingball.demoDesc.custom'),
    },
    {
      title: t('floatingball.demo.fixed'),
      code: '<FloatingBall draggable={false}>\n  <Icon name="arrow-up" size={22} />\n</FloatingBall>',
      desc: t('floatingball.demoDesc.fixed'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>FloatingBall</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('floatingball.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
