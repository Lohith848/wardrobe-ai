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
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <Navbar />
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '32px 16px 40px' }}>
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
              Saved outfits
            </h1>
            <p style={{ color: '#6b7280', margin: 0, fontSize: 13 }}>
              {outfits.length} outfits saved
            </p>
          </div>
          <Link
            href="/outfit"
            style={{
              padding: '9px 16px',
              background: '#111827',
              color: '#ffffff',
              borderRadius: 999,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Create new outfit
          </Link>
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
            Loading…
          </p>
        )}

        {!loading && outfits.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p
              style={{
                color: '#6b7280',
                fontSize: 14,
                margin: '0 0 16px',
              }}
            >
              You don’t have any saved outfits yet.
            </p>
            <Link
              href="/outfit"
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
              Generate your first outfit
            </Link>
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 12,
          }}
        >
          {outfits.map(outfit => (
            <div
              key={outfit.id}
              style={{
                background: '#ffffff',
                borderRadius: 12,
                padding: 14,
                border: '1px solid #e5e7eb',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#111827',
                    margin: 0,
                  }}
                >
                  {outfit.title}
                </h3>
                <button
                  onClick={() => deleteOutfit(outfit.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                    fontSize: 14,
                    padding: 0,
                  }}
                >
                  ×
                </button>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  flexWrap: 'wrap',
                  marginBottom: 8,
                }}
              >
                {[outfit.occasion, outfit.weather, outfit.style]
                  .filter(Boolean)
                  .map((tag: string) => (
                    <span
                      key={tag}
                      style={{
                        padding: '2px 8px',
                        background: '#f3f4f6',
                        color: '#4b5563',
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 500,
                        textTransform: 'capitalize',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <p
                style={{
                  color: '#4b5563',
                  fontSize: 12,
                  lineHeight: 1.5,
                  margin: '0 0 8px',
                }}
              >
                {outfit.reason}
              </p>
              <div
                style={{
                  background: '#f9fafb',
                  borderRadius: 8,
                  padding: 10,
                  border: '1px solid #e5e7eb',
                }}
              >
                <p
                  style={{
                    color: '#9ca3af',
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    margin: '0 0 3px',
                  }}
                >
                  Tip
                </p>
                <p
                  style={{
                    color: '#4b5563',
                    fontSize: 12,
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {outfit.tip}
                </p>
              </div>
              <p
                style={{
                  color: '#9ca3af',
                  fontSize: 11,
                  margin: '8px 0 0',
                }}
              >
                {new Date(outfit.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}