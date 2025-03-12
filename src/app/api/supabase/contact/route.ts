import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); // API-nøkkel fra .env

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    

    // Send e-posten via Resend
    const response = await resend.emails.send({
      from: 'kontakt@baadstad.no', // Må være et verifisert domene på Resend
      to: 'post@baadstad.no', // Mottakeren (Bådstad AS)
      subject: `Ny melding fra ${name}`,
      replyTo: email,
      text: `Navn: ${name}\nE-post: ${email}\nEmne: ${subject}\n\nMelding:\n${message}`,
    });

    console.log(response);

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('Feil ved sending av e-post:', error);
    return NextResponse.json({ success: false, error: 'Feil ved sending av e-post' }, { status: 500 });
  }
}
