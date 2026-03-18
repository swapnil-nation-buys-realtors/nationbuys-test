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

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2.5rem',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s',
        background: scrolled || open ? 'rgba(8,8,8,0.97)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(16px)' : 'none',
        borderBottom: scrolled || open ? '1px solid rgba(201,168,76,0.14)' : '1px solid transparent',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="NBR Realty Logo"
            style={{ height: '36px', width: 'auto', display: 'block' }}
          />
          <div style={{ lineHeight: 1 }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.1rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg,#E2C07A,#C9A84C,#A07830)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Nation Buys Realtors</div>
          </div>
        </Link>

        <div style={{ flex: 1 }} />

        {/* Desktop Nav */}
        <nav className="header-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
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
                    position: 'absolute', bottom: 0, left: 0,
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
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
          >Enquire</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="header-hamburger"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }}
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '1.5px',
              background: 'var(--gold)',
              margin: '5px 0',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: open
                ? i === 0 ? 'rotate(45deg) translate(4.5px,4.5px)'
                : i === 2 ? 'rotate(-45deg) translate(4.5px,-4.5px)'
                : 'none'
                : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </header>

      {/* Mobile menu drawer */}
      <div className="header-mobile-menu" style={{
        position: 'fixed',
        top: '72px', left: 0, right: 0,
        zIndex: 99,
        background: 'rgba(8,8,8,0.99)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        padding: '1.5rem 1.75rem 2rem',
        display: 'none',
        flexDirection: 'column',
        transform: open ? 'translateY(0)' : 'translateY(-8px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}>
        {NAV.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} style={{
            display: 'block',
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: pathname === href ? 'var(--gold-light)' : 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            padding: '0.9rem 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>{label}</Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)} style={{
          display: 'inline-block',
          marginTop: '1.25rem',
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.68rem',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--obsidian)',
          textDecoration: 'none',
          padding: '0.75rem 2rem',
          background: 'linear-gradient(135deg,var(--gold-light),var(--gold))',
          alignSelf: 'flex-start',
        }}>Enquire Now</Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .header-desktop-nav { display: none !important; }
          .header-hamburger   { display: block !important; }
          .header-mobile-menu { display: flex !important; }
          header { padding: 0 1.25rem !important; }
        }
      `}</style>
    </>
  )
}