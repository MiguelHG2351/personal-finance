import { formatCurrency } from '@/shared/lib/format'
import { OverviewCard } from './OverviewCard'
import type { RecurringBillsSummary } from '@/entities/dashboard'

export interface RecurringBillsOverviewProps {
  bills: RecurringBillsSummary
  currency: string
}

const ROWS: { key: keyof RecurringBillsSummary; label: string; color: string }[] = [
  { key: 'paid', label: 'Paid Bills', color: 'var(--color-green)' },
  { key: 'upcoming', label: 'Total Upcoming', color: 'var(--color-yellow)' },
  { key: 'dueSoon', label: 'Due Soon', color: 'var(--color-cyan)' },
]

export const RecurringBillsOverview = ({ bills, currency }: RecurringBillsOverviewProps) => (
  <OverviewCard title="Recurring Bills" href="/dashboard/recurring-bills">
    <div className="flex flex-col gap-3">
      {ROWS.map((row) => (
        <div
          key={row.key}
          className="flex items-center justify-between rounded-lg border-l-4 bg-beige-100 px-4 py-5"
          style={{ borderColor: row.color }}
        >
          <span className="text-preset-4 text-grey-500">{row.label}</span>
          <span className="text-preset-4 font-bold text-grey-900">
            {formatCurrency(bills[row.key], currency)}
          </span>
        </div>
      ))}
    </div>
  </OverviewCard>
)

RecurringBillsOverview.displayName = 'RecurringBillsOverview'
