'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { monthFromInputValue, monthKey } from './date'

const MONTH_PARAM = /^\d{4}-\d{2}$/

/**
 * Reads the selected month from the `?month=YYYY-MM` search param (falling back
 * to the current month) and writes it back via router.replace. Also exposes a
 * generic `setParam` for sibling filters (e.g. `?currency`). Components using
 * this must be wrapped in a <Suspense> boundary (useSearchParams requirement).
 */
export const useMonthParam = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, value)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  const raw = searchParams.get('month')
  const month = raw && MONTH_PARAM.test(raw) ? monthFromInputValue(raw) : new Date()
  const setMonth = useCallback((next: Date) => setParam('month', monthKey(next)), [setParam])

  return { month, setMonth, searchParams, setParam }
}
