'use client'
import Link from 'next/link'
import Navbar from './components/Navbar'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 14px', background: '#f5f3ff',
          border: '1px solid #e0d9ff', borderRadius: 20,
          color: '#6c63ff', fontSize: 13, fontWeight: 600, marginBottom: 24
        }}>
          ✨ AI-Powered Personal Stylist
        </div>

        <h1 style={{
          fontSize: 64, fontWeight: 900, color: '#000',
          margin: '0 0 20px', lineHeight: 1, letterSpacing: '-3px'
        }}>
          Your wardrobe.<br />
          <span style={{ color: '#6c63ff' }}>Reinvented.</span>
        </h1>

        <p style={{
          color: '#777', fontSize: 18, lineHeight: 1.7,
          margin: '0 0 40px', maxWidth: 480,
          marginLeft: 'auto', marginRight: 'auto'
        }}>
          Upload your clothes, get AI-powered outfit suggestions tailored to your style, occasion and weather — every single day.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/login" style={{
            padding: '14px 32px', background: '#000', color: '#fff',
            borderRadius: 10, textDecoration: 'none', fontSize: 16,
            fontWeight: 700, letterSpacing: '-0.3px'
          }}>
            Get started free →
          </Link>
          <Link href="/outfit" style={{
            padding: '14px 32px', background: '#f5f3ff', color: '#6c63ff',
            borderRadius: 10, textDecoration: 'none', fontSize: 16,
            fontWeight: 600, border: '1px solid #e0d9ff'
          }}>
            See it in action ✨
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        borderTop: '1px solid #f5f5f5', borderBottom: '1px solid #f5f5f5',
        background: '#fafafa'
      }}>
        <div style={{
          maxWidth: 800, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '28px 24px'
        }}>
          {[
            { n: '100%', l: 'Free forever' },
            { n: 'AI', l: 'Vision analysis' },
            { n: '∞', l: 'Outfit combos' },
            { n: '< 1min', l: 'Setup time' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#000',
                margin: '0 0 2px', letterSpacing: '-1px' }}>{s.n}</p>
              <p style={{ fontSize: 12, color: '#aaa', margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '72px 24px' }}>
        <p style={{ color: '#aaa', fontSize: 12, fontWeight: 700, letterSpacing: 2,
          textTransform: 'uppercase', textAlign: 'center', margin: '0 0 12px' }}>
          How it works
        </p>
        <h2 style={{ fontSize: 36, fontWeight: 900, color: '#000', textAlign: 'center',
          margin: '0 0 48px', letterSpacing: '-1.5px' }}>
          Three steps to dress better
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { step: '01', icon: '📸', title: 'Upload your closet', desc: 'Take photos of your shirts, pants, shoes, jackets — anything you own' },
            { step: '02', icon: '🤖', title: 'AI analyzes everything', desc: 'Our vision AI tags color, style, category and occasion for every item' },
            { step: '03', icon: '✨', title: 'Get daily outfits', desc: 'Pick occasion + weather + style and AI builds the perfect complete look' },
          ].map(s => (
            <div key={s.step} style={{ padding: 24, borderRadius: 16, border: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#bbb', letterSpacing: 1 }}>
                  {s.step}
                </span>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#000',
                margin: '0 0 8px', letterSpacing: '-0.3px' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#888', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 600, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{
          background: '#000', borderRadius: 20,
          padding: '52px 40px', textAlign: 'center'
        }}>
          <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 900,
            margin: '0 0 10px', letterSpacing: '-1px' }}>
            Start dressing better
          </h2>
          <p style={{ color: '#666', margin: '0 0 28px', fontSize: 15 }}>
            Free forever. No credit card. Just better outfits.
          </p>
          <Link href="/login" style={{
            display: 'inline-block', padding: '14px 32px',
            background: '#6c63ff', color: '#fff',
            borderRadius: 10, textDecoration: 'none',
            fontSize: 16, fontWeight: 700
          }}>
            Create free account →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #f0f0f0', padding: '24px',
        textAlign: 'center', color: '#ccc', fontSize: 13
      }}>
        DripAI · Built with Next.js, Groq AI & Supabase
      </div>
    </div>
  )
}