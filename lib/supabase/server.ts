import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Create a server-side Supabase client if env vars exist. Otherwise, export undefined
// so callers can safely feature-detect and skip DB operations during build.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let client: SupabaseClient | undefined
if (supabaseUrl && supabaseServiceRoleKey) {
  client = createClient(supabaseUrl, supabaseServiceRoleKey)
}

export const supabaseServer = client
