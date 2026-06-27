import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import { List } from './List';

interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
];

// Large dataset for virtual tests
const largeItems: Item[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

describe('List', () => {
  it('renders data mode (controlled)', () => {
    render(() => <List data={items}>{(item) => <span data-testid={`i${item.id}`}>{item.name}</span>}</List>);
    expect(screen.getByTestId('i1')).toBeDefined();
    expect(screen.getByTestId('i3')).toBeDefined();
    expect(screen.getByText('A')).toBeDefined();
  });

  it('renders empty state when data is empty', () => {
    render(() => <List data={[]}>{(item) => <span>{item.name}</span>}</List>);
    expect(screen.getByText('暂无数据')).toBeDefined();
  });

  it('renders custom empty string', () => {
    render(() => <List data={[]} empty="没有记录">{(item) => <span>{item.name}</span>}</List>);
    expect(screen.getByText('没有记录')).toBeDefined();
  });

  it('renders custom empty JSX', () => {
    render(() => (
      <List data={[]} empty={<span data-testid="custom-empty">自定义空</span>}>
        {(item) => <span>{item.name}</span>}
      </List>
    ));
    expect(screen.getByTestId('custom-empty')).toBeDefined();
  });

  it('does not show empty when data has items', () => {
    render(() => <List data={items}>{(item) => <span>{item.name}</span>}</List>);
    expect(screen.queryByText('暂无数据')).toBeNull();
  });

  it('renders children with correct index', () => {
    const indices: number[] = [];
    render(() => (
      <List data={items}>
        {(item, i) => { indices.push(i); return <span>{item.name}</span>; }}
      </List>
    ));
    expect(indices).toEqual([0, 1, 2]);
  });

  it('shows finished text in onLoad mode', async () => {
    render(() => (
      <List
        onLoad={async () => []}
        finished={true}
      >
        {(item: Item) => <span>{item.name}</span>}
      </List>
    ));
    // After load returns empty, finished text should appear
    expect(screen.getByText('暂无数据')).toBeDefined();
  });

  it('accepts custom class', () => {
    const { container } = render(() => (
      <List data={[]} class="my-list">{(item: any) => <span />}</List>
    ));
    expect(container.querySelector('.my-list')).not.toBeNull();
  });

  // ── Virtual list tests ──

  it('renders virtual list with spacer of correct total height', () => {
    const { container } = render(() => (
      <div style={{ height: '200px' }}>
        <List virtual itemHeight={40} data={largeItems}>
          {(item) => <div style={{ height: '40px' }}>{item.name}</div>}
        </List>
      </div>
    ));
    // Spacer should have height = 100 * 40 = 4000px
    const spacer = container.querySelector('[class*="virtualSpacer"]') as HTMLElement;
    expect(spacer).not.toBeNull();
    expect(spacer.style.height).toBe('4000px');
  });

  it('renders only visible subset in virtual mode', () => {
    const { container } = render(() => (
      <div style={{ height: '200px' }}>
        <List virtual itemHeight={40} data={largeItems}>
          {(item) => <span data-testid={`v-${item.id}`}>{item.name}</span>}
        </List>
      </div>
    ));
    // With container 200px / 40px per item = 5 + OVERSCAN(5) ≈ 10 items rendered
    const allRendered = container.querySelectorAll('[data-testid^="v-"]');
    expect(allRendered.length).toBeLessThan(largeItems.length);
    expect(allRendered.length).toBeGreaterThan(0);
  });

  it('renders all items when virtual=false (normal mode)', () => {
    const { container } = render(() => (
      <List data={largeItems}>
        {(item) => <span data-testid={`ni-${item.id}`}>{item.name}</span>}
      </List>
    ));
    const allRendered = container.querySelectorAll('[data-testid^="ni-"]');
    expect(allRendered.length).toBe(largeItems.length);
  });

  it('falls back to normal rendering without itemHeight', () => {
    const { container } = render(() => (
      <div style={{ height: '200px' }}>
        <List virtual data={largeItems}>
          {(item) => <span data-testid={`fb-${item.id}`}>{item.name}</span>}
        </List>
      </div>
    ));
    // Without itemHeight, should render all items (normal mode)
    const allRendered = container.querySelectorAll('[data-testid^="fb-"]');
    expect(allRendered.length).toBe(largeItems.length);
  });

  it('renders virtual empty list correctly', () => {
    render(() => (
      <List virtual itemHeight={40} data={[]}>
        {(item: Item) => <span>{item.name}</span>}
      </List>
    ));
    expect(screen.getByText('暂无数据')).toBeDefined();
  });
});
