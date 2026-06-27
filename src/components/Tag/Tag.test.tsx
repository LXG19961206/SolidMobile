import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders children', () => {
    render(() => <Tag>标签</Tag>);
    expect(document.body.textContent).toContain('标签');
  });

  it('defaults to primary solid', () => {
    const { container } = render(() => <Tag>Hi</Tag>);
    const el = container.firstElementChild!;
    expect(el.className).toContain('primary');
    expect(el.className).toContain('tag');
  });

  it('applies type classes', () => {
    const types = ['success', 'warning', 'danger', 'info'] as const;
    for (const t of types) {
      const { container, unmount } = render(() => <Tag type={t}>{t}</Tag>);
      expect(container.firstElementChild!.className).toContain(t);
      unmount();
    }
  });

  it('applies outline variant', () => {
    const { container } = render(() => <Tag variant="outline">Hi</Tag>);
    expect(container.firstElementChild!.className).toContain('outline');
  });

  it('renders close button', () => {
    render(() => <Tag closeable>可关闭</Tag>);
    expect(screen.getByText('✕')).toBeDefined();
  });

  it('calls onClose when close clicked', () => {
    const fn = vi.fn();
    render(() => <Tag closeable onClose={fn}>x</Tag>);
    fireEvent.click(screen.getByText('✕'));
    expect(fn).toHaveBeenCalledOnce();
  });

  it('applies round class', () => {
    const { container } = render(() => <Tag round>圆角</Tag>);
    expect(container.firstElementChild!.className).toContain('round');
  });
});
