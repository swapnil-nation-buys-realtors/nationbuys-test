'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { label: 'Acres Transacted',    val: 200,  suffix: '+',   progress: 85, sub: 'Prime land parcels' },
  { label: 'Portfolio Value',     val: 200,  suffix: 'Cr+', progress: 90, sub: 'Active mandates' },
  { label: 'Years of Mastery',    val: 17,   suffix: '+',   progress: 95, sub: 'Led by Swapnil Bora' },
  { label: 'Strategic Markets',   val: 4,    suffix: '',    progress: 70, sub: 'Pune · Mumbai · Goa · Dubai' },
  { label: 'Mandates Executed',   val: 5,   suffix: '+',   progress: 80, sub: 'High-value closures' },
  { label: 'Client Retention',    val: 98,   suffix: '%',   progress: 98, sub: 'Trust & repeat business' },
]

function StatCard({ s, delay }: { s: typeof STATS[0]; delay: number }) {
  const [count, setCount] = useState(0)
  const [bar,   setBar]   = useState(0)
  const ref   = useRef<HTMLDivElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || fired.current) return
      fired.current = true
      setTimeout(() => {
        const dur = 1800, steps = 60
        let i = 0
        const step = Math.max(1, Math.ceil(s.val / steps))
        const t = setInterval(() => {
          i += step
          if (i >= s.val) { setCount(s.val); clearInterval(t) }
          else setCount(i)
        }, dur / steps)
        setTimeout(() => setBar(s.progress), 80)
      }, delay)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [s.val, s.progress, delay])

  return (
    <div ref={ref} className="stat-card" style={{
      background: 'rgba(18,18,18,0.75)',
      border: '1px solid rgba(201,168,76,0.1)',
      padding: '2rem 1.75rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '190px',
      cursor: 'default',
      transition: 'border-color 0.3s, background 0.3s',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement
      el.style.borderColor = 'rgba(201,168,76,0.38)'
      el.style.background  = 'rgba(201,168,76,0.05)'
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement
      el.style.borderColor = 'rgba(201,168,76,0.1)'
      el.style.background  = 'rgba(18,18,18,0.42)'
    }}
    >
      <div>
        <p style={{
          fontFamily:'Jost,sans-serif',
          fontSize:'0.72rem',
          fontWeight:400,
          letterSpacing:'0.06em',
          color:'rgba(255,255,255,0.52)',
          lineHeight:1.35,
        }}>{s.label}</p>
        <p style={{
          fontFamily:'Jost,sans-serif',
          fontSize:'0.58rem',
          fontWeight:300,
          color:'rgba(255,255,255,0.22)',
          marginTop:'3px',
          letterSpacing:'0.04em',
        }}>{s.sub}</p>
      </div>

      <div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'10px' }}>
          <span style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'clamp(2.6rem,4vw,3.4rem)',
            fontWeight:300,
            lineHeight:1,
            background:'linear-gradient(135deg,#E2C07A,#C9A84C)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
          }}>{count.toLocaleString()}{s.suffix}</span>
          <span style={{
            fontFamily:'Jost,sans-serif',
            fontSize:'0.68rem',
            fontWeight:400,
            color:'rgba(201,168,76,0.65)',
            paddingBottom:'4px',
          }}>{s.progress}%</span>
        </div>
        <div style={{ position:'relative', height:'2px', background:'rgba(255,255,255,0.08)', borderRadius:'1px' }}>
          <div style={{
            position:'absolute', left:0, top:0, height:'100%',
            width:`${bar}%`,
            background:'linear-gradient(90deg,var(--gold-dim),var(--gold),var(--gold-light))',
            borderRadius:'1px',
            transition:'width 1.6s cubic-bezier(0.4,0,0.2,1)',
          }}/>
          <div style={{
            position:'absolute', top:'50%', transform:'translateY(-50%)',
            left:`calc(${bar}% - 4px)`,
            width:'6px', height:'6px', borderRadius:'50%',
            background:'var(--gold-light)',
            boxShadow:'0 0 8px 2px rgba(201,168,76,0.6)',
            transition:'left 1.6s cubic-bezier(0.4,0,0.2,1)',
          }}/>
        </div>
      </div>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="stats-section" style={{ position:'relative', padding:'7rem 5rem', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=60"
          alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.35)' }}/>
        <div style={{ position:'absolute', inset:0, background:'rgba(8,8,8,0.72)' }}/>
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)',
        }}/>
      </div>

      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', zIndex:1,
        background:'linear-gradient(90deg,transparent,var(--gold),transparent)' }}/>

      <div style={{ position:'relative', zIndex:1, maxWidth:'1280px', margin:'0 auto' }}>
        <div className="stats-header" style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'3.5rem', gap:'1.5rem' }}>
          <div>
            <p style={{ fontFamily:'Jost,sans-serif', fontSize:'0.6rem', letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--gold)', fontWeight:300, marginBottom:'0.75rem' }}>
              Our Track Record
            </p>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:300, color:'rgba(255,255,255,0.92)', lineHeight:1.2 }}>
              Numbers That Define{' '}
              <span style={{ fontStyle:'italic', background:'linear-gradient(135deg,#E2C07A,#C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                Excellence
              </span>
            </h2>
          </div>
          <p className="stats-sub" style={{ fontFamily:'Jost,sans-serif', fontSize:'0.75rem', color:'rgba(255,255,255,0.3)', fontWeight:300, maxWidth:'280px', lineHeight:1.7, letterSpacing:'0.03em' }}>
            Every metric reflects a milestone in our relentless pursuit of extraordinary real estate outcomes.
          </p>
        </div>

        <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1rem' }}>
          {STATS.map((s, i) => <StatCard key={i} s={s} delay={i * 110} />)}
        </div>
      </div>

      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', zIndex:1,
        background:'linear-gradient(90deg,transparent,var(--gold),transparent)' }}/>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .stats-section { padding: 5rem 2rem !important; }
          .stats-header { flex-direction: column; align-items: flex-start !important; }
          .stats-sub { max-width: 100% !important; text-align: left !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
          .stat-card { min-height: 160px !important; padding: 1.25rem 1rem !important; }
        }
        @media (max-width: 480px) {
          .stats-section { padding: 4rem 1.25rem !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .stat-card { min-height: 140px !important; }
        }
      `}</style>
    </section>
  )
}