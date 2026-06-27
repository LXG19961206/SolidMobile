import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@solidjs/testing-library';
import { Lazyload } from './Lazyload';

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
let mockCallback: (entries: { isIntersecting: boolean }[]) => void;

beforeAll(() => {
  (window as any).IntersectionObserver = vi.fn((cb) => {
    mockCallback = cb;
    return { observe: mockObserve, disconnect: mockDisconnect, unobserve: vi.fn() };
  });
});

describe('Lazyload', () => {
  it('renders placeholder initially', () => {
    render(() => <Lazyload placeholder={<span>loading...</span>}><span>content</span></Lazyload>);
    expect(document.body.textContent).toContain('loading...');
    expect(document.body.textContent).not.toContain('content');
  });

  it('renders content when active (controlled)', () => {
    render(() => <Lazyload active={true} placeholder={<span>loading</span>}><span>content</span></Lazyload>);
    expect(document.body.textContent).toContain('content');
  });

  it('renders placeholder when active is false (controlled)', () => {
    render(() => <Lazyload active={false} placeholder={<span>loading</span>}><span>content</span></Lazyload>);
    expect(document.body.textContent).toContain('loading');
  });

  it('triggers observer on mount', () => {
    render(() => <Lazyload><span>hi</span></Lazyload>);
    expect(mockObserve).toHaveBeenCalled();
  });

  it('shows content when intersecting', async () => {
    render(() => <Lazyload placeholder={<span>loading</span>}><span>content</span></Lazyload>);
    // Simulate intersection
    mockCallback([{ isIntersecting: true }]);
    await waitFor(() => {
      expect(document.body.textContent).toContain('content');
    });
  });

  it('disconnects observer when once is true after intersecting', async () => {
    mockDisconnect.mockClear();
    mockObserve.mockClear();
    render(() => <Lazyload once><span>hi</span></Lazyload>);
    mockCallback([{ isIntersecting: true }]);
    await waitFor(() => {
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  it('uses custom tag via as prop', () => {
    const { container } = render(() => <Lazyload as="span"><span>hi</span></Lazyload>);
    expect(container.firstElementChild!.tagName).toBe('SPAN');
  });

  it('falls back to scroll mode with disableObserver', () => {
    mockObserve.mockClear();
    render(() => <Lazyload disableObserver placeholder={<span>loading</span>}><span>content</span></Lazyload>);
    // Observer should not be called
    expect(mockObserve).not.toHaveBeenCalled();
    // Still shows placeholder
    expect(document.body.textContent).toContain('loading');
  });
});
