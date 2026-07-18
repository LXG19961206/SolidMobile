import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { NavBar } from '../../../src/components/NavBar';
import { Tabs, Tab } from '../../../src/components/Tabs';
import { Icon } from '../../../src/components/Icon';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useNavBarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const section = (title: string) => (
  <div style={{ 'font-size': '0.85rem', 'font-weight': 600, padding: '24px 12px 6px', color: 'var(--sc-color-text, #374151)' }}>{title}</div>
);

export const NavBarMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useNavBarTableData();
  const [tabActive, setTabActive] = createSignal('a');

  return (
    <MobilePreview title="NavBar">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div>
        {/* Basic */}
        <div style={{ 'margin-bottom': '20px' }}>
          {section(t('navbar.demo.basic'))}
          <NavBar title="Page Title" border />
        </div>

        {/* Back Arrow */}
        <div style={{ 'margin-bottom': '20px' }}>
          {section(t('navbar.demo.back'))}
          <NavBar title="Details" backArrow onBack={() => {}} border />
        </div>

        {/* Left & Right */}
        <div style={{ 'margin-bottom': '20px' }}>
          {section(t('navbar.demo.sides'))}
          <NavBar title="Messages" left={<Icon name="user" size={20} />} right={<Icon name="settings" size={20} />} border />
        </div>

        {/* Custom Style */}
        <div style={{ 'margin-bottom': '20px' }}>
          {section(t('navbar.demo.style'))}
          <NavBar title="Brand NavBar" background="var(--sc-color-primary, #1677ff)" color="#fff" backArrow onBack={() => {}} />
        </div>

        {/* JSX Title + Tabs */}
        <div style={{ 'margin-bottom': '12px' }}>
          {section('JSX Title + Tabs')}
          <NavBar
            title={<Tabs active={tabActive()} onChange={setTabActive} style={{ '--sc-color-background': 'transparent' }}>
              <Tab name="a" title="Posts" />
              <Tab name="b" title="Likes" />
              <Tab name="c" title="Saved" />
            </Tabs>}
            left={<span style={{ color: 'var(--sc-color-text-secondary, #6b7280)', cursor: 'pointer' }}><Icon name="search" size={20} /></span>}
            right={<span style={{ color: 'var(--sc-color-primary, #1677ff)', 'font-size': '0.85rem', cursor: 'pointer' }}>+ New</span>}
            border
          />
        </div>
      </div>
    </MobilePreview>
  );
};
