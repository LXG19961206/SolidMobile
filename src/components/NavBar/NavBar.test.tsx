import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders title text', () => {
    render(() => <NavBar title="页面标题" />);
    expect(screen.getByText('页面标题')).toBeDefined();
  });

  it('renders title as JSX', () => {
    render(() => <NavBar title={<span data-testid="t">自定义</span>} />);
    expect(screen.getByTestId('t')).toBeDefined();
  });

  it('shows back arrow when backArrow is true', () => {
    const { container } = render(() => <NavBar title="标题" backArrow />);
    expect(container.querySelector('[class*="clickable"]')).not.toBeNull();
  });

  it('does not show back arrow by default', () => {
    const { container } = render(() => <NavBar title="标题" />);
    expect(container.querySelector('[class*="arrow"]')).toBeNull();
  });

  it('calls onBack when back arrow clicked', () => {
    const onBack = vi.fn();
    const { container } = render(() => <NavBar title="标题" backArrow onBack={onBack} />);
    const btn = container.querySelector('[class*="clickable"]')!;
    fireEvent.click(btn);
    expect(onBack).toHaveBeenCalled();
  });

  it('renders right content', () => {
    render(() => <NavBar title="标题" right={<span data-testid="r">保存</span>} />);
    expect(screen.getByTestId('r')).toBeDefined();
  });

  it('renders left content', () => {
    render(() => <NavBar title="标题" left={<span data-testid="l">关闭</span>} />);
    expect(screen.getByTestId('l')).toBeDefined();
  });

  it('renders placeholder when fixed + placeholder', () => {
    const { container } = render(() => <NavBar title="标题" fixed placeholder />);
    expect(container.querySelector('[class*="placeholder"]')).not.toBeNull();
  });

  it('does not render placeholder by default', () => {
    const { container } = render(() => <NavBar title="标题" fixed />);
    expect(container.querySelector('[class*="placeholder"]')).toBeNull();
  });

  it('applies custom height', () => {
    const { container } = render(() => <NavBar title="标题" height={56} />);
    const bar = container.querySelector('[class*="bar"]') as HTMLElement;
    expect(bar.style.height).toBe('56px');
  });

  it('applies border class when border is true', () => {
    const { container } = render(() => <NavBar title="标题" border />);
    expect(container.querySelector('[class*="border"]')).not.toBeNull();
  });

  it('applies custom class', () => {
    const { container } = render(() => <NavBar title="标题" class="my-nav" />);
    expect(container.querySelector('.my-nav')).not.toBeNull();
  });
});
