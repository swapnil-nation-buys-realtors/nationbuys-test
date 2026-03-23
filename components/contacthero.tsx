'use client'
import { useEffect, useState } from 'react'

const FLOATING_IMAGES = [
  {
    src: '/sky.jpg',
    // top-right image
    desktopStyle: { top: '18%', right: '4%', width: '180px' },
    tabletStyle:  { top: '10%', right: '2%', width: '130px' },
    mobileStyle:  { top: '8%',  right: '1rem', width: '90px' },
  },
  {
    src: '/office.jpg',
    // bottom-right image
    desktopStyle: { bottom: '18%', right: '10%', width: '220px' },
    tabletStyle:  { bottom: '14%', right: '2%', width: '140px' },
    mobileStyle:  { bottom: '14%', right: '1rem', width: '100px' },
  },
]

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

function getBreakpoint(w: number): Breakpoint {
  if (w < 600) return 'mobile'
  if (w < 1100) return 'tablet'
  return 'desktop'
}

export default function ContactHero() {
  const [loaded, setLoaded] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [bp, setBp] = useState<Breakpoint>('desktop')

  useEffect(() => {
    setLoaded(true)

    const update = () => setBp(getBreakpoint(window.innerWidth))
    update()
    window.addEventListener('resize', update)

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 600) return
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', update)
    }
  }, [])

  const isMobile  = bp === 'mobile'
  const isTablet  = bp === 'tablet'
  const isDesktop = bp === 'desktop'

  // Content area max-width shrinks on tablet so it never overlaps the images
  const contentMaxWidth = isDesktop ? '560px' : isTablet ? '420px' : '100%'
  const contentPadding  = isMobile ? '0 1.5rem' : isTablet ? '0 3rem' : '0 6rem'

  // Image height by breakpoint
  const imgHeight = isDesktop ? '240px' : isTablet ? '160px' : '120px'

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '560px',
        width: '100%',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85&auto=format"
        alt="Luxury Real Estate"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.3) contrast(1.1)',
          transform: loaded ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 8s ease',
        }}
      />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isMobile
          ? 'linear-gradient(to bottom, rgba(0,0,0,0.78), rgba(0,0,0,0.65))'
          : 'linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.75), rgba(0,0,0,0.25))',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent 60%)',
      }} />

      {/* ─── Floating Frames ─────────────────────────────────────── */}
      {FLOATING_IMAGES.map((img, i) => {
        const depth       = (i + 1) * 0.5
        const frameStyle  = isDesktop ? img.desktopStyle
                          : isTablet  ? img.tabletStyle
                          : img.mobileStyle

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...frameStyle,
              transform: `translate(${mouse.x * depth}px, ${mouse.y * depth}px)`,
              transition: 'transform 0.2s ease-out',
              zIndex: 2,
              opacity: isMobile ? 0.6 : 0.9,
            }}
          >
            <div
              style={{
                padding: '4px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(201,168,76,0.7)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
              }}
            >
              <img
                src={img.src}
                alt="Property"
                style={{
                  width: '100%',
                  height: imgHeight,
                  objectFit: 'cover',
                  borderRadius: '6px',
                  filter: 'brightness(0.9)',
                  display: 'block',
                }}
              />
            </div>
          </div>
        )
      })}

      {/* ─── Content ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: contentPadding,
          // Key fix: cap width so text never bleeds under the right-side images
          maxWidth: contentMaxWidth,
        }}
      >
        {/* Eyebrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{
            width: '30px',
            height: '1px',
            background: 'linear-gradient(90deg,#E2C07A,#C9A84C)',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            color: '#C9A84C',
            textTransform: 'uppercase',
          }}>
            Contact
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: isMobile
            ? 'clamp(2.2rem, 9vw, 3rem)'
            : isTablet
            ? 'clamp(2.6rem, 5vw, 4rem)'
            : 'clamp(3rem, 5.5vw, 5.8rem)',
          fontWeight: 300,
          lineHeight: 1.05,
          marginBottom: '1.2rem',
          color: 'rgba(255,255,255,0.95)',
        }}>
          Let&apos;s Discuss
          <br />
          <span style={{
            background: 'linear-gradient(135deg,#E2C07A,#C9A84C,#A07830)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Your Next Investment
          </span>
        </h1>

        {/* Description */}
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: isMobile ? '0.82rem' : '0.9rem',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: '420px',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          Connect with our advisory team for exclusive opportunities,
          strategic insights, and premium real estate investments.
        </p>
      </div>

      {/* Vertical Tagline — desktop only */}
      {isDesktop && (
        <div style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          writingMode: 'vertical-rl',
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.55rem',
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.18)',
          zIndex: 3,
        }}>
          PRIME • LUXURY • REAL ESTATE
        </div>
      )}

      <style>{`
        @media (max-width: 480px) {
          section { min-height: 100svh; }
        }
      `}</style>
    </section>
  )
}