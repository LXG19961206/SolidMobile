/** 获取某月的天数 */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** 范围生成数字数组 [start, end] */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/** 格式化日期为 YYYY-MM-DD */
export function formatDate(year: number, month: number, day: number): string {
  const y = String(year).padStart(4, '0');
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 解析 YYYY-MM-DD 字符串为 [year, month, day]，不合法时返回 null */
export function parseDate(str: string): [number, number, number] | null {
  const parts = str.split(/[-/]/).map(Number);
  if (parts.length !== 3) return null;
  const [y, m, d] = parts;
  if (!y || !m || !d) return null;
  if (m < 1 || m > 12) return null;
  if (d < 1 || d > daysInMonth(y, m)) return null;
  return [y, m, d];
}

/** 解析 startDate/endDate 为 [year, month, day]，默认补全 */
export function parseDateRange(str: string): [number, number, number] {
  const parts = str.split(/[-/]/).map(Number);
  const y = parts[0] || 2014;
  const m = parts[1] || 1;
  const d = parts[2] || 1;
  return [y, Math.min(Math.max(m, 1), 12), Math.min(Math.max(d, 1), daysInMonth(y, m))];
}

/** 剪裁 day 到当月的有效范围 */
export function clampDay(year: number, month: number, day: number): number {
  return Math.min(Math.max(day, 1), daysInMonth(year, month));
}
