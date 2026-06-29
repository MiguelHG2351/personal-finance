import { cn } from '@/shared/lib/utils'
import { formatCurrency } from '@/shared/lib/format'
import type { CurrencySummary } from '@/entities/dashboard'

interface SummaryCardProps {
  label: string
  value: number
  currency: string
  dark?: boolean
}

const SummaryCard = ({ label, value, currency, dark }: SummaryCardProps) => (
  <div
    className={cn(
      'flex flex-1 flex-col gap-3 rounded-xl p-6',
      dark ? 'bg-grey-900' : 'bg-white'
    )}
  >
    <p className={cn('text-preset-4', dark ? 'text-white' : 'text-grey-500')}>{label}</p>
    <p className={cn('text-preset-1 font-bold', dark ? 'text-white' : 'text-grey-900')}>
      {formatCurrency(value, currency)}
    </p>
  </div>
)

export interface SummaryCardsProps {
  summary: CurrencySummary
  currency: string
}

export const SummaryCards = ({ summary, currency }: SummaryCardsProps) => (
  <div className="flex flex-col gap-6 md:flex-row">
    <SummaryCard label="Current Balance" value={summary.balance} currency={currency} dark />
    <SummaryCard label="Income" value={summary.income} currency={currency} />
    <SummaryCard label="Expenses" value={summary.expenses} currency={currency} />
  </div>
)

SummaryCards.displayName = 'SummaryCards'
