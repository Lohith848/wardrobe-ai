'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#fff',
      fontFamily: 'system-ui, sans-serif', color: '#111'
    }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 32px', borderBottom: '1px solid #f0f0f0',
        background: '#fff', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: '#000', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#000', letterSpacing: '-0.5px' }}>
            Drip<span style={{ color: '#4f46e5' }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/wardrobe" style={{ color: '#555', textDecoration: 'none', fontSize: 14, padding: '8px 16px' }}>
            Wardrobe
          </Link>
          <Link href="/upload" style={{ color: '#555', textDecoration: 'none', fontSize: 14, padding: '8px 16px' }}>
            Upload
          </Link>
          <Link href="/outfit" style={{
            padding: '9px 20px', background: '#000', color: '#fff',
            borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700
          }}>
            Get Outfit
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: 860, margin: '0 auto',
        padding: '100px 24px 80px', textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block', padding: '6px 16px',
          background: '#f5f3ff', border: '1px solid #e0d9ff',
          borderRadius: 20, color: '#4f46e5',
          fontSize: 13, fontWeight: 600, marginBottom: 28
        }}>
          AI-Powered Personal Stylist
        </div>

        <h1 style={{
          fontSize: 62, fontWeight: 900, letterSpacing: '-2.5px',
          lineHeight: 1.05, margin: '0 0 24px', color: '#000'
        }}>
          Dress with clarity.
          <br />
          <span style={{ color: '#4f46e5' }}>Not confusion.</span>
        </h1>

        <p style={{
          fontSize: 18, color: '#777', maxWidth: 500,
          margin: '0 auto 40px', lineHeight: 1.7
        }}>
          Upload your wardrobe, let AI analyze every item and get
          perfect outfit combinations for any occasion — every single day.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/upload" style={{
            padding: '15px 32px', background: '#000', color: '#fff',
            borderRadius: 10, textDecoration: 'none',
            fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px'
          }}>
            Build my wardrobe
          </Link>
          <Link href="/outfit" style={{
            padding: '15px 32px', background: '#f5f3ff', color: '#4f46e5',
            borderRadius: 10, textDecoration: 'none', fontSize: 15,
            fontWeight: 600, border: '1px solid #e0d9ff'
          }}>
            Generate outfit
          </Link>
        </div>
      </section>

      {/* Stats */}
      <div style={{
        borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0',
        background: '#fafafa'
      }}>
        <div style={{
          maxWidth: 860, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '32px 24px'
        }}>
          {[
            { number: '100%', label: 'Free forever' },
            { number: 'AI', label: 'Vision analysis' },
            { number: 'Unlimited', label: 'Outfit combos' },
            { number: '< 1 min', label: 'Setup time' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#000',
                margin: '0 0 4px', letterSpacing: '-0.5px' }}>
                {stat.number}
              </p>
              <p style={{ fontSize: 13, color: '#aaa', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ color: '#aaa', fontSize: 11, fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase',
            textAlign: 'center', margin: '0 0 12px' }}>
            How it works
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: '#000',
            textAlign: 'center', margin: '0 0 48px', letterSpacing: '-1px' }}>
            Three steps to looking great
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20
          }}>
            {[
              {
                step: '01',
                title: 'Upload your wardrobe',
                desc: 'Capture and organize everything you own in seconds. Drag and drop your photos.',
                accent: '#4f46e5',
                bg: '#f5f3ff',
                border: '#e0d9ff'
              },
              {
                step: '02',
                title: 'AI understands your style',
                desc: 'Each item is analyzed for color, category, occasion and style automatically.',
                accent: '#059669',
                bg: '#f0fdf4',
                border: '#bbf7d0'
              },
              {
                step: '03',
                title: 'Get refined outfits',
                desc: 'Receive complete outfit combinations that work for your occasion and weather.',
                accent: '#d97706',
                bg: '#fffbeb',
                border: '#fde68a'
              },
            ].map(s => (
              <div key={s.step} style={{
                background: '#fff', borderRadius: 20, padding: 28,
                border: '1px solid #f0f0f0', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: -8, right: 16,
                  fontSize: 88, fontWeight: 900, color: '#f7f7f7',
                  lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                  letterSpacing: '-4px'
                }}>
                  {s.step}
                </div>
                <div style={{
                  width: 44, height: 44, background: s.bg,
                  border: `1px solid ${s.border}`, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20
                }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, background: s.accent, opacity: 0.7 }} />
                </div>
                <p style={{ color: s.accent, fontSize: 11, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 8px' }}>
                  Step {s.step}
                </p>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#000',
                  margin: '0 0 10px', letterSpacing: '-0.3px' }}>
                  {s.title}
                </h3>
                <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: '#fafafa', padding: '80px 24px', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#000',
            textAlign: 'center', margin: '0 0 48px', letterSpacing: '-1px' }}>
            Everything your wardrobe needs
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16
          }}>
            {[
              { title: 'Upload anything', desc: 'Shirts, pants, shoes, accessories — add your full closet in minutes' },
              { title: 'AI vision analysis', desc: 'Automatically detects color, style, category and occasion for every item' },
              { title: 'Smart outfits', desc: 'Complete outfit combinations based on occasion, weather and fashion style' },
              { title: 'Styled for you', desc: 'Choose casual, streetwear, formal, preppy — AI matches your aesthetic' },
            ].map((f, i) => (
              <div key={f.title} style={{
                background: '#fff', borderRadius: 16, padding: 24,
                border: '1px solid #f0f0f0'
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: '#f5f3ff', border: '1px solid #e0d9ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16
                }}>
                  <span style={{ fontSize: 14, fontWeight: 900, color: '#4f46e5' }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 style={{ color: '#000', margin: '0 0 8px',
                  fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px' }}>
                  {f.title}
                </h3>
                <p style={{ color: '#999', margin: 0, lineHeight: 1.6, fontSize: 13 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote */}
      <div style={{
        maxWidth: 700, margin: '0 auto',
        padding: '80px 24px', textAlign: 'center'
      }}>
        <p style={{
          fontSize: 28, fontWeight: 900, color: '#000',
          lineHeight: 1.4, letterSpacing: '-1px', margin: '0 0 16px'
        }}>
          "The right outfit doesn't just change how you look — it changes how you move through the world."
        </p>
        <p style={{ color: '#bbb', fontSize: 14, margin: 0, fontWeight: 500 }}>
          — DripAI
        </p>
      </div>

      {/* Bottom CTA bar */}
      <div style={{ borderTop: '1px solid #f0f0f0' }}>
        <div style={{
          maxWidth: 860, margin: '0 auto',
          padding: '32px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16
        }}>
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, color: '#000',
              margin: '0 0 4px', letterSpacing: '-0.5px' }}>
              Start building your style system
            </p>
            <p style={{ color: '#aaa', fontSize: 14, margin: 0 }}>
              No noise. No clutter. Just better decisions.
            </p>
          </div>
          <Link href="/upload" style={{
            padding: '12px 28px', background: '#000', color: '#fff',
            borderRadius: 10, textDecoration: 'none',
            fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap'
          }}>
            Get started
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center', padding: '20px',
        borderTop: '1px solid #f0f0f0',
        color: '#ddd', fontSize: 13
      }}>
        DripAI — Built with precision
      </div>
    </div>
  )
}