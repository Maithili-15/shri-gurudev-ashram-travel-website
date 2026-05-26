import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
export const isDemoAuth = import.meta.env.VITE_DEMO_AUTH === 'true'

/**
 * Supabase client — lazy-initialized when credentials exist.
 * In demo mode (VITE_DEMO_AUTH=true), auth flows use mock session instead.
 */
let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (isDemoAuth || !supabaseUrl || !supabaseAnonKey) {
    return null
  }
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  }
  return client
}
