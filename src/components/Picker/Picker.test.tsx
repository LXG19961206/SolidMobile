import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Picker } from './Picker';
import type { PickerOption } from './types';

/* ── Test Data ── */

const treeColumns: PickerOption[] = [
  {
    text: '北京', value: 'bj',
    children: [
      { text: '海淀', value: 'hd' },
      { text: '朝阳', value: 'cy' },
    ],
  },
  {
    text: '上海', value: 'sh',
    children: [
      { text: '浦东', value: 'pd' },
      { text: '静安', value: 'ja' },
    ],
  },
  { text: '深圳', value: 'sz', children: [] },
];

const flatColumns: PickerOption[][] = [
  [
    { text: '2024年', value: 2024 },
    { text: '2025年', value: 2025 },
  ],
  [
    { text: '1月', value: 1 },
    { text: '2月', value: 2 },
    { text: '3月', value: 3 },
  ],
  [
    { text: '1日', value: 1 },
    { text: '2日', value: 2 },
  ],
];

describe('Picker', () => {
  /* ────────────────────────────────────────────────────────
     Rendering
     ──────────────────────────────────────────────────────── */

  it('renders when show=true', () => {
    render(() => <Picker columns={flatColumns} show={true} />);
    expect(screen.getByText('2024年')).toBeDefined();
  });

  it('does not render when show=false', () => {
    render(() => <Picker columns={flatColumns} show={false} />);
    expect(screen.queryByText('2024年')).toBeNull();
  });

  it('renders title', () => {
    render(() => <Picker columns={flatColumns} show={true} title="选择日期" />);
    expect(screen.getByText('选择日期')).toBeDefined();
  });

  it('renders confirm and cancel buttons with default i18n', () => {
    render(() => <Picker columns={flatColumns} show={true} />);
    expect(screen.getByText('确认')).toBeDefined();
    expect(screen.getByText('取消')).toBeDefined();
  });

  it('renders custom confirm/cancel text', () => {
    render(() => <Picker columns={flatColumns} show={true} confirmText="OK" cancelText="Back" />);
    expect(screen.getByText('OK')).toBeDefined();
    expect(screen.getByText('Back')).toBeDefined();
  });

  /* ────────────────────────────────────────────────────────
     Flat Multi-Column
     ──────────────────────────────────────────────────────── */

  it('renders all columns for flat data', () => {
    render(() => <Picker columns={flatColumns} show={true} />);
    // All items from all columns should be in the DOM
    expect(screen.getByText('2024年')).toBeDefined();
    expect(screen.getByText('2025年')).toBeDefined();
    expect(screen.getByText('1月')).toBeDefined();
    expect(screen.getByText('1日')).toBeDefined();
  });

  it('renders correct number of column containers', () => {
    render(() => <Picker columns={flatColumns} show={true} />);
    // 3 columns for the flat data (portalled to document.body)
    const cols = document.body.querySelectorAll('[data-testid="picker-column"]');
    expect(cols.length).toBe(3);
  });

  /* ────────────────────────────────────────────────────────
     Tree Data (Cascading)
     ──────────────────────────────────────────────────────── */

  it('renders tree data — first level items are visible', () => {
    render(() => <Picker columns={treeColumns} show={true} />);
    expect(screen.getByText('北京')).toBeDefined();
    expect(screen.getByText('上海')).toBeDefined();
    expect(screen.getByText('深圳')).toBeDefined();
  });

  it('renders children of first selected tree item on mount', () => {
    render(() => <Picker columns={treeColumns} show={true} />);
    // 默认选中第一项 (北京)，其 children 应该可见
    expect(screen.queryByText('海淀')).not.toBeNull();
    expect(screen.queryByText('朝阳')).not.toBeNull();
  });

  /* ────────────────────────────────────────────────────────
     Value (Controlled)
     ──────────────────────────────────────────────────────── */

  it('accepts controlled value prop for tree data', () => {
    const [value] = createSignal(['bj', 'hd']);
    render(() => <Picker columns={treeColumns} show={true} value={value()} />);
    // With value ['bj', 'hd'], the second level should show 海淀 and 朝阳
    // (the component renders both levels since we set value)
    // At minimum, the items exist in the DOM
  });

  /* ────────────────────────────────────────────────────────
     Events
     ──────────────────────────────────────────────────────── */

  it('calls onConfirm with selected items and values', () => {
    const onConfirm = vi.fn();
    render(() => <Picker columns={treeColumns} show={true} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText('确认'));
    expect(onConfirm).toHaveBeenCalledTimes(1);

    const [items, vals] = onConfirm.mock.calls[0];
    expect(Array.isArray(items)).toBe(true);
    expect(Array.isArray(vals)).toBe(true);
  });

  it('calls onCancel', () => {
    const onCancel = vi.fn();
    render(() => <Picker columns={treeColumns} show={true} onCancel={onCancel} />);
    fireEvent.click(screen.getByText('取消'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('cancel calls onUpdateShow with false', () => {
    const onUpdateShow = vi.fn();
    render(() => (
      <Picker columns={treeColumns} show={true} onUpdateShow={onUpdateShow} />
    ));
    fireEvent.click(screen.getByText('取消'));
    expect(onUpdateShow).toHaveBeenCalledWith(false);
  });

  it('confirm calls onUpdateShow with false', () => {
    const onUpdateShow = vi.fn();
    render(() => (
      <Picker columns={treeColumns} show={true} onUpdateShow={onUpdateShow} />
    ));
    fireEvent.click(screen.getByText('确认'));
    expect(onUpdateShow).toHaveBeenCalledWith(false);
  });

  /* ────────────────────────────────────────────────────────
     Disabled Items
     ──────────────────────────────────────────────────────── */

  it('renders disabled items with disabled class', () => {
    const cols: PickerOption[][] = [[
      { text: '正常', value: 'a' },
      { text: '禁用', value: 'b', disabled: true },
    ]];
    render(() => <Picker columns={cols} show={true} />);
    // Portalled to document.body
    const disabled = document.body.querySelector('[class*="itemDisabled"]');
    expect(disabled).not.toBeNull();
    expect(disabled?.textContent).toBe('禁用');
  });

  /* ────────────────────────────────────────────────────────
     Placeholders
     ──────────────────────────────────────────────────────── */

  it('renders placeholder items when placeholders prop is set', () => {
    render(() => (
      <Picker columns={flatColumns} show={true} placeholders="请选择" />
    ));
    // Portalled to document.body
    const ph = document.body.querySelectorAll('[class*="placeholderItem"]');
    expect(ph.length).toBeGreaterThan(0);
  });

  /* ────────────────────────────────────────────────────────
     Edge Cases
     ──────────────────────────────────────────────────────── */

  it('handles empty columns gracefully', () => {
    render(() => <Picker columns={[]} show={true} />);
    // Should render without crashing — just an empty sheet
    expect(screen.getByText('确认')).toBeDefined();
  });

  it('handles single-option column', () => {
    const cols: PickerOption[][] = [[
      { text: '唯一', value: 'only' },
    ]];
    render(() => <Picker columns={cols} show={true} />);
    expect(screen.getByText('唯一')).toBeDefined();
  });
});
