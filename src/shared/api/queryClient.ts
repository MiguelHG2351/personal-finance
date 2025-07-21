import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true, // ✨ Refetch on window focus
      refetchOnReconnect: true,   // ✨ Refetch on reconnect
      retry: 3,
    },
  },
})
