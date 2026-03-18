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
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#000',
              margin: '0 0 4px', letterSpacing: '-1px' }}>My Wardrobe</h1>
            <p style={{ color: '#bbb', margin: 0, fontSize: 13 }}>
              {items.length} items · {filtered.length} showing
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ padding: '7px 12px', border: '1px solid #eee', borderRadius: 8,
                fontSize: 13, color: '#555', background: '#fff', cursor: 'pointer' }}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="color">By color</option>
            </select>
            <Link href="/upload" style={{ padding: '8px 16px', background: '#000',
              color: '#fff', borderRadius: 8, textDecoration: 'none',
              fontSize: 13, fontWeight: 700 }}>+ Add</Link>
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
          {CATS.filter(c => count(c) > 0).map(c => (
            <button key={c} onClick={() => setActiveFilter(c)} style={{
              padding: '6px 14px', borderRadius: 20, border: '1px solid',
              borderColor: activeFilter === c ? '#6c63ff' : '#eee',
              background: activeFilter === c ? '#6c63ff' : '#fff',
              color: activeFilter === c ? '#fff' : '#666',
              cursor: 'pointer', fontSize: 13, fontWeight: 500,
              textTransform: 'capitalize', transition: 'all 0.15s'
            }}>
              {c} <span style={{ opacity: 0.6, fontSize: 11 }}>{count(c)}</span>
            </button>
          ))}
        </div>

        {loading && <p style={{ textAlign: 'center', color: '#ccc', padding: 60 }}>Loading...</p>}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontSize: 40, margin: '0 0 12px' }}>👗</p>
            <p style={{ color: '#bbb', fontSize: 15, margin: '0 0 20px' }}>
              {activeFilter === 'all' ? 'Wardrobe is empty' : `No ${activeFilter}s yet`}
            </p>
            <Link href="/upload" style={{ padding: '11px 22px', background: '#000',
              color: '#fff', borderRadius: 10, textDecoration: 'none',
              fontWeight: 700, fontSize: 14 }}>Add first item →</Link>
          </div>
        )}

        {/* Cards grid */}
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {filtered.map(item => (
            <div key={item.id}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'none'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
              style={{ borderRadius: 14, overflow: 'hidden',
                border: '1px solid #f0f0f0', background: '#fff',
                transition: 'all 0.2s' }}>

              {/* Image */}
              <div style={{ height: 200, background: '#f8f8f8', position: 'relative' }}>
                {item.image_base64
                  ? <img src={item.image_base64} alt={item.category}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ height: '100%', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>👕</div>
                }
                <button onClick={() => deleteItem(item.id)} style={{
                  position: 'absolute', top: 8, right: 8, width: 26, height: 26,
                  borderRadius: 6, background: 'rgba(0,0,0,0.55)', color: '#fff',
                  border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700
                }}>✕</button>
                <div style={{ position: 'absolute', bottom: 8, left: 8,
                  background: 'rgba(0,0,0,0.65)', color: '#fff',
                  padding: '2px 9px', borderRadius: 20, fontSize: 11,
                  fontWeight: 700, textTransform: 'capitalize' }}>
                  {item.category}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                  <div style={{ width: 11, height: 11, borderRadius: '50%',
                    background: item.primary_color || '#ccc', border: '1px solid #eee' }} />
                  <span style={{ color: '#555', fontSize: 13, textTransform: 'capitalize' }}>
                    {item.primary_color}
                  </span>
                </div>
                <p style={{ color: '#aaa', fontSize: 12, margin: 0, lineHeight: 1.4,
                  overflow: 'hidden', display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
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