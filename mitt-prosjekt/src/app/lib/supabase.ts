import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Hent miljøvariabler
// TypeScript trenger nullsjekk - bruker tom streng som fallback hvis miljøvariablene ikke er definert
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Sjekk at miljøvariablene faktisk er satt
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase miljøvariabler mangler. Sørg for at NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_ANON_KEY er satt i .env.local filen.'
  );
}

// Opprett Supabase klient med typedefinisjon
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;