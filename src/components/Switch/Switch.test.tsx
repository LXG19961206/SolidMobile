import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@solidjs/testing-library';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders with default unchecked state', () => {
    const { container } = render(() => <Switch />);
    const sw = container.querySelector('button')!;
    expect(sw.getAttribute('aria-checked')).toBe('false');
    expect(sw.getAttribute('role')).toBe('switch');
  });

  it('renders checked when controlled', () => {
    const { container } = render(() => <Switch checked />);
    expect(container.querySelector('button')!.getAttribute('aria-checked')).toBe('true');
  });

  it('renders unchecked when defaultChecked is false', () => {
    const { container } = render(() => <Switch defaultChecked={false} />);
    expect(container.querySelector('button')!.getAttribute('aria-checked')).toBe('false');
  });

  it('renders checked when defaultChecked is true', () => {
    const { container } = render(() => <Switch defaultChecked />);
    expect(container.querySelector('button')!.getAttribute('aria-checked')).toBe('true');
  });

  it('toggles on click (uncontrolled)', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Switch onChange={onChange} />);
    const btn = container.querySelector('button')!;
    expect(btn.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-checked')).toBe('true');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange in controlled mode', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Switch checked={false} onChange={onChange} />);
    fireEvent.click(container.querySelector('button')!);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Switch disabled onChange={onChange} />);
    const btn = container.querySelector('button')!;
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-checked')).toBe('false');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('toggles on Space key', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Switch onChange={onChange} />);
    const btn = container.querySelector('button')!;
    fireEvent.keyDown(btn, { key: ' ' });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('toggles on Enter key', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Switch onChange={onChange} />);
    fireEvent.keyDown(container.querySelector('button')!, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('sets aria-disabled when disabled', () => {
    const { container } = render(() => <Switch disabled />);
    expect(container.querySelector('button')!.getAttribute('aria-disabled')).toBe('true');
  });

  it('applies custom size as number', () => {
    const { container } = render(() => <Switch size={40} />);
    const style = container.querySelector('button')!.getAttribute('style') || '';
    expect(style).toContain('40px');
  });

  it('applies custom size as string', () => {
    const { container } = render(() => <Switch size="2rem" />);
    const style = container.querySelector('button')!.getAttribute('style') || '';
    expect(style).toContain('2rem');
  });

  it('applies custom class', () => {
    const { container } = render(() => <Switch class="my-switch" />);
    expect(container.querySelector('button')!.className).toContain('my-switch');
  });

  it('accepts custom data attributes', () => {
    const { container } = render(() => <Switch data-testid="myswitch" />);
    expect(container.querySelector('[data-testid="myswitch"]')).not.toBeNull();
  });

  it('accepts value as alias for checked', () => {
    const { container } = render(() => <Switch value />);
    expect(container.querySelector('button')!.getAttribute('aria-checked')).toBe('true');
  });

  it('shows activeText when on', () => {
    const { container } = render(() => <Switch defaultChecked activeText="ON" inactiveText="OFF" />);
    expect(container.textContent).toContain('ON');
  });

  it('shows inactiveText when off', () => {
    const { container } = render(() => <Switch activeText="开" inactiveText="关" />);
    expect(container.textContent).toContain('关');
  });
});
