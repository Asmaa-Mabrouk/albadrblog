import { createClient } from '@supabase/supabase-js'

// These are the public "publishable" values for this project — safe to
// ship in client-side code. All write access is enforced server-side by
// Row Level Security policies (see supabase_setup.sql), which require a
// real logged-in session — not just possession of this key.
const SUPABASE_URL = 'https://byymesuxflrdwnhpixxg.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__9UhXOg-sXznTZuTCZ94CQ_kq5T02iV'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
