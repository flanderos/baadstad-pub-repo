import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resendApiKey = process.env.RESEND_API_KEY;
console.log('API Key defined:', !!resendApiKey); // Logs true if API key exists, false otherwise
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  console.log('POST request received at /api/contact');
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);
  console.log('Request headers:', Object.fromEntries(req.headers.entries()));
  
  try {
    // Log incoming request for debugging
    console.log('Processing contact form submission...');
    
    // Check if Resend is properly initialized
    if (!resend) {
      console.error('ERROR: Resend API key not configured or invalid');
      console.log('Environment variable name used:', 'RESEND_API_KEY');
      console.log('API key value (masked):', resendApiKey ? '****' + resendApiKey.slice(-4) : 'undefined');
      return NextResponse.json({ 
        success: false, 
        error: 'E-posttjenesten er ikke riktig konfigurert' 
      }, { status: 500 });
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
      console.log('Request body successfully parsed');
    } catch (parseError) {
      console.error('ERROR: Failed to parse request body:', parseError);
      return NextResponse.json({ 
        success: false, 
        error: 'Ugyldig JSON-format i forespørselen',
        details: parseError instanceof Error ? parseError.message : 'Unknown parsing error'
      }, { status: 400 });
    }
    
    console.log('Request body contents:', JSON.stringify(body, null, 2));

    // Destructure with defaults to prevent undefined errors
    const { 
      name = '', 
      email = '', 
      subject = 'Ny henvendelse fra nettside', 
      message = '',
      phone = 'Ikke oppgitt' 
    } = body;

    console.log('Extracted fields:');
    console.log('- name:', name);
    console.log('- email:', email);
    console.log('- subject:', subject);
    console.log('- message length:', message.length);
    console.log('- phone:', phone);

    // Validate required fields
    if (!name || !email || !message) {
      console.error('ERROR: Missing required fields');
      console.log('Missing fields:', {
        name: !name,
        email: !email,
        message: !message
      });
      return NextResponse.json({ 
        success: false, 
        error: 'Manglende påkrevde felt' 
      }, { status: 400 });
    }

    // Build email content
    const emailContent = `
Navn: ${name}
E-post: ${email}
Telefon: ${phone}
Emne: ${subject}

Melding:
${message}
    `;
    console.log('Email content prepared');

    // Send email via Resend
    console.log('Attempting to send email to post@baadstad.no');
    console.log('Email parameters:', {
      from: 'post@baadstad',
      to: 'post@baadstad.no',
      subject: `Ny melding fra ${name}`,
      replyTo: email,
      textLength: emailContent.length
    });
    
    try {
      const response = await resend.emails.send({
        from: 'post@baadstad.no', // Must be a verified domain on Resend
        to: 'post@baadstad.no', // Recipient (Bådstad AS)
        subject: `Ny melding fra ${name}`,
        replyTo: email,
        text: emailContent,
      });
      
      console.log('Email sent successfully. Response:', response);
      return NextResponse.json({ success: true, data: response });
    } catch (sendError) {
      console.error('ERROR: Failed to send email through Resend API:', sendError);
      console.log('Error details:', JSON.stringify(sendError, null, 2));
      
      // Try to get meaningful error message
      const errorMessage = sendError instanceof Error ? sendError.message : 'Unknown sending error';
      
      return NextResponse.json({ 
        success: false, 
        error: 'Feil ved sending av e-post via Resend API', 
        details: errorMessage 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('CRITICAL ERROR in API route handler:', error);
    console.log('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
    
    // Try to get meaningful error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({ 
      success: false, 
      error: 'Uventet feil i API-ruten', 
      details: errorMessage 
    }, { status: 500 });
  }
}