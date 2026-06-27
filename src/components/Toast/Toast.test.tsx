import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@solidjs/testing-library';
import { Toast, ToastRenderer } from './ToastManager';

describe('Toast', () => {
  afterEach(() => {
    Toast.dismissAll();
  });

  const Wrapper = () => <ToastRenderer />;

  it('shows a toast with message', async () => {
    render(Wrapper);
    Toast.show({ message: 'Hello Toast', duration: 0 });
    await waitFor(() => {
      expect(screen.getByText('Hello Toast')).toBeDefined();
    });
  });

  it('shows success shorthand', async () => {
    render(Wrapper);
    Toast.success('Done!');
    await waitFor(() => {
      expect(screen.getByText('Done!')).toBeDefined();
    });
  });

  it('shows error shorthand', async () => {
    render(Wrapper);
    Toast.error('Failed!');
    await waitFor(() => {
      expect(screen.getByText('Failed!')).toBeDefined();
    });
  });

  it('shows loading shorthand', async () => {
    render(Wrapper);
    Toast.loading('Please wait...');
    await waitFor(() => {
      expect(screen.getByText('Please wait...')).toBeDefined();
    });
  });

  it('returns a handle with dismiss()', async () => {
    render(Wrapper);
    const handle = Toast.show({ message: 'Dismiss me', duration: 0 });
    await waitFor(() => {
      expect(screen.getByText('Dismiss me')).toBeDefined();
    });
    handle.dismiss();
    await waitFor(() => {
      expect(screen.queryByText('Dismiss me')).toBeNull();
    });
  });

  it('dismissAll clears all toasts', async () => {
    render(Wrapper);
    Toast.success('One', { position: 'top' });
    Toast.error('Two', { position: 'bottom' });
    await waitFor(() => {
      expect(screen.getByText('One')).toBeDefined();
      expect(screen.getByText('Two')).toBeDefined();
    });
    Toast.dismissAll();
    await waitFor(() => {
      expect(screen.queryByText('One')).toBeNull();
      expect(screen.queryByText('Two')).toBeNull();
    });
  });

  it('auto-dismisses after duration', async () => {
    render(Wrapper);
    Toast.show({ message: 'Auto dismiss', duration: 200 });
    await waitFor(() => {
      expect(screen.getByText('Auto dismiss')).toBeDefined();
    });
    await waitFor(
      () => {
        expect(screen.queryByText('Auto dismiss')).toBeNull();
      },
      { timeout: 1000 },
    );
  });

  it('supports stacking with stack:true', async () => {
    render(Wrapper);
    Toast.success('First', { duration: 0, stack: true });
    Toast.error('Second', { duration: 0, stack: true });
    await waitFor(() => {
      expect(screen.getByText('First')).toBeDefined();
      expect(screen.getByText('Second')).toBeDefined();
    });
  });

  it('replaces same-position toast by default', async () => {
    render(Wrapper);
    Toast.success('First', { duration: 0 });
    Toast.error('Second', { duration: 0 });
    await waitFor(() => {
      expect(screen.queryByText('First')).toBeNull();
      expect(screen.getByText('Second')).toBeDefined();
    });
  });

  it('calls onClose callback', async () => {
    render(Wrapper);
    const onClose = vi.fn();
    const handle = Toast.show({ message: 'Callback', duration: 0, onClose });
    await waitFor(() => {
      expect(screen.getByText('Callback')).toBeDefined();
    });
    handle.dismiss();
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledOnce();
    });
  });
});
