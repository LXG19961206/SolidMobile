import { describe, it, expect } from 'vitest';
import { render } from '@solidjs/testing-library';
import { TreeSelect } from './TreeSelect';

const opts = [
  { label: 'East', value: 'east', children: [
    { label: 'Shanghai', value: 'sh' },
    { label: 'Zhejiang', value: 'zj' },
  ]},
  { label: 'West', value: 'west', children: [
    { label: 'Sichuan', value: 'sc' },
  ]},
];

describe('TreeSelect', () => {
  it('renders placeholder when no value', () => {
    render(() => <TreeSelect options={opts} placeholder="Pick" />);
    expect(document.body.textContent).toContain('Pick');
  });

  it('renders selected count', () => {
    render(() => <TreeSelect options={opts} value={['sh', 'zj']} />);
    expect(document.body.textContent).toContain('2');
  });

  it('opens overlay on click', async () => {
    const { container } = render(() => <TreeSelect options={opts} />);
    const trigger = container.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    // overlay content should appear
    await new Promise(r => setTimeout(r, 50));
    expect(document.querySelector('[class*="content"]')).not.toBeNull();
  });

  it('renders options with expand arrows for parents', async () => {
    const { container } = render(() => <TreeSelect options={opts} />);
    const trigger = container.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await new Promise(r => setTimeout(r, 50));
    expect(document.body.textContent).toContain('East');
    expect(document.body.textContent).toContain('West');
    // parent nodes have expand zone
    expect(document.querySelectorAll('[class*="itemExpand"]').length).toBeGreaterThan(0);
  });

  it('shows select all option', async () => {
    const { container } = render(() => <TreeSelect options={opts} />);
    const trigger = container.querySelector('[class*="trigger"]') as HTMLElement;
    trigger.click();
    await new Promise(r => setTimeout(r, 50));
    expect(document.body.textContent).toContain('Select All');
  });
});
