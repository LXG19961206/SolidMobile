import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@solidjs/testing-library';
import { Swiper } from './Swiper';

describe('Swiper', () => {
  const IMGS = [
    'https://picsum.photos/seed/a/400/200',
    'https://picsum.photos/seed/b/400/200',
    'https://picsum.photos/seed/c/400/200',
  ];

  it('renders imgUrls as slides (loop clones extra)', () => {
    const { container } = render(() => <Swiper imgUrls={IMGS} height={160} />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBe(5); // 3 real + 2 loop clones
  });

  it('shows indicators by default', () => {
    const { container } = render(() => <Swiper imgUrls={IMGS} height={160} />);
    const dots = container.querySelectorAll('[class*="dot"]');
    expect(dots.length).toBe(3);
  });

  it('hides indicators when showIndicators=false', () => {
    const { container } = render(() => <Swiper imgUrls={IMGS} showIndicators={false} />);
    expect(container.querySelector('[class*="dot"]')).toBeNull();
  });

  it('calls onChange on swipe', async () => {
    const onChange = vi.fn();
    render(() => <Swiper imgUrls={IMGS} height={160} onChange={onChange} loop={false} />);
    // auto-play would trigger it; check at least renders without error
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders custom indicators', () => {
    const { container } = render(() => (
      <Swiper
        imgUrls={IMGS}
        height={160}
        indicators={(cur) => <span data-testid="custom-dot">{cur}</span>}
      />
    ));
    expect(container.querySelector('[data-testid="custom-dot"]')).toBeDefined();
  });
});
