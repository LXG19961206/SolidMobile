import { createSignal, createMemo, onMount, For, Show, type Component } from 'solid-js';
import { useT } from '../../src/i18n';
import { Input } from '../../src/components/Input';
import { Icon } from '../../src/components/Icon';
import { GROUPS, GUIDE_GROUPS } from '../nav';
import { messages as libMessages } from '../../src/i18n/dictionaries';

type IndexEntry = { key: string; text: string; category: string };

function highlightText(text: string, term: string) {
  if (!term) return text;
  const idx = text.toLowerCase().indexOf(term.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark class="search-highlight" style={{ 'border-radius': '2px', padding: '0 1px' }}>{text.slice(idx, idx + term.length)}</mark>
      {text.slice(idx + term.length)}
    </>
  );
}

export const SearchBar: Component<{ onNavigate: (key: string) => void }> = (props) => {
  const t = useT();
  const [q, setQ] = createSignal('');
  const [focused, setFocused] = createSignal(false);
  const [index, setIndex] = createSignal<IndexEntry[]>([]);

  onMount(() => {
    setTimeout(() => {
      const entries: IndexEntry[] = [];
      const seen = new Set<string>();
      const add = (k: string, txt: string, c: string) => {
        if (txt && typeof txt === 'string' && txt.length > 1 && !seen.has(txt)) {
          entries.push({ key: k, text: txt, category: c }); seen.add(txt);
        }
      };
      function walk(obj: any, route: string) {
        if (!obj || typeof obj !== 'object') return;
        for (const k of Object.keys(obj)) {
          const v = obj[k];
          if (typeof v === 'string' && v.length < 120) add(route, v, '');
          else if (v && typeof v === 'object') walk(v, route);
        }
      }
      const msgs: any = libMessages;
      if (msgs['zh-CN']?.component) {
        for (const comp of Object.keys(msgs['zh-CN'].component)) {
          walk(msgs['zh-CN'].component[comp], comp);
        }
      }
      for (const g of GROUPS) for (const item of g.items) {
        add(item.key, item.name, 'component'); add(item.key, t('nav.' + item.key) || '', 'component');
      }
      for (const g of GUIDE_GROUPS) for (const item of g.items) {
        add(item.key, item.name, 'guide'); add(item.key, t('nav.' + item.key) || '', 'guide');
      }
      setIndex(entries);
    }, 500);
  });

  const results = createMemo(() => {
    const term = q().toLowerCase().replace(/\s+/g, '');
    if (!term || term.length < 1) return [] as IndexEntry[];
    const idx = index();
    if (!idx.length) return [];
    const hits: IndexEntry[] = [];
    const s = new Set<string>();
    for (const h of idx) {
      if (hits.length >= 10) break;
      if (h.text.toLowerCase().replace(/\s+/g, '').includes(term) && !s.has(h.text)) {
        hits.push(h); s.add(h.text);
      }
    }
    return hits.sort((a, b) => {
      const aN = a.key === a.text ? 0 : 1, bN = b.key === b.text ? 0 : 1;
      if (aN !== bN) return aN - bN;
      return a.text.length - b.text.length;
    });
  });

  return (
    <div style={{ position: 'relative', width: '260px' }}>
      <style>{`
        .search-highlight{background:#fef08a;color:#854d0e}
        html.dark .search-highlight{background:#713f12;color:#fef08a}
        .search-dropdown{background:#fff;border:1px solid #e5e7eb;color:#323233;scrollbar-color:#d1d5db transparent;scrollbar-width:thin}
        html.dark .search-dropdown{background:#1e293b;border-color:#334155;color:#e2e8f0;scrollbar-color:#475569 transparent}
        .search-dropdown .search-hit{border-bottom:1px solid #f3f4f6}
        html.dark .search-dropdown .search-hit{border-bottom-color:#334155}
        .search-dropdown .search-hit:hover{background:var(--sc-color-primary-pale, #f0f5ff)}
        html.dark .search-dropdown .search-hit:hover{background:rgba(81,149,255,0.12)}
      `}</style>
      <Input
        placeholder={t('nav.searchComponents') || '搜索...'}
        value={q()}
        onChange={setQ}
        prefix={<Icon name="search" size={18} color="var(--sc-color-text-tertiary, #9ca3af)" />}
        size="md"
        height="38px"
        style={{ 'border-radius': '8px' }}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
      />
      <Show when={focused() && results().length > 0}>
        <div class="search-dropdown" style={{
          position: 'absolute', top: '100%', right: 0, 'z-index': 100, 'min-width': '320px',
          'border-radius': '8px', 'box-shadow': '0 4px 16px rgba(0,0,0,0.08)', 'max-height': '400px', 'overflow-y': 'auto',
        }}>
          <For each={results()}>
            {(hit) => (
              <div onClick={() => { props.onNavigate(hit.key); setQ(''); setFocused(false); }}
                class="search-hit" style={{ padding: '10px 14px', cursor: 'pointer', 'font-size': '0.9rem', display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }}
              >
                <span>{highlightText(hit.text, q())}</span>
                <span style={{ 'font-size': '0.75rem', color: '#9ca3af', 'margin-left': '12px', 'flex-shrink': 0 }}>{hit.category || ''}</span>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};
