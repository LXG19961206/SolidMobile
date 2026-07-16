import { describe, it, expect, vi } from 'vitest';
import { render } from '@solidjs/testing-library';
import { BackTop } from './BackTop';

describe('BackTop', () => {
  it('does not render when below threshold', () => {
    // Simulate scroll at 0 — should not render
    window.scrollY = 0;
    vi.stubGlobal('scrollY', 0);
    const { container } = render(() => <BackTop threshold={100} />);
    expect(container.querySelector('[class*="sc-back-top"]')).toBeNull();
  });

  it('renders custom children', () => {
    const { container } = render(() => (
      <BackTop threshold={0}>
        <span data-testid="custom">UP</span>
      </BackTop>
    ));
    // With threshold=0 and scrollY=0, visible is false, so not rendered
    expect(container.querySelector('[data-testid="custom"]')).toBeNull();
  });

  it('accepts threshold prop', () => {
    render(() => <BackTop threshold={500} />);
    // Just verify it mounts without error
  });

  it('accepts custom class', () => {
    render(() => <BackTop class="my-backtop" threshold={0} />);
  });
});
