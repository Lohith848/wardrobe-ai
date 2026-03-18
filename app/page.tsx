'use client'
import Link from 'next/link'
import Navbar from './components/Navbar'

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#111'
    }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '100px 24px 80px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 58,
          fontWeight: 800,
          letterSpacing: '-2px',
          lineHeight: 1.1,
          marginBottom: 20
        }}>
          Dress with clarity.
          <br />
          <span style={{ color: '#4f46e5' }}>
            Not confusion.
          </span>
        </h1>

        <p style={{
          fontSize: 18,
          color: '#666',
          maxWidth: 520,
          margin: '0 auto 30px',
          lineHeight: 1.7
        }}>
          “Style is not about having more clothes.  
          It’s about knowing what works.”
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
          <Link href="/login" style={{
            padding: '14px 28px',
            background: '#111',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Get Started
          </Link>

          <Link href="/outfit" style={{
            padding: '14px 28px',
            border: '1px solid #e5e5e5',
            borderRadius: 8,
            textDecoration: 'none',
            color: '#111',
            fontWeight: 500
          }}>
            View Demo
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div style={{
        height: 1,
        background: '#f0f0f0',
        maxWidth: 900,
        margin: '0 auto'
      }} />

      {/* How it works */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '80px 24px'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 50
        }}>
          How it works
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 30
        }}>
          {[
            {
              title: 'Upload your wardrobe',
              desc: 'Capture and organize everything you own in seconds.'
            },
            {
              title: 'AI understands your style',
              desc: 'Each item is analyzed for color, category and occasion.'
            },
            {
              title: 'Get refined outfits',
              desc: 'Receive combinations that actually work in real life.'
            }
          ].map((item, i) => (
            <div key={i}>
              <p style={{
                fontSize: 13,
                color: '#999',
                marginBottom: 6
              }}>
                0{i + 1}
              </p>

              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 6
              }}>
                {item.title}
              </h3>

              <p style={{
                fontSize: 14,
                color: '#666',
                lineHeight: 1.6
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '60px 24px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: 20,
          fontWeight: 500,
          lineHeight: 1.6,
          color: '#222'
        }}>
          “The right outfit doesn’t just change how you look —  
          it changes how you move through the world.”
        </p>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: 700,
        margin: '0 auto 100px',
        padding: '0 24px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 26,
          fontWeight: 700,
          marginBottom: 10
        }}>
          Start building your style system
        </h2>

        <p style={{
          color: '#777',
          marginBottom: 25
        }}>
          No noise. No clutter. Just better decisions.
        </p>

        <Link href="/login" style={{
          padding: '14px 30px',
          background: '#4f46e5',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600
        }}>
          Create Account
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #f0f0f0',
        padding: '20px',
        textAlign: 'center',
        fontSize: 13,
        color: '#aaa'
      }}>
        DripAI — Built with precision
      </footer>
    </div>
  )
}