'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const publicPaths = ['/login']

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const isPublic = publicPaths.includes(pathname)
      if (!data.session && !isPublic) {
        router.replace('/login')
      } else {
        setChecking(false)
      }
    })
  }, [pathname])

  if (checking && !publicPaths.includes(pathname)) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#fff', fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 32, height: 32, background: '#000', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
            </svg>
          </div>
          <p style={{ color: '#aaa', fontSize: 14 }}>Loading DripAI...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}