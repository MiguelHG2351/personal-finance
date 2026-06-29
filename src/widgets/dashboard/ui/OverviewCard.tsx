import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

export interface OverviewCardProps {
  title: string
  href?: string
  linkLabel?: string
  children: ReactNode
  className?: string
}

/** White card with a title and an optional "See Details" link to a full page. */
export const OverviewCard = ({
  title,
  href,
  linkLabel = 'See Details',
  children,
  className,
}: OverviewCardProps) => (
  <div className={cn('flex flex-col gap-6 rounded-xl bg-white p-6 lg:p-8', className)}>
    <div className="flex items-center justify-between">
      <h2 className="text-preset-2 font-bold text-grey-900">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-3 text-preset-4 text-grey-500 transition-colors hover:text-grey-900"
        >
          {linkLabel}
          <ChevronRight className="size-3" />
        </Link>
      )}
    </div>
    {children}
  </div>
)

OverviewCard.displayName = 'OverviewCard'
