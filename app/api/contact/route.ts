import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullname, email, location, coordinates, message } = body;

    // Validate required fields
    if (!fullname || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email configuration - sending to osamah0alini@gmail.com
    const recipientEmail = 'osamah0alini@gmail.com';
    const subject = `Portfolio Contact Form: Message from ${fullname}`;
    
    // Format the email body
    const emailBody = `
New contact form submission from your portfolio website:

Name: ${fullname}
Email: ${email}
Location: ${location || 'Not provided'}
Coordinates: ${coordinates || 'Not provided'}

Message:
${message}

---
This email was sent from your portfolio contact form.
    `.trim();

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return NextResponse.json(
        { error: 'Email service not configured. Please set RESEND_API_KEY in your environment variables.' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Change this to your verified domain
      to: [recipientEmail],
      subject: subject,
      text: emailBody,
      reply_to: email, // So you can reply directly to the sender
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

