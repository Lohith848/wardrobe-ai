'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Link from 'next/link'

const CATS = ['all','shirt','tshirt','pants','shoes','jacket','dress','accessory','socks']

export default function WardrobePage() {
  const [items, setItems] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    async function fetch_() {
      const { data } = await supabase.from('wardrobe_items')
        .select('id,category,primary_color,style_tags,description,image_base64,created_at')
      setItems(data || []); setFiltered(data || []); setLoading(false)
    }
    fetch_()
  }, [])

  useEffect(() => {
    let r = activeFilter === 'all' ? [...items] : items.filter(i => i.category === activeFilter)
    if (sortBy === 'newest') r.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    else if (sortBy === 'oldest') r.sort((a,b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    else if (sortBy === 'color') r.sort((a,b) => (a.primary_color||'').localeCompare(b.primary_color||''))
    setFiltered(r)
  }, [activeFilter, sortBy, items])

  async function deleteItem(id: string) {
    await supabase.from('wardrobe_items').delete().eq('id', id)
    setItems(p => p.filter(i => i.id !== id))
  }

  const count = (c: string) => c === 'all' ? items.length : items.filter(i => i.category === c).length

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <Navbar />
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 16px 40px' }}>
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
              My wardrobe
            </h1>
            <p style={{ color: '#6b7280', margin: 0, fontSize: 13 }}>
              {items.length} items · {filtered.length} showing
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '7px 10px',
                border: '1px solid #d1d5db',
                borderRadius: 999,
                fontSize: 13,
                color: '#374151',
                background: '#ffffff',
                cursor: 'pointer',
              }}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="color">By color</option>
            </select>
            <Link
              href="/upload"
              style={{
                padding: '8px 16px',
                background: '#111827',
                color: '#ffffff',
                borderRadius: 999,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              Add item
            </Link>
          </div>
        </div>

        {/* Filter pills */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            marginBottom: 20,
          }}
        >
          {CATS.filter(c => count(c) > 0).map(c => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              style={{
                padding: '5px 12px',
                borderRadius: 999,
                border: '1px solid ' + (activeFilter === c ? '#111827' : '#d1d5db'),
                background: activeFilter === c ? '#111827' : '#ffffff',
                color: activeFilter === c ? '#ffffff' : '#374151',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {c}{' '}
              <span style={{ opacity: 0.6, fontSize: 11 }}>
                {count(c)}
              </span>
            </button>
          ))}
        </div>

        {loading && (
          <p
            style={{
              textAlign: 'center',
              color: '#6b7280',
              padding: 40,
              fontSize: 13,
            }}
          >
            Loading wardrobe…
          </p>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p
              style={{
                color: '#6b7280',
                fontSize: 14,
                margin: '0 0 16px',
              }}
            >
              {activeFilter === 'all'
                ? 'Your wardrobe is empty.'
                : `No items in “${activeFilter}” yet.`}
            </p>
            <Link
              href="/upload"
              style={{
                padding: '9px 18px',
                background: '#111827',
                color: '#ffffff',
                borderRadius: 999,
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 13,
              }}
            >
              Add your first item
            </Link>
          </div>
        )}

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 12,
          }}
        >
          {filtered.map(item => (
            <div
              key={item.id}
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                background: '#ffffff',
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: 180,
                  background: '#f9fafb',
                  position: 'relative',
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
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: '#ffffff',
                    color: '#111827',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  ×
                </button>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                    background: 'rgba(255,255,255,0.9)',
                    color: '#111827',
                    padding: '2px 8px',
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: 'capitalize',
                  }}
                >
                  {item.category}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '10px 10px 12px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 4,
                  }}
                >
                  {item.primary_color && (
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '999px',
                        background: item.primary_color,
                        border: '1px solid #e5e7eb',
                      }}
                    />
                  )}
                  <span
                    style={{
                      color: '#6b7280',
                      fontSize: 12,
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.primary_color || 'No color set'}
                  </span>
                </div>
                <p
                  style={{
                    color: '#4b5563',
                    fontSize: 12,
                    margin: 0,
                    lineHeight: 1.4,
                    minHeight: 32,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}