export const isLeapYear = (year: number) => (!(year % 4) && year % 100) || !(year % 400)

const largeMonth = [1, 3, 5, 7, 8, 10, 12]

export const getDays = (
  year: number,
  month: number,
) => (
  isLeapYear(year) && month === 2
    ? 29 : month === 2
      ? 28 : largeMonth.includes(month)
        ? 31 : 30
)