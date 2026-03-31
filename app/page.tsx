'use client'
import Link from 'next/link'
import Navbar from './components/Navbar'

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        color: '#111827',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <Navbar />

      {/* Hero */}
      <section
        className="home-hero"
        style={{
          maxWidth: 880,
          margin: '0 auto',
          padding: '64px 16px 28px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: '#e5e7eb',
            borderRadius: 999,
            color: '#4b5563',
            fontSize: 12,
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          Simple AI wardrobe, no clutter
        </div>

        <h1
          className="home-hero-title"
          style={{
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            margin: '0 0 16px',
          }}
        >
          See all your outfits
          <br />
          in one clear place.
        </h1>

        <p
          style={{
            fontSize: 15,
            color: '#6b7280',
            maxWidth: 520,
            margin: '0 auto 24px',
            lineHeight: 1.6,
          }}
        >
          Upload your clothes once. WardrobeAI keeps them organised and suggests complete outfits for any
          day, on desktop or mobile.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/upload"
            style={{
              padding: '11px 22px',
              background: '#111827',
              color: '#ffffff',
              borderRadius: 999,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Build my wardrobe
          </Link>
          <Link
            href="/outfit"
            style={{
              padding: '11px 22px',
              background: '#ffffff',
              color: '#111827',
              borderRadius: 999,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              border: '1px solid #e5e7eb',
            }}
          >
            Generate outfit
          </Link>
        </div>
      </section>

      {/* Premium first-impression panel */}
      <section style={{ maxWidth: 980, margin: '0 auto', padding: '0 16px 44px' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 16,
            padding: 20,
            boxShadow: '0 10px 30px rgba(17,24,39,0.06)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
              gap: 16,
              alignItems: 'stretch',
            }}
            className="home-panel-grid"
          >
            <div style={{ padding: 6 }}>
              <p
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  color: '#9ca3af',
                  margin: '0 0 8px',
                }}
              >
                How it works
              </p>
              <p style={{ fontSize: 18, fontWeight: 600, margin: '0 0 10px' }}>
                A wardrobe that stays organised.
              </p>
              <p style={{ color: '#6b7280', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                Upload items, get automatic tags, and generate complete outfits built from what you actually own.
              </p>

              <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Link
                  href="/wardrobe"
                  style={{
                    padding: '9px 16px',
                    background: '#111827',
                    color: '#ffffff',
                    borderRadius: 999,
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  View wardrobe
                </Link>
                <Link
                  href="/saved"
                  style={{
                    padding: '9px 16px',
                    background: '#ffffff',
                    color: '#111827',
                    borderRadius: 999,
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 500,
                    border: '1px solid #e5e7eb',
                  }}
                >
                  Saved outfits
                </Link>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 10,
              }}
              className="home-steps-grid"
            >
              {[
                { k: '01', title: 'Upload items', desc: 'Add tops, bottoms, shoes and more.' },
                { k: '02', title: 'Auto tags', desc: 'Get clean categories and color tags.' },
                { k: '03', title: 'Generate outfits', desc: 'Complete looks for your day.' },
              ].map(step => (
                <div
                  key={step.k}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 14,
                    padding: 14,
                    background: '#ffffff',
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 8px',
                      fontSize: 12,
                      color: '#9ca3af',
                      fontWeight: 600,
                      letterSpacing: 0.6,
                    }}
                  >
                    {step.k}
                  </p>
                  <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 600 }}>
                    {step.title}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: '1px solid #e5e7eb',
          padding: '16px 16px 20px',
          fontSize: 12,
          color: '#9ca3af',
          textAlign: 'center',
        }}
      >
        WardrobeAI · Keep your outfits simple and organised
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .home-hero {
            padding-top: 40px;
          }
          .home-hero-title {
            font-size: 26px !important;
            line-height: 1.2;
          }
          .home-panel-grid {
            grid-template-columns: 1fr !important;
          }
          .home-steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}