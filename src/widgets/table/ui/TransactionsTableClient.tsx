'use client'

import { useMemo } from 'react'
import {
  TransactionTable,
  type Transaction,
} from '@/widgets/table/ui/TransactionTable'
import {
  useTransactions,
  type TransactionWithCategory,
} from '@/entities/transaction/api/transactionApi'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function mapTransaction(transaction: TransactionWithCategory): Transaction {
  const amount = Number(transaction.amount)

  return {
    id: transaction.id,
    recipient: transaction.counterparty_name,
    avatar: transaction.avatar_url,
    category: transaction.categories?.name ?? 'Uncategorized',
    date: dateFormatter.format(new Date(transaction.transaction_date)),
    amount,
    type: amount < 0 ? 'expense' : 'income',
  }
}

export function TransactionsTableClient() {
  const { data, error, isLoading } = useTransactions()

  const transactions = useMemo(
    () => (data ?? []).map(mapTransaction),
    [data]
  )

  return (
    <div className="min-h-screen bg-[#f8f4f0] p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold text-[#201f24]">
          Transactions
        </h1>

        {isLoading && (
          <div className="rounded-xl bg-white p-8 text-sm text-[#696868]">
            Loading transactions...
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-white p-8 text-sm text-red-600">
            Could not load transactions.
          </div>
        )}

        {!isLoading && !error && transactions.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-sm text-[#696868]">
            No transactions found.
          </div>
        )}

        {!isLoading && !error && transactions.length > 0 && (
          <TransactionTable transactions={transactions} />
        )}
      </div>
    </div>
  )
}
