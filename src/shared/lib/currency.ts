/** Single source of truth for the currencies the app supports. */
export interface CurrencyMeta {
  code: string
  symbol: string
  label: string
}

export const CURRENCIES: CurrencyMeta[] = [
  { code: 'USD', symbol: '$', label: 'US Dollars' },
  { code: 'NIO', symbol: 'C$', label: 'Córdobas' },
]

const BY_CODE: Record<string, CurrencyMeta> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c])
)

/** Symbol for a currency code, e.g. 'USD' -> '$'. Falls back to "<code> ". */
export const currencySymbol = (code: string): string => BY_CODE[code]?.symbol ?? `${code} `

/** Human label for a currency code, e.g. 'NIO' -> 'Córdobas'. */
export const currencyLabel = (code: string): string => BY_CODE[code]?.label ?? code
