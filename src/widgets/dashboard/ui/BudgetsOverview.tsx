import { SpendingChart } from '@/shared/ui/SpendingChart'
import { formatCurrency } from '@/shared/lib/format'
import { OverviewCard } from './OverviewCard'
import type { BudgetWithSpending } from '@/entities/budget'

export interface BudgetsOverviewProps {
  budgets: BudgetWithSpending[]
  currency: string
}

export const BudgetsOverview = ({ budgets, currency }: BudgetsOverviewProps) => {
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const totalLimit = budgets.reduce((sum, b) => sum + b.maximum, 0)
  const segments = budgets.map((b) => ({ value: b.maximum, color: b.theme }))

  return (
    <OverviewCard title="Budgets" href="/dashboard/budgets">
      {budgets.length === 0 ? (
        <p className="text-preset-4 text-grey-500">No budgets in {currency} yet.</p>
      ) : (
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex flex-1 justify-center">
            <SpendingChart
              segments={segments}
              totalSpent={totalSpent}
              totalLimit={totalLimit}
              currency={currency}
            />
          </div>
          <ul className="grid w-full grid-cols-2 gap-4 sm:w-auto sm:grid-cols-1">
            {budgets.slice(0, 4).map((budget) => (
              <li key={budget.id} className="flex items-stretch gap-4">
                <span className="w-1 rounded-lg" style={{ backgroundColor: budget.theme }} />
                <div className="flex flex-col gap-1">
                  <span className="text-preset-5 text-grey-500">{budget.category}</span>
                  <span className="text-preset-4 font-bold text-grey-900">
                    {formatCurrency(budget.maximum, currency)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </OverviewCard>
  )
}

BudgetsOverview.displayName = 'BudgetsOverview'
