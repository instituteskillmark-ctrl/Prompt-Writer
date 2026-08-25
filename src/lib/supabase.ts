import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://refkeqoihbaaturbzkyv.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZmtlcW9paGJhYXR1cmJ6a3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NzU2MzUsImV4cCI6MjEwMzI1MTYzNX0.jDCuohS7pxoMhk6ImhMm-zLMgsApNPu_sHvEhB9RziE';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseUrl = (rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '') || DEFAULT_SUPABASE_URL);
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY).trim() || DEFAULT_SUPABASE_ANON_KEY;

/**
 * Checks if the Supabase environment variables are configured with non-placeholder values.
 */
export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('your-supabase-project-id') &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('placeholder')
  );
};

/**
 * Frontend Supabase client instance.
 * Uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from environment variables, or defaults to current project credentials.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

