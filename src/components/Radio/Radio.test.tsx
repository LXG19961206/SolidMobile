import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Radio, RadioGroup } from './Radio';

describe('Radio', () => {
  it('renders with label', () => {
    render(() => <Radio value="a" label="选项 A" />);
    expect(screen.getByText('选项 A')).toBeDefined();
  });

  it('renders checked state when inside RadioGroup', () => {
    render(() => (
      <RadioGroup value="b">
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
        <Radio value="c" label="C" />
      </RadioGroup>
    ));
    const radios = document.querySelectorAll('[role="radio"]');
    expect(radios[1].getAttribute('aria-checked')).toBe('true');
    expect(radios[0].getAttribute('aria-checked')).toBe('false');
  });

  it('calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(() => (
      <RadioGroup onChange={onChange}>
        <Radio value="x" label="X" />
      </RadioGroup>
    ));
    fireEvent.click(screen.getByText('X'));
    expect(onChange).toHaveBeenCalledWith('x');
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(() => (
      <RadioGroup onChange={onChange}>
        <Radio value="x" label="X" disabled />
      </RadioGroup>
    ));
    fireEvent.click(screen.getByText('X'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('radio group disabled prevents all clicks', () => {
    const onChange = vi.fn();
    render(() => (
      <RadioGroup onChange={onChange} disabled>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>
    ));
    fireEvent.click(screen.getByText('A'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with label left', () => {
    const { container } = render(() => <Radio value="a" label="Left" labelPosition="left" />);
    const wrapper = container.querySelector('[class*="wrapper"]');
    expect(wrapper?.className).toContain('labelLeft');
  });

  it('horizontal direction applies flex row', () => {
    const { container } = render(() => (
      <RadioGroup direction="horizontal">
        <Radio value="a" />
        <Radio value="b" />
      </RadioGroup>
    ));
    const group = container.querySelector('[role="radiogroup"]') as HTMLElement;
    expect(group?.style.flexDirection).toBe('row');
  });

  it('controlled value updates checked state', async () => {
    const { container } = render(() => (
      <RadioGroup value="b">
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>
    ));
    const radios = container.querySelectorAll('[role="radio"]');
    expect(radios[0].getAttribute('aria-checked')).toBe('false');
    expect(radios[1].getAttribute('aria-checked')).toBe('true');
  });
});
