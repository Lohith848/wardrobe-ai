'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="ambient-glow" />
      <div className="ambient-glow-2" />

      {/* Navbar */}
      <nav className="glass-panel" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 32px', position: 'sticky', top: 0, zIndex: 100, borderTop: 'none', borderLeft: 'none', borderRight: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 10 }}>
          <div style={{
            width: 36, height: 36, background: 'linear-gradient(135deg, #a78bfa, #ec4899)', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.5px' }}>
            Drip<span className="text-gradient">AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', position: 'relative', zIndex: 10 }}>
          <Link href="/wardrobe" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#a1a1aa'}>
            Wardrobe
          </Link>
          <Link href="/upload" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#a1a1aa'}>
            Upload
          </Link>
          <Link href="/outfit" className="glow-btn" style={{
            padding: '10px 22px', borderRadius: 12, textDecoration: 'none', fontSize: 14, fontWeight: 700
          }}>
            Get Outfit
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: 900, margin: '0 auto',
        padding: '120px 24px 100px', textAlign: 'center', position: 'relative', zIndex: 10
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px',
          background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.2)',
          borderRadius: 30, color: '#c4b5fd',
          fontSize: 13, fontWeight: 600, marginBottom: 32, backdropFilter: 'blur(10px)'
        }}>
          <span style={{width: 8, height: 8, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 10px #a78bfa'}} />
          AI-Powered Personal Stylist
        </div>

        <h1 style={{
          fontSize: 72, fontWeight: 900, letterSpacing: '-3px',
          lineHeight: 1.1, margin: '0 0 28px', color: '#fff'
        }}>
          Dress with clarity.
          <br />
          <span className="text-gradient">Not confusion.</span>
        </h1>

        <p style={{
          fontSize: 19, color: '#a1a1aa', maxWidth: 540,
          margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 400
        }}>
          Upload your wardrobe, let AI analyze every item and get
          prefect outfit combinations for any occasion — every single day.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/upload" className="glow-btn" style={{
            padding: '16px 36px', borderRadius: 14, textDecoration: 'none',
            fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px'
          }}>
            Build my wardrobe
          </Link>
          <Link href="/outfit" style={{
            padding: '16px 36px', background: 'rgba(255,255,255,0.05)', color: '#fff',
            borderRadius: 14, textDecoration: 'none', fontSize: 16, backdropFilter: 'blur(10px)',
            fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s'
          }} onMouseEnter={e => {e.currentTarget.style.background='rgba(255,255,255,0.1)'}} 
             onMouseLeave={e => {e.currentTarget.style.background='rgba(255,255,255,0.05)'}}>
            Generate outfit
          </Link>
        </div>
      </section>

      {/* Stats */}
      <div style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(10,10,12,0.5)', backdropFilter: 'blur(10px)' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '40px 24px'
        }}>
          {[
            { number: '100%', label: 'Free forever' },
            { number: 'AI', label: 'Vision analysis' },
            { number: 'Unlimited', label: 'Outfit combos' },
            { number: '< 1 min', label: 'Setup time' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
                {stat.number}
              </p>
              <p style={{ fontSize: 14, color: '#a1a1aa', margin: 0, fontWeight: 500 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '100px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ color: '#a78bfa', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center', margin: '0 0 16px' }}>
            How it works
          </p>
          <h2 style={{ fontSize: 44, fontWeight: 900, color: '#fff', textAlign: 'center', margin: '0 0 64px', letterSpacing: '-1.5px' }}>
            Three steps to looking great
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              {
                step: '01', title: 'Upload your wardrobe',
                desc: 'Capture and organize everything you own in seconds. Drag and drop your photos.',
                accent: '#a78bfa', bg: 'rgba(167, 139, 250, 0.1)', border: 'rgba(167, 139, 250, 0.2)'
              },
              {
                step: '02', title: 'AI understands your style',
                desc: 'Each item is analyzed for color, category, occasion and style automatically.',
                accent: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.2)'
              },
              {
                step: '03', title: 'Get refined outfits',
                desc: 'Receive complete outfit combinations that work for your occasion and weather.',
                accent: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.2)'
              },
            ].map(s => (
              <div key={s.step} className="glass-panel hover-lift" style={{
                borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: -10, right: 10,
                  fontSize: 100, fontWeight: 900, color: 'rgba(255,255,255,0.03)',
                  lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-5px'
                }}>
                  {s.step}
                </div>
                <div style={{
                  width: 52, height: 52, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: s.accent, boxShadow: `0 0 15px ${s.accent}` }} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.3px' }}>
                  {s.title}
                </h3>
                <p style={{ color: '#a1a1aa', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.5)', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
              Start building your style system
            </p>
            <p style={{ color: '#a1a1aa', fontSize: 15, margin: 0 }}>
              No noise. No clutter. Just better decisions.
            </p>
          </div>
          <Link href="/upload" className="glow-btn" style={{
            padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap'
          }}>
            Get started
          </Link>
        </div>
        <div style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#52525b', fontSize: 14, fontWeight: 500 }}>
          DripAI — Built with precision
        </div>
      </div>
    </div>
  )
}