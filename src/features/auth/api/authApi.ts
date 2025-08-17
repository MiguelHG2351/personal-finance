import { useSupabaseBrowser } from '@/shared/lib/supabase/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// const supabase = createClient()

// Hook para obtener el usuario actual
export const useUser = () => {
  const supabase = useSupabaseBrowser()
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para login con email/password
export const useSignIn = () => {
  const queryClient = useQueryClient()
  const supabase = useSupabaseBrowser()
  
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

// Hook para registro con email/password
export const useSignUp = () => {
  const queryClient = useQueryClient()
  const supabase = useSupabaseBrowser()
  
  return useMutation({
    mutationFn: async ({ email, password, fullName }: { email: string; password: string; fullName?: string }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: fullName ? {
          data: {
            full_name: fullName,
          }
        } : undefined
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

// Hook para login con Google
export const useSignInWithGoogle = () => {
  const supabase = useSupabaseBrowser()
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
      return data
    },
  })
}

// Hook para logout
export const useSignOut = () => {
  const queryClient = useQueryClient()
  const supabase = useSupabaseBrowser()
  
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.clear() // Limpia todo el cache
    },
  })
}
