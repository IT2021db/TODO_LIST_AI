import { createClient } from '@supabase/supabase-js';

// Konfiguracja Supabase z pliku .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Brakuje zmiennych środowiskowych VITE_SUPABASE_URL lub VITE_SUPABASE_ANON_KEY w pliku .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

