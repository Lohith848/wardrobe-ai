import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 32px', height: 60,
      borderBottom: '1px solid #f0f0f0', background: '#fff',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 30, height: 30, background: '#000', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15
        }}>🪞</div>
        <span style={{ fontWeight: 800, fontSize: 17, color: '#000', letterSpacing: '-0.5px' }}>
          Drip<span style={{ color: '#6c63ff' }}>AI</span>
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Link href="/wardrobe" style={{
          padding: '7px 14px', color: '#555', textDecoration: 'none',
          fontSize: 14, borderRadius: 8,
          fontWeight: 500
        }}>Wardrobe</Link>
        <Link href="/upload" style={{
          padding: '7px 14px', color: '#555', textDecoration: 'none',
          fontSize: 14, borderRadius: 8, fontWeight: 500
        }}>Upload</Link>
        <Link href="/outfit" style={{
          padding: '8px 18px', background: '#6c63ff', color: '#fff',
          textDecoration: 'none', fontSize: 14, borderRadius: 8,
          fontWeight: 700, letterSpacing: '-0.2px', marginLeft: 4
        }}>
          Get Outfit ✨
        </Link>
      </div>
    </nav>
  )
}