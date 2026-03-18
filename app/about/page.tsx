'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ── Reveal once ── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── Repeating reveal (stats) ── */
function useRevealRepeat(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [tick, setTick] = useState(0)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); setTick(t => t + 1) }
        else setVisible(false)
      },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible, tick }
}

/* ── Counter ── */
function useCounter(target: number, tick: number, delay = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (tick === 0) return
    setVal(0)
    const t = setTimeout(() => {
      const steps = 60, dur = 1800
      const inc = Math.max(1, Math.ceil(target / steps))
      const iv = setInterval(() => {
        setVal(v => { const n = v + inc; if (n >= target) { clearInterval(iv); return target } return n })
      }, dur / steps)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(t)
  }, [tick, target, delay])
  return val
}

/* ── Data ── */
const TIMELINE = [
  { year: '2009', title: 'Foundation',        body: 'Nation Buys Realtors  established in Pune\'s Kalyani Nagar by Swapnil Bora — singular focus on unlocking untapped potential in expansive land parcels.' },
  { year: '2010', title: 'First Mega-Mandate',body: 'Facilitated a landmark 14-acre transaction in Pune\'s emerging corridors, setting the benchmark for large-scale land brokerage.' },
  { year: '2013', title: 'Legacy Achieved',   body: 'Surpassed 200+ acres transacted, ₹200 Cr+ in active mandates, and 98% client retention.' },
  { year: '2015', title: 'Mumbai & Goa Expansion', body: 'Extended footprint to Mumbai and Navi Mumbai, capturing premium commercial land and pre-leased portfolio mandates and Goa\'s luxury coastal land.' },
  { year: '2021', title: 'Dubai',             body: 'Crossed national borders with strategic mandates in Dubai\'s high-yield commercial real estate.' },
  { year: '2026', title: 'Reotek Launch',     body: 'Launched Reotek — delivering 1M sq ft of managed enterprise office spaces across Pune and Mumbai.' },
  

]

const TEAM = [
  { name: 'Swapnil Bora',  role: 'Founder & Managing Director', exp: '17+ Yrs', desc: 'Visionary architect behind Nation Buys Realtors \'s rise — expert in mega-parcel strategy, developer relations, and landmark outcomes.', initial: 'SB', color: '#C9A84C' },
  { name: 'Preeti W',      role: 'Property Consultant',         exp: '12 Yrs',  desc: 'Manages end-to-end pre-leased transactions ensuring optimal yield alignment for investors.',                                 initial: 'PW', color: '#A07830' },
]

const STATS = [
  { val: 500, suffix: '+',   label: 'Acres Transacted',  sub: 'Prime land parcels' },
  { val: 200, suffix: 'Cr+', label: 'Portfolio Value',   sub: 'Active mandates' },
  { val: 17,  suffix: '+',   label: 'Years of Mastery',  sub: 'Led by Swapnil Bora' },
  { val: 4,   suffix: '',    label: 'Strategic Markets', sub: 'Pune · Mumbai · Goa · Dubai' },
]

const VALUES = [
  { icon: '◈', title: 'Trust First',         body: 'RERA-compliant processes ensure clean, verifiable transactions from mandate to close.' },
  { icon: '◇', title: 'Market Foresight',    body: 'Proprietary insight spots hidden potential in expansive holdings before the broader market catches up.' },
  { icon: '◉', title: 'Seamless Execution',  body: 'End-to-end support across legal, valuation, due diligence, and negotiation — outcomes, not just introductions.' },
  { icon: '◎', title: 'We Succeed Together', body: 'Fee structures aligned with your success. When your land transacts at maximum value, we\'ve done our job.' },
]

const MOSAIC = [
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85&auto=format', label: 'Mumbai' },
  { src: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=85&auto=format', label: 'Dubai' },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85&auto=format', label: 'Pune' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=85&auto=format', label: 'Goa' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=85&auto=format', label: 'Reotek' },
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=85&auto=format', label: 'Industrial' },
]

