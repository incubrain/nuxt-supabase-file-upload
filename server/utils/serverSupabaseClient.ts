import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'

export default async function serverSupabaseClient<T>(event: H3Event) {
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuZG12cG95cm11eG11enFsZ2Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0NTcwODgsImV4cCI6MjAwOTAzMzA4OH0.Y6cxKHd_SX3BjkFcYb4SBa9z6fAswIemm9kP-8aV51E'
  const SUPABASE_URL = 'https://bndmvpoyrmuxmuzqlgfu.supabase.co'

  let supabaseClient = event.context._supabaseClient as SupabaseClient<T>

  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)
    event.context._supabaseClient = supabaseClient
  }

  return supabaseClient
}
