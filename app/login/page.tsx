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
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })
    if (error) setError(error.message)
    setLoading('')
  }

  async function handleGuest() {
    setLoading('guest')
    setError('')
    const { error } = await supabase.auth.signInAnonymously()
    if (error) {
      setError(error.message)
      setLoading('')
      return
    }
    window.location.href = '/'
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#fff',
      display: 'flex', fontFamily: 'system-ui, sans-serif'
    }}>

      {/* Left panel */}
      <div style={{
  flex: 1, background: '#000',
  display: 'flex', flexDirection: 'column',
  justifyContent: 'center', gap: '48px', padding: '48px'
}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: '#fff', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
          }}>💧</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.5px' }}>
            Drip<span style={{ color: '#6c63ff' }}>AI</span>
          </span>
        </div>

        <div>
          <p style={{ color: '#555', fontSize: 12, marginBottom: 20,
            letterSpacing: 1.5, textTransform: 'uppercase' }}>
            What people are saying
          </p>
          <p style={{
            color: '#fff', fontSize: 26, lineHeight: 1.5,
            fontWeight: 800, margin: '0 0 20px', letterSpacing: '-0.5px'
          }}>
            "DripAI completely changed how I get dressed. It picks better outfits than I ever could."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: '#6c63ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 14
            }}>DK</div>
            <div>
              <p style={{ color: '#fff', margin: 0, fontWeight: 600, fontSize: 14 }}>Dulquer</p>
              <p style={{ color: '#555', margin: 0, fontSize: 13 }}>College student</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '48px 32px'
      }}>
        <div style={{ width: '100%', maxWidth: 380 }}>

          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#000',
              margin: '0 0 8px', letterSpacing: '-0.8px' }}>
              Welcome to DripAI
            </h1>
            <p style={{ color: '#888', margin: 0, fontSize: 15, lineHeight: 1.5 }}>
              Your AI-powered personal stylist
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              background: '#fff0f0', border: '1px solid #ffd0d0',
              borderRadius: 10, padding: '12px 16px',
              color: '#e53e3e', fontSize: 14, marginBottom: 16
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>

            {/* Google — REAL */}
            <button
              onClick={handleGoogle}
              disabled={!!loading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 12, width: '100%', padding: '13px 20px',
                background: loading === 'google' ? '#f5f5f5' : '#fff',
                border: '1px solid #e0e0e0', borderRadius: 10,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 15, fontWeight: 600, color: '#000'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading === 'google' ? 'Redirecting to Google...' : 'Continue with Google'}
            </button>

            {/* Guest — REAL anonymous auth */}
            <button
              onClick={handleGuest}
              disabled={!!loading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, width: '100%', padding: '13px 20px',
                background: '#f5f3ff', border: '1px solid #e0d9ff',
                borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 15, fontWeight: 600, color: '#6c63ff'
              }}
            >
              {loading === 'guest' ? 'Setting up...' : 'Continue as Guest →'}
            </button>
          </div>

          <p style={{ color: '#bbb', fontSize: 12, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
            By continuing you agree to our{' '}
            <span style={{ color: '#6c63ff', cursor: 'pointer' }}>Terms</span> and{' '}
            <span style={{ color: '#6c63ff', cursor: 'pointer' }}>Privacy Policy</span>
          </p>

          <div style={{
            marginTop: 28, padding: 18, background: '#fafafa',
            borderRadius: 12, border: '1px solid #f0f0f0'
          }}>
            <p style={{ color: '#aaa', fontSize: 11, fontWeight: 700,
              letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 12px' }}>
              What you get
            </p>
            {[
              '📸 Upload your entire wardrobe',
              '🤖 AI analyzes every clothing item',
              '✨ Daily outfit suggestions',
              '🎯 Styled for your occasion and weather',
            ].map(f => (
              <p key={f} style={{ fontSize: 13, color: '#555', margin: '0 0 8px' }}>{f}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}