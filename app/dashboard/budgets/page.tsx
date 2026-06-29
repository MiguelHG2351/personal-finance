'use client'

import { Suspense } from 'react'
import { useBudgets, useDeleteBudget } from '@/entities/budget'
import { SpendingSummary } from '@/widgets/budget'
import { BudgetCard } from '@/shared/ui/BudgetCard'
import { MonthSelector } from '@/shared/ui/MonthSelector'
import { AddBudgetButton } from '@/features/add-budget'
import { useMonthParam } from '@/shared/lib/useMonthParam'

const BudgetsContent = () => {
  const { month, setMonth } = useMonthParam()

  const { data: budgets = [], isLoading, isError } = useBudgets(month)
  const deleteBudget = useDeleteBudget()

  return (
    <>
      <div className="flex items-center justify-between pb-8">
        <h1 className="text-preset-1 font-bold text-grey-900">Budgets</h1>
        <AddBudgetButton />
      </div>

      <div className="flex justify-end pb-6">
        <MonthSelector value={month} onChange={setMonth} />
      </div>

      {isLoading && <p className="text-preset-4 text-grey-500">Loading budgets…</p>}

      {isError && (
        <p className="text-preset-4 text-red">
          We couldn&apos;t load your budgets. Please try again.
        </p>
      )}

      {!isLoading && !isError && budgets.length === 0 && (
        <p className="text-preset-4 text-grey-500">
          You don&apos;t have any budgets yet. Create one to start tracking your spending.
        </p>
      )}

      {!isLoading && !isError && budgets.length > 0 && (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="w-full lg:w-[428px] lg:shrink-0">
            <SpendingSummary budgets={budgets} />
          </div>
          <div className="flex w-full flex-col gap-6">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                category={budget.category}
                spent={budget.spent}
                limit={budget.maximum}
                color={budget.theme}
                currency={budget.currency}
                latestSpending={budget.latestSpending}
                onDelete={() => deleteBudget.mutate(budget.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

const BudgetsPage = () => (
  <Suspense fallback={null}>
    <BudgetsContent />
  </Suspense>
)

export default BudgetsPage
