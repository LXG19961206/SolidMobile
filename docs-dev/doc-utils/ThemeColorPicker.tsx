import { createSignal, Show, type Component } from 'solid-js';

export const THEME_PRESETS = [
  '#1677ff', '#fa2c19', '#07c160', '#fa8c16',
  '#722ed1', '#ec4899', '#14b8a6', '#576b95',
];

export const ThemeColorPicker: Component<{ color: string; onChange: (c: string) => void }> = (props) => {
  const [open, setOpen] = createSignal(false);
  const [inputVal, setInputVal] = createSignal('');

  const commit = (c: string) => {
    const hex = c.startsWith('#') ? c : `#${c}`;
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      props.onChange(hex);
      setOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex', 'align-items': 'center' }}>
      <button
        type="button"
        class="tb-btn"
        title="Theme color"
        onClick={() => setOpen(!open())}
      >
        <span style={{
          display: 'block', width: '18px', height: '18px', 'border-radius': '50%',
          background: props.color,
          'box-shadow': '0 0 0 1px rgba(0,0,0,0.12) inset',
        }} />
      </button>

      <Show when={open()}>
        {/* Backdrop to capture click-outside & Escape key */}
        <div
          style={{ position: 'fixed', inset: 0, 'z-index': 999 }}
          onClick={() => setOpen(false)}
          onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}
        />
        <div style={{
          position: 'absolute', top: '100%', right: 0, 'margin-top': '8px',
          background: 'var(--sc-doc-card-bg, #fff)',
          border: '1px solid var(--sc-doc-card-placeholder, #e5e7eb)',
          'border-radius': '12px', padding: '16px', 'z-index': 1000,
          'box-shadow': '0 8px 30px rgba(0,0,0,0.12)',
          'min-width': '220px',
        }}>
          {/* Presets */}
          <div style={{
            display: 'grid', 'grid-template-columns': 'repeat(4, 1fr)',
            gap: '10px', 'margin-bottom': '14px',
          }}>
            {THEME_PRESETS.map(c => (
              <div
                onClick={() => commit(c)}
                style={{
                  width: '36px', height: '36px', 'border-radius': '50%',
                  background: c, cursor: 'pointer',
                  border: props.color === c ? '3px solid var(--sc-color-text, #323233)' : '3px solid transparent',
                  transition: 'border 0.15s, transform 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.15)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            ))}
          </div>

          {/* Custom input */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="#1677ff"
              value={inputVal()}
              onInput={e => setInputVal(e.currentTarget.value)}
              onKeyDown={e => { if (e.key === 'Enter') commit(inputVal()); }}
              style={{
                flex: 1, padding: '6px 10px', 'font-size': '0.85rem',
                border: '1px solid var(--sc-doc-card-placeholder, #d1d5db)',
                'border-radius': '6px', outline: 'none',
                'font-family': 'monospace',
                background: 'var(--sc-doc-card-bg, #fff)',
                color: 'var(--sc-doc-card-title, #1f2937)',
              }}
            />
            <button
              type="button"
              onClick={() => commit(inputVal())}
              style={{
                padding: '6px 12px', 'font-size': '0.8rem', 'font-weight': 600,
                background: props.color, color: '#fff', border: 'none',
                'border-radius': '6px', cursor: 'pointer',
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
};
