import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { FloatingBall } from './FloatingBall';

describe('FloatingBall', () => {
  it('renders children', () => {
    render(() => (
      <FloatingBall>
        <span data-testid="icon">↑</span>
      </FloatingBall>
    ));
    expect(document.querySelector('[data-testid="icon"]')).toBeDefined();
  });

  it('applies fixed positioning', () => {
    const { container } = render(() => (
      <FloatingBall inset={{ right: 20, bottom: 30 }}>
        <span>↑</span>
      </FloatingBall>
    ));
    const ball = container.firstElementChild as HTMLElement;
    expect(ball.style.right).toBe('20px');
    expect(ball.style.bottom).toBe('30px');
  });

  it('uses default inset', () => {
    const { container } = render(() => (
      <FloatingBall><span>↑</span></FloatingBall>
    ));
    const ball = container.firstElementChild as HTMLElement;
    expect(ball.style.right).toBe('16px');
    expect(ball.style.bottom).toBe('24px');
  });

  it('applies custom zIndex', () => {
    const { container } = render(() => (
      <FloatingBall zIndex={100}><span>↑</span></FloatingBall>
    ));
    const ball = container.firstElementChild as HTMLElement;
    expect(ball.style.zIndex).toBe('100');
  });

  it('renders with custom class', () => {
    const { container } = render(() => (
      <FloatingBall class="my-ball"><span>↑</span></FloatingBall>
    ));
    expect(container.querySelector('.my-ball')).toBeDefined();
  });
});
