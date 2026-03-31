import type { Metadata } from 'next'
import './globals.css'
import AuthGuard from './components/AuthGuard'
<head>
  <link rel="icon" href="/favicon.ico" sizes="48x48" type="image/x-icon"/>
  <link rel="shortcut icon" href="/favicon.ico"/>
  <link rel="apple-touch-icon" href="/icon-192.png"/>
  <meta name="theme-color" content="#000000"/>
  <meta name="mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-title" content="DripAI"/>
  <link rel="manifest" href="/manifest.json"/>
</head>
export const metadata: Metadata = {
  title: 'DripAI — AI Personal Stylist',
  description: 'Upload your wardrobe and get AI-powered outfit suggestions',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
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
      <body style={{ margin: 0, background: '#050505', WebkitFontSmoothing: 'antialiased' }}>
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  )
}