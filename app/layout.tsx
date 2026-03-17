import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WardrobeAI',
  description: 'AI-powered personal stylist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0a0a0a', color: '#fff' }}>
        {children}
      </body>
    </html>
  )
}