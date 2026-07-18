import { createSignal, Show } from 'solid-js';
import { useLocale, useT } from '../doc-i18n';
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
 * cssVarsTables 为空时展示 Empty 占位。
 */
export function MobilePropsSheet(props: MobilePropsSheetProps) {
  const t = useT();
  const [open, setOpen] = createSignal(false);
  const [tab, setTab] = createSignal<'props' | 'cssvars'>('props');
  const inIframe = typeof window !== 'undefined' && window.top !== window.self;

  const hasCssVars = () => props.cssVarsTables && props.cssVarsTables!.length > 0;

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

      <ActionSheet open={open()} onClose={() => setOpen(false)} data-locale={useLocale()}>
        <div style={{ padding: '8px' }}>
          <Tabs active={tab()} onChange={(v) => setTab(v as 'props' | 'cssvars')} style={{ '--sc-color-background': 'transparent' }}>
            <Tab title={t('common.props')} name="props">
              <div style={{ padding: "12px 16px" }}><PropsAttrs compact hideTitle propsTables={props.propsTables} /></div>
            </Tab>
            <Tab title={t('common.cssVars')} name="cssvars">
              <Show when={hasCssVars()} fallback={
                <div style={{ padding: '32px 16px', 'text-align': 'center', 'font-size': '0.85rem', color: 'var(--sc-color-text-secondary, #9ca3af)' }}>
                  {t('common.noCssVars')}
                </div>
              }>
                <div style={{ padding: "12px 16px" }}><PropsAttrs compact hideTitle cssVarsTables={props.cssVarsTables} /></div>
              </Show>
            </Tab>
          </Tabs>
        </div>
      </ActionSheet>
    </>
  );
}
