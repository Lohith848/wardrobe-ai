'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState('')

  async function handleGuest() {
    setLoading('guest')
    await new Promise(r => setTimeout(r, 800))
    router.push('/')
  }

  function handleSocial(provider: string) {
    setLoading(provider)
    setTimeout(() => router.push('/'), 1000)
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#fff',
      display: 'flex', fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Left panel — branding */}
      <div style={{
        flex: 1, background: '#000', display: 'flex',
        flexDirection: 'column', justifyContent: 'space-between',
        padding: '48px', display: 'flex' as any
      }} className="login-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: '#fff', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
          }}>🪞</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.5px' }}>
            Drip<span style={{ color: '#6c63ff' }}>AI</span>
          </span>
        </div>

        <div>
          <p style={{ color: '#666', fontSize: 13, marginBottom: 20, letterSpacing: 1, textTransform: 'uppercase' }}>
            What people are saying
          </p>
          <blockquote style={{ margin: 0 }}>
            <p style={{
              color: '#fff', fontSize: 20, lineHeight: 1.6,
              fontWeight: 500, margin: '0 0 20px', letterSpacing: '-0.3px'
            }}>
              "DripAI completely changed how I get dressed. It picks better outfits than I ever could myself."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: '#6c63ff', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 14
              }}>RK</div>
              <div>
                <p style={{ color: '#fff', margin: 0, fontWeight: 600, fontSize: 14 }}>Rahul Kumar</p>
                <p style={{ color: '#555', margin: 0, fontSize: 13 }}>College student, Chennai</p>
              </div>
            </div>
          </blockquote>
        </div>
      </div>

      {/* Right panel — login form */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '48px 32px'
      }}>
        <div style={{ width: '100%', maxWidth: 380 }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{
              fontSize: 28, fontWeight: 800, color: '#000',
              margin: '0 0 8px', letterSpacing: '-0.8px'
            }}>
              Welcome to DripAI
            </h1>
            <p style={{ color: '#888', margin: 0, fontSize: 15, lineHeight: 1.5 }}>
              Your AI-powered personal stylist. Sign in to start building your wardrobe.
            </p>
          </div>

          {/* Social login buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>

            {/* Google */}
            <button
              onClick={() => handleSocial('google')}
              disabled={!!loading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 12, width: '100%', padding: '13px 20px',
                background: loading === 'google' ? '#f5f5f5' : '#fff',
                border: '1px solid #e0e0e0', borderRadius: 10,
                cursor: 'pointer', fontSize: 15, fontWeight: 600,
                color: '#000', transition: 'all 0.15s'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading === 'google' ? 'Connecting...' : 'Continue with Google'}
            </button>

            {/* Apple */}
            <button
              onClick={() => handleSocial('apple')}
              disabled={!!loading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 12, width: '100%', padding: '13px 20px',
                background: loading === 'apple' ? '#111' : '#000',
                border: '1px solid #000', borderRadius: 10,
                cursor: 'pointer', fontSize: 15, fontWeight: 600,
                color: '#fff', transition: 'all 0.15s'
              }}
            >
              <svg width="16" height="18" viewBox="0 0 814 1000" fill="#fff">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 389.4 47 256 109.6 173.1c41-52.4 103.3-85.5 170.5-85.5 66.9 0 112.1 41.5 168.1 41.5 53.9 0 87.8-41.5 168.1-41.5 61.4 0 119.7 28.9 163.9 79.2zm-161.6-176.9c31.4-37.9 54.3-91 54.3-144.1 0-7.8-.7-15.7-2-23.2-51.4 2-112.3 34.3-149.2 78.2-28.5 32.4-55.1 83.5-55.1 138.4 0 8.5 1.3 17 2 19.8 3.3.6 8.5 1.3 13.8 1.3 46.1 0 102.4-30.9 136.2-70.4z"/>
              </svg>
              {loading === 'apple' ? 'Connecting...' : 'Continue with Apple'}
            </button>

            {/* Microsoft */}
            <button
              onClick={() => handleSocial('microsoft')}
              disabled={!!loading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 12, width: '100%', padding: '13px 20px',
                background: loading === 'microsoft' ? '#f0f4ff' : '#fff',
                border: '1px solid #e0e0e0', borderRadius: 10,
                cursor: 'pointer', fontSize: 15, fontWeight: 600,
                color: '#000', transition: 'all 0.15s'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
              </svg>
              {loading === 'microsoft' ? 'Connecting...' : 'Continue with Microsoft'}
            </button>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: 12, marginBottom: 20
          }}>
            <div style={{ flex: 1, height: 1, background: '#f0f0f0' }} />
            <span style={{ color: '#bbb', fontSize: 13 }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#f0f0f0' }} />
          </div>

          {/* Guest login */}
          <button
            onClick={handleGuest}
            disabled={!!loading}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, width: '100%', padding: '13px 20px',
              background: loading === 'guest' ? '#f5f3ff' : '#f5f3ff',
              border: '1px solid #e0d9ff', borderRadius: 10,
              cursor: 'pointer', fontSize: 15, fontWeight: 600,
              color: '#6c63ff', transition: 'all 0.15s'
            }}
          >
            <span style={{ fontSize: 16 }}>👤</span>
            {loading === 'guest' ? 'Entering...' : 'Continue as Guest'}
          </button>

          <p style={{ color: '#bbb', fontSize: 12, textAlign: 'center', marginTop: 20, lineHeight: 1.6 }}>
            By continuing, you agree to our{' '}
            <span style={{ color: '#6c63ff', cursor: 'pointer' }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: '#6c63ff', cursor: 'pointer' }}>Privacy Policy</span>
          </p>

          {/* Features preview */}
          <div style={{
            marginTop: 32, padding: 20,
            background: '#fafafa', borderRadius: 12,
            border: '1px solid #f0f0f0'
          }}>
            <p style={{ color: '#aaa', fontSize: 11, fontWeight: 700,
              letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 12px' }}>
              What you get
            </p>
            {[
              'Upload your entire wardrobe',
              'AI analyzes every clothing item',
              'Daily outfit suggestions',
              'Styled for your occasion & weather',
            ].map(f => (
              <div key={f} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginBottom: 8, fontSize: 13, color: '#555'
              }}>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left { display: none !important; }
        }
      `}</style>
    </div>
  )
}