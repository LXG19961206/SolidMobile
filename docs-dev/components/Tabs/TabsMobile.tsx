import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Tabs, Tab } from '../../../src/components/Tabs';
import { Icon } from '../../../src/components/Icon';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useTabsTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const panel = { padding: '16px', color: 'var(--sc-color-text, #374151)' };

export const TabsMobile = () => {
  const t = useT();
  const { propsTables } = useTabsTableData();
  const [activeLine, setActiveLine] = createSignal(0);
  const [activeCard, setActiveCard] = createSignal(0);
  const [activeScroll, setActiveScroll] = createSignal('a');
  const [activeColor, setActiveColor] = createSignal('a');
  const [activeCtrl, setActiveCtrl] = createSignal('a');

  return (
    <MobilePreview title="Tabs">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Line Mode */}
        <Card title={t('tabs.demo.line')}>
          <Tabs active={activeLine()} onChange={setActiveLine}>
            <Tab name={0} title="Tab 1"><div style={panel}>Content 1</div></Tab>
            <Tab name={1} title="Tab 2"><div style={panel}>Content 2</div></Tab>
            <Tab name={2} title="Tab 3"><div style={panel}>Content 3</div></Tab>
          </Tabs>
        </Card>

        {/* Scrollable */}
        <Card title={t('tabs.demo.scrollable')}>
          <Tabs active={activeScroll()} onChange={setActiveScroll} centered>
            <Tab name="a" title="First"><div style={panel}>Content A</div></Tab>
            <Tab name="b" title="Second"><div style={panel}>Content B</div></Tab>
            <Tab name="c" title="Third"><div style={panel}>Content C</div></Tab>
            <Tab name="d" title="Fourth"><div style={panel}>Content D</div></Tab>
            <Tab name="e" title="Fifth"><div style={panel}>Content E</div></Tab>
            <Tab name="f" title="Sixth"><div style={panel}>Content F</div></Tab>
            <Tab name="g" title="Seventh"><div style={panel}>Content G</div></Tab>
            <Tab name="h" title="Eighth"><div style={panel}>Content H</div></Tab>
            <Tab name="i" title="Ninth"><div style={panel}>Content I</div></Tab>
            <Tab name="j" title="Tenth"><div style={panel}>Content J</div></Tab>
          </Tabs>
        </Card>

        {/* JSX Title */}
        <Card title={t('tabs.demo.jsxTitle')}>
          <Tabs defaultActive={0}>
            <Tab name={0} title={<span style={{ display: 'flex', 'align-items': 'center', gap: '4px' }}><Icon name="home" size={16} /> Home</span>}>
              <div style={panel}>Home content</div>
            </Tab>
            <Tab name={1} title={<span style={{ display: 'flex', 'align-items': 'center', gap: '4px' }}><Icon name="heart" size={16} /> Favorites</span>}>
              <div style={panel}>Favorites content</div>
            </Tab>
            <Tab name={2} title={<span style={{ display: 'flex', 'align-items': 'center', gap: '4px' }}><Icon name="user" size={16} /> Profile</span>}>
              <div style={panel}>Profile content</div>
            </Tab>
          </Tabs>
        </Card>

        {/* Card Mode */}
        <Card title={t('tabs.demo.card')}>
          <Tabs type="card" active={activeCard()} onChange={setActiveCard}>
            <Tab name={0} title="Option A"><div style={panel}>Card content A</div></Tab>
            <Tab name={1} title="Option B"><div style={panel}>Card content B</div></Tab>
            <Tab name={2} title="Option C"><div style={panel}>Card content C</div></Tab>
          </Tabs>
        </Card>

        {/* Custom Color */}
        <Card title={t('tabs.demo.color')}>
          <Tabs active={activeColor()} onChange={setActiveColor} color="#22c55e" border>
            <Tab name="a" title="All"><div style={panel}>All Orders</div></Tab>
            <Tab name="b" title="Pending"><div style={panel}>Pending Orders</div></Tab>
            <Tab name="c" title="Completed"><div style={panel}>Completed Orders</div></Tab>
          </Tabs>
        </Card>

        {/* Disabled */}
        <Card title={t('tabs.demo.disabled')}>
          <Tabs defaultActive={0}>
            <Tab name={0} title="Normal" />
            <Tab name={1} title="Disabled" disabled />
            <Tab name={2} title="Normal" />
          </Tabs>
        </Card>
      </div>
    </MobilePreview>
  );
};
