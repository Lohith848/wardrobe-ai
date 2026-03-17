'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

export default function WardrobePage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from('wardrobe_items')
        .select('id, category, primary_color, style_tags, description, image_base64')

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setItems(data || [])
      setLoading(false)
    }
    fetchItems()
  }, [])

  return (
    <div style={{
      maxWidth: 900,
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: 'sans-serif'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32
      }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: '#fff' }}>
            My Wardrobe
          </h1>
          <p style={{ color: '#888', margin: '4px 0 0' }}>
            {items.length} items
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/upload" style={{
            padding: '10px 20px',
            background: '#fff',
            color: '#000',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 14
          }}>
            + Add Item
          </Link>
          <Link href="/outfit" style={{
            padding: '10px 20px',
            background: '#6c63ff',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 14
          }}>
            Generate Outfit ✨
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: '#2a0000',
          border: '1px solid red',
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          color: 'red'
        }}>
          Error: {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p style={{ textAlign: 'center', color: '#888', padding: 40 }}>
          Loading wardrobe...
        </p>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <p style={{ fontSize: 48, margin: 0 }}>👕</p>
          <p style={{ color: '#888', fontSize: 18, margin: '12px 0' }}>
            No items yet
          </p>
          <Link href="/upload" style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#fff',
            color: '#000',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Add your first item
          </Link>
        </div>
      )}

      {/* Grid */}
      {items.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16
        }}>
          {items.map((item) => (
            <div key={item.id} style={{
              background: '#1a1a1a',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid #333'
            }}>
              {/* Image */}
              <div style={{ height: 200, background: '#222' }}>
                {item.image_base64 ? (
                  <img
                    src={item.image_base64}
                    alt={item.category}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 40
                  }}>
                    👕
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: 12 }}>
                <p style={{
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  margin: '0 0 4px',
                  color: '#fff',
                  fontSize: 15
                }}>
                  {item.category}
                </p>
                <p style={{
                  color: '#888',
                  fontSize: 13,
                  margin: '0 0 6px'
                }}>
                  {item.primary_color} · {item.style_tags?.[0]}
                </p>
                <p style={{
                  color: '#666',
                  fontSize: 12,
                  margin: 0,
                  lineHeight: 1.4
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}