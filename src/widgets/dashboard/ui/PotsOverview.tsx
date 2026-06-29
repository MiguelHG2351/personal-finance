import { PiggyBank } from 'lucide-react'
import { formatCurrency } from '@/shared/lib/format'
import { OverviewCard } from './OverviewCard'
import type { DashboardPot } from '@/entities/dashboard'

export interface PotsOverviewProps {
  pots: DashboardPot[]
  totalSaved: number
  currency: string
}

export const PotsOverview = ({ pots, totalSaved, currency }: PotsOverviewProps) => (
  <OverviewCard title="Pots" href="/dashboard/pots">
    {pots.length === 0 ? (
      <p className="text-preset-4 text-grey-500">No pots yet. Create one to start saving.</p>
    ) : (
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4 rounded-xl bg-beige-100 p-4 sm:w-[247px]">
          <PiggyBank className="size-10 shrink-0 text-green" strokeWidth={1.5} />
          <div className="flex flex-col gap-1">
            <span className="text-preset-4 text-grey-500">Total Saved</span>
            <span className="text-preset-1 font-bold text-grey-900">
              {formatCurrency(totalSaved, currency)}
            </span>
          </div>
        </div>
        <ul className="grid flex-1 grid-cols-2 gap-4">
          {pots.slice(0, 4).map((pot) => (
            <li key={pot.id} className="flex items-stretch gap-4">
              <span className="w-1 rounded-lg" style={{ backgroundColor: pot.theme }} />
              <div className="flex flex-col gap-1">
                <span className="text-preset-5 text-grey-500">{pot.name}</span>
                <span className="text-preset-4 font-bold text-grey-900">
                  {formatCurrency(pot.totalSaved, currency)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </OverviewCard>
)

PotsOverview.displayName = 'PotsOverview'
