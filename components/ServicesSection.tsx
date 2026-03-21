'use client'
import { useEffect, useRef } from 'react'

const SERVICES = [
  {
    title: 'Sale & Purchase of Land',
    desc: 'Expert facilitation of large parcel transactions primed for transformative residential, commercial, or industrial mega-developments.',
    tag: 'Core',
    img: '/Sale & Purchase of Land.png',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="24" height="24">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Exclusive Mandates',
    desc: 'Sole-selling partnerships that maximize value for landmark development projects and premium pre-leased portfolios.',
    tag: 'Premium',
    img: '/Exclusive Mandates.png',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="24" height="24">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Data Center Land',
    desc: 'Prime expansive sites optimized for next-generation data center developments with power, connectivity, and expansion capacity.',
    tag: 'Tech',
    img: '/Data Center Land -1.png',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="24" height="24">
        <rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/>
        <circle cx="18" cy="5" r="1" fill="currentColor"/><circle cx="18" cy="12" r="1" fill="currentColor"/><circle cx="18" cy="19" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Managed Office Spaces',
    desc: "Reotek (Nation Buys Realtors's sister-entity) delivers bespoke enterprise workplace solutions—1M sq ft of tech-enabled, asset-light managed spaces.",
    tag: 'Reotek',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="24" height="24">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Prelease Commercial',
    desc: 'Securing income-ready properties with assured tenancies for immediate yields and long-term investment stability.',
    tag: 'Yields',
    img: '/Prelease Commercial-1.png',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="24" height="24">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Industrial Land',
    desc: 'Matching expansive industrial plots with strategic buyers to power manufacturing and logistics hubs.',
    tag: 'Industrial',
    img: '/Industrial Land.png',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="24" height="24">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Commercial Leasing',
    desc: 'Streamlining high-value leases for retail, office, and mixed-use spaces with optimal pricing and tenant alignment.',
    tag: 'Leasing',
    img: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=600&q=80',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="24" height="24">
        <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Investment Advisory',
    desc: 'Strategic guidance on high-ROI opportunities in land redevelopment and pre-leased assets for visionary investors.',
    tag: 'Advisory',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="24" height="24">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      ref.current?.querySelectorAll<HTMLElement>('.svc').forEach((el, i) => {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)' }, i * 65)
      })
    }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="services" ref={ref} className="services-section" style={{ background: 'var(--smoke)', padding: '6rem 5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div className="services-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '1.5rem' }}>
          <div>
            <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold-dim)', fontWeight: 400, marginBottom: '0.5rem' }}>
              Our Services
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(2.5rem,4.5vw,3.8rem)', fontWeight: 300, color: '#0d0d0d', lineHeight: 1.1 }}>
              What We Offer
            </h2>
          </div>
          <p className="services-sub" style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.72rem', color: 'rgba(0,0,0,0.42)', fontWeight: 300, maxWidth: '260px', textAlign: 'right', lineHeight: 1.65 }}>
            We are redefining real estate with innovation and excellence.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', marginBottom: '2rem' }}/>

        {/* Grid */}
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {SERVICES.map((svc, i) => {
            const { Icon } = svc

            return (
              <div
                key={i}
                className="svc"
                style={{
                  opacity: 0, transform: 'translateY(18px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'hidden',
                  height: '160px',
                  maxHeight: '160px',
                  padding: '8px',           /* ← padding around everything inside */
                  gap: '10px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(201,168,76,0.45)'
                  el.style.boxShadow = '0 6px 32px rgba(0,0,0,0.1)'
                  el.style.transform = 'translateY(-3px)'
                  const img = el.querySelector<HTMLImageElement>('.svc-img')
                  if (img) img.style.transform = 'scale(1.06)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(0,0,0,0.06)'
                  el.style.boxShadow = 'none'
                  el.style.transform = 'translateY(0)'
                  const img = el.querySelector<HTMLImageElement>('.svc-img')
                  if (img) img.style.transform = 'scale(1)'
                }}
              >
                {/* Image — all 4 corners fully rounded, floats inside with padding */}
                <div
                  className="svc-img-wrap"
                  style={{
                    width: '38%',
                    flexShrink: 0,
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: '8px',    /* ← all corners rounded */
                  }}
                >
                  <img
                    className="svc-img"
                    src={svc.img}
                    alt={svc.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      display: 'block',
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.08)', borderRadius: '8px' }}/>
                </div>

                {/* Text content */}
                <div style={{ flex: 1, padding: '0.3rem 0.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', overflow: 'hidden' }}>
                  {/* Icon box */}
                  <div style={{
                    width: '34px', height: '34px',
                    background: 'rgba(201,168,76,0.07)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold-dim)', flexShrink: 0,
                  }}>
                    <Icon/>
                  </div>

                  {/* Tag */}
                  <span style={{
                    fontFamily: 'Jost,sans-serif', fontSize: '0.5rem',
                    letterSpacing: '0.26em', textTransform: 'uppercase',
                    color: 'var(--gold-dim)', fontWeight: 400,
                    border: '1px solid rgba(160,120,48,0.28)',
                    padding: '1px 6px', alignSelf: 'flex-start', flexShrink: 0,
                  }}>
                    {svc.tag}
                  </span>

                  {/* Title */}
                  <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1rem', fontWeight: 500, color: '#111', lineHeight: 1.2, margin: 0, flexShrink: 0 }}>
                    {svc.title}
                  </h3>

                  {/* Desc */}
                  <p style={{
                    fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', color: 'rgba(0,0,0,0.44)',
                    fontWeight: 300, lineHeight: 1.55, margin: 0,
                    overflow: 'hidden',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}>
                    {svc.desc}
                  </p>
                </div>

                {/* Gold bottom bar on hover */}
                <div className="svc-bar" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg,var(--gold-dim),var(--gold),var(--gold-light))',
                  transform: 'scaleX(0)', transformOrigin: 'left',
                  transition: 'transform 0.35s ease',
                  borderRadius: '0 0 12px 12px',
                }}/>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .svc { position: relative; }
        .svc:hover .svc-bar { transform: scaleX(1) !important; }

        @media (max-width: 768px) {
          .services-section { padding: 4rem 1.5rem !important; }
          .services-sub { display: none; }
          .services-grid { grid-template-columns: 1fr !important; }
          .svc { height: auto !important; max-height: none !important; }
          .svc-img-wrap { width: 32% !important; min-height: 120px; }
        }
        @media (max-width: 480px) {
          .services-section { padding: 3rem 1rem !important; }
          .svc-img-wrap { display: none !important; }
          .svc { height: auto !important; max-height: none !important; }
        }
      `}</style>
    </section>
  )
}