import { NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: 'Name, email, and message are required.' }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json({
      success: false,
      message: 'Contact form storage is not configured yet. Add Supabase credentials to .env.local before messages can be saved.',
    }, { status: 503 });
  }

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    message,
  });

  if (error) {
    return NextResponse.json({ success: false, message: `Unable to send message: ${error.message}` }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Your message has been sent successfully.' }, { status: 201 });
}
