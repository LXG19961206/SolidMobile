import { createSignal, Show, createMemo } from 'solid-js';
import { useT } from '../doc-i18n';
import { ActionSheet } from '../../src/components/ActionSheet';
import { Sidebar } from '../../src/components/Sidebar';
import { PropsAttrs } from './PropsAttrs';
import type { TableSection } from './ComponentDocLayout';

interface MobilePropsSheetProps {
  propsTables?: TableSection[];
  cssVarsTables?: TableSection[];
}

export function MobilePropsSheet(props: MobilePropsSheetProps) {
  const t = useT();
  const [open, setOpen] = createSignal(false);
  const [tab, setTab] = createSignal<'props' | 'cssvars'>('props');
  const [groupIdx, setGroupIdx] = createSignal(0);
  const inIframe = typeof window !== 'undefined' && window.top !== window.self;

  if (inIframe) return null;

  const propsGroups = () => props.propsTables || [];
  const cssGroups = () => props.cssVarsTables || [];
  const currentGroups = () => tab() === 'props' ? propsGroups() : cssGroups();
  const hasCssVars = () => cssGroups().length > 0;
  const needSidebar = () => currentGroups().length > 1;

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
        <div style={{ display: 'flex', 'flex-direction': 'column', height: '70vh' }}>
          {/* Top tabs */}
          <div style={{ display: 'flex', 'flex-shrink': 0, 'border-bottom': '1px solid var(--sc-color-border, #e5e7eb)' }}>
            <div onClick={() => { setTab('props'); setGroupIdx(0); }}
              style={tabCss(tab() === 'props')}>{t('common.props')}</div>
            <div onClick={() => { setTab('cssvars'); setGroupIdx(0); }}
              style={tabCss(tab() === 'cssvars')}>{t('common.cssVars')}</div>
          </div>

          {/* Body */}
          <Show when={needSidebar()} fallback={
            <div style={{ flex: 1, overflow: 'hidden auto', padding: '8px' }}>
              <Show when={tab() === 'cssvars' && !hasCssVars()}>
                <div style={{ padding: '32px 16px', 'text-align': 'center', 'font-size': '0.85rem', color: '#9ca3af' }}>{t('common.noCssVars')}</div>
              </Show>
              <Show when={currentGroups().length > 0}>
                <PropsAttrs compact hideTitle
                  propsTables={tab() === 'props' ? currentGroups() : undefined}
                  cssVarsTables={tab() === 'cssvars' ? currentGroups() : undefined}
                />
              </Show>
            </div>
          }>
            <div style={{ display: 'flex', flex: 1, 'min-height': 0 }}>
              <Sidebar
                items={createMemo(() => currentGroups().map((g, i) => ({
                  key: String(i),
                  title: g.title || `${tab() === 'props' ? 'Props' : 'CSS'} ${i + 1}`,
                })))()}
                activeKey={String(groupIdx())}
                onChange={(k) => setGroupIdx(Number(k))}
              />
              <div style={{ flex: 1, 'overflow-y': 'auto', padding: '8px' }}>
                <Show when={currentGroups()[groupIdx()]}>
                  <PropsAttrs compact hideTitle
                    propsTables={tab() === 'props' ? [currentGroups()[groupIdx()]] : undefined}
                    cssVarsTables={tab() === 'cssvars' ? [currentGroups()[groupIdx()]] : undefined}
                  />
                </Show>
              </div>
            </div>
          </Show>
        </div>
      </ActionSheet>
    </>
  );
}

const tabCss = (active: boolean): Record<string, string | number> => ({
  flex: 1, 'text-align': 'center', padding: '10px 0', cursor: 'pointer',
  'font-size': '0.85rem', 'font-weight': active ? 600 : 400,
  color: active ? 'var(--sc-color-primary, #1677ff)' : 'var(--sc-color-text-secondary, #6b7280)',
  'border-bottom': active ? '2px solid var(--sc-color-primary, #1677ff)' : '2px solid transparent',
  transition: 'all 0.15s',
});