/* ════════════════════════════════════════════ */

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const intro    = useReveal(0.06)
  const statsRef = useRevealRepeat(0.4)
  const vmBlock  = useReveal(0.08)
  const valBlock = useReveal(0.06)
  const tlBlock  = useReveal(0.04)
  const teamRef  = useReveal(0.04)
  const ctaRef   = useReveal(0.12)

  const sc0 = useCounter(STATS[0].val, statsRef.tick, 0)
  const sc1 = useCounter(STATS[1].val, statsRef.tick, 120)
  const sc2 = useCounter(STATS[2].val, statsRef.tick, 240)
  const sc3 = useCounter(STATS[3].val, statsRef.tick, 360)
  const counts = [sc0, sc1, sc2, sc3]

  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="ah">
        <div className="ah__mosaic" aria-hidden>
          <div className="ah__mosaic-cell ah__mc-a"><img src={MOSAIC[0].src} alt="" /><span className="ah__mc-lbl">{MOSAIC[0].label}</span></div>
          <div className="ah__mosaic-cell ah__mc-b"><img src={MOSAIC[1].src} alt="" /><span className="ah__mc-lbl">{MOSAIC[1].label}</span></div>
          <div className="ah__mosaic-cell ah__mc-c"><img src={MOSAIC[2].src} alt="" /><span className="ah__mc-lbl">{MOSAIC[2].label}</span></div>
          <div className="ah__mosaic-cell ah__mc-d"><img src={MOSAIC[3].src} alt="" /><span className="ah__mc-lbl">{MOSAIC[3].label}</span></div>
          <div className="ah__mosaic-cell ah__mc-e"><img src={MOSAIC[4].src} alt="" /><span className="ah__mc-lbl">{MOSAIC[4].label}</span></div>
          <div className="ah__mosaic-cell ah__mc-f"><img src={MOSAIC[5].src} alt="" /><span className="ah__mc-lbl">{MOSAIC[5].label}</span></div>
          <div className="ah__mosaic-fade" />
          <div className="ah__mosaic-vign" />
        </div>

        <div className="ah__text">
          <div className="ah__vbar" />
          <h1 className="ah__h1">
            <span className="ah__h1-ghost">The Story</span>
            <span className="ah__h1-ghost">Behind</span>
            <span className="ah__h1-gold">Nation Buys Realtors</span>
          </h1>
          <p className="ah__tagline">Redefining how India's most ambitious land mandates get done — through expertise, trust, and an unrelenting drive to create lasting value.</p>
          <div className="ah__stats">
            {[['500+','Acres'],['17+','Years'],['98%','Retention']].map(([n,l]) => (
              <div key={l} className="ah__stat">
                <span className="ah__stat-num">{n}</span>
                <span className="ah__stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ah__edge-bar" />
      </section>

      {/* ══════════════════════════════════════
          STORY
      ══════════════════════════════════════ */}
      <section className="ai">
        <div ref={intro.ref} className="ai__wrap">
          <div className={`ai__photos rv-left ${intro.visible ? 'vis' : ''}`}>
            <div className="ai__ph-main">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=85" alt="Nation Buys Realtors land transaction" />
              <div className="ai__ph-grad" />
            </div>
            <div className="ai__ph-stack">
              <div className="ai__ph-sm"><img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=85" alt="Advisory" /></div>
              <div className="ai__ph-sm"><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&q=85" alt="Office" /></div>
            </div>
            <div className="ai__chip">
              <span className="ai__chip-yr">2009</span>
              <span className="ai__chip-lbl">Founded</span>
            </div>
            <div className="ai__vbar" />
            <div className="ai__hbar" />
          </div>

          <div className={`ai__text rv-right ${intro.visible ? 'vis' : ''}`}>
            <p className="ey"><span className="ey-bar" />Our Story</p>
            <h2 className="sh">Where Vision Meets<br /><em className="gi">Vast Land</em></h2>
            <div className="grule" />
            <p className="bt mb-5">Nation buys Realtors  empowers builders and landowners to scale their visions through vast development lands and high-yield pre-leased assets. Based in Pune's Kalyani Nagar, we specialize in unlocking expansive parcels primed for mega-developments — residential towers, commercial hubs, and industrial complexes.</p>
            <p className="bt mb-7">Led by Swapnil Bora with over 17 years of mastery, our "We Succeed Together" ethos drives proactive strategies far beyond ordinary plots — across Pune, Mumbai, Goa, and Dubai.</p>
            <div className="ai__cities">
              {[
                { city:'Pune',   img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=240&q=75' },
                { city:'Mumbai', img:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=240&q=75' },
                { city:'Goa',    img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=240&q=75' },
                { city:'Dubai',  img:'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=240&q=75' },
              ].map(({ city, img }) => (
                <div key={city} className="ai__city">
                  <div className="ai__city-img">
                    <img src={img} alt={city} />
                    <div className="ai__city-ov" />
                    <span className="ai__city-name">{city}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="ai__pills">
              {['RERA Compliant','Est. 2009','Pan-India & Dubai','17+ Yrs Expertise'].map(t => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════ */}
      <section className="as">
        <div className="as__bg">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=60" alt="" />
          <div className="as__bg-ov" />
        </div>
        <div className="as__hr as__hr--t" />
        <div ref={statsRef.ref} className="as__grid">
          {STATS.map((s, i) => (
            <div key={i} className={`as__item rv-up ${statsRef.visible ? 'vis' : ''}`} style={{ transitionDelay:`${i*.1}s` }}>
              <div className="as__num">{counts[i].toLocaleString()}{s.suffix}</div>
              <div className="as__lbl">{s.label}</div>
              <div className="as__sub">{s.sub}</div>
              <div className="as__underline" />
            </div>
          ))}
        </div>
        <div className="as__hr as__hr--b" />
      </section>

      {/* ══════════════════════════════════════
          VISION & MISSION
      ══════════════════════════════════════ */}
      <section className="avm">
        <div className="avm__ghost" aria-hidden>Nation Buys Realtors</div>
        <div ref={vmBlock.ref} className="avm__wrap">
          <div className="hc">
            <p className="ey ey--c">Our Foundation</p>
            <h2 className="sh sh--c">Vision &amp; <em className="gi">Mission</em></h2>
          </div>
          <div className="avm__cards">
            {[
              {
                tag:'Vision', img:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=75',
                icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="22" height="22"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                heading:"Pune's Foremost Catalyst for Iconic Developments",
                body:"To be Pune's foremost catalyst for transforming vast land parcels into iconic developments and securing enduring value through premier pre-leased assets — across India and beyond.",
                delay:0,
              },
              {
                tag:'Mission', img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=75',
                icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="22" height="22"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                heading:"Empowering Landowners & Developers Through Expertise",
                body:"We empower landowners and developers by unlocking the full potential of expansive holdings and high-yield pre-leased properties through expert matchmaking, market foresight, and seamless execution.",
                delay:.18,
              },
            ].map((c,i) => (
              <div key={i} className={`avm__card rv-up ${vmBlock.visible?'vis':''}`} style={{ transitionDelay:`${c.delay}s` }}>
                <div className="avm__card-ph">
                  <img src={c.img} alt={c.tag} />
                  <div className="avm__card-fade" />
                </div>
                <div className="avm__card-body">
                  <div className="ibox">{c.icon}</div>
                  <span className="pill" style={{marginBottom:'1rem',display:'inline-block'}}>{c.tag}</span>
                  <h3 className="avm__ch">{c.heading}</h3>
                  <p className="bt">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CORE VALUES
      ══════════════════════════════════════ */}
      <section className="av">
        <div className="av__hr av__hr--t" />
        <div ref={valBlock.ref} className="av__wrap">
          <div className="hc" style={{marginBottom:'3.5rem'}}>
            <p className="ey ey--c">What Drives Us</p>
            <h2 className="sh sh--c">Core <em className="gi">Values</em></h2>
          </div>
          <div className="av__grid">
            {VALUES.map((v,i) => (
              <div key={i} className={`av__card rv-up ${valBlock.visible?'vis':''}`} style={{transitionDelay:`${i*.1}s`}}>
                <span className="av__glyph">{v.icon}</span>
                <h3 className="av__title">{v.title}</h3>
                <p className="bt">{v.body}</p>
                <div className="av__hbar" />
              </div>
            ))}
          </div>
        </div>
        <div className="av__hr av__hr--b" />
      </section>

      {/* ══════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════ */}
      <section className="atl">
        <div ref={tlBlock.ref} className="atl__wrap">
          <div className="hs">
            <div>
              <p className="ey">Our Journey</p>
              <h2 className="sh">A Legacy of <em className="gi">Milestones</em></h2>
            </div>
            <p className="bt atl__sub">17 years of forging relationships, unlocking value, and building the future of Indian real estate.</p>
          </div>
          <div className="atl__hr" />
          <div className="atl__grid">
            {TIMELINE.map((item,i) => (
              <div key={i} className={`atl__item rv-up ${tlBlock.visible?'vis':''}`} style={{transitionDelay:`${i*.09}s`}}>
                <div className="atl__yr-row">
                  <span className="atl__yr">{item.year}</span>
                  <div className="atl__yr-line" />
                  <div className="atl__dot" />
                </div>
                <h4 className="atl__title">{item.title}</h4>
                <p className="bt" style={{fontSize:'.7rem'}}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TEAM — fixed for 2 members
      ══════════════════════════════════════ */}
      <section className="atm">
        {/* Cinematic photo strip across top */}
        <div className="atm__strip">
          {[
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=70',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=70',
            'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&q=70',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=70',
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=70',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=70',
          ].map((src,i) => (
            <div key={i} className="atm__strip-cell">
              <img src={src} alt="" />
              <div className="atm__strip-ov" />
            </div>
          ))}
        </div>

        <div ref={teamRef.ref} className="atm__wrap">
          <div className="hs">
            <div>
              <p className="ey">Our People</p>
              <h2 className="sh">The Minds Behind <em className="gi">Nation Buys Realtors</em></h2>
            </div>
            <p className="bt atm__sub">A focused, high-conviction team — experts who see value where others see vacant land.</p>
          </div>
          <div className="atm__hr" />

          {/* ── 2-member centered layout ── */}
          <div className="atm__grid">
            {TEAM.map((m,i) => (
              <div key={i} className={`atm__card rv-up ${teamRef.visible?'vis':''}`} style={{transitionDelay:`${i*.15}s`}}>
                {/* Top gold bar (on hover) */}
                <div className="atm__tbar" style={{background:`linear-gradient(90deg,transparent,${m.color},transparent)`}} />

                {/* Avatar */}
                <div className="atm__av" style={{background:`linear-gradient(135deg,${m.color},${m.color}70)`}}>
                  <span>{m.initial}</span>
                </div>

                {/* Exp badge */}
                <span className="atm__exp">{m.exp}</span>

                {/* Name & role */}
                <h3 className="atm__name">{m.name}</h3>
                <p className="atm__role" style={{color:m.color}}>{m.role}</p>

                {/* Divider */}
                <div className="atm__divider" style={{background:`linear-gradient(90deg,transparent,${m.color}40,transparent)`}} />

                {/* Desc */}
                <p className="bt atm__desc">{m.desc}</p>

                {/* Bottom gold bar (on hover) */}
                <div className="atm__bbar" style={{background:`linear-gradient(90deg,transparent,${m.color},transparent)`}} />
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="acta">
        <div className="acta__bg">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=75" alt="" />
          <div className="acta__bg-ov" />
        </div>
        <div className="acta__glow" />
        <div className="acta__hr acta__hr--t" />
        <div ref={ctaRef.ref} className={`acta__inner rv-up ${ctaRef.visible?'vis':''}`}>
          <p className="ey ey--c">Let's Tranform Together</p>
          <h2 className="acta__h">Ready to Scale Your<br /><em className="gi">Vision?</em></h2>
          <p className="bt acta__sub">Connect with our experts to explore how Nation Buys Realtors  can transform your vision into a landmark development.</p>
          <div className="acta__btns">
            <Link href="/contact" className="btn-pri">
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/#services" className="btn-out">
              Our Services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
        <div className="acta__hr acta__hr--b" />
      </section>

      {/* ══════════════════════════════════════
          STYLES
      ══════════════════════════════════════ */}
      <style>{`
        /* ── Reveal ── */
        .rv-left  { opacity:0; transform:translateX(-36px); transition:opacity .9s ease,transform .9s ease; }
        .rv-right { opacity:0; transform:translateX(36px);  transition:opacity .9s ease,transform .9s ease; }
        .rv-up    { opacity:0; transform:translateY(28px);  transition:opacity .75s ease,transform .75s ease; }
        .rv-left.vis,.rv-right.vis,.rv-up.vis { opacity:1; transform:none; }

        /* ── Tokens ── */
        .ey   { font-family:'Jost',sans-serif; font-size:.6rem; letter-spacing:.38em; text-transform:uppercase; color:var(--gold); font-weight:300; margin-bottom:.75rem; display:flex; align-items:center; gap:10px; }
        .ey--c { justify-content:center; }
        .ey-bar { display:inline-block; width:28px; height:1px; background:rgba(201,168,76,.6); flex-shrink:0; }
        .sh  { font-family:'Cormorant Garamond',serif; font-size:clamp(1.9rem,3.4vw,3rem); font-weight:300; color:rgba(255,255,255,.92); line-height:1.12; margin-bottom:1.5rem; }
        .sh--c { text-align:center; }
        .gi  { font-style:italic; background:linear-gradient(135deg,#E2C07A,#C9A84C); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .grule { width:40px; height:1px; background:linear-gradient(90deg,var(--gold),transparent); margin-bottom:1.5rem; }
        .bt  { font-family:'Jost',sans-serif; font-size:.75rem; color:rgba(255,255,255,.38); font-weight:300; line-height:1.85; }
        .mb-5 { margin-bottom:1.2rem; }
        .mb-7 { margin-bottom:1.75rem; }
        .pill { font-family:'Jost',sans-serif; font-size:.52rem; letter-spacing:.22em; text-transform:uppercase; border:1px solid rgba(201,168,76,.28); color:rgba(201,168,76,.72); padding:3px 10px; }
        .ibox { width:44px; height:44px; border:1px solid rgba(201,168,76,.25); display:flex; align-items:center; justify-content:center; color:var(--gold); margin-bottom:1.5rem; flex-shrink:0; }
        .hc { text-align:center; }
        .hs { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-end; gap:1.5rem; margin-bottom:3rem; }

        /* ══════════════════════
           HERO
        ══════════════════════ */
        .ah {
          position: relative;
          width: 100%;
          height: calc(100vh - 0px);
          min-height: 600px;
          overflow: hidden;
          background: var(--obsidian);
        }
        .ah__mosaic {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 3px;
          padding: 3px;
        }
        .ah__mosaic-cell { position: relative; overflow: hidden; }
        .ah__mosaic-cell img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(.65) saturate(.85); transition:transform .7s ease,filter .4s; }
        .ah__mosaic-cell:hover img { transform:scale(1.05); filter:brightness(.8) saturate(1.05); }
        .ah__mc-lbl { position:absolute; bottom:8px; left:10px; font-family:'Jost',sans-serif; font-size:.46rem; letter-spacing:.24em; text-transform:uppercase; color:rgba(255,255,255,.5); background:rgba(0,0,0,.4); padding:2px 7px; backdrop-filter:blur(4px); }
        .ah__mosaic-fade {
          position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(to right,var(--obsidian) 0%,var(--obsidian) 38%,rgba(8,8,8,.85) 52%,rgba(8,8,8,.3) 70%,transparent 100%);
        }
        .ah__mosaic-vign {
          position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(to bottom,rgba(8,8,8,.55) 0%,transparent 20%,transparent 80%,rgba(8,8,8,.75) 100%);
        }
        .ah__text {
          position:absolute; top:72px; left:0; bottom:0; width:58%;
          display:flex; flex-direction:column; justify-content:center;
          padding:3rem clamp(2rem,5vw,5rem) 3rem;
          z-index:2;
        }
        .ah__vbar { position:absolute; left:0; top:20%; bottom:20%; width:2px; background:linear-gradient(180deg,transparent,var(--gold),transparent); }
        .ah__edge-bar { position:absolute; left:0; top:0; bottom:0; width:2px; z-index:3; background:linear-gradient(180deg,transparent,rgba(201,168,76,.3),transparent); pointer-events:none; }
        .ah__eyebrow { font-family:'Jost',sans-serif; font-size:.58rem; letter-spacing:.32em; text-transform:uppercase; color:rgba(201,168,76,.6); font-weight:300; margin-bottom:1.5rem; display:flex; align-items:center; gap:10px; }
        .ah__eyebrow-dash { display:inline-block; width:24px; height:1px; background:rgba(201,168,76,.5); flex-shrink:0; }
        .ah__h1 { font-family:'Cormorant Garamond',serif; font-weight:300; line-height:.88; margin-bottom:1.5rem; }
        .ah__h1-ghost { display:block; font-size:clamp(3.5rem,6.5vw,7rem); color:rgba(255,255,255,.13); letter-spacing:-.01em; }
        .ah__h1-gold  { display:block; font-size:clamp(5rem,10vw,11rem); background:linear-gradient(135deg,#E2C07A 0%,#C9A84C 50%,#A07830 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; letter-spacing:-.025em; line-height:.85; }
        .ah__tagline { font-family:'Jost',sans-serif; font-size:.78rem; color:rgba(255,255,255,.36); font-weight:300; line-height:1.85; max-width:380px; margin-bottom:2rem; }
        .ah__stats { display:flex; align-items:stretch; gap:0; margin-bottom:2rem; border:1px solid rgba(201,168,76,.12); width:fit-content; }
        .ah__stat { padding:.7rem 1.4rem; text-align:center; border-right:1px solid rgba(201,168,76,.1); }
        .ah__stat:last-child { border-right:none; }
        .ah__stat-num { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:300; background:linear-gradient(135deg,#E2C07A,#C9A84C); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; display:block; line-height:1; }
        .ah__stat-lbl { font-family:'Jost',sans-serif; font-size:.46rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.28); display:block; margin-top:3px; }

        /* ══════════════════════
           STORY / INTRO
        ══════════════════════ */
        .ai { background:var(--ink); padding:7rem clamp(1.5rem,6vw,5rem); }
        .ai__wrap { max-width:1280px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:clamp(3rem,5vw,5rem); align-items:center; }
        .ai__photos { position:relative; height:520px; }
        .ai__ph-main { position:absolute; top:0; left:0; width:64%; height:72%; overflow:hidden; }
        .ai__ph-main img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .6s ease; }
        .ai__ph-main:hover img { transform:scale(1.04); }
        .ai__ph-grad { position:absolute; inset:0; background:linear-gradient(135deg,rgba(0,0,0,.08),transparent); }
        .ai__ph-stack { position:absolute; right:0; top:6%; width:34%; height:82%; display:flex; flex-direction:column; gap:4px; }
        .ai__ph-sm { flex:1; overflow:hidden; }
        .ai__ph-sm img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .6s ease; }
        .ai__ph-sm:hover img { transform:scale(1.06); }
        .ai__chip { position:absolute; bottom:11%; left:3%; background:rgba(8,8,8,.94); border:1px solid rgba(201,168,76,.3); padding:.8rem 1.1rem; backdrop-filter:blur(10px); }
        .ai__chip-yr  { font-family:'Cormorant Garamond',serif; font-size:1.9rem; font-weight:300; color:var(--gold); display:block; line-height:1; }
        .ai__chip-lbl { font-family:'Jost',sans-serif; font-size:.48rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.3); display:block; margin-top:3px; }
        .ai__vbar { position:absolute; left:62%; top:68%; width:2px; height:56px; background:linear-gradient(180deg,var(--gold),transparent); }
        .ai__hbar { position:absolute; bottom:9%; left:4%; width:56px; height:1px; background:linear-gradient(90deg,var(--gold),transparent); }
        .ai__cities { display:flex; gap:4px; margin-bottom:1.5rem; }
        .ai__city { flex:1; }
        .ai__city-img { height:56px; position:relative; overflow:hidden; }
        .ai__city-img img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(.65); transition:filter .35s,transform .35s; }
        .ai__city:hover .ai__city-img img { filter:brightness(.85); transform:scale(1.06); }
        .ai__city-ov { position:absolute; inset:0; background:rgba(0,0,0,.15); }
        .ai__city-name { font-family:'Jost',sans-serif; font-size:.46rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.38); display:block; text-align:center; margin-top:5px; }
        .ai__pills { display:flex; flex-wrap:wrap; gap:8px; }

        /* ══════════════════════
           STATS
        ══════════════════════ */
        .as { position:relative; overflow:hidden; }
        .as__bg { position:absolute; inset:0; }
        .as__bg img { width:100%; height:100%; object-fit:cover; filter:brightness(.22); }
        .as__bg-ov { position:absolute; inset:0; background:rgba(8,8,8,.78); }
        .as__hr { position:absolute; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.28),transparent); z-index:1; }
        .as__hr--t { top:0; } .as__hr--b { bottom:0; }
        .as__grid { position:relative; z-index:1; max-width:1280px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
        .as__item { padding:3.5rem clamp(1rem,3vw,2.5rem); text-align:center; border-right:1px solid rgba(201,168,76,.1); position:relative; overflow:hidden; transition:background .3s,opacity .75s ease,transform .75s ease; }
        .as__item:last-child { border-right:none; }
        .as__item:hover { background:rgba(201,168,76,.04); }
        .as__num { font-family:'Cormorant Garamond',serif; font-size:clamp(2.4rem,4vw,3.5rem); font-weight:300; line-height:1; background:linear-gradient(135deg,#E2C07A,#C9A84C); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:8px; }
        .as__lbl { font-family:'Jost',sans-serif; font-size:.62rem; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.5); font-weight:300; }
        .as__sub { font-family:'Jost',sans-serif; font-size:.55rem; color:rgba(255,255,255,.2); font-weight:300; margin-top:4px; }
        .as__underline { position:absolute; bottom:0; left:50%; transform:translateX(-50%) scaleX(0); width:60%; height:1px; background:linear-gradient(90deg,transparent,var(--gold),transparent); transition:transform .35s ease; }
        .as__item:hover .as__underline { transform:translateX(-50%) scaleX(1); }

        /* ══════════════════════
           VISION & MISSION
        ══════════════════════ */
        .avm { background:var(--obsidian); padding:7rem clamp(1.5rem,6vw,5rem); position:relative; overflow:hidden; }
        .avm__ghost { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:'Cormorant Garamond',serif; font-size:clamp(8rem,17vw,15rem); font-weight:300; color:transparent; -webkit-text-stroke:1px rgba(201,168,76,.04); letter-spacing:.1em; user-select:none; pointer-events:none; white-space:nowrap; }
        .avm__wrap { max-width:1200px; margin:0 auto; position:relative; z-index:1; }
        .avm__cards { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:rgba(201,168,76,.08); margin-top:3rem; }
        .avm__card { background:var(--obsidian); overflow:hidden; transition:opacity .85s ease,transform .85s ease; }
        .avm__card-ph { height:200px; overflow:hidden; position:relative; }
        .avm__card-ph img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(.65); transition:transform .6s,filter .4s; }
        .avm__card:hover .avm__card-ph img { transform:scale(1.04); filter:brightness(.78); }
        .avm__card-fade { position:absolute; inset:0; background:linear-gradient(to bottom,transparent 35%,rgba(8,8,8,.95) 100%); }
        .avm__card-body { padding:2.5rem clamp(1.5rem,3vw,3rem); }
        .avm__ch { font-family:'Cormorant Garamond',serif; font-size:clamp(1.15rem,1.9vw,1.65rem); font-weight:400; color:rgba(255,255,255,.88); line-height:1.2; margin-bottom:1rem; }

        /* ══════════════════════
           VALUES
        ══════════════════════ */
        .av { background:#0d0d0d; padding:7rem clamp(1.5rem,6vw,5rem); position:relative; }
        .av__hr { position:absolute; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.2),transparent); }
        .av__hr--t { top:0; } .av__hr--b { bottom:0; }
        .av__wrap { max-width:1280px; margin:0 auto; }
        .av__grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(201,168,76,.06); }
        .av__card { background:var(--obsidian); padding:2.5rem 1.75rem; position:relative; overflow:hidden; cursor:default; transition:background .3s,opacity .75s ease,transform .75s ease; }
        .av__card:hover { background:#0f0f0f; }
        .av__glyph { font-size:1.4rem; color:rgba(201,168,76,.38); margin-bottom:1.25rem; display:block; transition:color .3s; }
        .av__card:hover .av__glyph { color:var(--gold); }
        .av__title { font-family:'Cormorant Garamond',serif; font-size:1.12rem; font-weight:500; color:rgba(255,255,255,.88); margin-bottom:.75rem; }
        .av__hbar { position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--gold),transparent); transform:scaleX(0); transform-origin:left; transition:transform .35s ease; }
        .av__card:hover .av__hbar { transform:scaleX(1); }

        /* ══════════════════════
           TIMELINE
        ══════════════════════ */
        .atl { background:var(--charcoal); padding:7rem clamp(1.5rem,6vw,5rem); }
        .atl__wrap { max-width:1280px; margin:0 auto; }
        .atl__sub { max-width:280px; text-align:right; }
        .atl__hr { height:1px; background:rgba(201,168,76,.1); margin-bottom:3rem; }
        .atl__grid { display:grid; grid-template-columns:repeat(3,1fr); border:1px solid rgba(201,168,76,.08); }
        .atl__item { padding:2.25rem clamp(1rem,2.5vw,2rem); border-right:1px solid rgba(201,168,76,.08); border-bottom:1px solid rgba(201,168,76,.08); cursor:default; transition:background .25s,opacity .75s ease,transform .75s ease; }
        .atl__item:nth-child(3n) { border-right:none; }
        .atl__item:nth-child(n+4) { border-bottom:none; }
        .atl__item:hover { background:rgba(201,168,76,.025); }
        .atl__yr-row { display:flex; align-items:center; gap:.75rem; margin-bottom:.9rem; }
        .atl__yr { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:300; background:linear-gradient(135deg,#E2C07A,#C9A84C); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; flex-shrink:0; line-height:1; }
        .atl__yr-line { flex:1; height:1px; background:rgba(201,168,76,.15); }
        .atl__dot { width:6px; height:6px; border-radius:50%; background:var(--gold); opacity:.5; flex-shrink:0; }
        .atl__title { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:500; color:rgba(255,255,255,.82); margin-bottom:.6rem; }

        /* ══════════════════════
           TEAM — 2-member layout
        ══════════════════════ */
        .atm { background:var(--obsidian); }
        .atm__strip { display:flex; height:130px; overflow:hidden; }
        .atm__strip-cell { flex:1; position:relative; overflow:hidden; }
        .atm__strip-cell img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(.45); transition:filter .4s,transform .5s; }
        .atm__strip-cell:hover img { filter:brightness(.62); transform:scale(1.06); }
        .atm__strip-ov { position:absolute; inset:0; background:linear-gradient(to bottom,transparent,rgba(8,8,8,.75)); }
        .atm__wrap { max-width:1280px; margin:0 auto; padding:4rem clamp(1.5rem,6vw,5rem) 6rem; }
        .atm__sub { max-width:320px; text-align:right; }
        .atm__hr { height:1px; background:rgba(255,255,255,.05); margin:2.5rem 0; }

        /* ── 2-card centered grid ── */
        .atm__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 460px));
          gap: 24px;
          justify-content: center;
        }

        .atm__card {
          background: rgba(16,14,10,1);
          border: 1px solid rgba(201,168,76,.1);
          padding: 3rem 2.75rem 2.75rem;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: background .3s, border-color .3s, opacity .75s ease, transform .75s ease;
        }
        .atm__card:hover {
          background: rgba(20,17,11,1);
          border-color: rgba(201,168,76,.28);
        }

        .atm__tbar { position:absolute; top:0; left:0; right:0; height:2px; opacity:0; transition:opacity .35s; }
        .atm__card:hover .atm__tbar { opacity:1; }

        /* Larger avatar for 2-up layout */
        .atm__av {
          width: 72px; height: 72px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
          border: 2px solid rgba(255,255,255,.08);
          flex-shrink: 0;
        }
        .atm__av span {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 500; color: #111;
        }

        .atm__exp { font-family:'Jost',sans-serif; font-size:.5rem; letter-spacing:.22em; text-transform:uppercase; border:1px solid rgba(201,168,76,.28); color:rgba(201,168,76,.72); padding:3px 10px; display:inline-block; margin-bottom:1rem; }
        .atm__name { font-family:'Cormorant Garamond',serif; font-size:1.45rem; font-weight:500; color:rgba(255,255,255,.92); margin-bottom:.3rem; letter-spacing:.01em; }
        .atm__role { font-family:'Jost',sans-serif; font-size:.58rem; letter-spacing:.14em; text-transform:uppercase; font-weight:400; margin-bottom:1.5rem; }

        .atm__divider { height:1px; margin-bottom:1.5rem; opacity:.5; }

        .atm__desc { font-size:.76rem; line-height:1.9; }

        .atm__bbar { position:absolute; bottom:0; left:0; right:0; height:2px; opacity:0; transition:opacity .35s; }
        .atm__card:hover .atm__bbar { opacity:1; }

        /* Join strip */
        .atm__join {
          display: flex; align-items: center; gap: 2rem;
          margin-top: 3.5rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255,255,255,.05);
        }
        .atm__join-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.2),transparent); }
        .atm__join-content { text-align:center; flex-shrink:0; }
        .atm__join-label { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:400; color:rgba(255,255,255,.7); margin-bottom:.2rem; }
        .atm__join-sub { font-family:'Jost',sans-serif; font-size:.6rem; color:rgba(255,255,255,.25); font-weight:300; letter-spacing:.04em; }
        .atm__join-btn {
          flex-shrink:0;
          font-family:'Jost',sans-serif; font-size:.6rem; font-weight:500; letter-spacing:.2em; text-transform:uppercase;
          border:1px solid rgba(201,168,76,.3); color:rgba(201,168,76,.7);
          text-decoration:none; padding:.6rem 1.4rem;
          display:flex; align-items:center; gap:8px;
          transition:border-color .2s,color .2s,background .2s;
          white-space:nowrap;
        }
        .atm__join-btn:hover { border-color:rgba(201,168,76,.7); color:var(--gold); background:rgba(201,168,76,.04); }

        /* ══════════════════════
           CTA
        ══════════════════════ */
        .acta { position:relative; padding:8rem clamp(1.5rem,6vw,5rem); overflow:hidden; text-align:center; }
        .acta__bg { position:absolute; inset:0; }
        .acta__bg img { width:100%; height:100%; object-fit:cover; }
        .acta__bg-ov { position:absolute; inset:0; background:rgba(4,4,4,.89); }
        .acta__glow { position:absolute; inset:0; background:radial-gradient(ellipse at 50% 50%,rgba(201,168,76,.08),transparent 65%); pointer-events:none; z-index:1; }
        .acta__hr { position:absolute; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent); z-index:1; }
        .acta__hr--t { top:0; } .acta__hr--b { bottom:0; }
        .acta__inner { max-width:680px; margin:0 auto; position:relative; z-index:2; }
        .acta__h { font-family:'Cormorant Garamond',serif; font-size:clamp(2.2rem,4.5vw,4rem); font-weight:300; color:rgba(255,255,255,.92); line-height:1.1; margin-bottom:1.25rem; }
        .acta__sub { max-width:460px; margin:0 auto 2.5rem; text-align:center; }
        .acta__btns { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
        .btn-pri { font-family:'Jost',sans-serif; font-size:.68rem; font-weight:500; letter-spacing:.22em; text-transform:uppercase; background:linear-gradient(135deg,var(--gold-light),var(--gold)); color:var(--obsidian); text-decoration:none; padding:.9rem 2.2rem; display:flex; align-items:center; gap:10px; transition:transform .2s,opacity .2s; }
        .btn-pri:hover { transform:translateY(-2px); opacity:.9; }
        .btn-out { font-family:'Jost',sans-serif; font-size:.68rem; font-weight:400; letter-spacing:.22em; text-transform:uppercase; border:1px solid rgba(201,168,76,.4); color:rgba(255,255,255,.65); text-decoration:none; padding:.9rem 2.2rem; display:flex; align-items:center; gap:10px; transition:border-color .2s,color .2s; }
        .btn-out:hover { border-color:rgba(201,168,76,.8); color:#fff; }

        /* ══════════════════════
           RESPONSIVE
        ══════════════════════ */

        /* ─ Tablet (≤1024px) ─ */
        @media (max-width: 1024px) {
          .ah { height: auto; min-height: 100vh; display: flex; flex-direction: column; }
          .ah__mosaic { position:relative; height:45vw; min-height:280px; order:2; grid-template-columns:repeat(3,1fr); grid-template-rows:repeat(2,1fr); }
          .ah__mosaic-fade { background:linear-gradient(to bottom,rgba(8,8,8,.7) 0%,transparent 30%,transparent 70%,rgba(8,8,8,.6) 100%); }
          .ah__text { position:relative; top:0; left:0; bottom:auto; width:100%; order:1; padding:calc(72px + 2.5rem) clamp(1.5rem,5vw,3.5rem) 2.5rem; justify-content:flex-end; }
          .ah__vbar { display:none; }
          .ah__h1-ghost { font-size:clamp(2.5rem,7vw,4.5rem); }
          .ah__h1-gold  { font-size:clamp(4rem,11vw,7.5rem); }
          .ah__tagline  { max-width:100%; }

          .ai__wrap { grid-template-columns:1fr; }
          .ai__photos { height:320px; }
          .ai__ph-stack { width:30%; }

          .as__grid { grid-template-columns:repeat(2,1fr); }
          .as__item:nth-child(2) { border-right:none; }
          .as__item:nth-child(1),.as__item:nth-child(2) { border-bottom:1px solid rgba(201,168,76,.1); }

          .avm__cards { grid-template-columns:1fr; }
          .av__grid { grid-template-columns:repeat(2,1fr); }

          .atl__grid { grid-template-columns:repeat(2,1fr); }
          .atl__item:nth-child(2n)  { border-right:none; }
          .atl__item:nth-child(n+5) { border-bottom:none; }
          .atl__item:nth-child(3n)  { border-right:1px solid rgba(201,168,76,.08); }

          .atm__grid { grid-template-columns:repeat(2,minmax(0,460px)); gap:16px; }
          .atm__join { flex-wrap:wrap; justify-content:center; }
          .atm__join-line { display:none; }

          .hs { flex-direction:column; align-items:flex-start; }
          .atl__sub,.atm__sub { text-align:left; max-width:100%; }
        }

        /* ─ Mobile (≤640px) ─ */
        @media (max-width: 640px) {
          .ah__mosaic { height:55vw; min-height:220px; grid-template-columns:repeat(2,1fr); grid-template-rows:repeat(3,1fr); }
          .ah__h1-ghost { font-size:clamp(2rem,9vw,3.2rem); }
          .ah__h1-gold  { font-size:clamp(3.2rem,14vw,5.5rem); }
          .ah__stats { width:100%; }
          .ah__stat { flex:1; }

          .ai__photos { height:240px; }
          .ai__ph-stack { display:none; }
          .ai__ph-main { width:100%; height:100%; }
          .ai__cities { display:none; }

          .as__grid { grid-template-columns:repeat(2,1fr); }
          .av__grid  { grid-template-columns:1fr; }

          .atl__grid { grid-template-columns:1fr; }
          .atl__item { border-right:none !important; }
          .atl__item:last-child { border-bottom:none; }

          /* Stack team cards on mobile */
          .atm__grid { grid-template-columns:1fr; max-width:460px; margin:0 auto; }
          .atm__strip { height:80px; }
          .atm__join { gap:1rem; }

          .acta__btns { flex-direction:column; align-items:stretch; }
          .btn-pri,.btn-out { justify-content:center; }
        }

        /* ─ Very small (≤400px) ─ */
        @media (max-width: 400px) {
          .ah__stats { flex-wrap:wrap; width:100%; }
          .ah__stat { min-width:45%; }
          .as__grid { grid-template-columns:1fr; }
          .as__item { border-right:none !important; border-bottom:1px solid rgba(201,168,76,.1) !important; }
          .as__item:last-child { border-bottom:none !important; }
        }
      `}</style>
    </>
  )
}