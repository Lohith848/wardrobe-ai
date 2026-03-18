'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')

  async function handleGoogle() {
    setLoading('google')
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` }
    })
    if (error) { setError(error.message); setLoading('') }
  }

  async function handleGuest() {
    setLoading('guest')
    setError('')
    const { error } = await supabase.auth.signInAnonymously()
    if (error) { setError(error.message); setLoading(''); return }
    window.location.href = '/'
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#fff',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px'
    }}>

      {/* Logo */}
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <div style={{
          width: 56, height: 56, background: '#000', borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
          </svg>
        </div>
        <h1 style={{
          fontSize: 32, fontWeight: 900, color: '#000',
          margin: '0 0 8px', letterSpacing: '-1px'
        }}>
          Drip<span style={{ color: '#4f46e5' }}>AI</span>
        </h1>
        <p style={{ color: '#888', fontSize: 15, margin: 0, lineHeight: 1.5 }}>
          Your AI-powered personal stylist
        </p>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 400,
        background: '#fff', borderRadius: 20,
        border: '1px solid #f0f0f0', padding: '32px 24px'
      }}>
        <h2 style={{
          fontSize: 20, fontWeight: 800, color: '#000',
          margin: '0 0 6px', letterSpacing: '-0.5px', textAlign: 'center'
        }}>
          Welcome back
        </h2>
        <p style={{
          color: '#aaa', fontSize: 14, margin: '0 0 24px',
          textAlign: 'center', lineHeight: 1.5
        }}>
          Sign in to access your wardrobe
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fff0f0', border: '1px solid #ffd0d0',
            borderRadius: 10, padding: '12px 16px',
            color: '#e53e3e', fontSize: 14, marginBottom: 16,
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={!!loading}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 12, width: '100%', padding: '14px 20px',
              background: loading === 'google' ? '#f9f9f9' : '#fff',
              border: '1.5px solid #e0e0e0', borderRadius: 12,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 15, fontWeight: 600, color: '#000'
            }}
          >
            {loading === 'google' ? (
              <span>Redirecting...</span>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: '#f0f0f0' }} />
            <span style={{ color: '#ccc', fontSize: 13 }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#f0f0f0' }} />
          </div>

          {/* Guest */}
          <button
            onClick={handleGuest}
            disabled={!!loading}
            style={{
              width: '100%', padding: '14px 20px',
              background: loading === 'guest' ? '#f5f3ff' : '#f5f3ff',
              border: '1.5px solid #e0d9ff', borderRadius: 12,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 15, fontWeight: 600, color: '#4f46e5'
            }}
          >
            {loading === 'guest' ? 'Setting up...' : 'Continue as Guest'}
          </button>
        </div>

        <p style={{
          color: '#ccc', fontSize: 12, textAlign: 'center',
          marginTop: 20, lineHeight: 1.6
        }}>
          By continuing you agree to our{' '}
          <span style={{ color: '#4f46e5', cursor: 'pointer' }}>Terms</span>
          {' '}and{' '}
          <span style={{ color: '#4f46e5', cursor: 'pointer' }}>Privacy Policy</span>
        </p>
      </div>

      {/* Features */}
      <div style={{
        width: '100%', maxWidth: 400,
        marginTop: 16, padding: '20px 24px',
        background: '#fafafa', borderRadius: 16,
        border: '1px solid #f0f0f0'
      }}>
        <p style={{
          color: '#aaa', fontSize: 11, fontWeight: 700,
          letterSpacing: 1.5, textTransform: 'uppercase',
          margin: '0 0 14px', textAlign: 'center'
        }}>
          What you get
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { title: 'Upload wardrobe', desc: 'Add all your clothes' },
            { title: 'AI analysis', desc: 'Auto color and style tags' },
            { title: 'Daily outfits', desc: 'Complete looks every day' },
            { title: 'Any occasion', desc: 'Office, college, party' },
          ].map(f => (
            <div key={f.title} style={{
              background: '#fff', borderRadius: 10, padding: '12px',
              border: '1px solid #f0f0f0'
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#000', margin: '0 0 2px' }}>
                {f.title}
              </p>
              <p style={{ fontSize: 12, color: '#aaa', margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <p style={{
        maxWidth: 340, textAlign: 'center',
        color: '#ccc', fontSize: 13, lineHeight: 1.6,
        margin: '24px 0 0', fontStyle: 'italic'
      }}>
        "Style is not about having more clothes. It's about knowing what works."
      </p>
    </div>
  )
}