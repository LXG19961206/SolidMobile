import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useNavBarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const NavBarDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useNavBarTableData();

  const demos: DemoCode[] = [
    {
      title: t('navbar.demo.basic'),
      code: '<NavBar title="Page Title" border />',
      desc: t('navbar.demoDesc.basic'),
    },
    {
      title: t('navbar.demo.back'),
      code: '<NavBar title="Details" backArrow onBack={() => history.back()} />',
      desc: t('navbar.demoDesc.back'),
    },
    {
      title: t('navbar.demo.sides'),
      code: '<NavBar\n  title="Messages"\n  left={<Icon name="user" size={20} />}\n  right={<Icon name="settings" size={20} />}\n/>',
      desc: t('navbar.demoDesc.sides'),
    },
    {
      title: t('navbar.demo.style'),
      code: '<NavBar title="Brand" background="#1677ff" color="#fff" backArrow />',
      desc: t('navbar.demoDesc.style'),
    },
    {
      title: t('navbar.demo.fixed'),
      code: '<NavBar title="Fixed Nav" fixed placeholder border />',
      desc: t('navbar.demoDesc.fixed'),
    },
    {
      title: 'JSX Title + Tabs',
      code: '<NavBar\n  title={\n    <Tabs>\n      <Tab name="a" title="Posts" />\n      <Tab name="b" title="Likes" />\n      <Tab name="c" title="Saved" />\n    </Tabs>\n  }\n  left={<Icon name="search" size={20} />}\n  right={<span>+ New</span>}\n/>',
      desc: 'title 支持任意 JSX，可嵌入 Tabs 等组件，实现导航栏 + 标签页的复合布局。',
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>NavBar</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('navbar.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
