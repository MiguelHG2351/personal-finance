import { cn } from '@/shared/lib/utils'
import { formatCurrency, formatShortDate } from '@/shared/lib/format'
import { OverviewCard } from './OverviewCard'
import type { DashboardTransaction } from '@/entities/dashboard'

export interface RecentTransactionsProps {
  transactions: DashboardTransaction[]
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => (
  <OverviewCard title="Transactions" href="/dashboard/transactions" linkLabel="View All">
    {transactions.length === 0 ? (
      <p className="text-preset-4 text-grey-500">No transactions this month.</p>
    ) : (
      <ul className="flex flex-col">
        {transactions.map((tx, index) => (
          <li key={tx.id}>
            {index > 0 && <div className="h-px w-full bg-grey-100" />}
            <div className="flex items-center justify-between gap-4 py-4">
              <div className="flex min-w-0 items-center gap-4">
                {tx.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tx.avatarUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-beige-500 text-preset-4 font-bold text-white">
                    {tx.name.charAt(0)}
                  </span>
                )}
                <span className="truncate text-preset-4 font-bold text-grey-900">{tx.name}</span>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span
                  className={cn(
                    'text-preset-4 font-bold',
                    tx.amount > 0 ? 'text-green' : 'text-grey-900'
                  )}
                >
                  {tx.amount > 0 ? `+${formatCurrency(tx.amount, tx.currency)}` : formatCurrency(tx.amount, tx.currency)}
                </span>
                <span className="text-preset-5 text-grey-500">{formatShortDate(tx.date)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )}
  </OverviewCard>
)

RecentTransactions.displayName = 'RecentTransactions'
