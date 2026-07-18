import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders an SVG element', () => {
    const { container } = render(() => <Icon name="check" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('viewBox')).toBe('0 0 24 24');
  });

  it('renders with default size 1em', () => {
    const { container } = render(() => <Icon name="star" />);
    const svg = container.querySelector('svg')!;
    const style = svg.getAttribute('style') || '';
    expect(style).toMatch(/--sc-icon-size:\s*1em/);
  });

  it('renders with numeric size as px', () => {
    const { container } = render(() => <Icon name="heart" size={24} />);
    const svg = container.querySelector('svg')!;
    const style = svg.getAttribute('style') || '';
    expect(style).toMatch(/--sc-icon-size:\s*24px/);
  });

  it('renders with string size', () => {
    const { container } = render(() => <Icon name="search" size="2rem" />);
    const svg = container.querySelector('svg')!;
    const style = svg.getAttribute('style') || '';
    expect(style).toMatch(/--sc-icon-size:\s*2rem/);
  });

  it('renders default line variant', () => {
    const { container } = render(() => <Icon name="add" />);
    const svg = container.querySelector('svg')!;
    // Line variant should have path elements
    expect(svg.querySelector('path')).not.toBeNull();
  });

  it('renders fill variant', () => {
    const { container } = render(() => <Icon name="add" variant="fill" />);
    const svg = container.querySelector('svg')!;
    expect(svg.querySelector('path')).not.toBeNull();
  });

  it('falls back to line for unknown variant', () => {
    const { container } = render(() => <Icon name="close" variant={'unknown' as any} />);
    const svg = container.querySelector('svg')!;
    // Should still render line variant
    expect(svg.querySelector('path')).not.toBeNull();
  });

  it('applies custom color', () => {
    const { container } = render(() => <Icon name="check" color="#ff0000" />);
    const svg = container.querySelector('svg')!;
    const styleAttr = svg.getAttribute('style') || '';
    expect(styleAttr).toMatch(/--sc-icon-color:\s*#ff0000/);
  });

  it('applies custom class', () => {
    const { container } = render(() => <Icon name="check" class="my-icon" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('class')).toContain('my-icon');
  });

  it('sets aria-hidden on decorative icons (no aria-label)', () => {
    const { container } = render(() => <Icon name="search" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.hasAttribute('aria-label')).toBe(false);
  });

  it('uses aria-label for functional icons', () => {
    const { container } = render(() => <Icon name="close" aria-label="关闭" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('aria-label')).toBe('关闭');
    expect(svg.getAttribute('aria-hidden')).toBeNull();
  });

  it('renders single-variant icon (Editor icons)', () => {
    const { container } = render(() => <Icon name="bold" />);
    const svg = container.querySelector('svg')!;
    expect(svg.querySelector('path')).not.toBeNull();
  });

  it('renders single-variant icon with fill variant (falls back to line)', () => {
    const { container } = render(() => <Icon name="italic" variant="fill" />);
    const svg = container.querySelector('svg')!;
    // Should still render because it falls back to line variant
    expect(svg.querySelector('path')).not.toBeNull();
  });

  it('passes through id attribute', () => {
    const { container } = render(() => <Icon name="home" id="home-icon" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('id')).toBe('home-icon');
  });

  it('applies custom inline styles', () => {
    const { container } = render(() => (
      <Icon name="menu" style={{ 'margin-right': '8px' }} />
    ));
    const svg = container.querySelector('svg')!;
    const styleAttr = svg.getAttribute('style') || '';
    expect(styleAttr).toContain('margin-right');
  });

  it('renders with different icon names', () => {
    const names = ['arrow-left', 'user', 'settings', 'play', 'camera', 'earth'] as const;
    for (const name of names) {
      const { container, unmount } = render(() => <Icon name={name} />);
      const svg = container.querySelector('svg')!;
      expect(svg).not.toBeNull();
      expect(svg.querySelector('path')).not.toBeNull();
      unmount();
    }
  });
});
