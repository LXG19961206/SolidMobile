import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@solidjs/testing-library';
import { Notify, NotifyRenderer } from './NotifyManager';

describe('Notify', () => {
  afterEach(() => {
    Notify.dismissAll();
  });

  const Wrapper = () => <NotifyRenderer />;

  it('shows a notify with message', async () => {
    render(Wrapper);
    Notify.show({ message: 'Hello Notify', duration: 0 });
    await waitFor(() => {
      expect(screen.getByText('Hello Notify')).toBeDefined();
    });
  });

  it('shows primary shorthand', async () => {
    render(Wrapper);
    Notify.primary('Primary!');
    await waitFor(() => {
      expect(screen.getByText('Primary!')).toBeDefined();
    });
  });

  it('shows success shorthand', async () => {
    render(Wrapper);
    Notify.success('Done!');
    await waitFor(() => {
      expect(screen.getByText('Done!')).toBeDefined();
    });
  });

  it('shows warning shorthand', async () => {
    render(Wrapper);
    Notify.warning('Careful!');
    await waitFor(() => {
      expect(screen.getByText('Careful!')).toBeDefined();
    });
  });

  it('shows danger shorthand', async () => {
    render(Wrapper);
    Notify.danger('Error!');
    await waitFor(() => {
      expect(screen.getByText('Error!')).toBeDefined();
    });
  });

  it('renders success notify with message', async () => {
    render(Wrapper);
    Notify.success('ok', { duration: 0 });
    await waitFor(() => {
      expect(screen.getByText('ok')).toBeDefined();
    });
  });

  it('returns a handle with dismiss()', async () => {
    render(Wrapper);
    const handle = Notify.show({ message: 'Dismiss me', duration: 0 });
    await waitFor(() => {
      expect(screen.getByText('Dismiss me')).toBeDefined();
    });
    handle.dismiss();
    await waitFor(() => {
      expect(screen.queryByText('Dismiss me')).toBeNull();
    });
  });

  it('dismissAll clears all notifies', async () => {
    render(Wrapper);
    Notify.show({ message: 'one', duration: 0, position: 'top' });
    Notify.show({ message: 'two', duration: 0, position: 'bottom' });
    await waitFor(() => {
      expect(screen.getByText('one')).toBeDefined();
      expect(screen.getByText('two')).toBeDefined();
    });
    Notify.dismissAll();
    await waitFor(() => {
      expect(screen.queryByText('one')).toBeNull();
      expect(screen.queryByText('two')).toBeNull();
    });
  });

  it('replaces same-position notify', async () => {
    render(Wrapper);
    Notify.show({ message: 'first', duration: 0 });
    Notify.show({ message: 'second', duration: 0 });
    await waitFor(() => {
      expect(screen.queryByText('first')).toBeNull();
      expect(screen.getByText('second')).toBeDefined();
    });
  });

  it('keeps notifies at different positions', async () => {
    render(Wrapper);
    Notify.show({ message: 'top', duration: 0, position: 'top' });
    Notify.show({ message: 'bottom', duration: 0, position: 'bottom' });
    await waitFor(() => {
      expect(screen.getByText('top')).toBeDefined();
      expect(screen.getByText('bottom')).toBeDefined();
    });
  });

  it('calls onClose callback', async () => {
    render(Wrapper);
    const onClose = vi.fn();
    const handle = Notify.show({ message: 'Callback', duration: 0, onClose });
    await waitFor(() => {
      expect(screen.getByText('Callback')).toBeDefined();
    });
    handle.dismiss();
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  it('calls onOpened callback', async () => {
    render(Wrapper);
    const onOpened = vi.fn();
    Notify.show({ message: 'opened', duration: 0, onOpened });
    await waitFor(() => {
      expect(onOpened).toHaveBeenCalled();
    });
  });
});
