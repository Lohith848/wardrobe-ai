'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

const Logo = () => (
  <Link
    href="/"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      textDecoration: 'none',
    }}
  >
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        border: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        flexShrink: 0,
      }}
    >
      <svg
        width="16"
        height="16"
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
    <span
      style={{
        fontWeight: 700,
        fontSize: 17,
        color: '#111827',
        letterSpacing: '-0.3px',
      }}
    >
      Wardrobe<span style={{ color: '#4f46e5' }}>AI</span>
    </span>
  </Link>
)

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const isActive = (href: string) => pathname === href

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/wardrobe', label: 'Wardrobe' },
    { href: '/upload', label: 'Upload' },
    { href: '/outfit', label: 'Generate outfit' },
    { href: '/saved', label: 'Saved outfits' },
  ]

  return (
    <>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          borderBottom: '1px solid #e5e7eb',
          background: '#ffffff',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Logo />

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: isActive(link.href) ? '#111827' : '#6b7280',
                textDecoration: 'none',
                fontSize: 14,
                padding: '8px 12px',
                borderRadius: 999,
                fontWeight: isActive(link.href) ? 600 : 400,
                backgroundColor: isActive(link.href) ? '#e5e7eb' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '999px',
                  background: '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#374151',
                  fontSize: 13,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {user.email?.charAt(0).toUpperCase() || 'G'}
              </div>
              <button
                onClick={handleSignOut}
                style={{
                  padding: '7px 12px',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#374151',
                }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              style={{
                padding: '8px 16px',
                background: '#111827',
                color: '#ffffff',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
                marginLeft: 8,
              }}
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 6,
            display: 'none',
          }}
        >
          <div style={{ width: 20, height: 2, background: '#111827', marginBottom: 4, borderRadius: 2 }} />
          <div style={{ width: 20, height: 2, background: '#111827', marginBottom: 4, borderRadius: 2 }} />
          <div style={{ width: 20, height: 2, background: '#111827', borderRadius: 2 }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '10px 20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
          className="mobile-menu"
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: isActive(link.href) ? '#111827' : '#6b7280',
                textDecoration: 'none',
                fontSize: 15,
                padding: '10px 0',
                fontWeight: isActive(link.href) ? 600 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleSignOut}
              style={{
                marginTop: 8,
                padding: '10px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                color: '#b91c1c',
                textAlign: 'left',
                fontWeight: 600,
              }}
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: 8,
                padding: '10px 14px',
                background: '#111827',
                color: '#ffffff',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Sign in
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  )
}