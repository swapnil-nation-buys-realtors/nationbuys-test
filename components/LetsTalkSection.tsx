'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function LetsTalkSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      ref.current?.querySelectorAll<HTMLElement>('.ltt-anim').forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, i * 120)
      })
    }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{ background: 'var(--obsidian)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Top rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.28),transparent)',
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 70% at 30% 80%, rgba(201,168,76,0.05) 0%, transparent 70%)',
      }} />

      {/* Ghost NBR watermark */}
      <div style={{
        position: 'absolute', bottom: '-2.5rem', left: '-1rem',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(5rem,13vw,12rem)',
        fontWeight: 300, lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(201,168,76,0.042)',
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '0.06em', whiteSpace: 'nowrap',
      }}>NBR</div>

      {/* ── Layout grid ── */}
      <div className="ltt-grid" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── LEFT: centered heading ── */}
        <div className="ltt-left">

          {/* Eyebrow */}
          <div className="ltt-anim ltt-eyebrow">
            <div style={{ width: '28px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Jost, sans-serif', fontSize: '0.58rem',
              letterSpacing: '0.4em', textTransform: 'uppercase',
              color: 'var(--gold)', fontWeight: 300,
            }}>Get in Touch</span>
            <div style={{ width: '28px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />
          </div>

          {/* Heading */}
          <h2 className="ltt-anim ltt-heading">
            Let's Talk About<br />
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg,#E2C07A,#C9A84C,#A07830)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Your Requirement</span>
          </h2>

          {/* Subtext */}
          <p className="ltt-anim ltt-sub">
            Whether you're seeking prime land parcels, pre-leased commercial assets,
            or bespoke investment advisory, our team is ready to deliver beyond expectation.
          </p>

          {/* CTA */}
          <div className="ltt-anim" style={{ opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
            <Link
              href="/contact"
              className="ltt-cta"
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.65rem', fontWeight: 500,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                background: 'linear-gradient(135deg,var(--gold-light),var(--gold))',
                color: 'var(--obsidian)', textDecoration: 'none',
                padding: '0.9rem 2.4rem',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                transition: 'transform 0.2s, opacity 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-2px)'; el.style.opacity = '0.88'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'; el.style.opacity = '1'
              }}
            >
              Send an Enquiry
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.5h10M7 2l4.5 4.5L7 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── RIGHT: contact panel ── */}
        <div className="ltt-anim ltt-panel">

          {/* Panel heading */}
          <div style={{ padding: '2.8rem 2.5rem 2rem', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
            <p style={{
              fontFamily: 'Jost, sans-serif', fontSize: '0.55rem',
              letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.55)', fontWeight: 400, marginBottom: '0.6rem',
            }}>Direct Contact</p>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem',
              fontWeight: 300, color: 'rgba(255,255,255,0.72)', lineHeight: 1.3,
            }}>Reach us directly.<br />We're ready.</p>
          </div>

          {/* Contact rows */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <ContactItem
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="18" height="18">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              label="Call Us"
              primary="+91 98900 29291"
              secondary="Mon – Sat, 9 am – 7 pm IST"
              href="tel:+91 98900 29291"
            />
            <ContactItem
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="18" height="18">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              label="Email Us"
              primary="swapnil@nationbuysrealtors.com"
              secondary="We respond within 24 hours"
              href="mailto:swapnil@nationbuysrealtors.com"
            />
            <ContactItem
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="18" height="18">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              label="Our Markets"
              primary="Pune · Mumbai · Goa"
              secondary="Dubai · International"
              href="/about"
              isLast
            />
          </div>

          {/* Footer strip */}
          <div style={{
            padding: '1.5rem 2.5rem',
            borderTop: '1px solid rgba(201,168,76,0.08)',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: 'var(--gold)', flexShrink: 0,
              boxShadow: '0 0 6px 1px rgba(201,168,76,0.5)',
            }} />
            <p style={{
              fontFamily: 'Jost, sans-serif', fontSize: '0.57rem',
              color: 'rgba(255,255,255,0.18)', fontWeight: 300, letterSpacing: '0.06em',
            }}>Est. 2009 · RERA Compliant · Trusted by 500+ Clients</p>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.28),transparent)',
      }} />

      <style>{`
        /* ── Base (desktop) ── */
        .ltt-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          min-height: 560px;
        }
        .ltt-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 7rem 5rem;
          text-align: center;
        }
        .ltt-eyebrow {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.75s ease, transform 0.75s ease;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .ltt-heading {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.85s ease, transform 0.85s ease;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 4.5vw, 4.2rem);
          font-weight: 300;
          line-height: 1.1;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.01em;
          margin-bottom: 1.5rem;
        }
        .ltt-sub {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.8s ease, transform 0.8s ease;
          font-family: 'Jost', sans-serif;
          font-size: 0.76rem;
          color: rgba(255,255,255,0.32);
          font-weight: 300;
          line-height: 1.85;
          letter-spacing: 0.03em;
          max-width: 400px;
          margin-bottom: 2.5rem;
        }
        .ltt-panel {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.9s ease, transform 0.9s ease;
          border-left: 1px solid rgba(201,168,76,0.1);
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.012);
        }

        /* ── Tablet (≤ 900px): stack vertically ── */
        @media (max-width: 900px) {
          .ltt-grid {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .ltt-left {
            padding: 5rem 3rem 4rem;
          }
          .ltt-panel {
            border-left: none;
            border-top: 1px solid rgba(201,168,76,0.1);
          }
        }

        /* ── Mobile (≤ 580px) ── */
        @media (max-width: 580px) {
          .ltt-left {
            padding: 4rem 1.5rem 3rem;
          }
          .ltt-heading {
            font-size: clamp(2.2rem, 8vw, 3rem) !important;
          }
          .ltt-sub {
            font-size: 0.72rem;
            max-width: 100%;
          }
          .ltt-eyebrow {
            gap: 0.6rem;
          }
        }
      `}</style>
    </section>
  )
}

