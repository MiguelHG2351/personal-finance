'use client'

import { useQuery } from '@tanstack/react-query'
import { useSupabaseBrowser } from '@/shared/lib/supabase/client'
import { monthKey, monthRange } from '@/shared/lib/date'
import type { Database } from '@/shared/utils/database.types'

type TransactionRow = Database['public']['Tables']['transactions']['Row']
type PotRow = Database['public']['Tables']['pots']['Row']
type RecurringBillRow = Database['public']['Tables']['recurring_bills']['Row']

/** Balance is all-time net; income/expenses are for the selected month. */
export interface CurrencySummary {
  balance: number
  income: number
  expenses: number
}

export interface DashboardPot {
  id: string
  name: string
  totalSaved: number
  theme: string
}

export interface RecurringBillsSummary {
  paid: number
  upcoming: number
  dueSoon: number
}

export interface DashboardTransaction {
  id: string
  name: string
  avatarUrl: string | null
  amount: number
  date: string
  currency: string
}

export interface CurrencyDashboard {
  summary: CurrencySummary
  pots: DashboardPot[]
  totalSaved: number
  bills: RecurringBillsSummary
  recentTransactions: DashboardTransaction[]
}

export interface DashboardData {
  /** Currencies the user has any activity in, for the currency switcher. */
  currencies: string[]
  byCurrency: Record<string, CurrencyDashboard>
}

const RECENT_LIMIT = 5
const DUE_SOON_DAYS = 5

/** Fresh, independent zeroed dashboard for one currency. */
export const emptyCurrencyDashboard = (): CurrencyDashboard => ({
  summary: { balance: 0, income: 0, expenses: 0 },
  pots: [],
  totalSaved: 0,
  bills: { paid: 0, upcoming: 0, dueSoon: 0 },
  recentTransactions: [],
})

type BalanceRow = Pick<TransactionRow, 'amount' | 'currency'>
type MonthTxRow = Pick<
  TransactionRow,
  'id' | 'counterparty_name' | 'avatar_url' | 'amount' | 'transaction_date' | 'currency' | 'recurring_bill_id'
>
type PotFields = Pick<PotRow, 'id' | 'name' | 'total_saved' | 'theme' | 'currency'>
type BillFields = Pick<RecurringBillRow, 'id' | 'amount' | 'due_day' | 'currency'>

/**
 * Aggregates everything the Overview screen needs, grouped by currency
 * (NIO and USD are never summed together). `month` selects the period for
 * income/expenses, recent transactions and bill status; balance is all-time.
 */
export const useDashboard = (month: Date) => {
  const supabase = useSupabaseBrowser()
  const { start, end } = monthRange(month)

  return useQuery({
    queryKey: ['dashboard', monthKey(month)],
    queryFn: async (): Promise<DashboardData> => {
      const [balanceResult, monthTxResult, potsResult, billsResult] = await Promise.all([
        // All-time, minimal columns — only for the running balance.
        supabase.from('transactions').select('amount, currency'),
        // Month-scoped, full fields — income/expenses/recent/paid-bills.
        supabase
          .from('transactions')
          .select('id, counterparty_name, avatar_url, amount, transaction_date, currency, recurring_bill_id')
          .gte('transaction_date', start)
          .lt('transaction_date', end)
          .order('transaction_date', { ascending: false }),
        supabase.from('pots').select('id, name, total_saved, theme, currency'),
        supabase.from('recurring_bills').select('id, amount, due_day, currency'),
      ])

      if (balanceResult.error) throw balanceResult.error
      if (monthTxResult.error) throw monthTxResult.error
      if (potsResult.error) throw potsResult.error
      if (billsResult.error) throw billsResult.error

      const balanceRows = (balanceResult.data ?? []) as BalanceRow[]
      const monthTx = (monthTxResult.data ?? []) as MonthTxRow[]
      const pots = (potsResult.data ?? []) as PotFields[]
      const bills = (billsResult.data ?? []) as BillFields[]

      const byCurrency: Record<string, CurrencyDashboard> = {}
      const ensure = (currency: string): CurrencyDashboard =>
        (byCurrency[currency] ??= emptyCurrencyDashboard())

      for (const row of balanceRows) {
        ensure(row.currency).summary.balance += row.amount
      }

      const paidBillIds = new Set<string>()
      for (const t of monthTx) {
        const c = ensure(t.currency)
        if (t.amount > 0) c.summary.income += t.amount
        else c.summary.expenses += Math.abs(t.amount)
        if (t.recurring_bill_id) paidBillIds.add(t.recurring_bill_id)
        if (c.recentTransactions.length < RECENT_LIMIT) {
          c.recentTransactions.push({
            id: t.id,
            name: t.counterparty_name,
            avatarUrl: t.avatar_url,
            amount: t.amount,
            date: t.transaction_date,
            currency: t.currency,
          })
        }
      }

      for (const p of pots) {
        const c = ensure(p.currency)
        c.totalSaved += p.total_saved
        c.pots.push({ id: p.id, name: p.name, totalSaved: p.total_saved, theme: p.theme })
      }

      // "Due soon" only makes sense for the current month; for other months it
      // is 0. Compare actual dates so late-month due days work correctly.
      const now = new Date()
      const isCurrentMonth =
        now.getFullYear() === month.getFullYear() && now.getMonth() === month.getMonth()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      for (const b of bills) {
        const c = ensure(b.currency)
        if (paidBillIds.has(b.id)) {
          c.bills.paid += b.amount
          continue
        }
        c.bills.upcoming += b.amount
        if (isCurrentMonth) {
          const due = new Date(month.getFullYear(), month.getMonth(), b.due_day)
          const diffDays = (due.getTime() - today.getTime()) / 86_400_000
          if (diffDays >= 0 && diffDays <= DUE_SOON_DAYS) c.bills.dueSoon += b.amount
        }
      }

      // USD first (app default), then the rest alphabetically.
      const currencies = Object.keys(byCurrency).sort((a, b) =>
        a === 'USD' ? -1 : b === 'USD' ? 1 : a.localeCompare(b)
      )
      return { currencies, byCurrency }
    },
    staleTime: 2 * 60 * 1000,
  })
}
