'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/api/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => queryClient)
  const showDevtools = process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS === 'true'
  
  return (
    <QueryClientProvider client={client}>
      {children}
      {showDevtools && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}
