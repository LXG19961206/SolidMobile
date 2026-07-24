import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { ChatMessage } from './ChatMessage';

describe('ChatMessage', () => {
  // ── position ──
  it('renders left-positioned message', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hello" />
    ));
    expect(container.querySelector('[class*="left"]')).not.toBeNull();
  });

  it('renders right-positioned message', () => {
    const { container } = render(() => (
      <ChatMessage position="right" messageType="plainText" content="Hi" />
    ));
    expect(container.querySelector('[class*="right"]')).not.toBeNull();
  });

  // ── messageType ──
  it('renders plainText content', () => {
    render(() => <ChatMessage position="left" messageType="plainText" content="Hello world" />);
    expect(document.body.textContent).toContain('Hello world');
  });

  it('renders image message', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="image" src="test.jpg" />
    ));
    expect(container.querySelector('img')).not.toBeNull();
  });

  it('renders image fallback when no src', () => {
    render(() => <ChatMessage position="left" messageType="image" />);
    expect(document.body.textContent).toContain('🖼️');
  });

  it('renders video bubble with play overlay', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="video" src="test.mp4" />
    ));
    expect(container.querySelector('video')).not.toBeNull();
    expect(container.querySelector('polygon')).not.toBeNull(); // play icon
  });

  it('renders file message', () => {
    render(() => (
      <ChatMessage position="left" messageType="file" fileName="doc.pdf" fileSize="2.4 MB" />
    ));
    expect(document.body.textContent).toContain('doc.pdf');
    expect(document.body.textContent).toContain('2.4 MB');
  });

  it('renders custom children', () => {
    render(() => (
      <ChatMessage position="left" messageType="custom">
        <div data-testid="custom">My card</div>
      </ChatMessage>
    ));
    expect(document.querySelector('[data-testid="custom"]')).not.toBeNull();
    expect(document.body.textContent).toContain('My card');
  });

  // ── Avatar ──
  it('renders avatar image', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi" avatar="me.jpg" />
    ));
    const img = container.querySelector('img[alt="avatar"]');
    expect(img).not.toBeNull();
    expect(img!.getAttribute('src')).toBe('me.jpg');
  });

  it('renders avatar placeholder when no avatar', () => {
    render(() => <ChatMessage position="left" messageType="plainText" content="Hi" />);
    expect(document.body.textContent).toContain('?');
  });

  it('renders custom avatar JSX', () => {
    render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi"
        avatar={<span data-testid="my-avatar">🎅</span>} />
    ));
    expect(document.querySelector('[data-testid="my-avatar"]')).not.toBeNull();
    expect(document.body.textContent).toContain('🎅');
  });

  it('hides avatar when showAvatar is false', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi" showAvatar={false} avatar="me.jpg" />
    ));
    expect(container.querySelector('img[alt="avatar"]')).toBeNull();
  });

  // ── Tail ──
  it('shows tail by default', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi" />
    ));
    expect(container.querySelector('[class*="tail"]')).not.toBeNull();
  });

  it('hides tail when tail=false', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi" tail={false} />
    ));
    expect(container.querySelector('[class*="tail"]')).toBeNull();
  });

  // ── Status ──
  it('shows sent status', () => {
    render(() => (
      <ChatMessage position="right" messageType="plainText" content="Hi" status="sent" />
    ));
    expect(document.body.textContent).toContain('✓');
  });

  it('shows read status', () => {
    render(() => (
      <ChatMessage position="right" messageType="plainText" content="Hi" status="read" />
    ));
    expect(document.body.textContent).toContain('✓');
  });

  it('shows failed status with retry icon', () => {
    const { container } = render(() => (
      <ChatMessage position="right" messageType="plainText" content="Hi" status="failed" />
    ));
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('hides status for left-positioned messages', () => {
    render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi" status="read" />
    ));
    // status icon only shows for self (right)
    expect(document.body.textContent).not.toContain('✓');
  });

  // ── Name & Time ──
  it('renders name', () => {
    render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi" name="Alice" />
    ));
    expect(document.body.textContent).toContain('Alice');
  });

  it('renders time', () => {
    render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi" time="10:30" />
    ));
    expect(document.body.textContent).toContain('10:30');
  });

  // ── header / footer slots ──
  it('renders header slot instead of name', () => {
    render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi"
        name="Alice"
        header={<span data-testid="hdr">Custom Header</span>} />
    ));
    expect(document.querySelector('[data-testid="hdr"]')).not.toBeNull();
    expect(document.body.textContent).toContain('Custom Header');
    expect(document.body.textContent).not.toContain('Alice');
  });

  it('renders footer slot instead of time', () => {
    render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi"
        time="10:30"
        footer={<span data-testid="ftr">Custom Footer</span>} />
    ));
    expect(document.querySelector('[data-testid="ftr"]')).not.toBeNull();
    expect(document.body.textContent).toContain('Custom Footer');
    expect(document.body.textContent).not.toContain('10:30');
  });

  // ── File icon resolution ──
  it('uses * fallback for unknown file type', () => {
    render(() => (
      <ChatMessage position="left" messageType="file" fileName="data.xyz" />
    ));
    // xyz not in DEFAULT_ICON_MAP → falls back to '*' → 📎
    expect(document.body.textContent).toContain('📎');
  });

  it('uses built-in default icon for known types', () => {
    render(() => (
      <ChatMessage position="left" messageType="file" fileName="report.pdf" />
    ));
    expect(document.body.textContent).toContain('📄');
  });

  it('uses iconMap for file extension', () => {
    render(() => (
      <ChatMessage position="left" messageType="file" fileName="doc.pdf"
        iconMap={{ pdf: '📄' }} />
    ));
    expect(document.body.textContent).toContain('📄');
  });

  it('falls back to * in iconMap', () => {
    render(() => (
      <ChatMessage position="left" messageType="file" fileName="data.xyz"
        iconMap={{ '*': '📎' }} />
    ));
    expect(document.body.textContent).toContain('📎');
  });

  // ── Progress ──
  it('renders progress bar when progress is set', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="file" fileName="doc.pdf" progress={65} />
    ));
    expect(container.querySelector('[class*="progressBar"]')).not.toBeNull();
  });

  it('hides progress bar when progress is not set', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="file" fileName="doc.pdf" />
    ));
    expect(container.querySelector('[class*="progressBar"]')).toBeNull();
  });

  // ── CSS variables ──
  it('applies bgColor', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi" bgColor="#ff0000" />
    ));
    const bubble = container.querySelector('[class*="bubble"]') as HTMLElement;
    expect(bubble).not.toBeNull();
  });

  it('applies maxWidth', () => {
    const { container } = render(() => (
      <ChatMessage position="left" messageType="plainText" content="Hi" maxWidth="50%" />
    ));
    const body = container.querySelector('[class*="body"]') as HTMLElement;
    expect(body).not.toBeNull();
  });
});
