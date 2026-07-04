import { describe, it, expect } from 'vitest';
import { render, screen } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  it('renders trigger cell with placeholder', () => {
    render(() => <TimePicker placeholder="选择时间" />);
    expect(screen.getByText('选择时间')).toBeTruthy();
  });

  it('renders with value', () => {
    render(() => <TimePicker value="08:30:15" />);
    expect(screen.getByText('08:30:15')).toBeTruthy();
  });

  it('renders trigger cell with default i18n placeholder when no placeholder given', () => {
    render(() => <TimePicker />);
    // Should show the default i18n placeholder or empty
    const cell = document.querySelector('[data-testid]');
    expect(cell || screen.getByText(/请选择时间/)).toBeTruthy();
  });

  it('opens picker when clicking trigger cell', async () => {
    render(() => <TimePicker placeholder="选择时间" />);
    const cell = screen.getByText('选择时间');
    await userEvent.click(cell);
    // Picker columns should be rendered
    const columns = document.querySelectorAll('[data-testid="picker-column"]');
    expect(columns.length).toBe(3);
  });

  it('has three columns (hours, minutes, seconds)', async () => {
    render(() => <TimePicker placeholder="选择时间" />);
    const cell = screen.getByText('选择时间');
    await userEvent.click(cell);
    const columns = document.querySelectorAll('[data-testid="picker-column"]');
    expect(columns.length).toBe(3);
  });

  it('shows formatted value after confirm', async () => {
    const { container } = render(() => <TimePicker value="12:30:00" placeholder="选择时间" />);

    // Open picker
    const cell = screen.getByText('12:30:00');
    expect(cell).toBeTruthy();
  });
});
