import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, waitFor } from '@solidjs/testing-library';
import { Loading } from './Loading';

describe('Loading', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders default spinner', () => {
    const { container } = render(() => <Loading />);
    const spinner = container.querySelector('[class*="spinner"]');
    expect(spinner).not.toBeNull();
  });

  it('renders text', () => {
    render(() => <Loading text="加载中..." />);
    expect(screen.getByText('加载中...')).toBeDefined();
  });

  it('renders children as text fallback', () => {
    render(() => <Loading>请稍候</Loading>);
    expect(screen.getByText('请稍候')).toBeDefined();
  });

  it('renders circular type', () => {
    const { container } = render(() => <Loading type="circular" />);
    expect(container.querySelector('[class*="circular"]')).not.toBeNull();
  });

  it('renders dots type', () => {
    const { container } = render(() => <Loading type="dots" />);
    expect(container.querySelector('[class*="dots"]')).not.toBeNull();
    // 3 dot children — use direct child selector to avoid matching the parent
    const dots = container.querySelector('[class*="dots"]')!;
    expect(dots.children.length).toBe(3);
  });

  it('renders custom icon', () => {
    render(() => <Loading icon={<span data-testid="custom">⚡</span>} />);
    expect(screen.getByTestId('custom')).toBeDefined();
  });

  it('applies custom color to spinner', () => {
    const { container } = render(() => <Loading color="#ff0000" />);
    const spinner = container.querySelector('[class*="spinner"]')!;
    expect(spinner.getAttribute('style')).toContain('color');
  });

  it('renders vertical layout', () => {
    const { container } = render(() => <Loading vertical text="加载中" />);
    const el = container.querySelector('[class*="vertical"]');
    expect(el).not.toBeNull();
  });

  it('renders overlay mode', async () => {
    render(() => <Loading overlay text="处理中..." />);
    await waitFor(() => {
      expect(screen.getByText('处理中...')).toBeDefined();
    });
    // Body scroll should be locked
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('renders overlay without text', async () => {
    render(() => <Loading overlay />);
    await waitFor(() => {
      // Rendered via Portal to document.body
      const overlay = document.querySelector('[class*="overlayContent"]');
      expect(overlay).not.toBeNull();
    });
  });

  it('accepts custom class', () => {
    const { container } = render(() => <Loading class="my-loading" />);
    expect(container.querySelector('.my-loading')).not.toBeNull();
  });

  it('applies numeric size', () => {
    const { container } = render(() => <Loading size={48} />);
    const spinner = container.querySelector('[class*="spinner"]')!;
    expect(spinner.getAttribute('style')).toContain('font-size');
  });
});
