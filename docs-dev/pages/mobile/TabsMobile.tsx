import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface TabsMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Tabs, Tab } from '../../../src/components/Tabs';
import { Icon } from '../../../src/components/Icon';

const propsData = [
  { name: 'active', type: 'number | string', desc: 'componentProps.tabs.active' },
  { name: 'defaultActive', type: 'number | string', desc: 'componentProps.tabs.defaultActive' },
  { name: 'onChange', type: '(name) => void', desc: 'componentProps.tabs.onChange' },
  { name: 'type', type: "'line' | 'card'", desc: 'componentProps.tabs.type' },
  { name: 'color', type: 'string', desc: 'componentProps.tabs.color' },
  { name: 'background', type: 'string', desc: 'componentProps.tabs.background' },
  { name: 'animated', type: 'boolean', desc: 'componentProps.tabs.animated' },
  { name: 'border', type: 'boolean', desc: 'componentProps.tabs.border' },
  { name: 'sticky', type: 'boolean', desc: 'componentProps.tabs.sticky' },
  { name: 'swipeable', type: 'boolean', desc: 'componentProps.tabs.swipeable' },
  { name: 'lazyRender', type: 'boolean', desc: 'componentProps.tabs.lazyRender' },
  { name: 'beforeChange', type: '(name) => boolean', desc: 'componentProps.tabs.beforeChange' },
  { name: 'titleActiveColor', type: 'string', desc: 'componentProps.tabs.titleActiveColor' },
  { name: 'titleInactiveColor', type: 'string', desc: 'componentProps.tabs.titleInactiveColor' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const TabsMobile: Component<TabsMobileProps> = (props) => {
  const t = useT();
  const [active1, setActive1] = createSignal(0);
  const [active2, setActive2] = createSignal(0);
  const [active3, setActive3] = createSignal('a');

  return (
    <MobilePreview title={t('demo.tabsMobileTitle')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 line 模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.lineMode')}</div>
        <div style={CARD.desc}>{t('demo.lineModeDesc')}</div>
        <div style={CARD.body}>
          <Tabs active={active1()} onChange={setActive1}>
            <Tab name={0} title={t('demo.tabLabel1')}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabContent1')}</div>
            </Tab>
            <Tab name={1} title={t('demo.tabLabel2')}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabContent2')}</div>
            </Tab>
            <Tab name={2} title={t('demo.tabLabel3')}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabContent3')}</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* card 模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cardMode')}</div>
        <div style={CARD.desc}>{t('demo.cardModeDesc')}</div>
        <div style={CARD.body}>
          <Tabs type="card" active={active2()} onChange={setActive2}>
            <Tab name={0} title={t('demo.tabOptionA')}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabCardContentA')}</div>
            </Tab>
            <Tab name={1} title={t('demo.tabOptionB')}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabCardContentB')}</div>
            </Tab>
            <Tab name={2} title={t('demo.tabOptionC')}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabCardContentC')}</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* 自定义颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tabsCustomColor')}</div>
        <div style={CARD.desc}>{t('demo.tabsCustomColorDesc')}</div>
        <div style={CARD.body}>
          <Tabs active={active3()} onChange={setActive3} color="#22c55e" border>
            <Tab name="a" title={t('demo.tabAll')}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabAllOrders')}</div>
            </Tab>
            <Tab name="b" title={t('demo.tabPendingPayment')}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabPendingOrders')}</div>
            </Tab>
            <Tab name="c" title={t('demo.tabCompleted')}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabCompletedOrders')}</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* 图标标题 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tabsIconTitle')}</div>
        <div style={CARD.desc}>{t('demo.tabsIconTitleDesc')}</div>
        <div style={CARD.body}>
          <Tabs defaultActive={0}>
            <Tab name={0} title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '4px' }}><Icon name="home" size={16} /> {t('demo.tabHome')}</span>}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabHomeContent')}</div>
            </Tab>
            <Tab name={1} title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '4px' }}><Icon name="heart" size={16} /> {t('demo.tabFavorites')}</span>}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabFavoritesContent')}</div>
            </Tab>
            <Tab name={2} title={<span style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '4px' }}><Icon name="user" size={16} /> {t('demo.tabProfile')}</span>}>
              <div style={{ padding: '16px', color: 'var(--sc-doc-card-text, #374151)' }}>{t('demo.tabProfileContent')}</div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.tabsDisabled')}</div>
        <div style={CARD.desc}>{t('demo.tabsDisabledDesc')}</div>
        <div style={CARD.body}>
          <Tabs defaultActive={0}>
            <Tab name={0} title={t('demo.tabNormal')} />
            <Tab name={1} title={t('demo.disabledLabel')} disabled />
            <Tab name={2} title={t('demo.tabNormal')} />
          </Tabs>
        </div>
      </div>
    </MobilePreview>
  );
};
