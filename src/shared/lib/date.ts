/**
 * Month helpers for budget filtering.
 *
 * The app reports in Nicaragua time. Nicaragua is UTC-6 year-round (it does not
 * observe daylight saving), so we can express it as a fixed offset. The DB
 * stores transaction_date as timestamptz (always UTC internally); month ranges
 * are built as NI-midnight instants so a transaction late on the last evening
 * of a month is bucketed into that month, not the next.
 */
export const APP_TIME_ZONE = 'America/Managua'
const APP_UTC_OFFSET = '-06:00'

const pad = (n: number) => String(n).padStart(2, '0')

/** "2024-08" — stable key for caching and <input type="month"> values. */
export const monthKey = (date: Date): string => `${date.getFullYear()}-${pad(date.getMonth() + 1)}`

/**
 * First instant of the month and of the next month, as ISO strings anchored to
 * Nicaragua time, e.g. "2026-06-01T00:00:00-06:00". Safe to pass straight to a
 * timestamptz comparison.
 */
export const monthRange = (date: Date): { start: string; end: string } => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const nextYear = month === 11 ? year + 1 : year
  const nextMonth = month === 11 ? 0 : month + 1
  const start = `${year}-${pad(month + 1)}-01T00:00:00${APP_UTC_OFFSET}`
  const end = `${nextYear}-${pad(nextMonth + 1)}-01T00:00:00${APP_UTC_OFFSET}`
  return { start, end }
}

/** Returns a new Date at the first day of the month `delta` months away. */
export const addMonths = (date: Date, delta: number): Date =>
  new Date(date.getFullYear(), date.getMonth() + delta, 1)

/** "August 2024" — human label for the month selector. */
export const formatMonthLabel = (date: Date): string =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)

/** Parse a "YYYY-MM" value (from <input type="month">) into a first-of-month Date. */
export const monthFromInputValue = (value: string): Date => {
  const [year, month] = value.split('-').map(Number)
  return new Date(year, month - 1, 1)
}
