'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#fff' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 32px', borderBottom: '1px solid #f0f0f0',
        background: '#fff', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: '#000', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
          }}>🪞</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#000', letterSpacing: '-0.5px' }}>
            Drip<span style={{ color: '#6c63ff' }}>AI</span>
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
            Get Outfit ✨
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '90px 20px 60px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', background: '#f5f3ff',
          border: '1px solid #e0d9ff', borderRadius: 20,
          color: '#6c63ff', fontSize: 13, fontWeight: 600, marginBottom: 28
        }}>
          <span style={{ fontSize: 14 }}>✨</span> AI-Powered Personal Stylist
        </div>

        <h1 style={{
          fontSize: 60, fontWeight: 900, color: '#000',
          margin: '0 0 20px', lineHeight: 1.05, letterSpacing: '-2px'
        }}>
          Your wardrobe.<br />
          <span style={{ color: '#6c63ff' }}>Reinvented.</span>
        </h1>

        <p style={{
          color: '#666', fontSize: 18, lineHeight: 1.7,
          margin: '0 0 40px', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto'
        }}>
          Upload your clothes, let AI analyze every item, and get
          perfect outfit combinations for any occasion — every day.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/upload" style={{
            padding: '15px 32px', background: '#000', color: '#fff',
            borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.3px'
          }}>
            Build my wardrobe →
          </Link>
          <Link href="/outfit" style={{
            padding: '15px 32px', background: '#f5f3ff', color: '#6c63ff',
            borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 600,
            border: '1px solid #e0d9ff'
          }}>
            Generate outfit ✨
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 48,
        padding: '32px 20px', borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0', background: '#fafafa'
      }}>
        {[
          { number: '100%', label: 'Free forever' },
          { number: 'AI', label: 'Vision analysis' },
          { number: '∞', label: 'Outfit combos' },
          { number: '0s', label: 'Setup required' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 24, fontWeight: 900, color: '#000', margin: '0 0 2px', letterSpacing: '-1px' }}>
              {stat.number}
            </p>
            <p style={{ fontSize: 13, color: '#aaa', margin: 0 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 20px' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: '#000',
          textAlign: 'center', margin: '0 0 48px', letterSpacing: '-1px' }}>
          Everything your wardrobe needs
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { icon: '📸', title: 'Upload anything', desc: 'Shirts, pants, shoes, accessories — add your full closet in minutes with AI tagging' },
            { icon: '🤖', title: 'AI vision analysis', desc: 'Automatically detects color, style, category and occasion for every item' },
            { icon: '✨', title: 'Smart outfits', desc: 'Complete outfit combinations based on occasion, weather and your fashion style' },
            { icon: '🎯', title: 'Styled for you', desc: 'Choose casual, streetwear, formal, preppy — AI matches your preferred aesthetic' },
          ].map(f => (
            <div key={f.title} style={{
              background: '#fff', borderRadius: 16, padding: 24,
              border: '1px solid #f0f0f0', transition: 'border-color 0.2s'
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ color: '#000', margin: '0 0 8px', fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px' }}>
                {f.title}
              </h3>
              <p style={{ color: '#888', margin: 0, lineHeight: 1.6, fontSize: 14 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        maxWidth: 600, margin: '0 auto 80px',
        background: '#000', borderRadius: 20,
        padding: '48px 40px', textAlign: 'center'
      }}>
        <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, margin: '0 0 10px', letterSpacing: '-0.5px' }}>
          Start dressing better today
        </h2>
        <p style={{ color: '#888', margin: '0 0 28px', fontSize: 15 }}>
          Add your first item and let AI do the rest
        </p>
        <Link href="/upload" style={{
          padding: '14px 32px', background: '#6c63ff',
          color: '#fff', borderRadius: 10, textDecoration: 'none',
          fontSize: 16, fontWeight: 700
        }}>
          Upload first item →
        </Link>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center', padding: '24px',
        borderTop: '1px solid #f0f0f0', color: '#ccc', fontSize: 13
      }}>
        DripAI — Built with Next.js + Groq + Supabase
      </div>
    </div>
  )
}