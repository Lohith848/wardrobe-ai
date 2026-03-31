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
          padding: '64px 16px 40px',
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

      {/* Supporting section */}
      <section
        style={{
          maxWidth: 880,
          margin: '0 auto',
          padding: '24px 16px 40px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
          gap: 24,
        }}
      >
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              color: '#9ca3af',
              margin: '0 0 6px',
            }}
          >
            How it works
          </p>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              margin: 0,
            }}
          >
            Upload items, let AI tag them, and get outfits built from your real wardrobe.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {[
            { title: 'Upload clothes', desc: 'Add tops, bottoms, shoes and more in a few photos.' },
            { title: 'Automatic tags', desc: 'Colors and basic style tags are detected for you.' },
            { title: 'Clear wardrobe', desc: 'Browse everything in a simple grid instead of your gallery.' },
            { title: 'Complete looks', desc: 'Ask for an outfit and get a full combination, not just one item.' },
          ].map(card => (
            <div
              key={card.title}
              style={{
                padding: 12,
                borderRadius: 10,
                background: '#ffffff',
                border: '1px solid #e5e7eb',
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  margin: '0 0 4px',
                }}
              >
                {card.title}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: '#6b7280',
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
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
        }
      `}</style>
    </div>
  )
}