import { registerLocale } from '../../doc-i18n';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import { SafeAreaDesign } from './SafeAreaDesign';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSafeAreaTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SafeAreaMobile = () => {
  const { propsTables, cssVarsTables } = useSafeAreaTableData();

  return (
    <MobilePreview title="SafeArea">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
      <div style={{ padding: '12px' }}>
        <SafeAreaDesign />
      </div>
    </MobilePreview>
  );
};
