import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Input } from './Input';

describe('Input', () => {
  /* ── Rendering ── */
  it('renders an input element', () => {
    render(() => <Input placeholder="请输入" />);
    expect(screen.getByPlaceholderText('请输入')).toBeDefined();
  });

  it('renders with defaultValue', () => {
    render(() => <Input defaultValue="hello" />);
    expect(screen.getByDisplayValue('hello')).toBeDefined();
  });

  it('renders controlled value', () => {
    render(() => <Input value="world" />);
    expect(screen.getByDisplayValue('world')).toBeDefined();
  });

  it('applies disabled state', () => {
    const { container } = render(() => <Input disabled />);
    const input = container.querySelector('input')!;
    expect(input.disabled).toBe(true);
  });

  it('applies readonly state', () => {
    const { container } = render(() => <Input readonly />);
    const input = container.querySelector('input')!;
    expect(input.readOnly).toBe(true);
  });

  /* ── onInput callback ── */
  it('calls onChange on input', () => {
    const onChange = vi.fn();
    render(() => <Input onChange={onChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    input.value = 'a';
    fireEvent.input(input);
    expect(onChange).toHaveBeenCalledWith('a');
  });

  /* ── Number filtering ── */
  it('filters non-numeric chars in number mode', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);
    const input = container.querySelector('input')! as HTMLInputElement;
    // Simulate typing "abc123"
    input.value = 'abc123';
    fireEvent.input(input);
    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('allows decimal point in number mode', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);
    const input = container.querySelector('input')! as HTMLInputElement;
    input.value = '12.5';
    fireEvent.input(input);
    expect(onChange).toHaveBeenCalledWith('12.5');
  });

  it('filters second decimal point in number mode', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Input type="number" onChange={onChange} />);
    const input = container.querySelector('input')! as HTMLInputElement;
    input.value = '12.5.3';
    fireEvent.input(input);
    expect(onChange).toHaveBeenCalledWith('12.53');
  });

  /* ── maxlength ── */
  it('truncates number input over maxlength', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Input type="number" maxlength={3} onChange={onChange} />);
    const input = container.querySelector('input')! as HTMLInputElement;
    input.value = '12345';
    fireEvent.input(input);
    expect(onChange).toHaveBeenCalledWith('123');
  });

  /* ── Clear ── */
  it('shows clear button when clearable and has value', () => {
    render(() => <Input clearable defaultValue="text" />);
    // The clear button renders an Icon with name="close"
    const btn = document.querySelector('[class*="clear"]');
    expect(btn).not.toBeNull();
  });

  it('does not show clear button when empty', () => {
    const { container } = render(() => <Input clearable />);
    const btn = container.querySelector('[class*="clear"]');
    expect(btn).toBeNull();
  });

  it('calls onChange with empty string on clear', () => {
    const onChange = vi.fn();
    render(() => <Input clearable defaultValue="text" onChange={onChange} />);
    const btn = document.querySelector('[class*="clear"]')!;
    fireEvent.click(btn);
    expect(onChange).toHaveBeenCalledWith('');
  });

  /* ── Password toggle ── */
  it('shows toggle when type=password and showPasswordToggle', () => {
    const { container } = render(() => <Input type="password" showPasswordToggle />);
    const toggle = container.querySelector('[class*="toggle"]');
    expect(toggle).not.toBeNull();
  });

  it('toggles password visibility', () => {
    const { container } = render(() => <Input type="password" showPasswordToggle />);
    const input = container.querySelector('input')!;
    expect(input.type).toBe('password');
    const toggle = container.querySelector('[class*="toggle"]')!;
    fireEvent.click(toggle);
    expect(input.type).toBe('text');
    fireEvent.click(toggle);
    expect(input.type).toBe('password');
  });

  /* ── Events ── */
  it('calls onBlur', () => {
    const onBlur = vi.fn();
    const { container } = render(() => <Input onBlur={onBlur} />);
    fireEvent.blur(container.querySelector('input')!);
    expect(onBlur).toHaveBeenCalled();
  });

  it('calls onFocus', () => {
    const onFocus = vi.fn();
    const { container } = render(() => <Input onFocus={onFocus} />);
    fireEvent.focus(container.querySelector('input')!);
    expect(onFocus).toHaveBeenCalled();
  });

  it('calls onEnter on Enter key', () => {
    const onEnter = vi.fn();
    const { container } = render(() => <Input onEnter={onEnter} />);
    fireEvent.keyDown(container.querySelector('input')!, { key: 'Enter' });
    expect(onEnter).toHaveBeenCalled();
  });

  /* ── Count ── */
  it('shows character count', () => {
    render(() => <Input showCount maxlength={10} defaultValue="abc" />);
    expect(screen.getByText('3/10')).toBeDefined();
  });

  /* ── Prefix / Suffix ── */
  it('renders prefix', () => {
    render(() => <Input prefix={<span data-testid="pfx">@</span>} />);
    expect(screen.getByTestId('pfx')).toBeDefined();
  });

  it('renders suffix', () => {
    render(() => <Input suffix={<span data-testid="sfx">.com</span>} />);
    expect(screen.getByTestId('sfx')).toBeDefined();
  });

  /* ── Error ── */
  it('applies error class', () => {
    const { container } = render(() => <Input error />);
    expect(container.querySelector('[class*="error"]')).not.toBeNull();
  });
});
