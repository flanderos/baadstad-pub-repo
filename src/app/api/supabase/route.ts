import { NextResponse } from 'next/server';
// Import av createClient er fjernet siden den ikke brukes
// import { createClient } from '@supabase/supabase-js';

// For API-ruter i Next.js App Router, trenger du export av HTTP-metodene
export async function GET() {
  // Din logikk her - request-parameteren er fjernet siden den ikke er i bruk
  return NextResponse.json({ message: 'Supabase API Route' });
}

export async function POST(request: Request) {
  try {
    // Opprett en Supabase-klient
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase credentials not configured' }, 
        { status: 500 }
      );
    }
    
    // Hent data fra POST-forespørselen
    const data = await request.json();
    
    // Kommentar som viser hvordan du kan bruke Supabase når du trenger det
    // For å bruke Supabase, fjern kommentarene på både import-linje og kode nedenfor:
    // import { createClient } from '@supabase/supabase-js';
    // const supabase = createClient(supabaseUrl, supabaseKey);
    // const { data: result, error } = await supabase.from('din_tabell').insert(data);
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API-feil:', error);
    return NextResponse.json(
      { error: 'Feil ved behandling av forespørsel' }, 
      { status: 500 }
    );
  }
}