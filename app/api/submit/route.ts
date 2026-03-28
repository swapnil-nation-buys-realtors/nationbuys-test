export async function POST(req: Request) {
  try {
    const data = await req.formData()

    const name    = (data.get('name')    as string | null)?.trim()
    const email   = (data.get('email')   as string | null)?.trim()
    const phone   = (data.get('phone')   as string | null)?.trim()
    const service = (data.get('service') as string | null)?.trim()
    const message = (data.get('message') as string | null)?.trim() ?? ''

    if (!name || !email || !phone || !service) {
      return new Response('Missing required fields', { status: 400 })
    }

    const webhookUrl = process.env.NBR_GOOGLE_SHEET_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('[leads] NBR_GOOGLE_SHEET_WEBHOOK_URL is not set')
      return new Response('Server misconfiguration', { status: 500 })
    }

    const gsRes = await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, phone, service, message }),
    })

    const result = await gsRes.json().catch(() => null)

    if (!result?.success) {
      console.error('[leads] Apps Script returned failure:', result)
      return new Response('Upstream error', { status: 502 })
    }

    return new Response('OK', { status: 200 })
  } catch (err) {
    console.error('[leads] Unexpected error:', err)
    return new Response('Internal server error', { status: 500 })
  }
}