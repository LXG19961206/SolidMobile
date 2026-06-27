import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { Row, Col } from './Layout';

describe('Row', () => {
  it('renders children', () => {
    render(() => <Row><span>hi</span></Row>);
    expect(document.body.textContent).toContain('hi');
  });

  it('applies wrap class', () => {
    const { container } = render(() => <Row wrap><span>a</span></Row>);
    expect(container.firstElementChild!.className).toContain('wrap');
  });

  it('applies align class', () => {
    const { container } = render(() => <Row align="center"><span>a</span></Row>);
    expect(container.firstElementChild!.className).toContain('alignCenter');
  });

  it('applies gap as px', () => {
    const { container } = render(() => <Row gap={12}><span>a</span><span>b</span></Row>);
    expect(container.firstElementChild!.getAttribute('style')).toContain('12px');
  });
});

describe('Col', () => {
  it('renders children', () => {
    render(() => <Col><span>hi</span></Col>);
    expect(document.body.textContent).toContain('hi');
  });

  it('applies span class', () => {
    const { container } = render(() => <Col span={6}><span>a</span></Col>);
    expect(container.firstElementChild!.className).toContain('span6');
  });

  it('applies offset class', () => {
    const { container } = render(() => <Col span={12} offset={6}><span>a</span></Col>);
    expect(container.firstElementChild!.className).toContain('offset6');
  });
});
