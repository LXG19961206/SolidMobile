import { createSignal, Show, For } from 'solid-js';
import { useT } from '../doc-i18n';
import { ActionSheet } from '../../src/components/ActionSheet';
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
          borderRadius: '8px', fontSize: '0.85rem',
          color: 'var(--sc-color-primary, #1677ff)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>{t('common.props')} & {t('common.cssVars')}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--sc-color-text-tertiary, #9ca3af)' }}>View</span>
        </div>
      </div>

      <ActionSheet open={open()} onClose={() => setOpen(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '55vh' }}>
          {/* Top tabs */}
          <div style={{ display: 'flex', flexShrink: 0, borderBottom: '1px solid var(--sc-color-border, #e5e7eb)' }}>
            <div onClick={() => { setTab('props'); setGroupIdx(0); }}
              style={tabCss(tab() === 'props')}>{t('common.props')}</div>
            <div onClick={() => { setTab('cssvars'); setGroupIdx(0); }}
              style={tabCss(tab() === 'cssvars')}>{t('common.cssVars')}</div>
          </div>

          {/* Body */}
          <Show when={needSidebar()} fallback={
            <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
              <Show when={tab() === 'cssvars' && !hasCssVars()}>
                <div style={{ padding: '32px 16px', textAlign: 'center', fontSize: '0.85rem', color: '#9ca3af' }}>{t('common.noCssVars')}</div>
              </Show>
              <Show when={currentGroups().length > 0}>
                <PropsAttrs compact hideTitle
                  propsTables={tab() === 'props' ? currentGroups() : undefined}
                  cssVarsTables={tab() === 'cssvars' ? currentGroups() : undefined}
                />
              </Show>
            </div>
          }>
            <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
              <div style={{
                width: '90px', flexShrink: 0, overflowY: 'auto',
                borderRight: '1px solid var(--sc-color-border, #e5e7eb)',
                background: 'var(--sc-color-background-secondary, #f9fafb)',
              }}>
                <Show when={tab() === 'cssvars' && !hasCssVars()}>
                  <div style={{ padding: '24px 8px', fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center' }}>{t('common.noCssVars')}</div>
                </Show>
                <For each={currentGroups()}>
                  {(g, i) => (
                    <div onClick={() => setGroupIdx(i())} style={{
                      padding: '8px 8px', fontSize: '0.72rem', cursor: 'pointer',
                      color: groupIdx() === i() ? 'var(--sc-color-primary, #1677ff)' : '#6b7280',
                      background: groupIdx() === i() ? 'var(--sc-card-bg, #fff)' : 'transparent',
                      fontWeight: groupIdx() === i() ? 600 : 400,
                      borderRight: groupIdx() === i() ? '2px solid var(--sc-color-primary, #1677ff)' : '2px solid transparent',
                      borderBottom: '1px solid var(--sc-color-border, #f3f4f6)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {g.title || `${tab() === 'props' ? 'Props' : 'CSS'} ${i() + 1}`}
                    </div>
                  )}
                </For>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
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
  flex: 1, textAlign: 'center', padding: '10px 0', cursor: 'pointer',
  fontSize: '0.85rem', fontWeight: active ? 600 : 400,
  color: active ? 'var(--sc-color-primary, #1677ff)' : 'var(--sc-color-text-secondary, #6b7280)',
  borderBottom: active ? '2px solid var(--sc-color-primary, #1677ff)' : '2px solid transparent',
  transition: 'all 0.15s',
});
