'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

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

  const Logo = () => (
    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <div style={{
        width: 32, height: 32, background: '#ffffff', borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
        </svg>
      </div>
      <span style={{ fontWeight: 800, fontSize: 18, color: '#ffffff', letterSpacing: '-0.5px' }}>
        Drip<span style={{ color: '#818cf8' }}>AI</span>
      </span>
    </Link>
  )

  const isActive = (href: string) => pathname === href

  const navLinks = [
    { href: '/wardrobe', label: 'Wardrobe' },
    { href: '/upload', label: 'Upload' },
    { href: '/outfit', label: 'Generate outfit' },
    { href: '/saved', label: 'Saved outfits' },
  ]

  return (
    <>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 24px', borderBottom: '1px solid #f0f0f0',
        background: '#050505', position: 'sticky', top: 0, zIndex: 100
      }}>
        <Logo />

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              color: isActive(link.href) ? '#ffffff' : '#a1a1aa',
              textDecoration: 'none', fontSize: 14,
              padding: '8px 12px', borderRadius: 8,
              fontWeight: isActive(link.href) ? 700 : 400,
              borderBottom: isActive(link.href) ? '2px solid #4f46e5' : '2px solid transparent'
            }}>
              {link.label}
            </Link>
          ))}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: '#818cf8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#050505', fontSize: 13, fontWeight: 700, flexShrink: 0
              }}>
                {user.email?.charAt(0).toUpperCase() || 'G'}
              </div>
              <button onClick={handleSignOut} style={{
                padding: '7px 12px', background: '#050505', border: '1px solid #eee',
                borderRadius: 8, cursor: 'pointer', fontSize: 13, color: '#a1a1aa'
              }}>
                Sign out
              </button>
            </div>
          ) : (
            <Link href="/login" style={{
              padding: '8px 16px', background: '#ffffff', color: '#050505',
              borderRadius: 8, textDecoration: 'none', fontSize: 14,
              fontWeight: 600, marginLeft: 8
            }}>
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 8, display: 'none'
          }}
        >
          <div style={{ width: 22, height: 2, background: '#ffffff', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: '#ffffff', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: '#ffffff', borderRadius: 2 }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: '#050505', borderBottom: '1px solid #f0f0f0',
          padding: '12px 24px 20px', display: 'flex',
          flexDirection: 'column', gap: 4
        }} className="mobile-menu">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: isActive(link.href) ? '#818cf8' : '#e5e7eb',
                textDecoration: 'none', fontSize: 16,
                padding: '12px 0', fontWeight: isActive(link.href) ? 700 : 400,
                borderBottom: '1px solid #f9f9f9'
              }}>
              {link.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleSignOut} style={{
              marginTop: 8, padding: '12px 0', background: 'none',
              border: 'none', cursor: 'pointer', fontSize: 16,
              color: '#e53e3e', textAlign: 'left', fontWeight: 600
            }}>
              Sign out
            </button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} style={{
              marginTop: 8, padding: '12px 16px', background: '#ffffff',
              color: '#050505', borderRadius: 8, textDecoration: 'none',
              fontSize: 15, fontWeight: 600, textAlign: 'center'
            }}>
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