'use client'
import { useEffect, useRef } from 'react'

const REASONS = [
  {
    title: 'Proven Scale & Expertise',
    body: "Led by Swapnil Bora's 17+ years, we transform massive land parcels into mega-developments — handling rapid execution across Pune, Mumbai, Goa, and Dubai.",
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="20" height="20">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Strategic Market Edge',
    body: 'Deep insight into market positions us to unlock hidden potential in expansive holdings, far beyond standard plots, for optimal ROI.',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="20" height="20">
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Seamless Transactions',
    body: 'End-to-end support with trust, technology, and transparency — RERA-compliant processes ensure stress-free closings and immediate value.',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="20" height="20">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'We Succeed Together',
    body: 'Our proactive ethos delivers results praised by clients, with performance tracking for high yields from pre-leased commercial and industrial assets.',
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="20" height="20">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      ref.current?.querySelectorAll<HTMLElement>('.wcu-anim').forEach((el, i) => {
        setTimeout(() => { el.style.opacity='1'; el.style.transform='none' }, i*90)
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background:'var(--ink)', overflow:'hidden' }}>
      <div className="wcu-grid" style={{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1.35fr', minHeight:'560px' }}>

        {/* LEFT */}
        <div className="wcu-anim wcu-left" style={{
          opacity:0, transform:'translateX(-24px)',
          transition:'all 0.85s ease',
          padding:'5rem 4rem',
          display:'flex', flexDirection:'column', justifyContent:'center',
          borderRight:'1px solid rgba(255,255,255,0.04)',
          position:'relative', overflow:'hidden',
        }}>
          <span style={{
            position:'absolute', bottom:'-1rem', left:'-1rem',
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'11rem', fontWeight:300, lineHeight:1,
            color:'transparent',
            WebkitTextStroke:'1px rgba(201,168,76,0.05)',
            userSelect:'none', pointerEvents:'none',
            letterSpacing:'0.05em',
          }}>Nation Buys Realtors</span>

          <p style={{
            fontFamily:'Jost,sans-serif', fontSize:'0.62rem',
            letterSpacing:'0.3em', textTransform:'uppercase',
            color:'rgba(201,168,76,0.72)', fontWeight:400,
            marginBottom:'1.25rem',
            display:'flex', alignItems:'center', gap:'10px',
          }}>
            <span style={{ display:'inline-block', width:'28px', height:'1px', background:'rgba(201,168,76,0.5)', flexShrink:0 }}/>
            Why Choose Us
          </p>

          <h2 style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'clamp(1.8rem,3vw,2.8rem)',
            fontWeight:300,
            color:'rgba(255,255,255,0.92)',
            lineHeight:1.2,
            marginBottom:'1.5rem',
          }}>
            Where Vision,{' '}
            <span style={{ fontStyle:'italic', background:'linear-gradient(135deg,#E2C07A,#C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Craft,
            </span>
            <br/>and Luxury Align
          </h2>

          <p style={{
            fontFamily:'Jost,sans-serif', fontSize:'0.75rem',
            color:'rgba(255,255,255,0.35)', fontWeight:300,
            lineHeight:1.78, maxWidth:'340px', marginBottom:'2.5rem',
          }}>
            At Nation Buys Realtors, extraordinary outcomes demand extraordinary people — visionaries who see value where others see vacant land.
          </p>

          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ display:'flex' }}>
              
            </div>
          
              
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display:'flex', flexDirection:'column' }}>
          {REASONS.map(({ title, body, Icon }, i) => (
            <div key={i} className="wcu-anim" style={{
              opacity:0, transform:'translateX(24px)',
              transition:`all 0.75s ease ${(i+1)*0.09}s`,
              flex:1,
              display:'flex', alignItems:'flex-start', gap:'1.1rem',
              padding:'1.75rem 2.25rem',
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.042)' : 'none',
              cursor:'default', position:'relative',
            }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,0.04)' }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='transparent' }}
            >
              <div style={{
                position:'absolute', left:0, top:0, bottom:0, width:'2px',
                background:'linear-gradient(180deg,transparent,var(--gold),transparent)',
                opacity:0, transition:'opacity 0.25s',
              }} className="wcu-bar"/>

              <div style={{
                flexShrink:0, width:'38px', height:'38px',
                border:'1px solid rgba(201,168,76,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'var(--gold)', marginTop:'2px',
              }}>
                <Icon/>
              </div>

              <div style={{ flex:1 }}>
                <h3 style={{
                  fontFamily:'Cormorant Garamond,serif',
                  fontSize:'1.15rem', fontWeight:500,
                  color:'rgba(255,255,255,0.88)',
                  marginBottom:'0.38rem', letterSpacing:'0.01em',
                }}>{title}</h3>
                <p style={{
                  fontFamily:'Jost,sans-serif',
                  fontSize:'0.72rem', fontWeight:300,
                  color:'rgba(255,255,255,0.38)', lineHeight:1.72,
                }}>{body}</p>
              </div>

              <div style={{
                flexShrink:0, width:'30px', height:'30px', alignSelf:'center',
                border:'1px solid rgba(201,168,76,0.15)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'rgba(201,168,76,0.5)',
                opacity:0, transition:'opacity 0.25s',
              }} className="wcu-arrow">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1.5 5.5h8M6 2l3.5 3.5L6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .wcu-anim:hover .wcu-bar   { opacity:1 !important; }
        .wcu-anim:hover .wcu-arrow { opacity:1 !important; }

        @media (max-width: 900px) {
          .wcu-grid { grid-template-columns: 1fr !important; min-height: auto !important; }
          .wcu-left { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; padding: 3.5rem 2.5rem !important; }
        }
        @media (max-width: 768px) {
          .wcu-left { padding: 3rem 1.5rem !important; }
          .wcu-anim[style*="translateX(24px)"] { padding: 1.5rem 1.5rem !important; }
        }
        @media (max-width: 480px) {
          .wcu-left { padding: 2.5rem 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}