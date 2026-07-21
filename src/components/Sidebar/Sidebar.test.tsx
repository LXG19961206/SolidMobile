import { describe, it, expect, vi } from 'vitest';
import { createSignal } from 'solid-js';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Sidebar } from './Sidebar';

const items = [
  { key: 'a', title: 'Item A' },
  { key: 'b', title: 'Item B' },
  { key: 'c', title: 'Item C', disabled: true },
];

describe('Sidebar', () => {
  it('renders all items', () => {
    const [active, setActive] = createSignal('a');
    render(() => <Sidebar items={items} activeKey={active()} onChange={setActive} />);
    expect(screen.getByText('Item A')).toBeDefined();
    expect(screen.getByText('Item B')).toBeDefined();
    expect(screen.getByText('Item C')).toBeDefined();
  });

  it('calls onChange when clicking an item', () => {
    const [active, setActive] = createSignal('a');
    const onChange = vi.fn();
    render(() => <Sidebar items={items} activeKey={active()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Item B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('does not call onChange for disabled items', () => {
    const [active, setActive] = createSignal('a');
    const onChange = vi.fn();
    render(() => <Sidebar items={items} activeKey={active()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Item C'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders icons when provided', () => {
    const itemsWithIcons = [
      { key: 'a', title: 'A', icon: <span data-testid="icon-a">★</span> },
    ];
    const [active, setActive] = createSignal('a');
    render(() => <Sidebar items={itemsWithIcons} activeKey={active()} onChange={setActive} />);
    expect(screen.getByTestId('icon-a')).toBeDefined();
  });

  it('compact mode hides labels, shows icons only', () => {
    const itemsWithIcons = [
      { key: 'a', title: 'A', icon: <span>★</span> },
      { key: 'b', title: 'B' },
    ];
    const [active, setActive] = createSignal('a');
    render(() => <Sidebar compact items={itemsWithIcons} activeKey={active()} onChange={setActive} />);
    // In compact mode, title text should not be visible
    expect(screen.queryByText('A')).toBeNull();
    expect(screen.queryByText('B')).toBeNull();
  });

  it('applies custom width', () => {
    const [active, setActive] = createSignal('a');
    const { container } = render(() => <Sidebar items={items} activeKey={active()} onChange={setActive} width={120} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.width).toBe('120px');
  });

  it('spreads rest props to root element', () => {
    const [active, setActive] = createSignal('a');
    render(() => <Sidebar items={items} activeKey={active()} onChange={setActive} data-testid="sidebar-root" />);
    expect(screen.getByTestId('sidebar-root')).toBeDefined();
  });
});
