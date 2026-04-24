'use client'
import { useState, useRef, useEffect } from 'react'


const SERVICES_LIST = [
  'Sale & Purchase of Land',
  'Exclusive Mandates',
  'Data Center Land',
  'Managed Office Spaces',
  'Prelease Commercial',
  'Industrial Land',
  'Commercial Leasing',
  'Investment Advisory',
]

type FormState = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

// ─── VALIDATION ──────────────────────────────────────────────────────────────

// Strips all formatting chars to get the raw digit string
const rawPhone = (val: string) => val.trim().replace(/[\s\-\(\)\+]/g, '')

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}

  // ── Name ──────────────────────────────────────────────────────────────────
  const trimName = form.name.trim()
  if (!trimName) {
    errors.name = 'Full name is required.'
  } else if (trimName.length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  } else if (trimName.length > 80) {
    errors.name = 'Name must be under 80 characters.'
  } else if (!/^[a-zA-Z\u00C0-\u024F\s'\-\.]+$/.test(trimName)) {
    // Allows accented / international name characters
    errors.name = 'Name contains invalid characters.'
  }

  // ── Email ─────────────────────────────────────────────────────────────────
  const trimEmail = form.email.trim()
  if (!trimEmail) {
    errors.email = 'Email address is required.'
  } else {
    const [local, domain, ...extra] = trimEmail.split('@')

    if (extra.length > 0 || !domain) {
      // More than one @ sign, or nothing after @
      errors.email = 'Please enter a valid email address.'
    } else if (local.length === 0) {
      errors.email = 'Email must have a username before @.'
    } else if (local.length > 64) {
      // RFC 5321: local part max 64 chars
      errors.email = 'The part before @ must be 64 characters or fewer.'
    } else if (domain.length > 255) {
      // RFC 5321: domain max 255 chars
      errors.email = 'The domain part of your email is too long.'
    } else if (!/^[^\s@]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,}$/.test(trimEmail)) {
      // Stricter: domain must have at least one dot and a valid TLD (2+ letters)
      errors.email = 'Please enter a valid email address (e.g. name@domain.com).'
    } else if (trimEmail.length > 254) {
      // RFC 5321: total address max 254 chars
      errors.email = 'Email address is too long (max 254 characters).'
    } else if (/\.\./.test(trimEmail)) {
      // No consecutive dots allowed
      errors.email = 'Email address cannot contain consecutive dots.'
    }
  }

  // ── Phone ─────────────────────────────────────────────────────────────────
  const digits = rawPhone(form.phone)
  const raw = form.phone.trim()

  if (!raw) {
    errors.phone = 'Phone number is required.'
  } else if (/[^0-9\s\-\(\)\+]/.test(raw)) {
    // Contains characters that aren't digits, spaces, dashes, parens, or +
    errors.phone = 'Phone number contains invalid characters.'
  } else if (!/^\+?[0-9]/.test(raw)) {
    errors.phone = 'Phone number must start with a digit or +.'
  } else if (digits.length < 7) {
    errors.phone = 'Phone number is too short (minimum 7 digits).'
  } else if (digits.length > 15) {
    // ITU-T E.164 international standard: max 15 digits
    errors.phone = 'Phone number is too long (maximum 15 digits).'
  } else if (digits.length === 10 && /^[0-5]/.test(digits)) {
    // Indian 10-digit numbers must start with 6, 7, 8, or 9
    errors.phone = 'Enter a valid Indian mobile number starting with 6–9.'
  } else if (/^(.)\1+$/.test(digits)) {
    // Reject all-same-digit numbers like 0000000000
    errors.phone = 'Please enter a real phone number.'
  }

  if (!form.service) {
    errors.service = 'Please select a service.'
  } else if (!SERVICES_LIST.includes(form.service)) {
    // Rejects any value that wasn't in the dropdown (e.g. tampered requests)
    errors.service = 'Please select a valid service from the list.'
  }

  // ── Message ───────────────────────────────────────────────────────────────
  if (form.message.length > 1000) {
    errors.message = 'Message must be under 1000 characters.'
  }

  return errors
}
// ─────────────────────────────────────────────────────────────────────────────

