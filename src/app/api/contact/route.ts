import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid submission data', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.warn(
        '[Web3Forms] Missing WEB3FORMS_ACCESS_KEY in environment variables. Logging transmission locally.'
      );
      console.log(`[Contact Form Transmission] From: ${name} <${email}>: "${message}"`);
      return NextResponse.json({
        success: true,
        message: 'Transmission logged (Add WEB3FORMS_ACCESS_KEY to .env to receive emails).',
      });
    }

    // Submit to Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `⚡ [Transmission] New Mission Inquiry from ${name}`,
        from_name: 'Portfolio COMMS Stage 05',
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error('[Web3Forms Error]', data);
      return NextResponse.json(
        { error: data.message || 'Failed to dispatch transmission via Web3Forms' },
        { status: 500 }
      );
    }

    console.log(`[Web3Forms Success] Transmission dispatched from ${name} <${email}>`);

    return NextResponse.json({
      success: true,
      message: 'Transmission successfully delivered.',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing transmission' },
      { status: 500 }
    );
  }
}
