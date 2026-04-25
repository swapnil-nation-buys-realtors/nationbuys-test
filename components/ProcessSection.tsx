'use client'
import { useEffect, useRef } from 'react'

import Link from 'next/link'

const STEPS = [
  {
    num: '01',
    title: 'Call Us',
    sub: 'Begin the Conversation',
    body: 'Reach out to our advisory team for a confidential consultation. We listen to your mandate  whether buying, selling, or leasing  and align it with our curated portfolio.',
    Icon: ({ onClick }: { onClick?: () => void }) => (
      <button
        type="button"
        aria-label="Copy phone number"
        onClick={onClick}
        style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer', color: 'inherit' }}
        tabIndex={0}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="26" height="26">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    ),
    onIconClick: async () => {
      try {
        await navigator.clipboard.writeText('98900 29291')
        alert('Phone number copied to clipboard!')
      } catch (e) {
        // Optionally, handle error -- for future scope
      }
    },
  },
  {
    num: '02',
    title: 'Schedule the Visit',
    sub: 'Experience the Opportunity',
    body: 'We arrange exclusive, curated site visits at your convenience  across Pune, Mumbai, Goa, or Dubai. Our experts guide you through every detail, from due diligence to development potential.',
    Icon: ({ onClick }: { onClick?: () => void }) => (
      <Link href="/contact#enquire" passHref onClick={(e) => {
        if (typeof window !== 'undefined' && window.location.pathname.startsWith('/contact')) {
          const elem = document.getElementById('enquire');
          if (elem) {
            e.preventDefault();
            elem.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', '#enquire');
          }
        }
      }} style={{ color: 'inherit', textDecoration: 'none' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="26" height="26">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
      </Link>
    ),
  },
  {
    num: '03',
    title: 'Close the Deal',
    sub: 'Seal with Confidence',
    body: 'From negotiation to RERA-compliant documentation, our end-to-end transaction management ensures a seamless closure so you can focus on the vision, not the paperwork.',
    Icon: ({ onClick }: { onClick?: () => void }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="26" height="26">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      ref.current?.querySelectorAll<HTMLElement>('.proc-anim').forEach((el, i) => {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, i * 130)
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // Handler for icon click for step 01
  const handleIconClick = (step: any) => {
    if (step.onIconClick) step.onIconClick()
  }

  return (
    <section ref={ref} style={{ background: 'var(--charcoal)', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative gold vertical line left */}
      <div style={{ position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '2px', background: 'linear-gradient(180deg,transparent,var(--gold),transparent)' }}/>

      {/* Ghost watermark */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(5rem,14vw,13rem)',
        fontWeight: 300, lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(201,168,76,0.04)',
        userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap',
        letterSpacing: '0.08em',
      }}>PROCESS</div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="proc-anim" style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.8s ease', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.6rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 300, marginBottom: '0.75rem' }}>
            How We Work
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 300, color: 'rgba(255,255,255,0.92)', lineHeight: 1.15 }}>
            Your Journey to{' '}
            <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#E2C07A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Landmark Ownership
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="proc-grid">
          {STEPS.map(({ num, title, sub, body, Icon, onIconClick }, i) => (
            <div
              key={num}
              className="proc-anim proc-card"
              style={{
                opacity: 0, transform: 'translateY(28px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                padding: '2.5rem 2.25rem',
                position: 'relative', zIndex: 1,
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(201,168,76,0.03)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
              }}
            >
              {/* Step number + icon row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  border: '1px solid rgba(201,168,76,0.3)',
                  background: 'rgba(201,168,76,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold)', flexShrink: 0,
                  position: 'relative',
                }}>
                  {/* Icon clickable for 01 and 02, normal for 03 */}
                  {onIconClick ? (
                    <Icon onClick={() => handleIconClick(STEPS[i])} />
                  ) : (
                    <Icon />
                  )}
                  <span style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'linear-gradient(135deg,#E2C07A,#C9A84C)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Jost,sans-serif', fontSize: '0.48rem',
                    fontWeight: 600, color: '#111',
                    letterSpacing: '0.02em',
                  }}>{num}</span>
                </div>
              </div>

              {/* Text */}
              <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.55rem', fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: '0.25rem', lineHeight: 1.15 }}>
                {title}
              </h3>
              <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold-dim)', fontWeight: 400, marginBottom: '1rem' }}>
                {sub}
              </p>
              <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontWeight: 300, lineHeight: 1.75 }}>
                {body}
              </p>

              {/* Bottom gold bar on hover */}
              <div className="proc-bar" style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg,var(--gold-dim),var(--gold),var(--gold-light))',
                transform: 'scaleX(0)', transformOrigin: 'left',
                transition: 'transform 0.35s ease',
              }}/>
            </div>
          ))}
        </div>
      </div>

      {/* Top / bottom rules */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }}/>

      <style>{`
        .proc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
        }
        .proc-grid .proc-card:not(:last-child) {
          border-right: 1px solid rgba(201,168,76,0.1);
        }
        .proc-card { transition: background 0.25s ease, opacity 0.7s ease, transform 0.7s ease !important; }
        .proc-card:hover .proc-bar { transform: scaleX(1) !important; }

        @media (max-width: 900px) {
          .proc-grid {
            grid-template-columns: 1fr !important;
          }
          .proc-grid .proc-card:not(:last-child) {
            border-right: none !important;
            border-bottom: 1px solid rgba(201,168,76,0.1);
          }
          .proc-card { padding: 2rem 1.25rem !important; }
        }

        @media (min-width: 600px) and (max-width: 900px) {
          .proc-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .proc-grid .proc-card:nth-child(odd):not(:last-child) {
            border-right: 1px solid rgba(201,168,76,0.1) !important;
            border-bottom: 1px solid rgba(201,168,76,0.1);
          }
          .proc-grid .proc-card:nth-child(even) {
            border-right: none !important;
            border-bottom: 1px solid rgba(201,168,76,0.1);
          }
          .proc-grid .proc-card:last-child {
            border-bottom: none !important;
          }
        }

        @media (min-width: 901px) {
          section[data-section="process"] {
            padding: 7rem 5rem !important;
          }
        }
      `}</style>
    </section>
  )
}