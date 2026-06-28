import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@solidjs/testing-library';
import { Stepper } from './Stepper';

describe('Stepper', () => {
  it('renders with default value', () => {
    const { container } = render(() => <Stepper defaultValue={5} />);
    const input = container.querySelector('input')!;
    expect(input.value).toBe('5');
  });

  it('renders minus and plus buttons', () => {
    const { container } = render(() => <Stepper />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  it('decrements on minus click', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Stepper defaultValue={5} onChange={onChange} />);
    const buttons = container.querySelectorAll('button');
    fireEvent.click(buttons[0]); // minus
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('increments on plus click', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Stepper defaultValue={5} onChange={onChange} />);
    const buttons = container.querySelectorAll('button');
    fireEvent.click(buttons[1]); // plus
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('respects min bound', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Stepper defaultValue={1} min={1} onChange={onChange} />);
    const buttons = container.querySelectorAll('button');
    fireEvent.click(buttons[0]); // minus
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respects max bound', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Stepper defaultValue={10} max={10} onChange={onChange} />);
    const buttons = container.querySelectorAll('button');
    fireEvent.click(buttons[1]); // plus
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not respond when disabled', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Stepper defaultValue={5} disabled onChange={onChange} />);
    const buttons = container.querySelectorAll('button');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('handles controlled value', () => {
    const { container } = render(() => <Stepper value={8} />);
    const input = container.querySelector('input')!;
    expect(input.value).toBe('8');
  });
});
