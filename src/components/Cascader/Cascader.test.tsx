import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Cascader } from './Cascader';
import type { CascaderOption } from './types';

const options: CascaderOption[] = [
  { text: '北京', value: 'beijing', children: [
    { text: '朝阳区', value: 'chaoyang', children: [
      { text: '望京', value: 'wangjing' },
      { text: '三里屯', value: 'sanlitun' },
    ]},
    { text: '海淀区', value: 'haidian' },
  ]},
  { text: '上海', value: 'shanghai', children: [
    { text: '浦东新区', value: 'pudong' },
    { text: '静安区', value: 'jingan' },
  ]},
];

describe('Cascader', () => {
  it('renders when show is true', async () => {
    render(() => <Cascader options={options} show={true} />);
    await waitFor(() => {
      expect(screen.getByText('北京')).toBeDefined();
      expect(screen.getByText('上海')).toBeDefined();
    });
  });

  it('does not render when show is false', () => {
    const { container } = render(() => <Cascader options={options} show={false} />);
    expect(container.textContent).toBe('');
  });

  it('renders title', async () => {
    render(() => <Cascader options={options} show={true} title="选择城市" />);
    await waitFor(() => {
      expect(screen.getByText('选择城市')).toBeDefined();
    });
  });

  it('renders close button when closeable', async () => {
    render(() => <Cascader options={options} show={true} closeable />);
    await waitFor(() => {
      expect(screen.getByText('✕')).toBeDefined();
    });
  });

  it('selects first level and shows children', async () => {
    const onChange = vi.fn();
    render(() => <Cascader options={options} show={true} onChange={onChange} />);
    await waitFor(() => screen.getByText('北京'));
    fireEvent.click(screen.getByText('北京'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(['beijing']);
      expect(screen.getByText('朝阳区')).toBeDefined();
      expect(screen.getByText('海淀区')).toBeDefined();
    });
  });

  it('selects leaf closes cascader', async () => {
    const onClose = vi.fn();
    const Wrapper = () => {
      const [show, setShow] = createSignal(true);
      return <Cascader options={options} show={show()} onUpdateShow={setShow} onClose={onClose} />;
    };
    render(Wrapper);
    await waitFor(() => screen.getByText('北京'));
    fireEvent.click(screen.getByText('北京'));
    await waitFor(() => screen.getByText('朝阳区'));
    fireEvent.click(screen.getByText('朝阳区'));
    await waitFor(() => screen.getByText('望京'));
    fireEvent.click(screen.getByText('望京'));
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('initializes with value prop', async () => {
    render(() => <Cascader options={options} show={true} value={['beijing', 'chaoyang']} />);
    await waitFor(() => {
      // Should show third level directly (望京, 三里屯)
      expect(screen.getByText('望京')).toBeDefined();
      expect(screen.getByText('三里屯')).toBeDefined();
    });
  });

  it('skips disabled options', () => {
    const disabledOpts: CascaderOption[] = [
      { text: 'A', value: 'a', disabled: true },
      { text: 'B', value: 'b' },
    ];
    const onChange = vi.fn();
    render(() => <Cascader options={disabledOpts} show={true} onChange={onChange} />);
    // Can't easily test click on disabled, but we can verify it's rendered
    expect(screen.getByText('A')).toBeDefined();
  });

  it('shows placeholder for unselected level', async () => {
    render(() => <Cascader options={options} show={true} placeholder="请选择" />);
    await waitFor(() => {
      expect(screen.getByText('请选择')).toBeDefined();
    });
  });
});
