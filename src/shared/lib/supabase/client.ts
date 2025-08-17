import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/shared/utils/database.types'
import type { TypedSupabaseClient } from '@/shared/utils/types'
import { useMemo } from 'react'

let client: TypedSupabaseClient | undefined

export const createClient = () => {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

export function useSupabaseBrowser() {
  return useMemo(() => {
    if (!client) {
      client = createClient()
    }
    return client
  }, [])
}
