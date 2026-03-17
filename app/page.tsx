'use client'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#0a0a0a' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', padding: '20px 40px',
        borderBottom: '1px solid #1a1a1a', background: '#0a0a0a',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>👗</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>WardrobeAI</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/wardrobe" style={{
            color: '#888', textDecoration: 'none', fontSize: 14,
            padding: '8px 16px', borderRadius: 8,
            transition: 'color 0.2s'
          }}>
            My Wardrobe
          </Link>
          <Link href="/upload" style={{
            color: '#888', textDecoration: 'none', fontSize: 14,
            padding: '8px 16px', borderRadius: 8
          }}>
            Upload
          </Link>
          <Link href="/outfit" style={{
            padding: '8px 20px', background: '#6c63ff',
            color: '#fff', borderRadius: 8,
            textDecoration: 'none', fontSize: 14, fontWeight: 600
          }}>
            Generate Outfit
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        textAlign: 'center', padding: '100px 20px 60px',
        maxWidth: 700, margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-block', padding: '6px 16px',
          background: '#1a1a2e', border: '1px solid #6c63ff44',
          borderRadius: 20, color: '#c4b5fd', fontSize: 13,
          marginBottom: 24
        }}>
          ✨ AI-Powered Personal Stylist
        </div>

        <h1 style={{
          fontSize: 56, fontWeight: 800, color: '#fff',
          margin: '0 0 20px', lineHeight: 1.1
        }}>
          Your wardrobe,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #6c63ff, #00b894)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            reinvented
          </span>
        </h1>

        <p style={{
          color: '#888', fontSize: 18, lineHeight: 1.7,
          margin: '0 0 40px'
        }}>
          Upload your clothes, let AI analyze them, and get perfect outfit suggestions
          tailored to your style, occasion, and weather every day.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/upload" style={{
            padding: '16px 36px', background: '#6c63ff',
            color: '#fff', borderRadius: 12, textDecoration: 'none',
            fontSize: 16, fontWeight: 700
          }}>
            Start Building Wardrobe →
          </Link>
          <Link href="/outfit" style={{
            padding: '16px 36px', background: '#1a1a1a',
            color: '#fff', borderRadius: 12, textDecoration: 'none',
            fontSize: 16, fontWeight: 600, border: '1px solid #333'
          }}>
            Generate Outfit ✨
          </Link>
        </div>
      </div>

      {/* Features */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20, maxWidth: 900, margin: '0 auto', padding: '40px 20px 80px'
      }}>
        {[
          { icon: '📸', title: 'Upload Anything', desc: 'Shirts, pants, shoes, accessories — add your entire closet in minutes' },
          { icon: '🤖', title: 'AI Analysis', desc: 'Local AI analyzes color, style and occasion for every item automatically' },
          { icon: '✨', title: 'Outfit Generator', desc: 'Get complete outfit suggestions based on occasion, weather and fashion style' },
          { icon: '🎨', title: 'Your Style', desc: 'Choose from casual, streetwear, formal, preppy and more fashion styles' },
        ].map((f) => (
          <div key={f.title} style={{
            background: '#111', borderRadius: 16,
            padding: 24, border: '1px solid #1e1e1e'
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
            <h3 style={{ color: '#fff', margin: '0 0 8px', fontSize: 17, fontWeight: 600 }}>
              {f.title}
            </h3>
            <p style={{ color: '#666', margin: 0, lineHeight: 1.6, fontSize: 14 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div style={{
        maxWidth: 700, margin: '0 auto 80px',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        borderRadius: 20, padding: '48px 40px',
        textAlign: 'center', border: '1px solid #6c63ff33'
      }}>
        <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 700, margin: '0 0 12px' }}>
          Ready to dress better every day?
        </h2>
        <p style={{ color: '#888', margin: '0 0 28px', fontSize: 16 }}>
          Add your first clothing item and let AI do the rest
        </p>
        <Link href="/upload" style={{
          padding: '14px 32px', background: '#6c63ff',
          color: '#fff', borderRadius: 10, textDecoration: 'none',
          fontSize: 16, fontWeight: 700
        }}>
          Upload First Item →
        </Link>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center', padding: '24px',
        borderTop: '1px solid #1a1a1a', color: '#444', fontSize: 13
      }}>
        WardrobeAI — Built with Next.js + Ollama + Supabase
      </div>
    </div>
  )
}