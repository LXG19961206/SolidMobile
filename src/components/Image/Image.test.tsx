import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { Image } from './Image';

describe('Image', () => {
  it('renders an img element', () => {
    const { container } = render(() => <Image src="test.jpg" alt="test" />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img!.getAttribute('src')).toBe('test.jpg');
    expect(img!.getAttribute('alt')).toBe('test');
  });

  it('shows placeholder while loading', () => {
    const { container } = render(() => <Image src="test.jpg" />);
    // Should have state element since image hasn't loaded yet
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('applies width and height', () => {
    render(() => <Image src="a.jpg" width={200} height={150} />);
    const wrapper = document.querySelector('[class*="wrapper"]')!;
    const style = wrapper.getAttribute('style') || '';
    expect(style).toContain('200px');
    expect(style).toContain('150px');
  });

  it('applies round class', () => {
    const { container } = render(() => <Image src="a.jpg" round />);
    expect(container.firstElementChild!.className).toContain('round');
  });

  it('applies block class', () => {
    const { container } = render(() => <Image src="a.jpg" block />);
    expect(container.firstElementChild!.className).toContain('block');
  });

  it('renders custom placeholder', () => {
    render(() => <Image src="a.jpg" placeholder={<span data-testid="ph">加载中</span>} />);
    expect(document.querySelector('[data-testid="ph"]')).not.toBeNull();
  });

  it('accepts custom class', () => {
    const { container } = render(() => <Image src="a.jpg" class="my-img" />);
    expect(container.firstElementChild!.className).toContain('my-img');
  });
});
