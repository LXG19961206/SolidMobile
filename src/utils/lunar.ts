/**
 * 农历计算工具 (1900–2100)。
 *
 * 数据格式：每个农历年用 1 个 32-bit 整数编码
 *   bits  0–3  : 闰月 (1–12，0 = 无闰月)
 *   bits  4–15 : 1–12 月天数 (0=29 天, 1=30 天)，bit N → 第 N-3 月
 *   bit  16    : 闰月天数 (1=30 天, 0=29 天)
 *
 * 以 1900-01-31 为基准日（农历 1900 年正月初一），
 * 逐日累加进行公历 ↔ 农历换算。
 */

/* ── 农历数据表 (1900-2100) ── */

const LUNAR_INFO: number[] = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06aa0, 0x1a6c4, 0x0aae0,
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a4d0, 0x0d150, 0x0f252, 0x0d520,
];

const START_YEAR = 1900;
const BASE_DATE = new Date(1900, 0, 31); // 1900-01-31 = 农历 1900 年正月初一

/* ── 天干地支 / 生肖 ── */

const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

const LUNAR_MONTH_NAMES = [
  '', '正月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '冬月', '腊月',
];

const LUNAR_DAY_NAMES: string[] = (() => {
  const a = [''];
  a.push('初一','初二','初三','初四','初五','初六','初七','初八','初九','初十');
  a.push('十一','十二','十三','十四','十五','十六','十七','十八','十九','二十');
  a.push('廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十');
  return a;
})();

/* ── 24 节气 ── */

const SOLAR_TERMS = [
  '小寒','大寒','立春','雨水','惊蛰','春分',
  '清明','谷雨','立夏','小满','芒种','夏至',
  '小暑','大暑','立秋','处暑','白露','秋分',
  '寒露','霜降','立冬','小雪','大雪','冬至',
];

/**
 * 2024 年基准节气表 (月/日)，每月日期的年际变化 ≤ ±1 天。
 * 其他年份用近似公式：基准日期 + round((year - 2024) * 0.2422)。
 */
const BASE_TERMS_2024: [number, number][] = [
  [1, 6], [1, 20], [2, 4], [2, 19], [3, 5], [3, 20],
  [4, 4], [4, 19], [5, 5], [5, 20], [6, 5], [6, 21],
  [7, 6], [7, 22], [8, 7], [8, 22], [9, 7], [9, 22],
  [10, 8], [10, 23], [11, 7], [11, 22], [12, 6], [12, 21],
];

function calcSolarTermDate(year: number, termIdx: number): Date {
  const [baseM, baseD] = BASE_TERMS_2024[termIdx];
  // 年际漂移：约每 4 年前进 1 天（365.2422-365 = 0.2422 天/年）
  const drift = Math.round((year - 2024) * 0.2422);
  const baseDate = new Date(2024, baseM - 1, baseD);
  const result = new Date(baseDate);
  result.setFullYear(year);
  result.setDate(result.getDate() + drift);
  return result;
}

/* ── 数据解码 ── */

function leapMonth(year: number): number {
  return LUNAR_INFO[year - START_YEAR] & 0xf;
}

/** 第 month 月 (1–12) 的天数 */
function monthDays(year: number, month: number): number {
  const info = LUNAR_INFO[year - START_YEAR];
  return (info & (1 << (3 + month))) ? 30 : 29;
}

/** 闰月天数 */
function leapDays(year: number): number {
  const info = LUNAR_INFO[year - START_YEAR];
  if ((info & 0xf) === 0) return 0;
  return (info & 0x10000) ? 30 : 29;
}

/** 农历年总天数 */
function yearDays(year: number): number {
  let d = 0;
  const info = LUNAR_INFO[year - START_YEAR];
  for (let m = 1; m <= 12; m++) {
    d += (info & (1 << (3 + m))) ? 30 : 29;
  }
  d += leapDays(year);
  return d;
}

/* ── 导出类型 ── */

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  yearName: string;
  monthName: string;
  dayName: string;
  solarTerm: string | null;
  zodiac: string;
}

/* ═══════════════════════════════════════════════════════════
   公历 → 农历
   ═══════════════════════════════════════════════════════════ */

export function solarToLunar(date: Date): LunarDate {
  // 距基准日的偏移天数。使用 UTC 避免时区干扰。
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const baseUtc = Date.UTC(BASE_DATE.getFullYear(), BASE_DATE.getMonth(), BASE_DATE.getDate());
  let offset = Math.floor((utc - baseUtc) / 86400000);

  if (offset < 0) {
    offset = 0;
  }

  // 逐农历年跳过
  let lunarYear = START_YEAR;
  while (lunarYear < START_YEAR + LUNAR_INFO.length) {
    const yd = yearDays(lunarYear);
    if (offset < yd) break;
    offset -= yd;
    lunarYear++;
  }

  // 逐月定位
  const leap = leapMonth(lunarYear);
  let lunarMonth = 1;
  let isLeap = false;

  for (let m = 1; m <= 12; m++) {
    const md = monthDays(lunarYear, m);
    if (offset < md) {
      lunarMonth = m;
      break;
    }
    offset -= md;
    lunarMonth = m + 1;

    // 闰月
    if (m === leap) {
      const lmd = leapDays(lunarYear);
      if (offset < lmd) {
        lunarMonth = m;
        isLeap = true;
        break;
      }
      offset -= lmd;
    }
  }

  if (lunarMonth > 12) lunarMonth = 12;

  const lunarDay = offset + 1;

  // 天干地支纪年 (以正月初一为界)
  const stemIdx = (lunarYear - 4) % 10;
  const branchIdx = (lunarYear - 4) % 12;

  // 节气
  let term: string | null = null;
  const targetTime = date.getTime();
  for (let i = 0; i < 24; i++) {
    const t = calcSolarTermDate(date.getFullYear(), i);
    const diff = Math.abs(targetTime - t.getTime()) / 86400000;
    if (diff < 1.5) {
      term = SOLAR_TERMS[i];
      break;
    }
  }

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeapMonth: isLeap,
    yearName: HEAVENLY_STEMS[stemIdx] + EARTHLY_BRANCHES[branchIdx],
    monthName: (isLeap ? '闰' : '') + LUNAR_MONTH_NAMES[lunarMonth],
    dayName: LUNAR_DAY_NAMES[lunarDay] || '',
    solarTerm: term,
    zodiac: ZODIAC[branchIdx],
  };
}

export { HEAVENLY_STEMS, EARTHLY_BRANCHES, ZODIAC, SOLAR_TERMS };
