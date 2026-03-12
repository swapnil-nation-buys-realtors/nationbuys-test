'use client'

const LOGOS = [
  { name: 'GODREJ',    sub: 'Properties'  },
  { name: 'TATA',      sub: 'Housing'     },
  { name: 'MAHINDRA',  sub: 'Lifespaces'  },
  { name: 'KOLTE',     sub: 'Patil'       },
  { name: 'BRIGADE',   sub: 'Group'       },
  { name: 'PRESTIGE',  sub: 'Estates'     },
  { name: 'DLF',       sub: 'Limited'     },
  { name: 'OBEROI',    sub: 'Realty'      },
  { name: 'EMBASSY',   sub: 'Group'       },
  { name: 'SOBHA',     sub: 'Limited'     },
  { name: 'LODHA',     sub: 'Developers'  },
  { name: 'PIRAMAL',   sub: 'Realty'      },
]

const ALL = [...LOGOS, ...LOGOS]

const TESTIMONIALS = [
  {
    quote: "NBR Realty's execution on our 300-acre mandate was extraordinary. Their market insight and deep network unlocked value we hadn't imagined possible.",
    name: 'Arvind Mehta',
    role: 'Director, Cornerstone Developments · Pune',
  },
  {
    quote: 'The team at NBR brought professionalism and deep expertise to our industrial land acquisition. Closed ahead of schedule with excellent returns.',
    name: 'Priya Nair',
    role: 'CFO, Apex Infrastructure · Mumbai',
  },
  {
    quote: 'Exceptional advisory. NBR identified a pre-leased asset that gave us 11% yield from day one. Truly a partner, not just a broker.',
    name: 'Rajesh Kulkarni',
    role: 'Managing Partner, Meridian Capital · Goa',
  },
]

