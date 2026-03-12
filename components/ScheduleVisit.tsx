'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const CITIES = [
  { name: 'Pune', tagline: 'Maharashtra Growth Capital', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
  { name: 'Mumbai', tagline: 'The Financial Powerhouse', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { name: 'Goa', tagline: 'Coastal Luxury & Leisure', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
  { name: 'Dubai', tagline: 'Global Investment Frontier', img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80' },
]

export default function ScheduleVisit() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      ref.current?.querySelectorAll<HTMLElement>('.sv-anim').forEach((el, i) => {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, i * 100)
      })
    }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background: 'var(--smoke)', padding: '7rem 5rem', position: 'relative', overflow: 'hidden' }}>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header split layout */}
        <div className="sv-anim" style={{ opacity: 0, transform: 'translateY(24px)', transition: 'all 0.8s ease', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', gap: '2rem' }}>
          <div>
            <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.6rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--gold-dim)', fontWeight: 400, marginBottom: '0.6rem' }}>
              Exclusive Site Visits
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 300, color: '#0d0d0d', lineHeight: 1.15 }}>
              Schedule a Visit
            </h2>
          </div>
          <div style={{ maxWidth: '300px' }}>
            <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.72rem', color: 'rgba(0,0,0,0.4)', fontWeight: 300, lineHeight: 1.75, marginBottom: '1.25rem' }}>
              Experience prime land parcels and pre-leased assets firsthand. Our team curates every visit for a decisive, informed investment experience.
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'Jost,sans-serif', fontSize: '0.65rem',
              fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase',
              background: 'linear-gradient(135deg,var(--gold-light),var(--gold))',
              color: 'var(--obsidian)', textDecoration: 'none',
              padding: '0.8rem 1.8rem',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            >
              Book a Visit
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', marginBottom: '2.5rem' }}/>

        {/* City cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
          {CITIES.map(({ name, tagline, img }, i) => (
            <div
              key={i}
              className="sv-anim sv-card"
              style={{
                opacity: 0, transform: 'translateY(20px)',
                transition: 'opacity 0.65s ease, transform 0.65s ease',
                position: 'relative', height: '300px', overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img
                className="sv-img"
                src={img}
                alt={name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
              />
              {/* Dark gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.2) 55%,rgba(0,0,0,0.05) 100%)' }}/>

              {/* Gold corner accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '36px', height: '2px', background: 'var(--gold)', transition: 'width 0.4s ease' }} className="sv-accent"/>

              {/* Text */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.25rem' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.55rem', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: '0.35rem' }}>
                  {name}
                </h3>
                <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)', fontWeight: 300 }}>
                  {tagline}
                </p>
              </div>

              {/* Border on hover */}
              <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(201,168,76,0)', transition: 'border-color 0.3s ease' }} className="sv-border"/>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sv-card:hover .sv-img    { transform: scale(1.06); }
        .sv-card:hover .sv-border { border-color: rgba(201,168,76,0.45) !important; }
        .sv-card:hover .sv-accent { width: 64px !important; }
        @media (max-width: 900px) {
          .sv-card { height: 220px !important; }
        }
        @media (max-width: 600px) {
          [style*="gridTemplateColumns: repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
