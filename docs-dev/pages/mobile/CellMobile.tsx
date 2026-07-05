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
    <MobilePreview title="Cell" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Basic */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cellBasicTitle')}</div>
        <div style={CARD.desc}>{t('demo.cellBasicMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup title="Basic Info">
            <Cell title="Name" value="John Smith" />
            <Cell title="Phone" value="+1 (555) 0123" />
            <Cell title="Address" value="Haidian, Beijing" />
          </CellGroup>
        </div>
      </div>

      {/* Clickable & Icon */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.clickableAndIcon')}</div>
        <div style={CARD.desc}>{t('demo.clickableAndIconMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup title="Personal Center">
            <Cell title="My Orders" icon="shopping-bag" clickable onClick={() => {}} />
            <Cell title="My Favorites" icon="heart" clickable onClick={() => {}} />
            <Cell title="Address Management" icon="map-pin" clickable onClick={() => {}} />
            <Cell title="Settings" icon="settings" clickable onClick={() => {}} />
          </CellGroup>
        </div>
      </div>

      {/* Description & Required */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.descriptionAndRequired')}</div>
        <div style={CARD.desc}>{t('demo.descriptionAndRequiredMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup title="Form">
            <Cell title="Username" value="Enter username" description="6-20 characters" required clickable onClick={() => {}} />
            <Cell title="Password" value="Enter password" description="At least 8 characters" required clickable onClick={() => {}} />
          </CellGroup>
        </div>
      </div>

      {/* Card mode */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cardModeCard')}</div>
        <div style={CARD.desc}>{t('demo.cardModeCardMobileDesc')}</div>
        <div style={CARD.body}>
          <CellGroup title="Card Mode" card>
            <Cell title="Version" value="v2.0.0" />
            <Cell title="Changelog" clickable onClick={() => {}} />
          </CellGroup>
        </div>
      </div>
    </MobilePreview>
  );
};
