import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { DatePicker } from './DatePicker';
import { formatDate, parseDate, daysInMonth, clampDay } from './date-utils';

describe('DatePicker', () => {
  it('renders trigger Cell by default (auto mode)', () => {
    render(() => <DatePicker />);
    // Should render a clickable trigger cell instead of being empty
    expect(screen.getByText('请选择日期')).toBeDefined();
  });

  it('opens picker panel when trigger is clicked', async () => {
    render(() => <DatePicker />);
    fireEvent.click(screen.getByText('请选择日期'));
    // After clicking, the Picker should render columns
    const columns = document.body.querySelectorAll('[data-testid="picker-column"]');
    expect(columns.length).toBe(3);
  });

  it('renders 3 columns for date type when open', async () => {
    render(() => <DatePicker />);
    fireEvent.click(screen.getByText('请选择日期'));
    const columns = document.body.querySelectorAll('[data-testid="picker-column"]');
    expect(columns.length).toBe(3);
  });

  it('renders 2 columns for year-month type when open', async () => {
    render(() => <DatePicker type="year-month" />);
    fireEvent.click(screen.getByText('请选择日期'));
    const columns = document.body.querySelectorAll('[data-testid="picker-column"]');
    expect(columns.length).toBe(2);
  });

  it('calls onConfirm with formatted date', async () => {
    const onConfirm = vi.fn();
    render(() => <DatePicker value="2024-03-15" onConfirm={onConfirm} />);

    // Open the picker
    fireEvent.click(screen.getByText('2024-03-15'));

    // Wait for Picker async value sync
    await new Promise((r) => setTimeout(r, 0));

    // Click confirm
    fireEvent.click(screen.getByText('确认'));
    expect(onConfirm).toHaveBeenCalledWith('2024-03-15');
  });

  it('calls onCancel when cancel clicked', async () => {
    const onCancel = vi.fn();
    render(() => <DatePicker onCancel={onCancel} />);

    fireEvent.click(screen.getByText('请选择日期'));
    await new Promise((r) => setTimeout(r, 0));

    fireEvent.click(screen.getByText('取消'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('uses controlled show mode when show prop is provided', () => {
    const { container } = render(() => <DatePicker show={false} />);
    // No trigger in controlled mode
    expect(container.innerHTML).toBe('');
  });

  it('shows panel when controlled show is true', () => {
    render(() => <DatePicker show />);
    const columns = document.body.querySelectorAll('[data-testid="picker-column"]');
    expect(columns.length).toBe(3);
  });
});

describe('Date utils', () => {
  it('formatDate and parseDate are reversible', () => {
    const date = formatDate(2024, 3, 15);
    expect(date).toBe('2024-03-15');
    const parsed = parseDate(date);
    expect(parsed).toEqual([2024, 3, 15]);
  });

  it('parseDate returns null for invalid date', () => {
    expect(parseDate('not-a-date')).toBeNull();
    expect(parseDate('2024-13-01')).toBeNull();
    expect(parseDate('2024-02-30')).toBeNull();
  });

  it('daysInMonth returns correct days', () => {
    expect(daysInMonth(2024, 2)).toBe(29); // leap year
    expect(daysInMonth(2023, 2)).toBe(28);
    expect(daysInMonth(2024, 1)).toBe(31);
    expect(daysInMonth(2024, 4)).toBe(30);
  });

  it('clampDay clamps to valid range', () => {
    expect(clampDay(2024, 2, 30)).toBe(29);
    expect(clampDay(2023, 2, 30)).toBe(28);
    expect(clampDay(2024, 3, 15)).toBe(15);
    expect(clampDay(2024, 3, 0)).toBe(1);
  });
});
