import { describe, it, expect } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import { Marquee } from './Marquee';

describe('Marquee', () => {
  it('renders children', () => {
    render(() => <Marquee><span>Hello World</span></Marquee>);
    const elms = screen.getAllByText('Hello World');
    expect(elms.length).toBe(2); // duplicated for seamless loop
  });

  it('applies custom duration via CSS var', () => {
    const { container } = render(() => <Marquee duration={5}><span>Fast</span></Marquee>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue('--mq-duration')).toBe('5s');
  });

  it('applies reverse direction for right', () => {
    const { container } = render(() => <Marquee direction="right"><span>R</span></Marquee>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue('--mq-direction')).toBe('reverse');
  });

  it('default direction is normal (left)', () => {
    const { container } = render(() => <Marquee><span>L</span></Marquee>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue('--mq-direction')).toBe('normal');
  });

  it('pauseOnHover adds CSS class', () => {
    const { container } = render(() => <Marquee pauseOnHover><span>P</span></Marquee>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('sc-marquee-pauseOnHover');
  });

  it('pauseOnHover={false} removes class', () => {
    const { container } = render(() => <Marquee pauseOnHover={false}><span>N</span></Marquee>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).not.toContain('sc-marquee-pauseOnHover');
  });

  it('applies gap CSS var', () => {
    const { container } = render(() => <Marquee gap={16}><span>G</span></Marquee>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue('--mq-gap')).toBe('16px');
  });

  it('spreads rest props to root element', () => {
    render(() => <Marquee data-testid="mq-root"><span>X</span></Marquee>);
    expect(screen.getByTestId('mq-root')).toBeDefined();
  });
});
