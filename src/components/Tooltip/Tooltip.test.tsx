import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@solidjs/testing-library';
import { Tooltip } from './Tooltip';

// Make requestAnimationFrame fire via setTimeout so waitFor can catch it
const origRAF = globalThis.requestAnimationFrame;
const origCAF = globalThis.cancelAnimationFrame;

beforeAll(() => {
  let id = 0;
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
    id++;
    setTimeout(() => cb(performance.now()), 0);
    return id;
  };
  globalThis.cancelAnimationFrame = () => {};
});

afterAll(() => {
  globalThis.requestAnimationFrame = origRAF;
  globalThis.cancelAnimationFrame = origCAF;
});

/** Return the trigger wrapper span (parent of the button text node) */
const wrapperOf = (el: Element) => el.parentElement as HTMLElement;

describe('Tooltip', () => {
  it('renders children', () => {
    render(() => (
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>
    ));
    expect(screen.getByText('Hover me')).toBeDefined();
  });

  it('shows content on hover', async () => {
    render(() => (
      <Tooltip content="Help text" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    ));

    // mouseEnter must fire on the wrapper span (doesn't bubble)
    const btn = screen.getByText('Hover me');
    fireEvent.mouseEnter(wrapperOf(btn));

    await waitFor(() => {
      expect(screen.getByText('Help text')).toBeDefined();
    }, { timeout: 3000 });
  });

  it('hides on mouse leave', async () => {
    render(() => (
      <Tooltip content="Help text" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    ));

    const btn = screen.getByText('Hover me');
    const wrapper = wrapperOf(btn);
    fireEvent.mouseEnter(wrapper);

    await waitFor(() => {
      expect(screen.getByText('Help text')).toBeDefined();
    });

    fireEvent.mouseLeave(wrapper);

    await waitFor(() => {
      expect(screen.queryByText('Help text')).toBeNull();
    }, { timeout: 3000 });
  });

  it('respects showArrow={false}', async () => {
    render(() => (
      <Tooltip content="No arrow" delay={0} showArrow={false}>
        <button>Trigger</button>
      </Tooltip>
    ));

    const btn = screen.getByText('Trigger');
    fireEvent.mouseEnter(wrapperOf(btn));

    await waitFor(() => {
      expect(screen.getByText('No arrow')).toBeDefined();
    });

    const arrow = document.querySelector('[class*="sc-tooltip-arrow"]');
    expect(arrow).toBeNull();
  });

  it('supports manual trigger (open=false hides)', () => {
    render(() => (
      <Tooltip content="Manual" trigger="manual" open={false}>
        <button>Trigger</button>
      </Tooltip>
    ));
    expect(screen.queryByText('Manual')).toBeNull();
  });

  it('supports click trigger', async () => {
    render(() => (
      <Tooltip content="Clicked!" trigger="click" delay={0}>
        <button>Click me</button>
      </Tooltip>
    ));

    // click bubbles, so firing on button reaches the wrapper span
    fireEvent.click(screen.getByText('Click me'));

    await waitFor(() => {
      expect(screen.getByText('Clicked!')).toBeDefined();
    }, { timeout: 3000 });
  });

  it('calls onOpenChange on state change', async () => {
    const onChange = vi.fn();
    render(() => (
      <Tooltip content="Test" delay={0} onOpenChange={onChange}>
        <button>Trigger</button>
      </Tooltip>
    ));

    const btn = screen.getByText('Trigger');
    fireEvent.mouseEnter(wrapperOf(btn));

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(true);
    }, { timeout: 3000 });
  });

  it('renders JSX content', async () => {
    render(() => (
      <Tooltip content={<span data-testid="custom">Custom content</span>} delay={0}>
        <button>Trigger</button>
      </Tooltip>
    ));

    const btn = screen.getByText('Trigger');
    fireEvent.mouseEnter(wrapperOf(btn));

    await waitFor(() => {
      expect(document.querySelector('[data-testid="custom"]')).toBeDefined();
    }, { timeout: 3000 });
  });

  it('supports controlled mode with open={true}', async () => {
    render(() => (
      <Tooltip content="Controlled" open={true} delay={0}>
        <button>Trigger</button>
      </Tooltip>
    ));

    await waitFor(() => {
      expect(screen.getByText('Controlled')).toBeDefined();
    }, { timeout: 3000 });
  });
});
