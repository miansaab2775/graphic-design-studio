import { NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, whatsapp, service, projectDescription, budget, deadline, additionalRequirements } = body;

  if (!name || !email || !whatsapp || !service || !projectDescription || !budget || !deadline) {
    return NextResponse.json({ success: false, message: 'All required fields must be provided before submitting an order.' }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json({
      success: false,
      message: 'Supabase is not configured yet. Add your NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY values to .env.local and run the database schema before saving orders.',
    }, { status: 503 });
  }

  const { error } = await supabase.from('orders').insert({
    customer_name: name,
    email,
    whatsapp,
    service,
    project_description: projectDescription,
    budget,
    deadline,
    additional_requirements: additionalRequirements || null,
    status: 'Pending',
  });

  if (error) {
    return NextResponse.json({ success: false, message: `Unable to save order: ${error.message}` }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Your order has been submitted successfully and is ready for review.' }, { status: 201 });
}
