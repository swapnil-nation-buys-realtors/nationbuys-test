'use client'
import { useState, useEffect, useRef } from 'react'

const FAQS = [
  {
    q: 'What locations do you currently deal in?',
    a: 'NBR Realty operates across four key markets: Pune and Mumbai in Maharashtra, the coastal luxury enclave of Goa, and the global investment hub of Dubai, UAE. Each market is served by our dedicated local advisors with deep on-ground expertise.',
  },
  {
    q: 'How do I schedule a property viewing?',
    a: "Simply reach out via our contact form, call us directly, or click 'Book a Visit' anywhere on the site. Our advisory team will coordinate an exclusive, curated site visit at your earliest convenience — tailored to your specific mandate.",
  },
  {
    q: 'What types of properties do you specialize in?',
    a: 'We specialize in large-parcel land transactions (residential, commercial, industrial, and data center sites), pre-leased commercial assets with assured tenancies, exclusive mandate sole-selling, and managed office spaces through our sister entity Reotek.',
  },
  {
    q: 'Are your transactions RERA compliant?',
    a: 'Absolutely. Every transaction facilitated by NBR Realty adheres to the Real Estate (Regulation and Development) Act, 2016. We ensure full regulatory compliance across all documentation, disclosures, and closings.',
  },
  {
    q: 'What is the minimum investment threshold?',
    a: 'Our mandates typically begin at ₹5 Crore for land parcels and pre-leased assets. However, we encourage all serious investors to connect with us — we will transparently advise whether an opportunity aligns with your specific investment goals.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. We have a strong international presence, particularly in Dubai, and routinely assist NRI and global institutional investors with cross-border real estate strategies, including currency structuring, repatriation guidance, and international due diligence support.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      ref.current?.querySelectorAll<HTMLElement>('.faq-anim').forEach((el, i) => {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, i * 80)
      })
    }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background: 'var(--charcoal)', padding: '7rem 5rem', position: 'relative', overflow: 'hidden' }}>

      {/* Ghost watermark */}
      <div style={{
        position: 'absolute', left: '-2rem', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'Cormorant Garamond,serif',
        fontSize: 'clamp(6rem,12vw,11rem)',
        fontWeight: 300, lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(201,168,76,0.04)',
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '0.05em',
      }}>FAQ</div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '6rem', alignItems: 'start' }}>

        {/* LEFT: Heading */}
        <div className="faq-anim" style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.8s ease', position: 'sticky', top: '100px' }}>
          <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.6rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 300, marginBottom: '0.85rem' }}>
            Got Questions?
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(2rem,3vw,2.8rem)', fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Your Questions,{' '}
            <span style={{ display: 'block', fontStyle: 'italic', background: 'linear-gradient(135deg,#E2C07A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Elegantly Answered
            </span>
          </h2>
          <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', fontWeight: 300, lineHeight: 1.75, maxWidth: '280px' }}>
            Everything you need to know about working with NBR Realty. Can't find the answer? Our advisors are one call away.
          </p>

          {/* Gold divider */}
          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,var(--gold),transparent)', margin: '2rem 0' }}/>

          <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', color: 'rgba(201,168,76,0.6)', fontWeight: 300, letterSpacing: '0.04em' }}>
            Est. 2007 · RERA Compliant
          </p>
        </div>

        {/* RIGHT: Accordion */}
        <div>
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className="faq-anim"
              style={{
                opacity: 0, transform: 'translateY(18px)',
                transition: 'opacity 0.65s ease, transform 0.65s ease',
                borderBottom: '1px solid rgba(201,168,76,0.1)',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.5rem 0', gap: '1rem', textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'Cormorant Garamond,serif',
                  fontSize: 'clamp(1rem,1.4vw,1.2rem)',
                  fontWeight: open === i ? 500 : 400,
                  color: open === i ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)',
                  lineHeight: 1.3,
                  transition: 'color 0.25s',
                }}>{q}</span>

                {/* Plus / Minus icon */}
                <div style={{
                  flexShrink: 0, width: '28px', height: '28px',
                  border: `1px solid ${open === i ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'border-color 0.25s, background 0.25s',
                  background: open === i ? 'rgba(201,168,76,0.08)' : 'transparent',
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round"
                      style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0)', transformOrigin: 'center', transition: 'transform 0.3s ease' }}
                    />
                  </svg>
                </div>
              </button>

              {/* Answer panel */}
              <div style={{
                maxHeight: open === i ? '300px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)',
              }}>
                <p style={{
                  fontFamily: 'Jost,sans-serif',
                  fontSize: '0.72rem', fontWeight: 300,
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.8,
                  paddingBottom: '1.5rem',
                  paddingRight: '2.5rem',
                }}>
                  {a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }}/>
    </section>
  )
}
