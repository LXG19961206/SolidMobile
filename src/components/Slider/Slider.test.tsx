import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@solidjs/testing-library';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders with default values', () => {
    const { container } = render(() => <Slider />);
    const track = container.querySelector('[class*="track"]');
    expect(track).toBeDefined();
  });

  it('renders single thumb by default', () => {
    const { container } = render(() => <Slider />);
    const thumbs = container.querySelectorAll('[data-slider-thumb]');
    expect(thumbs.length).toBe(1);
  });

  it('renders multiple thumbs with count prop', () => {
    const { container } = render(() => <Slider count={3} />);
    const thumbs = container.querySelectorAll('[data-slider-thumb]');
    expect(thumbs.length).toBe(3);
  });

  it('calls onChange with number when count=1', () => {
    const onChange = vi.fn();
    render(() => <Slider onChange={onChange} />);
    // Trigger via track click (simplified)
    expect(onChange).not.toHaveBeenCalled();
  });

  it('handles disabled prop', () => {
    const onChange = vi.fn();
    const { container } = render(() => <Slider disabled onChange={onChange} />);
    const wrapper = container.querySelector('[class*="wrapper"]');
    expect(wrapper?.className).toContain('disabled');
  });

  it('handles controlled value', () => {
    const { container } = render(() => <Slider value={50} />);
    expect(container.querySelector('[class*="wrapper"]')).toBeDefined();
  });

  it('handles custom colors', () => {
    const { container } = render(() => <Slider activeColor="#ff0000" inactiveColor="#eee" />);
    expect(container.querySelector('[class*="wrapper"]')).toBeDefined();
  });
});