export default function TestimonialsSection() {
  return (
    <section style={{ background:'#0a0a0a', padding:'clamp(4rem,8vw,6rem) 0 clamp(3rem,6vw,5rem)', overflow:'hidden', position:'relative' }}>

      {/* Top rule */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px',
        background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.28),transparent)' }}/>

      {/* ── Heading ── */}
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 clamp(1.25rem,5vw,5rem)', marginBottom:'clamp(2.5rem,5vw,4rem)', position:'relative' }}>

        {/* Ghost text */}
        <div style={{
          position:'absolute', top:'-2rem', left:'50%', transform:'translateX(-50%)',
          fontFamily:'Cormorant Garamond,serif',
          fontSize:'clamp(4rem,12vw,11rem)',
          fontWeight:300, lineHeight:1,
          color:'transparent',
          WebkitTextStroke:'1px rgba(201,168,76,0.055)',
          letterSpacing:'0.12em',
          userSelect:'none', pointerEvents:'none',
          whiteSpace:'nowrap',
        }}>TRUST</div>

        <div style={{ textAlign:'center', position:'relative', zIndex:1 }}>
          <p style={{
            fontFamily:'Jost,sans-serif', fontSize:'clamp(0.52rem,1.5vw,0.6rem)',
            letterSpacing:'0.4em', textTransform:'uppercase',
            color:'var(--gold)', fontWeight:300, marginBottom:'0.85rem',
          }}>Partners & Associates</p>
          <h2 style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'clamp(1.7rem,4vw,2.6rem)',
            fontWeight:300, color:'rgba(255,255,255,0.88)',
          }}>
            A Legacy of{' '}
            <span style={{
              fontStyle:'italic',
              background:'linear-gradient(135deg,#E2C07A,#C9A84C)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>Trust</span>{' '}
            &amp; Distinction
          </h2>
        </div>
      </div>

      {/* ── Marquee ── */}
      <div style={{ position:'relative', overflow:'hidden', marginBottom:'clamp(3rem,6vw,5rem)' }}>
        <div style={{
          position:'absolute', left:0, top:0, bottom:0, width:'clamp(60px,10vw,160px)', zIndex:2, pointerEvents:'none',
          background:'linear-gradient(90deg,#0a0a0a 0%,transparent 100%)',
        }}/>
        <div style={{
          position:'absolute', right:0, top:0, bottom:0, width:'clamp(60px,10vw,160px)', zIndex:2, pointerEvents:'none',
          background:'linear-gradient(-90deg,#0a0a0a 0%,transparent 100%)',
        }}/>

        <div style={{
          display:'flex', alignItems:'center',
          width:'max-content',
          animation:'marquee 42s linear infinite',
        }}>
          {ALL.map((logo, i) => (
            <div key={i} style={{
              flexShrink:0,
              width:'clamp(130px,15vw,180px)', height:'clamp(60px,8vw,80px)',
              display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center',
              border:'1px solid rgba(201,168,76,0.07)',
              borderRight: 'none',
              transition:'background 0.3s, border-color 0.3s',
              cursor:'default',
            }}
            onMouseEnter={e=>{
              const el = e.currentTarget as HTMLElement
              el.style.background='rgba(201,168,76,0.04)'
              el.style.borderColor='rgba(201,168,76,0.25)'
            }}
            onMouseLeave={e=>{
              const el = e.currentTarget as HTMLElement
              el.style.background='transparent'
              el.style.borderColor='rgba(201,168,76,0.07)'
            }}
            >
              <span style={{
                fontFamily:'Cormorant Garamond,serif',
                fontSize:'clamp(0.75rem,1.5vw,0.95rem)', fontWeight:600,
                letterSpacing:'0.22em',
                color:'rgba(255,255,255,0.14)',
                transition:'color 0.35s',
                display:'block',
              }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='rgba(201,168,76,0.65)'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.14)'}
              >{logo.name}</span>
              <span style={{
                fontFamily:'Jost,sans-serif', fontSize:'clamp(0.38rem,0.8vw,0.48rem)',
                letterSpacing:'0.28em', textTransform:'uppercase',
                color:'rgba(255,255,255,0.09)',
                marginTop:'3px',
              }}>{logo.sub}</span>
            </div>
          ))}
          <div style={{ width:'1px', height:'80px', background:'rgba(201,168,76,0.07)' }}/>
        </div>
      </div>

      {/* ── Testimonials row ── */}
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 clamp(1.25rem,5vw,5rem)' }}>
        {/* Section label */}
        <div style={{ textAlign:'center', marginBottom:'clamp(2rem,4vw,3rem)' }}>
          <p style={{
            fontFamily:'Jost,sans-serif', fontSize:'clamp(0.52rem,1.5vw,0.6rem)',
            letterSpacing:'0.4em', textTransform:'uppercase',
            color:'rgba(201,168,76,0.5)', fontWeight:300,
          }}>Client Voices</p>
        </div>

        {/* 3-col on desktop, 1-col on mobile */}
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testi-card" style={{
              border:'1px solid rgba(201,168,76,0.08)',
              padding:'clamp(1.5rem,3vw,2.25rem)',
              position:'relative',
              transition:'border-color 0.3s, background 0.3s',
              cursor:'default',
            }}
            onMouseEnter={e=>{
              const el = e.currentTarget as HTMLElement
              el.style.borderColor='rgba(201,168,76,0.22)'
              el.style.background='rgba(201,168,76,0.025)'
            }}
            onMouseLeave={e=>{
              const el = e.currentTarget as HTMLElement
              el.style.borderColor='rgba(201,168,76,0.08)'
              el.style.background='transparent'
            }}
            >
              {/* Gold top bar */}
              <div style={{
                position:'absolute', top:0, left:'2rem', right:'2rem',
                height:'1px',
                background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)',
              }}/>

              {/* Open quote */}
              <div style={{
                fontFamily:'Cormorant Garamond,serif',
                fontSize:'3.5rem', lineHeight:0.7, marginBottom:'1rem',
                color:'transparent', WebkitTextStroke:'1px rgba(201,168,76,0.25)',
              }}>"</div>

              <p style={{
                fontFamily:'Cormorant Garamond,serif',
                fontSize:'clamp(0.95rem,1.8vw,1.15rem)',
                fontStyle:'italic', fontWeight:300,
                color:'rgba(255,255,255,0.5)',
                lineHeight:1.7, marginBottom:'1.5rem',
              }}>{t.quote}</p>

              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <div style={{ height:'1px', width:'24px', background:'rgba(201,168,76,0.3)', flexShrink:0 }}/>
                <div>
                  <p style={{ fontFamily:'Jost,sans-serif', fontSize:'clamp(0.6rem,1.2vw,0.68rem)', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold)', fontWeight:500 }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily:'Jost,sans-serif', fontSize:'clamp(0.52rem,1vw,0.58rem)', color:'rgba(255,255,255,0.22)', fontWeight:300, marginTop:'2px' }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px',
        background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.28),transparent)' }}/>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.75rem, 2vw, 1.25rem);
        }
        @media (max-width: 900px) {
          .testi-grid {
            grid-template-columns: 1fr;
            max-width: 560px;
            margin: 0 auto;
          }
        }
        @media (max-width: 580px) {
          .testi-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}