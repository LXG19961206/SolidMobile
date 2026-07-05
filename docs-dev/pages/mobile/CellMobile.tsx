import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CellMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Icon } from '../../../src/components/Icon';
import { useT } from '../../doc-i18n';
import { Switch } from '../../../src/components/Switch';

const propsData = [
  { name: 'Cell.title', type: 'string | JSX.Element', desc: 'componentProps.cell.Cell.title' },
  { name: 'Cell.value', type: 'string | JSX.Element', desc: 'componentProps.cell.Cell.value' },
  { name: 'Cell.description', type: 'string', desc: 'componentProps.cell.Cell.description' },
  { name: 'Cell.descriptionError', type: 'boolean', desc: 'componentProps.cell.Cell.descriptionError' },
  { name: 'Cell.icon', type: 'IconName | JSX.Element', desc: 'componentProps.cell.Cell.icon' },
  { name: 'Cell.size', type: "'sm' | 'md' | 'lg'", desc: 'componentProps.cell.Cell.size' },
  { name: 'Cell.required', type: 'boolean', desc: 'componentProps.cell.Cell.required' },
  { name: 'Cell.center', type: 'boolean', desc: 'componentProps.cell.Cell.center' },
  { name: 'Cell.clickable', type: 'boolean', desc: 'componentProps.cell.Cell.clickable' },
  { name: 'Cell.onClick', type: '() => void', desc: 'componentProps.cell.Cell.onClick' },
  { name: 'CellGroup.title', type: 'string', desc: 'componentProps.cell.CellGroup.title' },
  { name: 'CellGroup.card', type: 'boolean', desc: 'componentProps.cell.CellGroup.card' },
  { name: 'CellGroup.border', type: 'boolean', desc: 'componentProps.cell.CellGroup.border' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const CellMobile: Component<CellMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Cell 单元格" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cellBasicTitle')}</div>
        <div style={CARD.desc}>{t('demo.cellBasicMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup title={t('demo.basicInfo')}>
            <Cell title={t('demo.name')} value="张三" />
            <Cell title={t('demo.phone')} value="138****8888" />
            <Cell title={t('demo.address')} value="北京市海淀区" />
          </CellGroup>
        </div>
      </div>

      {/* 可点击 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.clickableAndIcon')}</div>
        <div style={CARD.desc}>{t('demo.clickableAndIconMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup title={t('demo.personalCenter')}>
            <Cell title={t('demo.myOrders')} icon="shopping-bag" clickable onClick={() => {}} />
            <Cell title={t('demo.myFavorites')} icon="heart" clickable onClick={() => {}} />
            <Cell title={t('demo.addressManagement')} icon="map-pin" clickable onClick={() => {}} />
            <Cell title={t('demo.settings')} icon="settings" clickable onClick={() => {}} />
          </CellGroup>
        </div>
      </div>

      {/* 描述 & 必填 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.descriptionAndRequired')}</div>
        <div style={CARD.desc}>{t('demo.descriptionAndRequiredMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup title={t('demo.formName')}>
            <Cell title={t('demo.username')} value={t('demo.enterUsername')} description={t('demo.usernameHint')} required clickable onClick={() => {}} />
            <Cell title={t('demo.password')} value={t('demo.enterPassword')} description={t('demo.passwordHint')} required clickable onClick={() => {}} />
          </CellGroup>
        </div>
      </div>

      {/* 卡片模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cardModeCard')}</div>
        <div style={CARD.desc}>{t('demo.cardModeCardMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup title={t('section.cardMode')} card>
            <Cell title={t('demo.version')} value="v2.0.0" />
            <Cell title={t('demo.changelog')} clickable onClick={() => {}} />
          </CellGroup>
        </div>
      </div>
    </MobilePreview>
  );
};
