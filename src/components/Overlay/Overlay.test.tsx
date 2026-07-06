import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { createSignal, type Component } from 'solid-js';
import { Overlay } from './Overlay';

describe('Overlay', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders when open is true', async () => {
    render(() => <Overlay open={true}>Hello</Overlay>);
    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeDefined();
    });
  });

  it('does not render when open is false', () => {
    render(() => <Overlay open={false}>Hidden</Overlay>);
    expect(screen.queryByText('Hidden')).toBeNull();
  });

  it('unmounts after close animation', async () => {
    const TestApp: Component = () => {
      const [open, setOpen] = createSignal(true);
      // Close after a tick
      setTimeout(() => setOpen(false), 50);
      return <Overlay open={open()} duration={50}>Content</Overlay>;
    };
    render(() => <TestApp />);
    // Should be visible initially
    await waitFor(() => {
      expect(screen.getByText('Content')).toBeDefined();
    });
    // Should unmount after duration
    await waitFor(
      () => {
        expect(screen.queryByText('Content')).toBeNull();
      },
      { timeout: 500 },
    );
  });

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = vi.fn();
    render(() => (
      <Overlay open={true} onClose={onClose}>
        <div>Content</div>
      </Overlay>
    ));
    await waitFor(() => {
      expect(screen.getByText('Content')).toBeDefined();
    });

    // Click the backdrop (the outer div — role="presentation")
    const overlay = screen.getByRole('presentation');
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose when content area is clicked', async () => {
    const onClose = vi.fn();
    render(() => (
      <Overlay open={true} onClose={onClose}>
        <div data-testid="inner">Content</div>
      </Overlay>
    ));
    await waitFor(() => {
      expect(screen.getByTestId('inner')).toBeDefined();
    });
    await userEvent.click(screen.getByTestId('inner'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape key', async () => {
    const onClose = vi.fn();
    render(() => (
      <Overlay open={true} onClose={onClose}>
        <div>Content</div>
      </Overlay>
    ));
    await waitFor(() => {
      expect(screen.getByText('Content')).toBeDefined();
    });
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('locks body scroll when lockScroll is true', async () => {
    render(() => <Overlay open={true} lockScroll={true}>Content</Overlay>);
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  it('does not lock body scroll when lockScroll is false', async () => {
    render(() => <Overlay open={true} lockScroll={false}>Content</Overlay>);
    await waitFor(() => {
      expect(screen.getByText('Content')).toBeDefined();
    });
    // Body overflow should NOT be 'hidden' (could be '' or original)
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('restores body scroll on close', async () => {
    document.body.style.overflow = 'auto';
    const onClose = vi.fn();

    const TestApp: Component = () => {
      const [open, setOpen] = createSignal(true);
      setTimeout(() => setOpen(false), 50);
      return (
        <Overlay open={open()} duration={30} lockScroll={true} onClose={onClose}>
          Content
        </Overlay>
      );
    };
    render(() => <TestApp />);
    await waitFor(() => {
      expect(screen.getByText('Content')).toBeDefined();
    });
    await waitFor(
      () => {
        expect(screen.queryByText('Content')).toBeNull();
      },
      { timeout: 500 },
    );
    // Body overflow should be restored to previous value
    expect(document.body.style.overflow).toBe('auto');
  });

  it('applies custom zIndex', async () => {
    render(() => <Overlay open={true} zIndex={2000}>Content</Overlay>);
    await waitFor(() => {
      const overlay = screen.getByRole('presentation');
      const style = overlay.getAttribute('style') || '';
      expect(style).toContain('2000');
    });
  });

  it('passes custom class', async () => {
    render(() => <Overlay open={true} class="my-overlay">Content</Overlay>);
    await waitFor(() => {
      const overlay = screen.getByRole('presentation');
      expect(overlay.className).toContain('my-overlay');
    });
  });

  it('renders via Portal', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(() => <Overlay open={true} mount={container}>Portal Content</Overlay>);
    await waitFor(() => {
      expect(container.textContent).toContain('Portal Content');
    });
    document.body.removeChild(container);
  });
});
