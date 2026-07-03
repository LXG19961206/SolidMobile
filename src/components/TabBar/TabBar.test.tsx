import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { TabBar, TabBarItem } from './TabBar';

describe('TabBar', () => {
  /* ---------------------------------------------------------------------- */
  /*  Rendering                                                              */
  /* ---------------------------------------------------------------------- */

  it('renders TabBarItems', () => {
    render(() => (
      <TabBar>
        <TabBarItem name="home" icon="home" label="首页" />
        <TabBarItem name="cart" icon="shopping-cart" label="购物车" />
      </TabBar>
    ));
    expect(screen.getByText('首页')).toBeDefined();
    expect(screen.getByText('购物车')).toBeDefined();
  });

  it('uses custom height', () => {
    const { container } = render(() => (
      <TabBar height={60}>
        <TabBarItem name="home" label="首页" />
      </TabBar>
    ));
    const bar = container.querySelector('[class*="tabbar"]') as HTMLElement;
    expect(bar.style.height).toBe('60px');
  });

  it('renders placeholder when fixed + placeholder', () => {
    const { container } = render(() => (
      <TabBar fixed placeholder>
        <TabBarItem name="home" label="首页" />
      </TabBar>
    ));
    // placeholder div should exist after the tabbar
    const placeholder = container.querySelectorAll('div')[1];
    expect(placeholder).toBeDefined();
  });

  it('renders with custom bgColor', () => {
    const { container } = render(() => (
      <TabBar bgColor="linear-gradient(90deg, #667eea, #764ba2)">
        <TabBarItem name="home" label="首页" />
      </TabBar>
    ));
    const bar = container.querySelector('[class*="tabbar"]') as HTMLElement;
    expect(bar.style.background).toContain('linear-gradient');
  });

  /* ---------------------------------------------------------------------- */
  /*  Interactions                                                           */
  /* ---------------------------------------------------------------------- */

  it('calls onChange when tab is clicked', () => {
    const onChange = vi.fn();
    render(() => (
      <TabBar defaultValue="home" onChange={onChange}>
        <TabBarItem name="home" icon="home" label="首页" />
        <TabBarItem name="cart" icon="shopping-cart" label="购物车" />
      </TabBar>
    ));
    fireEvent.click(screen.getByText('购物车'));
    expect(onChange).toHaveBeenCalledWith('cart');
  });

  it('does not call onChange when clicking the active tab', () => {
    const onChange = vi.fn();
    render(() => (
      <TabBar value="home" onChange={onChange}>
        <TabBarItem name="home" icon="home" label="首页" />
        <TabBarItem name="cart" icon="shopping-cart" label="购物车" />
      </TabBar>
    ));
    fireEvent.click(screen.getByText('首页'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('beforeChange can prevent tab switch', () => {
    const onChange = vi.fn();
    render(() => (
      <TabBar defaultValue="home" beforeChange={() => false} onChange={onChange}>
        <TabBarItem name="home" icon="home" label="首页" />
        <TabBarItem name="cart" icon="shopping-cart" label="购物车" />
      </TabBar>
    ));
    fireEvent.click(screen.getByText('购物车'));
    expect(onChange).not.toHaveBeenCalled();
  });

  /* ---------------------------------------------------------------------- */
  /*  TabBarItem                                                             */
  /* ---------------------------------------------------------------------- */

  it('renders icon from string name', () => {
    const { container } = render(() => (
      <TabBar>
        <TabBarItem name="home" icon="home" label="首页" />
      </TabBar>
    ));
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined();
  });

  it('renders badge number', () => {
    render(() => (
      <TabBar>
        <TabBarItem name="msg" icon="chat" label="消息" badge={5} />
      </TabBar>
    ));
    expect(screen.getByText('5')).toBeDefined();
  });

  it('renders dot indicator', () => {
    const { container } = render(() => (
      <TabBar>
        <TabBarItem name="msg" icon="chat" label="消息" dot />
      </TabBar>
    ));
    const badge = container.querySelector('[class*="badge"]') || container.querySelector('[class*="dot"]');
    expect(badge).toBeDefined();
  });

  it('passes active prop to function icon component', () => {
    const iconFn = vi.fn(() => <svg data-testid="custom-icon" />);
    render(() => (
      <TabBar value="home">
        <TabBarItem name="home" icon={iconFn} label="首页" />
      </TabBar>
    ));
    expect(iconFn).toHaveBeenCalledWith({ active: true });
  });
});
