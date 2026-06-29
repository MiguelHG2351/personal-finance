'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSupabaseBrowser } from '@/shared/lib/supabase/client'
import { monthKey, monthRange } from '@/shared/lib/date'
import type { Database } from '@/shared/utils/database.types'

type BudgetRow = Database['public']['Tables']['budgets']['Row']
type CategoryRow = Database['public']['Tables']['categories']['Row']
type TransactionRow = Database['public']['Tables']['transactions']['Row']
type BudgetInsert = Database['public']['Tables']['budgets']['Insert']

/** A single expense shown under a budget's "Latest Spending" section. */
export interface BudgetSpendingItem {
  id: string
  name: string
  avatarUrl: string | null
  amount: number
  date: string
  currency: string
}

/**
 * A budget enriched with values derived from transactions:
 * `spent` and `latestSpending` are NOT stored — they are computed from the
 * expense transactions (amount < 0) that share the budget's category AND
 * currency (a budget is single-currency; we never mix NIO and USD).
 */
export interface BudgetWithSpending {
  id: string
  categoryId: number
  category: string
  maximum: number
  theme: string
  currency: string
  spent: number
  remaining: number
  latestSpending: BudgetSpendingItem[]
}

type BudgetWithCategory = Pick<
  BudgetRow,
  'id' | 'maximum' | 'theme' | 'category_id' | 'currency'
> & {
  categories: Pick<CategoryRow, 'name'> | null
}

type ExpenseRow = Pick<
  TransactionRow,
  'id' | 'counterparty_name' | 'avatar_url' | 'amount' | 'transaction_date' | 'category_id' | 'currency'
>

const LATEST_SPENDING_LIMIT = 3

/** Key for matching a budget's expenses: same category AND same currency. */
const bucketKey = (categoryId: number, currency: string) => `${categoryId}|${currency}`

/**
 * @param month any Date within the target month; `spent` and `latestSpending`
 *   are computed only from that month's expenses (budgets reset monthly).
 */
export const useBudgets = (month: Date) => {
  const supabase = useSupabaseBrowser()
  const { start, end } = monthRange(month)

  return useQuery({
    queryKey: ['budgets', monthKey(month)],
    queryFn: async (): Promise<BudgetWithSpending[]> => {
      const [budgetsResult, expensesResult] = await Promise.all([
        supabase
          .from('budgets')
          .select('id, maximum, theme, category_id, currency, categories ( name )')
          .order('created_at', { ascending: true }),
        supabase
          .from('transactions')
          .select('id, counterparty_name, avatar_url, amount, transaction_date, category_id, currency')
          .lt('amount', 0)
          .gte('transaction_date', start)
          .lt('transaction_date', end)
          .order('transaction_date', { ascending: false }),
      ])

      if (budgetsResult.error) throw budgetsResult.error
      if (expensesResult.error) throw expensesResult.error

      const budgets = (budgetsResult.data ?? []) as BudgetWithCategory[]
      const expenses = (expensesResult.data ?? []) as ExpenseRow[]

      // Bucket expenses by category + currency so NIO and USD never mix.
      const expensesByBucket = new Map<string, ExpenseRow[]>()
      for (const expense of expenses) {
        if (expense.category_id == null) continue
        const key = bucketKey(expense.category_id, expense.currency)
        const bucket = expensesByBucket.get(key)
        if (bucket) bucket.push(expense)
        else expensesByBucket.set(key, [expense])
      }

      return budgets.map((budget) => {
        const budgetExpenses = expensesByBucket.get(bucketKey(budget.category_id, budget.currency)) ?? []
        const spent = budgetExpenses.reduce((sum, e) => sum + Math.abs(e.amount), 0)

        return {
          id: budget.id,
          categoryId: budget.category_id,
          category: budget.categories?.name ?? 'Uncategorized',
          maximum: budget.maximum,
          theme: budget.theme,
          currency: budget.currency,
          spent,
          remaining: Math.max(budget.maximum - spent, 0),
          latestSpending: budgetExpenses
            .slice(0, LATEST_SPENDING_LIMIT)
            .map((e) => ({
              id: e.id,
              name: e.counterparty_name,
              avatarUrl: e.avatar_url,
              amount: e.amount,
              date: e.transaction_date,
              currency: e.currency,
            })),
        }
      })
    },
    staleTime: 2 * 60 * 1000,
  })
}

export const useCategories = () => {
  const supabase = useSupabaseBrowser()

  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<CategoryRow[]> => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name', { ascending: true })

      if (error) throw error
      return data ?? []
    },
    staleTime: 30 * 60 * 1000,
  })
}

export type CreateBudgetInput = Pick<
  BudgetInsert,
  'category_id' | 'maximum' | 'theme' | 'currency'
>

export const useCreateBudget = () => {
  const supabase = useSupabaseBrowser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (budget: CreateBudgetInput) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) throw userError
      if (!user) throw new Error('You must be signed in to create a budget.')

      const { data, error } = await supabase
        .from('budgets')
        .insert({ ...budget, user_id: user.id })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })
}

export const useDeleteBudget = () => {
  const supabase = useSupabaseBrowser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('budgets').delete().eq('id', id)
      if (error) throw error
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })
}
