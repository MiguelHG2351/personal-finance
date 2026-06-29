import { currencySymbol } from './currency'
import { APP_TIME_ZONE } from './date'

/**
 * Format a number as currency, e.g. formatCurrency(1234.5) -> "$1,234.50",
 * formatCurrency(-1295, 'NIO') -> "-C$1,295.00". Defaults to USD.
 */
export const formatCurrency = (value: number, currency = 'USD'): string => {
  const symbol = currencySymbol(currency)
  const amount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value))
  const sign = value < 0 ? '-' : ''
  return `${sign}${symbol}${amount}`
}

/** Format an ISO date string as "11 Aug 2024" in Nicaragua time. */
export const formatShortDate = (isoDate: string): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: APP_TIME_ZONE,
  }).format(new Date(isoDate))
