'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Link from 'next/link'

const OCCASIONS = ['everyday casual','college','office','party','gym','date night','outdoor','festival']
const WEATHERS = ['sunny & breezy','hot & humid','cold','rainy','winter']
const STYLES = ['casual','streetwear','semi-casual','semi-formal','formal','smart casual','preppy','minimalist']

export default function OutfitPage() {
  const [items, setItems] = useState<any[]>([])
  const [occasion, setOccasion] = useState('everyday casual')
  const [weather, setWeather] = useState('sunny & breezy')
  const [style, setStyle] = useState('casual')
  const [outfit, setOutfit] = useState<any>(null)
  const [outfitItems, setOutfitItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetch_() {
      const { data } = await supabase.from('wardrobe_items')
        .select('id,category,primary_color,style_tags,description,image_base64')
      setItems(data || [])
    }
    fetch_()
  }, [])

  async function generate() {
    if (items.length < 2) { setError('Add at least 2 items first!'); return }
    setLoading(true); setOutfit(null); setOutfitItems([]); setError('')
    try {
      const res = await fetch('/api/outfit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, occasion, weather, style })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setOutfit(data)
      setOutfitItems(data.outfit.map((i: number) => items[i - 1]).filter(Boolean))
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }

  function Pill({ label, active, color, onClick }: any) {
    return (
      <button onClick={onClick} style={{
        padding: '7px 15px', borderRadius: 20, border: '1px solid',
        borderColor: active ? color : '#eee',
        background: active ? color : '#fff',
        color: active ? '#fff' : '#666',
        cursor: 'pointer', fontSize: 13, fontWeight: 500,
        textTransform: 'capitalize', transition: 'all 0.15s'
      }}>{label}</button>
    )
  }

  function SectionLabel({ text }: any) {
    return <p style={{ color: '#bbb', fontSize: 11, fontWeight: 700,
      letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 10px' }}>{text}</p>
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#000',
              margin: '0 0 4px', letterSpacing: '-1px' }}>Outfit Generator</h1>
            <p style={{ color: '#bbb', margin: 0, fontSize: 13 }}>
              {items.length} items in wardrobe
            </p>
          </div>
          <Link href="/wardrobe" style={{ padding: '8px 16px', border: '1px solid #eee',
            color: '#555', borderRadius: 8, textDecoration: 'none', fontSize: 13 }}>
            My Wardrobe
          </Link>
        </div>

        {/* Selectors */}
        <div style={{ border: '1px solid #f0f0f0', borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <SectionLabel text="Occasion" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {OCCASIONS.map(o => <Pill key={o} label={o} active={occasion===o} color="#6c63ff" onClick={() => setOccasion(o)} />)}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #f5f5f5', margin: '4px 0 20px' }} />
          <div style={{ marginBottom: 20 }}>
            <SectionLabel text="Weather" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {WEATHERS.map(w => <Pill key={w} label={w} active={weather===w} color="#e67e22" onClick={() => setWeather(w)} />)}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #f5f5f5', margin: '4px 0 20px' }} />
          <div>
            <SectionLabel text="Fashion Style" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {STYLES.map(s => <Pill key={s} label={s} active={style===s} color="#00b894" onClick={() => setStyle(s)} />)}
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button onClick={generate} disabled={loading} style={{
          width: '100%', padding: 16,
          background: loading ? '#f5f5f5' : '#000',
          color: loading ? '#aaa' : '#fff',
          border: 'none', borderRadius: 12, fontSize: 17,
          fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
          letterSpacing: '-0.3px', marginBottom: 20
        }}>
          {loading ? '⏳ Styling your outfit...' : '✨ Generate My Outfit'}
        </button>

        {error && <p style={{ color: '#e53e3e', textAlign: 'center', marginBottom: 16, fontSize: 14 }}>{error}</p>}

        {/* Result */}
        {outfit && outfitItems.length > 0 && (
          <div style={{ border: '1px solid #6c63ff33', borderRadius: 16,
            overflow: 'hidden', background: '#fff' }}>

            {/* Title bar */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f5f5f5' }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: '#000',
                margin: '0 0 8px', letterSpacing: '-0.5px' }}>{outfit.title}</h2>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[occasion, weather, style].map(tag => (
                  <span key={tag} style={{ padding: '3px 10px', borderRadius: 20,
                    background: '#f5f5f5', color: '#888', fontSize: 12,
                    textTransform: 'capitalize' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Items */}
            <div style={{ padding: 20,
              display: 'grid', gap: 10,
              gridTemplateColumns: `repeat(${Math.min(outfitItems.length, 4)}, 1fr)` }}>
              {outfitItems.map((item: any) => (
                <div key={item.id} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                  <div style={{ height: 140, background: '#f8f8f8' }}>
                    {item.image_base64
                      ? <img src={item.image_base64} alt={item.category}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ height: '100%', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: 28 }}>👕</div>
                    }
                  </div>
                  <div style={{ padding: '8px 10px' }}>
                    <p style={{ color: '#000', fontSize: 12, fontWeight: 700,
                      margin: '0 0 1px', textTransform: 'capitalize' }}>{item.category}</p>
                    <p style={{ color: '#bbb', fontSize: 11, margin: 0 }}>{item.primary_color}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Why + tip */}
            <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: '#fafafa', borderRadius: 12, padding: '14px 16px' }}>
                <p style={{ color: '#bbb', fontSize: 10, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 6px' }}>Why this works</p>
                <p style={{ color: '#333', margin: 0, fontSize: 14, lineHeight: 1.6 }}>{outfit.reason}</p>
              </div>
              <div style={{ background: '#f5f3ff', borderRadius: 12, padding: '14px 16px',
                border: '1px solid #e0d9ff' }}>
                <p style={{ color: '#a78bfa', fontSize: 10, fontWeight: 700,
                  letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 6px' }}>Styling tip</p>
                <p style={{ color: '#6c63ff', margin: 0, fontSize: 14, lineHeight: 1.6 }}>{outfit.tip}</p>
              </div>
              <button onClick={generate} style={{ width: '100%', padding: 12,
                background: '#fff', color: '#6c63ff', border: '1px solid #e0d9ff',
                borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
                Generate another outfit →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}