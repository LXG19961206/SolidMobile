import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { DialogComponent } from './Dialog';
import { DialogAPI as Dialog, DialogRenderer } from './DialogManager';

describe('DialogComponent (declarative)', () => {
  it('renders when show is true', async () => {
    render(() => <DialogComponent show={true} title="测试" message="内容" />);
    await waitFor(() => {
      expect(screen.getByText('测试')).toBeDefined();
      expect(screen.getByText('内容')).toBeDefined();
    });
  });

  it('does not render when show is false', () => {
    const { container } = render(() => <DialogComponent show={false} title="测试" message="内容" />);
    expect(container.textContent).toBe('');
  });

  it('renders confirm button by default', async () => {
    render(() => <DialogComponent show={true} message="确认操作" />);
    await waitFor(() => {
      expect(screen.getByText('确认')).toBeDefined();
    });
  });

  it('renders cancel button when showCancelButton is true', async () => {
    render(() => <DialogComponent show={true} showCancelButton message="确认删除？" />);
    await waitFor(() => {
      expect(screen.getByText('取消')).toBeDefined();
      expect(screen.getByText('确认')).toBeDefined();
    });
  });

  it('hides confirm button when showConfirmButton is false', async () => {
    render(() => <DialogComponent show={true} showConfirmButton={false} message="提示" />);
    await waitFor(() => {
      expect(screen.queryByText('确认')).toBeNull();
    });
  });

  it('uses custom button text', async () => {
    render(() => <DialogComponent show={true} showCancelButton confirmText="确定" cancelText="返回" message="自定义" />);
    await waitFor(() => {
      expect(screen.getByText('确定')).toBeDefined();
      expect(screen.getByText('返回')).toBeDefined();
    });
  });

  it('calls onConfirm when confirm clicked', async () => {
    const onConfirm = vi.fn();
    render(() => <DialogComponent show={true} message="测试" onConfirm={onConfirm} />);
    await waitFor(() => screen.getByText('确认'));
    fireEvent.click(screen.getByText('确认'));
    await waitFor(() => expect(onConfirm).toHaveBeenCalled());
  });

  it('calls onCancel when cancel clicked', async () => {
    const onCancel = vi.fn();
    render(() => <DialogComponent show={true} showCancelButton message="测试" onCancel={onCancel} />);
    await waitFor(() => screen.getByText('取消'));
    fireEvent.click(screen.getByText('取消'));
    await waitFor(() => expect(onCancel).toHaveBeenCalled());
  });

  it('disables buttons when disabled', async () => {
    render(() => <DialogComponent show={true} showCancelButton confirmDisabled cancelDisabled message="测试" />);
    await waitFor(() => {
      expect((screen.getByText('确认') as HTMLButtonElement).disabled).toBe(true);
      expect((screen.getByText('取消') as HTMLButtonElement).disabled).toBe(true);
    });
  });
});

describe('Dialog (imperative)', () => {
  beforeEach(() => {
    Dialog.dismissAll();
  });
  afterEach(() => {
    Dialog.dismissAll();
  });

  const Wrapper = () => <DialogRenderer />;

  it('shows a dialog via show()', async () => {
    render(Wrapper);
    Dialog.show({ title: '提示', message: '命令式弹窗', showCancelButton: true });
    await waitFor(() => {
      expect(screen.getByText('提示')).toBeDefined();
      expect(screen.getByText('命令式弹窗')).toBeDefined();
    });
  });

  it('shows alert shortcut', async () => {
    render(Wrapper);
    Dialog.alert({ title: '警告', message: 'alert 模式' });
    await waitFor(() => {
      expect(screen.getByText('警告')).toBeDefined();
      expect(screen.queryByText('取消')).toBeNull();
    });
  });

  it('shows confirm shortcut with cancel button', async () => {
    render(Wrapper);
    Dialog.confirm({ message: 'test confirm', showCancelButton: true });
    await waitFor(() => {
      expect(screen.getByText('test confirm')).toBeDefined();
    });
  }, 5000);

  it('dismisses via handle', async () => {
    render(Wrapper);
    const handle = Dialog.show({ message: 'dismiss me' });
    await waitFor(() => screen.getByText('dismiss me'));
    handle.dismiss();
    await waitFor(() => expect(screen.queryByText('dismiss me')).toBeNull());
  });

  it('dismissAll clears all', async () => {
    render(Wrapper);
    Dialog.show({ message: 'one' });
    Dialog.show({ message: 'two' });
    await waitFor(() => {
      expect(screen.getByText('one')).toBeDefined();
      expect(screen.getByText('two')).toBeDefined();
    });
    Dialog.dismissAll();
    await waitFor(() => expect(screen.queryByText('one')).toBeNull());
  });

  it('calls onConfirm in imperative mode', async () => {
    const onConfirm = vi.fn();
    render(Wrapper);
    Dialog.show({ message: 'test', onConfirm });
    await waitFor(() => screen.getByText('确认'));
    fireEvent.click(screen.getByText('确认'));
    await waitFor(() => expect(onConfirm).toHaveBeenCalled());
  });
});
