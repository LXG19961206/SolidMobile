import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(() => <Textarea placeholder="请输入" />);
    expect(screen.getByPlaceholderText('请输入')).toBeDefined();
  });

  it('renders with defaultValue', () => {
    render(() => <Textarea defaultValue="hello" />);
    expect(screen.getByDisplayValue('hello')).toBeDefined();
  });

  it('calls onChange on input', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Textarea onChange={onChange} />);
    const el = container.querySelector('textarea')!;
    el.value = 'x';
    fireEvent.input(el);
    expect(onChange).toHaveBeenCalledWith('x');
  });

  it('shows character count', () => {
    render(() => <Textarea showCount maxlength={100} defaultValue="abc" />);
    expect(screen.getByText('3/100')).toBeDefined();
  });

  it('applies error class', () => {
    const { container } = render(() => <Textarea error />);
    expect(container.querySelector('[class*="error"]')).not.toBeNull();
  });

  it('applies disabled', () => {
    const { container } = render(() => <Textarea disabled />);
    expect(container.querySelector('textarea')!.disabled).toBe(true);
  });
});
