'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Link from 'next/link'
function SaveButton({ outfit, occasion, weather, style }: any) {
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  async function saveOutfit() {
    setSaving(true)
    const { error } = await supabase
      .from('saved_outfits')
      .insert({
        title: outfit.title,
        reason: outfit.reason,
        tip: outfit.tip,
        occasion,
        weather,
        style
      })
    if (!error) setSaved(true)
    setSaving(false)
  }

  return (
    <button
      onClick={saveOutfit}
      disabled={saved || saving}
      style={{
        width: '100%', padding: 12, marginBottom: 10,
        background: saved ? 'rgba(16, 185, 129, 0.1)' : '#050505',
        color: saved ? '#34d399' : '#ffffff',
        border: `1px solid ${saved ? 'rgba(16, 185, 129, 0.2)' : '#27272a'}`,
        borderRadius: 8, cursor: saved ? 'default' : 'pointer',
        fontSize: 14, fontWeight: 600
      }}
    >
      {saving ? 'Saving...' : saved ? 'Saved to collection' : 'Save this outfit'}
    </button>
  )
}

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
        borderColor: active ? color : '#27272a',
        background: active ? color : '#050505',
        color: active ? '#050505' : '#a1a1aa',
        cursor: 'pointer', fontSize: 13, fontWeight: 500,
        textTransform: 'capitalize', transition: 'all 0.15s'
      }}>{label}</button>
    )
  }

  function SectionLabel({ text }: any) {
    return <p style={{ color: '#52525b', fontSize: 11, fontWeight: 700,
      letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 10px' }}>{text}</p>
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <Navbar />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px 40px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 12,
            marginBottom: 20,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: '#111827',
                margin: '0 0 4px',
              }}
            >
              Generate an outfit
            </h1>
            <p style={{ color: '#6b7280', margin: 0, fontSize: 13 }}>
              {items.length} items in your wardrobe
            </p>
          </div>
          <Link
            href="/wardrobe"
            style={{
              padding: '8px 14px',
              border: '1px solid #d1d5db',
              color: '#374151',
              borderRadius: 999,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            View wardrobe
          </Link>
        </div>

        {/* Selectors */}
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            background: '#ffffff',
          }}
        >
          <div style={{ marginBottom: 14 }}>
            <SectionLabel text="Occasion" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {OCCASIONS.map(o => (
                <Pill
                  key={o}
                  label={o}
                  active={occasion === o}
                  color="#111827"
                  onClick={() => setOccasion(o)}
                />
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', margin: '8px 0 14px' }} />
          <div style={{ marginBottom: 14 }}>
            <SectionLabel text="Weather" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {WEATHERS.map(w => (
                <Pill
                  key={w}
                  label={w}
                  active={weather === w}
                  color="#111827"
                  onClick={() => setWeather(w)}
                />
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', margin: '8px 0 14px' }} />
          <div>
            <SectionLabel text="Style" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {STYLES.map(s => (
                <Pill
                  key={s}
                  label={s}
                  active={style === s}
                  color="#111827"
                  onClick={() => setStyle(s)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          disabled={loading}
          style={{
            width: '100%',
            padding: 12,
            background: '#111827',
            color: '#ffffff',
            border: 'none',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: 10,
          }}
        >
          {loading ? 'Creating an outfit…' : 'Generate outfit from my items'}
        </button>

        {error && (
          <p
            style={{
              color: '#b91c1c',
              textAlign: 'left',
              marginBottom: 12,
              fontSize: 12,
            }}
          >
            {error}
          </p>
        )}

        {/* Result */}
        {outfit && outfitItems.length > 0 && (
          <div
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              background: '#ffffff',
              overflow: 'hidden',
            }}
          >
            {/* Title bar */}
            <div
              style={{
                padding: '14px 16px 10px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#111827',
                  margin: '0 0 6px',
                }}
              >
                {outfit.title}
              </h2>
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  flexWrap: 'wrap',
                }}
              >
                {[occasion, weather, style].map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '2px 8px',
                      borderRadius: 999,
                      background: '#f3f4f6',
                      color: '#4b5563',
                      fontSize: 11,
                      textTransform: 'capitalize',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Items */}
            <div
              style={{
                padding: 12,
                display: 'grid',
                gap: 10,
                gridTemplateColumns: `repeat(${Math.min(
                  outfitItems.length,
                  4,
                )}, minmax(0, 1fr))`,
              }}
            >
              {outfitItems.map((item: any) => (
                <div
                  key={item.id}
                  style={{
                    borderRadius: 10,
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb',
                    background: '#ffffff',
                  }}
                >
                  <div
                    style={{
                      height: 130,
                      background: '#f9fafb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {item.image_base64 ? (
                      <img
                        src={item.image_base64}
                        alt={item.category}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : null}
                  </div>
                  <div style={{ padding: '6px 8px 8px' }}>
                    <p
                      style={{
                        color: '#111827',
                        fontSize: 12,
                        fontWeight: 500,
                        margin: '0 0 2px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.category}
                    </p>
                    <p
                      style={{
                        color: '#6b7280',
                        fontSize: 11,
                        margin: 0,
                      }}
                    >
                      {item.primary_color}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Why + tip + actions */}
            <div
              style={{
                padding: '0 12px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  background: '#f9fafb',
                  borderRadius: 8,
                  padding: '10px 10px',
                }}
              >
                <p
                  style={{
                    color: '#9ca3af',
                    fontSize: 10,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    margin: '0 0 4px',
                  }}
                >
                  Why this works
                </p>
                <p
                  style={{
                    color: '#4b5563',
                    margin: 0,
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  {outfit.reason}
                </p>
              </div>
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 8,
                  padding: '10px 10px',
                  border: '1px solid #e5e7eb',
                }}
              >
                <p
                  style={{
                    color: '#9ca3af',
                    fontSize: 10,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    margin: '0 0 4px',
                  }}
                >
                  Styling tip
                </p>
                <p
                  style={{
                    color: '#4b5563',
                    margin: 0,
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  {outfit.tip}
                </p>
              </div>

              <SaveButton
                outfit={outfit}
                occasion={occasion}
                weather={weather}
                style={style}
              />

              <button
                onClick={generate}
                style={{
                  width: '100%',
                  padding: 10,
                  background: '#ffffff',
                  color: '#111827',
                  border: '1px solid #d1d5db',
                  borderRadius: 999,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Generate another outfit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}