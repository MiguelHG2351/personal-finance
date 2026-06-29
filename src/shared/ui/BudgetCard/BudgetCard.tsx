'use client'

import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { formatCurrency, formatShortDate } from '@/shared/lib/format'
import type { BudgetCardProps, BudgetLatestSpendingItem } from './BudgetCard.types'

const SpendingRow = ({ item }: { item: BudgetLatestSpendingItem }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex min-w-0 items-center gap-4">
      {item.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.avatarUrl}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-beige-500 text-preset-5 font-bold text-white">
          {item.name.charAt(0)}
        </span>
      )}
      <span className="truncate text-preset-5 font-bold text-grey-900">{item.name}</span>
    </div>
    <div className="flex shrink-0 flex-col items-end gap-1">
      <span className="text-preset-5 font-bold text-grey-900">
        {formatCurrency(item.amount, item.currency)}
      </span>
      <span className="text-preset-5 text-grey-500">{formatShortDate(item.date)}</span>
    </div>
  </div>
)

const BudgetCard = ({
  category,
  spent,
  limit,
  color,
  currency,
  latestSpending = [],
  onDelete,
  className,
}: BudgetCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0
  const remaining = Math.max(limit - spent, 0)

  return (
    <div className={cn('flex flex-col gap-5 rounded-xl bg-white p-6 lg:p-8', className)}>
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="text-preset-2 font-bold text-grey-900">{category}</h3>
        </div>
        {onDelete && (
          <div className="relative">
            <button
              type="button"
              aria-label="Budget options"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex size-6 items-center justify-center text-grey-300 transition-colors hover:text-grey-900"
            >
              <MoreHorizontal className="size-5" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 z-20 min-w-[140px] rounded-lg border border-grey-100 bg-white p-3 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false)
                      onDelete()
                    }}
                    className="block w-full text-left text-preset-4 text-red"
                  >
                    Delete Budget
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Amount bar */}
      <div className="flex flex-col gap-4">
        <p className="text-preset-4 text-grey-500">Maximum of {formatCurrency(limit, currency)}</p>
        <div className="flex h-8 items-center rounded bg-beige-100 p-1">
          <div
            className="h-full rounded-sm"
            style={{
              backgroundColor: color,
              width: `${percentage}%`,
              minWidth: percentage > 0 ? '8px' : '0px',
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4">
            <span className="h-full w-1 rounded-lg" style={{ backgroundColor: color }} />
            <div className="flex flex-col gap-1">
              <span className="text-preset-5 text-grey-500">Spent</span>
              <span className="text-preset-4 font-bold text-grey-900">
                {formatCurrency(spent, currency)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="h-full w-1 rounded-lg bg-beige-100" />
            <div className="flex flex-col gap-1">
              <span className="text-preset-5 text-grey-500">Remaining</span>
              <span className="text-preset-4 font-bold text-grey-900">
                {formatCurrency(remaining, currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest spending */}
      {latestSpending.length > 0 && (
        <div className="flex flex-col gap-5 rounded-xl bg-beige-100 p-5">
          <h4 className="text-preset-3 font-bold text-grey-900">Latest Spending</h4>
          <div className="flex flex-col gap-3">
            {latestSpending.map((item, index) => (
              <div key={item.id} className="flex flex-col gap-3">
                {index > 0 && <div className="h-px w-full bg-grey-500/15" />}
                <SpendingRow item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

BudgetCard.displayName = 'BudgetCard'

export default BudgetCard
