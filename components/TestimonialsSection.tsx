'use client'

const DEVELOPER_LOGOS = [
  { name: 'VTP',        sub: 'Realty'        },
  { name: 'PANCHSHIL',  sub: 'Realty'        },
  { name: 'MALPANI',    sub: 'Group'         },
  { name: 'GERA',       sub: 'Developments'  },
  { name: 'GODREJ',     sub: 'Properties'    },
  { name: 'TATA',       sub: 'Housing'       },
  { name: 'MAHINDRA',   sub: 'Lifespaces'    },
  { name: 'KOLTE',      sub: 'Patil'         },
  { name: 'BRIGADE',    sub: 'Group'         },
  { name: 'PRESTIGE',   sub: 'Estates'       },
  { name: 'DLF',        sub: 'Limited'       },
  { name: 'OBEROI',     sub: 'Realty'        },
  { name: 'EMBASSY',    sub: 'Group'         },
  { name: 'SOBHA',      sub: 'Limited'       },
  { name: 'LODHA',      sub: 'Developers'    },
  { name: 'PIRAMAL',    sub: 'Realty'        },
]

const RETAIL_LOGOS = [
  { name: 'DUCATI',        sub: 'Motorcycles'    },
  { name: 'MERCEDES',      sub: 'Benz'           },
  { name: 'LAMBORGHINI',   sub: 'Automobiles'    },
  { name: 'LEXUS',         sub: 'Automobiles'    },
  { name: 'ROYAL ENFIELD', sub: 'Motors'         },
  { name: 'INDIAN',        sub: 'Motors'         },
  { name: 'BENELLI', sub: 'Motors'         },
  { name: 'ZARA',          sub: 'Fashion'        },
  { name: 'H&M',           sub: 'Lifestyle'      },
  { name: 'HAMLEYS',       sub: 'Toys'           },
  { name: 'RAYMOND',       sub: 'Lifestyle'      },
  { name: 'PUMA',          sub: 'Sports'         },
  { name: 'BATA',          sub: 'Footwear'       },
  { name: 'REEBOK',        sub: 'Sports'         },
  { name: 'PANTALOONS',    sub: 'Fashion'        },
  { name: 'SHOPPERS STOP',    sub: 'Fashion'        },
  { name: 'WESTSIDE',      sub: 'Lifestyle'      },
  { name: 'INOX',          sub: 'Cinemas'        },
  { name: 'PVR',           sub: 'Cinemas'        },
  { name: 'CINEPOLIS',     sub: 'Cinemas'        },
  { name: "McDONALD'S",    sub: 'Restaurants'    },
  { name: 'PIZZA HUT',     sub: 'Restaurants'    },
  { name: 'KFC',           sub: 'Restaurants'    },
  { name: 'STARBUCKS',     sub: 'Coffee'         },
  { name: "DOMINO'S",      sub: 'Pizza'          },
  { name: 'CHAAYOS',       sub: 'Beverages'      },
  { name: 'DECATHLON',     sub: 'Sports'         },
  { name: 'MALABAR',       sub: 'Gold & Diamonds'},
  { name: 'AIRTEL',        sub: 'Telecom'        },
  { name: 'MASERATI',      sub: 'Automobiles'    },
  { name: 'LIFESTYLE',     sub: 'Fashion'        },
  { name: 'GO COLORS!',    sub: 'Fashion'        },
  { name: 'WILLS LIFESTYLE', sub: 'Lifestyle'    },
  { name: 'JOCKEY',        sub: 'Apparel'        },
  { name: 'VAN HEUSEN',    sub: 'Apparel'        },
  { name: 'ARVIND',        sub: 'Lifestyle'      },
  { name: 'BENETTON',      sub: 'Fashion'        },
  { name: 'ARROW',         sub: 'Apparel'        },
  { name: 'AND',           sub: 'Fashion'        },
  { name: 'GAS',           sub: 'Fashion'        },
  { name: 'U.S. POLO ASSN.', sub: 'Apparel'      },
  { name: 'INDIAN TERRAIN', sub: 'Apparel'       },
  { name: '109°F',         sub: 'Fashion'        },
  { name: 'CARNIVAL',      sub: 'Cinemas'        },
  { name: 'MOVIE TIME',    sub: 'Cinemas'        },
  { name: 'SRS CINEMAS',   sub: 'Cinemas'        },
  { name: 'BURGER KING',   sub: 'Restaurants'    },
  { name: 'DUNKIN DONUTS', sub: 'Beverages'      },
  { name: 'THE BEER CAFE', sub: 'Restaurants'    },
  { name: 'MAMAGOTO',      sub: 'Restaurants'    },
  { name: 'CAFÉ COFFEE DAY', sub: 'Coffee'       },
  { name: 'GELATO ITALIANO', sub: 'Desserts'     },
  { name: 'MASPAR',        sub: 'Home Decor'     },
  { name: 'THEOBROMA',     sub: 'Bakery'         },
  { name: 'MAINLAND CHINA', sub: 'Restaurants'    },
  { name: 'BELGIAN WAFFLE', sub: 'Desserts'      },
  { name: 'GITANJALI',     sub: 'Jewellery'      },
  { name: 'SWISS INTERNATIONAL', sub: 'Hotels'   },
  { name: "D'DECOR",       sub: 'Home Decor'     }
]

