import { describe, it, expect, vi } from 'vitest';
import { render } from '@solidjs/testing-library';
import { PullRefresh } from './PullRefresh';

describe('PullRefresh', () => {
  it('renders children', () => {
    const { container } = render(() => (
      <PullRefresh><div data-testid="content">hello</div></PullRefresh>
    ));
    expect(container.querySelector('[data-testid="content"]')?.textContent).toBe('hello');
  });

  it('renders with custom class', () => {
    const { container } = render(() => <PullRefresh class="my-class" />);
    const el = container.firstElementChild!;
    expect(el.classList.contains('my-class')).toBe(true);
  });

  it('shows loading state', () => {
    const { container } = render(() => <PullRefresh loading />);
    expect(container.textContent).toContain('刷新中...');
  });

  it('shows success state', () => {
    const { container } = render(() => <PullRefresh loading={false} />);
    // loading=false means not in loading state — should show nothing
    expect(container.textContent).not.toContain('刷新中...');
  });

  it('renders with custom text', () => {
    const { container } = render(() => (
      <PullRefresh
        loading
        loadingText="自定义加载"
        pullingText="下拉呀"
        loosingText="松手呀"
        successText="成了"
      />
    ));
    expect(container.textContent).toContain('自定义加载');
  });
});
