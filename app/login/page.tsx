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
      options: { redirectTo: `${window.location.origin}/` },
    })
    if (error) {
      setError(error.message)
      setLoading('')
    }
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
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#ffffff',
          borderRadius: 16,
          border: '1px solid #e5e7eb',
          padding: '24px 20px 20px',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              background: '#f9fafb',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" />
            </svg>
          </div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#111827',
              margin: '0 0 4px',
            }}
          >
            Sign in to WardrobeAI
          </h1>
          <p
            style={{
              color: '#6b7280',
              fontSize: 13,
              margin: 0,
            }}
          >
            Access your saved wardrobe and outfits.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 8,
              padding: '8px 10px',
              color: '#b91c1c',
              fontSize: 12,
              marginBottom: 14,
            }}
          >
            {error}
          </div>
        )}

        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#111827',
            margin: '0 0 10px',
          }}
        >
          Choose how you want to continue
        </p>
        <p
          style={{
            color: '#6b7280',
            fontSize: 12,
            margin: '0 0 16px',
          }}
        >
          Use Google for a full account, or continue as a guest to try the app quickly.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={!!loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              padding: '10px 14px',
              background: '#111827',
              border: '1px solid #111827',
              borderRadius: 999,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
            }}
          >
            {loading === 'google' ? (
              <span>Redirecting…</span>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
            <span style={{ color: '#9ca3af', fontSize: 11 }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          </div>

          {/* Guest */}
          <button
            onClick={handleGuest}
            disabled={!!loading}
            style={{
              width: '100%',
              padding: '10px 14px',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: 999,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: '#111827',
            }}
          >
            {loading === 'guest' ? 'Setting up…' : 'Continue as guest'}
          </button>
        </div>

        <p
          style={{
            color: '#9ca3af',
            fontSize: 11,
            textAlign: 'center',
            marginTop: 16,
          }}
        >
          By continuing you agree to our{' '}
          <span style={{ color: '#4f46e5' }}>Terms</span> and{' '}
          <span style={{ color: '#4f46e5' }}>Privacy Policy</span>.
        </p>
      </div>
    </div>
  )
}