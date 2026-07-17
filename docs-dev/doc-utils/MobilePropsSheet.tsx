import { createSignal } from 'solid-js';
import { useT } from '../doc-i18n';
import { ActionSheet } from '../../src/components/ActionSheet';
import { Tabs, Tab } from '../../src/components/Tabs';
import { PropsAttrs } from './PropsAttrs';
import type { TableSection } from './ComponentDocLayout';

interface MobilePropsSheetProps {
  propsTables?: TableSection[];
  cssVarsTables?: TableSection[];
}

/**
 * 移动端属性/变量查看按钮 + ActionSheet 弹出。
 * 仅 inIframe 时隐藏，独立模式下展示入口按钮。
 */
export function MobilePropsSheet(props: MobilePropsSheetProps) {
  const t = useT();
  const [open, setOpen] = createSignal(false);
  const [tab, setTab] = createSignal<'props' | 'cssvars'>('props');
  const inIframe = typeof window !== 'undefined' && window.top !== window.self;

  if (inIframe) return null;

  return (
    <>
      <div style={{ padding: '12px 12px 0' }}>
        <div onClick={() => setOpen(true)} style={{
          padding: '10px 14px', background: 'var(--sc-color-background-secondary, #f5f5f5)',
          'border-radius': '8px', 'font-size': '0.85rem',
          color: 'var(--sc-color-primary, #1677ff)', cursor: 'pointer',
          display: 'flex', 'align-items': 'center', 'justify-content': 'space-between',
        }}>
          <span>{t('common.props')} & {t('common.cssVars')}</span>
          <span style={{ 'font-size': '0.75rem', color: 'var(--sc-color-text-tertiary, #9ca3af)' }}>View</span>
        </div>
      </div>

      <ActionSheet open={open()} onClose={() => setOpen(false)}>
        <div style={{ padding: '4px 16px 20px' }}>
          <Tabs active={tab()} onChange={(v) => setTab(v as 'props' | 'cssvars')}>
            <Tab title={t('common.props')} name="props">
              <PropsAttrs compact hideTitle propsTables={props.propsTables} />
            </Tab>
            <Tab title={t('common.cssVars')} name="cssvars">
              <PropsAttrs compact hideTitle cssVarsTables={props.cssVarsTables} />
            </Tab>
          </Tabs>
        </div>
      </ActionSheet>
    </>
  );
}
