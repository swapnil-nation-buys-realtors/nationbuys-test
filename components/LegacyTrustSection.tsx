'use client'
import { useState, useEffect, useRef } from 'react'

const TESTIMONIALS = [
  {
    quote: "NBR Realty's execution on our 300-acre mandate was extraordinary. Their market insight and deep network unlocked value we hadn't imagined possible.",
    name: 'Arvind Mehta',
    role: 'Director, Cornerstone Developments · Pune',
    initials: 'AM',
  },
  {
    quote: "Swapnil and his team navigated a complex pre-leased portfolio acquisition with exceptional professionalism. Every promise made was delivered upon.",
    name: 'Reena Kapoor',
    role: 'Chief Investment Officer, Axis Capital · Mumbai',
    initials: 'RK',
  },
  {
    quote: "From the first call to the final registration, NBR's process felt seamless. Their Dubai connections gave us access no other broker could offer.",
    name: 'Sanjay Thakur',
    role: 'MD, Skyline Ventures · Dubai',
    initials: 'ST',
  },
]

const LOGOS = [
  { name: 'GODREJ', sub: 'Properties' },
  { name: 'TATA', sub: 'Housing' },
  { name: 'MAHINDRA', sub: 'Lifespaces' },
  { name: 'KOLTE', sub: 'Patil' },
  { name: 'BRIGADE', sub: 'Group' },
  { name: 'PRESTIGE', sub: 'Estates' },
  { name: 'DLF', sub: 'Limited' },
  { name: 'OBEROI', sub: 'Realty' },
  { name: 'EMBASSY', sub: 'Group' },
  { name: 'SOBHA', sub: 'Limited' },
  { name: 'LODHA', sub: 'Developers' },
  { name: 'PIRAMAL', sub: 'Realty' },
]
const ALL_LOGOS = [...LOGOS, ...LOGOS]

export default function LegacyTrustSection() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | any>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5500)
    return () => clearInterval(timerRef.current)
  }, [])

  const go = (i: number) => {
    clearInterval(timerRef.current)
    setActive(i)
    timerRef.current = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5500)
  }

  return (
    <section style={{ background: '#0a0a0a', padding: '7rem 0 6rem', overflow: 'hidden', position: 'relative' }}>

      {/* Top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.28),transparent)' }}/>

      {/* Header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 5rem', marginBottom: '5rem', position: 'relative' }}>
        {/* Ghost watermark */}
        <div style={{
          position: 'absolute', top: '-1.5rem', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'Cormorant Garamond,serif',
          fontSize: 'clamp(5rem,11vw,10rem)',
          fontWeight: 300, color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.055)',
          letterSpacing: '0.12em',
          userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>TRUST</div>

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 300, marginBottom: '0.85rem' }}>
            Partners & Associates
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 300, color: 'rgba(255,255,255,0.88)' }}>
            A Legacy of{' '}
            <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#E2C07A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Trust
            </span>{' '}
            &amp; Distinction
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '5.5rem' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '160px', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(90deg,#0a0a0a 0%,transparent 100%)' }}/>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '160px', zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(-90deg,#0a0a0a 0%,transparent 100%)' }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', width: 'max-content', animation: 'marquee 42s linear infinite' }}>
          {ALL_LOGOS.map((logo, i) => (
            <div key={i} style={{
              flexShrink: 0, width: '180px', height: '80px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(201,168,76,0.07)', borderRight: 'none',
              transition: 'background 0.3s', cursor: 'default',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.04)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <span style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.14)', transition: 'color 0.35s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.65)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.14)'}
              >{logo.name}</span>
              <span style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.09)', marginTop: '3px' }}>{logo.sub}</span>
            </div>
          ))}
          <div style={{ width: '1px', height: '80px', background: 'rgba(201,168,76,0.07)' }}/>
        </div>
      </div>

      {/* Testimonials carousel */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 5rem', textAlign: 'center', position: 'relative' }}>

        {/* Open quote */}
        <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '5rem', lineHeight: 0.8, marginBottom: '1.5rem', color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.3)' }}>"</div>

        {/* Quote text — fades on change */}
        <div style={{ position: 'relative', minHeight: '120px' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              position: i === 0 ? 'relative' : 'absolute',
              inset: 0,
              opacity: i === active ? 1 : 0,
              transform: i === active ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              pointerEvents: i === active ? 'auto' : 'none',
            }}>
              <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(1.05rem,1.8vw,1.45rem)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.7, marginBottom: '2rem' }}>
                {t.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
                <div style={{ height: '1px', width: '36px', background: 'rgba(201,168,76,0.3)' }}/>
                {/* Avatar initial */}
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg,rgba(201,168,76,0.3),rgba(201,168,76,0.1))',
                  border: '1px solid rgba(201,168,76,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Cormorant Garamond,serif', fontSize: '0.85rem',
                  fontWeight: 500, color: 'var(--gold)',
                }}>{t.initials}</div>
                <div>
                  <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500 }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', fontWeight: 300, marginTop: '2px' }}>
                    {t.role}
                  </p>
                </div>
                <div style={{ height: '1px', width: '36px', background: 'rgba(201,168,76,0.3)' }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2.5rem' }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
            }}>
              <span style={{
                display: 'block',
                width: i === active ? '24px' : '6px', height: '2px',
                background: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.18)',
                transition: 'width 0.4s ease, background 0.4s ease',
              }}/>
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.28),transparent)' }}/>
    </section>
  )
}
