import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Checkbox, CheckboxGroup } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(() => <Checkbox value="a" label="选项 A" />);
    expect(screen.getByText('选项 A')).toBeDefined();
  });

  it('renders checked state', () => {
    render(() => <Checkbox value="a" label="A" checked />);
    const el = document.querySelector('[role="checkbox"]');
    expect(el?.getAttribute('aria-checked')).toBe('true');
  });

  it('renders unchecked state', () => {
    render(() => <Checkbox value="a" label="A" />);
    const el = document.querySelector('[role="checkbox"]');
    expect(el?.getAttribute('aria-checked')).toBe('false');
  });

  it('renders indeterminate state', () => {
    render(() => <Checkbox value="a" label="A" indeterminate />);
    const el = document.querySelector('[role="checkbox"]');
    expect(el?.getAttribute('aria-checked')).toBe('mixed');
  });

  it('calls onChange when clicked (standalone uncontrolled)', () => {
    const onChange = vi.fn();
    render(() => <Checkbox value="x" label="X" onChange={onChange} />);
    fireEvent.click(screen.getByText('X'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(() => <Checkbox value="x" label="X" disabled onChange={onChange} />);
    fireEvent.click(screen.getByText('X'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with label left', () => {
    const { container } = render(() => <Checkbox value="a" label="Left" labelPosition="left" />);
    const wrapper = container.querySelector('[class*="wrapper"]');
    expect(wrapper?.className).toContain('labelLeft');
  });

  it('renders with defaultChecked', () => {
    render(() => <Checkbox value="a" label="A" defaultChecked />);
    const el = document.querySelector('[role="checkbox"]');
    expect(el?.getAttribute('aria-checked')).toBe('true');
  });

  it('toggles from defaultChecked on click', () => {
    const { container } = render(() => <Checkbox value="a" label="A" defaultChecked />);
    const el = container.querySelector('[role="checkbox"]')!;
    fireEvent.click(el);
    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('controlled checked does not toggle internal state', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Checkbox value="a" label="A" checked onChange={onChange} />);
    const el = container.querySelector('[role="checkbox"]')!;
    fireEvent.click(el);
    // checked is controlled, so aria shouldn't change without re-render
    expect(el.getAttribute('aria-checked')).toBe('true');
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('checkbox group disabled prevents all clicks', () => {
    const onChange = vi.fn();
    render(() => (
      <CheckboxGroup onChange={onChange} disabled>
        <Checkbox value="a" label="A" />
        <Checkbox value="b" label="B" />
      </CheckboxGroup>
    ));
    fireEvent.click(screen.getByText('A'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('CheckboxGroup', () => {
  it('renders children', () => {
    render(() => (
      <CheckboxGroup>
        <Checkbox value="a" label="A" />
        <Checkbox value="b" label="B" />
      </CheckboxGroup>
    ));
    expect(screen.getByText('A')).toBeDefined();
    expect(screen.getByText('B')).toBeDefined();
  });

  it('initializes with defaultValue', () => {
    const { container } = render(() => (
      <CheckboxGroup defaultValue={['a', 'c']}>
        <Checkbox value="a" label="A" />
        <Checkbox value="b" label="B" />
        <Checkbox value="c" label="C" />
      </CheckboxGroup>
    ));
    const radios = container.querySelectorAll('[role="checkbox"]');
    expect(radios[0].getAttribute('aria-checked')).toBe('true');
    expect(radios[1].getAttribute('aria-checked')).toBe('false');
    expect(radios[2].getAttribute('aria-checked')).toBe('true');
  });

  it('calls onChange with full array when toggled', () => {
    const onChange = vi.fn();
    render(() => (
      <CheckboxGroup onChange={onChange}>
        <Checkbox value="a" label="A" />
        <Checkbox value="b" label="B" />
      </CheckboxGroup>
    ));
    fireEvent.click(screen.getByText('A'));
    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('respects max prop', () => {
    const onChange = vi.fn();
    render(() => (
      <CheckboxGroup max={2} defaultValue={['a', 'b']} onChange={onChange}>
        <Checkbox value="a" label="A" />
        <Checkbox value="b" label="B" />
        <Checkbox value="c" label="C" />
      </CheckboxGroup>
    ));
    // Try to check a third item
    fireEvent.click(screen.getByText('C'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respects min prop', () => {
    const onChange = vi.fn();
    render(() => (
      <CheckboxGroup min={1} defaultValue={['a']} onChange={onChange}>
        <Checkbox value="a" label="A" />
        <Checkbox value="b" label="B" />
      </CheckboxGroup>
    ));
    // Try to uncheck the only checked item
    fireEvent.click(screen.getByText('A'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('horizontal direction applies flex row', () => {
    const { container } = render(() => (
      <CheckboxGroup direction="horizontal">
        <Checkbox value="a" />
        <Checkbox value="b" />
      </CheckboxGroup>
    ));
    const group = container.querySelector('[role="group"]') as HTMLElement;
    expect(group?.style.flexDirection).toBe('row');
  });
});
