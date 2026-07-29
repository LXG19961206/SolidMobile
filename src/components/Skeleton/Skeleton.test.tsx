import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('shows content when loading=false (default)', () => {
    render(() => <Skeleton><span data-testid="content">Hello</span></Skeleton>);
    expect(document.querySelector('[data-testid="content"]')).not.toBeNull();
  });

  it('shows skeleton when loading=true', () => {
    const { container } = render(() => (
      <Skeleton loading><span data-testid="content">Hello</span></Skeleton>
    ));
    expect(document.querySelector('[data-testid="content"]')).toBeNull();
    expect(container.querySelector('[class*="row"]')).not.toBeNull();
  });

  it('renders correct number of rows', () => {
    const { container } = render(() => <Skeleton loading rows={3} />);
    expect(container.querySelectorAll('[class*="row"]').length).toBe(3);
  });

  it('applies animated class', () => {
    const { container } = render(() => <Skeleton loading animated />);
    expect(container.querySelector('[class*="animated"]')).not.toBeNull();
  });

  it('applies shape class', () => {
    const { container } = render(() => <Skeleton loading shape="circle" />);
    expect(container.querySelector('[class*="circle"]')).not.toBeNull();
  });

  it('applies size class', () => {
    const { container } = render(() => <Skeleton loading size="large" />);
    expect(container.querySelector('[class*="large"]')).not.toBeNull();
  });

  it('applies custom width and height overriding size', () => {
    const { container } = render(() => <Skeleton loading width={200} height={30} size="small" />);
    const row = container.querySelector('[class*="row"]') as HTMLElement;
    expect(row.style.width).toBe('200px');
    expect(row.style.height).toBe('30px');
  });
});
