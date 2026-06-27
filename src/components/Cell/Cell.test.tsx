import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@solidjs/testing-library';
import { Cell, CellGroup } from './';

describe('Cell', () => {
  it('renders title', () => {
    render(() => <Cell title="用户名" />);
    expect(document.body.textContent).toContain('用户名');
  });

  it('renders value', () => {
    render(() => <Cell title="手机" value="138****" />);
    expect(document.body.textContent).toContain('138****');
  });

  it('renders description', () => {
    render(() => <Cell title="标题" description="这是一段描述" />);
    expect(document.body.textContent).toContain('这是一段描述');
  });

  it('renders required asterisk', () => {
    const { container } = render(() => <Cell title="姓名" required />);
    expect(container.textContent).toContain('*');
  });

  it('renders clickable state with arrow', () => {
    const { container } = render(() => <Cell title="设置" clickable />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('calls onClick when clicked and clickable', () => {
    const fn = vi.fn();
    const { container } = render(() => <Cell title="点击" clickable onClick={fn} />);
    fireEvent.click(container.firstElementChild!);
    expect(fn).toHaveBeenCalledOnce();
  });

  it('does not call onClick when not clickable', () => {
    const fn = vi.fn();
    const { container } = render(() => <Cell title="不可点击" onClick={fn} />);
    fireEvent.click(container.firstElementChild!);
    expect(fn).not.toHaveBeenCalled();
  });

  it('renders custom children', () => {
    render(() => <Cell><span data-testid="custom">自定义内容</span></Cell>);
    expect(document.querySelector('[data-testid="custom"]')).not.toBeNull();
  });

  it('applies size class', () => {
    const { container } = render(() => <Cell title="小" size="sm" />);
    expect(container.firstElementChild!.className).toContain('sm');
  });

  it('renders icon from string', () => {
    const { container } = render(() => <Cell title="搜索" icon="search" />);
    expect(container.querySelector('svg')).not.toBeNull();
  });
});

describe('CellGroup', () => {
  it('renders title', () => {
    render(() => <CellGroup title="基本信息"><Cell title="姓名" /></CellGroup>);
    expect(document.body.textContent).toContain('基本信息');
  });

  it('renders children', () => {
    render(() => (
      <CellGroup>
        <Cell title="第一项" />
        <Cell title="第二项" />
      </CellGroup>
    ));
    expect(document.body.textContent).toContain('第一项');
    expect(document.body.textContent).toContain('第二项');
  });

  it('applies card class', () => {
    const { container } = render(() => <CellGroup card><Cell title="卡片" /></CellGroup>);
    expect(container.firstElementChild!.className).toContain('card');
  });
});