const ALL_DEV    = [...DEVELOPER_LOGOS, ...DEVELOPER_LOGOS]
const ALL_RETAIL = [...RETAIL_LOGOS, ...RETAIL_LOGOS]

export default function TestimonialsSection() {
  return (
    <section className="trust-section" style={{ background:'#0a0a0a', padding:'6rem 0 5rem', overflow:'hidden', position:'relative' }}>

      <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px',
        background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.28),transparent)' }}/>

      {/* Heading */}
      <div className="trust-heading" style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 5rem', marginBottom:'3.5rem', position:'relative' }}>
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
            fontFamily:'Jost,sans-serif', fontSize:'0.6rem',
            letterSpacing:'0.4em', textTransform:'uppercase',
            color:'var(--gold)', fontWeight:300, marginBottom:'0.85rem',
          }}>Partners & Associates</p>
          <h2 style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'clamp(1.6rem,3vw,2.6rem)',
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

      {/* MARQUEE 1 — Developers */}
      <div>
        <div style={{ textAlign:'center', marginBottom:'0.75rem' }}>
          <p style={{
            fontFamily:'Jost,sans-serif', fontSize:'0.52rem',
            letterSpacing:'0.35em', textTransform:'uppercase',
            color:'rgba(201,168,76,0.45)', fontWeight:300,
          }}>Real Estate Developers</p>
        </div>

        <div style={{ position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', zIndex:2, pointerEvents:'none',
            background:'linear-gradient(90deg,#0a0a0a 0%,transparent 100%)' }}/>
          <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', zIndex:2, pointerEvents:'none',
            background:'linear-gradient(-90deg,#0a0a0a 0%,transparent 100%)' }}/>

          <div style={{
            display:'flex', alignItems:'center',
            width:'max-content',
            animation:'marquee 42s linear infinite',
          }}>
            {ALL_DEV.map((logo, i) => (
              <div key={i} className="trust-logo-tile" style={{
                flexShrink:0,
                width:'150px', height:'70px',
                display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center',
                border:'1px solid rgba(201,168,76,0.1)',
                borderRight:'none',
                transition:'background 0.3s, border-color 0.3s',
                cursor:'default',
              }}
              onMouseEnter={e=>{ const el = e.currentTarget as HTMLElement; el.style.background='rgba(201,168,76,0.06)'; el.style.borderColor='rgba(201,168,76,0.3)' }}
              onMouseLeave={e=>{ const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.borderColor='rgba(201,168,76,0.1)' }}
              >
                <span style={{
                  fontFamily:'Cormorant Garamond,serif',
                  fontSize:'0.9rem', fontWeight:600,
                  letterSpacing:'0.18em',
                  color:'rgba(255,255,255,0.72)',
                  transition:'color 0.3s', display:'block',
                }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='rgba(201,168,76,0.9)'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.72)'}
                >{logo.name}</span>
                <span style={{
                  fontFamily:'Jost,sans-serif', fontSize:'0.45rem',
                  letterSpacing:'0.26em', textTransform:'uppercase',
                  color:'rgba(255,255,255,0.32)', marginTop:'3px',
                }}>{logo.sub}</span>
              </div>
            ))}
            <div style={{ width:'1px', height:'70px', background:'rgba(201,168,76,0.1)' }}/>
          </div>
        </div>
      </div>

      {/* MARQUEE 2 — Retail */}
      <div style={{ marginTop:'1.5rem' }}>
        <div style={{ textAlign:'center', marginBottom:'0.75rem' }}>
          <p style={{
            fontFamily:'Jost,sans-serif', fontSize:'0.52rem',
            letterSpacing:'0.35em', textTransform:'uppercase',
            color:'rgba(201,168,76,0.45)', fontWeight:300,
          }}>Retail & Lifestyle Brands</p>
        </div>

        <div style={{ position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', zIndex:2, pointerEvents:'none',
            background:'linear-gradient(90deg,#0a0a0a 0%,transparent 100%)' }}/>
          <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', zIndex:2, pointerEvents:'none',
            background:'linear-gradient(-90deg,#0a0a0a 0%,transparent 100%)' }}/>

          <div style={{
            display:'flex', alignItems:'center',
            width:'max-content',
            animation:'marquee 90s linear infinite reverse',
          }}>
            {ALL_RETAIL.map((logo, i) => (
              <div key={i} className="trust-logo-tile" style={{
                flexShrink:0,
                width:'150px', height:'70px',
                display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center',
                border:'1px solid rgba(201,168,76,0.08)',
                borderRight:'none',
                transition:'background 0.3s, border-color 0.3s',
                cursor:'default',
              }}
              onMouseEnter={e=>{ const el = e.currentTarget as HTMLElement; el.style.background='rgba(201,168,76,0.05)'; el.style.borderColor='rgba(201,168,76,0.28)' }}
              onMouseLeave={e=>{ const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.borderColor='rgba(201,168,76,0.08)' }}
              >
                <span style={{
                  fontFamily:'Cormorant Garamond,serif',
                  fontSize:'0.85rem', fontWeight:600,
                  letterSpacing:'0.14em',
                  color:'rgba(255,255,255,0.65)',
                  transition:'color 0.3s', display:'block',
                  textAlign:'center', padding:'0 6px',
                }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='rgba(201,168,76,0.88)'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.65)'}
                >{logo.name}</span>
                <span style={{
                  fontFamily:'Jost,sans-serif', fontSize:'0.43rem',
                  letterSpacing:'0.24em', textTransform:'uppercase',
                  color:'rgba(255,255,255,0.28)', marginTop:'3px',
                }}>{logo.sub}</span>
              </div>
            ))}
            <div style={{ width:'1px', height:'70px', background:'rgba(201,168,76,0.08)' }}/>
          </div>
        </div>
      </div>

      {/* Testimonial quote */}
      <div className="trust-quote" style={{ maxWidth:'720px', margin:'4.5rem auto 0', padding:'0 5rem', textAlign:'center' }}>
        

        <p style={{
          fontFamily:'Cormorant Garamond,serif',
          fontSize:'clamp(1rem,1.8vw,1.45rem)',
          fontStyle:'italic', fontWeight:300,
          color:'rgba(255,255,255,0.52)',
          lineHeight:1.65, marginBottom:'2rem',
        }}>
         Aligned with leading developers, investors, and global brands, our partnerships are a reflection of the trust, access, and expertise that define our approach.
        </p>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1.25rem' }}>
          <div style={{ height:'1px', width:'36px', background:'rgba(201,168,76,0.3)', flexShrink:0 }}/>
          <div>
           
            <p style={{ fontFamily:'Jost,sans-serif', fontSize:'0.58rem', color:'rgba(255,255,255,0.25)', fontWeight:300, marginTop:'2px' }}>
       
            </p>
          </div>
          <div style={{ height:'1px', width:'36px', background:'rgba(201,168,76,0.3)', flexShrink:0 }}/>
        </div>
      </div>

      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px',
        background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.28),transparent)' }}/>

      <style>{`
        @media (max-width: 768px) {
          .trust-section  { padding: 4rem 0 3rem !important; }
          .trust-heading  { padding: 0 1.5rem !important; margin-bottom: 2.5rem !important; }
          .trust-quote    { padding: 0 1.5rem !important; margin-top: 3rem !important; }
          .trust-logo-tile { width: 120px !important; height: 60px !important; }
        }
        @media (max-width: 480px) {
          .trust-heading  { padding: 0 1rem !important; }
          .trust-quote    { padding: 0 1rem !important; }
          .trust-logo-tile { width: 100px !important; height: 56px !important; }
        }
      `}</style>
    </section>
  )
}