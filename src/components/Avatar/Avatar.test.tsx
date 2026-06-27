import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src provided', () => {
    const { container } = render(() => <Avatar src="test.jpg" alt="User" />);
    expect(container.querySelector('img')).not.toBeNull();
  });

  it('renders icon fallback when no src', () => {
    const { container } = render(() => <Avatar icon="user" />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('renders first char of text', () => {
    render(() => <Avatar text="张三" />);
    expect(document.body.textContent).toContain('张');
  });

  it('icon takes priority over text', () => {
    const { container } = render(() => <Avatar icon="user" text="张三" />);
    expect(container.querySelector('svg')).not.toBeNull();
    expect(document.body.textContent).not.toContain('张');
  });

  it('defaults to round shape', () => {
    const { container } = render(() => <Avatar text="A" />);
    expect(container.firstElementChild!.className).toContain('round');
  });

  it('square mode removes round', () => {
    const { container } = render(() => <Avatar text="A" square />);
    expect(container.firstElementChild!.className).toContain('square');
    expect(container.firstElementChild!.className).not.toContain('round');
  });

  it('applies preset size', () => {
    const { container } = render(() => <Avatar text="A" size="lg" />);
    expect(container.firstElementChild!.className).toContain('lg');
  });

  it('applies custom size as number', () => {
    const { container } = render(() => <Avatar text="A" size={56} />);
    const style = container.firstElementChild!.getAttribute('style') || '';
    expect(style).toContain('56px');
  });

  it('applies custom color', () => {
    const { container } = render(() => <Avatar text="A" color="#f59e0b" />);
    const style = container.firstElementChild!.getAttribute('style') || '';
    expect(style).toContain('#f59e0b');
  });

  it('falls back to user icon when no src/icon/text', () => {
    const { container } = render(() => <Avatar />);
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
