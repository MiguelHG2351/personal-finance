'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { addMonths } from '@/shared/lib/date'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

interface InlineSelectProps {
  label: string
  options: { value: number; label: string }[]
  value: number
  onChange: (value: number) => void
  minWidth?: string
}

const InlineSelect = ({ label, options, value, onChange, minWidth }: InlineSelectProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const selected = options.find((o) => o.value === value)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md px-3 py-1.5 text-preset-4 font-bold text-grey-900 transition-colors hover:bg-beige-100"
        style={minWidth ? { minWidth } : undefined}
      >
        <span className="flex-1 text-left">{selected?.label}</span>
        <ChevronDown
          className={cn('size-4 shrink-0 transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 max-h-60 min-w-full overflow-y-auto rounded-lg border border-beige-500 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={cn(
                'block w-full px-4 py-2 text-left text-preset-4 text-grey-900 transition-colors hover:bg-beige-100',
                option.value === value && 'font-bold'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export interface MonthSelectorProps {
  /** Any Date within the selected month. */
  value: Date
  onChange: (month: Date) => void
  className?: string
}

/**
 * Month navigator: previous / next arrows for stepping, plus Month and Year
 * dropdowns so a distant month is one click away instead of many arrow taps.
 */
export const MonthSelector = ({ value, onChange, className }: MonthSelectorProps) => {
  const selectedYear = value.getFullYear()

  const monthOptions = MONTHS.map((label, index) => ({ value: index, label }))
  const yearOptions = Array.from({ length: 8 }, (_, i) => selectedYear - 6 + i).map((year) => ({
    value: year,
    label: String(year),
  }))

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-beige-500 bg-white p-1',
        className
      )}
    >
      <button
        type="button"
        aria-label="Previous month"
        onClick={() => onChange(addMonths(value, -1))}
        className="flex size-8 items-center justify-center rounded-md text-grey-900 transition-colors hover:bg-beige-100"
      >
        <ChevronLeft className="size-4" />
      </button>

      <InlineSelect
        label="Select month"
        options={monthOptions}
        value={value.getMonth()}
        onChange={(month) => onChange(new Date(selectedYear, month, 1))}
        minWidth="7rem"
      />
      <InlineSelect
        label="Select year"
        options={yearOptions}
        value={selectedYear}
        onChange={(year) => onChange(new Date(year, value.getMonth(), 1))}
      />

      <button
        type="button"
        aria-label="Next month"
        onClick={() => onChange(addMonths(value, 1))}
        className="flex size-8 items-center justify-center rounded-md text-grey-900 transition-colors hover:bg-beige-100"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}

MonthSelector.displayName = 'MonthSelector'
