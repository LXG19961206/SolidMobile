import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { Center } from './Center';

describe('Center', () => {
  it('renders children', () => {
    const { container } = render(() => <Center><span>Hi</span></Center>);
    expect(container.textContent).toBe('Hi');
  });

  it('defaults to div tag', () => {
    const { container } = render(() => <Center>Hi</Center>);
    expect(container.firstElementChild!.tagName).toBe('DIV');
  });

  it('respects as prop', () => {
    const { container } = render(() => <Center as="span">Hi</Center>);
    expect(container.firstElementChild!.tagName).toBe('SPAN');
  });

  it('default mode centers both axes with flex', () => {
    const { container } = render(() => <Center>Hi</Center>);
    const el = container.firstElementChild!;
    expect(el.className).toContain('flexX');
    expect(el.className).toContain('flexY');
  });

  it('flexX only centers horizontally', () => {
    const { container } = render(() => <Center flexX>Hi</Center>);
    const el = container.firstElementChild!;
    expect(el.className).toContain('flexX');
    expect(el.className).not.toContain('flexY');
  });

  it('flexY only centers vertically', () => {
    const { container } = render(() => <Center flexY>Hi</Center>);
    const el = container.firstElementChild!;
    expect(el.className).not.toContain('flexX');
    expect(el.className).toContain('flexY');
  });

  it('text mode applies text-align', () => {
    const { container } = render(() => <Center text>Hi</Center>);
    expect(container.firstElementChild!.className).toContain('text');
  });

  it('position mode applies absolute centering', () => {
    const { container } = render(() => <Center position>Hi</Center>);
    expect(container.firstElementChild!.className).toContain('position');
  });

  it('inline mode adds inline class', () => {
    const { container } = render(() => <Center flexX inline>Hi</Center>);
    expect(container.firstElementChild!.className).toContain('inline');
  });

  it('combines multiple modes', () => {
    const { container } = render(() => <Center flexX text inline>Hi</Center>);
    const cls = container.firstElementChild!.className;
    expect(cls).toContain('flexX');
    expect(cls).toContain('text');
    expect(cls).toContain('inline');
  });

  it('accepts custom class', () => {
    const { container } = render(() => <Center class="my-center">Hi</Center>);
    expect(container.firstElementChild!.className).toContain('my-center');
  });
});
