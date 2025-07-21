// entities/transaction/api/transactionApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => {
        return fetch('/api/transactions').then(res => res.json())
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => {
        return fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Transaction 1',
                amount: 100,
                type: 'income',
            }),
        }).then(res => res.json())
    },
    onSuccess: () => {
      // Invalida y refetch automático
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}