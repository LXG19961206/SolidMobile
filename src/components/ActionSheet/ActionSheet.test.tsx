import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { ActionSheet } from './ActionSheet';

describe('ActionSheet', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  const items = [
    { name: '选项一' },
    { name: '选项二', subname: '副标题' },
    { name: '选项三', disabled: true },
  ];

  it('renders when open', async () => {
    render(() => (
      <ActionSheet open={true} onClose={() => {}} items={items} />
    ));
    await waitFor(() => {
      expect(screen.getByText('选项一')).toBeDefined();
      expect(screen.getByText('选项二')).toBeDefined();
      expect(screen.getByText('副标题')).toBeDefined();
      expect(screen.getByText('选项三')).toBeDefined();
    });
  });

  it('does not render when closed', () => {
    render(() => (
      <ActionSheet open={false} onClose={() => {}} items={items} />
    ));
    expect(screen.queryByText('选项一')).toBeNull();
  });

  it('renders title when provided', async () => {
    render(() => (
      <ActionSheet open={true} onClose={() => {}} title="选择操作" items={items} />
    ));
    await waitFor(() => {
      expect(screen.getByText('选择操作')).toBeDefined();
    });
  });

  it('renders close button when closeable', async () => {
    const onClose = vi.fn();
    render(() => (
      <ActionSheet open={true} onClose={onClose} title="标题" closeable items={items} />
    ));
    await waitFor(async () => {
      // Portal content is rendered to document.body, so use document selector
      const closeBtn = document.querySelector('[class*="closeBtn"]') as HTMLElement;
      expect(closeBtn).not.toBeNull();
      await userEvent.click(closeBtn);
    });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders description', async () => {
    render(() => (
      <ActionSheet open={true} onClose={() => {}} description="这是一段描述" items={items} />
    ));
    await waitFor(() => {
      expect(screen.getByText('这是一段描述')).toBeDefined();
    });
  });

  it('renders cancel button', async () => {
    render(() => (
      <ActionSheet open={true} onClose={() => {}} cancelText="取消" items={items} />
    ));
    await waitFor(() => {
      expect(screen.getByText('取消')).toBeDefined();
    });
  });

  it('calls onClose when cancel is clicked', async () => {
    const onClose = vi.fn();
    render(() => (
      <ActionSheet open={true} onClose={onClose} cancelText="取消" items={items} />
    ));
    await waitFor(async () => {
      await userEvent.click(screen.getByText('取消'));
    });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onSelect when item is clicked', async () => {
    const onSelect = vi.fn();
    const onClose = vi.fn();
    render(() => (
      <ActionSheet open={true} onClose={onClose} onSelect={onSelect} items={items} />
    ));
    await waitFor(async () => {
      await userEvent.click(screen.getByText('选项一'));
    });
    expect(onSelect).toHaveBeenCalledWith({ name: '选项一' }, 0);
    // By default closeOnSelect is true
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not close when closeOnSelect is false', async () => {
    const onClose = vi.fn();
    render(() => (
      <ActionSheet
        open={true}
        onClose={onClose}
        items={items}
        closeOnSelect={false}
      />
    ));
    await waitFor(async () => {
      await userEvent.click(screen.getByText('选项一'));
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onSelect for disabled items', async () => {
    const onSelect = vi.fn();
    render(() => (
      <ActionSheet open={true} onClose={() => {}} onSelect={onSelect} items={items} />
    ));
    await waitFor(async () => {
      await userEvent.click(screen.getByText('选项三'));
    });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders children instead of items', async () => {
    render(() => (
      <ActionSheet open={true} onClose={() => {}}>
        <div>自定义内容</div>
      </ActionSheet>
    ));
    await waitFor(() => {
      expect(screen.getByText('自定义内容')).toBeDefined();
    });
  });

  it('has rounded top corners by default', async () => {
    render(() => (
      <ActionSheet open={true} onClose={() => {}} items={items} />
    ));
    await waitFor(() => {
      const sheet = screen.getByRole('dialog');
      expect(sheet.className).toContain('round');
    });
  });

  it('honors data attributes', async () => {
    render(() => (
      <ActionSheet open={true} onClose={() => {}} items={items} data-testid="sheet" />
    ));
    await waitFor(() => {
      expect(screen.getByTestId('sheet')).toBeDefined();
    });
  });
});
