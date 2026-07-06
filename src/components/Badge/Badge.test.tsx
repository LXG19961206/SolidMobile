import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders standalone with content', () => {
    render(() => <Badge content={5} />);
    expect(document.body.textContent).toContain('5');
  });

  it('shows dot mode', () => {
    const { container } = render(() => <Badge dot />);
    expect(container.querySelector('[class*="dot"]')).not.toBeNull();
  });

  it('shows max+', () => {
    render(() => <Badge content={120} max={99} />);
    expect(document.body.textContent).toContain('99+');
  });

  it('wraps children', () => {
    render(() => <Badge content={3}><span data-testid="child">消息</span></Badge>);
    expect(document.querySelector('[data-testid="child"]')).not.toBeNull();
    expect(document.body.textContent).toContain('3');
  });

  it('hides when no content and no dot', () => {
    const { container } = render(() => <Badge><span>hi</span></Badge>);
    expect(container.querySelector('[class*="sc-badge-badge"]')).toBeNull();
  });
});
