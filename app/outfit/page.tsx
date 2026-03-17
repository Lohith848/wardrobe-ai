'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

const OCCASIONS = [
  'everyday casual', 'college', 'office', 'party',
  'gym', 'date night', 'outdoor', 'festival'
]

const WEATHERS = [
  'sunny & breezy', 'hot & humid', 'cold', 'rainy', 'winter'
]

const STYLES = [
  'casual', 'streetwear', 'semi-casual', 'semi-formal',
  'formal', 'smart casual', 'preppy', 'minimalist'
]

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
    async function fetchItems() {
      const { data } = await supabase
        .from('wardrobe_items')
        .select('id, category, primary_color, style_tags, description, image_base64')
      setItems(data || [])
    }
    fetchItems()
  }, [])

  async function generateOutfit() {
    if (items.length < 2) {
      setError('Add at least 2 items to your wardrobe first!')
      return
    }
    setLoading(true)
    setOutfit(null)
    setOutfitItems([])
    setError('')

    try {
      const res = await fetch('/api/outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, occasion, weather, style })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const picked = data.outfit
        .map((index: number) => items[index - 1])
        .filter(Boolean)
      setOutfit(data)
      setOutfitItems(picked)
    } catch (err: any) {
      setError('Error: ' + err.message)
    }
    setLoading(false)
  }

  function SectionLabel({ text }: { text: string }) {
    return (
      <p style={{
        color: '#aaa', fontSize: 11, fontWeight: 700,
        letterSpacing: 1.5, margin: '0 0 10px',
        textTransform: 'uppercase'
      }}>
        {text}
      </p>
    )
  }

  function OptionButton({
    label, active, color, onClick
  }: {
    label: string, active: boolean, color: string, onClick: () => void
  }) {
    return (
      <button onClick={onClick} style={{
        padding: '8px 16px', borderRadius: 20,
        border: `1px solid ${active ? color : '#444'}`,
        background: active ? color : 'transparent',
        color: active ? '#fff' : '#888',
        cursor: 'pointer', fontSize: 13,
        textTransform: 'capitalize',
        transition: 'all 0.15s'
      }}>
        {label}
      </button>
    )
  }

  return (
    <div style={{
      maxWidth: 700, margin: '40px auto',
      padding: '0 20px', fontFamily: 'sans-serif'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 32
      }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: '#fff' }}>
            Outfit Generator
          </h1>
          <p style={{ color: '#888', margin: '4px 0 0' }}>
            {items.length} items in wardrobe
          </p>
        </div>
        <Link href="/wardrobe" style={{
          padding: '10px 20px', background: '#222', color: '#fff',
          borderRadius: 8, textDecoration: 'none', fontSize: 14,
          border: '1px solid #444'
        }}>
          My Wardrobe
        </Link>
      </div>

      {/* Selectors card */}
      <div style={{
        background: '#1a1a1a', borderRadius: 16,
        padding: 24, marginBottom: 24, border: '1px solid #333'
      }}>

        {/* Occasion */}
        <div style={{ marginBottom: 20 }}>
          <SectionLabel text="Occasion" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {OCCASIONS.map(o => (
              <OptionButton
                key={o} label={o} active={occasion === o}
                color="#6c63ff" onClick={() => setOccasion(o)}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #2a2a2a', margin: '4px 0 20px' }} />

        {/* Weather */}
        <div style={{ marginBottom: 20 }}>
          <SectionLabel text="Weather" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {WEATHERS.map(w => (
              <OptionButton
                key={w} label={w} active={weather === w}
                color="#e67e22" onClick={() => setWeather(w)}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #2a2a2a', margin: '4px 0 20px' }} />

        {/* Fashion Style */}
        <div>
          <SectionLabel text="Fashion Style" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {STYLES.map(s => (
              <OptionButton
                key={s} label={s} active={style === s}
                color="#00b894" onClick={() => setStyle(s)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generateOutfit}
        disabled={loading}
        style={{
          width: '100%', padding: 16,
          background: loading ? '#2a2a2a' : 'linear-gradient(135deg, #6c63ff, #00b894)',
          color: loading ? '#666' : '#fff',
          border: 'none', borderRadius: 12,
          fontSize: 18, fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: 24
        }}
      >
        {loading ? '⏳ AI is styling your outfit...' : '✨ Generate My Outfit'}
      </button>

      {/* Error */}
      {error && (
        <p style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: 16 }}>
          {error}
        </p>
      )}

      {/* Result */}
      {outfit && outfitItems.length > 0 && (
        <div style={{
          background: '#1a1a1a', borderRadius: 16,
          padding: 24, border: '1px solid #6c63ff'
        }}>

          {/* Outfit title + tags */}
          <h2 style={{
            fontSize: 22, fontWeight: 700,
            color: '#fff', margin: '0 0 8px'
          }}>
            {outfit.title}
          </h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {[occasion, weather, style].map(tag => (
              <span key={tag} style={{
                padding: '4px 12px', borderRadius: 20,
                background: '#2a2a2a', color: '#aaa',
                fontSize: 12, textTransform: 'capitalize'
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Clothing items grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(outfitItems.length, 4)}, 1fr)`,
            gap: 12, marginBottom: 20
          }}>
            {outfitItems.map((item: any) => (
              <div key={item.id} style={{
                background: '#222', borderRadius: 10,
                overflow: 'hidden', border: '1px solid #333'
              }}>
                <div style={{ height: 150, background: '#2a2a2a' }}>
                  {item.image_base64
                    ? <img
                        src={item.image_base64}
                        alt={item.category}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    : <div style={{
                        height: '100%', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: 32
                      }}>👕</div>
                  }
                </div>
                <div style={{ padding: 10 }}>
                  <p style={{
                    color: '#fff', fontSize: 13, fontWeight: 600,
                    margin: '0 0 2px', textTransform: 'capitalize'
                  }}>
                    {item.category}
                  </p>
                  <p style={{ color: '#666', fontSize: 12, margin: 0 }}>
                    {item.primary_color}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Why this works */}
          <div style={{
            background: '#222', borderRadius: 10,
            padding: 16, marginBottom: 12
          }}>
            <p style={{ color: '#aaa', fontSize: 11, fontWeight: 700,
              letterSpacing: 1.5, margin: '0 0 6px' }}>
              WHY THIS WORKS
            </p>
            <p style={{ color: '#fff', margin: 0, lineHeight: 1.6 }}>
              {outfit.reason}
            </p>
          </div>

          {/* Styling tip */}
          <div style={{
            background: '#1a1f2e', borderRadius: 10,
            padding: 16, border: '1px solid #6c63ff44',
            marginBottom: 16
          }}>
            <p style={{ color: '#aaa', fontSize: 11, fontWeight: 700,
              letterSpacing: 1.5, margin: '0 0 6px' }}>
              STYLING TIP
            </p>
            <p style={{ color: '#c4b5fd', margin: 0, lineHeight: 1.6 }}>
              {outfit.tip}
            </p>
          </div>

          {/* Regenerate */}
          <button onClick={generateOutfit} style={{
            width: '100%', padding: 12,
            background: 'transparent', color: '#6c63ff',
            border: '1px solid #6c63ff', borderRadius: 8,
            cursor: 'pointer', fontSize: 14, fontWeight: 600
          }}>
            Generate Another Outfit
          </button>
        </div>
      )}
    </div>
  )
}