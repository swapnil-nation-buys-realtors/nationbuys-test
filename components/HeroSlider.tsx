'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85&auto=format',
    city: 'Mumbai, Maharashtra',
    tagline: 'Gateway to the West',
  },
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85&auto=format',
    city: 'Pune, Maharashtra',
    tagline: 'Oxford of the East',
  },
  {
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=85&auto=format',
    city: 'Goa, India',
    tagline: "India's Riviera",
  },
  {
    img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=85&auto=format',
    city: 'Dubai, UAE',
    tagline: 'City of Gold',
  },
]

export default function HeroSlider() {
  const [cur,  setCur]  = useState(0)
  const [prev, setPrev] = useState<number|null>(null)
  const [busy, setBusy] = useState(false)

  const go = useCallback((idx: number) => {
    if (busy || idx === cur) return
    setBusy(true)
    setPrev(cur)
    setCur(idx)
    setTimeout(() => { setPrev(null); setBusy(false) }, 1200)
  }, [busy, cur])

  useEffect(() => {
    const t = setInterval(() => go((cur + 1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [cur, go])

  return (
    <section style={{ position: 'relative', width: '100%', height: '100svh', minHeight: '600px', overflow: 'hidden', background: '#000' }}>

      {/* ── Slides ── */}
      {SLIDES.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          zIndex: i === cur ? 2 : i === prev ? 1 : 0,
        }}>
          <img src={s.img} alt={s.city} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: i === cur ? 'scale(1.06)' : 'scale(1)',
            transition: i === cur ? 'transform 7s ease, opacity 1.2s ease' : 'transform 0.1s, opacity 1s ease',
            opacity: i === cur ? 1 : i === prev ? 0 : 0,
          }}/>
        </div>
      ))}

      {/* ── Gradient overlays ── */}
      <div style={{ position:'absolute',inset:0,zIndex:3,
        background:'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)' }}/>
      <div style={{ position:'absolute',inset:0,zIndex:3,
        background:'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 55%)' }}/>
      <div style={{ position:'absolute',inset:0,zIndex:3,
        background:'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 28%)' }}/>

      {/* ── Gold left bar — hidden on mobile ── */}
      <div style={{
        position:'absolute', left:0, top:'15%', bottom:'15%', width:'2px', zIndex:4,
        background:'linear-gradient(180deg,transparent,var(--gold),transparent)',
      }} className="hero-left-bar"/>

      {/* ── Content ── */}
      <div style={{
        position:'absolute', inset:0, zIndex:5,
        display:'flex', flexDirection:'column', justifyContent:'center',
        padding:'0 clamp(1.5rem,6vw,5rem)',
        paddingTop: '80px',
        maxWidth: 'min(800px, 100%)',
      }}>
        {/* Eyebrow */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'clamp(1rem,2.5vw,1.5rem)' }}>
          <div style={{ width:'clamp(20px,4vw,32px)', height:'1px', background:'var(--gold)', flexShrink: 0 }}/>
          <span style={{
            fontFamily:'Jost,sans-serif', fontSize:'clamp(0.5rem,1.5vw,0.6rem)',
            letterSpacing:'0.3em', textTransform:'uppercase',
            color:'var(--gold)', fontWeight:300,
          }}>Est. 2007 · RERA Compliant</span>
        </div>

        {/* Main tagline */}
        <h1 style={{ fontFamily:'Cormorant Garamond,serif', lineHeight:1.08, marginBottom:'clamp(0.75rem,2vw,1.25rem)' }}>
          <span style={{
            display:'block',
            fontSize:'clamp(2.4rem,7vw,5.8rem)',
            fontWeight:300,
            color:'rgba(255,255,255,0.95)',
            letterSpacing:'-0.01em',
          }}>Elevate</span>
          <span style={{
            display:'block',
            fontSize:'clamp(2.4rem,7vw,5.8rem)',
            fontWeight:300,
            background:'linear-gradient(135deg,#E2C07A,#C9A84C,#A07830)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            letterSpacing:'-0.01em',
            lineHeight:1.05,
          }}>Ambitions</span>
          <span style={{
            display:'block', marginTop:'0.2rem',
            fontSize:'clamp(0.9rem,2.2vw,1.7rem)',
            fontWeight:300, fontStyle:'italic',
            color:'rgba(255,255,255,0.48)',
            letterSpacing:'0.04em',
          }}>Prime Lands &amp; Pre-Leased Yields</span>
        </h1>

        {/* Sub copy */}
        <p style={{
          fontFamily:'Jost,sans-serif', fontSize:'clamp(0.72rem,1.5vw,0.82rem)',
          color:'rgba(255,255,255,0.38)', fontWeight:300,
          lineHeight:1.75, letterSpacing:'0.03em',
          maxWidth:'min(480px, 90%)', marginBottom:'clamp(1.75rem,4vw,2.5rem)',
        }}>
          Transforming visionary mandates into landmark developments across Pune, Mumbai, Goa &amp; Dubai.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', gap:'clamp(0.6rem,2vw,1rem)', flexWrap:'wrap' }}>
          <Link href="/contact" style={{
            fontFamily:'Jost,sans-serif', fontSize:'clamp(0.58rem,1.5vw,0.68rem)',
            fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase',
            background:'linear-gradient(135deg,var(--gold-light),var(--gold))',
            color:'var(--obsidian)', textDecoration:'none',
            padding:'clamp(0.7rem,1.8vw,0.85rem) clamp(1.4rem,3vw,2.2rem)',
            display:'flex', alignItems:'center', gap:'8px',
            transition:'transform 0.2s,opacity 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLElement).style.opacity='0.9'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(0)';(e.currentTarget as HTMLElement).style.opacity='1'}}
          >
            Contact Us
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/about" style={{
            fontFamily:'Jost,sans-serif', fontSize:'clamp(0.58rem,1.5vw,0.68rem)',
            fontWeight:400, letterSpacing:'0.22em', textTransform:'uppercase',
            border:'1px solid rgba(201,168,76,0.4)',
            color:'rgba(255,255,255,0.7)', textDecoration:'none',
            padding:'clamp(0.7rem,1.8vw,0.85rem) clamp(1.4rem,3vw,2.2rem)',
            transition:'border-color 0.2s,color 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.8)';(e.currentTarget as HTMLElement).style.color='#fff'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.4)';(e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.7)'}}
          >Our Portfolio</Link>
        </div>
      </div>

      {/* ── Slide counter top-right (design upgrade) ── */}
      <div style={{
        position:'absolute', top:'50%', right:'clamp(1rem,3vw,3rem)',
        transform:'translateY(-50%)',
        zIndex:5,
        display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem',
      }} className="hero-side-ui">
        {/* City name — rotated */}
        <div style={{
          writingMode:'vertical-rl',
          fontFamily:'Jost,sans-serif', fontSize:'0.52rem',
          letterSpacing:'0.28em', textTransform:'uppercase',
          color:'rgba(255,255,255,0.22)',
          marginBottom:'0.5rem',
        }}>
          {SLIDES[cur].city}
        </div>
        {/* Line */}
        <div style={{ width:'1px', height:'40px', background:'rgba(255,255,255,0.1)' }}/>
        {/* Slide index */}
        <span style={{
          fontFamily:'Cormorant Garamond,serif',
          fontSize:'0.85rem', fontWeight:300,
          color:'rgba(201,168,76,0.5)',
        }}>{String(cur + 1).padStart(2,'0')}</span>
        <span style={{ fontFamily:'Jost,sans-serif', fontSize:'0.45rem', color:'rgba(255,255,255,0.2)', letterSpacing:'0.1em' }}>/ {String(SLIDES.length).padStart(2,'0')}</span>
        <div style={{ width:'1px', height:'40px', background:'rgba(255,255,255,0.06)' }}/>
      </div>

      {/* ── Dot nav bottom ── */}
      <div style={{
        position:'absolute', bottom:'clamp(1.5rem,3vw,2.5rem)',
        left:'clamp(1.5rem,6vw,5rem)',
        zIndex:5,
        display:'flex', gap:'8px', alignItems:'center',
      }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px 2px',
          }} aria-label={`Go to slide ${i+1}`}>
            <span style={{
              display:'block',
              width: i===cur ? '28px' : '6px',
              height:'2px',
              background: i===cur ? 'var(--gold)' : 'rgba(255,255,255,0.22)',
              transition:'width 0.45s ease, background 0.45s ease',
            }}/>
          </button>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div style={{
        position:'absolute', bottom:'clamp(1.5rem,3vw,2.5rem)',
        left:'50%', transform:'translateX(-50%)',
        zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px',
      }} className="hero-scroll">
        <div style={{ width:'1px', height:'48px', background:'rgba(255,255,255,0.08)', position:'relative', overflow:'hidden' }}>
          <div style={{
            position:'absolute', top:0, left:0, width:'100%', height:'50%',
            background:'linear-gradient(180deg,var(--gold),transparent)',
            animation:'scrollDot 2s ease-in-out infinite',
          }}/>
        </div>
        <span style={{ fontFamily:'Jost,sans-serif', fontSize:'0.48rem', letterSpacing:'0.3em', color:'rgba(255,255,255,0.22)', textTransform:'uppercase' }}>Scroll</span>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(-100%); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        @media (max-width: 640px) {
          .hero-left-bar { display: none; }
          .hero-side-ui { display: none !important; }
          .hero-scroll { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-side-ui { display: none !important; }
        }
      `}</style>
    </section>
  )
}