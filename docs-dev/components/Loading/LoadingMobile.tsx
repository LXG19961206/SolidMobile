import { createSignal, Show } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Loading } from '../../../src/components/Loading';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useLoadingTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const col = { display: 'flex', 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' };
const label = { 'font-size': '0.65rem', color: 'var(--sc-color-text-secondary, #9ca3af)' };
const row = { display: 'flex', 'flex-wrap': 'wrap' as const, gap: '16px', 'align-items': 'center' as const };

export const LoadingMobile = () => {
  const t = useT();
  const { propsTables } = useLoadingTableData();
  const [showOverlay, setShowOverlay] = createSignal(false);
  const [btnLoading, setBtnLoading] = createSignal(false);

  return (
    <MobilePreview title="Loading">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Types */}
        <Card title={t('loading.demo.types')}>
          <div style={row}>
            <div style={col}><Loading type="spinner" size={28} /><span style={label}>spinner</span></div>
            <div style={col}><Loading type="circular" size={28} /><span style={label}>circular</span></div>
            <div style={col}><Loading type="dots" size={28} /><span style={label}>dots</span></div>
          </div>
        </Card>

        {/* Text & Layout */}
        <Card title={t('loading.demo.text')}>
          <div style={{ ...row, gap: '24px' }}>
            <Loading text="Loading..." />
            <Loading text="Loading..." type="circular" vertical />
            <Loading text="Please wait..." type="dots" color="var(--sc-color-primary, #1677ff)" />
          </div>
        </Card>

        {/* Size & Color */}
        <Card title={t('loading.demo.sizeColor')}>
          <div style={row}>
            <Loading type="spinner" size={20} color="var(--sc-color-primary, #1677ff)" />
            <Loading type="spinner" size={28} color="#22c55e" />
            <Loading type="spinner" size={36} color="#f59e0b" />
            <Loading type="spinner" size={44} color="#ef4444" />
          </div>
        </Card>

        {/* JSX — Loading in Button */}
        <Card title={t('loading.jsxDemo')}>
          <div style={row}>
            <Button size="sm" onClick={() => {
              setBtnLoading(true);
              setTimeout(() => setBtnLoading(false), 1500);
            }}>
              {btnLoading() ? <span style={{ display: 'inline-flex', 'align-items': 'center', gap: '6px' }}><Loading size={16} color="#fff" /> Saving</span> : 'Save'}
            </Button>
          </div>
        </Card>

        {/* Overlay */}
        <Card title={t('loading.demo.overlay')}>
          <Button size="sm" onClick={() => { setShowOverlay(true); setTimeout(() => setShowOverlay(false), 2000); }}>
            Show Overlay Loading
          </Button>
          <Show when={showOverlay()}>
            <Loading overlay text="Loading..." />
          </Show>
        </Card>
      </div>
    </MobilePreview>
  );
};
