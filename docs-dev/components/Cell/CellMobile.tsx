import { useT, registerLocale } from '../../doc-i18n';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCellTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const section = (title: string) => (
  <div style={{ 'font-size': '0.85rem', 'font-weight': 600, padding: '20px 12px 6px', color: 'var(--sc-color-text, #374151)' }}>{title}</div>
);

export const CellMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useCellTableData();

  return (
    <MobilePreview title="Cell">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div>
        {/* Basic */}
        {section(t('cell.demo.basic'))}
        <CellGroup>
          <Cell title="Name" value="John Smith" />
          <Cell title="Phone" value="+1 (555) 0123" />
          <Cell title="Address" value="Haidian, Beijing" />
        </CellGroup>

        {/* Clickable & Icon */}
        {section(t('cell.demo.clickable'))}
        <CellGroup>
          <Cell title="My Orders" icon="shopping-bag" clickable onClick={() => {}} />
          <Cell title="My Favorites" icon="heart" clickable onClick={() => {}} />
          <Cell title="Settings" icon="settings" clickable onClick={() => {}} />
        </CellGroup>

        {/* Form & Required */}
        {section(t('cell.demo.form'))}
        <CellGroup>
          <Cell title="Username" value="Enter username" description="6-20 characters" required clickable onClick={() => {}} />
          <Cell title="Password" value="Enter password" description="At least 8 characters" required clickable onClick={() => {}} />
        </CellGroup>

        {/* Card Mode */}
        {section(t('cell.demo.card'))}
        <CellGroup card>
          <Cell title="Version" value="v2.0.0" />
          <Cell title="Changelog" clickable onClick={() => {}} />
        </CellGroup>
      </div>
    </MobilePreview>
  );
};
