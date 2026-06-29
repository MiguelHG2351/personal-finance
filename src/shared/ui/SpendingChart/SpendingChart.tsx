import { cn } from '@/shared/lib/utils'
import { formatCurrency } from '@/shared/lib/format'

export interface SpendingChartSegment {
  /** Relative weight of the segment (e.g. the budget maximum). */
  value: number
  /** CSS color for the segment. */
  color: string
}

export interface SpendingChartProps {
  segments: SpendingChartSegment[]
  totalSpent: number
  totalLimit: number
  currency?: string
  className?: string
}

/**
 * Donut chart rendered with a conic-gradient ring and a hollow center that
 * shows the total spent against the total limit. Purely presentational.
 */
const SpendingChart = ({
  segments,
  totalSpent,
  totalLimit,
  currency,
  className,
}: SpendingChartProps) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0)

  let cursor = 0
  const stops = segments
    .map((segment) => {
      const start = total > 0 ? (cursor / total) * 360 : 0
      cursor += segment.value
      const end = total > 0 ? (cursor / total) * 360 : 0
      return `${segment.color} ${start}deg ${end}deg`
    })
    .join(', ')

  const background =
    segments.length > 0 ? `conic-gradient(${stops})` : 'var(--color-grey-100)'

  return (
    <div className={cn('relative size-[240px]', className)}>
      {/* Lighter outer band */}
      <div className="absolute inset-0 rounded-full opacity-75" style={{ background }} />
      {/* Full-saturation inner ring */}
      <div className="absolute inset-[26px] rounded-full" style={{ background }} />
      {/* Hollow center */}
      <div className="absolute inset-[52px] flex flex-col items-center justify-center gap-2 rounded-full bg-white text-center">
        <p className="text-preset-1 font-bold text-grey-900">
          {formatCurrency(totalSpent, currency)}
        </p>
        <p className="text-preset-5 text-grey-500">
          of {formatCurrency(totalLimit, currency)} limit
        </p>
      </div>
    </div>
  )
}

SpendingChart.displayName = 'SpendingChart'

export default SpendingChart
