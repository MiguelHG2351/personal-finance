import { SpendingChart } from '@/shared/ui/SpendingChart'
import { formatCurrency } from '@/shared/lib/format'
import { currencyLabel } from '@/shared/lib/currency'
import type { BudgetWithSpending } from '@/entities/budget'

export interface SpendingSummaryProps {
  budgets: BudgetWithSpending[]
}

const SummaryGroup = ({
  currency,
  budgets,
  showHeading,
}: {
  currency: string
  budgets: BudgetWithSpending[]
  showHeading: boolean
}) => {
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const totalLimit = budgets.reduce((sum, b) => sum + b.maximum, 0)
  const segments = budgets.map((b) => ({ value: b.maximum, color: b.theme }))

  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-center lg:flex-col lg:items-stretch">
      <div className="flex justify-center md:flex-1 lg:flex-none">
        <SpendingChart
          segments={segments}
          totalSpent={totalSpent}
          totalLimit={totalLimit}
          currency={currency}
        />
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <h2 className="text-preset-2 font-bold text-grey-900">
          Spending Summary{showHeading ? ` · ${currencyLabel(currency)}` : ''}
        </h2>
        <ul className="flex flex-col">
          {budgets.map((budget, index) => (
            <li key={budget.id}>
              {index > 0 && <div className="h-px w-full bg-grey-100" />}
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <span className="h-5 w-1 rounded-lg" style={{ backgroundColor: budget.theme }} />
                  <span className="text-preset-4 text-grey-500">{budget.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-preset-3 font-bold text-grey-900">
                    {formatCurrency(budget.spent, currency)}
                  </span>
                  <span className="text-preset-5 text-grey-500">
                    of {formatCurrency(budget.maximum, currency)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/**
 * Budgets overview card. Because budgets can be in different currencies (NIO,
 * USD) and currencies must never be summed, the summary is grouped by currency:
 * one donut + list per currency present.
 */
export const SpendingSummary = ({ budgets }: SpendingSummaryProps) => {
  const currencies = [...new Set(budgets.map((b) => b.currency))]

  return (
    <div className="flex flex-col gap-8 rounded-xl bg-white p-8">
      {currencies.map((currency) => (
        <SummaryGroup
          key={currency}
          currency={currency}
          budgets={budgets.filter((b) => b.currency === currency)}
          showHeading={currencies.length > 1}
        />
      ))}
    </div>
  )
}

SpendingSummary.displayName = 'SpendingSummary'
