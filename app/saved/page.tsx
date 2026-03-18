'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Link from 'next/link'

export default function SavedPage() {
  const [outfits, setOutfits] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('saved_outfits')
        .select('*')
        .order('created_at', { ascending: false })
      setOutfits(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  async function deleteOutfit(id: string) {
    await supabase.from('saved_outfits').delete().eq('id', id)
    setOutfits(prev => prev.filter(o => o.id !== id))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#000',
              margin: '0 0 4px', letterSpacing: '-0.8px' }}>
              Saved outfits
            </h1>
            <p style={{ color: '#aaa', margin: 0, fontSize: 14 }}>
              {outfits.length} outfits saved
            </p>
          </div>
          <Link href="/outfit" style={{
            padding: '10px 20px', background: '#000', color: '#fff',
            borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600
          }}>
            Create new outfit
          </Link>
        </div>

        {loading && (
          <p style={{ textAlign: 'center', color: '#aaa', padding: 60 }}>Loading...</p>
        )}

        {!loading && outfits.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: 48, margin: '0 0 12px' }}>🗂</p>
            <p style={{ color: '#aaa', fontSize: 16, margin: '0 0 20px' }}>No saved outfits yet</p>
            <Link href="/outfit" style={{
              padding: '12px 24px', background: '#000', color: '#fff',
              borderRadius: 10, textDecoration: 'none', fontWeight: 600
            }}>
              Generate your first outfit
            </Link>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {outfits.map(outfit => (
            <div key={outfit.id} style={{
              background: '#fff', borderRadius: 16, padding: 20,
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#000',
                  margin: 0, letterSpacing: '-0.3px' }}>
                  {outfit.title}
                </h3>
                <button onClick={() => deleteOutfit(outfit.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#ccc', fontSize: 16, padding: 0
                }}>✕</button>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {[outfit.occasion, outfit.weather, outfit.style].filter(Boolean).map((tag: string) => (
                  <span key={tag} style={{
                    padding: '3px 10px', background: '#f5f3ff',
                    color: '#4f46e5', borderRadius: 20, fontSize: 12,
                    fontWeight: 500, textTransform: 'capitalize'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6, margin: '0 0 10px' }}>
                {outfit.reason}
              </p>
              <div style={{
                background: '#fafafa', borderRadius: 8, padding: 12,
                border: '1px solid #f0f0f0'
              }}>
                <p style={{ color: '#aaa', fontSize: 11, fontWeight: 700,
                  letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 4px' }}>
                  Tip
                </p>
                <p style={{ color: '#555', fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                  {outfit.tip}
                </p>
              </div>
              <p style={{ color: '#ccc', fontSize: 12, margin: '10px 0 0' }}>
                {new Date(outfit.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}