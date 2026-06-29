'use client'

import { Suspense } from 'react'
import { useDashboard, emptyCurrencyDashboard } from '@/entities/dashboard'
import { useBudgets } from '@/entities/budget'
import {
  SummaryCards,
  PotsOverview,
  RecentTransactions,
  BudgetsOverview,
  RecurringBillsOverview,
  CurrencySwitcher,
} from '@/widgets/dashboard'
import { MonthSelector } from '@/shared/ui/MonthSelector'
import { useMonthParam } from '@/shared/lib/useMonthParam'

const OverviewContent = () => {
  const { month, setMonth, searchParams, setParam } = useMonthParam()

  const { data, isLoading, isError } = useDashboard(month)
  const { data: budgets = [] } = useBudgets(month)

  const currencies = data?.currencies ?? []
  const requested = searchParams.get('currency') ?? ''
  const currency = currencies.includes(requested) ? requested : currencies[0] ?? 'USD'

  const cd = data?.byCurrency[currency] ?? emptyCurrencyDashboard()
  const currencyBudgets = budgets.filter((b) => b.currency === currency)

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
        <h1 className="text-preset-1 font-bold text-grey-900">Overview</h1>
        <div className="flex flex-wrap items-center gap-4">
          <CurrencySwitcher
            currencies={currencies}
            value={currency}
            onChange={(c) => setParam('currency', c)}
          />
          <MonthSelector value={month} onChange={setMonth} />
        </div>
      </div>

      {isLoading && <p className="text-preset-4 text-grey-500">Loading overview…</p>}
      {isError && (
        <p className="text-preset-4 text-red">We couldn&apos;t load your overview. Please try again.</p>
      )}

      {!isLoading && !isError && (
        <div className="flex flex-col gap-6">
          <SummaryCards summary={cd.summary} currency={currency} />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex w-full flex-col gap-6 lg:w-[608px] lg:shrink-0">
              <PotsOverview pots={cd.pots} totalSaved={cd.totalSaved} currency={currency} />
              <RecentTransactions transactions={cd.recentTransactions} />
            </div>
            <div className="flex w-full flex-col gap-6">
              <BudgetsOverview budgets={currencyBudgets} currency={currency} />
              <RecurringBillsOverview bills={cd.bills} currency={currency} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const DashboardPage = () => (
  <Suspense fallback={null}>
    <OverviewContent />
  </Suspense>
)

export default DashboardPage
