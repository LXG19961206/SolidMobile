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

    // click the Shanghai row body
    const shanghaiRow = (Array.from(document.querySelectorAll('[class*="item"]')) as HTMLElement[])
      .find(el => el.textContent?.includes('Shanghai') && !!el.querySelector('[class*="itemExpand"]'))!;
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
});
