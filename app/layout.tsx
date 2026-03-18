import type { Metadata } from 'next'
import './globals.css'
import AuthGuard from './components/AuthGuard'

export const metadata: Metadata = {
  title: 'DripAI — AI Personal Stylist',
  description: 'Upload your wardrobe and get AI-powered outfit suggestions',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DripAI',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#fff', WebkitFontSmoothing: 'antialiased' }}>
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  )
}