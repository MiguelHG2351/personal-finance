'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSupabaseBrowser } from '@/shared/lib/supabase/client'
import type { Database } from '@/shared/utils/database.types'

type TransactionRow = Database['public']['Tables']['transactions']['Row']
type CategoryRow = Database['public']['Tables']['categories']['Row']
type TransactionInsert = Database['public']['Tables']['transactions']['Insert']

export type TransactionWithCategory = TransactionRow & {
  categories: Pick<CategoryRow, 'name'> | null
}

export type CreateTransactionInput = Omit<
  TransactionInsert,
  'id' | 'created_at' | 'user_id'
>

export const useTransactions = () => {
  const supabase = useSupabaseBrowser()

  return useQuery({
    queryKey: ['transactions'],
    queryFn: async (): Promise<TransactionWithCategory[]> => {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          id,
          user_id,
          counterparty_name,
          avatar_url,
          category_id,
          amount,
          currency,
          transaction_date,
          recurring_bill_id,
          created_at,
          categories (
            name
          )
        `)
        .order('transaction_date', { ascending: false })

      if (error) {
        throw error
      }

      return data ?? []
    },
    staleTime: 2 * 60 * 1000,
  })
}

export const useCreateTransaction = () => {
  const supabase = useSupabaseBrowser()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (transaction: CreateTransactionInput) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        throw userError
      }

      if (!user) {
        throw new Error('You must be signed in to create a transaction.')
      }

      const { data, error } = await supabase
        .from('transactions')
        .insert({
          ...transaction,
          user_id: user.id,
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
