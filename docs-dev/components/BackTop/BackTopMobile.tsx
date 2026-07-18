import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { BackTop } from '../../../src/components/BackTop';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useBackTopTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const BackTopMobile = () => {
  const t = useT();
  const { propsTables } = useBackTopTableData();

  return (
    <MobilePreview title="BackTop">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', 'font-size': '0.8rem', color: 'var(--sc-color-text-secondary, #6b7280)', 'line-height': 1.6, 'margin-bottom': '8px' }}>
        {t('backtop.intro')}
      </div>

      <CellGroup card>
        <For each={Array.from({ length: 30 }, (_, i) => ({ name: `Item ${i + 1}`, value: `Value ${i + 1}` }))}>
          {(item) => <Cell title={item.name} value={item.value} />}
        </For>
      </CellGroup>

      <BackTop threshold={200} inset={{ right: 16, bottom: 60 }} zIndex={1100} />
    </MobilePreview>
  );
};