/* ─── Contact row item ─── */
function ContactItem({
  icon, label, primary, secondary, href, isLast,
}: {
  icon: React.ReactNode
  label: string
  primary: string
  secondary: string
  href: string
  isLast?: boolean
}) {
  return (
    <a
      href={href}
      style={{
        display: 'flex', alignItems: 'center', gap: '1.1rem',
        padding: '1.8rem 2.5rem',
        borderBottom: isLast ? 'none' : '1px solid rgba(201,168,76,0.06)',
        textDecoration: 'none',
        transition: 'background 0.28s',
        cursor: 'pointer', position: 'relative',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'rgba(201,168,76,0.04)'
        const bar = el.querySelector<HTMLElement>('.ci-bar')
        if (bar) bar.style.transform = 'scaleY(1)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'transparent'
        const bar = el.querySelector<HTMLElement>('.ci-bar')
        if (bar) bar.style.transform = 'scaleY(0)'
      }}
    >
      {/* Left hover accent */}
      <div className="ci-bar" style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
        background: 'linear-gradient(180deg,transparent,var(--gold),transparent)',
        transform: 'scaleY(0)', transformOrigin: 'center',
        transition: 'transform 0.3s ease',
      }} />

      {/* Icon */}
      <div style={{
        flexShrink: 0, width: '36px', height: '36px',
        border: '1px solid rgba(201,168,76,0.16)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--gold)',
      }}>
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'Jost, sans-serif', fontSize: '0.52rem',
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)', fontWeight: 400, marginBottom: '0.3rem',
        }}>{label}</p>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 400,
          color: 'rgba(255,255,255,0.8)', lineHeight: 1.2, marginBottom: '0.22rem',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{primary}</p>
        <p style={{
          fontFamily: 'Jost, sans-serif', fontSize: '0.58rem',
          color: 'rgba(255,255,255,0.22)', fontWeight: 300, letterSpacing: '0.03em',
        }}>{secondary}</p>
      </div>

      {/* Arrow */}
      <div style={{
        flexShrink: 0, width: '26px', height: '26px',
        border: '1px solid rgba(201,168,76,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(201,168,76,0.4)',
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5h7M5 1.5l3.5 3.5L5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  )
}