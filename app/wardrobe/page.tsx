'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

const CATEGORIES = ['all', 'shirt', 'tshirt', 'pants', 'shoes', 'jacket', 'dress', 'accessory', 'socks']

export default function WardrobePage() {
  const [items, setItems] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    async function fetchItems() {
      const { data } = await supabase
        .from('wardrobe_items')
        .select('id, category, primary_color, style_tags, description, image_base64, created_at, wear_count')
      setItems(data || [])
      setFiltered(data || [])
      setLoading(false)
    }
    fetchItems()
  }, [])

  useEffect(() => {
    let result = activeFilter === 'all' ? [...items] : items.filter(i => i.category === activeFilter)
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    else if (sortBy === 'oldest') result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    else if (sortBy === 'color') result.sort((a, b) => (a.primary_color || '').localeCompare(b.primary_color || ''))
    setFiltered(result)
  }, [activeFilter, sortBy, items])

  async function deleteItem(id: string) {
    await supabase.from('wardrobe_items').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const categoryCount = (cat: string) =>
    cat === 'all' ? items.length : items.filter(i => i.category === cat).length

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'sans-serif' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 32px', borderBottom: '1px solid #f0f0f0',
        background: '#fff', position: 'sticky', top: 0, zIndex: 100
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, background: '#000', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
          }}>🪞</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#000', letterSpacing: '-0.5px' }}>
            Drip<span style={{ color: '#6c63ff' }}>AI</span>
          </span>
        </Link>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/upload" style={{
            padding: '8px 18px', color: '#555', textDecoration: 'none',
            fontSize: 14, borderRadius: 8, border: '1px solid #eee'
          }}>+ Add Item</Link>
          <Link href="/outfit" style={{
            padding: '8px 18px', background: '#6c63ff', color: '#fff',
            textDecoration: 'none', fontSize: 14, borderRadius: 8, fontWeight: 600
          }}>Generate Outfit ✨</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 20px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#000', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
              My Wardrobe
            </h1>
            <p style={{ color: '#aaa', margin: 0, fontSize: 14 }}>
              {items.length} items · {filtered.length} showing
            </p>
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '8px 14px', border: '1px solid #eee', borderRadius: 8,
              fontSize: 13, color: '#555', background: '#fff', cursor: 'pointer'
            }}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="color">By color</option>
          </select>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {CATEGORIES.filter(cat => categoryCount(cat) > 0).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '7px 16px', borderRadius: 20, border: '1px solid',
                borderColor: activeFilter === cat ? '#6c63ff' : '#eee',
                background: activeFilter === cat ? '#6c63ff' : '#fff',
                color: activeFilter === cat ? '#fff' : '#555',
                cursor: 'pointer', fontSize: 13, fontWeight: 500,
                textTransform: 'capitalize', transition: 'all 0.15s'
              }}
            >
              {cat} {categoryCount(cat) > 0 && (
                <span style={{ opacity: 0.7, fontSize: 11 }}>
                  {categoryCount(cat)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <p style={{ textAlign: 'center', color: '#aaa', padding: 60 }}>Loading wardrobe...</p>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: 48, margin: '0 0 12px' }}>👗</p>
            <p style={{ color: '#aaa', fontSize: 16, margin: '0 0 20px' }}>
              {activeFilter === 'all' ? 'Your wardrobe is empty' : `No ${activeFilter}s yet`}
            </p>
            <Link href="/upload" style={{
              padding: '12px 24px', background: '#000', color: '#fff',
              borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: 14
            }}>
              Add your first item →
            </Link>
          </div>
        )}

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16
        }}>
          {filtered.map((item) => (
            <div key={item.id} style={{
              borderRadius: 16, overflow: 'hidden',
              border: '1px solid #f0f0f0',
              background: '#fff',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              {/* Image with color accent */}
              <div style={{ height: 200, background: '#f9f9f9', position: 'relative', overflow: 'hidden' }}>
                {item.image_base64 ? (
                  <img src={item.image_base64} alt={item.category}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 40 }}>👕</div>
                )}
                {/* Delete button */}
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{
                    position: 'absolute', top: 8, right: 8,
                    width: 28, height: 28, borderRadius: 8,
                    background: 'rgba(0,0,0,0.6)', color: '#fff',
                    border: 'none', cursor: 'pointer', fontSize: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >✕</button>
                {/* Category badge */}
                <div style={{
                  position: 'absolute', bottom: 8, left: 8,
                  background: 'rgba(0,0,0,0.7)', color: '#fff',
                  padding: '3px 10px', borderRadius: 20, fontSize: 11,
                  fontWeight: 600, textTransform: 'capitalize', backdropFilter: 'blur(4px)'
                }}>
                  {item.category}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: item.primary_color || '#ccc',
                    border: '1px solid #eee', flexShrink: 0
                  }} />
                  <p style={{ color: '#555', fontSize: 13, margin: 0, textTransform: 'capitalize' }}>
                    {item.primary_color}
                  </p>
                </div>
                <p style={{ color: '#aaa', fontSize: 12, margin: 0,
                  lineHeight: 1.4, overflow: 'hidden',
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as any }}>
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