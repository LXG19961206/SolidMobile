import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal by default', () => {
    const { container } = render(() => <Divider />);
    expect(container.firstElementChild!.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('renders vertical', () => {
    const { container } = render(() => <Divider direction="vertical" />);
    expect(container.firstElementChild!.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('renders text', () => {
    render(() => <Divider text="或者" />);
    expect(document.body.textContent).toContain('或者');
  });

  it('applies dashed class', () => {
    const { container } = render(() => <Divider dashed />);
    expect(container.firstElementChild!.className).toContain('dashed');
  });

  it('does not show text in vertical mode', () => {
    const { container } = render(() => <Divider direction="vertical" text="x" />);
    expect(container.textContent).not.toContain('x');
  });
});
