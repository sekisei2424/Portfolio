import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

// Lazy import so build succeeds even if dependency not configured
async function sendMail({ from, to, subject, html }: { from: string; to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { sent: false, reason: 'RESEND_API_KEY not set' }
  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)
  try {
    const result = await resend.emails.send({ from, to, subject, html })
    return { sent: true, id: result.data?.id }
  } catch (e) {
    console.error('Email send error', e)
    return { sent: false, reason: 'Email send failed' }
  }
}

export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
  }
  const body = await req.json()
  const name: string = (body.name || '').trim()
  const email: string = (body.email || '').trim()
  const message: string = (body.message || '').trim()

  if (!name || !email || !message) {
    return NextResponse.json({ error: '必須項目が未入力です' }, { status: 400 })
  }

  const contactTo = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_TO
  if (!contactTo) {
    return NextResponse.json({ error: '送信先メールアドレスが未設定です' }, { status: 500 })
  }

  // Store in Supabase (if server client configured)
  let dbId: string | null = null
  if (supabaseServer) {
    const { data, error } = await supabaseServer.from('contact_messages').insert({ name, email, message }).select().single()
    if (error) {
      console.error('Supabase insert error', error)
    } else {
      dbId = data.id
    }
  }

  const emailSubject = `Portfolio問い合わせ: ${name}`
  const emailHtml = `<p><strong>名前:</strong> ${name}</p><p><strong>メール:</strong> ${email}</p><p><strong>本文:</strong></p><p style="white-space:pre-line">${message}</p>`

  const mailResult = await sendMail({ from: 'Portfolio <no-reply@yourdomain.dev>', to: contactTo, subject: emailSubject, html: emailHtml })

  return NextResponse.json({ ok: true, stored: !!dbId, id: dbId, mail: mailResult })
}
