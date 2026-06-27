import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@solidjs/testing-library';
import { Tabs, Tab } from './Tabs';

describe('Tabs', () => {
  it('renders tab titles', () => {
    render(() => (
      <Tabs>
        <Tab title="标签1" name="a">A</Tab>
        <Tab title="标签2" name="b">B</Tab>
      </Tabs>
    ));
    expect(screen.getByText('标签1')).toBeDefined();
    expect(screen.getByText('标签2')).toBeDefined();
  });

  it('renders active tab content', () => {
    render(() => (
      <Tabs defaultActive="a">
        <Tab title="A" name="a"><span data-testid="ca">Content A</span></Tab>
        <Tab title="B" name="b"><span data-testid="cb">Content B</span></Tab>
      </Tabs>
    ));
    expect(screen.getByTestId('ca')).toBeDefined();
  });

  it('switches tab on click', async () => {
    render(() => (
      <Tabs>
        <Tab title="A" name="a"><span data-testid="ca">A</span></Tab>
        <Tab title="B" name="b"><span data-testid="cb">B</span></Tab>
      </Tabs>
    ));
    fireEvent.click(screen.getByText('B'));
    expect(screen.getByTestId('cb')).toBeDefined();
  });

  it('fires onChange callback', () => {
    const fn = vi.fn();
    render(() => (
      <Tabs onChange={fn}>
        <Tab title="A" name="a">A</Tab>
        <Tab title="B" name="b">B</Tab>
      </Tabs>
    ));
    fireEvent.click(screen.getByText('B'));
    expect(fn).toHaveBeenCalledWith('b');
  });

  it('controlled active prop works', () => {
    const { container } = render(() => (
      <Tabs active="b">
        <Tab title="A" name="a">A</Tab>
        <Tab title="B" name="b"><span data-testid="cb">B</span></Tab>
      </Tabs>
    ));
    expect(screen.getByTestId('cb')).toBeDefined();
  });

  it('does not switch to disabled tab', () => {
    const fn = vi.fn();
    render(() => (
      <Tabs defaultActive="a" onChange={fn}>
        <Tab title="A" name="a">A</Tab>
        <Tab title="B" name="b" disabled>B</Tab>
      </Tabs>
    ));
    fireEvent.click(screen.getByText('B'));
    expect(fn).not.toHaveBeenCalled();
  });

  it('lazy renders only active tab', () => {
    render(() => (
      <Tabs defaultActive="a">
        <Tab title="A" name="a"><span data-testid="ca">A</span></Tab>
        <Tab title="B" name="b"><span data-testid="cb">B</span></Tab>
      </Tabs>
    ));
    expect(screen.queryByTestId('cb')).toBeNull();
  });

  it('renders JSX title', () => {
    render(() => (
      <Tabs>
        <Tab title={<span data-testid="jsx-title">🔔 通知</span>} name="a">A</Tab>
      </Tabs>
    ));
    expect(screen.getByTestId('jsx-title')).toBeDefined();
  });
});
