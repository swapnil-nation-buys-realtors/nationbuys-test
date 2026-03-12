'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname                = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(1.25rem, 5vw, 2.5rem)',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s',
        background: scrolled || open ? 'rgba(8,8,8,0.98)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.14)' : '1px solid transparent',
      }}>
        {/* ── Logo ── */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="NBR Realty Logo"
            style={{ height: '36px', width: 'auto', display: 'block' }}
          />
          <div style={{ lineHeight: 1 }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(0.85rem, 2.5vw, 1.25rem)',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg,#E2C07A,#C9A84C,#A07830)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'nowrap',
            }}>Nation Buys Realtors</div>
          </div>
        </Link>

        <div style={{ flex: 1 }} />

        {/* ── Desktop Nav ── */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden-mobile">
          {NAV.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: active ? 'var(--gold-light)' : 'rgba(255,255,255,0.58)',
                textDecoration: 'none',
                position: 'relative',
                paddingBottom: '2px',
                transition: 'color 0.25s',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)' }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.58)' }}
              >
                {label}
                {active && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0, left: 0,
                    width: '100%', height: '1px',
                    background: 'linear-gradient(90deg,var(--gold),transparent)',
                  }}/>
                )}
              </Link>
            )
          })}

          <Link href="/contact" style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--obsidian)',
            textDecoration: 'none',
            padding: '0.55rem 1.5rem',
            background: 'linear-gradient(135deg,var(--gold-light),var(--gold))',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.opacity = '0.88'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.opacity = '1'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
          >Enquire</Link>
        </nav>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none', zIndex: 110 }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '1px',
              background: 'var(--gold)',
              margin: '5px 0',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: open
                ? i === 0 ? 'rotate(45deg) translate(4px,4px)'
                : i === 2 ? 'rotate(-45deg) translate(4px,-4px)'
                : 'none'
                : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </header>

      {/* ── Mobile Menu — full screen overlay ── */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(8,8,8,0.99)',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0',
        padding: '6rem 2rem 3rem',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.45s cubic-bezier(0.77,0,0.175,1)',
      }}>
        {/* Gold decorative line */}
        <div style={{
          width: '1px', height: '60px',
          background: 'linear-gradient(180deg,transparent,var(--gold))',
          marginBottom: '2.5rem',
        }}/>

        {NAV.map(({ href, label }, idx) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} style={{
            display: 'block',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: pathname === href ? 'var(--gold-light)' : 'rgba(255,255,255,0.72)',
            textDecoration: 'none',
            padding: '0.6rem 0',
            textAlign: 'center',
            transition: 'color 0.2s',
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            opacity: open ? 1 : 0,
            transitionDelay: open ? `${0.15 + idx * 0.07}s` : '0s',
          }}>
            {label}
          </Link>
        ))}

        <div style={{
          width: '1px', height: '60px',
          background: 'linear-gradient(180deg,var(--gold),transparent)',
          marginTop: '2.5rem', marginBottom: '2.5rem',
        }}/>

        <Link href="/contact" onClick={() => setOpen(false)} style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.68rem',
          fontWeight: 500,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--obsidian)',
          textDecoration: 'none',
          padding: '1rem 3rem',
          background: 'linear-gradient(135deg,var(--gold-light),var(--gold))',
          transform: open ? 'translateY(0)' : 'translateY(20px)',
          opacity: open ? 1 : 0,
          transition: 'transform 0.5s ease, opacity 0.5s ease',
          transitionDelay: open ? '0.4s' : '0s',
        }}>
          Enquire Now
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: block !important; }
        }
      `}</style>
    </>
  )
}