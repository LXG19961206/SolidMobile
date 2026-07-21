import { createSignal, Show, For } from 'solid-js';
import { useT } from '../doc-i18n';
import { ActionSheet } from '../../src/components/ActionSheet';
import { PropsAttrs } from './PropsAttrs';
import type { TableSection } from './ComponentDocLayout';

interface MobilePropsSheetProps {
  propsTables?: TableSection[];
  cssVarsTables?: TableSection[];
}

/**
 * 移动端属性/变量查看 — 底部弹出 ActionSheet，左侧分组导航 + 右侧表格内容。
 */
export function MobilePropsSheet(props: MobilePropsSheetProps) {
  const t = useT();
  const [open, setOpen] = createSignal(false);
  const [tab, setTab] = createSignal<'props' | 'cssvars'>('props');
  const [groupIdx, setGroupIdx] = createSignal(0);
  const inIframe = typeof window !== 'undefined' && window.top !== window.self;

  if (inIframe) return null;

  const currentGroups = () => {
    const list = tab() === 'props' ? (props.propsTables || []) : (props.cssVarsTables || []);
    return list;
  };

  const hasCssVars = () => props.cssVarsTables && props.cssVarsTables!.length > 0;

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
        <div style={{ display: 'flex', 'flex-direction': 'column', height: '55vh' }}>
          {/* Top tabs: Props / CSS Vars */}
          <div style={{ display: 'flex', 'flex-shrink': 0, 'border-bottom': '1px solid var(--sc-color-border, #e5e7eb)' }}>
            <div onClick={() => { setTab('props'); setGroupIdx(0); }}
              style={tabStyle(tab() === 'props')}>{t('common.props')}</div>
            <div onClick={() => { setTab('cssvars'); setGroupIdx(0); }}
              style={tabStyle(tab() === 'cssvars')}>{t('common.cssVars')}</div>
          </div>

          {/* Body: sidebar + content */}
          <div style={{ display: 'flex', flex: 1, 'min-height': 0 }}>
            {/* Left sidebar: group nav */}
            <div style={{
              width: '120px', 'flex-shrink': 0, 'overflow-y': 'auto',
              'border-right': '1px solid var(--sc-color-border, #e5e7eb)',
              background: 'var(--sc-color-background-secondary, #f9fafb)',
            }}>
              <Show when={tab() === 'cssvars' && !hasCssVars()}>
                <div style={{ padding: '24px 12px', 'font-size': '0.8rem', color: '#9ca3af', 'text-align': 'center' }}>
                  {t('common.noCssVars')}
                </div>
              </Show>
              <Show when={!(tab() === 'cssvars' && !hasCssVars())}>
                <For each={currentGroups()}>
                  {(g, i) => (
                    <div onClick={() => setGroupIdx(i())} style={{
                      padding: '10px 12px', 'font-size': '0.78rem', cursor: 'pointer',
                      color: groupIdx() === i() ? 'var(--sc-color-primary, #1677ff)' : 'var(--sc-color-text-secondary, #6b7280)',
                      background: groupIdx() === i() ? 'var(--sc-card-bg, #fff)' : 'transparent',
                      'font-weight': groupIdx() === i() ? 600 : 400,
                      'border-right': groupIdx() === i() ? '2px solid var(--sc-color-primary, #1677ff)' : '2px solid transparent',
                      'border-bottom': '1px solid var(--sc-color-border, #f3f4f6)',
                      overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap',
                    }}>
                      {g.title || `${t('common.props')} ${i() + 1}`}
                    </div>
                  )}
                </For>
              </Show>
            </div>

            {/* Right content: selected table */}
            <div style={{ flex: 1, 'overflow-y': 'auto', padding: '8px' }}>
              <Show when={currentGroups()[groupIdx()]}>
                <PropsAttrs compact hideTitle
                  propsTables={tab() === 'props' ? [currentGroups()[groupIdx()]] : undefined}
                  cssVarsTables={tab() === 'cssvars' ? [currentGroups()[groupIdx()]] : undefined}
                />
              </Show>
            </div>
          </div>
        </div>
      </ActionSheet>
    </>
  );
}

const tabStyle = (active: boolean) => ({
  flex: 1, 'text-align': 'center', padding: '10px 0', cursor: 'pointer',
  'font-size': '0.85rem', 'font-weight': active ? 600 : 400,
  color: active ? 'var(--sc-color-primary, #1677ff)' : 'var(--sc-color-text-secondary, #6b7280)',
  'border-bottom': active ? '2px solid var(--sc-color-primary, #1677ff)' : '2px solid transparent',
  transition: 'all 0.15s',
});
