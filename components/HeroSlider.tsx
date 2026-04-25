'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const SLIDES = [
  {
    img: '/bulid0.jpg',
    city: 'Mumbai, Maharashtra',
  },
  {
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format',
    city: 'Pune, Maharashtra',
  },
  {
    img: '/bulid 1.jpg',
    city: 'Goa, India',
  },
  {
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85&auto=format',
    city: 'Dubai, UAE',
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
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#000' }}>

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

      {/* Gradient overlays */}
      <div style={{ position:'absolute',inset:0,zIndex:3, background:'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 60%, rgba(0,0,0,0.2) 100%)' }}/>
      <div style={{ position:'absolute',inset:0,zIndex:3, background:'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)' }}/>
      <div style={{ position:'absolute',inset:0,zIndex:3, background:'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 28%)' }}/>

      {/* Gold left bar */}
      <div className="hero-left-bar" style={{
        position:'absolute', left:0, top:'15%', bottom:'15%', width:'2px', zIndex:4,
        background:'linear-gradient(180deg,transparent,var(--gold),transparent)',
      }}/>

      {/* Content */}
      <div className="hero-content" style={{
        position:'absolute', inset:0, zIndex:5,
        display:'flex', flexDirection:'column', justifyContent:'center',
        padding:'0 5rem',
        maxWidth:'800px',
      }}>
        

        <h1 style={{ fontFamily:'Cormorant Garamond,serif', lineHeight:1.1, marginBottom:'1.25rem' }}>
          <span style={{
            display:'block',
            fontSize:'clamp(2.4rem,6.5vw,5.8rem)',
            fontWeight:300,
            color:'rgba(255,255,255,0.95)',
            letterSpacing:'-0.01em',
          }}>Elevate</span>
          <span style={{
            display:'block',
            fontSize:'clamp(2.4rem,6.5vw,5.8rem)',
            fontWeight:300,
            background:'linear-gradient(135deg,#E2C07A,#C9A84C,#A07830)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            letterSpacing:'-0.01em',
          }}>Ambitions with Nation Buys Realtors </span>
          <span style={{
            display:'block', marginTop:'0.3rem',
            fontSize:'clamp(0.95rem,2vw,1.5rem)',
            fontWeight:300, fontStyle:'italic',
            color:'rgba(255,255,255,0.52)',
            letterSpacing:'0.04em',
          }}>Prime Lands &amp; Pre-Leased Yields</span>
        </h1>

        <p className="hero-sub" style={{
          fontFamily:'Jost,sans-serif', fontSize:'0.82rem',
          color:'rgba(255,255,255,0.4)', fontWeight:300,
          lineHeight:1.75, letterSpacing:'0.04em',
          maxWidth:'460px', marginBottom:'2.5rem',
        }}>
          Transforming visionary mandates into landmark developments across Pune, Mumbai, Goa &amp; Dubai.
        </p>

        <div style={{ display:'flex', gap:'0.85rem', flexWrap:'wrap' }}>
          <Link href="/contact#enquire" onClick={(e) => {
            if (typeof window !== 'undefined' && window.location.pathname.startsWith('/contact')) {
              const elem = document.getElementById('enquire');
              if (elem) {
                e.preventDefault();
                elem.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '#enquire');
              }
            }
          }} style={{
            fontFamily:'Jost,sans-serif', fontSize:'0.68rem',
            fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase',
            background:'linear-gradient(135deg,var(--gold-light),var(--gold))',
            color:'var(--obsidian)', textDecoration:'none',
            padding:'0.85rem 2rem',
            display:'flex', alignItems:'center', gap:'10px',
            transition:'transform 0.2s,opacity 0.2s',
            whiteSpace:'nowrap',
          }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-2px)';(e.currentTarget as HTMLElement).style.opacity='0.9'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(0)';(e.currentTarget as HTMLElement).style.opacity='1'}}
          >
            Contact Us
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/about" style={{
            fontFamily:'Jost,sans-serif', fontSize:'0.68rem',
            fontWeight:400, letterSpacing:'0.2em', textTransform:'uppercase',
            border:'1px solid rgba(201,168,76,0.4)',
            color:'rgba(255,255,255,0.7)', textDecoration:'none',
            padding:'0.85rem 2rem',
            transition:'border-color 0.2s,color 0.2s',
            whiteSpace:'nowrap',
          }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.8)';(e.currentTarget as HTMLElement).style.color='#fff'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.4)';(e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.7)'}}
          >Our Portfolio</Link>
        </div>
      </div>

      {/* Dot nav */}
      <div className="hero-dots" style={{
        position:'absolute', bottom:'2.5rem', right:'2.5rem', zIndex:5,
        display:'flex', gap:'8px', alignItems:'center',
      }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{ background:'none', border:'none', cursor:'pointer', padding:'6px' }}>
            <span style={{
              display:'block',
              width: i===cur ? '24px' : '6px',
              height:'2px',
              background: i===cur ? 'var(--gold)' : 'rgba(255,255,255,0.25)',
              transition:'width 0.4s ease, background 0.4s ease',
            }}/>
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" style={{
        position:'absolute', bottom:'2.5rem',
        left:'50%', transform:'translateX(-50%)',
        zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px',
      }}>
        <div style={{ width:'1px', height:'48px', background:'rgba(255,255,255,0.1)', position:'relative', overflow:'hidden' }}>
          <div style={{
            position:'absolute', top:0, left:0, width:'100%', height:'50%',
            background:'linear-gradient(180deg,var(--gold),transparent)',
            animation:'scrollDot 2s ease-in-out infinite',
          }}/>
        </div>
        <span style={{ fontFamily:'Jost,sans-serif', fontSize:'0.5rem', letterSpacing:'0.3em', color:'rgba(255,255,255,0.25)', textTransform:'uppercase' }}>Scroll</span>
      </div>

      {/* City label */}
      <div className="hero-city" style={{
        position:'absolute', right:'2rem', top:'50%', transform:'translateY(-50%)',
        zIndex:5, writingMode:'vertical-rl',
        fontFamily:'Jost,sans-serif', fontSize:'0.55rem',
        letterSpacing:'0.28em', textTransform:'uppercase',
        color:'rgba(255,255,255,0.2)',
      }}>
        {SLIDES[cur].city}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-content {
            padding: 0 1.5rem !important;
            max-width: 100% !important;
            justify-content: flex-end !important;
            padding-bottom: 6rem !important;
          }
          .hero-sub { display: none; }
          .hero-left-bar { display: none; }
          .hero-city { display: none; }
          .hero-scroll { display: none; }
          .hero-dots { right: 1.25rem !important; bottom: 1.5rem !important; }
        }
        @media (max-width: 480px) {
          .hero-content {
            padding: 0 1.25rem !important;
            padding-bottom: 5rem !important;
          }
        }
      `}</style>
    </section>
  )
}