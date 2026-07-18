import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTabsTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const TabsDocPage = () => {
  const t = useT();
  const { propsTables } = useTabsTableData();

  const demos: DemoCode[] = [
    {
      title: t('tabs.demo.line'),
      code: '<Tabs>\n  <Tab title="Tab 1" name="a"><div>Content 1</div></Tab>\n  <Tab title="Tab 2" name="b"><div>Content 2</div></Tab>\n  <Tab title="Tab 3" name="c"><div>Content 3</div></Tab>\n</Tabs>',
      desc: t('tabs.demoDesc.line'),
    },
    {
      title: t('tabs.demo.scrollable'),
      code: '<Tabs>\n  <Tab title="First" name="a"><div>A</div></Tab>\n  <Tab title="Second" name="b"><div>B</div></Tab>\n  <Tab title="Third" name="c"><div>C</div></Tab>\n  <Tab title="Fourth" name="d"><div>D</div></Tab>\n  <Tab title="Fifth" name="e"><div>E</div></Tab>\n  <Tab title="Sixth" name="f"><div>F</div></Tab>\n  ...\n</Tabs>',
      desc: t('tabs.demoDesc.scrollable'),
    },
    {
      title: t('tabs.demo.jsxTitle'),
      code: '<Tabs>\n  <Tab title={<span>🔔 Notifications</span>} name="a"><div>Content</div></Tab>\n  <Tab title={<span>⚙ Settings</span>} name="b"><div>Content</div></Tab>\n</Tabs>',
      desc: t('tabs.demoDesc.jsxTitle'),
    },
    {
      title: t('tabs.demo.card'),
      code: '<Tabs type="card">\n  <Tab title="Option 1" name="a"><div>Content 1</div></Tab>\n  <Tab title="Option 2" name="b"><div>Content 2</div></Tab>\n  <Tab title="Option 3" name="c"><div>Content 3</div></Tab>\n</Tabs>',
      desc: t('tabs.demoDesc.card'),
    },
    {
      title: t('tabs.demo.color'),
      code: '<Tabs color="#22c55e" titleActiveColor="#22c55e">\n  <Tab title="Green" name="a"><div>Green content</div></Tab>\n  <Tab title="Tabs" name="b"><div>Tab content</div></Tab>\n</Tabs>',
      desc: t('tabs.demoDesc.color'),
    },
    {
      title: t('tabs.demo.controlled'),
      code: 'const [active, setActive] = createSignal("a");\n\n<Tabs active={active()} onChange={setActive}>\n  <Tab title="Tab 1" name="a"><div>Content 1</div></Tab>\n  <Tab title="Tab 2" name="b"><div>Content 2</div></Tab>\n  <Tab title="Tab 3 (Disabled)" name="c" disabled><div>Content 3</div></Tab>\n</Tabs>\n<div>Active: {active()}</div>',
      desc: t('tabs.demoDesc.controlled'),
    },
    {
      title: t('tabs.demo.disabled'),
      code: '<Tabs>\n  <Tab title="Normal" name="a" />\n  <Tab title="Disabled" name="b" disabled />\n  <Tab title="Normal" name="c" />\n</Tabs>',
      desc: t('tabs.demoDesc.disabled'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Tabs</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('tabs.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
