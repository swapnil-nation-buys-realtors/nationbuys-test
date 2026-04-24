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
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Prevent body scroll when mobile menu is open
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
        height: 'var(--header-h)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(1rem, 4vw, 2.5rem)',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s',
        background: scrolled || open ? 'rgba(8,8,8,0.97)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || open ? 'blur(16px)' : 'none',
        borderBottom: scrolled || open ? '1px solid rgba(201,168,76,0.14)' : '1px solid transparent',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="NBR Realty Logo"
            style={{ height: 'clamp(28px, 4vw, 36px)', width: 'auto', display: 'block' }}
          />
          <div style={{ lineHeight: 1 }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(0.78rem, 2vw, 1.1rem)',
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

        {/* Desktop / Tablet Nav */}
        <nav className="header-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 3vw, 2.5rem)' }}>
          {NAV.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: 'clamp(0.6rem, 1.1vw, 0.7rem)',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: active ? 'var(--gold-light)' : 'rgba(255,255,255,0.58)',
                textDecoration: 'none',
                position: 'relative',
                paddingBottom: '2px',
                transition: 'color 0.25s',
                whiteSpace: 'nowrap',
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
                  }} />
                )}
              </Link>
            )
          })}

          <Link href="/contact#enquire" className="header-enquire-btn" style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: 'clamp(0.58rem, 1vw, 0.65rem)',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--obsidian)',
            textDecoration: 'none',
            padding: 'clamp(0.45rem, 1vw, 0.55rem) clamp(1rem, 2vw, 1.5rem)',
            background: 'linear-gradient(135deg,var(--gold-light),var(--gold))',
            transition: 'opacity 0.2s, transform 0.2s',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
          >Enquire</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="header-hamburger"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none', flexShrink: 0 }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {[0, 1, 2].map(i => (
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
            }} />
          ))}
        </button>
      </header>

      {/* Mobile menu drawer */}
      <div
        className="header-mobile-menu"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: 'var(--header-h)', left: 0, right: 0, bottom: 0,
          zIndex: 99,
          background: 'rgba(8,8,8,0.99)',
          borderTop: '1px solid rgba(201,168,76,0.12)',
          padding: '1.5rem 1.75rem 3rem',
          display: 'none',
          flexDirection: 'column',
          overflowY: 'auto',
          transform: open ? 'translateY(0)' : 'translateY(-6px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}>
        {NAV.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} style={{
            display: 'block',
            fontFamily: 'Jost, sans-serif',
            fontSize: 'clamp(0.75rem, 3vw, 0.85rem)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: pathname === href ? 'var(--gold-light)' : 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            padding: '1rem 0',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            transition: 'color 0.2s',
          }}>{label}</Link>
        ))}

        <Link href="/contact#enquire" onClick={() => setOpen(false)} style={{
          display: 'inline-block',
          marginTop: '2rem',
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.68rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--obsidian)',
          textDecoration: 'none',
          padding: '0.85rem 2.25rem',
          background: 'linear-gradient(135deg,var(--gold-light),var(--gold))',
          alignSelf: 'flex-start',
        }}>Enquire Now</Link>
      </div>

      {/* Overlay backdrop for mobile */}
      <div
        className="header-overlay"
        onClick={() => setOpen(false)}
        style={{
          display: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 98,
          background: 'rgba(0,0,0,0.5)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      <style>{`
        :root {
          --header-h: 72px;
        }

        /* ── Tablet (≤ 1024px): compress but keep desktop nav ── */
        @media (max-width: 1024px) {
          .header-desktop-nav {
            gap: 1.25rem !important;
          }
        }

        /* ── Small tablet / large mobile (≤ 768px): switch to drawer ── */
        @media (max-width: 768px) {
          :root { --header-h: 64px; }
          .header-desktop-nav  { display: none !important; }
          .header-hamburger    { display: block !important; }
          .header-mobile-menu  { display: flex !important; }
          .header-overlay      { display: block !important; }
        }

        /* ── Small phones (≤ 380px) ── */
        @media (max-width: 380px) {
          :root { --header-h: 58px; }
        }
      `}</style>
    </>
  )
}