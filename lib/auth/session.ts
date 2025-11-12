import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_session'

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET not set')
  return secret
}

export type SessionPayload = {
  role: 'admin'
  iat: number
}

export function signSession(payload: SessionPayload): string {
  const secret = getSecret()
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const hmac = crypto.createHmac('sha256', secret).update(data).digest('base64url')
  return `${data}.${hmac}`
}

export function verifySession(token: string | undefined): SessionPayload | null {
  if (!token) return null
  const secret = getSecret()
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [data, sig] = parts
  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url')
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  try {
    const json = Buffer.from(data, 'base64url').toString('utf8')
    return JSON.parse(json) as SessionPayload
  } catch {
    return null
  }
}

export function setAdminCookie() {
  const token = signSession({ role: 'admin', iat: Date.now() })
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8h
  })
}

export function getSession(): SessionPayload | null {
  const token = cookies().get(COOKIE_NAME)?.value
  return verifySession(token)
}

export function clearSession() {
  cookies().delete(COOKIE_NAME)
}