export default function LeadGenSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', service: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      ref.current?.querySelectorAll<HTMLElement>('.lg-anim').forEach((el, i) => {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, i * 100)
      })
    }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.value
    const updated = { ...form, [k]: val }
    setForm(updated)
    const newErrors = validate(updated)
    setErrors(prev => ({ ...prev, [k]: newErrors[k] }))
  }

  const handleSubmit = async () => {
    const fieldErrors = validate(form)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) return

    setLoading(true)
    setSubmitError(null)

    try {
      const body = new FormData()
      body.append('name', form.name.trim())
      body.append('email', form.email.trim().toLowerCase())
      body.append('phone', form.phone.trim())
      body.append('service', form.service)
      body.append('message', form.message.trim())

      const res = await fetch('/api/submit', {
        method: 'POST',
        body,
        // No Content-Type header — browser sets multipart/form-data with
        // the correct boundary automatically when body is FormData
      })

      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText)
        throw new Error(text || `Server error ${res.status}`)
      }

      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      if (!navigator.onLine) {
        setSubmitError('You appear to be offline. Please check your connection and try again.')
      } else {
        setSubmitError(`Submission failed: ${message}. Please try again or contact us directly.`)
      }
    } finally {
      setLoading(false)
    }
  }

  // ─── STYLES ────────────────────────────────────────────────────────────────
  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${hasError ? 'rgba(220,80,80,0.55)' : 'rgba(201,168,76,0.15)'}`,
    padding: '0.85rem 1rem',
    fontFamily: 'Jost,sans-serif',
    fontSize: '0.72rem',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.75)',
    outline: 'none',
    transition: 'border-color 0.25s, background 0.25s',
    letterSpacing: '0.03em',
    appearance: 'none' as const,
    boxSizing: 'border-box' as const,
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Jost,sans-serif',
    fontSize: '0.55rem',
    letterSpacing: '0.28em',
    textTransform: 'uppercase' as const,
    color: 'rgba(201,168,76,0.6)',
    fontWeight: 400,
    marginBottom: '0.45rem',
  }

  const errorStyle: React.CSSProperties = {
    fontFamily: 'Jost,sans-serif',
    fontSize: '0.57rem',
    color: 'rgba(220,100,100,0.9)',
    fontWeight: 300,
    marginTop: '0.3rem',
    letterSpacing: '0.02em',
  }

  const focusHandlers = (k: keyof FormState) => ({
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = errors[k] ? 'rgba(220,80,80,0.7)' : 'rgba(201,168,76,0.45)'
      e.currentTarget.style.background = 'rgba(201,168,76,0.04)'
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = errors[k] ? 'rgba(220,80,80,0.55)' : 'rgba(201,168,76,0.15)'
      e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
    },
  })
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <section id="enquire" ref={ref} style={{ background: 'var(--obsidian)', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>

      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Gold vertical accent */}
      <div style={{ position: 'absolute', right: 0, top: '15%', bottom: '15%', width: '2px', background: 'linear-gradient(180deg,transparent,var(--gold),transparent)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }} className="lg-layout">

        {/* LEFT: Info block */}
        <div>
          <div className="lg-anim" style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.8s ease' }}>
            <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.6rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 300, marginBottom: '0.85rem' }}>
              Get in Touch
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.8rem,3.5vw,3.2rem)', fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              Send Us a{' '}
              <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#E2C07A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Message
              </span>
            </h2>
            <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.74rem', color: 'rgba(255,255,255,0.32)', fontWeight: 300, lineHeight: 1.8, maxWidth: '340px', marginBottom: '3rem' }}>
              Whether you have a mandate to place, a site to acquire, or simply wish to explore possibilities — our advisory team responds within 24 hours.
            </p>
          </div>

          {/* Contact details */}
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="18" height="18">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              label: 'Phone',
              value: '+91 98900 29291',
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="18" height="18">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              label: 'Email',
              value: 'swapnil@nationbuysrealtors.com',
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="18" height="18">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              label: 'Offices',
              value: 'Pune · Mumbai · Goa · Dubai',
            },
          ].map(({ icon, label, value }, i) => (
            <div key={i} className="lg-anim" style={{ opacity: 0, transform: 'translateY(18px)', transition: 'all 0.7s ease', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '38px', height: '38px', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                {icon}
              </div>
              <div>
                <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.5rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', fontWeight: 400, marginBottom: '2px' }}>{label}</p>
                <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Form */}
        <div className="lg-anim lg-form" style={{
          opacity: 0, transform: 'translateY(28px)', transition: 'all 0.9s ease',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(201,168,76,0.12)',
          padding: '2.5rem',
          boxSizing: 'border-box',
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--gold)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="24" height="24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.6rem', fontWeight: 400, color: 'rgba(255,255,255,0.88)', marginBottom: '0.75rem' }}>Request Received</h3>
              <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontWeight: 300, lineHeight: 1.75 }}>
                Our advisory team will reach out to you within 24 hours to begin the conversation.
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginBottom: '1.75rem', fontWeight: 400 }}>
                Advisory Request Form
              </p>

              <div className="form-grid" style={{ marginBottom: '1rem' }}>

                {/* Full Name */}
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>Full Name <span style={{ color: 'var(--gold)' }}>*</span></label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={set('name')}
                    style={inputStyle(!!errors.name)}
                    {...focusHandlers('name')}
                    maxLength={80}
                    autoComplete="name"
                  />
                  {errors.name && <p style={errorStyle}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="form-email">
                  <label style={labelStyle}>Email <span style={{ color: 'var(--gold)' }}>*</span></label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={set('email')}
                    style={inputStyle(!!errors.email)}
                    {...focusHandlers('email')}
                    maxLength={254}
                    autoComplete="email"
                  />
                  {errors.email && <p style={errorStyle}>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="form-phone">
                  <label style={labelStyle}>Phone Number <span style={{ color: 'var(--gold)' }}>*</span></label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={set('phone')}
                    style={inputStyle(!!errors.phone)}
                    {...focusHandlers('phone')}
                    maxLength={20}
                    autoComplete="tel"
                  />
                  {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
                </div>

                {/* Service */}
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>Service Required <span style={{ color: 'var(--gold)' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={form.service}
                      onChange={set('service')}
                      style={{ ...inputStyle(), cursor: 'pointer' }}
                      {...focusHandlers('service')}
                    >
                      <option value="" style={{ background: '#111' }}>Select a service</option>
                      {SERVICES_LIST.map(s => <option key={s} value={s} style={{ background: '#111' }}>{s}</option>)}
                    </select>
                    {errors.service && <p style={errorStyle}>{errors.service}</p>}
                    <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(201,168,76,0.5)' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>
                    Message
                    <span style={{ color: 'rgba(255,255,255,0.18)', marginLeft: '0.5rem', textTransform: 'none', letterSpacing: 0, fontSize: '0.5rem' }}>
                      {form.message.length}/1000
                    </span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your requirement or mandate…"
                    value={form.message}
                    onChange={set('message')}
                    style={{ ...inputStyle(!!errors.message), resize: 'none', lineHeight: 1.7 }}
                    {...focusHandlers('message')}
                    maxLength={1000}
                  />
                  {errors.message && <p style={errorStyle}>{errors.message}</p>}
                </div>
              </div>

              {/* Network / server error banner */}
              {submitError && (
                <div style={{
                  background: 'rgba(220,80,80,0.08)',
                  border: '1px solid rgba(220,80,80,0.3)',
                  padding: '0.85rem 1rem',
                  marginBottom: '1rem',
                  fontFamily: 'Jost,sans-serif',
                  fontSize: '0.65rem',
                  color: 'rgba(220,120,120,0.9)',
                  fontWeight: 300,
                  lineHeight: 1.6,
                }}>
                  {submitError}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading ? 'rgba(201,168,76,0.4)' : 'linear-gradient(135deg,var(--gold-light),var(--gold))',
                  border: 'none',
                  cursor: loading ? 'wait' : 'pointer',
                  padding: '0.95rem 2rem',
                  fontFamily: 'Jost,sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--obsidian)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' } }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              >
                {loading ? 'Submitting…' : (
                  <>
                    Submit Request
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.56rem', color: 'rgba(255,255,255,0.2)', fontWeight: 300, textAlign: 'center', marginTop: '0.85rem', letterSpacing: '0.04em' }}>
                We respond within 24 hours. All enquiries are strictly confidential.
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }} />

      <style>{`
        .lg-layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 6rem;
          align-items: center;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 1024px) {
          .lg-layout {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
        @media (max-width: 540px) {
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          .form-email, .form-phone {
            grid-column: 1 / -1 !important;
          }
          .lg-form {
            padding: 1.5rem !important;
          }
        }
        @media (min-width: 901px) {
          section {
            padding: 7rem 5rem;
          }
        }
      `}</style>
    </section>
  )
}