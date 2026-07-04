import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Button } from './Button';

describe('Button', () => {
  /* ---------------------------------------------------------------------- */
  /*  Rendering                                                              */
  /* ---------------------------------------------------------------------- */

  it('renders as a <button> by default', () => {
    render(() => <Button>Click</Button>);
    expect(screen.getByRole('button').tagName).toBe('BUTTON');
  });

  it('renders as an <a> when href is provided', () => {
    render(() => <Button href="/page">Link</Button>);
    const el = screen.getByRole('button');
    expect(el.tagName).toBe('A');
    expect(el.getAttribute('href')).toBe('/page');
  });

  it('sets target and rel on link mode', () => {
    render(() => <Button href="/page" target="_blank">Link</Button>);
    const el = screen.getByRole('button');
    expect(el.getAttribute('target')).toBe('_blank');
    expect(el.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('renders text prop as content', () => {
    render(() => <Button text="Submit" />);
    expect(screen.getByText('Submit')).toBeDefined();
  });

  it('renders children when no text prop', () => {
    render(() => <Button><span data-testid="child">Hi</span></Button>);
    expect(screen.getByTestId('child')).toBeDefined();
  });

  it('text prop takes precedence over children for display', () => {
    render(() => <Button text="A"><span>B</span></Button>);
    expect(screen.getByText('A')).toBeDefined();
  });

  /* ---------------------------------------------------------------------- */
  /*  Types & Variants                                                        */
  /* ---------------------------------------------------------------------- */

  it.each(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const)(
    'applies %s type class',
    (type) => {
      render(() => <Button type={type}>{type}</Button>);
      expect(screen.getByRole('button').className).toContain(type);
    },
  );

  it.each(['solid', 'outline', 'ghost'] as const)(
    'applies %s variant class',
    (variant) => {
      render(() => <Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole('button').className).toContain(variant);
    },
  );

  it.each(['xs', 'sm', 'md', 'lg'] as const)('applies %s size class', (size) => {
    render(() => <Button size={size}>{size}</Button>);
    expect(screen.getByRole('button').className).toContain(size);
  });

  it('default type is primary', () => {
    render(() => <Button>Default</Button>);
    expect(screen.getByRole('button').className).toContain('primary');
  });

  it('default variant is solid', () => {
    render(() => <Button>Default</Button>);
    expect(screen.getByRole('button').className).toContain('solid');
  });

  it('default size is md', () => {
    render(() => <Button>Default</Button>);
    expect(screen.getByRole('button').className).toContain('md');
  });

  /* ---------------------------------------------------------------------- */
  /*  Modifiers                                                              */
  /* ---------------------------------------------------------------------- */

  it('applies block class', () => {
    render(() => <Button block>Full</Button>);
    expect(screen.getByRole('button').className).toContain('block');
  });

  it('applies round class', () => {
    render(() => <Button round>Pill</Button>);
    expect(screen.getByRole('button').className).toContain('round');
  });

  it('outline variant with danger type', () => {
    render(() => <Button type="danger" variant="outline">Delete</Button>);
    const cls = screen.getByRole('button').className;
    expect(cls).toContain('danger');
    expect(cls).toContain('outline');
  });

  /* ---------------------------------------------------------------------- */
  /*  Color Overrides                                                        */
  /* ---------------------------------------------------------------------- */

  it('sets custom background color via CSS custom property', () => {
    render(() => <Button color="#ff0000">Red</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.getPropertyValue('--_btn-custom-bg')).toBe('#ff0000');
  });

  it('sets custom text color via CSS custom property', () => {
    render(() => <Button textColor="#00ff00">Green</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.getPropertyValue('--_btn-custom-text')).toBe('#00ff00');
  });

  /* ---------------------------------------------------------------------- */
  /*  Icon                                                                   */
  /* ---------------------------------------------------------------------- */

  it('renders icon on the left by default', () => {
    render(() => <Button icon={<span data-testid="ico">*</span>}>Text</Button>);
    expect(screen.getByTestId('ico')).toBeDefined();
    // Icon wrapper should appear before text content in DOM order
    const btn = screen.getByRole('button');
    expect(btn.querySelector('[data-testid="ico"]')).toBeDefined();
  });

  it('renders icon on the right when iconPosition="right"', () => {
    render(() => (
      <Button icon={<span data-testid="ico">*</span>} iconPosition="right">
        Text
      </Button>
    ));
    expect(screen.getByTestId('ico')).toBeDefined();
  });

  it('hides icon when loading', () => {
    render(() => (
      <Button loading icon={<span data-testid="ico">*</span>}>
        Loading
      </Button>
    ));
    expect(screen.queryByTestId('ico')).toBeNull();
  });

  /* ---------------------------------------------------------------------- */
  /*  Disabled State                                                         */
  /* ---------------------------------------------------------------------- */

  it('sets disabled attribute on button', () => {
    render(() => <Button disabled>Nope</Button>);
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('sets aria-disabled on link mode', () => {
    render(() => <Button href="/x" disabled>Nope</Button>);
    expect(screen.getByRole('button').getAttribute('aria-disabled')).toBe('true');
  });

  it('does not fire onClick when disabled', () => {
    const fn = vi.fn();
    render(() => <Button onClick={fn} disabled>Nope</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(fn).not.toHaveBeenCalled();
  });

  /* ---------------------------------------------------------------------- */
  /*  Loading State                                                          */
  /* ---------------------------------------------------------------------- */

  it('disables the button when loading', () => {
    render(() => <Button loading>Wait</Button>);
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('sets aria-busy when loading', () => {
    render(() => <Button loading>Wait</Button>);
    expect(screen.getByRole('button').getAttribute('aria-busy')).toBe('true');
  });

  it('shows spinner when loading', () => {
    render(() => <Button loading>Wait</Button>);
    const btn = screen.getByRole('button');
    expect(btn.querySelector('[aria-hidden="true"]')).toBeDefined();
  });

  it('shows loadingText instead of normal text', () => {
    render(() => <Button loading loadingText="Saving...">Save</Button>);
    expect(screen.getByText('Saving...')).toBeDefined();
    expect(screen.queryByText('Save')).toBeNull();
  });

  it('does not fire onClick when loading', () => {
    const fn = vi.fn();
    render(() => <Button onClick={fn} loading>Wait</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(fn).not.toHaveBeenCalled();
  });

  /* ---------------------------------------------------------------------- */
  /*  Native Type                                                            */
  /* ---------------------------------------------------------------------- */

  it('sets type="submit" when nativeType="submit"', () => {
    render(() => <Button nativeType="submit">Submit</Button>);
    expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
  });

  it('defaults to type="button"', () => {
    render(() => <Button>Btn</Button>);
    expect(screen.getByRole('button').getAttribute('type')).toBe('button');
  });

  /* ---------------------------------------------------------------------- */
  /*  Events                                                                 */
  /* ---------------------------------------------------------------------- */

  it('fires onClick handler', () => {
    const fn = vi.fn();
    render(() => <Button onClick={fn}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(fn).toHaveBeenCalledOnce();
  });

  /* ---------------------------------------------------------------------- */
  /*  Custom class / style                                                   */
  /* ---------------------------------------------------------------------- */

  it('accepts custom class', () => {
    render(() => <Button class="my-btn">Custom</Button>);
    expect(screen.getByRole('button').className).toContain('my-btn');
  });

  it('accepts style object', () => {
    render(() => <Button style={{ margin: '8px' }}>Styled</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.margin).toBe('8px');
  });
});
