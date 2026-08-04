import { describe, it, expect, vi } from 'vitest';
import { render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { TreeSelect } from './TreeSelect';
import type { TreeSelectOption } from './types';

const opts = [
  { label: 'East', value: 'east', children: [
    { label: 'Shanghai', value: 'sh' },
    { label: 'Zhejiang', value: 'zj' },
  ]},
  { label: 'West', value: 'west', children: [
    { label: 'Sichuan', value: 'sc' },
  ]},
];

const tick = () => new Promise(r => setTimeout(r, 20));

/* dispatch a synthetic pointer event (happy-dom lacks PointerEvent) */
const dispatchPointer = (el: HTMLElement, type: string, init: Record<string, unknown> = {}) => {
  const evt = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(evt, init);
  el.dispatchEvent(evt);
};

/* simulate a horizontal swipe (left or right) on a row */
const swipeRow = (el: HTMLElement, dir: 'left' | 'right') => {
  const startX = dir === 'left' ? 200 : 40;
  const endX = dir === 'left' ? 40 : 200;
  dispatchPointer(el, 'pointerdown', { clientX: startX, clientY: 100, pointerType: 'touch', button: 0 });
  dispatchPointer(el, 'pointermove', { clientX: startX + (dir === 'left' ? -20 : 20), clientY: 102, pointerType: 'touch' });
  dispatchPointer(el, 'pointermove', { clientX: endX, clientY: 104, pointerType: 'touch' });
  dispatchPointer(el, 'pointerup', { pointerType: 'touch' });
};

/* find any row div (leaf or parent) by its label */
const findItem = (text: string) =>
  (Array.from(document.querySelectorAll('[class*="item"]')) as HTMLElement[])
    .find(el => el.textContent?.includes(text) && !!el.querySelector('[class*="itemBody"]'))!;

describe('TreeSelect', () => {
  it('renders placeholder when no value', () => {
    render(() => <TreeSelect options={opts} placeholder="Pick" />);
    expect(document.body.textContent).toContain('Pick');
  });

  it('renders selected count', () => {
    render(() => <TreeSelect options={opts} value={['sh', 'zj']} />);
    expect(document.body.textContent).toContain('2');
  });

  it('opens overlay on click', async () => {
    const { container } = render(() => <TreeSelect options={opts} />);
    const trigger = container.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    // overlay content should appear
    await new Promise(r => setTimeout(r, 50));
    expect(document.querySelector('[class*="content"]')).not.toBeNull();
  });

  it('renders options with expand arrows for parents', async () => {
    const { container } = render(() => <TreeSelect options={opts} />);
    const trigger = container.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await new Promise(r => setTimeout(r, 50));
    expect(document.body.textContent).toContain('East');
    expect(document.body.textContent).toContain('West');
    // parent nodes have expand zone
    expect(document.querySelectorAll('[class*="itemExpand"]').length).toBeGreaterThan(0);
  });

  it('shows select all option', async () => {
    const { container } = render(() => <TreeSelect options={opts} />);
    const trigger = container.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await new Promise(r => setTimeout(r, 50));
    expect(document.body.textContent).toContain('Select All');
  });

  it('toggles leaf selection when clicking anywhere on the row', async () => {
    const [val, setVal] = createSignal<(string | number)[]>([]);
    render(() => <TreeSelect options={opts} value={val()} onChange={setVal} />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await new Promise(r => setTimeout(r, 50));

    // a row is the .item div that also contains an expand zone
    const findRow = (text: string) =>
      (Array.from(document.querySelectorAll('[class*="item"]')) as HTMLElement[])
        .find(el => el.textContent?.includes(text) && !!el.querySelector('[class*="itemExpand"]'))!;

    // clicking the parent row selects all its leaves
    const eastRow = findRow('East');
    eastRow.click();
    await new Promise(r => setTimeout(r, 50));
    expect([...val()].sort()).toEqual(['sh', 'zj']);

    // clicking again deselects
    eastRow.click();
    await new Promise(r => setTimeout(r, 50));
    expect(val()).toEqual([]);
  });

  it('selects a leaf row after navigating into a parent', async () => {
    const [val, setVal] = createSignal<(string | number)[]>([]);
    render(() => <TreeSelect options={opts} value={val()} onChange={setVal} />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await new Promise(r => setTimeout(r, 50));

    const findRow = (text: string) =>
      (Array.from(document.querySelectorAll('[class*="item"]')) as HTMLElement[])
        .find(el => el.textContent?.includes(text) && !!el.querySelector('[class*="itemExpand"]'))!;

    // navigate into East via its arrow
    (findRow('East').querySelector('[class*="itemExpand"]') as HTMLElement).click();
    await new Promise(r => setTimeout(r, 50));
    expect(document.body.textContent).toContain('Shanghai');

    // click the Shanghai row body (a leaf — no expand arrow, so findItem not findRow)
    const shanghaiRow = findItem('Shanghai');
    shanghaiRow.click();
    await new Promise(r => setTimeout(r, 50));
    expect(val()).toEqual(['sh']);
  });

  it('row click does not double-toggle when clicking the expand checkbox', async () => {
    const [val, setVal] = createSignal<(string | number)[]>([]);
    render(() => <TreeSelect options={opts} mode="expand" value={val()} onChange={setVal} />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await new Promise(r => setTimeout(r, 50));

    // click the checkbox inside the East row's expand zone (should toggle once, not navigate)
    const eastRow = (Array.from(document.querySelectorAll('[class*="item"]')) as HTMLElement[])
      .find(el => el.textContent?.includes('East') && !!el.querySelector('[class*="itemExpand"]'))!;
    (eastRow.querySelector('[role="checkbox"]') as HTMLElement).click();
    await new Promise(r => setTimeout(r, 50));
    expect([...val()].sort()).toEqual(['sh', 'zj']);
    // and the picker should NOT have navigated into children (still showing East/West)
    expect(document.body.textContent).toContain('East');
    expect(document.body.textContent).toContain('West');
  });

  it('loads children asynchronously on expand', async () => {
    const [val, setVal] = createSignal<(string | number)[]>([]);
    let resolveChildren!: (c: TreeSelectOption[]) => void;
    const loadFn = vi.fn((_opt: TreeSelectOption) =>
      new Promise<TreeSelectOption[]>(r => { resolveChildren = r; }),
    );
    render(() => (
      <TreeSelect options={[{ label: 'Root', value: 'root' }]} value={val()} onChange={setVal} onLoadChildren={loadFn} />
    ));
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();

    // Root has no children but is expandable via onLoadChildren → shows an expand zone
    const rootRow = (Array.from(document.querySelectorAll('[class*="item"]')) as HTMLElement[])
      .find(el => el.textContent?.includes('Root') && !!el.querySelector('[class*="itemExpand"]'))!;
    (rootRow.querySelector('[class*="itemExpand"]') as HTMLElement).click();
    await tick();

    // loading indicator visible, children not yet present
    expect(document.querySelector('[role="status"]')).not.toBeNull();
    expect(document.body.textContent).not.toContain('Child');

    resolveChildren([{ label: 'Child', value: 'child' }]);
    await tick();
    await tick();
    expect(loadFn).toHaveBeenCalled();
    expect(document.body.textContent).toContain('Child');
  });

  it('shows remote search results from onSearch', async () => {
    const [val, setVal] = createSignal<(string | number)[]>([]);
    const onSearch = vi.fn((kw: string) => Promise.resolve([{ label: `R-${kw}`, value: kw }]));
    render(() => <TreeSelect options={opts} value={val()} onChange={setVal} searchable onSearch={onSearch} />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();

    const input = document.querySelector('[class*="searchInput"]') as HTMLInputElement;
    input.value = 'x';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await tick();
    await tick();

    expect(onSearch).toHaveBeenCalledWith('x', opts);
    expect(document.body.textContent).toContain('R-x');
  });

  it('uses localized search placeholder', async () => {
    render(() => <TreeSelect options={opts} searchable />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();
    const input = document.querySelector('[class*="searchInput"]') as HTMLInputElement;
    expect(input.placeholder).toBe('Search');
  });

  it('opens when show is controlled true', async () => {
    render(() => <TreeSelect options={opts} show />);
    await tick();
    expect(document.querySelector('[class*="content"]')).not.toBeNull();
  });

  it('renders close button and fires onClose', async () => {
    let closed = false;
    render(() => <TreeSelect options={opts} closeable onClose={() => (closed = true)} />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();

    const closeBtn = document.querySelector('[class*="headerClose"]') as HTMLElement;
    expect(closeBtn).not.toBeNull();
    closeBtn.click();
    await new Promise(r => setTimeout(r, 250)); // closeSheet unmounts after 200ms
    expect(closed).toBe(true);
    expect(document.querySelector('[class*="content"]')).toBeNull();
  });

  it('applies zIndex to the overlay', async () => {
    render(() => <TreeSelect options={opts} show zIndex={9999} />);
    await tick();
    const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
    expect(overlay.style.zIndex).toBe('9999');
  });

  it('renders custom rows via renderItem and toggles selection with the toggle callback', async () => {
    const [val, setVal] = createSignal<(string | number)[]>([]);
    render(() => (
      <TreeSelect
        options={opts}
        value={val()}
        onChange={setVal}
        renderItem={(node, selected, _expand, toggle) => (
          <div data-custom-row={node.value}>
            <span>{selected ? '✓' : '·'} {node.label}</span>
            <button onClick={() => toggle?.()}>t</button>
          </div>
        )}
      />
    ));
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();

    // custom rows render with the marker instead of the default .item layout
    const eastCustom = document.querySelector('[data-custom-row="east"]') as HTMLElement;
    expect(eastCustom).not.toBeNull();

    // clicking the row body toggles the parent node's leaves
    (eastCustom.querySelector('button') as HTMLElement).click();
    await tick();
    expect([...val()].sort()).toEqual(['sh', 'zj']);
  });

  it('caps global search results on a big tree at 100 rows', async () => {
    const [val, setVal] = createSignal<(string | number)[]>([]);
    const big = Array.from({ length: 30 }, (_, i) => ({
      label: `Region ${String.fromCharCode(65 + i)}`,
      value: `r${i}`,
      children: Array.from({ length: 60 }, (_, j) => ({
        label: `City ${String.fromCharCode(65 + i)}-${j + 1}`,
        value: `c${i}-${j + 1}`,
      })),
    }));
    render(() => (
      <TreeSelect options={big} value={val()} onChange={setVal} searchable searchMode="global" />
    ));
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();

    // "city" matches all 1,800 children — results must be capped
    const input = document.querySelector('[class*="searchInput"]') as HTMLInputElement;
    input.value = 'city';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await tick();
    await tick();

    // count only row divs (they contain an itemBody), not itemBody/itemLabel spans
    const rows = (Array.from(document.querySelectorAll('[class*="item"]')) as HTMLElement[]).filter(el =>
      !!el.querySelector('[class*="itemBody"]') && el.textContent?.includes('City'));
    expect(rows.length).toBe(100);
  });

  it('hides the expand arrow on leaf rows in select mode', async () => {
    render(() => <TreeSelect options={opts} />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();

    // parent rows keep the expand arrow
    expect(findItem('East').querySelector('[class*="itemExpand"]')).not.toBeNull();

    // navigate into East → the leaf rows (Shanghai/Zhejiang) have no arrow
    (findItem('East').querySelector('[class*="itemExpand"]') as HTMLElement).click();
    await tick();
    expect(findItem('Shanghai').querySelector('[class*="itemExpand"]')).toBeNull();
    expect(findItem('Zhejiang').querySelector('[class*="itemExpand"]')).toBeNull();
  });

  it('renders the breadcrumb as a scrollable Tabs nav', async () => {
    render(() => <TreeSelect options={opts} />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();

    // root level → nav is hidden (nothing to navigate back to)
    let titles = Array.from(document.querySelectorAll('[class*="tabTitle"]')) as HTMLElement[];
    expect(titles.length).toBe(0);

    // navigate into East → breadcrumb appears with an "All" + "East" segment
    (findItem('East').querySelector('[class*="itemExpand"]') as HTMLElement).click();
    await tick();
    titles = Array.from(document.querySelectorAll('[class*="tabTitle"]')) as HTMLElement[];
    expect(titles.map(t => t.textContent).join(' ')).toContain('All');
    expect(titles.map(t => t.textContent).join(' ')).toContain('East');

    // clicking the "All" tab pops back to root, the nav hides again, no stale tabs
    const allTab = titles.find(t => t.textContent?.trim() === 'All') as HTMLElement;
    allTab.click();
    await tick();
    titles = Array.from(document.querySelectorAll('[class*="tabTitle"]')) as HTMLElement[];
    expect(titles.length).toBe(0);
    expect(document.body.textContent).toContain('West');
  });

  it('swipe left on a parent enters its children without selecting', async () => {
    const [val, setVal] = createSignal<(string | number)[]>([]);
    render(() => <TreeSelect options={opts} value={val()} onChange={setVal} swipeable />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();

    swipeRow(findItem('East'), 'left');
    await tick();

    // navigated into East's children
    expect(document.body.textContent).toContain('Shanghai');
    expect(document.body.textContent).not.toContain('West');
    // and no selection happened
    expect(val()).toEqual([]);
  });

  it('swipe left on a leaf does nothing and suppresses the tap click', async () => {
    const [val, setVal] = createSignal<(string | number)[]>([]);
    render(() => <TreeSelect options={opts} value={val()} onChange={setVal} swipeable />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();

    // go into East first so we have a leaf row
    (findItem('East').querySelector('[class*="itemExpand"]') as HTMLElement).click();
    await tick();

    swipeRow(findItem('Shanghai'), 'left');
    findItem('Shanghai').click(); // the tap that follows a swipe must be suppressed
    await tick();

    expect(val()).toEqual([]);
    expect(document.body.textContent).toContain('Shanghai'); // no navigation
  });

  it('swipe right goes back a level', async () => {
    render(() => <TreeSelect options={opts} swipeable />);
    const trigger = document.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await tick();

    (findItem('East').querySelector('[class*="itemExpand"]') as HTMLElement).click();
    await tick();
    expect(document.body.textContent).toContain('Shanghai');

    swipeRow(findItem('Shanghai'), 'right');
    await tick();

    expect(document.body.textContent).not.toContain('Shanghai');
    expect(document.body.textContent).toContain('West');
  });
});
