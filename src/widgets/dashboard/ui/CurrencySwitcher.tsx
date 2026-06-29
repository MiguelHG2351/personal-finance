'use client'

import { cn } from '@/shared/lib/utils'
import { currencyLabel } from '@/shared/lib/currency'

export interface CurrencySwitcherProps {
  currencies: string[]
  value: string
  onChange: (currency: string) => void
  className?: string
}

/** Segmented control to pick which currency the dashboard is showing. */
export const CurrencySwitcher = ({
  currencies,
  value,
  onChange,
  className,
}: CurrencySwitcherProps) => {
  if (currencies.length < 2) return null

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-beige-500 bg-white p-1',
        className
      )}
    >
      {currencies.map((currency) => (
        <button
          key={currency}
          type="button"
          onClick={() => onChange(currency)}
          className={cn(
            'rounded-md px-3 py-1.5 text-preset-4 font-bold transition-colors',
            currency === value
              ? 'bg-grey-900 text-white'
              : 'text-grey-900 hover:bg-beige-100'
          )}
        >
          {currencyLabel(currency)}
        </button>
      ))}
    </div>
  )
}

CurrencySwitcher.displayName = 'CurrencySwitcher'
